"""
ai-engine/services/inference.py
================================
Orchestration layer: downloads images, runs the sequential ML pipeline,
aggregates the final risk score, and returns a ``ScanResponse``.

This module intentionally contains NO model-loading logic.  Models are
injected via the ``ModelRegistry`` obtained from ``app.state`` so they are
initialised exactly once at startup and reused across all requests.
"""

from __future__ import annotations

import logging
from typing import Optional

import httpx

from schemas import ScanRequest, ScanResponse
from services.model_loader import ModelRegistry
from services.pipeline import (
    run_face_verification,
    run_ocr_and_mrz,
    run_tampering_detection,
)

logger = logging.getLogger("ai-engine.inference")


# ---------------------------------------------------------------------------
# Image download helper
# ---------------------------------------------------------------------------

async def _download_image(
    client: httpx.AsyncClient,
    url: str,
    label: str,
) -> bytes:
    """
    Asynchronously fetch an image URL and return its raw bytes.

    Parameters
    ----------
    client : httpx.AsyncClient
        Shared async HTTP client for the current request.
    url : str
        Publicly (or internally) reachable image URL.
    label : str
        Human-readable label used in log messages (e.g. ``"doc"``).

    Returns
    -------
    bytes
        Raw image bytes as received from the server.

    Raises
    ------
    httpx.HTTPStatusError
        If the server returns a 4xx / 5xx response.
    httpx.RequestError
        If the network request fails entirely.
    """
    response = await client.get(url, follow_redirects=True, timeout=20.0)
    response.raise_for_status()
    size_kb = len(response.content) / 1024
    logger.info(
        "inference | downloaded %s image | %.1f KB | %s",
        label, size_kb, url,
    )
    return response.content


# ---------------------------------------------------------------------------
# Risk aggregation
# ---------------------------------------------------------------------------

def _aggregate_risk_score(
    validation_all_pass: bool,
    tampering_score: float,
    face_match_score: float,
) -> float:
    """
    Compute a composite fraud-risk score in the range ``[0.0, 100.0]``.

    Weighting policy
    ----------------
    +---------------------+--------+------------------------------------------+
    | Signal              | Weight | Rationale                                |
    +=====================+========+==========================================+
    | Tampering score     |   50 % | Primary indicator of a forged document.  |
    +---------------------+--------+------------------------------------------+
    | Face mismatch       |   35 % | Impersonation risk (100 - face_match).   |
    +---------------------+--------+------------------------------------------+
    | Validation failures |   15 % | MRZ / date rule violations.              |
    +---------------------+--------+------------------------------------------+

    The validation component is binary: 0 when all rules pass, 15 when any
    rule fails.  This can be replaced with a per-rule weighted sum for finer
    granularity.

    Parameters
    ----------
    validation_all_pass : bool
        ``True`` when every boolean rule in ``ValidationResults`` is ``True``.
    tampering_score : float
        CNN output in ``[0, 100]``; higher = more suspicious.
    face_match_score : float
        Biometric similarity in ``[0, 100]``; higher = more similar.

    Returns
    -------
    float
        Rounded composite risk score in ``[0.0, 100.0]``.
    """
    validation_penalty: float = 0.0 if validation_all_pass else 15.0

    raw = (
        tampering_score       * 0.50
        + (100.0 - face_match_score) * 0.35
        + validation_penalty
    )

    score = round(min(max(raw, 0.0), 100.0), 2)
    logger.info(
        "inference | risk_score=%.2f "
        "(tampering=%.2f×0.5, face_gap=%.2f×0.35, validation_penalty=%.1f)",
        score,
        tampering_score,
        100.0 - face_match_score,
        validation_penalty,
    )
    return score


# ---------------------------------------------------------------------------
# Heatmap URL decision
# ---------------------------------------------------------------------------

_TAMPERING_HEATMAP_THRESHOLD = 50.0  # generate heatmap above this score


def _heatmap_url_for(
    tampering_score: float,
    doc_url: str,
) -> Optional[str]:
    """
    Return a heatmap URL when the tampering score exceeds the threshold.

    In production this would trigger an async job that runs GradCAM / ELA
    on the image and uploads the result to object storage, then returns the
    CDN URL.  For now it returns a deterministic placeholder.
    """
    if tampering_score < _TAMPERING_HEATMAP_THRESHOLD:
        return None

    # TODO: Replace with real async heatmap-generation call, e.g.:
    #   heatmap_bytes = await generate_gradcam_heatmap(doc_image_bytes, tampering_model)
    #   return await upload_to_storage(heatmap_bytes, prefix="heatmaps/")
    return "https://storage.example.com/heatmaps/result_heatmap.jpg"


