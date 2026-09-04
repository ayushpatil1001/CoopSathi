import React from 'react';
import { ShieldCheck, Lock, Users, Globe2, AlertCircle, Award } from 'lucide-react';
import { LanguageCode } from '../../types';

interface TrustSafetyProps {
  currentLang: LanguageCode;
}

export const TrustSafety: React.FC<TrustSafetyProps> = () => {
  const points = [
    {
      title: 'Answers Based on Verified Government Sources',
      desc: 'Direct citations to the Multi-State Co-operative Societies Act 2023, PMFBY Operational Guidelines, and official gazettes.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Minimizes Hallucinations with Grounded RAG',
      desc: 'The AI refuses to generate speculative legal advice; every answer includes an expandable source excerpt with date and authority.',
      icon: Award,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      title: 'Secure & Privacy-Conscious',
      desc: 'Compliant with Indian Digital Personal Data Protection (DPDP) Act. Biometric or land data is never stored without consent.',
      icon: Lock,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      title: 'Seamless Human Escalation',
      desc: 'Complex legal disputes or contested claim denials can be one-click escalated to District Registrars or Cooperative Ombudsmen.',
      icon: Users,
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      title: 'Inclusive Regional Language Delivery',
      desc: 'All guidance is phrased in clear regional vernacular rather than inaccessible English administrative legalese.',
      icon: Globe2,
      color: 'text-teal-600 bg-teal-50 border-teal-200'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Government Integrity & Safeguards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            Reliable Information. Built for Trust.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered specifically for rural and cooperative stakeholders who demand absolute accuracy and official legitimacy.
          </p>
        </div>

        {/* 5 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-[#FBF9F5] rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start space-x-4"
              >
                <div className={`p-3 rounded-xl border shrink-0 ${pt.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0A2540] mb-1">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Statutory Disclaimer Card */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed space-y-1">
            <span className="font-extrabold uppercase tracking-wide text-amber-900 block text-xs">
              Statutory Platform Notice & Disclaimer
            </span>
            <p>
              CoopSathi AI provides informational guidance based on gazette notifications, model by-laws, and published government operational manuals. For official legal decisions or complex disputes, users may be directed to authorized government officials or legal experts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
