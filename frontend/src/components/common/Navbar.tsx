import React, { useState } from 'react';
import { Bot, Sparkles, Menu, X, ShieldCheck, Scale, FileText, Landmark, MessageSquareText, ShieldAlert } from 'lucide-react';
import { LanguageCode } from '../../types';
import { getTranslation } from '../../data/translations';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentLang: LanguageCode;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, currentLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: getTranslation(currentLang, 'navHome'), icon: Landmark },
    { id: 'chat', label: getTranslation(currentLang, 'navChat'), icon: Bot, isHighlight: true },
    { id: 'schemes', label: getTranslation(currentLang, 'navSchemes'), icon: FileText },
    { id: 'pmfby', label: getTranslation(currentLang, 'navPmfby'), icon: ShieldCheck },
    { id: 'pacs', label: getTranslation(currentLang, 'navPacs'), icon: Scale },
    { id: 'grievance', label: getTranslation(currentLang, 'navGrievance'), icon: MessageSquareText },
    { id: 'admin', label: getTranslation(currentLang, 'navAdmin'), icon: ShieldAlert },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {/* Custom Icon Badge */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A2540] via-[#134A7B] to-[#138808] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0A2540]">
                  CoopSathi<span className="text-[#FF9933]">.AI</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Gov 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {getTranslation(currentLang, 'tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0A2540] text-white shadow-sm'
                      : item.isHighlight
                      ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('chat')}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#FF9933] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Bot className="w-4 h-4" />
              <span>{getTranslation(currentLang, 'askButton')}</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => handleNavClick('chat')}
              className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1"
            >
              <Bot className="w-4 h-4" />
              <span>AI</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#0A2540] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
