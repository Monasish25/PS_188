from typing import Optional
from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Request schema
# ---------------------------------------------------------------------------

class ScanRequest(BaseModel):
    """Payload sent by the caller to trigger a passport scan analysis."""

    docImageUrl: str = Field(
        ...,
        description="Publicly accessible URL of the passport / ID document image.",
        examples=["https://storage.example.com/docs/passport_front.jpg"],
    )
    faceImageUrl: str = Field(
        ...,
        description="Publicly accessible URL of the live / selfie face image.",
        examples=["https://storage.example.com/faces/selfie.jpg"],
    )


# ---------------------------------------------------------------------------
# Nested payload types
# ---------------------------------------------------------------------------

class ExtractedFields(BaseModel):
    """OCR-extracted text fields from the document."""

    Name: str = Field(..., description="Full name as printed on the document.")
    DOB: str = Field(..., description="Date of birth in ISO-8601 format (YYYY-MM-DD).")
    MRZ: str = Field(..., description="Raw Machine-Readable Zone string (two or three lines joined by '|').")
    PassportNo: str = Field(..., description="Passport / document number.")


class ValidationResults(BaseModel):
    """Boolean rule-based validation outcomes."""

    mrz_checksum_valid: bool = Field(..., description="True when MRZ check-digits all pass.")
    mrz_fields_match_viz: bool = Field(
        ...,
        description="True when MRZ data matches the Visual Inspection Zone (VIZ).",
    )
    dob_format_valid: bool = Field(..., description="True when DOB is a parsable, realistic date.")
    expiry_date_valid: bool = Field(..., description="True when the document has not expired.")
    expiry_format_valid: bool = Field(..., description="True when expiry date is a parsable date.")


# ---------------------------------------------------------------------------
# Response schema
# ---------------------------------------------------------------------------

class ScanResponse(BaseModel):
    """Full analysis result returned to the caller."""

    extracted_fields: ExtractedFields = Field(
        ...,
        description="Structured data extracted from the document image.",
    )
    validation_results: ValidationResults = Field(
        ...,
        description="Boolean rule-checks applied to the extracted data.",
    )
    tampering_score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Confidence that the document has been digitally tampered with (0 = pristine, 100 = certain forgery).",
    )
    face_match_score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Biometric similarity between document photo and selfie (0 = no match, 100 = identical).",
    )
    risk_score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Composite fraud-risk score derived from tampering, face match, and validation signals (0 = low risk, 100 = high risk).",
    )
    tampering_heatmap_url: Optional[str] = Field(
        default=None,
        description="URL of a generated heatmap image highlighting suspected tampering regions, if available.",
    )
