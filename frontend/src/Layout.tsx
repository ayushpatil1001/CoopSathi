import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import { LanguageCode } from './types';
import ChatWidget from './components/ChatWidget';

export default function Layout() {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const navLinks = [
    { to: '/', label: t('navHome', 'Home') },
    { to: '/about', label: t('navAbout', 'About Ministry') },
    { to: '/laws', label: t('navLaws', 'MSCS Act 2023') },
    { to: '/schemes', label: t('navSchemes', 'Schemes') },
    { to: '/pacs', label: t('navPacs', 'PACS Services') },
    { to: '/pmfby', label: t('navPmfby', 'PMFBY') },
    { to: '/ombudsman', label: t('navOmbudsman', 'Ombudsman') },
    { to: '/ncct', label: t('navNcct', 'NCCT') },
    { to: '/telemetry', label: t('navTelemetry', 'Telemetry') },
  ];

  return (
    <>
      <div className={`min-h-screen flex flex-col ${highContrast ? 'bg-zinc-950 text-yellow-300' : 'bg-ink-50 text-ink-900'} ${fontSize === 'larger' ? 'text-base' : fontSize === 'large' ? 'text-[15px]' : 'text-sm'} font-sans selection:bg-ink-900 selection:text-white`}>
        {/* 1. STREAMLINED GIGW ACCESSIBILITY & SOVEREIGN ATTRIBUTION BAR */}
        <header className="border-b border-ink-100 bg-ink-50/70 text-ink-600 text-[11px] py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Left: Official Attribution & Skip Link */}
            <div className="flex items-center space-x-3 text-ink-600">
              <div className="flex items-center gap-1.5 font-medium tracking-normal text-ink-700">
                <svg className="w-3.5 h-3.5 text-ink-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6"></path>
                </svg>
                <span>{t('govtIndia', 'भारत सरकार • Government of India')}</span>
              </div>
              <a href="#main-content" className="text-[11px] text-ink-600 hover:text-ink-900 underline hidden md:inline font-medium" title={t('skipToContent', 'Skip to main content')}>
                {t('skipToContent', 'Skip to main content')}
              </a>
            </div>

            {/* Right: Refined Accessibility Controls & Language Selector */}
            <div className="flex items-center space-x-3">
              {/* Font sizing */}
              <div className="flex items-center text-ink-600 space-x-1 border border-ink-200 bg-white rounded px-1.5 py-0.5 shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`hover:text-ink-900 px-1 font-semibold text-[10px] ${fontSize === 'normal' ? 'text-emerald-700 font-bold' : ''}`}
                  title="Normal font size"
                >
                  A-
                </button>
                <span className="text-ink-300 text-[10px]">|</span>
                <button
                  onClick={() => setFontSize('large')}
                  className={`hover:text-ink-900 px-1 font-semibold text-[10px] ${fontSize === 'large' ? 'text-emerald-700 font-bold' : ''}`}
                  title="Large font size"
                >
                  A
                </button>
                <span className="text-ink-300 text-[10px]">|</span>
                <button
                  onClick={() => setFontSize('larger')}
                  className={`hover:text-ink-900 px-1 font-semibold text-[10px] ${fontSize === 'larger' ? 'text-emerald-700 font-bold' : ''}`}
                  title="Larger font size"
                >
                  A+
                </button>
              </div>

              {/* Contrast Mode Toggle */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center gap-1 px-2 py-0.5 border rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)] transition-colors ${highContrast ? 'bg-yellow-400 text-black border-yellow-500 font-bold' : 'text-ink-600 hover:text-ink-900 border-ink-200 bg-white'}`}
                title="Toggle High Contrast Mode"
                aria-pressed={highContrast}
              >
                <span className="material-symbols-outlined text-[13px]">contrast</span>
                <span className="hidden sm:inline">{highContrast ? 'Standard' : t('contrast', 'Contrast')}</span>
              </button>

              {/* Dynamic Indian Language Selector */}
              <div className="flex items-center gap-1 border-2 border-emerald-600 bg-white rounded px-2.5 py-0.5 shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-emerald-700">translate</span>
                <select
                  aria-label={t('selectLanguage', 'Select Language')}
                  className="bg-transparent text-emerald-950 font-semibold text-[11px] focus:outline-none cursor-pointer border-0 py-0 pl-0 pr-4"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                >
                  {supportedLanguages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* 2. REFINED MASTHEAD / IDENTITY BAR */}
        <section className="border-b border-ink-200/80 bg-white py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Ministry Brand & State Emblem */}
            <div className="flex items-center gap-4">
              {/* Ashoka Emblem Minimal */}
              <div className="flex-shrink-0 pr-4 border-r border-ink-200 flex items-center justify-center">
                <svg className="w-10 h-14 text-ink-800" fill="none" viewBox="0 0 100 120" role="img" aria-label="National Emblem of India">
                  <path d="M50 14C42 14 36 19 36 27C36 33 40 37 44 41C42 47 38 53 38 61C38 73 45 79 50 79C55 79 62 73 62 61C62 53 58 47 56 41C60 37 64 33 64 27C64 19 58 14 50 14Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5"></path>
                  <path d="M26 27C26 35 32 43 36 47C34 55 32 63 34 71" stroke="#1e293b" strokeLinecap="round" strokeWidth="2"></path>
                  <path d="M74 27C74 35 68 43 64 47C66 55 68 63 66 71" stroke="#1e293b" strokeLinecap="round" strokeWidth="2"></path>
                  <rect fill="#1e293b" height="7" rx="1.5" width="56" x="22" y="79"></rect>
                  <circle cx="50" cy="82.5" fill="#ffffff" r="2.5"></circle>
                  <path d="M29 86L33 94H67L71 86H29Z" fill="#334155"></path>
                  <text fill="#1e293b" fontFamily="'Noto Sans Devanagari', sans-serif" fontSize="8" fontWeight="700" textAnchor="middle" x="50" y="106">सत्यमेव जयते</text>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 font-devanagari">भारत सरकार</span>
                  <span className="text-[10px] text-ink-300">•</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">Government of India</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-ink-900 tracking-tight leading-none">
                  {t('ministryDevanagari', 'सहकारिता मंत्रालय')}
                </p>
                <p className="text-sm sm:text-base font-semibold text-ink-700 tracking-tight mt-0.5">
                  {t('ministryName', 'Ministry of Cooperation')}
                </p>
                <p className="text-[11px] text-ink-500 mt-0.5">
                  {t('ncctHeader', 'National Council for Cooperative Training (NCCT) • राष्ट्रीय सहकारी प्रशिक्षण परिषद')}
                </p>
              </div>
            </div>

            {/* Search & Sovereign Badges */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <div className="relative w-full sm:w-72">
                <input
                  className="w-full pl-9 pr-14 py-1.5 text-xs bg-ink-50 hover:bg-ink-100/70 focus:bg-white border border-ink-200 rounded text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-ink-800 transition"
                  placeholder={t('searchPlaceholder', 'Search Acts, Rules, PACS, Circulars...')}
                  type="search"
                  aria-label="Search portal resources"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-ink-400 text-sm">search</span>
                <kbd className="absolute right-2 top-2 text-[10px] font-mono text-ink-400 border border-ink-200 px-1 rounded bg-white hidden sm:inline">⌘K</kbd>
              </div>
              <div className="hidden lg:flex items-center gap-2 border-l border-ink-200 pl-4">
                <div className="px-2.5 py-1 rounded border border-ink-200 text-left bg-ink-50/50">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-500 block">{t('mottoTitle', 'Motto')}</span>
                  <span className="text-xs font-bold text-ink-900">{t('mottoVal', 'सहकार से समृद्धि')}</span>
                </div>
                <div className="px-2.5 py-1 rounded border border-ink-200 text-left bg-ink-50/50">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-500 block">{t('initiativeTitle', 'Initiative')}</span>
                  <span className="text-xs font-semibold text-ink-900">{t('initiativeVal', 'Digital India')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MOBILE-RESPONSIVE STICKY NAVIGATION */}
        <nav className="bg-ink-900 text-white border-b border-ink-800 sticky top-0 z-40" style={{ backgroundColor: 'rgb(28, 50, 36)', borderBottomColor: 'rgb(39, 67, 49)' }} aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between text-xs font-medium">
            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center whitespace-nowrap overflow-x-auto" role="list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    className={`py-3 px-3 transition-colors flex items-center gap-1 ${isActive(link.to) ? 'text-white font-semibold border-b-2 border-white' : 'text-white/80 hover:text-white'}`}
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden flex items-center gap-2 py-3 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
              <span className="text-xs font-medium">{t('menu', 'Menu')}</span>
            </button>

            {/* AI Chatbot CTA */}
            <div className="ml-auto md:ml-4 flex items-center">
              <Link to="/chat" className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-full font-bold transition shadow-sm border border-emerald-500 text-[11px]">
                <span className="material-symbols-outlined text-[15px]">smart_toy</span>
                <span>{t('navChat', 'CoopSathi AI')}</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileOpen && (
            <div id="mobile-menu" className="md:hidden border-t border-ink-700" style={{ backgroundColor: 'rgb(22, 42, 30)' }}>
              <ul className="flex flex-col py-2" role="list">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      className={`block px-6 py-3 text-sm transition-colors ${isActive(link.to) ? 'text-white font-semibold bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* 4. REFINED TICKER / OFFICIAL NOTICES */}
        <section className="border-b border-ink-100 bg-ink-50 text-[11px] py-1.5 px-4 sm:px-8 text-ink-600 overflow-hidden" style={{ backgroundColor: 'rgb(246, 243, 238)', borderBottomColor: 'rgb(229, 224, 214)', color: 'rgb(74, 84, 77)' }}>
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="overflow-hidden relative w-full flex items-center">
              <div className="animate-marquee space-x-8 text-ink-700 whitespace-nowrap">
                <span><strong>Model By-laws:</strong> {t('tickerBylaws')}</span>
                <span className="text-ink-300">•</span>
                <span><strong>PMFBY Calamity Alert:</strong> {t('tickerPmfby')}</span>
                <span className="text-ink-300">•</span>
                <span><strong>National Cooperative Database:</strong> {t('tickerNcd')}</span>
                <span className="text-ink-300">•</span>
                <span><strong>Kisan Credit Card (MISS):</strong> {t('tickerKcc')}</span>
                <span className="text-ink-300">•</span>
                <span><strong>NCCT Admissions:</strong> {t('tickerNcct')}</span>
              </div>
            </div>
            <Link className="flex-shrink-0 text-ink-600 hover:text-ink-900 font-medium hover:underline hidden md:inline" to="/laws">
              {t('tickerAll', 'All Circulars & Rules →')}
            </Link>
          </div>
        </section>

        {/* MAIN CONTENT AREA */}
        <Outlet />

        {/* 5. ULTRA-PROFESSIONAL MINIMALIST MONOCHROME FOOTER */}
        <footer className="bg-ink-900 text-ink-400 text-xs border-t border-ink-800 mt-auto" style={{ backgroundColor: 'rgb(23, 42, 30)', borderTopColor: 'rgb(36, 62, 45)', color: 'rgb(155, 179, 162)' }}>
          {/* Link Grid */}
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 border-b border-ink-800/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h2 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
                  Apex Portals
                </h2>
                <ul className="space-y-2 text-ink-400 text-xs">
                  <li><a className="hover:text-white transition" href="https://cooperation.gov.in" target="_blank" rel="noopener noreferrer">cooperation.gov.in</a></li>
                  <li><a className="hover:text-white transition" href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer">crcs.gov.in (Registrar)</a></li>
                  <li><a className="hover:text-white transition" href="https://ncct.ac.in" target="_blank" rel="noopener noreferrer">ncct.ac.in (NCCT Apex)</a></li>
                  <li><a className="hover:text-white transition" href="https://pmfby.gov.in" target="_blank" rel="noopener noreferrer">pmfby.gov.in (Insurance)</a></li>
                  <li><a className="hover:text-white transition" href="https://nabard.org" target="_blank" rel="noopener noreferrer">nabard.org</a></li>
                </ul>
              </div>
              <div>
                <h2 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
                  Statutory &amp; Legal
                </h2>
                <ul className="space-y-2 text-ink-400 text-xs">
                  <li><Link className="hover:text-white transition" to="/laws">{t('navLaws', 'MSCS Act 2023')}</Link></li>
                  <li><Link className="hover:text-white transition" to="/laws">Cooperative Election Rules</Link></li>
                  <li><Link className="hover:text-white transition" to="/laws">Gazette Notifications</Link></li>
                  <li><Link className="hover:text-white transition" to="/laws">Standard Model PACS By-laws</Link></li>
                  <li><Link className="hover:text-white transition" to="/ombudsman">{t('navOmbudsman', 'Ombudsman Regulations')}</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
                  Citizen Support
                </h2>
                <ul className="space-y-2 text-ink-400 text-xs">
                  <li className="text-ink-300">PMFBY Toll Free: <span className="text-white font-mono font-medium">14447</span></li>
                  <li className="text-ink-300">Kisan Call Centre: <span className="text-white font-mono font-medium">1800-180-1551</span></li>
                  <li>Email: <a className="hover:text-white text-ink-300 transition" href="mailto:coop-helpdesk@gov.in">coop-helpdesk@gov.in</a></li>
                  <li className="text-[11px] text-ink-500 pt-1 leading-normal">
                    Atal Akshay Urja Bhawan, CGO Complex, Lodhi Road, New Delhi 110003
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
                  National Portals
                </h2>
                <ul className="space-y-2 text-ink-400 text-xs">
                  <li><a className="hover:text-white transition" href="https://india.gov.in" target="_blank" rel="noopener noreferrer">india.gov.in</a></li>
                  <li><a className="hover:text-white transition" href="https://mygov.in" target="_blank" rel="noopener noreferrer">mygov.in</a></li>
                  <li><a className="hover:text-white transition" href="https://data.gov.in" target="_blank" rel="noopener noreferrer">data.gov.in</a></li>
                  <li><a className="hover:text-white transition" href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer">CPGRAMS Redressal</a></li>
                  <li><a className="hover:text-white transition" href="https://digitalindia.gov.in" target="_blank" rel="noopener noreferrer">Digital India</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mandatory Policies Strip */}
          <div className="py-3 px-4 sm:px-8 border-b border-ink-800/60" style={{ backgroundColor: 'rgb(17, 32, 23)', borderColor: 'rgb(32, 53, 39)' }}>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-ink-400">
              <Link className="hover:text-ink-200" to="/privacy">Privacy Policy</Link>
              <span>•</span>
              <Link className="hover:text-ink-200" to="/terms">Terms of Use</Link>
              <span>•</span>
              <Link className="hover:text-ink-200" to="/copyright">Copyright Policy</Link>
              <span>•</span>
              <Link className="hover:text-ink-200" to="/hyperlink">Hyperlinking Policy</Link>
              <span>•</span>
              <Link className="hover:text-ink-200" to="/accessibility">Accessibility Statement</Link>
              <span>•</span>
              <Link className="hover:text-ink-200" to="/disclaimer">Disclaimer</Link>
              <span>•</span>
              <Link className="hover:text-ink-200" to="/sitemap">Sitemap</Link>
            </div>
          </div>

          {/* Official Hosting & NIC Management Attribution */}
          <div className="py-5 px-4 sm:px-8 text-center text-[11px] text-ink-400">
            <div className="max-w-4xl mx-auto space-y-1">
              <p>Website Content Managed by <strong>Ministry of Cooperation, Government of India</strong> (सहकारिता मंत्रालय, भारत सरकार).</p>
              <p className="text-ink-400">Designed, Developed and Hosted by <strong>National Informatics Centre (NIC)</strong>, MeitY, Government of India.</p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-ink-400 text-[10px]">
                <span>Last Updated: <strong>24 October 2024</strong></span>
                <span>•</span>
                <span>GIGW Compliance: <strong>Level AA</strong></span>
                <span>•</span>
                <span>Certified Standard v3.0</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Global Floating AI Assistant Widget with Voice Chat Option */}
        <ChatWidget />
      </div>
    </>
  );
}
