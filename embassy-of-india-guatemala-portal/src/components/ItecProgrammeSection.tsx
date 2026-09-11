import React from 'react';
import { ChevronRight, Laptop, Globe2, FileSpreadsheet, GraduationCap } from 'lucide-react';
import { ITEC_CARDS, ItecCard } from '../data/embassyData';

interface ItecProgrammeSectionProps {
  onSelectCard: (card: ItecCard) => void;
  highContrast: boolean;
}

export const ItecProgrammeSection: React.FC<ItecProgrammeSectionProps> = ({
  onSelectCard,
  highContrast,
}) => {
  const renderCardIllustration = (id: string) => {
    switch (id) {
      case 'itec-about':
        return (
          <div className="w-full h-32 flex items-center justify-center bg-orange-50/70 rounded-lg p-2 relative overflow-hidden">
            {/* Person with laptop vector */}
            <svg viewBox="0 0 120 100" className="w-28 h-24">
              <rect x="25" y="45" width="70" height="42" rx="4" fill="#1e293b" />
              <rect x="30" y="50" width="60" height="32" rx="2" fill="#38bdf8" />
              <path d="M20 88 H100 L95 94 H25 Z" fill="#64748b" />
              <circle cx="60" cy="28" r="12" fill="#f97316" />
              <path d="M42 45 C42 38 78 38 78 45 Z" fill="#ea580c" />
              <path d="M50 62 L55 67 L68 56" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'e-itec':
        return (
          <div className="w-full h-32 flex items-center justify-center bg-blue-50/70 rounded-lg p-2 relative overflow-hidden">
            {/* Virtual collaboration screens */}
            <svg viewBox="0 0 120 100" className="w-28 h-24">
              <circle cx="60" cy="50" r="35" fill="#e0f2fe" />
              <circle cx="35" cy="35" r="10" fill="#3b82f6" />
              <circle cx="85" cy="35" r="10" fill="#ec4899" />
              <circle cx="60" cy="70" r="10" fill="#10b981" />
              <path d="M42 40 L55 62 M78 40 L65 62 M45 35 L75 35" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="60" cy="45" r="8" fill="#f59e0b" />
            </svg>
          </div>
        );
      case 'itec-apply':
        return (
          <div className="w-full h-32 flex items-center justify-center bg-emerald-50/70 rounded-lg p-2 relative overflow-hidden">
            {/* Application form submission */}
            <svg viewBox="0 0 120 100" className="w-28 h-24">
              <rect x="35" y="15" width="50" height="70" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="45" y1="28" x2="75" y2="28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="45" y1="40" x2="65" y2="40" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="52" x2="70" y2="52" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <circle cx="60" cy="70" r="8" fill="#10b981" />
              <path d="M57 70 L59 72 L64 68" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'itec-included':
      default:
        return (
          <div className="w-full h-32 flex items-center justify-center bg-amber-50/70 rounded-lg p-2 relative overflow-hidden">
            {/* Degree & fellowship allowance */}
            <svg viewBox="0 0 120 100" className="w-28 h-24">
              <path d="M60 20 L25 36 L60 52 L95 36 Z" fill="#0f172a" />
              <path d="M95 36 V60" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="95" cy="62" r="3" fill="#f59e0b" />
              <path d="M38 45 V68 C38 78 82 78 82 68 V45" fill="#3b82f6" />
              <rect x="42" y="76" width="36" height="12" rx="2" fill="#10b981" />
              <text x="60" y="85" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                100% FUNDED
              </text>
            </svg>
          </div>
        );
    }
  };

  return (
    <section
      id="itec-programme-section"
      className={`w-full py-12 sm:py-16 px-4 sm:px-8 border-t transition-colors ${
        highContrast
          ? 'bg-black text-white border-amber-500'
          : 'bg-[#fafafa] text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-2.5">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif uppercase tracking-tight text-slate-900">
            ITEC Programme
          </h2>
          <div className="w-16 h-1 bg-[#e86a38] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
            The Indian Technical And Economic Cooperation (ITEC) Programme Was Launched On 15th September, 1964 As A Bilateral Programme Of Assistance Of The Government Of India.
          </p>
        </div>

        {/* 4 Cards Grid (matching screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {ITEC_CARDS.map((card) => (
            <div
              key={card.id}
              id={`itec-card-${card.id}`}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group ${
                highContrast
                  ? 'bg-slate-900 border-amber-400 text-white'
                  : 'bg-white border-slate-200/90 shadow-2xs hover:shadow-md hover:border-orange-300'
              }`}
            >
              <div className="p-4 sm:p-5 space-y-3">
                {/* Illustration Box */}
                {renderCardIllustration(card.id)}

                {/* Title */}
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-serif leading-snug group-hover:text-[#e86a38] transition-colors pt-1">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-2xs sm:text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {card.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-5 pt-0 mt-auto">
                <button
                  type="button"
                  onClick={() => onSelectCard(card)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#e86a38] hover:text-[#c44919] cursor-pointer"
                >
                  <span>Know More</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
