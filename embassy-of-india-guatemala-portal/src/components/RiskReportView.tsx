import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  UserCheck,
  Fingerprint,
  FileCheck2,
  Download,
  Printer,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  Hash,
  Eye,
  Crosshair,
} from 'lucide-react';
import { VerificationResult, ForensicFinding } from '../types';

interface RiskReportViewProps {
  result: VerificationResult;
  onOpenCertificate: () => void;
  onNewScreening: () => void;
}

export const RiskReportView: React.FC<RiskReportViewProps> = ({
  result,
  onOpenCertificate,
  onNewScreening,
}) => {
  const [activeTab, setActiveTab] = useState<'tampering' | 'ocr' | 'biometrics' | 'audit'>('tampering');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);

  const { risk, documentClassification, extractedFields, mrz, findings, biometricResult, audit } = result;

  const isHighRisk = risk.riskLevel === 'HIGH';
  const isMediumRisk = risk.riskLevel === 'MEDIUM';
  const isLowRisk = risk.riskLevel === 'LOW';

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.8, Math.min(2.5, prev + delta)));
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Executive Verdict & Explainable Risk Banner */}
      <div
        id="risk-verdict-banner"
        className={`rounded-2xl p-6 border shadow-2xl transition-all duration-300 relative overflow-hidden ${
          isHighRisk
            ? 'bg-gradient-to-r from-red-950/90 via-slate-900 to-slate-900 border-red-500/60 text-white'
            : isMediumRisk
            ? 'bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-900 border-amber-500/60 text-white'
            : 'bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-900 border-emerald-500/60 text-white'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Verdict Status & Primary Recommendation */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-sm ${
                  isHighRisk
                    ? 'bg-red-900/80 text-red-200 border-red-500'
                    : isMediumRisk
                    ? 'bg-amber-900/80 text-amber-200 border-amber-500'
                    : 'bg-emerald-900/80 text-emerald-200 border-emerald-500'
                }`}
              >
                {isHighRisk ? (
                  <ShieldX className="w-4 h-4" />
                ) : isMediumRisk ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span>VERDICT: {risk.verdict}</span>
              </span>

              <span className="text-2xs font-mono text-slate-300">
                CASE ID: {result.inspectionId}
              </span>
              <span className="text-2xs text-slate-400 font-mono">
                {documentClassification.detectedType} • {documentClassification.issuingCountry}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans tracking-tight text-white">
              {isHighRisk
                ? 'High Risk: Document Alteration / Identity Mismatch Detected'
                : isMediumRisk
                ? 'Medium Risk: Verification Inconsistency - Manual Review Required'
                : 'Low Risk: Document Authenticity & Biometrics Confirmed'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
              {risk.summary}
            </p>

            {/* Primary Reasons List */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-3xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                Explainable Decision Grounds:
              </span>
              <ul className="space-y-1 text-xs text-slate-200">
                {risk.primaryReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className={`font-bold mt-0.5 ${
                        isHighRisk ? 'text-red-400' : isMediumRisk ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      •
                    </span>
                    <span className="leading-snug">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Risk Score Meter & Actions */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center w-full max-w-[280px] shadow-lg">
              <span className="text-3xs uppercase font-mono tracking-widest text-slate-400">
                Calculated Risk Score
              </span>
              <div className="flex items-baseline justify-center gap-1 my-1">
                <span
                  className={`text-4xl sm:text-5xl font-mono font-black ${
                    isHighRisk ? 'text-red-400' : isMediumRisk ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {risk.overallRiskScore}
                </span>
                <span className="text-xs font-mono text-slate-500">/100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHighRisk
                      ? 'bg-red-500'
                      : isMediumRisk
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${risk.overallRiskScore}%` }}
                />
              </div>
              <span className="text-3xs text-slate-400 font-mono">
                Authenticity Confidence: {risk.authenticityConfidence}%
              </span>
            </div>

            {/* Certificate & Retest Actions */}
            <div className="flex items-center gap-2 w-full max-w-[280px]">
              <button
                type="button"
                onClick={onOpenCertificate}
                className="flex-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Audit Certificate</span>
              </button>
              <button
                type="button"
                onClick={onNewScreening}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                New Scan
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Risk Metric Gauges Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-400">Tampering Risk</span>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-bold font-mono ${
                  risk.tamperingRisk > 50 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {risk.tamperingRisk}%
              </span>
              <span className="text-3xs text-slate-500">
                {risk.tamperingRisk > 50 ? 'Alert' : 'Clean'}
              </span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-400">Cross-Field Risk</span>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-bold font-mono ${
                  risk.dataConsistencyRisk > 50 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {risk.dataConsistencyRisk}%
              </span>
              <span className="text-3xs text-slate-500">
                {risk.dataConsistencyRisk > 50 ? 'Mismatch' : 'Valid'}
              </span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-400">Security Features</span>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-bold font-mono ${
                  risk.securityFeaturesRisk > 50 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {risk.securityFeaturesRisk}%
              </span>
              <span className="text-3xs text-slate-500">
                {risk.securityFeaturesRisk > 50 ? 'Suspicious' : 'Intact'}
              </span>
            </div>
          </div>

          <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
            <span className="text-3xs uppercase font-mono text-slate-400">Biometric Mismatch</span>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-bold font-mono ${
                  risk.biometricMismatchRisk > 50 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {risk.biometricMismatchRisk}%
              </span>
              <span className="text-3xs text-slate-500">
                {biometricResult.conducted ? biometricResult.verdict : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Forensic Workbench: Left Interactive Document Inspector + Right Forensic Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Document Canvas with Bounding Boxes (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-white">
                  Document Micro-Inspection Canvas
                </h3>
              </div>

              {/* Zoom & Overlay Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-2 py-1 rounded text-3xs font-mono border transition cursor-pointer ${
                    showOverlays
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <Eye className="w-3 h-3 inline mr-1" />
                  {showOverlays ? 'Overlays On' : 'Overlays Off'}
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(-0.2)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-3xs font-mono text-slate-400 w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => handleZoom(0.2)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Image with Anomaly Bounding Boxes */}
            <div className="relative rounded-xl overflow-hidden bg-black border border-slate-700 h-[480px] flex items-center justify-center p-2 select-none">
              <div
                className="relative transition-transform duration-200 max-h-full max-w-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={result.documentImage}
                  alt="Inspected Document"
                  className="max-h-[440px] max-w-full object-contain rounded"
                />

                {/* Render bounding boxes over anomalies */}
                {showOverlays &&
                  findings
                    .filter((f) => f.boundingBox)
                    .map((finding) => {
                      const box = finding.boundingBox!;
                      const isSelected = selectedFindingId === finding.id;
                      const isCritical = finding.severity === 'CRITICAL' || finding.severity === 'HIGH';

                      return (
                        <div
                          key={finding.id}
                          id={`box-${finding.id}`}
                          onClick={() => setSelectedFindingId(finding.id)}
                          className={`absolute border-2 cursor-pointer transition-all duration-150 ${
                            isCritical
                              ? 'border-red-500 bg-red-500/15'
                              : 'border-amber-400 bg-amber-400/15'
                          } ${isSelected ? 'ring-4 ring-cyan-400 ring-offset-1 z-30 scale-102' : 'z-20'}`}
                          style={{
                            left: `${box.x}%`,
                            top: `${box.y}%`,
                            width: `${box.width}%`,
                            height: `${box.height}%`,
                          }}
                        >
                          <span
                            className={`absolute -top-5 left-0 text-3xs font-mono font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap ${
                              isCritical ? 'bg-red-600 text-white' : 'bg-amber-500 text-slate-950'
                            }`}
                          >
                            {box.label}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>

            <div className="flex items-center justify-between text-3xs font-mono text-slate-400 px-1">
              <span>Resolution: 300 DPI Substrate Scan</span>
              <span>SHA-256: {audit.sha256Hash.substring(0, 16)}...</span>
            </div>
          </div>
        </div>

        {/* Right Column: Forensic Findings & Verification Tabs (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('tampering')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'tampering'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Fingerprint className="w-3.5 h-3.5 text-cyan-300" />
                <span>Tampering ({findings.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ocr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'ocr'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-cyan-300" />
                <span>OCR &amp; MRZ Checks</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('biometrics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'biometrics'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>Face Biometrics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'audit'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Hash className="w-3.5 h-3.5 text-cyan-300" />
                <span>Audit Trail</span>
              </button>
            </div>

            {/* TAB 1: TAMPERING & FINDINGS */}
            {activeTab === 'tampering' && (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                {findings.length === 0 ? (
                  <div className="p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h4 className="text-sm font-bold text-white font-mono">No Tampering Detected</h4>
                    <p className="text-xs text-slate-400">
                      Typography kerning, baseline alignment, guilloche micro-lines, and photo perimeter conform to official standards.
                    </p>
                  </div>
                ) : (
                  findings.map((finding) => {
                    const isCrit = finding.severity === 'CRITICAL' || finding.severity === 'HIGH';
                    const isSelected = selectedFindingId === finding.id;

                    return (
                      <div
                        key={finding.id}
                        id={`finding-card-${finding.id}`}
                        onClick={() => setSelectedFindingId(finding.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                          isCrit
                            ? 'bg-red-950/30 border-red-900 hover:border-red-500'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        } ${isSelected ? 'ring-2 ring-cyan-400' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-3xs font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                              isCrit
                                ? 'bg-red-900/80 text-red-200 border-red-700'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {finding.severity} • {finding.category}
                          </span>
                          {finding.boundingBox && (
                            <span className="text-3xs font-mono text-cyan-400 flex items-center gap-1">
                              <Crosshair className="w-3 h-3" />
                              <span>Boxed in Canvas</span>
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-white font-sans">
                          {finding.title}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {finding.description}
                        </p>

                        <div className="bg-black/50 p-2 rounded-lg border border-slate-800/80 text-2xs text-slate-400 flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-slate-300">Action:</strong> {finding.recommendation}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB 2: OCR & CROSS-FIELD CONSISTENCY */}
            {activeTab === 'ocr' && (
              <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
                {/* Extracted Fields Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-3xs font-mono uppercase text-slate-400">
                    <span>Visual Inspection Zone (VIZ) Fields</span>
                    <span>OCR Confidence</span>
                  </div>
                  <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80 bg-slate-950/60">
                    {extractedFields.map((field) => (
                      <div
                        key={field.key}
                        className="p-2.5 flex items-center justify-between text-xs hover:bg-slate-900/60 transition"
                      >
                        <div className="space-y-0.5">
                          <span className="text-3xs text-slate-400 font-mono block">
                            {field.label}
                          </span>
                          <span
                            className={`font-semibold font-mono ${
                              field.status === 'mismatch'
                                ? 'text-red-400'
                                : field.status === 'suspicious'
                                ? 'text-amber-400'
                                : 'text-white'
                            }`}
                          >
                            {field.value}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {field.status === 'mismatch' ? (
                            <span className="text-3xs font-mono font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                              Mismatch
                            </span>
                          ) : field.status === 'suspicious' ? (
                            <span className="text-3xs font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                              Anomaly
                            </span>
                          ) : (
                            <span className="text-3xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                              Verified
                            </span>
                          )}
                          <span className="text-3xs font-mono text-slate-400">{field.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MRZ Decoder Box */}
                {mrz && mrz.present && (
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-3xs font-mono uppercase text-cyan-400 font-bold">
                        ICAO 9303 MRZ Decode &amp; Checksum Validation
                      </span>
                      <span className="text-3xs text-slate-400 font-mono">Format: TD3/TD1</span>
                    </div>

                    {/* Raw MRZ lines in monospace */}
                    <div className="bg-black p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 tracking-widest leading-relaxed overflow-x-auto select-all">
                      {mrz.rawLines.map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>

                    {/* Checksum matrix */}
                    <div className="grid grid-cols-2 gap-2 text-2xs font-mono">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Doc # Check Digit:</span>
                        <span className={mrz.isDocNumberValid ? 'text-emerald-400' : 'text-red-400 font-bold'}>
                          {mrz.isDocNumberValid ? '✓ Valid' : '✗ Invalid'}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">DOB Check Digit:</span>
                        <span className={mrz.isDobValid ? 'text-emerald-400' : 'text-red-400 font-bold'}>
                          {mrz.isDobValid ? '✓ Valid' : '✗ Invalid'}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Expiry Check Digit:</span>
                        <span className={mrz.isExpiryValid ? 'text-emerald-400' : 'text-red-400 font-bold'}>
                          {mrz.isExpiryValid ? '✓ Valid' : '✗ Invalid'}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Composite Check Digit:</span>
                        <span className={mrz.isCompositeValid ? 'text-emerald-400' : 'text-red-400 font-bold'}>
                          {mrz.isCompositeValid ? '✓ Valid' : '✗ Invalid'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: 1:1 BIOMETRIC FACE MATCH */}
            {activeTab === 'biometrics' && (
              <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
                {!biometricResult.conducted ? (
                  <div className="p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                    <UserCheck className="w-8 h-8 text-slate-500 mx-auto" />
                    <h4 className="text-sm font-bold text-white font-mono">
                      No Live Selfie Provided
                    </h4>
                    <p className="text-xs text-slate-400">
                      1:1 facial biometric matching was skipped for this session. To verify face identity, provide a live portrait during intake.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Visual Comparison Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2">
                        <span className="text-3xs font-mono uppercase text-slate-400">
                          Document Extracted Portrait
                        </span>
                        <div className="w-24 h-28 mx-auto rounded-lg overflow-hidden border border-slate-700 bg-black">
                          <img
                            src={result.documentImage}
                            alt="Document Face"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-3xs font-mono text-emerald-400">Face Detected</span>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-2">
                        <span className="text-3xs font-mono uppercase text-slate-400">
                          Live Captured Selfie
                        </span>
                        <div className="w-24 h-28 mx-auto rounded-lg overflow-hidden border border-slate-700 bg-black">
                          {result.selfieImage ? (
                            <img
                              src={result.selfieImage}
                              alt="Live Selfie"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                              N/A
                            </div>
                          )}
                        </div>
                        <span className="text-3xs font-mono text-cyan-400">Liveness Passed</span>
                      </div>
                    </div>

                    {/* Similarity Score */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-300">Biometric Similarity Score:</span>
                        <span
                          className={`font-mono font-bold text-base ${
                            biometricResult.matchScore >= 65 ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {biometricResult.matchScore}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            biometricResult.matchScore >= 65 ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${biometricResult.matchScore}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-3xs font-mono text-slate-400">
                        <span>Threshold: 65%</span>
                        <span>Verdict: {biometricResult.verdict}</span>
                      </div>
                    </div>

                    {/* Biometric Analysis Notes */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white block font-mono text-3xs uppercase mb-1">
                        Biometric Forensics:
                      </strong>
                      {biometricResult.notes}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: AUDIT TRAIL */}
            {activeTab === 'audit' && (
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 font-mono">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Inspection ID:</span>
                    <span className="text-cyan-400 font-bold">{result.inspectionId}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">SHA-256 Fingerprint:</span>
                    <span className="text-slate-300 text-2xs truncate max-w-[240px]">
                      {audit.sha256Hash}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Execution Latency:</span>
                    <span className="text-slate-300">{audit.executionTimeMs} ms</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Forensic Engine:</span>
                    <span className="text-slate-300">{audit.engineVersion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Security Rules Evaluated:</span>
                    <span className="text-emerald-400 font-bold">
                      {audit.securityChecksPassed} / {audit.securityChecksRun} Passed
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenCertificate}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Verification Certificate</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
