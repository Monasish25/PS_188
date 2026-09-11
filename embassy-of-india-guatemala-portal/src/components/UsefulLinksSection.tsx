import React from 'react';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { USEFUL_GOV_LINKS } from '../data/embassyData';

interface UsefulLinksSectionProps {
  highContrast: boolean;
}

export const UsefulLinksSection: React.FC<UsefulLinksSectionProps> = ({ highContrast }) => {
  return (
    <section
      id="useful-links-section"
      className={`w-full py-12 sm:py-16 px-4 sm:px-8 border-t transition-colors ${
        highContrast ? 'bg-black text-white border-amber-500' : 'bg-[#faf8f5] text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif uppercase tracking-tight text-slate-900">
            Useful Links
          </h2>
          <div className="w-16 h-1 bg-[#e86a38] mx-auto rounded-full" />
        </div>

        {/* 3 Columns: Map, List of Links, Digital Desk Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          {/* Left: Embassy Location Map Card (Matching Screenshot) */}
          <div className="md:col-span-4 flex flex-col">
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold">Chancery Location</span>
                </div>
                <span className="text-3xs text-slate-400">Guatemala City</span>
              </div>

              {/* Map Canvas / Visual */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <iframe
                  title="Embassy of India Guatemala Location Map"
                  src="https://maps.google.com/maps?q=Embajada%20de%20la%20India%20en%20Guatemala&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="p-3 bg-white space-y-1.5 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">Embajada de la India</p>
                <p className="text-2xs text-slate-500">8a Avenida 15-07, Zona 14, Ciudad de Guatemala, C.A.</p>
                <a
                  href="https://maps.google.com/?q=Embajada+de+la+India+en+Guatemala"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-2xs font-semibold text-[#e86a38] hover:underline pt-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Center: List of Useful Links with Orange Dots (Matching Screenshot) */}
          <div className="md:col-span-5">
            <ul className="space-y-2.5">
              {USEFUL_GOV_LINKS.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-xs sm:text-[13px] text-slate-700 hover:text-[#e86a38] transition-colors py-0.5"
                  >
                    {/* Orange Dot Bullet (Matching Screenshot) */}
                    <span className="w-2 h-2 rounded-full bg-[#e86a38] group-hover:scale-125 transition-transform shrink-0" />
                    <span className="font-medium group-hover:underline underline-offset-2">
                      {link.name}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity ml-auto shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Digital Desk Illustration (Matching Screenshot) */}
          <div className="md:col-span-3 flex items-center justify-center p-2">
            <div className="w-full max-w-[260px] bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center text-center space-y-3">
              {/* Digital Screen & Citizen Illustration */}
              <svg viewBox="0 0 200 160" className="w-full h-36">
                {/* Desktop Screen */}
                <rect x="25" y="15" width="130" height="90" rx="6" fill="#1e293b" />
                <rect x="30" y="20" width="120" height="75" rx="3" fill="#f8fafc" />
                {/* Screen top bar */}
                <rect x="30" y="20" width="120" height="12" fill="#e2e8f0" />
                <circle cx="38" cy="26" r="2.5" fill="#ef4444" />
                <circle cx="46" cy="26" r="2.5" fill="#f59e0b" />
                <circle cx="54" cy="26" r="2.5" fill="#10b981" />
                {/* Screen internal card */}
                <rect x="45" y="42" width="50" height="40" rx="3" fill="#fee2e2" />
                <circle cx="70" cy="58" r="8" fill="#ef4444" />
                {/* Screen stand */}
                <rect x="80" y="105" width="20" height="14" fill="#94a3b8" />
                <rect x="65" y="119" width="50" height="4" rx="2" fill="#64748b" />

                {/* Citizen Figure Standing Beside Screen */}
                <circle cx="165" cy="50" r="10" fill="#f43f5e" />
                <path d="M152 75 C152 65 178 65 178 75 L175 130 H155 Z" fill="#0f172a" />
                <path d="M152 75 L135 60" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                <path d="M168 75 L180 95" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
              </svg>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 font-serif">
                  National Digital Services
                </h4>
                <p className="text-3xs text-slate-500 leading-tight">
                  Single window portal for consular, diaspora &amp; bilateral public services.
                </p>
              </div>

              <a
                href="https://www.india.gov.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 px-3 rounded-lg bg-[#e86a38] text-white text-2xs font-semibold hover:bg-[#d95927] transition shadow-xs"
              >
                Access National Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
