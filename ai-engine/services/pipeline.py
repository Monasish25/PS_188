"""
ai-engine/services/pipeline.py
================================
Sequential AI pipeline steps executed inside ``process_scan``.

Each public function maps 1-to-1 to a pipeline stage:

    Step A  –  ``run_ocr_and_mrz``         → OCR + MRZ checksum validation
    Step B  –  ``run_tampering_detection``  → CNN splicing / forgery score
    Step C  –  ``run_face_verification``    → biometric cosine similarity

Design principles
-----------------
- Every function accepts raw ``bytes`` so it stays decoupled from the HTTP
  layer; images are downloaded upstream in ``inference.py``.
- Every function receives the relevant model object from the ``ModelRegistry``
  so there is no global state and unit-testing is trivial (just pass ``None``
  to exercise the stub path).
- The real inference code is written-out in full (but commented) so a
  developer only needs to uncomment + install deps to go live.
"""

from __future__ import annotations

import io
import logging
import re
from typing import Any, Tuple

import numpy as np
from PIL import Image

from schemas import ExtractedFields, ValidationResults

logger = logging.getLogger("ai-engine.pipeline")


# ---------------------------------------------------------------------------
# Shared image utility
# ---------------------------------------------------------------------------

def _bytes_to_rgb_array(image_bytes: bytes) -> np.ndarray:
    """
    Decode raw image bytes into a ``uint8`` NumPy array in **RGB** order
    with shape ``(H, W, 3)``.

    Raises
    ------
    ValueError
        If the bytes cannot be decoded as a valid image.
    """
    try:
        pil_img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        return np.array(pil_img, dtype=np.uint8)
    except Exception as exc:
        raise ValueError(f"Failed to decode image bytes: {exc}") from exc


def _rgb_to_bgr(array: np.ndarray) -> np.ndarray:
    """Reverse channel order RGB → BGR (required by OpenCV and InsightFace)."""
    return array[:, :, ::-1].copy()


# ---------------------------------------------------------------------------
# MRZ checksum helper (pure Python – no external dependency)
# ---------------------------------------------------------------------------

_MRZ_WEIGHTS = [7, 3, 1]
_MRZ_CHARS   = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<"


def _mrz_check_digit(field: str) -> int:
    """
    Compute the ICAO 9303 check digit for a MRZ field string.

    Characters map to values: '0'-'9' → 0-9, 'A'-'Z' → 10-35, '<' → 0.
    Weights cycle as 7, 3, 1.
    """
    total = 0
    for i, ch in enumerate(field.upper()):
        value = _MRZ_CHARS.index(ch) if ch in _MRZ_CHARS else 0
        total += value * _MRZ_WEIGHTS[i % 3]
    return total % 10


def _validate_mrz(mrz_raw: str) -> ValidationResults:
    """
    Perform ICAO TD-3 MRZ validation on a two-line MRZ string joined by '|'.

    Checks performed
    ----------------
    1. Passport-number check digit  (chars 0-8 + check at 9 on line 2)
    2. DOB check digit              (chars 13-18 + check at 19 on line 2)
    3. Expiry check digit           (chars 21-26 + check at 27 on line 2)
    4. Overall composite check digit (chars 0-9, 13-19, 21-27 on line 2)
    5. DOB / expiry are parsable dates
    6. Expiry is in the future

    Falls back to all-True stubs if the MRZ doesn't match the expected
    format so the rest of the pipeline can continue.
    """
    import datetime  # local import – keeps top-level imports clean

    parts = mrz_raw.split("|")
    if len(parts) < 2 or len(parts[1]) < 44:
        logger.warning("pipeline | MRZ format unrecognised – skipping checksum validation")
        return ValidationResults(
            mrz_checksum_valid=False,
            mrz_fields_match_viz=False,
            dob_format_valid=False,
            expiry_date_valid=False,
            expiry_format_valid=False,
        )

    line2 = parts[1]

    # Extract sub-fields from line 2
    passport_no   = line2[0:9]
    passport_chk  = int(line2[9])
    dob_raw       = line2[13:19]   # YYMMDD
    dob_chk       = int(line2[19])
    expiry_raw    = line2[21:27]   # YYMMDD
    expiry_chk    = int(line2[27])
    composite_src = line2[0:10] + line2[13:20] + line2[21:28]
    composite_chk = int(line2[43])

    # Checksum validations
    passport_ok  = _mrz_check_digit(passport_no)  == passport_chk
    dob_ok       = _mrz_check_digit(dob_raw)      == dob_chk
    expiry_ok    = _mrz_check_digit(expiry_raw)   == expiry_chk
    composite_ok = _mrz_check_digit(composite_src) == composite_chk
    mrz_checksum_valid = all([passport_ok, dob_ok, expiry_ok, composite_ok])

    # Date format + expiry check
    dob_format_valid    = bool(re.fullmatch(r"\d{6}", dob_raw))
    expiry_format_valid = bool(re.fullmatch(r"\d{6}", expiry_raw))

    expiry_date_valid = False
    if expiry_format_valid:
        try:
            yy, mm, dd = int(expiry_raw[:2]), int(expiry_raw[2:4]), int(expiry_raw[4:])
            year = 2000 + yy if yy < 70 else 1900 + yy
            expiry_dt = datetime.date(year, mm, dd)
            expiry_date_valid = expiry_dt > datetime.date.today()
        except ValueError:
            expiry_date_valid = False

    return ValidationResults(
        mrz_checksum_valid=mrz_checksum_valid,
        mrz_fields_match_viz=True,   # VIZ ↔ MRZ cross-check: requires layout analysis (TODO)
        dob_format_valid=dob_format_valid,
        expiry_date_valid=expiry_date_valid,
        expiry_format_valid=expiry_format_valid,
    )


