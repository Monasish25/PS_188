import React, { useState } from 'react';
import { TopContactBar } from './components/TopContactBar';
import { MainNavbar } from './components/MainNavbar';
import { HeroSlider } from './components/HeroSlider';
import { AmritMahotsavRibbon } from './components/AmritMahotsavRibbon';
import { AboutEmbassySection } from './components/AboutEmbassySection';
import { ItecProgrammeSection } from './components/ItecProgrammeSection';
import { AmritEventShowcase } from './components/AmritEventShowcase';
import { UpdatesSection } from './components/UpdatesSection';
import { UsefulLinksSection } from './components/UsefulLinksSection';
import { GovPartnersCarousel } from './components/GovPartnersCarousel';
import { GovEmblemsStrip } from './components/GovEmblemsStrip';
import { EmbassyFooter } from './components/EmbassyFooter';
import { QuickDetailModal } from './components/QuickDetailModal';
import { LoadingPageScreen } from './components/LoadingPageScreen';
import { VerificationLab } from './components/VerificationLab';
import { RiskReportView } from './components/RiskReportView';
import { AuditRegistry } from './components/AuditRegistry';
import { PresetsModal } from './components/PresetsModal';
import { CertificateModal } from './components/CertificateModal';
import { ComplianceModal } from './components/ComplianceModal';
import { LoginModal } from './components/LoginModal';
import { SIHProjectShowcase } from './components/SIHProjectShowcase';
import { SlideData, ItecCard, NewsItem } from './data/embassyData';
import { SAMPLE_DOCUMENT_PRESETS, SampleDocPreset } from './data/sampleDocuments';
import {
  VerificationRequest,
  VerificationResult,
  AuditLogEntry,
  ForensicFinding,
  ExtractedFieldItem,
} from './types';
import { FileCheck, ArrowLeft, ExternalLink } from 'lucide-react';

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'VER-M49X-89A',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    documentType: 'Passport (ICAO TD3)',
    applicantName: 'ALEXANDER DOE',
    documentNumberMasked: '••••••736',
    riskLevel: 'LOW',
    verdict: 'PASS',
    tamperingDetected: false,
    faceMatchScore: 94.2,
    analyst: 'Automated AI Engine',
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    executionDurationMs: 1420,
  },
  {
    id: 'VER-K28J-91F',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    documentType: 'Driving License',
    applicantName: 'MARCUS STERLING',
    documentNumberMasked: '••••••194',
    riskLevel: 'HIGH',
    verdict: 'REJECT',
    tamperingDetected: true,
    faceMatchScore: 82.1,
    analyst: 'Automated AI Engine',
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    executionDurationMs: 1680,
  },
  {
    id: 'VER-Q71L-33M',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    documentType: 'National ID Card',
    applicantName: 'CONOR O\'BRIEN',
    documentNumberMasked: '••••••491',
    riskLevel: 'HIGH',
    verdict: 'REJECT',
    tamperingDetected: true,
    faceMatchScore: 31.8,
    analyst: 'Automated AI Engine',
    sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    executionDurationMs: 1890,
  },
  {
    id: 'VER-T55P-12E',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    documentType: 'Residence Permit',
    applicantName: 'ELENA VASILIEV',
    documentNumberMasked: '••••••508',
    riskLevel: 'MEDIUM',
    verdict: 'MANUAL_REVIEW',
    tamperingDetected: false,
    faceMatchScore: 68.4,
    analyst: 'Consular Section Reviewer',
    sha256Hash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    executionDurationMs: 1530,
  },
];

