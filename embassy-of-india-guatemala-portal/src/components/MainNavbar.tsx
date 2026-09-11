import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X, Globe, Landmark, Lock } from 'lucide-react';

interface MainNavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onSearch: (query: string) => void;
  highContrast: boolean;
  onOpenLogin?: () => void;
  currentUser?: { email: string; role: string } | null;
  onLogout?: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'sih-project', label: 'SIH Innovation', highlight: true },
  { id: 'consular', label: 'Forensic Lab' },
  { id: 'about-us', label: 'About Us' },
  { id: 'india-75', label: 'India@75' },
  { id: 'itec', label: 'ITEC Programme' },
  { id: 'bilateral', label: 'Bilateral Relations' },
  { id: 'media', label: 'Media Updates' },
  { id: 'contact', label: 'Contact' },
];

export const MainNavbar: React.FC<MainNavbarProps> = ({
  activeTab,
  onSelectTab,
  onSearch,
  highContrast,
  onOpenLogin,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header
      id="main-embassy-navbar"
      className={`w-full transition-colors ${
        highContrast ? 'bg-black text-white border-b-2 border-amber-400' : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* Upper Branding Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Official Indian Emblem & Embassy Identification */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
            {/* Detailed Vector Emblem representation of Lion Capital of Ashoka */}
            <svg
              viewBox="0 0 100 120"
              className={`w-full h-full ${highContrast ? 'fill-amber-400 text-amber-400' : 'text-slate-800 fill-current'}`}
              aria-label="National Emblem of India"
            >
              {/* Ashoka Lion Capital stylized vector */}
              <circle cx="50" cy="18" r="7" />
              <path d="M42 26 C42 22, 58 22, 58 26 L62 48 C62 52, 38 52, 38 48 Z" />
              {/* Left & Right Lion silhouettes */}
              <path d="M28 28 C28 24, 38 24, 40 32 L40 50 C34 50, 26 48, 28 28 Z" opacity="0.9" />
              <path d="M72 28 C72 24, 62 24, 60 32 L60 50 C66 50, 74 48, 72 28 Z" opacity="0.9" />
              {/* Abacus / Base */}
              <rect x="20" y="56" width="60" height="12" rx="3" />
              {/* Ashoka Chakra */}
              <circle cx="50" cy="62" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Base Pedestal with horse and bull reliefs */}
              <rect x="25" y="70" width="50" height="6" rx="1" />
              {/* Bell lotus foundation */}
              <path d="M30 76 Q50 88 70 76 L75 88 Q50 96 25 88 Z" />
              {/* Satyameva Jayate Banner text representation */}
              <rect x="18" y="94" width="64" height="10" rx="2" fill="currentColor" opacity="0.15" />
              <text
                x="50"
                y="102"
                fontSize="6"
                fontWeight="bold"
                textAnchor="middle"
                fill="currentColor"
                letterSpacing="1"
              >
                सत्यमेव जयते
              </text>
            </svg>
          </div>

          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-bold tracking-tight font-serif leading-tight text-slate-900 flex items-center gap-1.5">
              <span>Embassy of India</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-800 uppercase tracking-wide">
                Guatemala
              </span>
            </div>
            <p className="text-2xs sm:text-xs text-slate-600 italic tracking-tight">
              Concurrently accredited to <strong className="font-semibold text-slate-700">El Salvador</strong> & <strong className="font-semibold text-slate-700">Honduras</strong>
            </p>
          </div>
        </div>

        {/* Center: G20 India Emblem */}
        <div className="hidden lg:flex items-center gap-2 pl-4 pr-6 border-l border-r border-slate-200 py-1">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#06038D] to-[#138808] tracking-tighter">
                G20
              </span>
              <div className="flex flex-col">
                <span className="text-2xs font-extrabold tracking-widest text-[#06038D] leading-none">
                  भारत 2023 INDIA
                </span>
                <span className="text-3xs text-slate-500 font-serif leading-none mt-0.5">
                  वसुधैव कुटुम्बकम्
                </span>
              </div>
            </div>
            <span className="text-3xs font-medium text-slate-500 tracking-wider mt-0.5">
              ONE EARTH · ONE FAMILY · ONE FUTURE
            </span>
          </div>
        </div>

        {/* Right: Search Bar & Language Selector (matching screenshot) */}
        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-full border border-slate-300 shadow-2xs hover:border-slate-400 focus-within:ring-2 focus-within:ring-orange-400/40 focus-within:border-orange-500 transition-all p-1"
          >
            {/* Language dropdown button */}
            <div className="relative border-r border-slate-200 pr-2 pl-2.5 flex items-center gap-1 text-xs text-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                id="portal-language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language"
                className="bg-transparent text-2xs sm:text-xs text-slate-700 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="en">Select Language</option>
                <option value="en-us">English</option>
                <option value="es">Español (Guatemala)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            {/* Input */}
            <input
              id="embassy-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, visa, tenders..."
              className="px-2.5 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-28 sm:w-44 md:w-56"
            />

            {/* Circular Orange Magnifying Glass Button */}
            <button
              id="embassy-search-button"
              type="submit"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e86a38] hover:bg-[#d95927] text-white flex items-center justify-center transition-transform active:scale-95 shrink-0 shadow-xs"
              aria-label="Submit Search"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Dedicated Portal Login Button */}
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs hover:bg-emerald-100 transition cursor-pointer"
                title="Active MHA Inspector Session"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[120px] truncate">{currentUser.email}</span>
              </button>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-3xs text-slate-500 hover:text-red-600 underline font-mono cursor-pointer"
                >
                  Sign Out
                </button>
              )}
            </div>
          ) : (
            onOpenLogin && (
              <button
                id="navbar-login-btn"
                type="button"
                onClick={onOpenLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#172554] hover:bg-[#1e3a8a] text-white shadow-xs transition cursor-pointer"
                title="Official Portal Login"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Official Login</span>
              </button>
            )
          )}

          {/* Mobile Menu Button */}
          <button
            id="mobile-nav-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Menu Bar (Horizontal Strip) */}
      <nav
        id="desktop-navigation-bar"
        className={`w-full border-t border-b border-slate-200/80 ${
          highContrast ? 'bg-slate-900 border-amber-400' : 'bg-[#fafafa]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ul className="hidden lg:flex items-center justify-between text-xs sm:text-[13px] font-medium text-slate-700 py-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`nav-link-${item.id}`}
                    type="button"
                    onClick={() => onSelectTab(item.id)}
                    className={`px-2.5 py-2 rounded-sm transition-all whitespace-nowrap cursor-pointer relative ${
                      isActive
                        ? highContrast
                          ? 'text-amber-400 font-bold'
                          : 'text-[#e86a38] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-[#e86a38]'
                        : 'hover:text-[#e86a38] hover:bg-slate-100/60'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {item.id === 'sih-project' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#E45D24] text-white tracking-wide">
                          SIH
                        </span>
                      )}
                      <span>{item.label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg space-y-1"
          >
            {onOpenLogin && (
              <button
                type="button"
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm rounded-md bg-[#172554] text-white font-bold flex items-center gap-2 transition"
              >
                <Lock className="w-4 h-4" />
                <span>Official Portal Login</span>
              </button>
            )}
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                  activeTab === item.id
                    ? 'bg-orange-50 text-[#e86a38] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
