import React from 'react';

interface AmritMahotsavRibbonProps {
  highContrast: boolean;
  onOpenInfo?: () => void;
}

export const AmritMahotsavRibbon: React.FC<AmritMahotsavRibbonProps> = ({
  highContrast,
  onOpenInfo,
}) => {
  return (
    <section
      id="amrit-mahotsav-ribbon"
      className={`w-full border-y transition-colors py-4 sm:py-5 px-4 sm:px-8 relative overflow-hidden ${
        highContrast
          ? 'bg-black text-white border-amber-500'
          : 'bg-[#faf8f4] text-slate-800 border-amber-200/70'
      }`}
    >
      {/* Background Architectural Vector Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-repeat-x bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23d97706' stroke-width='1'/%3E%3Cpath d='M60 10 L60 110 M10 60 L110 60 M25 25 L95 95 M25 95 L95 25' stroke='%23d97706' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Stylized Map of India with Ashoka Chakra */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-16 h-20 sm:w-20 sm:h-24 relative flex items-center justify-center">
            {/* India Map Silhouette in Emerald Green / Tricolor */}
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full drop-shadow-sm filter"
              aria-label="Map of India silhouette"
            >
              <defs>
                <linearGradient id="indiaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff9933" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#138808" />
                </linearGradient>
              </defs>
              {/* Generalized boundary outline of India */}
              <path
                d="M48 6 C52 8, 54 14, 52 18 C50 22, 44 26, 40 30 C34 32, 28 35, 24 40 C22 45, 18 55, 22 62 C26 66, 32 68, 36 74 C40 80, 44 92, 46 102 C48 108, 50 112, 52 110 C54 104, 58 90, 62 82 C68 76, 76 72, 80 66 C86 58, 88 48, 82 42 C78 38, 70 36, 66 32 C62 26, 60 16, 56 10 Z"
                fill="#138808"
                opacity="0.9"
              />
              <circle cx="50" cy="55" r="7" fill="none" stroke="#000080" strokeWidth="1.2" />
              {/* Wheel spokes */}
              <line x1="50" y1="48" x2="50" y2="62" stroke="#000080" strokeWidth="0.8" />
              <line x1="43" y1="55" x2="57" y2="55" stroke="#000080" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Center: Title & Subtitle */}
        <div className="text-center md:text-left flex-1 space-y-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#993b16] tracking-tight">
            Azadi Ka Amrit Mahotsav
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            75 Weeks Prior To Independence Day, 2022 &amp; Extending Up To Independence Day, 2023
          </p>
        </div>

        {/* Right: Official 75 Amrit Mahotsav Logo Emblem */}
        <div
          onClick={onOpenInfo}
          className="shrink-0 flex items-center gap-3 bg-white/90 p-2.5 sm:p-3 rounded-xl border border-amber-200/80 shadow-2xs hover:shadow-sm cursor-pointer transition"
          title="Learn more about Azadi Ka Amrit Mahotsav"
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#ff9933] to-[#d95927] leading-none">
              75
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight leading-none">
                Azadi <span className="text-[#ff9933]">Ka</span>
              </span>
              <span className="text-2xs sm:text-xs font-semibold text-slate-700 tracking-tight leading-tight">
                Amrit Mahotsav
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
