import React from 'react';

interface GovEmblemsStripProps {
  highContrast: boolean;
}

export const GovEmblemsStrip: React.FC<GovEmblemsStripProps> = ({ highContrast }) => {
  return (
    <section
      id="gov-emblems-strip"
      className={`w-full py-5 px-4 sm:px-8 border-b transition-colors ${
        highContrast ? 'bg-black text-white border-amber-500' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 opacity-90 hover:opacity-100 transition-opacity">
        {/* ICCR Emblem */}
        <div className="flex items-center gap-2" title="Indian Council for Cultural Relations">
          <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center p-1 bg-white">
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="30" r="5" fill="#f97316" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-3xs font-bold text-slate-800">ICCR</span>
            <span className="text-3xs text-slate-500">Cultural Relations</span>
          </div>
        </div>

        {/* india.gov.in */}
        <a
          href="https://www.india.gov.in"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 group"
          title="National Portal of India"
        >
          <div className="w-8 h-8 rounded-md bg-white border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs">
            🇮🇳
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-[#000080] group-hover:text-[#e86a38] transition-colors">
              india.gov.in
            </span>
            <span className="text-3xs text-slate-500">national portal of india</span>
          </div>
        </a>

        {/* Incredible India */}
        <a
          href="https://www.incredibleindia.org"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center group"
          title="Incredible India Tourism"
        >
          <span className="text-2xs text-[#d97706] font-hindi">अतुल्य !भारत</span>
          <span className="text-xs font-bold tracking-tight text-slate-800 group-hover:text-[#e86a38]">
            Incredible !ndıa
          </span>
        </a>

        {/* Indiafrica */}
        <div className="flex flex-col items-center" title="Indiafrica - A Shared Future">
          <span className="text-xs font-black text-[#e86a38] tracking-tighter">
            Indiafrica
          </span>
          <span className="text-3xs tracking-widest text-slate-500 font-semibold">
            A SHARED FUTURE
          </span>
        </div>

        {/* IIG - India Innovation Growth */}
        <div className="flex items-center gap-1 font-black text-lg tracking-tighter text-slate-800">
          <span className="text-emerald-600">I</span>
          <span className="text-orange-500">I</span>
          <span className="text-blue-600">G</span>
          <span className="text-3xs font-sans text-slate-500 font-normal pl-1">
            Innovation Growth
          </span>
        </div>

        {/* Ministry of External Affairs */}
        <a
          href="https://www.mea.gov.in"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 group"
          title="Ministry of External Affairs"
        >
          <div className="w-8 h-9 text-slate-800">
            <svg viewBox="0 0 100 120" className="w-full h-full fill-current">
              <circle cx="50" cy="18" r="7" />
              <path d="M42 26 C42 22, 58 22, 58 26 L62 48 C62 52, 38 52, 38 48 Z" />
              <rect x="20" y="56" width="60" height="12" rx="3" />
              <circle cx="50" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xs font-bold text-slate-900 group-hover:text-[#e86a38]">
              Ministry of External Affairs
            </span>
            <span className="text-3xs text-slate-500">Government of India</span>
          </div>
        </a>
      </div>
    </section>
  );
};
