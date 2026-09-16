import React, { useState } from 'react';
import { 
  Landmark, FileText, Scale, ShieldCheck, MessageSquareText, 
  Bot, Menu, X, ChevronDown, GraduationCap, BarChart3, HelpCircle 
} from 'lucide-react';
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
    { id: 'home', label: 'Home', icon: Landmark },
    { id: 'schemes', label: 'Schemes & Subsidies', icon: FileText, badge: '93 LIVE' },
    { id: 'pacs', label: 'PACS Services', icon: Scale, badge: '79,630 LIVE' },
    { id: 'pmfby', label: 'PMFBY Crop Insurance', icon: ShieldCheck },
    { id: 'grievance', label: 'Ombudsman & Grievance', icon: MessageSquareText },
    { id: 'admin', label: 'Database & Telemetry', icon: BarChart3 },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-[#0A2540] text-white shadow-md border-b-2 border-amber-500 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 py-0 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`inline-flex items-center gap-1.5 py-3 px-3.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'bg-[#061729] text-amber-400 border-amber-400'
                    : 'border-transparent text-slate-200 hover:bg-slate-800 hover:text-amber-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-[#138808] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded ml-1">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Citizen Assistance Action Button */}
        <div className="hidden sm:flex items-center space-x-3 py-2">
          <button
            onClick={() => handleNavClick('chat')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition shadow-sm ${
              currentTab === 'chat'
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                : 'bg-[#FF9933] hover:bg-amber-500 text-slate-950'
            }`}
            title="Open CoopSathi AI Multilingual Citizen Helpdesk"
          >
            <Bot className="w-4 h-4 text-slate-950" />
            <span>CoopSathi AI Helpdesk</span>
          </button>
        </div>

        {/* Mobile Header & Hamburger */}
        <div className="flex lg:hidden items-center justify-between w-full py-2.5">
          <button
            onClick={() => handleNavClick('home')}
            className="text-white font-bold text-sm flex items-center space-x-2"
          >
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>CoopSathi AI Portal</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('chat')}
              className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Helpdesk</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-slate-200 hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061729] border-t border-slate-800 px-4 py-3 space-y-1 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 font-bold border-l-2 border-amber-400'
                    : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#138808] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
