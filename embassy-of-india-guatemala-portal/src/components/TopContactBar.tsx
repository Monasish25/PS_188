import React from 'react';
import { Mail, Phone, Eye, Sun, Moon, Lock } from 'lucide-react';

interface TopContactBarProps {
  fontSizeLevel: number;
  onAdjustFontSize: (delta: number) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onPreviewLoadingScreen?: () => void;
  onOpenLogin?: () => void;
}

export const TopContactBar: React.FC<TopContactBarProps> = ({
  fontSizeLevel,
  onAdjustFontSize,
  highContrast,
  onToggleHighContrast,
  onPreviewLoadingScreen,
  onOpenLogin,
}) => {
  return (
    <div
      id="top-contact-bar"
      className={`w-full py-1.5 px-4 sm:px-8 text-xs font-sans border-b transition-colors ${
        highContrast
          ? 'bg-black text-amber-300 border-amber-500'
          : 'bg-[#181e28] text-slate-200 border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Email */}
        <div className="flex items-center gap-6">
          <a
            id="email-contact-link"
            href="mailto:hoc.guatemala@mea.gov.in"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors tracking-wide"
            title="Send Email to Head of Chancery"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium">hoc.guatemala@mea.gov.in</span>
          </a>

          <span className="hidden md:inline text-slate-500">|</span>

          <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ministry of External Affairs, Government of India</span>
          </span>
        </div>

        {/* Right: Phone & Accessibility Controls */}
        <div className="flex items-center gap-4">
          <a
            id="phone-contact-link"
            href="tel:+50230664820"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-semibold tracking-wider text-slate-100"
            title="Call Embassy Hotline"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>+502 3066 4820</span>
          </a>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Font Size Accessibility */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60">
            <button
              id="font-decrease-btn"
              type="button"
              onClick={() => onAdjustFontSize(-1)}
              className={`px-1 rounded text-2xs hover:bg-slate-700 transition ${
                fontSizeLevel < 0 ? 'text-amber-400 font-bold' : 'text-slate-300'
              }`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              id="font-reset-btn"
              type="button"
              onClick={() => onAdjustFontSize(0)}
              className={`px-1 rounded text-2xs hover:bg-slate-700 transition ${
                fontSizeLevel === 0 ? 'text-amber-400 font-bold' : 'text-slate-300'
              }`}
              title="Standard Font Size"
              aria-label="Standard Font Size"
            >
              A
            </button>
            <button
              id="font-increase-btn"
              type="button"
              onClick={() => onAdjustFontSize(1)}
              className={`px-1 rounded text-2xs hover:bg-slate-700 transition ${
                fontSizeLevel > 0 ? 'text-amber-400 font-bold' : 'text-slate-300'
              }`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            id="contrast-toggle-btn"
            type="button"
            onClick={onToggleHighContrast}
            className="hidden sm:flex items-center gap-1 text-2xs px-1.5 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Mode"
          >
            {highContrast ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-slate-400" />}
            <span className="hidden md:inline">{highContrast ? 'Normal' : 'Contrast'}</span>
          </button>

          {/* Official Portal Login Trigger (Matching IMG_2837.JPEG) */}
          {onOpenLogin && (
            <button
              id="official-login-trigger-btn"
              type="button"
              onClick={onOpenLogin}
              className="text-2xs bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 px-2.5 py-0.5 rounded border border-blue-400/50 flex items-center gap-1 transition font-medium cursor-pointer shadow-2xs"
              title="Official Ministry of Home Affairs Portal Login"
            >
              <Lock className="w-3 h-3 text-blue-300" />
              <span>Official Login</span>
            </button>
          )}

          {/* Optional Loading Preview Launcher */}
          {onPreviewLoadingScreen && (
            <button
              id="preview-loader-trigger"
              type="button"
              onClick={onPreviewLoadingScreen}
              className="text-2xs bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1 transition"
              title="Preview Future Loading Screen Placeholder"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden lg:inline">Loading Design Mode</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
