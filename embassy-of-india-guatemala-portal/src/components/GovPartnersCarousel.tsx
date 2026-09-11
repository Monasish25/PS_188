import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GOV_PARTNER_LOGOS } from '../data/embassyData';

interface GovPartnersCarouselProps {
  highContrast: boolean;
}

export const GovPartnersCarousel: React.FC<GovPartnersCarouselProps> = ({ highContrast }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? GOV_PARTNER_LOGOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === GOV_PARTNER_LOGOS.length - 1 ? 0 : prev + 1));
  };

  // Re-order array cyclically
  const displayItems = [
    ...GOV_PARTNER_LOGOS.slice(startIndex),
    ...GOV_PARTNER_LOGOS.slice(0, startIndex),
  ];

  const renderLogoGraphic = (name: string) => {
    switch (name) {
      case 'Make In India':
        return (
          <div className="flex flex-col items-center">
            {/* Stylized lion silhouette with gears */}
            <svg viewBox="0 0 100 50" className="w-16 h-9 text-slate-800 fill-current">
              <path d="M10 35 Q20 20 40 25 Q60 10 75 25 Q90 15 95 35 L80 35 L75 40 L65 35 L55 40 L45 35 L35 40 L25 35 Z" />
              <circle cx="45" cy="30" r="3" fill="#ffffff" />
              <circle cx="65" cy="30" r="3" fill="#ffffff" />
            </svg>
            <span className="text-3xs font-extrabold tracking-widest text-slate-900 mt-1 uppercase">
              MAKE IN INDIA
            </span>
          </div>
        );
      case 'Swachh Bharat':
        return (
          <div className="flex flex-col items-center">
            {/* Gandhi spectacles logo */}
            <svg viewBox="0 0 100 45" className="w-16 h-8 text-[#138808]">
              <circle cx="35" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="65" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M49 22 Q50 15 51 22" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <text x="35" y="25" fontSize="8" textAnchor="middle" fill="#ff9933" fontWeight="bold">
                स्वच्छ
              </text>
              <text x="65" y="25" fontSize="8" textAnchor="middle" fill="#138808" fontWeight="bold">
                भारत
              </text>
            </svg>
            <span className="text-3xs text-slate-500 font-medium mt-0.5">
              एक कदम स्वच्छता की ओर
            </span>
          </div>
        );
      case 'Invest India':
        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#06038D] font-black text-sm tracking-tight font-serif">
              <span>INVEST</span>
              <span className="text-[#e86a38]">INDIA</span>
            </div>
            <span className="text-3xs text-slate-500 tracking-tight">National Investment Promotion</span>
          </div>
        );
      case 'MADAD':
        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>MADAD Portal</span>
            </div>
            <span className="text-3xs text-slate-500">Consular Grievances</span>
          </div>
        );
      case 'Bharat Quiz':
        return (
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-[#e86a38] font-serif">
              भारत <span className="text-slate-800 text-xs font-sans">QUIZ</span>
            </span>
            <span className="text-3xs text-slate-500">Know India Quiz</span>
          </div>
        );
      case 'Pravasi Bharatiya Divas':
        return (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#ff9933] flex items-center justify-center text-xs font-bold text-[#138808]">
              PBD
            </div>
            <span className="text-3xs text-slate-600 font-medium mt-0.5">Pravasi Bharatiya Divas</span>
          </div>
        );
      case 'India Perspectives':
      default:
        return (
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold font-serif text-slate-900 tracking-wider">
              INDIA
            </span>
            <span className="text-3xs tracking-widest text-slate-500">
              PERSPECTIVES
            </span>
          </div>
        );
    }
  };

  return (
    <section
      id="gov-partners-carousel-section"
      className={`w-full py-6 px-4 sm:px-8 border-t border-b transition-colors ${
        highContrast ? 'bg-black text-white border-amber-500' : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Arrow */}
        <button
          id="partner-carousel-prev"
          type="button"
          onClick={handlePrev}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer shrink-0"
          aria-label="Previous Partner Logo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Carousel Items */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center justify-center">
          {displayItems.slice(0, 7).map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 transition text-center group cursor-pointer"
              title={item.name}
            >
              {renderLogoGraphic(item.name)}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          id="partner-carousel-next"
          type="button"
          onClick={handleNext}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer shrink-0"
          aria-label="Next Partner Logo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
