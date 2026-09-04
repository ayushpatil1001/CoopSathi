import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ExternalLink, Sparkles, CheckCircle2, 
  ArrowRight, Landmark, ShieldCheck, HeartHandshake, Eye, Award
} from 'lucide-react';
import { Scheme, LanguageCode } from '../../types';
import { MOCK_SCHEMES } from '../../data/mockSchemes';
import { SchemeDetailsModal } from './SchemeDetailsModal';
import { EligibilityQuizModal } from './EligibilityQuizModal';

interface SchemeExplorerProps {
  currentLang: LanguageCode;
  onLaunchQuery: (query: string, lang: LanguageCode) => void;
}

export const SchemeExplorer: React.FC<SchemeExplorerProps> = ({
  currentLang,
  onLaunchQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectScheme, setInspectScheme] = useState<Scheme | null>(null);
  const [eligibilityScheme, setEligibilityScheme] = useState<Scheme | null>(null);

  const categories = [
    { id: 'all', label: 'All Schemes' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'insurance', label: 'Insurance (PMFBY)' },
    { id: 'credit', label: 'Credit (KCC/Loans)' },
    { id: 'cooperative', label: 'Cooperative Dev' },
    { id: 'women', label: 'Women Farmers' },
    { id: 'storage', label: 'Storage & Cold Chain' },
    { id: 'fertilizer', label: 'Fertilizer & Seeds' },
    { id: 'rural', label: 'Rural Development' },
  ];

  const filteredSchemes = useMemo(() => {
    return MOCK_SCHEMES.filter((scheme) => {
      const matchesCategory =
        selectedCategory === 'all' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        scheme.title.toLowerCase().includes(q) ||
        scheme.shortDesc.toLowerCase().includes(q) ||
        scheme.ministry.toLowerCase().includes(q) ||
        (scheme.titleHi && scheme.titleHi.toLowerCase().includes(q)) ||
        (scheme.titleMr && scheme.titleMr.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#FBF9F5] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold border border-emerald-300">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Central & State Welfare Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            Government Scheme Explorer
          </h1>
          <p className="text-slate-600 text-xs sm:text-base">
            Search verified schemes for farmers, PACS, self-help groups, and cooperative societies across India.
          </p>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-gov border-2 border-slate-200 mb-8 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes for farmers and cooperatives (e.g. PM-KISAN, KCC, PACS ERP, Fertilizer)..."
              className="w-full bg-slate-100 border border-slate-300 rounded-2xl pl-12 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-blue-800 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <Filter className="w-4 h-4 text-gov-blue-700 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-gov-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Results Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-700">No schemes found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-500">Try searching for generic terms like "credit", "fertilizer", "storage", or "PACS".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 bg-gov-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-gov-blue-600 shadow-gov hover:shadow-gov-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {scheme.category}
                    </span>
                    {scheme.badge && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        {scheme.badge}
                      </span>
                    )}
                  </div>

                  {/* Scheme Title & Localized title */}
                  <div>
                    <h3 className="text-base font-bold text-[#0A2540] group-hover:text-gov-blue-700 transition leading-snug">
                      {scheme.title}
                    </h3>
                    {scheme.titleHi && (
                      <p className="text-[11px] text-amber-700 font-semibold mt-0.5 line-clamp-1">
                        {scheme.titleHi}
                      </p>
                    )}
                  </div>

                  {/* Ministry */}
                  <p className="text-[11px] text-slate-500 font-medium">
                    🏛️ {scheme.ministry}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {scheme.shortDesc}
                  </p>

                  {/* Key Benefits Preview */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Primary Benefit:
                    </span>
                    <p className="text-xs text-emerald-900 font-semibold">
                      ✓ {scheme.benefits[0]}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons: Check Eligibility, View Details, Official Portal */}
                <div className="pt-5 mt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEligibilityScheme(scheme)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Check Eligibility</span>
                    </button>

                    <button
                      onClick={() => setInspectScheme(scheme)}
                      className="flex-1 bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </div>

                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center block text-[11px] text-slate-500 hover:text-gov-blue-900 font-semibold py-1 transition"
                  >
                    Visit Official Portal ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Drawer Modal */}
      <SchemeDetailsModal
        scheme={inspectScheme}
        onClose={() => setInspectScheme(null)}
        onCheckEligibility={(sch) => {
          setInspectScheme(null);
          setEligibilityScheme(sch);
        }}
        onAskAI={(query) => onLaunchQuery(query, currentLang)}
      />

      {/* Eligibility Quiz Modal */}
      <EligibilityQuizModal
        scheme={eligibilityScheme}
        onClose={() => setEligibilityScheme(null)}
        onOpenChat={(query) => onLaunchQuery(query, currentLang)}
      />
    </div>
  );
};
