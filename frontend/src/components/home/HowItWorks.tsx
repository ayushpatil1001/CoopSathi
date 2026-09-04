import React from 'react';
import { Mic, BrainCircuit, Database, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Layers, Cpu } from 'lucide-react';
import { LanguageCode } from '../../types';
import { getTranslation } from '../../data/translations';

interface HowItWorksProps {
  currentLang: LanguageCode;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang }) => {
  const steps = [
    {
      num: '01',
      title: getTranslation(currentLang, 'step1Title'),
      desc: getTranslation(currentLang, 'step1Desc'),
      icon: Mic,
      tag: 'Voice & Vernacular',
      gradient: 'from-blue-600 to-indigo-600',
      bgLight: 'bg-blue-50/70 border-blue-200',
    },
    {
      num: '02',
      title: getTranslation(currentLang, 'step2Title'),
      desc: getTranslation(currentLang, 'step2Desc'),
      icon: BrainCircuit,
      tag: 'Indian NLU & Dialect',
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50/70 border-amber-200',
    },
    {
      num: '03',
      title: getTranslation(currentLang, 'step3Title'),
      desc: getTranslation(currentLang, 'step3Desc'),
      icon: Database,
      tag: 'Vector RAG Search',
      gradient: 'from-emerald-600 to-teal-600',
      bgLight: 'bg-emerald-50/70 border-emerald-200',
    },
    {
      num: '04',
      title: getTranslation(currentLang, 'step4Title'),
      desc: getTranslation(currentLang, 'step4Desc'),
      icon: CheckCircle2,
      tag: 'Actionable Advice',
      gradient: 'from-gov-blue-900 to-slate-900',
      bgLight: 'bg-slate-100 border-slate-300',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-amber-100/30 via-emerald-100/20 to-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-gov-blue-50 text-gov-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-gov-blue-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Verifiable & Transparent Public AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            {getTranslation(currentLang, 'howItWorksTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {getTranslation(currentLang, 'howItWorksSub')}
          </p>
        </div>

        {/* 4 Steps Flow with Elevated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white rounded-3xl p-7 border-2 border-slate-200/90 shadow-gov hover:shadow-gov-lg transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-amber-500 transition">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-black tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon with gradient */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.gradient} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Text */}
                  <h3 className="text-base font-bold text-[#0A2540] mb-2 group-hover:text-gov-blue-700 transition">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Progress bar line */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>Phase {step.num}/04</span>
                  {idx < 3 && <ArrowRight className="w-4 h-4 text-amber-500 hidden lg:block group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Architecture Diagram as requested */}
        <div className="relative bg-gradient-to-br from-[#06182B] via-[#0A2540] to-[#0D3459] rounded-3xl p-6 sm:p-10 text-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/20">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Fullstack System Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Transparent RAG Ingestion & Resolution Pipeline
            </h3>
            <p className="text-xs text-slate-300">
              End-to-end trace from farmer's audio inquiry to verified legal resolution.
            </p>
          </div>

          {/* Connected Flowchart Nodes with Visual Pulse */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {/* Node 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center flex flex-col justify-between space-y-2 hover:bg-white/15 transition">
              <div className="text-2xl mb-1">👨‍🌾</div>
              <div>
                <div className="font-black text-white text-xs">1. Rural Citizen</div>
                <div className="text-[10px] text-amber-300 font-semibold mt-0.5">Farmer / Member</div>
              </div>
              <span className="text-[9px] text-slate-300 bg-black/30 py-0.5 px-1.5 rounded">Voice or Text</span>
            </div>

            {/* Node 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center flex flex-col justify-between space-y-2 hover:bg-white/15 transition">
              <div className="text-2xl mb-1">📱</div>
              <div>
                <div className="font-black text-white text-xs">2. Access Channel</div>
                <div className="text-[10px] text-emerald-300 font-semibold mt-0.5">Web / WhatsApp / Bot</div>
              </div>
              <span className="text-[9px] text-slate-300 bg-black/30 py-0.5 px-1.5 rounded">Zero Barrier</span>
            </div>

            {/* Node 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center flex flex-col justify-between space-y-2 hover:bg-white/15 transition">
              <div className="text-2xl mb-1">🎙️</div>
              <div>
                <div className="font-black text-white text-xs">3. Regional NLU</div>
                <div className="text-[10px] text-sky-300 font-semibold mt-0.5">Voice Speech-to-Text</div>
              </div>
              <span className="text-[9px] text-slate-300 bg-black/30 py-0.5 px-1.5 rounded">6+ Languages</span>
            </div>

            {/* Node 4 */}
            <div className="bg-gradient-to-b from-amber-500/20 to-orange-500/20 border-2 border-amber-400 rounded-2xl p-4 text-center flex flex-col justify-between space-y-2 shadow-lg ring-2 ring-amber-400/30">
              <div className="text-2xl mb-1 animate-spin" style={{ animationDuration: '6s' }}>⚡</div>
              <div>
                <div className="font-black text-amber-300 text-xs">4. AI + RAG Engine</div>
                <div className="text-[10px] text-white font-semibold mt-0.5">Semantic Embeddings</div>
              </div>
              <span className="text-[9px] text-amber-950 font-black bg-amber-400 py-0.5 px-1.5 rounded">1536 Dimensions</span>
            </div>

            {/* Node 5 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center flex flex-col justify-between space-y-2 hover:bg-white/15 transition">
              <div className="text-2xl mb-1">📜</div>
              <div>
                <div className="font-black text-white text-xs">5. Verified Gazettes</div>
                <div className="text-[10px] text-purple-300 font-semibold mt-0.5">MSCS 2023 & PMFBY</div>
              </div>
              <span className="text-[9px] text-slate-300 bg-black/30 py-0.5 px-1.5 rounded">Ministry Grounded</span>
            </div>

            {/* Node 6 */}
            <div className="bg-gradient-to-b from-emerald-600/30 to-emerald-900/40 border-2 border-emerald-400 rounded-2xl p-4 text-center flex flex-col justify-between space-y-2 shadow-lg">
              <div className="text-2xl mb-1">✅</div>
              <div>
                <div className="font-black text-emerald-300 text-xs">6. Action & Relief</div>
                <div className="text-[10px] text-white font-semibold mt-0.5">Advice or Escalation</div>
              </div>
              <span className="text-[9px] text-emerald-950 font-black bg-emerald-400 py-0.5 px-1.5 rounded">Immediate Resolution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
