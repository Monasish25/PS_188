import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldX, Clock, ArrowRight } from 'lucide-react';
import { SAMPLE_DOCUMENT_PRESETS, SampleDocPreset } from '../data/sampleDocuments';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: SampleDocPreset) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="presets-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="presets-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f141f] border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden text-white shadow-2xl animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                Specimen Library
              </span>
              <span className="text-2xs text-slate-400 font-mono">Select a scenario to test pipeline</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-sans text-white mt-1">
              Pre-Configured Identity &amp; Forensic Test Cases
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_DOCUMENT_PRESETS.map((preset) => {
              const isHigh = preset.expectedRisk === 'HIGH';
              const isMedium = preset.expectedRisk === 'MEDIUM';

              return (
                <div
                  key={preset.id}
                  id={`preset-card-${preset.id}`}
                  onClick={() => {
                    onSelectPreset(preset);
                    onClose();
                  }}
                  className="bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-3xs font-mono uppercase tracking-wider text-slate-400">
                        {preset.documentType} • {preset.country}
                      </span>
                      <span
                        className={`text-3xs font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                          isHigh
                            ? 'bg-red-950/80 text-red-400 border-red-800'
                            : isMedium
                            ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                            : 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                        }`}
                      >
                        {isHigh ? (
                          <ShieldX className="w-3 h-3" />
                        ) : isMedium ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        <span>{preset.badge}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {preset.name}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {preset.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="text-3xs font-mono uppercase text-slate-500 font-semibold">
                        Target Screening Indicators:
                      </span>
                      <ul className="space-y-1 text-2xs text-slate-300">
                        {preset.targetIssues.slice(0, 3).map((issue, i) => (
                          <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                            <span className="text-cyan-400 shrink-0">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Load Into Verification Lab</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-2xs text-slate-400">
          <span>Synthetic specimen cards complying with privacy &amp; test standards</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
