import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ArrowUpDown, X, Layers, Users, 
  RefreshCw, Bot, ArrowRight, HelpCircle 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';
import { SCHEMES_CATALOG, SchemeItem } from '../data/schemesCatalog';
import { DailySyncBanner } from '../components/schemes/DailySyncBanner';
import { SchemeCard } from '../components/schemes/SchemeCard';
import { SchemeDetailModal } from '../components/schemes/SchemeDetailModal';

export default function Schemes() {
  const [schemesData, setSchemesData] = useState<SchemeItem[]>(SCHEMES_CATALOG);
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'name-asc' | 'name-desc' | 'sector'>('year-desc');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch schemes from backend API if available, fallback to SCHEMES_CATALOG
  const loadSchemesFromBackend = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/schemes');
      if (res.ok) {
        const data = await res.json();
        if (data.schemes && Array.isArray(data.schemes) && data.schemes.length > 0) {
          setSchemesData(data.schemes);
        }
      }
    } catch {
      setSchemesData(SCHEMES_CATALOG);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSchemesFromBackend();
  }, []);

  // Compute unique sectors
  const sectorList = useMemo(() => {
    const set = new Set<string>();
    schemesData.forEach((s) => set.add(s.sector));
    return Array.from(set);
  }, [schemesData]);

  // Common target beneficiaries for pill filters
  const beneficiaryFilters = [
    { id: 'ALL', label: 'All Beneficiaries' },
    { id: 'Farmers', label: 'Farmers & Agri' },
    { id: 'Women', label: 'Women & Mothers' },
    { id: 'Students', label: 'Students & Youth' },
    { id: 'MSME', label: 'MSME & Business' },
    { id: 'Senior Citizens', label: 'Senior Citizens' },
    { id: 'BPL', label: 'Low Income / BPL' },
    { id: 'Cooperative', label: 'Cooperative Societies' },
  ];

  // Filtering & Sorting Logic
  const filteredSchemes = useMemo(() => {
    return schemesData
      .filter((scheme) => {
        // Sector filter
        if (selectedSector !== 'ALL' && scheme.sector !== selectedSector) {
          return false;
        }

        // Level filter (Central vs State)
        if (selectedLevel === 'CENTRAL' && scheme.level !== 'Central') return false;
        if (selectedLevel === 'STATE' && scheme.level !== 'State') return false;

        // Beneficiary filter
        if (selectedBeneficiary !== 'ALL') {
          const bSearch = selectedBeneficiary.toLowerCase();
          const matches = scheme.targetBeneficiaries.some((b) =>
            b.toLowerCase().includes(bSearch)
          );
          if (!matches) return false;
        }

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = scheme.title.toLowerCase().includes(q);
          const matchObjective = scheme.objective.toLowerCase().includes(q);
          const matchBenefit = scheme.benefitSummary.toLowerCase().includes(q);
          const matchMinistry = scheme.ministry.toLowerCase().includes(q);
          const matchSector = scheme.sector.toLowerCase().includes(q);
          const matchState = scheme.state ? scheme.state.toLowerCase().includes(q) : false;
          const matchDocs = scheme.requiredDocuments.some((d) => d.toLowerCase().includes(q));

          if (!matchTitle && !matchObjective && !matchBenefit && !matchMinistry && !matchSector && !matchState && !matchDocs) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'year-desc') return b.launchYear - a.launchYear;
        if (sortBy === 'year-asc') return a.launchYear - b.launchYear;
        if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
        if (sortBy === 'name-desc') return b.title.localeCompare(a.title);
        if (sortBy === 'sector') return a.sector.localeCompare(b.sector);
        return 0;
      });
  }, [schemesData, selectedSector, selectedLevel, selectedBeneficiary, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSector('ALL');
    setSelectedLevel('ALL');
    setSelectedBeneficiary('ALL');
    setSortBy('year-desc');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSector !== 'ALL' ||
    selectedLevel !== 'ALL' ||
    selectedBeneficiary !== 'ALL';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 min-h-[75vh]">
      <SEOHead {...SEO_PAGES.schemes} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-500">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-emerald-800 transition">Home</Link>
          </li>
          <li><span className="text-ink-300">/</span></li>
          <li>
            <span className="text-ink-500">Priority Services</span>
          </li>
          <li><span className="text-ink-300">/</span></li>
          <li className="text-ink-800 font-semibold">Government Schemes &amp; Welfare Programs</li>
        </ol>
      </nav>

      {/* Minimalist Header Section matching Home Page */}
      <section className="bg-white rounded-lg border border-ink-200 p-6 sm:p-8 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-emerald-200 text-[11px] font-medium bg-emerald-50 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>93 Verified Programs</span>
          </span>
          <span className="text-[11px] font-mono text-ink-500 px-2 py-0.5 rounded border border-ink-200 bg-white">
            Official CRCS &amp; MoC Directory
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight leading-tight">
          Government Schemes &amp; Welfare Programs
          <span className="text-ink-500 font-devanagari text-lg sm:text-xl font-normal block sm:inline sm:ml-2">
            (सरकारी योजनाएं एवं कल्याणकारी कार्यक्रम)
          </span>
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-ink-500 leading-relaxed max-w-3xl font-normal">
          Central sector schemes, financial subventions, and infrastructure subsidies directly supporting PACS, dairy, fishery, and multi-state cooperative societies across India.
        </p>
      </section>

      {/* Automated Daily Telemetry & Sync Bar */}
      <DailySyncBanner
        totalSchemes={schemesData.length}
        onSyncComplete={loadSchemesFromBackend}
      />

      {/* Filter & Search System */}
      <div className="bg-white rounded-lg border border-ink-200 p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] mb-6 space-y-4">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, keyword (e.g. PACS, cold storage, loan subvention), or DBT code..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-ink-50/60 hover:bg-ink-50 focus:bg-white border border-ink-200 rounded text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-emerald-700 transition"
            />
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-ink-400 hover:text-ink-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Level Filter & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Level Filter (Central vs State) with Green Accent */}
            <div className="flex items-center justify-between sm:justify-start gap-1 border border-ink-200 p-0.5 rounded bg-ink-50 text-xs shrink-0">
              <button
                onClick={() => setSelectedLevel('ALL')}
                className={`flex-1 sm:flex-none px-3 py-1 rounded transition text-center ${selectedLevel === 'ALL' ? 'bg-emerald-800 text-white font-semibold shadow-xs' : 'text-ink-600 hover:text-ink-900'}`}
              >
                All (93)
              </button>
              <button
                onClick={() => setSelectedLevel('CENTRAL')}
                className={`flex-1 sm:flex-none px-3 py-1 rounded transition text-center ${selectedLevel === 'CENTRAL' ? 'bg-emerald-800 text-white font-semibold shadow-xs' : 'text-ink-600 hover:text-ink-900'}`}
              >
                Central (81)
              </button>
              <button
                onClick={() => setSelectedLevel('STATE')}
                className={`flex-1 sm:flex-none px-3 py-1 rounded transition text-center ${selectedLevel === 'STATE' ? 'bg-emerald-800 text-white font-semibold shadow-xs' : 'text-ink-600 hover:text-ink-900'}`}
              >
                State (12)
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 min-w-[180px]">
              <ArrowUpDown className="w-3.5 h-3.5 text-ink-400 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-1.5 px-2.5 text-xs bg-ink-50/60 border border-ink-200 rounded text-ink-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                aria-label="Sort schemes by"
              >
                <option value="year-desc">Launch Year (Newest)</option>
                <option value="year-asc">Launch Year (Oldest)</option>
                <option value="name-asc">Scheme Name (A to Z)</option>
                <option value="name-desc">Scheme Name (Z to A)</option>
                <option value="sector">Sector &amp; Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Sector Tabs */}
        <div className="space-y-1.5 pt-3 border-t border-ink-100">
          <div className="flex items-center justify-between text-[11px] text-ink-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sector &amp; Program Category</span>
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-emerald-700 hover:text-emerald-800 normal-case font-medium text-xs flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-scroll -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedSector('ALL')}
              className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition border shrink-0 ${
                selectedSector === 'ALL'
                  ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs'
                  : 'bg-white text-ink-600 border-ink-200 hover:bg-emerald-50/50 hover:border-emerald-200'
              }`}
            >
              All Sectors ({schemesData.length})
            </button>
            {sectorList.map((sec) => {
              const count = schemesData.filter((s) => s.sector === sec).length;
              const isSelected = selectedSector === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition border shrink-0 ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs'
                      : 'bg-white text-ink-600 border-ink-200 hover:bg-emerald-50/50 hover:border-emerald-200'
                  }`}
                >
                  {sec} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Target Beneficiaries */}
        <div className="pt-2.5 border-t border-ink-100 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none touch-scroll -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="text-ink-400 font-medium flex items-center gap-1 flex-shrink-0 text-[11px]">
            <Users className="w-3 h-3" />
            <span>Target:</span>
          </span>
          {beneficiaryFilters.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBeneficiary(b.id)}
              className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap font-medium transition border shrink-0 ${
                selectedBeneficiary === b.id
                  ? 'bg-emerald-800 text-white border-emerald-800 font-semibold'
                  : 'bg-ink-50/60 text-ink-600 border-ink-200 hover:bg-emerald-50/40 hover:border-emerald-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Line */}
      <div className="flex items-center justify-between mb-4 px-0.5">
        <div className="text-xs text-ink-500 font-normal">
          Showing <strong className="text-ink-900 font-semibold">{filteredSchemes.length}</strong> of{' '}
          <strong className="text-ink-900 font-semibold">{schemesData.length}</strong> verified government programs
          {selectedSector !== 'ALL' && <span> in <strong className="text-emerald-800">{selectedSector}</strong></span>}
          {selectedLevel !== 'ALL' && <span> ({selectedLevel.toLowerCase()} level)</span>}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-emerald-700 hover:text-emerald-800 underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Grid of Individual Scheme Cards */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onSelect={(s) => setSelectedScheme(s)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-ink-200 p-12 text-center my-6 space-y-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-ink-900">No schemes found matching search criteria</h3>
          <p className="text-xs text-ink-500 max-w-sm mx-auto">
            Please adjust your search keywords or reset active filters to browse the complete directory.
          </p>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Modal Dialog for Scheme Details */}
      <SchemeDetailModal
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
      />

      {/* Citizen AI Assistance Card matching Home page Helpdesk */}
      <section className="bg-white rounded-lg border border-ink-200 p-6 mb-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Citizen Assistance</span>
                <span className="text-ink-300">•</span>
                <span className="text-[10px] font-medium text-ink-500">Multilingual AI Helpdesk</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-ink-900">
                Need personalized guidance for scheme selection or eligibility?
              </h2>
              <p className="text-xs text-ink-500 max-w-2xl leading-relaxed">
                CoopSathi AI analyzes eligibility requirements, verifies document checklists, and explains how to apply in 12+ Indian regional languages.
              </p>
            </div>
          </div>
          <Link
            to="/chat"
            className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded text-xs font-semibold transition shadow-xs flex-shrink-0"
          >
            <span>Ask CoopSathi AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-lg border border-ink-200 p-6 mb-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ink-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>Government Schemes &amp; Direct Benefit Transfer FAQ</span>
        </h2>
        <div className="space-y-2.5">
          {SEO_PAGES.schemes.faqItems?.map((faq) => (
            <details key={faq.question} className="border border-ink-100 rounded p-3.5 group transition bg-ink-50/30 hover:border-emerald-200">
              <summary className="font-semibold text-ink-800 cursor-pointer text-xs list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-ink-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-ink-600 text-xs leading-relaxed border-t border-ink-100 pt-2">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Departmental Pages */}
      <div className="pt-5 border-t border-ink-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400 mb-3">Related Portals &amp; Statutory Acts</h3>
        <div className="flex flex-wrap gap-2">
          <Link to="/pacs" className="text-xs bg-white border border-ink-200 hover:border-emerald-500 hover:text-emerald-800 text-ink-700 px-3 py-1.5 rounded transition font-medium">
            PACS Modernization ERP
          </Link>
          <Link to="/pmfby" className="text-xs bg-white border border-ink-200 hover:border-emerald-500 hover:text-emerald-800 text-ink-700 px-3 py-1.5 rounded transition font-medium">
            PMFBY Crop Insurance
          </Link>
          <Link to="/laws" className="text-xs bg-white border border-ink-200 hover:border-emerald-500 hover:text-emerald-800 text-ink-700 px-3 py-1.5 rounded transition font-medium">
            MSCS Act 2023 &amp; Rules
          </Link>
          <Link to="/ombudsman" className="text-xs bg-white border border-ink-200 hover:border-emerald-500 hover:text-emerald-800 text-ink-700 px-3 py-1.5 rounded transition font-medium">
            Cooperative Ombudsman
          </Link>
          <Link to="/ncct" className="text-xs bg-white border border-ink-200 hover:border-emerald-500 hover:text-emerald-800 text-ink-700 px-3 py-1.5 rounded transition font-medium">
            NCCT Cooperative Training
          </Link>
        </div>
      </div>
    </main>
  );
}
