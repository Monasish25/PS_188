export interface SampleDocPreset {
  id: string;
  name: string;
  documentType: string;
  country: string;
  expectedRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  badge: string;
  documentImage: string;
  selfieImage: string;
  targetIssues: string[];
}

export const SAMPLE_DOCUMENT_PRESETS: SampleDocPreset[] = [
  {
    id: 'sample-authentic-passport',
    name: 'Authentic Specimen Passport (Standard ICAO 9303)',
    documentType: 'Passport',
    country: 'United Kingdom / European Union Specimen',
    expectedRisk: 'LOW',
    badge: 'Authentic / Low Risk',
    description: 'Compliant biometric passport with valid MRZ checksums, guilloche security patterns, and matching selfie.',
    documentImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    selfieImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    targetIssues: [
      'Visual Inspection Zone (VIZ) aligns with Machine Readable Zone (MRZ)',
      'ICAO 9303 composite check digits validated',
      'No digital image compression or splicing anomalies detected',
      'High facial biometric similarity with live selfie (94.2%)',
    ],
  },
  {
    id: 'sample-tampered-license',
    name: 'Altered Driver\'s License (Font & Date Tampering)',
    documentType: 'Driving License',
    country: 'California / Federal DL Specimen',
    expectedRisk: 'HIGH',
    badge: 'Tampering Detected / High Risk',
    description: 'Birth year and license expiration date modified using cloned bitmap fonts, producing character baseline misalignment.',
    documentImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    selfieImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    targetIssues: [
      'Font typography mismatch detected on Date of Birth field ("1992" vs background grid)',
      'Copy-move cloning artifacts and micro-blur detected around expiration date box',
      'Security micro-print disrupted along the right portrait boundary',
      'Recommended Action: Immediate rejection and fraudulent document flag',
    ],
  },
  {
    id: 'sample-photoswap-id',
    name: 'National Identity Card (Photo Substitution Fraud)',
    documentType: 'National ID Card',
    country: 'Republic of Ireland / EU Identity',
    expectedRisk: 'HIGH',
    badge: 'Biometric Mismatch / High Risk',
    description: 'Portrait box shows sharp pixel perimeter cuts indicating physical/digital photo replacement; live selfie does not match document.',
    documentImage: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
    selfieImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    targetIssues: [
      'Digital splice boundary detected around the primary portrait frame',
      'Lighting vector inconsistency between subject face and background security pattern',
      'Biometric 1:1 Face Match Score: 31.8% (Fail threshold < 65%)',
      'MRZ check digit inconsistency on personal ID sequence',
    ],
  },
  {
    id: 'sample-expired-residence',
    name: 'Permanent Residence Card (Expired & Checksum Anomaly)',
    documentType: 'Residence Permit',
    country: 'Canada / Permanent Resident Specimen',
    expectedRisk: 'MEDIUM',
    badge: 'Review Required / Medium Risk',
    description: 'Document has passed expiration date threshold, with low-contrast holographic security strip requiring manual verification.',
    documentImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    selfieImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    targetIssues: [
      'Date of Expiry chronologically elapsed (Expired 180+ days ago)',
      'Holographic overlay pattern lacks characteristic dynamic optical diffraction',
      'Biometric face match verified (88.4%), but document validity has lapsed',
      'Recommended Action: Route to senior officer desk for secondary review',
    ],
  },
];
