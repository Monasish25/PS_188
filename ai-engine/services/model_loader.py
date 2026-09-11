"""
ai-engine/services/model_loader.py
====================================
Responsible for loading every ML model exactly once at application startup.

The ``ModelRegistry`` dataclass is attached to ``app.state.models`` via the
FastAPI lifespan context manager in ``main.py``.  Endpoint handlers retrieve
it from there and pass it down into the inference pipeline — no globals, no
module-level singletons, no per-request reloads.

Production swap-in
------------------
Each ``load_*`` function has a clear comment marking where the real model
initialisation code goes.  The surrounding try/except blocks ensure the
server starts even when a library is not yet installed, falling back to stub
behaviour in ``services/pipeline.py``.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any

logger = logging.getLogger("ai-engine.model_loader")


# ---------------------------------------------------------------------------
# Model registry – single source of truth for loaded model objects
# ---------------------------------------------------------------------------

@dataclass
class ModelRegistry:
    """Container for every ML model used by the inference pipeline."""

    ocr: Any        # PaddleOCR instance  (None → stub fallback)
    face: Any       # InsightFace FaceAnalysis app  (None → stub fallback)
    tampering: Any  # PyTorch / ONNX tampering CNN  (None → stub fallback)


# ---------------------------------------------------------------------------
# Individual model loaders
# ---------------------------------------------------------------------------

def load_ocr_model() -> Any:
    """
    Instantiate a PaddleOCR model for English-language passport OCR.

    The model weights are downloaded automatically on first use and cached
    in ``~/.paddleocr/``.  Subsequent startups load from the local cache.

    Returns
    -------
    PaddleOCR | None
        A ready-to-use PaddleOCR instance, or ``None`` if the library is
        not installed (triggers stub behaviour downstream).
    """
    try:
        from paddleocr import PaddleOCR  # type: ignore[import]

        model = PaddleOCR(
            use_textline_orientation=True,   # correct rotated / upside-down text
            lang="en",
            use_gpu=False,        # set True on GPU hosts
            show_log=False,       # suppress verbose PaddlePaddle output
        )
        logger.info("model_loader | ✓ PaddleOCR ready")
        return model

    except ImportError:
        logger.warning(
            "model_loader | paddleocr not installed – OCR will use stub fallback. "
            "Run: pip install paddlepaddle paddleocr"
        )
        return None
    except Exception as exc:  # noqa: BLE001
        logger.error("model_loader | PaddleOCR initialisation failed: %s", exc)
        return None


def load_face_model() -> Any:
    """
    Initialise an InsightFace ``FaceAnalysis`` app with the ``buffalo_l``
    model pack (detection + recognition + landmark).

    Weights are downloaded automatically to ``~/.insightface/models/`` on
    first use.

    Returns
    -------
    FaceAnalysis | None
        A prepared FaceAnalysis instance, or ``None`` if the library is not
        installed (triggers stub behaviour downstream).
    """
    try:
        from insightface.app import FaceAnalysis  # type: ignore[import]

        model = FaceAnalysis(
            name="buffalo_l",
            providers=["CPUExecutionProvider"],  # swap to CUDAExecutionProvider on GPU
        )
        model.prepare(ctx_id=0, det_size=(640, 640))
        logger.info("model_loader | ✓ InsightFace (buffalo_l) ready")
        return model

    except ImportError:
        logger.warning(
            "model_loader | insightface not installed – face verification will use stub. "
            "Run: pip install insightface onnxruntime"
        )
        return None
    except Exception as exc:  # noqa: BLE001
        logger.error("model_loader | InsightFace initialisation failed: %s", exc)
        return None


def load_tampering_model() -> Any:
    """
    Load a fine-tuned EfficientNet-B4 binary classifier that detects
    digital splicing, copy-move forgeries, and EXIF/metadata anomalies.

    Production instructions
    -----------------------
    1. Place the TorchScript checkpoint at ``checkpoints/tampering_cnn.pt``.
    2. Uncomment the ``torch.jit.load`` block below.
    3. Remove the ``return None`` stub.

    Returns
    -------
    torch.jit.ScriptModule | None
        An eval-mode TorchScript model, or ``None`` if the checkpoint or
        library is unavailable (triggers stub behaviour downstream).
    """
    try:
        import torch  # type: ignore[import]

        # ── ↓ Uncomment when the real checkpoint is available ────────────
        # checkpoint_path = Path(__file__).parent.parent / "checkpoints" / "tampering_cnn.pt"
        # if not checkpoint_path.exists():
        #     raise FileNotFoundError(f"Checkpoint not found: {checkpoint_path}")
        # model = torch.jit.load(str(checkpoint_path), map_location="cpu")
        # model.eval()
        # logger.info("model_loader | ✓ Tampering CNN ready (%s)", checkpoint_path.name)
        # return model
        # ── ↑ ────────────────────────────────────────────────────────────

        logger.warning(
            "model_loader | Tampering CNN checkpoint not yet configured – "
            "stub score will be used.  Place checkpoint at checkpoints/tampering_cnn.pt "
            "and uncomment the loader in model_loader.py."
        )
        _ = torch  # imported to validate torch is present even in stub mode
        return None

    except ImportError:
        logger.warning(
            "model_loader | torch not installed – tampering detection will use stub. "
            "Run: pip install torch torchvision"
        )
        return None
    except Exception as exc:  # noqa: BLE001
        logger.error("model_loader | Tampering CNN initialisation failed: %s", exc)
        return None


# ---------------------------------------------------------------------------
# Entrypoint – called once from the lifespan context manager
# ---------------------------------------------------------------------------

def load_all_models() -> ModelRegistry:
    """
    Load every ML model sequentially and return a fully populated
    ``ModelRegistry``.

    Called once during application startup (FastAPI ``lifespan``).
    """
    logger.info("model_loader | ── starting model loading sequence ──────────")
    registry = ModelRegistry(
        ocr=load_ocr_model(),
        face=load_face_model(),
        tampering=load_tampering_model(),
    )
    loaded = [k for k, v in registry.__dict__.items() if v is not None]
    stubs  = [k for k, v in registry.__dict__.items() if v is None]
    logger.info("model_loader | ── loaded: %s | stubs: %s ──────────", loaded, stubs)
    return registry
