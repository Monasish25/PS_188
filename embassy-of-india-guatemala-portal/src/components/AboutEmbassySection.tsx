import React, { useState } from 'react';
import { ChevronRight, Landmark, Calendar, Users, Award, FileText } from 'lucide-react';
import { GENERAL_INFO_TABS, GeneralInfoTab } from '../data/embassyData';

interface AboutEmbassySectionProps {
  onOpenDetailModal: (title: string, content: React.ReactNode) => void;
  highContrast: boolean;
}

export const AboutEmbassySection: React.FC<AboutEmbassySectionProps> = ({
  onOpenDetailModal,
  highContrast,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('about');

  const currentTab = GENERAL_INFO_TABS.find((t) => t.id === activeTabId) || GENERAL_INFO_TABS[0];

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'about':
        return <Landmark className="w-4 h-4 text-[#e86a38]" />;
      case 'ambassadors':
        return <Award className="w-4 h-4 text-[#e86a38]" />;
      case 'officers':
        return <Users className="w-4 h-4 text-[#e86a38]" />;
      case 'holidays2022':
      case 'holidays2023':
        return <Calendar className="w-4 h-4 text-[#e86a38]" />;
      default:
        return <FileText className="w-4 h-4 text-[#e86a38]" />;
    }
  };

  const handleOpenMore = () => {
    onOpenDetailModal(
      currentTab.contentTitle,
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed text-sm">{currentTab.description}</p>
        {currentTab.extraDetails && (
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            {currentTab.extraDetails.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {currentTab.tableData && (
          <div className="overflow-x-auto border border-slate-200 rounded-lg mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-2.5">Name / Holiday</th>
                  <th className="p-2.5">Designation / Date</th>
                  {currentTab.tableData[0]?.col3 && <th className="p-2.5">Detail / Day</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentTab.tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-medium text-slate-900">{row.col1}</td>
                    <td className="p-2.5 text-slate-600">{row.col2}</td>
                    {row.col3 && <td className="p-2.5 text-slate-600">{row.col3}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="about-embassy-section"
      className={`w-full py-12 sm:py-16 px-4 sm:px-8 transition-colors ${
        highContrast ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Heading & Ministerial Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-2.5">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif uppercase tracking-tight text-slate-900">
            About Embassy
          </h2>
          <div className="w-16 h-1 bg-[#e86a38] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
            During The Visit Of H.E. Mr. Anand Sharma, Minister Of State Of External Affairs In 2007 To Guatemala, Governments Of India And Guatemala Decided To Establish Embassies In India And Guatemala Respectively.
          </p>
        </div>

        {/* 2-Column Content: Left Nav List + Right Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Left Column: General Information Menu */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif pb-1">
              General Information
            </h3>
            <ul className="space-y-3" role="tablist" aria-label="Embassy General Information">
              {GENERAL_INFO_TABS.map((tab) => {
                const isSelected = activeTabId === tab.id;
                return (
                  <li key={tab.id}>
                    <button
                      id={`info-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`w-full text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer block ${
                        isSelected
                          ? highContrast
                            ? 'text-amber-400 font-bold underline'
                            : 'text-[#e86a38] font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Display Card with Description, Illustration, and Table Preview */}
          <div className="lg:col-span-8">
            <div
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                highContrast
                  ? 'bg-slate-900 border-amber-400 text-white'
                  : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Text in Card */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#e86a38] font-serif">
                      {currentTab.contentTitle}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {currentTab.description}
                  </p>

                  {/* If table data exists, render a compact preview */}
                  {currentTab.tableData && (
                    <div className="bg-slate-50/80 rounded-lg border border-slate-200 p-3 space-y-1.5 text-xs text-slate-700">
                      <div className="font-semibold text-slate-800 text-2xs uppercase tracking-wider pb-1 border-b border-slate-200">
                        Record Highlights:
                      </div>
                      {currentTab.tableData.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-2xs">
                          <span className="font-medium text-slate-900">{item.col1}</span>
                          <span className="text-slate-500">{item.col2}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      id="about-embassy-know-more-btn"
                      type="button"
                      onClick={handleOpenMore}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#e86a38] hover:text-[#c44919] cursor-pointer group"
                    >
                      <span>Know More</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Illustration: Collaborative Puzzle Diplomatic Representation (Matching Screenshot) */}
                <div className="md:col-span-5 flex items-center justify-center p-2">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center bg-white rounded-xl p-4 shadow-2xs border border-slate-200/80">
                    <svg viewBox="0 0 200 200" className="w-full h-full" aria-label="Bilateral cooperation illustration">
                      {/* Puzzle Piece 1: Teal (Guatemala) */}
                      <path
                        d="M40 50 H90 V70 C98 70 102 78 98 84 C94 90 90 90 90 95 V110 H40 V50 Z"
                        fill="#14b8a6"
                      />
                      {/* Puzzle Piece 2: Saffron / Orange (India) */}
                      <path
                        d="M95 50 H150 V110 H130 C130 118 122 122 116 118 C110 114 110 110 105 110 H95 V95 C95 90 91 90 95 84 C99 78 95 70 95 70 Z"
                        fill="#f97316"
                      />
                      {/* Puzzle Piece 3: Deep Navy Blue */}
                      <path
                        d="M40 115 H90 C90 120 94 120 98 126 C102 132 98 140 90 140 V160 H40 Z"
                        fill="#0f766e"
                      />
                      {/* Puzzle Piece 4: Coral / Rose */}
                      <path
                        d="M95 115 H105 C110 115 110 119 116 123 C122 127 130 123 130 115 H150 V160 H95 V140 C95 135 91 135 95 129 C99 123 95 115 95 115 Z"
                        fill="#ef4444"
                      />

                      {/* Diplomatic Figure 1 on Left */}
                      <circle cx="35" cy="80" r="10" fill="#3b82f6" />
                      <path d="M22 105 C22 93 48 93 48 105 Z" fill="#1e40af" />

                      {/* Diplomatic Figure 2 on Right */}
                      <circle cx="165" cy="80" r="10" fill="#10b981" />
                      <path d="M152 105 C152 93 178 93 178 105 Z" fill="#065f46" />

                      {/* Bilateral Handshake Icon in center */}
                      <circle cx="100" cy="105" r="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                      <path d="M94 105 L98 109 L107 101" fill="none" stroke="#e86a38" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
