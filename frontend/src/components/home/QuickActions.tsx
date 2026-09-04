import React from 'react';
import { 
  Landmark, FileText, ShieldCheck, Warehouse, IndianRupee, 
  MessageSquareText, ArrowRight, Sparkles, ChevronRight
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { getTranslation } from '../../data/translations';

interface QuickActionsProps {
  currentLang: LanguageCode;
  onSelectTab: (tab: string) => void;
  onLaunchQuery: (query: string, lang: LanguageCode) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  currentLang,
  onSelectTab,
  onLaunchQuery,
}) => {
  const cards = [
    {
      id: 'laws',
      title: getTranslation(currentLang, 'actionLawsTitle'),
      desc: getTranslation(currentLang, 'actionLawsDesc'),
      icon: Landmark,
      color: 'from-blue-600 via-indigo-600 to-gov-blue-900',
      badge: 'MSCS Act 2023',
      tag: 'Statutory By-Laws',
      action: () => onLaunchQuery('What are my rights as a cooperative member?', currentLang),
    },
    {
      id: 'schemes',
      title: getTranslation(currentLang, 'actionSchemesTitle'),
      desc: getTranslation(currentLang, 'actionSchemesDesc'),
      icon: FileText,
      color: 'from-emerald-600 via-teal-600 to-green-800',
      badge: 'Direct Subsidies',
      tag: 'Central & State',
      action: () => onSelectTab('schemes'),
    },
    {
      id: 'pmfby',
      title: getTranslation(currentLang, 'actionPmfbyTitle'),
      desc: getTranslation(currentLang, 'actionPmfbyDesc'),
      icon: ShieldCheck,
      color: 'from-amber-500 via-orange-600 to-red-700',
      badge: '72-Hour SLA',
      tag: '1.5% - 2% Premium',
      action: () => onSelectTab('pmfby'),
    },
    {
      id: 'pacs',
      title: getTranslation(currentLang, 'actionPacsTitle'),
      desc: getTranslation(currentLang, 'actionPacsDesc'),
      icon: Warehouse,
      color: 'from-sky-600 via-blue-700 to-indigo-900',
      badge: 'Model By-Laws',
      tag: '25+ Services',
      action: () => onSelectTab('pacs'),
    },
    {
      id: 'financial',
      title: getTranslation(currentLang, 'actionFinancialTitle'),
      desc: getTranslation(currentLang, 'actionFinancialDesc'),
      icon: IndianRupee,
      color: 'from-teal-600 via-emerald-600 to-green-900',
      badge: 'Interest Subvention',
      tag: '4% KCC Credit',
      action: () => onLaunchQuery('How do I get a Kisan Credit Card (KCC) with 4% interest rate?', currentLang),
    },
    {
      id: 'grievance',
      title: getTranslation(currentLang, 'actionGrievanceTitle'),
      desc: getTranslation(currentLang, 'actionGrievanceDesc'),
      icon: MessageSquareText,
      color: 'from-rose-600 via-red-600 to-amber-700',
      badge: 'Ombudsman Portal',
      tag: 'Track Status',
      action: () => onSelectTab('grievance'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FBF9F5] to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-gov-blue-50 text-gov-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-gov-blue-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Core Digital Public Goods</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            {getTranslation(currentLang, 'quickActionsTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {getTranslation(currentLang, 'quickActionsSub')}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={card.action}
                className="group relative bg-white rounded-3xl p-7 border-2 border-slate-200/90 hover:border-gov-blue-600 shadow-gov hover:shadow-[0_20px_40px_-10px_rgba(10,37,64,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Top row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 group-hover:bg-amber-100 group-hover:text-amber-950 px-2.5 py-0.5 rounded-full transition border border-slate-200">
                        {card.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-gov-blue-700 transition mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Navigation Link */}
                <div className="pt-6 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-black text-gov-blue-900 group-hover:text-amber-600 transition">
                  <span>Open Dedicated Assistant</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                    <ArrowRight className="w-4 h-4 text-gov-blue-900 group-hover:text-amber-700" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
