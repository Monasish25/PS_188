import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { HERO_SLIDES, SlideData } from '../data/embassyData';

interface HeroSliderProps {
  onOpenSlideDetail: (slide: SlideData) => void;
  highContrast: boolean;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenSlideDetail, highContrast }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Auto slide rotation every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero-slider-section"
      className="relative w-full overflow-hidden text-white transition-colors"
      style={{
        background: highContrast
          ? '#121212'
          : 'linear-gradient(135deg, #e45f2b 0%, #eb733c 45%, #f28b57 100%)',
      }}
    >
      {/* Subtle Architectural Silhouette Background Watermark */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-repeat-x bg-bottom"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200' fill='%23ffffff'%3E%3Cpath d='M100 200 L100 130 Q120 100 150 130 L150 200 Z M200 200 L200 100 L250 80 L300 100 L300 200 Z M400 200 L400 120 Q450 70 500 120 L500 200 Z M600 200 L600 110 L650 90 L700 110 L700 200 Z M800 200 L800 125 Q850 80 900 125 L900 200 Z'/%3E%3C/svg%3E")`,
          backgroundSize: '800px 180px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center space-y-4 sm:space-y-6">
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-medium tracking-wide uppercase text-orange-100 bg-black/15 px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
                {activeSlide.tagline}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold font-serif leading-[1.18] tracking-tight text-white drop-shadow-xs">
              {activeSlide.title}
            </h2>

            <p className="text-sm sm:text-base font-normal text-orange-50/95 tracking-wide max-w-xl">
              {activeSlide.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                id="hero-know-more-btn"
                type="button"
                onClick={() => onOpenSlideDetail(activeSlide)}
                className="px-6 py-2.5 rounded-full bg-white text-slate-900 hover:bg-orange-50 font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 group"
              >
                <span>{activeSlide.linkText}</span>
                <ArrowUpRight className="w-4 h-4 text-[#e86a38] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <span className="text-xs text-orange-100/80 font-medium">
                Official Press Release
              </span>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 bg-slate-900 group">
              <img
                id="hero-active-image"
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />

              {/* Date Overlay Badge */}
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs px-3 py-1 rounded-md text-2xs text-white border border-white/20">
                <span>Event Date: {activeSlide.date}</span>
              </div>
            </div>

            {/* Slider Navigation Arrows (Matching Screenshot Circular Buttons) */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                id="hero-prev-slide-btn"
                type="button"
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-[#fde9df] hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#f0c3ac]"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 text-[#d95927]" />
              </button>

              {/* Slide Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlideIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                id="hero-next-slide-btn"
                type="button"
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-[#fde9df] hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer border border-[#f0c3ac]"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 text-[#d95927]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
