import React from 'react';
import { Clock, Shield, MapPin, Mail, Phone } from 'lucide-react';

interface EmbassyFooterProps {
  onOpenPolicy: (policyTitle: string) => void;
  highContrast: boolean;
}

export const EmbassyFooter: React.FC<EmbassyFooterProps> = ({ onOpenPolicy, highContrast }) => {
  return (
    <footer
      id="embassy-main-footer"
      className={`w-full text-slate-300 transition-colors ${
        highContrast ? 'bg-black border-t-2 border-amber-400' : 'bg-[#111620] border-t-4 border-[#e86a38]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
          {/* Left: Embassy Identity & Working Hours (Matching Screenshot) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-start gap-3.5">
              {/* Gold Emblem */}
              <div className="w-12 h-14 text-amber-400 shrink-0">
                <svg viewBox="0 0 100 120" className="w-full h-full fill-current">
                  <circle cx="50" cy="18" r="7" />
                  <path d="M42 26 C42 22, 58 22, 58 26 L62 48 C62 52, 38 52, 38 48 Z" />
                  <rect x="20" y="56" width="60" height="12" rx="3" />
                  <circle cx="50" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="25" y="70" width="50" height="6" rx="1" />
                  <path d="M30 76 Q50 88 70 76 L75 88 Q50 96 25 88 Z" />
                </svg>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-white tracking-wide">
                  Embassy of India
                </h3>
                <h4 className="text-xs sm:text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  Guatemala
                </h4>
                <p className="text-2xs text-slate-400 italic mt-0.5">
                  Concurrently accredited to El Salvador &amp; Honduras
                </p>
              </div>
            </div>

            {/* Working Hours Box (Exact wording from screenshot) */}
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800/80 space-y-1.5 max-w-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Working Hours:</span>
              </div>
              <p className="text-xs text-slate-300 font-mono tracking-tight pl-5">
                9:00am To 1:00pm - 1:30pm To 5:30pm (Monday To Friday)
              </p>
              <p className="text-3xs text-slate-400 pl-5">
                Consular Window Submission: 9:30am - 12:00pm | Delivery: 4:00pm - 5:00pm
              </p>
            </div>

            <div className="text-2xs text-slate-400 flex flex-wrap gap-4 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                8a Av. 15-07, Zona 14, Guatemala City
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" />
                +502 3066 4820
              </span>
            </div>
          </div>

          {/* Right: Policy Links 2-Column Grid (Matching Screenshot) */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs sm:text-[13px] text-slate-300">
              <button
                type="button"
                onClick={() => onOpenPolicy('Copy Right Policy')}
                className="text-left hover:text-amber-400 hover:underline transition-colors py-1 cursor-pointer"
              >
                Copy Right Policy
              </button>

              <button
                type="button"
                onClick={() => onOpenPolicy('Hyperlinking Policy')}
                className="text-left hover:text-amber-400 hover:underline transition-colors py-1 cursor-pointer"
              >
                Hyperlinking Policy
              </button>

              <button
                type="button"
                onClick={() => onOpenPolicy('Terms & Conditions')}
                className="text-left hover:text-amber-400 hover:underline transition-colors py-1 cursor-pointer"
              >
                Terms &amp; Conditions
              </button>

              <button
                type="button"
                onClick={() => onOpenPolicy('Accessibility Option')}
                className="text-left hover:text-amber-400 hover:underline transition-colors py-1 cursor-pointer"
              >
                Accessibility Option
              </button>

              <button
                type="button"
                onClick={() => onOpenPolicy('Privacy Policy')}
                className="text-left hover:text-amber-400 hover:underline transition-colors py-1 cursor-pointer"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => onOpenPolicy('Contact Us')}
                className="text-left hover:text-amber-400 hover:underline transition-colors py-1 cursor-pointer"
              >
                Contact Us
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-2xs text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified under Digital India Standards &amp; WCAG 2.1 AA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Statement (Matching Screenshot) */}
        <div className="pt-6 text-center text-xs text-slate-400 font-sans tracking-wide">
          <p>@Content By Embassy Of India, Guatemala | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