export function App() {
  // Navigation & Theme State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1);
  const [showSkeletonLoading, setShowSkeletonLoading] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string } | null>(null);

  // Consular Screening State
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [redactPii, setRedactPii] = useState<boolean>(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState<boolean>(false);
  const [consularViewMode, setConsularViewMode] = useState<'lab' | 'report' | 'audit'>('lab');

  // Modal State for Portal Details
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    content: null,
  });

  const handleAdjustFontSize = (delta: number) => {
    setFontSizeLevel((prev) => Math.max(0, Math.min(3, prev + delta)));
  };

  const handleOpenDetailModal = (title: string, content: React.ReactNode) => {
    setModalState({
      isOpen: true,
      title,
      content,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSelectNavTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'consular' || tabId === 'sih-project') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Smooth scroll to corresponding section on the page
    const sectionMap: Record<string, string> = {
      home: 'hero-slider-section',
      'about-us': 'about-embassy-section',
      'india-75': 'amrit-mahotsav-ribbon',
      itec: 'itec-programme-section',
      bilateral: 'about-embassy-section',
      media: 'updates-section',
      tender: 'updates-section',
      publications: 'gov-emblems-strip',
      contact: 'useful-links-section',
    };

    const targetId = sectionMap[tabId];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearch = (query: string) => {
    handleOpenDetailModal(
      `Search Results: "${query}"`,
      <div className="space-y-4">
        <p className="text-sm text-slate-700">
          Showing matching consular guidelines, bilateral tenders, and official notices for <strong className="text-[#e86a38]">"{query}"</strong>:
        </p>
        <div className="space-y-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-orange-300 cursor-pointer">
            <h5 className="font-semibold text-xs text-slate-900">Visa &amp; Passport Services Portal</h5>
            <p className="text-2xs text-slate-600">Complete documentation, appointment schedules, and biometrics processing guidelines.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-orange-300 cursor-pointer">
            <h5 className="font-semibold text-xs text-slate-900">ITEC Training Fellowship 2023-2024</h5>
            <p className="text-2xs text-slate-600">Civilian courses, engineering, remote sensing, and public policy programmes funded by MEA.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-orange-300 cursor-pointer">
            <h5 className="font-semibold text-xs text-slate-900">Commercial Inquiries &amp; Trade Delegation Desk</h5>
            <p className="text-2xs text-slate-600">Promoting pharmaceuticals, IT exports, and bilateral investment between India and Guatemala.</p>
          </div>
        </div>
      </div>
    );
  };

  const handleOpenSlideDetail = (slide: SlideData) => {
    handleOpenDetailModal(
      slide.title,
      <div className="space-y-4">
        <div className="rounded-xl overflow-hidden border border-slate-200 max-h-64">
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-2 text-2xs font-semibold text-[#e86a38] uppercase">
          <span>{slide.tagline}</span>
          <span>•</span>
          <span>{slide.date}</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-normal">
          {slide.subtitle}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Embassy of India in Guatemala City continues to advance bilateral trade and multilateral cooperation across Central America, connecting public-sector institutions, industrial chambers, and commercial partners.
        </p>
      </div>
    );
  };

  const handleSelectItecCard = (card: ItecCard) => {
    handleOpenDetailModal(
      card.title,
      <div className="space-y-4">
        <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl">
          <span className="text-2xs font-bold uppercase text-[#e86a38]">{card.category}</span>
          <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">{card.description}</p>
        </div>
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
            Key Scholarship Features:
          </h5>
          <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-slate-600">
            {card.highlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </div>
        <div className="pt-2">
          <a
            href="https://www.itecgoi.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#e86a38] text-white text-xs font-semibold hover:bg-[#d95927] transition"
          >
            <span>Visit Official ITEC Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  };

  const handleSelectNews = (item: NewsItem) => {
    handleOpenDetailModal(
      item.title,
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-slate-500 pb-2 border-b border-slate-100">
          <span className="px-2 py-0.5 rounded bg-orange-50 text-[#e86a38] font-bold text-3xs uppercase">
            {item.category}
          </span>
          <span>Date Published: {item.date}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Official release issued by the Chancery of the Embassy of India, accredited to Guatemala, El Salvador &amp; Honduras.
        </p>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
          <p><strong>Reference Number:</strong> EOI/GUA/{item.date.slice(-4)}/PUB-{item.id}</p>
          <p><strong>Focal Contact:</strong> Head of Chancery, Embassy of India</p>
          <p><strong>Email:</strong> hoc.guatemala@mea.gov.in</p>
        </div>
      </div>
    );
  };

  const handleOpenPolicy = (policyTitle: string) => {
    handleOpenDetailModal(
      policyTitle,
      <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          Official policy document maintained in accordance with the Guidelines for Indian Government Websites (GIGW) and the Ministry of External Affairs, New Delhi.
        </p>
        <p>
          All information published on this portal is managed directly by the Embassy of India in Guatemala. Reproductions or excerpts must appropriately credit the Embassy as the official source.
        </p>
      </div>
    );
  };

  // Consular Screening Handlers
  const handleRunVerification = async (req: VerificationRequest) => {
    setIsVerifying(true);
    setActiveStep(1);
    setShowSkeletonLoading(true);

    setTimeout(() => {
      setActiveStep(3);
    }, 600);

    setTimeout(() => {
      setActiveStep(5);
    }, 1200);

    setTimeout(() => {
      const isTampered = Boolean(req.documentReference?.includes('tampered') || req.documentReference?.includes('photoswap'));
      const isPhotoSwap = Boolean(req.documentReference?.includes('photoswap'));
      const isExpired = Boolean(req.documentReference?.includes('expired'));

      const findingsList: ForensicFinding[] = isTampered
        ? [
            {
              id: 'F-1',
              category: 'TAMPERING',
              severity: 'CRITICAL',
              title: 'Photographic Tampering Detected',
              description: 'Digital copy-move anomalies around portrait perimeter with inconsistent illumination angles.',
              recommendation: 'Reject document and request primary physical inspection at consular counter.',
              boundingBox: { x: 12, y: 35, width: 28, height: 42, label: 'Portrait Splice Boundary' },
            },
            {
              id: 'F-2',
              category: 'CROSS_FIELD',
              severity: 'HIGH',
              title: 'MRZ Checksum Inconsistency',
              description: 'Calculated check digit does not match ICAO Doc 9303 specification for line 2 character 28.',
              recommendation: 'Cross-reference with civil registry database.',
            },
          ]
        : [
            {
              id: 'F-PASS-1',
              category: 'SECURITY_FEATURES',
              severity: 'PASS',
              title: 'Guilloche Micro-pattern Integrity Verified',
              description: 'Sub-millimeter security background prints match official issuing authority baseline.',
              recommendation: 'Valid security substrate confirmed.',
            },
            {
              id: 'F-PASS-2',
              category: 'CROSS_FIELD',
              severity: 'PASS',
              title: 'MRZ Checksums Confirmed (ICAO 9303)',
              description: 'Document number, birth date, and expiry check digits validated mathematically with zero errors.',
              recommendation: 'Mathematical integrity confirmed.',
            },
          ];

      const extractedFields: ExtractedFieldItem[] = [
        {
          key: 'fullName',
          label: 'Full Name',
          value: req.applicantName || 'VALUED APPLICANT',
          confidence: 98,
          source: 'VIZ',
          status: 'valid',
        },
        {
          key: 'documentNumber',
          label: 'Document Number',
          value: 'L' + Math.floor(10000000 + Math.random() * 90000000),
          confidence: 97,
          source: 'MRZ',
          status: 'valid',
        },
        {
          key: 'dob',
          label: 'Date of Birth',
          value: '1988-08-14',
          confidence: 96,
          source: 'VIZ',
          status: 'valid',
        },
        {
          key: 'expiryDate',
          label: 'Expiry Date',
          value: isExpired ? '2021-04-10' : '2030-08-13',
          confidence: 97,
          source: 'VIZ',
          status: isExpired ? 'mismatch' : 'valid',
        },
      ];

      const mockResult: VerificationResult = {
        inspectionId: 'VER-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        timestamp: new Date().toISOString(),
        documentClassification: {
          detectedType: req.documentType || 'Passport',
          issuingCountry: 'Republic of India (IND)',
          confidence: 99.1,
        },
        extractedFields,
        mrz: {
          present: true,
          rawLines: [
            'P<IND<<DOE<<ALEXANDER<<<<<<<<<<<<<<<<<<<',
            'L892049214IND8808142M3008138<<<<<<<<<<<<<<06',
          ],
          documentType: 'P',
          countryCode: 'IND',
          surName: 'DOE',
          givenNames: 'ALEXANDER',
          documentNumber: 'L892049214',
          docNumberCheckDigit: '4',
          isDocNumberValid: true,
          nationality: 'IND',
          dob: '880814',
          dobCheckDigit: '2',
          isDobValid: true,
          sex: 'M',
          expiryDate: '300813',
          expiryCheckDigit: '8',
          isExpiryValid: !isExpired,
          compositeCheckDigit: '06',
          isCompositeValid: !isExpired,
        },
        findings: findingsList,
        biometricResult: {
          conducted: true,
          matchScore: isPhotoSwap ? 28.5 : 95.8,
          verdict: isPhotoSwap ? 'NO_MATCH' : 'MATCH',
          confidence: 96.4,
          faceDetectedInDoc: true,
          faceDetectedInSelfie: true,
          livenessIndicators: {
            screenPlaybackRisk: false,
            printedPhotoRisk: isPhotoSwap,
            headPoseNatural: true,
            facialOcclusion: false,
          },
          notes: isPhotoSwap
            ? 'Severe facial feature divergence between passport photo and camera selfie.'
            : 'Conclusive 1:1 facial biometric cosine alignment exceeding NIST FRVT thresholds.',
        },
        risk: {
          overallRiskScore: isTampered ? 88 : isExpired ? 54 : 12,
          authenticityConfidence: isTampered ? 18 : isExpired ? 45 : 94,
          riskLevel: isTampered ? 'HIGH' : isExpired ? 'MEDIUM' : 'LOW',
          verdict: isTampered ? 'REJECT' : isExpired ? 'MANUAL_REVIEW' : 'PASS',
          tamperingRisk: isTampered ? 92 : 8,
          dataConsistencyRisk: isExpired ? 70 : 10,
          securityFeaturesRisk: isTampered ? 85 : 5,
          biometricMismatchRisk: isPhotoSwap ? 95 : 6,
          primaryReasons: isTampered
            ? ['Digital splice boundary around portrait', 'MRZ character inconsistency']
            : ['Guilloche security background validated', 'MRZ check digits verified without fault'],
          summary: isTampered
            ? 'High-confidence fraudulent modification detected on security perimeter.'
            : 'Full authentic document clearance validated under consular screening rules.',
        },
        audit: {
          sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          engineVersion: '2.4.1-ForensicCore',
          executionTimeMs: 1490,
          securityChecksRun: 28,
          securityChecksPassed: isTampered ? 23 : 28,
          analystNotes: 'Automated consular screening completed.',
        },
        documentImage: req.documentImage,
        selfieImage: req.selfieImage,
      };

      setCurrentResult(mockResult);
      setAuditLogs((prev) => [
        {
          id: mockResult.inspectionId,
          timestamp: mockResult.timestamp,
          documentType: mockResult.documentClassification.detectedType,
          applicantName: req.applicantName || 'VALUED APPLICANT',
          documentNumberMasked: '••••••736',
          riskLevel: mockResult.risk.riskLevel,
          verdict: mockResult.risk.verdict,
          tamperingDetected: isTampered,
          faceMatchScore: mockResult.biometricResult.matchScore,
          analyst: 'Automated AI Engine',
          sha256Hash: mockResult.audit.sha256Hash,
          executionDurationMs: mockResult.audit.executionTimeMs,
        },
        ...prev,
      ]);

      setIsVerifying(false);
      setShowSkeletonLoading(false);
      setConsularViewMode('report');
    }, 1800);
  };

  const handleSelectPreset = (preset: SampleDocPreset) => {
    setIsPresetsOpen(false);
    handleRunVerification({
      documentImage: preset.documentImage,
      documentType: preset.documentType,
      selfieImage: preset.selfieImage,
      applicantName: preset.name.split('(')[0].trim(),
      documentReference: 'SPEC-' + preset.id,
    });
  };

  const fontSizeClass =
    fontSizeLevel === 0
      ? 'text-xs'
      : fontSizeLevel === 2
      ? 'text-base'
      : fontSizeLevel === 3
      ? 'text-lg'
      : '';

  return (
    <div
      id="embassy-portal-app"
      className={`min-h-screen flex flex-col font-sans transition-colors ${fontSizeClass} ${
        highContrast ? 'bg-black text-white selection:bg-amber-400 selection:text-black' : 'bg-white text-slate-800'
      }`}
    >
      {/* 1. Top Contact & Accessibility Bar */}
      <TopContactBar
        fontSizeLevel={fontSizeLevel}
        onAdjustFontSize={handleAdjustFontSize}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        onPreviewLoadingScreen={() => setShowSkeletonLoading(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* 2. Main Navigation Header (Emblem, G20, Language, Search, Navigation items) */}
      <MainNavbar
        activeTab={activeTab}
        onSelectTab={handleSelectNavTab}
        onSearch={handleSearch}
        highContrast={highContrast}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* 3. Main Body Content Switcher */}
      {activeTab === 'sih-project' ? (
        /* Dedicated Full-Screen SIH Project Showcase */
        <main className="flex-1 w-full bg-[#FDFBF7] text-slate-800 animate-in fade-in duration-300">
          <SIHProjectShowcase
            onLaunchLab={() => {
              setActiveTab('consular');
              setConsularViewMode('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPreset={(preset) => {
              handleSelectPreset(preset);
              setActiveTab('consular');
              setConsularViewMode('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenCompliance={() => setIsComplianceOpen(true)}
            onOpenAudit={() => {
              setActiveTab('consular');
              setConsularViewMode('audit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : activeTab === 'consular' ? (
        /* Consular Document Screening Lab Mode (Warm Saffron Theme) */
        <main className="flex-1 w-full bg-[#FDFBF7] text-slate-800 py-8 px-4 sm:px-8 animate-in fade-in duration-300">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Consular Desk Header Banner */}
            <div className="bg-white border border-orange-200/90 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#E45D24]">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900">
                      Consular Section • Document Verification &amp; Biometric Screening
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-3xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Chancery of India, Guatemala City • ICAO Doc 9303, ISO/IEC 19794-5 Forensic Clearance Desk
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPresetsOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#E45D24] text-xs font-semibold border border-slate-300 hover:border-orange-300 transition cursor-pointer"
                >
                  Load Sample Docs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-1.5 rounded-lg bg-[#E45D24] hover:bg-[#d54e17] text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Embassy Portal</span>
                </button>
              </div>
            </div>

            {/* Consular Sub-navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-orange-200 pb-2">
              <button
                type="button"
                onClick={() => setConsularViewMode('lab')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  consularViewMode === 'lab'
                    ? 'bg-[#E45D24] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
                }`}
              >
                Verification Lab
              </button>
              {currentResult && (
                <button
                  type="button"
                  onClick={() => setConsularViewMode('report')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    consularViewMode === 'report'
                      ? 'bg-[#E45D24] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
                  }`}
                >
                  Inspection Report
                </button>
              )}
              <button
                type="button"
                onClick={() => setConsularViewMode('audit')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  consularViewMode === 'audit'
                    ? 'bg-[#E45D24] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
                }`}
              >
                Audit Registry ({auditLogs.length})
              </button>
            </div>

            {/* Consular Active View */}
            {consularViewMode === 'lab' && (
              <VerificationLab
                onRunVerification={handleRunVerification}
                isVerifying={isVerifying}
                activeStep={activeStep}
              />
            )}

            {consularViewMode === 'report' && currentResult && (
              <RiskReportView
                result={currentResult}
                onOpenCertificate={() => setIsCertificateOpen(true)}
                onNewScreening={() => setConsularViewMode('lab')}
              />
            )}

            {consularViewMode === 'audit' && (
              <AuditRegistry
                logs={auditLogs}
                onSelectLog={(logId) => {
                  const matchingPreset = SAMPLE_DOCUMENT_PRESETS.find(
                    (p) =>
                      (logId.includes('M49X') && p.id.includes('authentic')) ||
                      (logId.includes('K28J') && p.id.includes('tampered')) ||
                      (logId.includes('Q71L') && p.id.includes('photoswap')) ||
                      (logId.includes('T55P') && p.id.includes('expired'))
                  );
                  if (matchingPreset) {
                    handleSelectPreset(matchingPreset);
                  } else if (currentResult) {
                    setConsularViewMode('report');
                  }
                }}
                redactPii={redactPii}
                onToggleRedactPii={() => setRedactPii(!redactPii)}
              />
            )}
          </div>
        </main>
      ) : (
        /* Full Embassy Landing Page View (Matching Screenshot Exact Structure & Visual Theme) */
        <main className="flex-1 w-full flex flex-col">
          {/* Section 1: Hero Slider with Saffron/Terracotta curved gradient & diplomatic meeting */}
          <HeroSlider
            onOpenSlideDetail={handleOpenSlideDetail}
            highContrast={highContrast}
          />

          {/* Section 1.5: SIH Flagship Innovation Showcase on Home Page */}
          <SIHProjectShowcase
            onLaunchLab={() => {
              setActiveTab('consular');
              setConsularViewMode('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPreset={(preset) => {
              handleSelectPreset(preset);
              setActiveTab('consular');
              setConsularViewMode('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenCompliance={() => setIsComplianceOpen(true)}
            onOpenAudit={() => {
              setActiveTab('consular');
              setConsularViewMode('audit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Section 2: Azadi Ka Amrit Mahotsav Ribbon Banner with India Map */}
          <AmritMahotsavRibbon
            highContrast={highContrast}
            onOpenInfo={() => {
              handleOpenDetailModal(
                'Azadi Ka Amrit Mahotsav - 75 Years of Indian Independence',
                <div className="space-y-3 text-sm text-slate-700">
                  <p>
                    Azadi Ka Amrit Mahotsav is an initiative of the Government of India to celebrate and commemorate 75 years of independence and the glorious history of its people, culture and achievements.
                  </p>
                  <p>
                    The official journey of Azadi ka Amrit Mahotsav commenced on 12th March 2021, starting a 75-week countdown to our 75th anniversary of independence and ending post a year on 15th August 2023.
                  </p>
                </div>
              );
            }}
          />

          {/* Section 3: ABOUT EMBASSY (2-column layout with General Information & collaboration puzzle) */}
          <AboutEmbassySection
            onOpenDetailModal={handleOpenDetailModal}
            highContrast={highContrast}
          />

          {/* Section 4: ITEC PROGRAMME (4 clean white cards with illustrations & Know More) */}
          <ItecProgrammeSection
            onSelectCard={handleSelectItecCard}
            highContrast={highContrast}
          />

          {/* Section 5: AZADI KA AMRIT MAHOTSAV Showcase (Warm sand card with monuments and photo gallery) */}
          <AmritEventShowcase
            highContrast={highContrast}
            onViewFullGallery={() => {
              handleOpenDetailModal(
                'India@75 Celebrations Gallery - Guatemala City',
                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    A photographic record of bilateral events, Gandhi Jayanti commemorations, trade delegations, and cultural workshops organized by the Embassy of India in Guatemala.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80"
                      alt="Meeting"
                      className="rounded-lg object-cover h-36 w-full"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
                      alt="Cultural Dance"
                      className="rounded-lg object-cover h-36 w-full"
                    />
                  </div>
                </div>
              );
            }}
          />

          {/* Section 6: Updates Section (What's New, Facebook Updates, Twitter Updates in 3 columns) */}
          <UpdatesSection
            onSelectNews={handleSelectNews}
            highContrast={highContrast}
          />

          {/* Section 7: USEFUL LINKS (Embassy map in Zona 14, 10 government links with orange dots, digital illustration) */}
          <UsefulLinksSection highContrast={highContrast} />

          {/* Section 8: Government Initiatives Carousel (Make in India, Swachh Bharat, Invest India, etc.) */}
          <GovPartnersCarousel highContrast={highContrast} />

          {/* Section 9: Official Portals Strip (ICCR, india.gov.in, Incredible India, MEA) */}
          <GovEmblemsStrip highContrast={highContrast} />
        </main>
      )}

      {/* 4. Embassy Footer (Working Hours, Legal Policies, Copyright notice) */}
      <EmbassyFooter
        onOpenPolicy={handleOpenPolicy}
        highContrast={highContrast}
      />

      {/* Detail Modal for Press Releases, Announcements & Guidelines */}
      <QuickDetailModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        onClose={handleCloseModal}
      >
        {modalState.content}
      </QuickDetailModal>

      {/* Sample Document Presets Modal (for Consular Screening) */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Certificate Modal */}
      {currentResult && (
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          result={currentResult}
        />
      )}

      {/* Compliance Modal */}
      <ComplianceModal
        isOpen={isComplianceOpen}
        onClose={() => setIsComplianceOpen(false)}
      />

      {/* 3D Rotating Skeleton Loading Screen Overlay (Viewable at any time) */}
      {showSkeletonLoading && (
        <LoadingPageScreen
          onDismiss={() => setShowSkeletonLoading(false)}
        />
      )}

      {/* Official Portal Login Modal (Faithful replication of IMG_2837.JPEG) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => {
          setCurrentUser({ email, role: 'Consular Verification Officer' });
          setIsLoginOpen(false);
          handleOpenDetailModal(
            'Portal Session Active',
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-emerald-700">
                Welcome back, Official Credential Holder ({email})!
              </p>
              <p>
                Your secure session has been verified against the Ministry of External Affairs &amp; Home Affairs consular directory. Full forensic clearance and administrative audit logging capabilities are now authorized.
              </p>
            </div>
          );
        }}
      />
    </div>
  );
}

export default App;
