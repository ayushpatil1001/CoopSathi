import React, { useState, useEffect } from 'react';
import { 
  Warehouse, Sparkles, Building2, Pill, Tractor, ShieldCheck, 
  ArrowRight, FileCheck, CheckCircle2, ChevronRight, Award, Layers, RefreshCw
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { apiService, RealTimePacsData } from '../../services/apiService';

interface PacsServicesPageProps {
  currentLang: LanguageCode;
  onOpenChat: (prompt: string) => void;
  onSelectTab: (tab: string) => void;
}

export const PacsServicesPage: React.FC<PacsServicesPageProps> = ({
  onOpenChat,
  onSelectTab,
}) => {
  const [activeActivity, setActiveActivity] = useState<number>(0);
  const [livePacs, setLivePacs] = useState<RealTimePacsData | null>(null);

  useEffect(() => {
    apiService.getRealTimePacs().then(data => {
      if (data) setLivePacs(data);
    });
  }, []);

  const activities = [
    {
      title: 'Common Cloud ERP & Computerization',
      short: 'Zero manual ledger delays, direct bank linking',
      icon: Layers,
      color: 'from-blue-600 to-indigo-700',
      tag: '₹2,516 Cr Project',
      details: 'All functional PACS across India are being onboarded to a single unified ERP software connecting them directly to District Central Cooperative Banks (DCCBs), eliminating manipulation and enabling instant KCC disbursements.',
      benefits: ['Instant electronic passbooks', 'Direct benefit transfer (DBT) linkage', 'Audited transparency for member shares']
    },
    {
      title: 'Pradhan Mantri Jan Aushadhi Kendra (PMBJK)',
      short: 'Generic medicines at 50% to 90% discounts in the village',
      icon: Pill,
      color: 'from-emerald-600 to-teal-700',
      tag: 'Healthcare Hub',
      details: 'Over 2,000 PACS have been granted licenses to run full-fledged generic medicine pharmacies. Society receives up to ₹5 Lakh grant assistance plus a 20% trade margin on sales.',
      benefits: ['Low-cost affordable medicines for rural families', 'Direct recurring revenue for PACS society', 'Licensed local pharmacist employment']
    },
    {
      title: 'Custom Hiring Centre (Farm Machinery)',
      short: 'Modern tractors, drones & harvesters on nominal rental',
      icon: Tractor,
      color: 'from-amber-600 to-orange-700',
      tag: 'Agri Modernization',
      details: 'Small and marginal farmers who cannot afford expensive combine harvesters or spray drones can rent them directly from their village PACS at subsidized hourly rates.',
      benefits: ['Access to drone spraying for pest management', 'Reduced agricultural labor expenses', 'Nominal hourly rental charges']
    },
    {
      title: 'Digital Fertilizer & Nano Urea Distribution',
      short: 'Guaranteed MSP rates with Aadhaar POS authentication',
      icon: Award,
      color: 'from-purple-600 to-indigo-800',
      tag: 'Zero Black-Market',
      details: 'PACS act as official primary distributors of IFFCO / KRIBHCO fertilizers. Purchases are verified via biometric POS machines directly linked to the central fertilizer subsidy portal.',
      benefits: ['No artificially inflated black market pricing', 'Direct availability of Nano Urea and Nano DAP', 'Subsidized soil testing services']
    },
    {
      title: 'Common Service Centre (CSC) Digital Services',
      short: '300+ government e-services available at PACS doorstep',
      icon: Building2,
      color: 'from-sky-600 to-blue-700',
      tag: 'Citizen Services',
      details: 'PACS operators provide Aadhaar e-KYC, PAN card registration, 7/12 land record printing, utility bill payments, and railway ticketing without villagers needing to travel to taluka headquarters.',
      benefits: ['Saves travel time and middleman charges', 'One-stop village digital governance desk', 'Digital financial inclusion']
    }
  ];

  return (
    <div className="bg-[#FBF9F5] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-900 px-3 py-1 rounded-full text-xs font-bold border border-sky-300">
            <Warehouse className="w-3.5 h-3.5 text-sky-700" />
            <span>Primary Agricultural Credit Societies (PACS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            PACS Modernization & Multipurpose Services
          </h1>
          <p className="text-slate-600 text-xs sm:text-base">
            Under the Ministry of Cooperation's Model By-Laws, PACS have transformed into vibrant multipurpose rural centers providing 25+ citizen services.
          </p>
        </div>

        {/* Highlighted Banner with Live Metrics */}
        <div className="bg-gradient-to-r from-[#0A2540] via-[#134A7B] to-[#0A2540] rounded-3xl p-6 sm:p-8 text-white shadow-gov-lg mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                National Mission (Expanded)
              </span>
              <span className="text-[11px] text-emerald-300 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                🟢 Live Ministry Feed
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Computerization of {livePacs ? livePacs.targetSocieties.toLocaleString() : '79,630'} PACS Across India
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Approved Outlay: <b>{livePacs?.approvedOutlay || '₹2,925.39 Crore'}</b>. Equipping village societies with national cloud ERP, hardware ({livePacs ? livePacs.hardwareDeliveredSocieties.toLocaleString() : '65,020'} delivered), and direct DCCB linkages.
            </p>
            {/* Live Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                <div className="text-base font-black text-amber-300">{livePacs ? livePacs.onboardedSocieties.toLocaleString() : '63,686'}</div>
                <div className="text-[10px] text-slate-300">ERP Onboarded</div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                <div className="text-base font-black text-emerald-400">{livePacs ? livePacs.ePacsFunctional.toLocaleString() : '54,707'}</div>
                <div className="text-[10px] text-slate-300">e-PACS Active</div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                <div className="text-base font-black text-sky-300">{livePacs?.digitalTransactionsCount || '51.58 Cr'}</div>
                <div className="text-[10px] text-slate-300">Transactions</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onOpenChat('How does the PACS Computerization project help members and prevent corruption?')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm shrink-0 shadow-md transition"
          >
            Ask AI About PACS ERP
          </button>
        </div>

        {/* 5 Multipurpose Activities Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Activity List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Select Multipurpose Service Area:
            </span>
            {activities.map((act, index) => {
              const Icon = act.icon;
              const isSelected = activeActivity === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveActivity(index)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-gov-blue-800 shadow-gov scale-102'
                      : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0A2540]">
                        {act.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{act.short}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition ${isSelected ? 'text-gov-blue-900 translate-x-1' : 'text-slate-300'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed View */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-gov space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gov-blue-800 bg-gov-blue-50 px-2.5 py-0.5 rounded-full border border-gov-blue-200 uppercase">
                  {activities[activeActivity].tag}
                </span>
                <h3 className="text-xl font-black text-[#0A2540] mt-1.5">
                  {activities[activeActivity].title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activities[activeActivity].details}
            </p>

            {/* Key Benefits */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Direct Member & Farmer Advantages:
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {activities[activeActivity].benefits.map((b, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenChat(`Tell me more about ${activities[activeActivity].title} under Ministry Model By-Laws`)}
                className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
              >
                <span>Ask AI Specialist</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <button
                onClick={() => onSelectTab('schemes')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs border border-slate-300 transition"
              >
                View Related Schemes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
