import React, { useState } from 'react';
import { Volume2, Eye, Globe, Search, Headphones, Handshake } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';

interface GovHeaderProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => void;
  contrast: 'normal' | 'high';
  onToggleContrast: () => void;
  onSearch?: (query: string) => void;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  currentLang,
  onSelectLang,
  fontSize,
  onChangeFontSize,
  contrast,
  onToggleContrast,
  onSearch,
}) => {
  const [headerSearchText, setHeaderSearchText] = useState('');

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchText.trim() && onSearch) {
      onSearch(headerSearchText.trim());
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* 1. NATIONAL TRICOLOR TOP STRIPE */}
      <div className="tricolor-stripe"></div>

      {/* 2. GIGW ACCESSIBILITY & UTILITY STRIP */}
      <div className="bg-[#0A2540] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Official Government of India Attribution & Screen Reader Access */}
          <div className="flex items-center space-x-3 divide-x divide-slate-700">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span className="font-semibold tracking-wide text-amber-300">
                भारत सरकार | Government of India
              </span>
            </div>

            <div className="pl-3 hidden md:flex items-center space-x-3 text-slate-300 text-[11px]">
              <a href="#main-content" className="hover:text-amber-300 transition">
                Skip to main content
              </a>
              <span className="text-slate-600">•</span>
              <a href="#coopsathi" className="hover:text-amber-300 transition flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span>Screen Reader Access</span>
              </a>
            </div>
          </div>

          {/* Right: GIGW Accessibility Controls & Language Selector */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Text Resizer A- | A | A+ */}
            <div className="flex items-center bg-slate-800 rounded border border-slate-700 px-1.5 py-0.5 space-x-1.5">
              <button
                onClick={() => onChangeFontSize('small')}
                className={`px-1 rounded text-[11px] font-bold transition ${fontSize === 'small' ? 'text-amber-400 font-extrabold' : 'hover:text-white text-slate-300'}`}
                title="Decrease Font Size (A-)"
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-1 rounded text-[11px] font-bold transition ${fontSize === 'normal' ? 'text-amber-400 font-extrabold' : 'hover:text-white text-slate-300'}`}
                title="Standard Font Size (A)"
                aria-label="Standard Font Size"
              >
                A
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-1 rounded text-[11px] font-bold transition ${fontSize === 'large' || fontSize === 'xlarge' ? 'text-amber-400 font-extrabold' : 'hover:text-white text-slate-300'}`}
                title="Increase Font Size (A+)"
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Mode */}
            <button
              onClick={onToggleContrast}
              className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] transition ${
                contrast === 'high'
                  ? 'bg-amber-400 text-black border-amber-300 font-bold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Toggle High Contrast for Readability"
              aria-label="Toggle High Contrast"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">High Contrast</span>
            </button>

            {/* 22 Official Indian Languages Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="bg-transparent text-slate-100 text-xs focus:outline-none cursor-pointer"
                aria-label="Select Interface Language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* 3. OFFICIAL GOVERNMENT MASTHEAD */}
      <div className="py-3 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left: Official State Emblem & Bilingual Ministry Masthead */}
          <div className="flex items-center gap-4">
            {/* State Emblem of India (Lion Capital of Ashoka with Satyameva Jayate) */}
            <div className="shrink-0 flex flex-col items-center justify-center p-1 border-r border-slate-200 pr-4">
              <svg className="w-13 h-16 text-slate-800" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stylized Lion Capital of Ashoka representation */}
                <path d="M50 8C35 8 32 20 32 30C32 40 40 44 40 54C40 64 34 68 34 78C34 88 45 92 50 92C55 92 66 88 66 78C66 68 60 64 60 54C60 44 68 40 68 30C68 20 65 8 50 8Z" fill="#8C6D1F" opacity="0.15"/>
                <path d="M50 12C42 12 36 18 36 26C36 32 40 36 44 40C42 46 38 52 38 60C38 72 45 78 50 78C55 78 62 72 62 60C62 52 58 46 56 40C60 36 64 32 64 26C64 18 58 12 50 12Z" stroke="#7A5B15" strokeWidth="2.5" fill="#FAF5E8"/>
                <path d="M26 26C26 34 32 42 36 46C34 54 32 62 34 70" stroke="#7A5B15" strokeWidth="2" strokeLinecap="round"/>
                <path d="M74 26C74 34 68 42 64 46C66 54 68 62 66 70" stroke="#7A5B15" strokeWidth="2" strokeLinecap="round"/>
                {/* Abacus with Ashoka Chakra */}
                <rect x="22" y="78" width="56" height="8" rx="2" fill="#7A5B15"/>
                <circle cx="50" cy="82" r="3.5" stroke="#FFFFFF" strokeWidth="1.2" fill="#000080"/>
                {/* Base Plinth */}
                <path d="M28 86L32 96H68L72 86H28Z" fill="#A8822A"/>
                {/* Satyameva Jayate text */}
                <text x="50" y="108" fontFamily="'Noto Sans Devanagari', serif" fontSize="8.5" fontWeight="700" fill="#604710" textAnchor="middle">सत्यमेव जयते</text>
              </svg>
            </div>

            {/* Official Ministry & NCCT Typography */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  भारत सरकार
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Government of India
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0A2540] tracking-tight leading-snug">
                सहकारिता मंत्रालय
              </h1>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                Ministry of Cooperation
              </h2>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                <span className="font-semibold text-[#138808]">राष्ट्रीय सहकारी प्रशिक्षण परिषद</span>
                <span className="text-slate-400">|</span>
                <span>National Council for Cooperative Training (NCCT)</span>
              </p>
            </div>
          </div>

          {/* Right: Citizen Search & National Initiative Logos */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Citizen Search Bar */}
            <form onSubmit={handleHeaderSearch} className="relative w-full sm:w-72 lg:w-80">
              <input
                type="search"
                value={headerSearchText}
                onChange={(e) => setHeaderSearchText(e.target.value)}
                placeholder="Search Acts, Circulars, PACS, PMFBY..."
                className="w-full pl-9 pr-20 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:bg-white text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#0A2540] hover:bg-slate-900 text-white text-xs font-semibold rounded transition flex items-center gap-1"
              >
                <span>खोजें</span>
              </button>
            </form>

            {/* Official Initiative Seals (Sahakar Se Samriddhi, Digital India, Azadi Ka Amrit Mahotsav) */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Sahakar Se Samriddhi Seal */}
              <div className="h-11 px-2.5 py-1 bg-amber-50/90 border border-amber-200 rounded flex items-center gap-2" title="सहकार से समृद्धि - Prosperity Through Cooperation">
                <div className="w-7 h-7 rounded-full bg-[#FF9933]/20 border border-[#FF9933] flex items-center justify-center text-[#FF9933] font-bold text-xs">
                  <Handshake className="w-4 h-4 text-[#FF9933]" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[10px] font-bold text-amber-900 block">सहकार से समृद्धि</span>
                  <span className="text-[9px] text-amber-700 uppercase font-medium">Sahakar Samriddhi</span>
                </div>
              </div>

              {/* Digital India Seal */}
              <div className="h-11 px-2 py-1 bg-blue-50/80 border border-blue-200 rounded flex items-center gap-1.5" title="Digital India Portal">
                <div className="text-left leading-none pr-1">
                  <span className="text-[10px] font-bold text-blue-900 block">Digital India</span>
                  <span className="text-[8.5px] text-blue-600 font-medium">Power To Empower</span>
                </div>
              </div>

              {/* Azadi Ka Amrit Mahotsav */}
              <div className="h-11 px-2 py-1 bg-emerald-50/80 border border-emerald-200 rounded flex items-center gap-1" title="Azadi Ka Amrit Mahotsav">
                <span className="text-xs font-extrabold text-[#138808]">75+</span>
                <div className="leading-none text-[8.5px]">
                  <span className="text-[#138808] font-bold block">आज़ादी का</span>
                  <span className="text-slate-600">अमृत महोत्सव</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
