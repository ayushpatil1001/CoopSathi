import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackText: string) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackText)}&background=1e3a29&color=fff&size=96`;
  };

  return (
    <>
      <SEOHead {...SEO_PAGES.home} />
      <main className="flex-grow" id="main-content">
        {/* 6. HERO STATEMENT & PRIMARY WORKSPACE */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-ink-100 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Minimal Hero Typography Header */}
            <div className="max-w-3xl mb-12">
              <div
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-ink-200 text-ink-600 text-[11px] font-medium bg-ink-50 mb-4"
                style={{ backgroundColor: 'rgb(234, 241, 236)', borderColor: 'rgb(196, 215, 202)', color: 'rgb(45, 80, 56)' }}
              >
                <span className="text-ink-900 font-semibold font-devanagari">{t('mottoVal', 'सहकार से समृद्धि')}</span>
                <span className="text-ink-300">|</span>
                <span>{t('prosperityTag', 'Prosperity Through Cooperation')}</span>
              </div>

              {/* PRIMARY H1 FOR HOME PAGE */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight">
                {t('heroTitle', "Empowering India's Rural Economy through Transparent, Modern Cooperatives")}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-ink-500 leading-relaxed max-w-2xl font-normal">
                {t('heroDesc', 'Strengthening Primary Agricultural Credit Societies (PACS), integrating multi-state cooperatives under the MSCS Act 2023, and delivering statutory security to 30+ crore members.')}
              </p>
            </div>

            {/* Two Column Architecture: Executive Profiles + AI Assistant Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Column 1: Executive Leadership (5 cols) */}
              <div className="lg:col-span-5 border border-ink-200 rounded-lg p-5 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ink-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-900">{t('leadershipTitle', 'Institutional Leadership')}</span>
                  <span className="text-[10px] font-mono text-ink-500">{t('leadershipBadge', 'GOI Executive')}</span>
                </div>

                {/* Profile Cards */}
                <div className="space-y-3">
                  {/* Shri Amit Shah */}
                  <div className="flex items-center gap-3.5 p-3 rounded border border-ink-100 hover:border-ink-300 bg-ink-50/50 transition">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/41/Amit_Shah_Official_Portrait.jpg"
                      alt="Shri Amit Shah — Minister for Cooperation"
                      className="w-12 h-12 rounded-lg object-cover border border-ink-200 shadow-sm flex-shrink-0"
                      onError={(e) => handleImgError(e, 'Amit Shah')}
                      loading="lazy"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 block">{t('amitShahTitle', 'Union Minister')}</span>
                      <h2 className="text-xs font-bold text-ink-900">{t('amitShahName', 'Shri Amit Shah')}</h2>
                      <p className="text-[11px] text-ink-500">{t('amitShahRole', 'Minister for Cooperation & Minister of Home Affairs')}</p>
                    </div>
                  </div>

                  {/* Shri Murlidhar Mohol */}
                  <div className="flex items-center gap-3.5 p-3 rounded border border-ink-100 hover:border-ink-300 bg-ink-50/50 transition">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Murlidhar_Mohol.png"
                      alt="Shri Murlidhar Mohol — Minister of State for Cooperation"
                      className="w-12 h-12 rounded-lg object-cover border border-ink-200 shadow-sm flex-shrink-0"
                      onError={(e) => handleImgError(e, 'Murlidhar Mohol')}
                      loading="lazy"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 block">{t('moholTitle', 'Minister of State')}</span>
                      <h2 className="text-xs font-bold text-ink-900">{t('moholName', 'Shri Murlidhar Mohol')}</h2>
                      <p className="text-[11px] text-ink-500">{t('moholRole', 'Minister of State for Cooperation & Civil Aviation')}</p>
                    </div>
                  </div>

                  {/* Dr. Ashish Kumar Bhutani */}
                  <div className="flex items-center gap-3.5 p-3 rounded border border-ink-100 hover:border-ink-300 bg-ink-50/50 transition">
                    <img
                      src="https://ui-avatars.com/api/?name=Ashish+Kumar+Bhutani&background=1e3a29&color=fff&size=96"
                      alt="Dr. Ashish Kumar Bhutani — Secretary, Ministry of Cooperation"
                      className="w-12 h-12 rounded-lg object-cover border border-ink-200 shadow-sm flex-shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 block">{t('secretaryTitle', 'Secretary')}</span>
                      <h2 className="text-xs font-bold text-ink-900">{t('secretaryName', 'Dr. Ashish Kumar Bhutani, IAS')}</h2>
                      <p className="text-[11px] text-ink-500">{t('secretaryRole', 'Secretary, Ministry of Cooperation')}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-ink-100 text-[11px] text-ink-500 leading-normal">
                  {t('leadershipQuote', '"Cooperation is the bedrock of rural self-reliance. Transparent digital systems unlock unprecedented grassroots scale."')}
                </div>
              </div>

              {/* Column 2: Citizen Helpdesk & Quick Services */}
              <div className="lg:col-span-7 border border-ink-200 rounded-lg p-6 bg-white shadow-sm flex flex-col justify-between relative" id="helpdesk-services">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-ink-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                        <span className="material-symbols-outlined text-lg">support_agent</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-ink-900">{t('helpdeskTitle', 'Citizen Helpdesk & Quick Services')}</h2>
                        </div>
                        <p className="text-[11px] text-ink-500">{t('helpdeskSubtitle', 'Official Support, Statutory Filings & Circular Registry')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded border border-ink-100 bg-ink-50/50">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">{t('nationalHelplineTitle', 'National Helpline')}</span>
                        <span className="material-symbols-outlined text-sm text-ink-500">call</span>
                      </div>
                      <div className="text-base font-bold text-ink-900 font-mono mt-1">1800-180-1551</div>
                      <p className="text-[10px] text-ink-500 mt-0.5">{t('nationalHelplineName', 'Kisan Call Centre (Toll-Free)')}</p>
                    </div>

                    <div className="p-3 rounded border border-ink-100 bg-ink-50/50">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">{t('cropHelplineTitle', 'Crop Insurance Desk')}</span>
                        <span className="material-symbols-outlined text-sm text-ink-500">phone_in_talk</span>
                      </div>
                      <div className="text-base font-bold text-ink-900 font-mono mt-1">14447</div>
                      <p className="text-[10px] text-ink-500 mt-0.5">{t('cropHelplineName', 'PMFBY Claim Intimation Toll-Free')}</p>
                    </div>
                  </div>

                  <div className="bg-ink-50/70 border border-ink-200 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">{t('searchCircularTitle', 'Find Official Circulars & Statutory Notices')}</span>
                      <span className="text-[10px] font-mono text-ink-400">CRCS / MSCS</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        className="w-full pl-8 pr-24 py-1.5 text-xs bg-white border border-ink-200 rounded text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-ink-800"
                        placeholder="Enter subject, circular number, or date..."
                        type="text"
                        aria-label="Search official circulars"
                      />
                      <span className="material-symbols-outlined absolute left-2 text-ink-400 text-sm">search</span>
                      <Link to="/laws" className="absolute right-1 px-2.5 py-1 text-[11px] font-semibold bg-ink-900 hover:bg-ink-800 text-white rounded transition">
                        {t('searchButton', 'Search')}
                      </Link>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">{t('resourcesTitle', 'Key Statutory Resources & Downloads')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      <Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/laws">
                        <span className="material-symbols-outlined text-xs text-ink-500">description</span>
                        <span>{t('resMscs', 'MSCS Act 2023 Rules')}</span>
                      </Link>
                      <Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/laws">
                        <span className="material-symbols-outlined text-xs text-ink-500">description</span>
                        <span>{t('resBylaws', 'Model PACS By-laws')}</span>
                      </Link>
                      <Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/ombudsman">
                        <span className="material-symbols-outlined text-xs text-ink-500">gavel</span>
                        <span>{t('resOmbudsman', 'Ombudsman Guidelines')}</span>
                      </Link>
                      <Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/ncct">
                        <span className="material-symbols-outlined text-xs text-ink-500">verified</span>
                        <span>{t('resNcct', 'NCCT Verification')}</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between text-[11px] text-ink-500">
                  <span>{t('grievanceDesk', 'Official Grievance Desk:')} <strong>coop-helpdesk@gov.in</strong></span>
                  <Link className="text-ink-900 font-medium hover:underline flex items-center gap-0.5" to="/ombudsman">
                    {t('statutoryGrievanceLink', 'Statutory Grievance Redressal →')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CITIZEN & COOPERATIVE SERVICES (ULTRA-CLEAN CARDS) */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 bg-ink-50/50 border-b border-ink-100" id="services" style={{ backgroundColor: 'rgb(250, 247, 242)', borderBottomColor: 'rgb(232, 226, 216)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-ink-200/80">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block">{t('directAccess', 'Direct Access')}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
                  {t('priorityServicesTitle', 'Priority Cooperative Services & Citizen Portals')}
                </h2>
                <p className="text-xs text-ink-500 mt-0.5">{t('priorityServicesDesc', 'Statutory portals, regulatory filings, crop insurance, and digitized PACS operations.')}</p>
              </div>
              <span className="text-[11px] text-ink-500 font-mono mt-2 md:mt-0">
                {t('gigwCertified', 'GIGW 3.0 Certified')}
              </span>
            </div>

            {/* 6 Minimalist Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1: MSCS Act */}
              <div className="bg-white rounded-lg border border-ink-200 hover:border-blue-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                      <span className="material-symbols-outlined text-lg">gavel</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-blue-900">{t('cardLawsTitle')}</h3>
                  <p className="text-xs text-ink-500 mt-2 leading-relaxed">{t('cardLawsDesc')}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-600">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-500"></span>{t('cardLawsB1')}</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-500"></span>{t('cardLawsB2')}</li>
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900">
                  <Link className="hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors" to="/laws">
                    <span>{t('cardLawsCta')}</span>
                    <span className="material-symbols-outlined text-sm text-blue-600">arrow_forward</span>
                  </Link>
                  <span className="text-[10px] font-mono text-ink-400">PDF • 4.2 MB</span>
                </div>
              </div>

              {/* Card 2: PMFBY */}
              <div className="bg-white rounded-lg border border-ink-200 hover:border-amber-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                      <span className="material-symbols-outlined text-lg">shield</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-amber-900">{t('cardPmfbyTitle')}</h3>
                  <p className="text-xs text-ink-500 mt-2 leading-relaxed">{t('cardPmfbyDesc')}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-600">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>{t('cardPmfbyB1')}</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>{t('cardPmfbyB2')}</li>
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900">
                  <Link className="hover:text-amber-800 hover:underline flex items-center gap-1 transition-colors" to="/pmfby">
                    <span>{t('cardPmfbyCta')}</span>
                    <span className="material-symbols-outlined text-sm text-amber-600">arrow_forward</span>
                  </Link>
                  <span className="text-[10px] font-mono text-ink-400">Claims Desk</span>
                </div>
              </div>

              {/* Card 3: PACS Modernization */}
              <div className="bg-white rounded-lg border border-ink-200 hover:border-emerald-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                      <span className="material-symbols-outlined text-lg">storefront</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-emerald-900">{t('cardPacsTitle')}</h3>
                  <p className="text-xs text-ink-500 mt-2 leading-relaxed">{t('cardPacsDesc')}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-600">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-500"></span>{t('cardPacsB1')}</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-500"></span>{t('cardPacsB2')}</li>
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900">
                  <Link className="hover:text-emerald-800 hover:underline flex items-center gap-1 transition-colors" to="/pacs">
                    <span>{t('cardPacsCta')}</span>
                    <span className="material-symbols-outlined text-sm text-emerald-600">arrow_forward</span>
                  </Link>
                  <span className="text-[10px] font-mono text-ink-400">NABARD Assisted</span>
                </div>
              </div>

              {/* Card 4: Kisan Credit Card */}
              <div className="bg-white rounded-lg border border-ink-200 hover:border-teal-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                      <span className="material-symbols-outlined text-lg">credit_card</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-teal-900">{t('cardKccTitle')}</h3>
                  <p className="text-xs text-ink-500 mt-2 leading-relaxed">{t('cardKccDesc')}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-600">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-teal-500"></span>{t('cardKccB1')}</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-teal-500"></span>{t('cardKccB2')}</li>
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900">
                  <Link className="hover:text-teal-800 hover:underline flex items-center gap-1 transition-colors" to="/schemes">
                    <span>{t('cardKccCta')}</span>
                    <span className="material-symbols-outlined text-sm text-teal-600">arrow_forward</span>
                  </Link>
                  <span className="text-[10px] font-mono text-ink-400">Interest Subvention</span>
                </div>
              </div>

              {/* Card 5: Cooperative Ombudsman */}
              <div className="bg-white rounded-lg border border-ink-200 hover:border-indigo-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                      <span className="material-symbols-outlined text-lg">balance</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-indigo-900">{t('cardOmbudsmanTitle')}</h3>
                  <p className="text-xs text-ink-500 mt-2 leading-relaxed">{t('cardOmbudsmanDesc')}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-600">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-500"></span>{t('cardOmbudsmanB1')}</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-500"></span>{t('cardOmbudsmanB2')}</li>
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900">
                  <Link className="hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors" to="/ombudsman">
                    <span>{t('cardOmbudsmanCta')}</span>
                    <span className="material-symbols-outlined text-sm text-indigo-600">arrow_forward</span>
                  </Link>
                  <span className="text-[10px] font-mono text-ink-400">Redressal Desk</span>
                </div>
              </div>

              {/* Card 6: NCCT Training */}
              <div className="bg-white rounded-lg border border-ink-200 hover:border-slate-400 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
                      <span className="material-symbols-outlined text-lg">school</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-emerald-900">{t('cardNcctTitle')}</h3>
                  <p className="text-xs text-ink-500 mt-2 leading-relaxed">{t('cardNcctDesc')}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-600">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-600"></span>{t('cardNcctB1')}</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-600"></span>{t('cardNcctB2')}</li>
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900">
                  <Link className="hover:text-emerald-800 hover:underline flex items-center gap-1 transition-colors" to="/ncct">
                    <span>{t('cardNcctCta')}</span>
                    <span className="material-symbols-outlined text-sm text-emerald-700">arrow_forward</span>
                  </Link>
                  <span className="text-[10px] font-mono text-ink-400">Academic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. MINIMALIST NATIONAL IMPACT & TELEMETRY */}
        <section className="py-14 px-4 sm:px-8 bg-white border-b border-ink-100" id="telemetry">
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-10 pb-3 border-b border-ink-200">
              <span className="text-[10px] font-mono text-ink-500 uppercase tracking-widest block">{t('telemetryBadge')}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mt-0.5">
                {t('telemetryTitle')}
              </h2>
              <p className="text-xs text-ink-500 mt-1">{t('telemetryDesc')}</p>
            </div>

            {/* 5 Clean Metric Blocks */}
            <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-ink-200 border border-ink-200 rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="p-6 text-left hover:bg-ink-50/40 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{t('statRegistered')}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">8.5+ Lakh</div>
                <div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{t('statRegisteredSub')}
                </div>
              </div>
              <div className="p-6 text-left hover:bg-ink-50/40 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{t('statMembers')}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">30+ Crore</div>
                <div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{t('statMembersSub')}
                </div>
              </div>
              <div className="p-6 text-left hover:bg-ink-50/40 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{t('statPacs')}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">79,630</div>
                <div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{t('statPacsSub')}
                </div>
              </div>
              <div className="p-6 text-left hover:bg-ink-50/40 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{t('statOutlay')}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">₹2,516 Cr</div>
                <div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>{t('statOutlaySub')}
                </div>
              </div>
              <div className="p-6 text-left col-span-2 md:col-span-1 hover:bg-ink-50/40 transition">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">{t('statDisbursed')}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">₹1.50 L Cr</div>
                <div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>{t('statDisbursedSub')}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-500 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-900"></span>
                <span>Source: <strong>cooperativedatabase.gov.in</strong> (NIC Portal)</span>
              </div>
              <Link className="text-ink-900 font-medium hover:underline flex items-center gap-1" to="/telemetry">
                <span>{t('telemetryCta')}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 9. THREE NEW NATIONAL COOPERATIVES */}
        <section className="py-12 px-4 sm:px-8 bg-ink-50/50 border-b border-ink-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-6">
              <span className="text-[10px] font-mono text-ink-500 uppercase tracking-wider block">{t('historicCabinet')}</span>
              <h2 className="text-base sm:text-lg font-bold text-ink-900">{t('threeApexTitle')}</h2>
              <p className="text-xs text-ink-500">{t('threeApexDesc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-md border border-ink-200 bg-white hover:border-emerald-300 transition relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
                <span className="inline-block text-[10px] font-mono text-emerald-800 uppercase px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 mb-2">{t('bbsslTag')}</span>
                <h3 className="text-xs font-bold text-ink-900">{t('bbsslTitle')}</h3>
                <p className="text-[11px] text-ink-500 mt-1 leading-relaxed">{t('bbsslDesc')}</p>
              </div>
              <div className="p-5 rounded-md border border-ink-200 bg-white hover:border-amber-300 transition relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                <span className="inline-block text-[10px] font-mono text-amber-800 uppercase px-1.5 py-0.5 rounded bg-amber-50 border border-amber-100 mb-2">{t('ncolTag')}</span>
                <h3 className="text-xs font-bold text-ink-900">{t('ncolTitle')}</h3>
                <p className="text-[11px] text-ink-500 mt-1 leading-relaxed">{t('ncolDesc')}</p>
              </div>
              <div className="p-5 rounded-md border border-ink-200 bg-white hover:border-blue-300 transition relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
                <span className="inline-block text-[10px] font-mono text-blue-800 uppercase px-1.5 py-0.5 rounded bg-blue-50 border border-blue-100 mb-2">{t('ncelTag')}</span>
                <h3 className="text-xs font-bold text-ink-900">{t('ncelTitle')}</h3>
                <p className="text-[11px] text-ink-500 mt-1 leading-relaxed">{t('ncelDesc')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
