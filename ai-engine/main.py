"""
ai-engine/main.py
=================
Internal FastAPI microservice for passport / ID document analysis.

This service is **internal-only** — it is reachable exclusively via the
Docker-internal network by the Node.js Gateway.  CORS is intentionally
disabled.  No public traffic should ever reach this process directly.

Startup behaviour
-----------------
The ``lifespan`` context manager loads all ML models into ``app.state``
before the server accepts its first request.  This guarantees:

  - Models are initialised exactly once (not per-request).
  - Cold-start latency is paid upfront, not on the first live request.
  - Each endpoint receives models by reading ``request.app.state.models``.

Endpoints
---------
GET  /health              – Liveness probe.
POST /scan                – Legacy full-pipeline scan.
POST /internal/analyze    – Primary internal inference route.

Run
---
    uvicorn main:app --host 0.0.0.0 --port 3000 --reload
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, Request, status

from schemas import ScanRequest, ScanResponse
from services.inference import process_scan
from services.model_loader import ModelRegistry, load_all_models

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger("ai-engine")


# ---------------------------------------------------------------------------
# Lifespan – model loading on startup, cleanup on shutdown
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    FastAPI lifespan context manager.

    **Startup** (code before ``yield``):
      - Calls ``load_all_models()`` which initialises PaddleOCR,
        InsightFace, and the tampering CNN sequentially.
      - Attaches the resulting ``ModelRegistry`` to ``app.state.models``
        so every request handler can access it without any global state.

    **Shutdown** (code after ``yield``):
      - Release any resources held by the models (GPU memory, file handles).
        Add explicit teardown here if your model framework requires it.
    """
    # ── Startup ──────────────────────────────────────────────────────────
    logger.info("lifespan | ── application startup ─────────────────────────")
    logger.info("lifespan | loading ML models into memory …")

    models: ModelRegistry = load_all_models()
    app.state.models = models

    loaded = [k for k, v in models.__dict__.items() if v is not None]
    stubs  = [k for k, v in models.__dict__.items() if v is None]
    logger.info(
        "lifespan | startup complete | loaded=%s | stub_fallback=%s",
        loaded, stubs,
    )
    logger.info("lifespan | ── server ready to accept requests ─────────────")

    yield  # ← server runs here, handling requests

    # ── Shutdown ─────────────────────────────────────────────────────────
    logger.info("lifespan | ── application shutdown ────────────────────────")
    # Add explicit model teardown here if needed, e.g.:
    #   del app.state.models.ocr
    #   torch.cuda.empty_cache()
    logger.info("lifespan | shutdown complete")


# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="AI Engine – Document Intelligence Microservice",
    description=(
        "Internal microservice that performs OCR extraction, MRZ validation, "
        "digital-tampering detection, and biometric face-match scoring on "
        "passport / ID document images."
    ),
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# NOTE: CORS is intentionally NOT configured.
# This microservice is isolated inside a Docker network and is only
# reachable by the internal Node.js Gateway.  Adding CORS headers here
# would expose the service to browser-based cross-origin requests, which
# is explicitly out of scope for an internal inference backend.
# ---------------------------------------------------------------------------


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@app.get(
    "/health",
    summary="Health check",
    tags=["Infrastructure"],
    response_model=dict,
)
async def health_check() -> dict:
    """Liveness probe – returns ``{"status": "healthy"}``."""
    return {"status": "healthy"}


@app.post(
    "/scan",
    summary="Scan a passport / ID document (legacy)",
    tags=["Document Intelligence"],
    response_model=ScanResponse,
    status_code=status.HTTP_200_OK,
)
async def scan_document(payload: ScanRequest, request: Request) -> ScanResponse:
    """
    Legacy scan endpoint — delegates to the shared ``process_scan`` pipeline.

    Prefer ``POST /internal/analyze`` for all new internal callers.
    """
    logger.info(
        "/scan | docImageUrl=%s | faceImageUrl=%s",
        payload.docImageUrl,
        payload.faceImageUrl,
    )
    models: ModelRegistry = request.app.state.models
    return await process_scan(payload, models)


@app.post(
    "/internal/analyze",
    summary="Internal inference route – analyze a passport / ID document",
    tags=["Internal"],
    response_model=ScanResponse,
    status_code=status.HTTP_200_OK,
)
async def internal_analyze(payload: ScanRequest, request: Request) -> ScanResponse:
    """
    Primary inference endpoint consumed by the **Node.js Gateway** over the
    Docker-internal network.

    Retrieves the pre-loaded ``ModelRegistry`` from ``app.state`` (populated
    at startup by the lifespan context manager) and delegates the full ML
    pipeline to ``process_scan``, returning a ``ScanResponse`` with:

    - **extracted_fields** – OCR'd Name, DOB, MRZ, PassportNo.
    - **validation_results** – Boolean MRZ / date rule-checks.
    - **tampering_score** – 0-100 forgery confidence.
    - **face_match_score** – 0-100 biometric similarity.
    - **risk_score** – Composite fraud-risk score.
    - **tampering_heatmap_url** – Heatmap URL if tampering is detected.
    """
    logger.info(
        "/internal/analyze | docImageUrl=%s | faceImageUrl=%s",
        payload.docImageUrl,
        payload.faceImageUrl,
    )
    models: ModelRegistry = request.app.state.models
    return await process_scan(payload, models)
