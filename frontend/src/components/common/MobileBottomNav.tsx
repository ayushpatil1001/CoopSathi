import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bot, Grid, FileText, Menu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MobileBottomNavProps {
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onToggleMenu,
  isMenuOpen
}) => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-ink-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            isActive('/') && !isMenuOpen
              ? 'text-emerald-800 font-bold'
              : 'text-ink-500 hover:text-ink-800'
          }`}
          aria-label={t('navHome', 'Home')}
        >
          <Home className={`w-5 h-5 ${isActive('/') && !isMenuOpen ? 'stroke-[2.5] text-emerald-800' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">{t('navHome', 'Home')}</span>
        </Link>

        {/* 2. All Schemes (93) */}
        <Link
          to="/schemes"
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors relative ${
            isActive('/schemes') && !isMenuOpen
              ? 'text-emerald-800 font-bold'
              : 'text-ink-500 hover:text-ink-800'
          }`}
          aria-label={t('navSchemes', 'Schemes')}
        >
          <div className="relative">
            <Grid className={`w-5 h-5 ${isActive('/schemes') && !isMenuOpen ? 'stroke-[2.5] text-emerald-800' : 'stroke-[1.8]'}`} />
            <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-black text-[8px] px-1 rounded-full">
              93
            </span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{t('navSchemes', 'Schemes')}</span>
        </Link>

        {/* 3. Center Prominent AI Assistant Action (CoopSathi AI) */}
        <Link
          to="/chat"
          className="relative -top-4 flex flex-col items-center group focus:outline-none"
          aria-label="CoopSathi AI Chat Assistant"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 text-white flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-105 active:scale-95 transition-all">
            <Bot className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold text-emerald-900 mt-0.5 tracking-tight">
            CoopSathi
          </span>
        </Link>

        {/* 4. Laws & Regulations */}
        <Link
          to="/laws"
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            isActive('/laws') && !isMenuOpen
              ? 'text-emerald-800 font-bold'
              : 'text-ink-500 hover:text-ink-800'
          }`}
          aria-label={t('navLaws', 'Acts & Laws')}
        >
          <FileText className={`w-5 h-5 ${isActive('/laws') && !isMenuOpen ? 'stroke-[2.5] text-emerald-800' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">{t('navLaws', 'Laws')}</span>
        </Link>

        {/* 5. Menu Drawer Toggle */}
        <button
          onClick={onToggleMenu}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
            isMenuOpen ? 'text-emerald-800 font-bold' : 'text-ink-500 hover:text-ink-800'
          }`}
          aria-expanded={isMenuOpen}
          aria-label="Toggle full portal menu"
        >
          <Menu className={`w-5 h-5 ${isMenuOpen ? 'stroke-[2.5] text-emerald-800' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">{t('menu', 'Menu')}</span>
        </button>
      </div>
    </nav>
  );
};
export default MobileBottomNav;
