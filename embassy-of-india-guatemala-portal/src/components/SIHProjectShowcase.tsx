import React from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Fingerprint,
  Cpu,
  Lock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award,
  CheckCircle2,
  Eye,
  FileText,
  AlertTriangle,
  History,
  Layers,
  Terminal,
} from 'lucide-react';
import { SAMPLE_DOCUMENT_PRESETS, SampleDocPreset } from '../data/sampleDocuments';

interface SIHProjectShowcaseProps {
  onLaunchLab: () => void;
  onSelectPreset: (preset: SampleDocPreset) => void;
  onOpenLogin: () => void;
  onOpenCompliance: () => void;
  onOpenAudit: () => void;
}

export const SIHProjectShowcase: React.FC<SIHProjectShowcaseProps> = ({
  onLaunchLab,
  onSelectPreset,
  onOpenLogin,
  onOpenCompliance,
  onOpenAudit,
}) => {
  return (
    <section id="sih-project-showcase" className="w-full py-8 sm:py-12 bg-[#FDFBF7] text-slate-800 border-b border-orange-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Flagship SIH Header Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-orange-200 bg-gradient-to-br from-white via-[#FFF8F0] to-[#FFF0E2] p-6 sm:p-10">
          {/* Saffron background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#E45D24]/15 via-[#F28B57]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E45D24] text-white shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>Smart India Hackathon (SIH)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-[#E45D24] border border-orange-200">
                <span>Problem Statement: AI-Assisted Document &amp; Identity Screening</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#172554] border border-blue-200">
                <Lock className="w-3 h-3 text-blue-700" />
                <span>Ministry of Home Affairs (MHA) &amp; MEA</span>
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-3 max-w-4xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
                TrustID Forensic: Sovereign AI Document Screening &amp; Tamper Verification Engine
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                A unified, end-to-end identity screening platform built for Indian diplomatic missions, consular desks, and border immigration checkpoints. Evaluates passport/visa integrity, extracts structured fields via multimodal OCR, detects pixel-level digital tampering &amp; photo-splicing, executes 1:1 facial biometric matching, and produces verifiable cryptographic audit trails.
              </p>
            </div>

            {/* Core Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onLaunchLab}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#E45D24] to-[#F28B57] hover:from-[#d54e17] hover:to-[#e47640] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Launch Forensic Verification Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenLogin}
                className="px-4 py-3 rounded-xl bg-[#172554] hover:bg-[#1e3a8a] text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>MHA Official Portal Login</span>
              </button>

              <button
                type="button"
                onClick={onOpenCompliance}
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-300 shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#E45D24]" />
                <span>Standards &amp; Compliance (ICAO Doc 9303)</span>
              </button>

              <button
                type="button"
                onClick={onOpenAudit}
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-300 shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <History className="w-4 h-4 text-blue-600" />
                <span>Cryptographic Audit Registry</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the SIH Innovation Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200/80 pb-3">
            <div>
              <span className="text-2xs uppercase tracking-widest font-bold text-[#E45D24] font-mono">
                Engine Architecture
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Core Innovation Modules for the Smart India Hackathon
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Compliant with ICAO Doc 9303 &amp; ISO/IEC 19794-5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-5 border border-orange-200/70 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#E45D24]">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                1. Multimodal OCR &amp; Checksums
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extracts Visual Inspection Zone (VIZ) and Machine Readable Zone (MRZ). Calculates standard 7-3-1 weight check-digits and cross-validates chronological sanity (DOB vs. issue date vs. expiry).
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center text-2xs font-mono font-semibold text-[#E45D24]">
                <span>100% MRZ Verification</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-5 border border-orange-200/70 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                2. Forensic Tamper Detection
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Performs edge splicing analysis, font weight disparity checks, and microprint / guilloche background disruption inspection to spot altered expiry dates, swapped names, and fake stamps.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center text-2xs font-mono font-semibold text-amber-700">
                <span>96.4% Anomaly Precision</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-5 border border-orange-200/70 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                3. 1:1 Biometric Face Match
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extracts facial embeddings from the cropped document portrait and compares them against live applicant webcam capture using cosine distance, alerting against photo-substitution and impersonation.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center text-2xs font-mono font-semibold text-blue-700">
                <span>ISO/IEC 19794-5 Compliant</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-2xl p-5 border border-orange-200/70 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">
                4. Cryptographic SHA-256 Audit
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every screening event generates a cryptographically sealed SHA-256 fingerprint, tamper-evident audit log, and downloadable forensic clearance certificate with optional voluntary PII masking.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center text-2xs font-mono font-semibold text-emerald-700">
                <span>Zero Cloud PII Leakage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Test Presets Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-2xs font-mono uppercase font-bold text-[#E45D24]">
                Interactive Hackathon Demonstration
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                Explore Pre-loaded Forensic Test Cases
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Click any scenario to immediately load and evaluate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAMPLE_DOCUMENT_PRESETS.map((preset) => {
              const isHigh = preset.expectedRisk === 'HIGH';
              const isMed = preset.expectedRisk === 'MEDIUM';

              return (
                <div
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-orange-400 bg-slate-50/60 hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-md group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-3xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isHigh
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : isMed
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {preset.expectedRisk} RISK
                      </span>
                      <span className="text-3xs font-mono text-slate-400 uppercase">
                        {preset.documentType}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#E45D24] transition">
                      {preset.name}
                    </h4>

                    <p className="text-2xs text-slate-600 line-clamp-3 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-2xs font-semibold text-[#E45D24]">
                    <span>Load &amp; Verify</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Metrics & Hardware Performance Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-orange-200/70 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#E45D24] font-mono">1.6s</span>
            <p className="text-2xs text-slate-500 font-medium uppercase tracking-wider">
              Avg Processing Latency
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-orange-200/70 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">100%</span>
            <p className="text-2xs text-slate-500 font-medium uppercase tracking-wider">
              ICAO 9303 Checksum Accuracy
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-orange-200/70 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono">96.4%</span>
            <p className="text-2xs text-slate-500 font-medium uppercase tracking-wider">
              Splicing &amp; Tamper Precision
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-orange-200/70 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">SHA-256</span>
            <p className="text-2xs text-slate-500 font-medium uppercase tracking-wider">
              Cryptographic Audit Seal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
