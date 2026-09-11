import React from 'react';
import { X, Shield, Lock, CheckCircle2, FileText, Globe, KeyRound } from 'lucide-react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="compliance-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="compliance-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0e131d] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white shadow-2xl flex flex-col animate-in zoom-in-95"
      >
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg font-sans text-white">
                Compliance, Security &amp; Data Privacy Standards
              </h3>
              <p className="text-3xs text-slate-400 font-mono">
                Regulatory Frameworks Governing TrustID Forensic Engine
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-300 leading-relaxed font-sans">
          {/* Section 1: ICAO 9303 */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
              <Globe className="w-4 h-4" />
              <span>ICAO Doc 9303 (Machine Readable Travel Documents)</span>
            </div>
            <p>
              The platform executes standardized check digit algorithms on Machine Readable Zones (MRZ), calculating weights (7, 3, 1 repeating) across document number, date of birth, expiry date, and the composite checksum according to the International Civil Aviation Organization standards for TD1, TD2, and TD3 formats.
            </p>
          </div>

          {/* Section 2: NIST SP 800-63A */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>NIST Special Publication 800-63A (Identity Assurance Level 2)</span>
            </div>
            <p>
              Satisfies Identity Assurance Level 2 (IAL2) requirements for remote identity proofing by combining forensic document authenticity checks with optional 1:1 facial biometric matching and anti-spoofing liveness indicators.
            </p>
          </div>

          {/* Section 3: Privacy & GDPR */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
              <KeyRound className="w-4 h-4" />
              <span>Zero-Storage Privacy &amp; PII Redaction</span>
            </div>
            <p>
              TrustID Forensic operates under an ephemeral processing model: document scans and live biometric samples are processed in memory and never stored in unencrypted public registries. The platform provides on-the-fly PII masking to protect Personally Identifiable Information in audit records.
            </p>
          </div>

          {/* Section 4: ISO/IEC 19794-5 */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>ISO/IEC 19794-5 (Biometric Data Interchange Formats)</span>
            </div>
            <p>
              Facial biometric landmark alignment evaluates inter-ocular distance, nasal bridge vectors, and facial boundary contours to ensure standardized 1:1 verification accuracy.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer"
          >
            Acknowledge &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