# ---------------------------------------------------------------------------
# Step A – OCR extraction + MRZ validation
# ---------------------------------------------------------------------------

def run_ocr_and_mrz(
    image_bytes: bytes,
    ocr_model: Any,
) -> Tuple[ExtractedFields, ValidationResults]:
    """
    Run PaddleOCR on the document image to extract text fields, locate the
    MRZ zone, and validate ICAO 9303 check digits.

    Parameters
    ----------
    image_bytes : bytes
        Raw bytes of the passport / ID document image.
    ocr_model : Any
        A loaded ``PaddleOCR`` instance from the ``ModelRegistry``, or
        ``None`` to use the stub fallback.

    Returns
    -------
    tuple[ExtractedFields, ValidationResults]
        Parsed document fields and a set of boolean validation flags.
    """
    if ocr_model is not None:
        img_array = _bytes_to_rgb_array(image_bytes)

        # ── Real PaddleOCR inference ─────────────────────────────────────
        # result = ocr_model.ocr(img_array, cls=True)
        # # result shape: [[[bbox, (text, confidence)], ...], ...]
        # raw_lines: list[str] = [
        #     line[1][0]
        #     for block in (result or [])
        #     for line in block
        # ]
        #
        # # ── Locate MRZ lines (ICAO TD-3: two 44-char lines of [A-Z0-9<]) ──
        # mrz_pattern = re.compile(r"^[A-Z0-9<]{44}$")
        # mrz_lines   = [l for l in raw_lines if mrz_pattern.match(l.strip())]
        # mrz_raw     = "|".join(mrz_lines[:2]) if len(mrz_lines) >= 2 else ""
        #
        # # ── Parse Name from line 1 of MRZ  ──────────────────────────────
        # name_raw = mrz_lines[0][5:] if mrz_lines else ""
        # name     = name_raw.replace("<", " ").strip() if name_raw else "UNKNOWN"
        #
        # # ── Parse DOB from line 2 pos 13-18  ────────────────────────────
        # dob_raw  = mrz_lines[1][13:19] if len(mrz_lines) > 1 else ""
        # dob      = f"19{dob_raw[:2]}-{dob_raw[2:4]}-{dob_raw[4:]}" if dob_raw else ""
        #
        # # ── Parse Passport No from line 2 pos 0-8  ──────────────────────
        # passport_no = mrz_lines[1][0:9].replace("<", "") if len(mrz_lines) > 1 else ""
        #
        # extracted = ExtractedFields(Name=name, DOB=dob, MRZ=mrz_raw, PassportNo=passport_no)
        # validation = _validate_mrz(mrz_raw)
        # return extracted, validation

        logger.info("pipeline | OCR model present but real parsing is commented-out; using stub")

    # ── Stub / fallback (no model or model-path not yet uncommented) ─────
    logger.warning("pipeline | Step A stub active – returning hardcoded extraction")
    extracted = ExtractedFields(
        Name="John Doe",
        DOB="1990-04-23",
        MRZ=(
            "P<GBRDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
            "|9200435521GBR9004237M3101015<<<<<<04"
        ),
        PassportNo="920043552",
    )
    # Still run real MRZ checksum validation against the stub MRZ string
    validation = _validate_mrz(extracted.MRZ)
    return extracted, validation


