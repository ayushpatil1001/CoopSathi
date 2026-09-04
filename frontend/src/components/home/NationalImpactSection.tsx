import React, { useState, useEffect } from 'react';
import { Award, Users, Landmark, Clock, ShieldCheck, Star, Quote, RefreshCw } from 'lucide-react';
import { LanguageCode } from '../../types';
import { apiService, RealTimeGovSummary } from '../../services/apiService';

interface NationalImpactSectionProps {
  currentLang: LanguageCode;
  onSelectTab: (tab: string) => void;
}

export const NationalImpactSection: React.FC<NationalImpactSectionProps> = ({
  onSelectTab,
}) => {
  const [liveSummary, setLiveSummary] = useState<RealTimeGovSummary | null>(null);

  useEffect(() => {
    apiService.getRealTimeSummary().then((data) => {
      if (data) setLiveSummary(data);
    });
  }, []);

  const stats = [
    {
      value: liveSummary?.metrics.totalRegisteredCooperatives || '8.5 Lakh+',
      label: 'Registered Cooperatives',
      desc: 'Grassroots societies governed under MSCS & State Acts',
      icon: Landmark,
      color: 'from-blue-600 to-indigo-700',
    },
    {
      value: liveSummary?.metrics.cooperativeCitizensCovered || '30+ Crore',
      label: 'Rural Citizens & Farmers',
      desc: 'Direct stakeholders empowered with digital transparency',
      icon: Users,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      value: liveSummary?.metrics.pacsOutlayBudget || '₹2,925.39 Cr',
      label: 'National PACS Mission',
      desc: `${liveSummary?.metrics.pacsComputerizationTarget || '79,630 PACS'} Outlay with ${liveSummary?.metrics.pacsOnboardedToERP || '63,686'} ERP Onboarded`,
      icon: Award,
      color: 'from-amber-600 to-orange-700',
    },
    {
      value: '72 Hours',
      label: 'PMFBY Calamity SLA',
      desc: 'Statutory deadline for intimation on 14447 / App',
      icon: Clock,
      color: 'from-rose-600 to-red-700',
    },
  ];

  const stories = [
    {
      name: 'Rameshwar Patil',
      role: 'Active Shareholder Member',
      location: 'Kolhapur, Maharashtra',
      quote: 'CoopSathi AI guided me on Section 29 active membership requirements. Within 4 days, the District Registrar ordered my reinstatement on the society voter roll.',
      badge: 'MSCS Act 2023 Resolution',
      tag: 'Voting Rights Restored',
    },
    {
      name: 'Satish Kumar Yadav',
      role: 'Paddy Farmer (3.5 Acres)',
      location: 'Gorakhpur, Uttar Pradesh',
      quote: 'When flash floods inundated our paddy fields, CoopSathi guided me to notify crop loss within 48 hours. I received full compensation of ₹58,400 via direct DBT.',
      badge: 'PMFBY 72-Hour Claim',
      tag: '₹58,400 DBT Credited',
    },
    {
      name: 'Sunita Rajput',
      role: 'Women PACS Director',
      location: 'Hoshangabad, Madhya Pradesh',
      quote: 'We used the Model By-Laws guidance to open a Pradhan Mantri Jan Aushadhi generic pharmacy at our PACS. Villagers now get 80% cheaper medicines.',
      badge: 'Model By-Laws',
      tag: 'Healthcare Hub Setup',
    },
  ];

  return (
    <section className="relative -mt-8 z-30 max-w-7xl mx-auto px-4 sm:px-6">
      {/* 4 Impact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border-2 border-slate-200/90 shadow-gov hover:shadow-gov-lg transition-all transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  National Metric
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{stat.label}</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Citizen Impact / Grassroots Verified Testimonials */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-gov space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                Grassroots Impact
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#0A2540] mt-0.5">
              Empowering India's Cooperative Community
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('grievance')}
            className="text-xs font-bold text-gov-blue-800 hover:text-amber-600 transition"
          >
            File or Track Your Case →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-[#FBF9F5] rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full">
                    {story.badge}
                  </span>
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    {story.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed font-serif">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gov-blue-900 text-amber-300 font-bold flex items-center justify-center text-xs shrink-0">
                  👨‍🌾
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0A2540]">{story.name}</h4>
                  <p className="text-[10px] text-slate-500">{story.role} • {story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
