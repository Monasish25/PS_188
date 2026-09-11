import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, FileSearch, History, Lock, Cpu, Sparkles, Box } from 'lucide-react';
import { RotatingEmblemLogo } from './RotatingEmblemLogo';

interface NavbarProps {
  activeTab: 'lab' | 'report' | 'audit' | 'compliance';
  setActiveTab: (tab: 'lab' | 'report' | 'audit' | 'compliance') => void;
  hasResult: boolean;
  onOpenPresets: () => void;
  onOpenSkeletonLoader?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasResult,
  onOpenPresets,
  onOpenSkeletonLoader,
}) => {
  return (
    <header className="w-full bg-[#0b0f17] border-b border-slate-800 text-white sticky top-0 z-40 backdrop-blur-md">
      {/* Top security clearance banner */}
      <div className="bg-slate-950/80 px-4 py-1 border-b border-slate-800/80 flex items-center justify-between text-3xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">SECURITY CLEARANCE: OFFICIAL-SENSITIVE</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">ICAO 9303 &amp; NIST 800-63A COMPLIANT</span>
        </div>
        <div className="flex items-center gap-3">
          {onOpenSkeletonLoader && (
            <button
              type="button"
              onClick={onOpenSkeletonLoader}
              className="bg-amber-950/80 hover:bg-amber-900/80 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-md flex items-center gap-1.5 cursor-pointer shadow-xs transition"
              title="Preview 3D Rotating Skeleton Loading Screen"
            >
              <Box className="w-3 h-3 text-amber-300 animate-spin" />
              <span className="font-bold">3D Skeleton Loading Logo</span>
            </button>
          )}
          <span className="hidden md:flex items-center gap-1 text-amber-400">
            <Cpu className="w-3 h-3" />
            <span>AI Multimodal Forensic Engine: Active</span>
          </span>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={onOpenPresets}
            className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer font-sans"
          >
            <Sparkles className="w-3 h-3" />
            <span>Quick Test Presets</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('lab')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-slate-900 to-amber-950/40 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10 overflow-hidden">
            <RotatingEmblemLogo
              size="xs"
              speed="normal"
              showSkeletonRings={false}
              showPedestalShadow={false}
              showShimmer={true}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight font-sans text-white">
                TrustID <span className="text-amber-400 font-mono">FORENSIC</span>
              </span>
              <span className="text-3xs uppercase tracking-wider bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                GOV • SECURE
              </span>
            </div>
            <p className="text-3xs text-slate-400 hidden sm:block">
              National Document Screening &amp; Tamper Verification Engine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            id="nav-lab-btn"
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileSearch className="w-4 h-4 text-cyan-400" />
            <span>Verification Lab</span>
          </button>

          <button
            id="nav-report-btn"
            type="button"
            disabled={!hasResult}
            onClick={() => setActiveTab('report')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
              !hasResult
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : activeTab === 'report'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Risk Report</span>
            {hasResult && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            id="nav-audit-btn"
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <History className="w-4 h-4 text-indigo-400" />
            <span>Audit Registry</span>
          </button>

          <button
            id="nav-compliance-btn"
            type="button"
            onClick={() => setActiveTab('compliance')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'compliance'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Compliance &amp; Privacy</span>
            <span className="md:hidden">Standards</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
