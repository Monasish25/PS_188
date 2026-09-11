export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type VerificationVerdict = 'PASS' | 'MANUAL_REVIEW' | 'REJECT';

export interface ExtractedFieldItem {
  key: string;
  label: string;
  value: string;
  confidence: number;
  source: 'VIZ' | 'MRZ' | 'INFERRED';
  status: 'valid' | 'suspicious' | 'mismatch' | 'unverified';
  mrzComparison?: {
    mrzValue?: string;
    matches: boolean;
  };
}

export interface MRZData {
  present: boolean;
  rawLines: string[];
  documentType: string;
  countryCode: string;
  surName: string;
  givenNames: string;
  documentNumber: string;
  docNumberCheckDigit: string;
  isDocNumberValid: boolean;
  nationality: string;
  dob: string;
  dobCheckDigit: string;
  isDobValid: boolean;
  sex: string;
  expiryDate: string;
  expiryCheckDigit: string;
  isExpiryValid: boolean;
  compositeCheckDigit: string;
  isCompositeValid: boolean;
}

export interface ForensicFinding {
  id: string;
  category: 'TAMPERING' | 'CROSS_FIELD' | 'SECURITY_FEATURES' | 'BIOMETRIC' | 'OCR_ANOMALY';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASS';
  title: string;
  description: string;
  recommendation: string;
  boundingBox?: {
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    width: number; // percentage 0-100
    height: number; // percentage 0-100
    label: string;
  };
}

export interface BiometricComparisonResult {
  conducted: boolean;
  matchScore: number; // 0 to 100
  verdict: 'MATCH' | 'INCONCLUSIVE' | 'NO_MATCH' | 'NOT_PROVIDED';
  confidence: number;
  faceDetectedInDoc: boolean;
  faceDetectedInSelfie: boolean;
  livenessIndicators: {
    screenPlaybackRisk: boolean;
    printedPhotoRisk: boolean;
    headPoseNatural: boolean;
    facialOcclusion: boolean;
  };
  notes: string;
}

export interface RiskScoreBreakdown {
  overallRiskScore: number; // 0 (Low risk) to 100 (High risk)
  authenticityConfidence: number; // 0 to 100
  riskLevel: RiskLevel;
  verdict: VerificationVerdict;
  tamperingRisk: number; // 0 - 100
  dataConsistencyRisk: number; // 0 - 100
  securityFeaturesRisk: number; // 0 - 100
  biometricMismatchRisk: number; // 0 - 100
  primaryReasons: string[];
  summary: string;
}

export interface VerificationResult {
  inspectionId: string;
  timestamp: string;
  documentClassification: {
    detectedType: string;
    issuingCountry: string;
    confidence: number;
  };
  extractedFields: ExtractedFieldItem[];
  mrz?: MRZData;
  findings: ForensicFinding[];
  biometricResult: BiometricComparisonResult;
  risk: RiskScoreBreakdown;
  audit: {
    sha256Hash: string;
    engineVersion: string;
    executionTimeMs: number;
    securityChecksRun: number;
    securityChecksPassed: number;
    analystNotes?: string;
  };
  documentImage: string;
  selfieImage?: string;
}

export interface VerificationRequest {
  documentImage: string; // base64
  documentType: string;
  selfieImage?: string; // base64
  applicantName?: string;
  documentReference?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  documentType: string;
  applicantName: string;
  documentNumberMasked: string;
  riskLevel: RiskLevel;
  verdict: VerificationVerdict;
  tamperingDetected: boolean;
  faceMatchScore?: number;
  analyst: string;
  sha256Hash: string;
  executionDurationMs: number;
}
