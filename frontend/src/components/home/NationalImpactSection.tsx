import React, { useState, useEffect } from 'react';
import { Award, Users, Landmark, Download, Sprout, Leaf, Globe2, ExternalLink } from 'lucide-react';
import { LanguageCode } from '../../types';
import { apiService, RealTimeGovSummary } from '../../services/apiService';

interface NationalImpactSectionProps {
  currentLang: LanguageCode;
  onSelectTab: (tab: string) => void;
}

export const NationalImpactSection: React.FC<NationalImpactSectionProps> = ({
  currentLang,
  onSelectTab,
}) => {
  const [liveSummary, setLiveSummary] = useState<RealTimeGovSummary | null>(null);

  useEffect(() => {
    apiService.getRealTimeSummary().then((data) => {
      if (data) setLiveSummary(data);
    });
  }, []);

  return (
    <div id="telemetry">
      {/* 1. SCALE AND IMPACT OF INDIA'S COOPERATIVE SECTOR (DEEP NAVY TELEMETRY DASHBOARD) */}
      <section className="bg-[#071C30] text-white py-14 px-4 sm:px-8 relative overflow-hidden border-b border-slate-700">
        {/* Subtle Ashoka Chakra Watermark Graphic */}
        <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none text-white">
          <svg className="w-96 h-96" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="45" strokeWidth="2"></circle>
            <circle cx="50" cy="50" r="10" strokeWidth="2"></circle>
            <g strokeWidth="1.5">
              <line x1="50" y1="5" x2="50" y2="95"></line>
              <line x1="5" y1="50" x2="95" y2="50"></line>
              <line x1="18.2" y1="18.2" x2="81.8" y2="81.8"></line>
              <line x1="18.2" y1="81.8" x2="81.8" y2="18.2"></line>
              <line x1="7.6" y1="32.7" x2="92.4" y2="67.3"></line>
              <line x1="32.7" y1="7.6" x2="67.3" y2="92.4"></line>
              <line x1="7.6" y1="67.3" x2="92.4" y2="32.7"></line>
              <line x1="32.7" y1="92.4" x2="67.3" y2="7.6"></line>
            </g>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-700/80">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#FF9933] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Telemetry • राष्ट्रीय सांख्यिकी</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#FF9933] tracking-tight mt-1">
                Scale and Impact of India's Cooperative Sector
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Census statistics verified by Ministry of Cooperation & National Informatics Centre (NIC)
              </p>
            </div>
            <div className="text-[11px] text-slate-300 font-mono mt-3 md:mt-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Synced with National Cooperative Database</span>
            </div>
          </div>

          {/* 5 KPI Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {/* Metric 1 */}
            <div className="bg-[#0A2540]/90 border border-slate-700/90 p-5 rounded-lg backdrop-blur-xs hover:border-amber-400 transition shadow-sm">
              <div className="text-[11px] font-semibold text-slate-300">Registered Societies</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight font-mono">
                {liveSummary?.metrics.totalRegisteredCooperatives || '8.5+ Lakh'}
              </div>
              <div className="text-[10px] text-amber-400 font-medium mt-1">Across 36 States & UTs</div>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#0A2540]/90 border border-slate-700/90 p-5 rounded-lg backdrop-blur-xs hover:border-amber-400 transition shadow-sm">
              <div className="text-[11px] font-semibold text-slate-300">Total Members</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight font-mono">
                {liveSummary?.metrics.cooperativeCitizensCovered || '30+ Crore'}
              </div>
              <div className="text-[10px] text-amber-400 font-medium mt-1">Farmers, Artisans, Women</div>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#0A2540]/90 border border-slate-700/90 p-5 rounded-lg backdrop-blur-xs hover:border-amber-400 transition shadow-sm">
              <div className="text-[11px] font-semibold text-slate-300">Computerized PACS</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight font-mono">
                {liveSummary?.metrics.pacsComputerizationTarget || '79,630'}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium mt-1">On Common ERP Software</div>
            </div>

            {/* Metric 4 */}
            <div className="bg-[#0A2540]/90 border border-slate-700/90 p-5 rounded-lg backdrop-blur-xs hover:border-amber-400 transition shadow-sm">
              <div className="text-[11px] font-semibold text-slate-300">Cabinet PACS Outlay</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight font-mono">
                {liveSummary?.metrics.pacsOutlayBudget || '₹2,925.39 Cr'}
              </div>
              <div className="text-[10px] text-amber-400 font-medium mt-1">Approved Union Outlay</div>
            </div>

            {/* Metric 5 */}
            <div className="bg-[#0A2540]/90 border border-slate-700/90 p-5 rounded-lg backdrop-blur-xs hover:border-amber-400 transition shadow-sm col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-slate-300">PMFBY Claims Settled</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight font-mono">
                ₹2.06 L Cr
              </div>
              <div className="text-[10px] text-emerald-400 font-medium mt-1">Direct DBT Settlements</div>
            </div>
          </div>

          {/* Telemetry Bottom Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3 pt-4 border-t border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>Official Database Portal: <strong>cooperativedatabase.gov.in</strong></span>
            </div>
            <a
              href="https://cooperation.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-[#FF9933] font-bold hover:text-amber-300 hover:underline flex items-center gap-1.5"
            >
              <span>Download State-wise Census Report (PDF)</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. HISTORIC CABINET INITIATIVE: THREE NEW NATIONAL LEVEL MULTI-STATE COOPERATIVES */}
      <section className="py-12 px-4 sm:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-7">
            <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider block">
              HISTORIC CABINET INITIATIVE
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0A2540]">
              Three New National Level Multi-State Cooperative Societies
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              PACS empowerment through direct equity participation in global exports, organic branding, and certified high-yield seeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* BBSSL */}
            <div className="p-5 rounded-xl border-2 border-slate-200 bg-gradient-to-b from-emerald-50/40 via-white to-white hover:border-emerald-600 transition shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                  1. Certified Seeds
                </span>
                <Sprout className="w-5 h-5 text-emerald-700" />
              </div>
              <h5 className="text-sm font-bold text-[#0A2540]">
                Bharatiya Beej Sahakari Samiti (BBSSL)
              </h5>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Multiplication, preservation, and certified distribution of indigenous high-yield seeds directly produced by primary member farmers.
              </p>
            </div>

            {/* NCOL */}
            <div className="p-5 rounded-xl border-2 border-slate-200 bg-gradient-to-b from-amber-50/40 via-white to-white hover:border-amber-600 transition shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                  2. Organic Marketing
                </span>
                <Leaf className="w-5 h-5 text-amber-700" />
              </div>
              <h5 className="text-sm font-bold text-[#0A2540]">
                National Cooperative Organics Ltd (NCOL)
              </h5>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Standardized testing, packaging, and marketing for fair organic farmer price realizations marketed under the certified 'Bharat Organics' brand.
              </p>
            </div>

            {/* NCEL */}
            <div className="p-5 rounded-xl border-2 border-slate-200 bg-gradient-to-b from-blue-50/40 via-white to-white hover:border-blue-600 transition shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">
                  3. Global Export
                </span>
                <Globe2 className="w-5 h-5 text-blue-700" />
              </div>
              <h5 className="text-sm font-bold text-[#0A2540]">
                National Cooperative Exports Ltd (NCEL)
              </h5>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Direct global market access for agricultural cooperative surplus with export profits returned straight to grassroots primary societies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