# ---------------------------------------------------------------------------
# Main orchestration function
# ---------------------------------------------------------------------------

async def process_scan(
    request: ScanRequest,
    models: ModelRegistry,
) -> ScanResponse:
    """
    Orchestrate the full document-intelligence pipeline for a single request.

    Execution order
    ---------------
    1. Download both images concurrently via a shared ``httpx.AsyncClient``.
    2. **Step A** – OCR extraction + MRZ checksum validation (CPU-bound,
       offload to thread pool in production via ``asyncio.to_thread``).
    3. **Step B** – CNN tampering detection (GPU/CPU-bound, same advice).
    4. **Step C** – Biometric face verification (GPU/CPU-bound).
    5. Aggregate signals → ``risk_score``.
    6. Build and return ``ScanResponse``.

    Parameters
    ----------
    request : ScanRequest
        Validated payload with ``docImageUrl`` and ``faceImageUrl``.
    models : ModelRegistry
        Populated model registry from ``app.state.models``.

    Returns
    -------
    ScanResponse
        Fully populated response object serialised by FastAPI.
    """
    logger.info(
        "inference | ── pipeline start ──────────────────────────────────────"
    )
    logger.info(
        "inference | doc=%s | face=%s",
        request.docImageUrl,
        request.faceImageUrl,
    )

    # ── 1. Concurrently download both images ─────────────────────────────
    async with httpx.AsyncClient() as client:
        import asyncio
        doc_bytes, selfie_bytes = await asyncio.gather(
            _download_image(client, request.docImageUrl,   "doc"),
            _download_image(client, request.faceImageUrl, "selfie"),
        )

    # ── Step A: OCR extraction + MRZ validation ──────────────────────────
    # In production, wrap with asyncio.to_thread() to avoid blocking the
    # event loop:
    #   extracted, validation = await asyncio.to_thread(
    #       run_ocr_and_mrz, doc_bytes, models.ocr
    #   )
    logger.info("inference | Step A – OCR + MRZ validation")
    extracted, validation = run_ocr_and_mrz(doc_bytes, models.ocr)
    logger.info(
        "inference | Step A done | Name=%s | PassportNo=%s | mrz_valid=%s",
        extracted.Name,
        extracted.PassportNo,
        validation.mrz_checksum_valid,
    )

    # ── Step B: CNN tampering detection ──────────────────────────────────
    # In production:
    #   tampering_score = await asyncio.to_thread(
    #       run_tampering_detection, doc_bytes, models.tampering
    #   )
    logger.info("inference | Step B – CNN tampering detection")
    tampering_score: float = run_tampering_detection(doc_bytes, models.tampering)
    logger.info("inference | Step B done | tampering_score=%.2f", tampering_score)

    # ── Step C: Biometric face verification ──────────────────────────────
    # In production:
    #   face_match_score = await asyncio.to_thread(
    #       run_face_verification, doc_bytes, selfie_bytes, models.face
    #   )
    logger.info("inference | Step C – face verification")
    face_match_score: float = run_face_verification(doc_bytes, selfie_bytes, models.face)
    logger.info("inference | Step C done | face_match_score=%.2f", face_match_score)

    # ── Aggregate risk score ─────────────────────────────────────────────
    validation_all_pass = all(validation.model_dump().values())
    risk_score = _aggregate_risk_score(
        validation_all_pass=validation_all_pass,
        tampering_score=tampering_score,
        face_match_score=face_match_score,
    )

    # ── Build response ───────────────────────────────────────────────────
    response = ScanResponse(
        extracted_fields=extracted,
        validation_results=validation,
        tampering_score=tampering_score,
        face_match_score=face_match_score,
        risk_score=risk_score,
        tampering_heatmap_url=_heatmap_url_for(tampering_score, request.docImageUrl),
    )

    logger.info(
        "inference | ── pipeline complete | risk=%.2f | tampering=%.2f | face=%.2f ──",
        response.risk_score,
        response.tampering_score,
        response.face_match_score,
    )
    return response
