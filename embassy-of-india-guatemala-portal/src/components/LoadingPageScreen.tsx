import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, ArrowRight, CheckCircle2, Lock, Cpu, Fingerprint } from 'lucide-react';
import { RotatingEmblemLogo } from './RotatingEmblemLogo';

interface LoadingPageScreenProps {
  onDismiss: () => void;
  title?: string;
  subtitle?: string;
}

export const LoadingPageScreen: React.FC<LoadingPageScreenProps> = ({
  onDismiss,
  title = 'Government of India • Ministry of External Affairs',
  subtitle = 'TrustID Forensic Identity Verification & Authentication Gateway',
}) => {
  const [progress, setProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stages = [
    { label: 'Initializing High-Security Cryptographic Modules...', icon: Lock },
    { label: 'Loading ICAO 9303 & ISO/IEC Forensic Checksum Rules...', icon: Shield },
    { label: 'Calibrating Multimodal Neural OCR & Substrate Models...', icon: Cpu },
    { label: 'Mounting Ephemeral Zero-Storage Biometric Pipeline...', icon: Fingerprint },
    { label: 'Identity Verification Gateway Ready & Verified', icon: CheckCircle2 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 9 + 8);
        const stageIdx = Math.min(
          stages.length - 1,
          Math.floor((next / 100) * stages.length)
        );
        setActiveStageIndex(stageIdx);
        return Math.min(100, next);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const CurrentStageIcon = stages[activeStageIndex].icon;

  return (
    <div
      id="skeleton-loading-page-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#080c14] text-white select-none transition-opacity duration-300 overflow-y-auto"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-slate-950/80 to-[#080c14] pointer-events-none" />

      {/* Grid lines background decoration */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center space-y-6 my-auto">
        {/* State Emblem of India: 3D Rotating Logo */}
        <div className="py-2">
          <RotatingEmblemLogo
            size="lg"
            speed="normal"
            showSkeletonRings={true}
            showPedestalShadow={true}
            showShimmer={true}
            subText="सत्यमेव जयते • SATYAMEVA JAYATE"
          />
        </div>

        {/* Gateway Title */}
        <div className="space-y-1.5">
          <span className="text-3xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            OFFICIAL SECURE VERIFICATION PORTAL
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif tracking-tight text-white pt-1">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Real-time Progress Bar & Stage Indicator */}
        <div className="w-full max-w-md space-y-2.5 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between text-2xs text-slate-300 font-mono">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium truncate max-w-[280px]">
              <CurrentStageIcon className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>{stages[activeStageIndex].label}</span>
            </span>
            <span className="text-amber-400 font-bold ml-2 font-mono">
              {progress}%
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5 relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Skeleton Shimmering Cards Preview */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-left">
            <div className="p-2 bg-slate-950/90 rounded-lg border border-slate-800 relative overflow-hidden">
              <div className="w-12 h-2 bg-slate-800 rounded mb-1.5" />
              <div className="w-full h-2.5 bg-slate-700/80 rounded" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
            <div className="p-2 bg-slate-950/90 rounded-lg border border-slate-800 relative overflow-hidden">
              <div className="w-14 h-2 bg-slate-800 rounded mb-1.5" />
              <div className="w-full h-2.5 bg-slate-700/80 rounded" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
            <div className="p-2 bg-slate-950/90 rounded-lg border border-slate-800 relative overflow-hidden">
              <div className="w-10 h-2 bg-slate-800 rounded mb-1.5" />
              <div className="w-full h-2.5 bg-emerald-500/40 rounded" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Enter / Skip Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>{progress >= 100 ? 'Enter Verification Platform' : 'Skip Directly to Workbench'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
