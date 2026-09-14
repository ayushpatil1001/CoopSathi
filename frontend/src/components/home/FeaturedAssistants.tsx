import React from 'react';
import { Landmark, Compass, ShieldAlert, Warehouse, MessageSquareText, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AssistantType, LanguageCode } from '../../types';

interface FeaturedAssistantsProps {
  currentLang: LanguageCode;
  onLaunchAssistant: (type: AssistantType, defaultPrompt: string) => void;
}

export const FeaturedAssistants: React.FC<FeaturedAssistantsProps> = ({
  currentLang,
  onLaunchAssistant,
}) => {
  const services = [
    {
      id: 'laws' as AssistantType,
      title: 'Cooperative Society Laws & By-Laws',
      titleLocal: 'सहकारी कायदा व उपनियम मार्गदर्शन',
      authority: 'Central Registrar of Cooperative Societies (CRCS)',
      desc: 'Guidance on Multi-State Co-operative Societies (Amendment) Act 2023, Section 29 voting eligibility (3 consecutive AGMs), and Section 45 autonomous election authority.',
      icon: Landmark,
      features: [
        'Active member voting requirements (Sec. 29)',
        'Right to inspect audited accounts (Sec. 106)',
        'Model Bye-laws for multi-purpose activities',
        'Transparent board election directives (Sec. 45)'
      ],
      defaultPrompt: 'What are my rights and duties as an active member under Section 29 of the Multi-State Co-operative Societies Act 2023?',
      badge: 'Statutory Act',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
    },
    {
      id: 'pmfby' as AssistantType,
      title: 'PMFBY Crop Insurance & 72-Hr Loss Intimation',
      titleLocal: 'पीक विमा नुकसान भरपाई सहाय्य',
      authority: 'Ministry of Agriculture & Farmers Welfare, GoI',
      desc: 'Statutory guidance for claiming localized crop damages (hailstorm, inundation, cloudburst) within 72 hours via national helpline 14447 and Crop Insurance App.',
      icon: ShieldAlert,
      features: [
        'Mandatory 72-Hour Calamity Intimation Rule',
        'Subsidized premium: 2% Kharif, 1.5% Rabi, 5% Comm.',
        'YES-TECH & WINDS satellite damage verification',
        'National Helpline: 14447 & DGRC complaint routing'
      ],
      defaultPrompt: 'How do I submit crop loss intimation within 72 hours for flooded fields under PMFBY?',
      badge: 'Direct DBT Benefit',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 'pacs' as AssistantType,
      title: 'PACS Digital Modernization (79,630 ERP)',
      titleLocal: 'पॅक्स (PACS) आधुनिकीकरण व सेवा',
      authority: 'Ministry of Cooperation & NABARD',
      desc: 'Empowers functional PACS to diversify into 25+ business lines: Pradhan Mantri Jan Aushadhi Kendras, drone hiring, fertilizer quotas, and cloud ERP.',
      icon: Warehouse,
      features: [
        '79,630 PACS cloud ERP modernization mission',
        'Jan Aushadhi generic medicines (₹5 Lakh grant)',
        'Custom Hiring agricultural machinery & drones',
        'Aadhaar-enabled CSC delivery of 300+ e-services'
      ],
      defaultPrompt: 'What citizen and credit services are available through my local computerized PACS?',
      badge: '₹2,925.39 Cr Outlay',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'schemes' as AssistantType,
      title: 'Kisan Credit Card (KCC) 4% Interest Subvention',
      titleLocal: 'किसान क्रेडिट कार्ड (KCC) ४% व्याज सवलत',
      authority: 'Reserve Bank of India & NABARD',
      desc: 'Access short-term crop loans up to ₹3.00 Lakh at effective 4.0% interest rate under Modified Interest Subvention Scheme (MISS) with Prompt Repayment Incentive.',
      icon: Compass,
      features: [
        '4.0% effective interest rate (2% subvention + 3% PRI)',
        'Collateral-free credit limit: ₹1.60 Lakh to ₹2.00 Lakh',
        'Agriculture Infrastructure Fund (AIF) 3% subvention',
        'Credit linkage through District Central Co-op Banks'
      ],
      defaultPrompt: 'How do I get 4% net interest rate on Kisan Credit Card with prompt repayment?',
      badge: 'RBI / MISS Subvention',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
    },
    {
      id: 'grievance' as AssistantType,
      title: 'Cooperative Ombudsman (Dispute Redressal)',
      titleLocal: 'सहकार लोकपाल तक्रार निवारण कक्ष',
      authority: 'Central Registrar of Cooperative Societies (CRCS)',
      desc: 'Statutory dispute redressal for cooperative members regarding fixed deposit withholding, dividend delays, or refusal of shares under Sections 85A to 85C.',
      icon: MessageSquareText,
      features: [
        'Form VI: Official Complaint to Co-op Ombudsman',
        'Form VII: Statutory Appeal to Appellate Authority',
        'Statutory 30-day investigation and resolution SLA',
        'Real-time ticket tracking across District Registrars'
      ],
      defaultPrompt: 'How do I file a statutory complaint with the Co-operative Ombudsman for deposit withholding?',
      badge: '30-Day SLA',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
    },
    {
      id: 'laws' as AssistantType,
      title: 'NCCT Cooperative Training & Certifications',
      titleLocal: 'राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT)',
      authority: 'National Council for Cooperative Training',
      desc: 'Professional capacity building, management diplomas, and training programs across 5 Regional Institutes (RICM) and 14 Institutes of Cooperative Management (ICM).',
      icon: GraduationCap,
      features: [
        'Higher Diploma in Cooperative Management (HDCM)',
        'PACS Secretary digital ERP skill certification',
        'Women dairy cooperative governance programs',
        'National Placement and Apprenticeship network'
      ],
      defaultPrompt: 'What cooperative management training courses and diploma programs does NCCT offer?',
      badge: 'Apex Institution',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
    },
  ];

  return (
    <section id="services" className="py-12 px-4 sm:px-8 bg-[#F1F5F9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#138808]" />
              <span>DIRECT CITIZEN ACCESS • नागरिक सेवा निर्देशिका</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight">
              Priority Cooperative Services & Citizen Portals Directory
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Statutory portals, regulatory filings, crop insurance, and computerized PACS operations.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <span className="text-xs font-medium text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded shadow-2xs">
              All services compliant with GIGW 3.0 Standards
            </span>
          </div>
        </div>

        {/* 6-Card Official Government Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, index) => {
            const Icon = svc.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-slate-300 hover:border-[#0A2540] shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header with Authority & Badge */}
                  <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[#0A2540] text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded border ${svc.badgeColor}`}>
                      {svc.badge}
                    </span>
                  </div>

                  {/* Title & Authority */}
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    {svc.authority}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                    {svc.title}
                  </h4>
                  <p className="text-[11px] text-[#138808] font-semibold mt-0.5 font-devanagari">
                    {svc.titleLocal}
                  </p>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {svc.desc}
                  </p>

                  {/* Bulleted Provisions */}
                  <ul className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-700">
                    {svc.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#138808] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onLaunchAssistant(svc.id, svc.defaultPrompt)}
                    className="w-full bg-[#0A2540] hover:bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Access Helpdesk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
