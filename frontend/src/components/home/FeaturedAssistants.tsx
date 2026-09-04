import React from 'react';
import { Landmark, Compass, ShieldAlert, Warehouse, MessageSquareText, Sparkles, ArrowRight } from 'lucide-react';
import { AssistantType, LanguageCode } from '../../types';

interface FeaturedAssistantsProps {
  currentLang: LanguageCode;
  onLaunchAssistant: (type: AssistantType, defaultPrompt: string) => void;
}

export const FeaturedAssistants: React.FC<FeaturedAssistantsProps> = ({
  currentLang,
  onLaunchAssistant,
}) => {
  const assistants = [
    {
      id: 'laws' as AssistantType,
      title: 'Cooperative Law Assistant',
      titleLocal: 'सहकारी कायदा व उपनियम मार्गदर्शक',
      desc: 'Decodes MSCS Act 2023, state cooperative statutes, and voting mandates into everyday vernacular.',
      icon: Landmark,
      features: [
        'Simplifies legal documents & gazettes',
        'Explains model by-laws & voting rules',
        'Member rights and duty checklist',
        'Summaries of dispute resolution'
      ],
      defaultPrompt: 'What are my rights and duties as an active member under the Multi-State Co-operative Societies Act 2023?',
      badge: 'Legal Tech'
    },
    {
      id: 'schemes' as AssistantType,
      title: 'Scheme Navigator',
      titleLocal: 'शासकीय योजना शोधक',
      desc: 'Matches your landholding, crop pattern, and cooperative membership to high-subsidy welfare schemes.',
      icon: Compass,
      features: [
        'Central & State scheme discovery',
        'Personalized eligibility guidance',
        'Subsidy calculation & benefits',
        'Step-by-step application walkthrough'
      ],
      defaultPrompt: 'Which government schemes am I eligible for as a small farmer cultivating 2 acres?',
      badge: 'Direct Benefit'
    },
    {
      id: 'pmfby' as AssistantType,
      title: 'PMFBY Insurance Assistant',
      titleLocal: 'पीक विमा नुकसान भरपाई सहाय्यक',
      desc: 'Ensures zero delay in crop damage compensation with actuarial premium math and 72-hour filing guidance.',
      icon: ShieldAlert,
      features: [
        'Dynamic crop insurance eligibility',
        'Subsidized premium calculation',
        'Localized calamity claim process',
        'Claim status guidance & escalation'
      ],
      defaultPrompt: 'How do I submit crop loss intimation within 72 hours for flooded fields?',
      badge: '72h Deadline'
    },
    {
      id: 'pacs' as AssistantType,
      title: 'PACS Assistant',
      titleLocal: 'पॅक्स (PACS) सेवा सहाय्यक',
      desc: 'Unlocks 25+ computerized rural services: credit, fertilizer quota, Jan Aushadhi medicines, and custom hiring.',
      icon: Warehouse,
      features: [
        '4% interest KCC credit services',
        'Real-time fertilizer availability',
        'Village storage & cold chain access',
        'Jan Aushadhi & CSC citizen services'
      ],
      defaultPrompt: 'What citizen and credit services are available through my local computerized PACS?',
      badge: 'Grassroots'
    },
    {
      id: 'grievance' as AssistantType,
      title: 'Grievance Redressal Assistant',
      titleLocal: 'तक्रार निवारण व लोकपाल सहाय्यक',
      desc: 'Converts informal or voice complaints into structured representations addressed to the competent Registrar.',
      icon: MessageSquareText,
      features: [
        'Guided complaint drafting & AI polish',
        'Competent authority routing',
        'Tracking number generation',
        'Cooperative Ombudsman escalation'
      ],
      defaultPrompt: 'I want to file a complaint against my cooperative society for withholding my deposit refund.',
      badge: 'Ombudsman'
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Specialized Domain Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            Featured Specialized AI Assistants
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Trained on authentic Ministry circulars, model by-laws, and court precedents to provide instant answers.
          </p>
        </div>

        {/* 5 Assistant Cards in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistants.map((ast) => {
            const Icon = ast.icon;
            return (
              <div
                key={ast.id}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-gov-blue-600 shadow-gov hover:shadow-gov-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gov-blue-50 border border-gov-blue-200 text-gov-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {ast.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-gov-blue-700 transition">
                    {ast.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mb-2">
                    {ast.titleLocal}
                  </p>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {ast.desc}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {ast.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Start Conversation Button */}
                <button
                  onClick={() => onLaunchAssistant(ast.id, ast.defaultPrompt)}
                  className="w-full bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition group-hover:shadow-md"
                >
                  <span>Start Conversation</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
