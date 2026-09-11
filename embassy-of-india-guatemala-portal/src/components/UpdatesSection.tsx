import React from 'react';
import { Bell, Facebook, Twitter, ExternalLink, Calendar, CheckCircle, Heart, Share2, MessageCircle } from 'lucide-react';
import { NEWS_ITEMS, NewsItem } from '../data/embassyData';

interface UpdatesSectionProps {
  onSelectNews: (item: NewsItem) => void;
  highContrast: boolean;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({
  onSelectNews,
  highContrast,
}) => {
  return (
    <section
      id="updates-section"
      className={`w-full py-12 sm:py-16 px-4 sm:px-8 border-t transition-colors ${
        highContrast ? 'bg-black text-white border-amber-500' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Column 1: What's New */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#e86a38] mb-4">
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#e86a38]" />
                What&apos;s New
              </h3>
              <span className="text-2xs font-semibold text-[#e86a38] hover:underline cursor-pointer">
                View All Notices
              </span>
            </div>

            <div
              className={`flex-1 rounded-2xl border p-4 overflow-y-auto max-h-[460px] space-y-3.5 ${
                highContrast
                  ? 'bg-slate-900 border-amber-400'
                  : 'bg-[#fafafa] border-slate-200 shadow-2xs'
              }`}
            >
              {NEWS_ITEMS.map((item) => (
                <article
                  key={item.id}
                  id={`news-item-${item.id}`}
                  onClick={() => onSelectNews(item)}
                  className="p-3 bg-white rounded-xl border border-slate-200/80 hover:border-orange-300 hover:shadow-xs transition cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-3xs font-bold uppercase tracking-wider text-[#e86a38] bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                      {item.category}
                    </span>
                    <span className="text-3xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-800 group-hover:text-[#e86a38] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                </article>
              ))}
            </div>
          </div>

          {/* Column 2: Facebook Updates (Matching Screenshot) */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b-2 border-blue-600 mb-4">
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook Updates
              </h3>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-2xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Follow Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div
              className={`flex-1 rounded-2xl border p-4 flex flex-col justify-between ${
                highContrast
                  ? 'bg-slate-900 border-amber-400'
                  : 'bg-[#fafafa] border-slate-200 shadow-2xs'
              }`}
            >
              {/* Page Profile Header */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-amber-400 flex items-center justify-center text-white font-serif font-bold text-xs">
                    EOI
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        Embajada de la India en G...
                      </h4>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-current" />
                    </div>
                    <span className="text-3xs text-slate-500">22,915 followers • Verified Page</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-blue-600 text-white text-2xs font-semibold hover:bg-blue-700 transition"
                >
                  Follow
                </button>
              </div>

              {/* Feed Content Item */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 mt-3 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-2xs text-slate-500">
                  <span className="font-semibold text-slate-900">Embajada de la India en Guatemala</span>
                  <span>• 4 hours ago</span>
                </div>
                <p className="text-2xs sm:text-xs leading-relaxed text-slate-700">
                  El crucero fluvial más largo del mundo, <span className="text-blue-600 font-medium">#GangaVilas</span>, zarpará el 13 de enero de 2023 desde Varanasi en Uttar Pradesh (India).
                </p>
                <p className="text-2xs sm:text-xs leading-relaxed text-slate-600">
                  El crucero de 51 días de duración atravesará más de 50 destinos en 2 países, India y Bangladesh, antes de llegar a su destino final de Dibrugarh en Assam (India).
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
                  <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
                    <Heart className="w-3.5 h-3.5" /> 148
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5" /> 19 comments
                  </span>
                  <span className="flex items-center gap-1 hover:text-slate-700 cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" /> 34 shares
                  </span>
                </div>
              </div>

              <div className="pt-3 text-center">
                <span className="text-3xs text-slate-400">Live official sync • Embassy Social Desk</span>
              </div>
            </div>
          </div>

          {/* Column 3: Twitter Updates */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b-2 border-sky-500 mb-4">
              <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
                <Twitter className="w-4 h-4 text-sky-500" />
                Twitter Updates
              </h3>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-2xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
              >
                <span>@IndEmbGuatemala</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div
              className={`flex-1 rounded-2xl border p-4 space-y-3 overflow-y-auto max-h-[460px] ${
                highContrast
                  ? 'bg-slate-900 border-amber-400'
                  : 'bg-[#fafafa] border-slate-200 shadow-2xs'
              }`}
            >
              {/* Tweet 1 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">India in Guatemala</span>
                    <CheckCircle className="w-3 h-3 text-sky-500 fill-current" />
                    <span className="text-2xs text-slate-400">@IndEmbGuatemala</span>
                  </div>
                  <span className="text-3xs text-slate-400">1d</span>
                </div>
                <p className="text-xs text-slate-700 leading-snug">
                  Advertisement for Yoga Teacher, EOI Guatemala City. Interested certified instructors may submit credentials before 15 Jan 2023. Details on website! <span className="text-sky-600">#YogaIndia #Guatemala</span>
                </p>
              </div>

              {/* Tweet 2 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">India in Guatemala</span>
                    <CheckCircle className="w-3 h-3 text-sky-500 fill-current" />
                    <span className="text-2xs text-slate-400">@IndEmbGuatemala</span>
                  </div>
                  <span className="text-3xs text-slate-400">3d</span>
                </div>
                <p className="text-xs text-slate-700 leading-snug">
                  Ambassador &amp; Mr. S. Nagarajan, Co-Founder of Indian IT Company @247ai held virtual meeting with Vice Minister of Economy to explore software &amp; BPO expansion in Guatemala. <span className="text-sky-600">#ITInvestment #DigitalIndia</span>
                </p>
              </div>

              {/* Tweet 3 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">India in Guatemala</span>
                    <CheckCircle className="w-3 h-3 text-sky-500 fill-current" />
                    <span className="text-2xs text-slate-400">@IndEmbGuatemala</span>
                  </div>
                  <span className="text-3xs text-slate-400">5d</span>
                </div>
                <p className="text-xs text-slate-700 leading-snug">
                  Commemorating Veer Baal Diwas at the Chancery with community members and children. Paying homage to the supreme sacrifice of the Sahibzades. <span className="text-sky-600">#VeerBaalDiwas #AmritMahotsav</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
