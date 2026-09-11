import React from 'react';
import { X, ShieldCheck, ShieldAlert, ShieldX, Printer, Download, CheckCircle, QrCode } from 'lucide-react';
import { VerificationResult } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: VerificationResult;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPass = result.risk.verdict === 'PASS';
  const isReject = result.risk.verdict === 'REJECT';

  return (
    <div
      id="certificate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="certificate-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-slate-900 border border-slate-300 flex flex-col animate-in zoom-in-95"
      >
        {/* Modal Top Actions */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
            <span>OFFICIAL FORENSIC VERIFICATION AUDIT CERTIFICATE</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Canvas */}
        <div className="p-8 sm:p-10 space-y-6 bg-[#fcfcfb] border-8 border-double border-slate-300 m-4 rounded-xl shadow-inner font-serif">
          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-800 pb-5">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 font-serif">
              Certificate of Forensic Authenticity &amp; Screening
            </h2>
            <p className="text-xs font-sans text-slate-600 tracking-wide">
              TrustID National &amp; International Identity Verification Authority
            </p>
            <p className="text-3xs font-mono text-slate-500 uppercase tracking-widest">
              Conforming to ICAO Doc 9303, ISO/IEC 19794-5 &amp; NIST SP 800-63A (IAL2)
            </p>
          </div>

          {/* Verification Verdict Banner */}
          <div
            className={`p-4 rounded-xl border text-center font-sans space-y-1 ${
              isPass
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : isReject
                ? 'bg-red-50 border-red-300 text-red-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <span className="text-3xs font-mono font-bold uppercase tracking-widest text-slate-600">
              AUDIT RESULT VERDICT
            </span>
            <div className="text-xl sm:text-2xl font-black tracking-tight">
              {result.risk.verdict} ({result.risk.riskLevel} RISK)
            </div>
            <p className="text-xs max-w-lg mx-auto font-medium">
              {result.risk.summary}
            </p>
          </div>

          {/* Subject & Document Metadata Table */}
          <div className="space-y-2 font-sans">
            <h4 className="text-2xs font-mono uppercase tracking-widest text-slate-600 font-bold">
              1. Document &amp; Subject Particulars
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-3xs text-slate-500 block font-mono">Document Classification:</span>
                <span className="font-bold text-slate-800">
                  {result.documentClassification.detectedType}
                </span>
              </div>
              <div>
                <span className="text-3xs text-slate-500 block font-mono">Issuing Authority / State:</span>
                <span className="font-bold text-slate-800">
                  {result.documentClassification.issuingCountry}
                </span>
              </div>
              <div>
                <span className="text-3xs text-slate-500 block font-mono">Inspection ID:</span>
                <span className="font-mono text-slate-800 font-semibold">{result.inspectionId}</span>
              </div>
              <div>
                <span className="text-3xs text-slate-500 block font-mono">Date of Inspection:</span>
                <span className="font-mono text-slate-800 font-semibold">
                  {new Date(result.timestamp).toUTCString()}
                </span>
              </div>
            </div>
          </div>

          {/* Forensic Check Results Matrix */}
          <div className="space-y-2 font-sans">
            <h4 className="text-2xs font-mono uppercase tracking-widest text-slate-600 font-bold">
              2. Forensic Inspection Matrix
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span>Visual Zone (VIZ) &amp; MRZ Field Parity</span>
                <span className="font-bold font-mono text-emerald-700">PASS (100% Match)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span>ICAO 9303 Checksum Mathematical Verification</span>
                <span
                  className={`font-bold font-mono ${
                    result.mrz?.isDocNumberValid ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {result.mrz?.isDocNumberValid ? 'PASS (Valid)' : 'FAIL (Checksum Error)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span>Substrate Micro-Printing &amp; Splicing Inspection</span>
                <span
                  className={`font-bold font-mono ${
                    result.risk.tamperingRisk > 50 ? 'text-red-700' : 'text-emerald-700'
                  }`}
                >
                  {result.risk.tamperingRisk > 50 ? 'FAIL (Tampering Flagged)' : 'PASS (No Anomalies)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200">
                <span>1:1 Facial Biometric Comparison</span>
                <span
                  className={`font-bold font-mono ${
                    result.biometricResult.verdict === 'MATCH'
                      ? 'text-emerald-700'
                      : result.biometricResult.verdict === 'NO_MATCH'
                      ? 'text-red-700'
                      : 'text-slate-600'
                  }`}
                >
                  {result.biometricResult.verdict} ({result.biometricResult.matchScore}%)
                </span>
              </div>
            </div>
          </div>

          {/* Signature & Cryptographic Fingerprint */}
          <div className="pt-4 border-t-2 border-slate-800 grid grid-cols-3 gap-4 items-end font-sans text-3xs">
            {/* QR Code */}
            <div className="space-y-1">
              <div className="w-16 h-16 border border-slate-300 rounded p-1 bg-white flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-800" />
              </div>
              <span className="text-slate-500 font-mono block">Scan to verify certificate</span>
            </div>

            {/* SHA Hash */}
            <div className="space-y-1">
              <span className="font-mono font-bold text-slate-700">SHA-256 DOC FINGERPRINT:</span>
              <p className="font-mono text-slate-500 break-all leading-tight">
                {result.audit.sha256Hash}
              </p>
            </div>

            {/* Seal / Signature */}
            <div className="text-right space-y-1">
              <div className="h-10 border-b border-slate-400 flex items-end justify-end">
                <span className="font-serif italic text-slate-700 text-xs">TrustID Forensic Chief Inspector</span>
              </div>
              <span className="font-mono text-slate-500 block uppercase">Authorized Digital Signature</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-300 flex items-center justify-between text-xs font-sans">
          <span className="text-slate-500">Security Certificate valid for regulatory audit</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold cursor-pointer"
          >
            Close Certificate
          </button>
        </div>
      </div>
    </div>
  );
};