# ---------------------------------------------------------------------------
# Step B – CNN splicing / metadata tampering detection
# ---------------------------------------------------------------------------

def run_tampering_detection(
    image_bytes: bytes,
    tampering_model: Any,
) -> float:
    """
    Pass the document image through a fine-tuned EfficientNet-B4 binary
    classifier that detects digital splicing, copy-move forgeries, and
    EXIF / metadata anomalies.

    Parameters
    ----------
    image_bytes : bytes
        Raw bytes of the passport / ID document image.
    tampering_model : Any
        A loaded TorchScript model from the ``ModelRegistry``, or ``None``
        to use the stub fallback.

    Returns
    -------
    float
        Tampering confidence in ``[0.0, 100.0]``.
        0 = pristine document; 100 = near-certain forgery.
    """
    if tampering_model is not None:
        img_array = _bytes_to_rgb_array(image_bytes)

        # ── Real PyTorch inference ────────────────────────────────────────
        # import torch
        # import torchvision.transforms as T
        # from PIL import Image as PILImage
        #
        # transform = T.Compose([
        #     T.Resize((224, 224)),
        #     T.ToTensor(),
        #     T.Normalize(mean=[0.485, 0.456, 0.406],
        #                 std=[0.229, 0.224, 0.225]),
        # ])
        # pil_img = PILImage.fromarray(img_array)
        # tensor  = transform(pil_img).unsqueeze(0)       # (1, 3, 224, 224)
        #
        # with torch.no_grad():
        #     logits = tampering_model(tensor)             # raw logit
        #     prob   = torch.sigmoid(logits).item()        # binary prob [0, 1]
        #
        # score = round(prob * 100.0, 2)
        # logger.info("pipeline | Step B tampering_score=%.2f", score)
        # return score

        logger.info("pipeline | Tampering model present but inference is commented-out; using stub")

    # ── Stub / fallback ──────────────────────────────────────────────────
    logger.warning("pipeline | Step B stub active – returning hardcoded tampering score")
    return 12.0


# ---------------------------------------------------------------------------
# Step C – Biometric face verification
# ---------------------------------------------------------------------------

def run_face_verification(
    doc_image_bytes: bytes,
    selfie_image_bytes: bytes,
    face_model: Any,
) -> float:
    """
    Extract the face embedding from the document photo and from the live
    selfie using InsightFace, then compute their cosine similarity.

    Parameters
    ----------
    doc_image_bytes : bytes
        Raw bytes of the passport / ID document image (contains the photo
        page; InsightFace will detect and crop the face automatically).
    selfie_image_bytes : bytes
        Raw bytes of the live / selfie image.
    face_model : Any
        A prepared ``InsightFace.FaceAnalysis`` instance from the
        ``ModelRegistry``, or ``None`` for the stub fallback.

    Returns
    -------
    float
        Biometric similarity in ``[0.0, 100.0]``.
        0 = no match; 100 = identical biometric signature.
    """
    if face_model is not None:
        doc_bgr    = _rgb_to_bgr(_bytes_to_rgb_array(doc_image_bytes))
        selfie_bgr = _rgb_to_bgr(_bytes_to_rgb_array(selfie_image_bytes))

        # ── Real InsightFace inference ────────────────────────────────────
        # doc_faces    = face_model.get(doc_bgr)
        # selfie_faces = face_model.get(selfie_bgr)
        #
        # if not doc_faces:
        #     logger.warning("pipeline | No face detected in document image")
        #     return 0.0
        # if not selfie_faces:
        #     logger.warning("pipeline | No face detected in selfie image")
        #     return 0.0
        #
        # # Use the largest face detected in each image
        # doc_face    = max(doc_faces,    key=lambda f: f.bbox[2] * f.bbox[3])
        # selfie_face = max(selfie_faces, key=lambda f: f.bbox[2] * f.bbox[3])
        #
        # doc_emb    = doc_face.normed_embedding     # L2-normalised 512-d vector
        # selfie_emb = selfie_face.normed_embedding
        # cosine_sim = float(np.dot(doc_emb, selfie_emb))   # range [-1, 1]
        #
        # score = round(max(0.0, cosine_sim) * 100.0, 2)
        # logger.info("pipeline | Step C face_match_score=%.2f", score)
        # return score

        logger.info("pipeline | Face model present but inference is commented-out; using stub")

    # ── Stub / fallback ──────────────────────────────────────────────────
    logger.warning("pipeline | Step C stub active – returning hardcoded face match score")
    return 98.5
