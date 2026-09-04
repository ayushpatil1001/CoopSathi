import React from 'react';
import { Volume2, Eye, Globe } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';

interface GovHeaderProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => void;
  contrast: 'normal' | 'high';
  onToggleContrast: () => void;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  currentLang,
  onSelectLang,
  fontSize,
  onChangeFontSize,
  contrast,
  onToggleContrast,
}) => {
  return (
    <header className="w-full bg-[#0A2540] text-white border-b border-gov-blue-800">
      {/* Top Indian Tricolor Ribbon */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Ministry & NCCT Identity */}
        <div className="flex items-center space-x-3">
          {/* Emblem representation */}
          <div className="flex items-center space-x-2 border-r border-slate-700 pr-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-300 text-[10px]">
              🏛️
            </div>
            <div>
              <span className="font-semibold tracking-wide block uppercase text-[11px] text-slate-200">
                {getTranslation(currentLang, 'govtIndia')}
              </span>
              <span className="text-amber-400/90 font-medium block text-[10px]">
                {getTranslation(currentLang, 'ministryName')}
              </span>
            </div>
          </div>

          <div className="hidden sm:block text-slate-300 text-[11px]">
            <span className="text-slate-400">Collaborator: </span>
            <span className="font-medium text-slate-200">{getTranslation(currentLang, 'ncctName')}</span>
          </div>
        </div>

        {/* Right: Accessibility Controls & Language Selector */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Font Resize Accessibility */}
          <div className="flex items-center space-x-1 bg-slate-800/80 rounded-md px-1.5 py-0.5 border border-slate-700">
            <button
              onClick={() => onChangeFontSize('small')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${fontSize === 'small' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'}`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${fontSize === 'normal' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'}`}
              title="Default Font Size"
              aria-label="Default Font Size"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${fontSize === 'large' || fontSize === 'xlarge' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'}`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={onToggleContrast}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] border transition ${
              contrast === 'high'
                ? 'bg-amber-400 text-black border-amber-300 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle High Contrast for Readability"
            aria-label="Toggle High Contrast"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Contrast</span>
          </button>

          {/* Screen Reader Prompt Helper */}
          <div className="hidden lg:flex items-center space-x-1 text-emerald-400 text-[11px] bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded">
            <Volume2 className="w-3 h-3 animate-pulse" />
            <span>Voice & Audio Enabled</span>
          </div>

          {/* Language Selector in Header */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            <select
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
              className="bg-slate-800 text-white border border-slate-700 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
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
    </header>
  );
};
