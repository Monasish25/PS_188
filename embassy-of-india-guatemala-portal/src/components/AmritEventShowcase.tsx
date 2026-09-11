import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface AmritEventShowcaseProps {
  highContrast: boolean;
  onViewFullGallery?: () => void;
}

const EVENT_PHOTOS = [
  {
    id: 1,
    title: 'India@75 Photo Exhibition in Guatemala City',
    caption: 'H.E. Ambassador with Guatemalan Government officials and diplomatic corps',
    url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Cultural Dance Performance & Yoga Day Commemoration',
    caption: 'Classical Indian dance troupe performing at the National Palace of Culture',
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Veer Baal Diwas & Youth Interaction Session',
    caption: 'Commemorating the courage of Sahibzadas with Indian diaspora and students',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
  },
];

export const AmritEventShowcase: React.FC<AmritEventShowcaseProps> = ({
  highContrast,
  onViewFullGallery,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const activePhoto = EVENT_PHOTOS[selectedPhotoIndex];

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? EVENT_PHOTOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev === EVENT_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="amrit-event-showcase-section"
      className={`w-full py-8 sm:py-12 px-4 sm:px-8 transition-colors ${
        highContrast ? 'bg-black' : 'bg-[#f4efe6]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`rounded-3xl p-6 sm:p-8 md:p-10 border relative overflow-hidden shadow-xs ${
            highContrast
              ? 'bg-slate-900 border-amber-400 text-white'
              : 'bg-[#faecd9]/80 border-[#e9cdb0] text-slate-900'
          }`}
        >
          {/* Monument Silhouette Watermark of Red Fort & Indian Flag */}
          <div
            className="absolute -bottom-4 left-0 w-full sm:w-1/2 h-44 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 150' fill='%2392400e'%3E%3Cpath d='M10 150 L10 90 L30 70 L50 90 L50 150 Z M60 150 L60 80 L70 80 L70 50 L80 40 L90 50 L90 80 L100 80 L100 150 Z M120 150 L120 70 Q160 30 200 70 L200 150 Z M220 150 L220 90 L240 70 L260 90 L260 150 Z'/%3E%3Ccircle cx='160' cy='30' r='5' fill='%23f59e0b'/%3E%3Cline x1='160' y1='30' x2='160' y2='10' stroke='%23f59e0b' stroke-width='2'/%3E%3Crect x='160' y='10' width='16' height='10' fill='%23ea580c'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom left',
              backgroundSize: 'contain',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Description / Header */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-2xs font-extrabold tracking-widest text-[#d95927] uppercase bg-orange-100/90 px-3 py-1 rounded-full border border-orange-200">
                Nationwide Celebrations
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight leading-tight">
                AZADI KA AMRIT MAHOTSAV
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                75 Weeks Prior To Independence Day, 2022 &amp; Extending Up To Independence Day, 2023. Commemorating 75 glorious years of progressive India and the glorious history of its people, culture, and achievements.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onViewFullGallery}
                  className="px-4 py-2 rounded-lg bg-[#e86a38] hover:bg-[#d95927] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>View Event Archives</span>
                </button>
              </div>
            </div>

            {/* Right Photo Gallery Display with Navigation */}
            <div className="lg:col-span-8 flex flex-col items-center space-y-4">
              {/* Main Photo Card */}
              <div className="w-full rounded-2xl overflow-hidden bg-slate-800 shadow-lg border-2 border-white/80 relative group aspect-video sm:aspect-16/9">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-300"
                />
                {/* Photo Caption Strip */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 sm:p-4 text-white">
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight font-serif">
                    {activePhoto.title}
                  </h3>
                  <p className="text-3xs sm:text-2xs text-slate-200 mt-0.5 line-clamp-1">
                    {activePhoto.caption}
                  </p>
                </div>
              </div>

              {/* Thumbnails + Slider Arrows (Matching Screenshot Circular Buttons) */}
              <div className="w-full flex items-center justify-between gap-3 pt-1">
                {/* Prev Button */}
                <button
                  id="amrit-prev-btn"
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-white hover:bg-orange-50 text-[#e86a38] border border-orange-200 flex items-center justify-center shadow-xs transition hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Thumbnails */}
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {EVENT_PHOTOS.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative w-20 sm:w-24 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedPhotoIndex === idx
                          ? 'border-[#e86a38] ring-2 ring-[#e86a38]/30 scale-105'
                          : 'border-white opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  id="amrit-next-btn"
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-white hover:bg-orange-50 text-[#e86a38] border border-orange-200 flex items-center justify-center shadow-xs transition hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
