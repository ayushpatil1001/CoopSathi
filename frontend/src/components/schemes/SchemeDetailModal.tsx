import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, ExternalLink, Phone, ShieldCheck, CheckCircle2, 
  FileText, ArrowRight, Bot, Building2, Calendar, 
  MapPin, Check 
} from 'lucide-react';
import { SchemeItem } from '../../data/schemesCatalog';

interface SchemeDetailModalProps {
  scheme: SchemeItem | null;
  onClose: () => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({ scheme, onClose }) => {
  const navigate = useNavigate();

  if (!scheme) return null;

  const handleAskAI = () => {
    onClose();
    const prompt = `How to apply for ${scheme.title}? What are the required documents and eligibility criteria?`;
    navigate(`/chat?q=${encodeURIComponent(prompt)}`);
  };

  const steps = [
    { num: 1, title: 'Check Eligibility & Prepare Required Documents', text: scheme.applicationProcess.step1 },
    ...(scheme.applicationProcess.step2
      ? [{ num: 2, title: 'Access Official Application Channel / Portal', text: scheme.applicationProcess.step2 }]
      : []),
    ...(scheme.applicationProcess.step3
      ? [{ num: 3, title: 'Complete Registration & Form Details', text: scheme.applicationProcess.step3 }]
      : []),
    ...(scheme.applicationProcess.step4
      ? [{ num: 4, title: 'Document Verification & Submission', text: scheme.applicationProcess.step4 }]
      : []),
    ...(scheme.applicationProcess.step5
      ? [{ num: 5, title: 'Tracking, Acknowledgment & DBT Disbursal', text: scheme.applicationProcess.step5 }]
      : []),
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white text-ink-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[94vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-ink-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-ink-100 bg-ink-50/50 flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 flex-shrink-0"></span>
                <span>{scheme.sector}</span>
              </span>

              <span className="text-[10px] font-medium text-ink-600 bg-white px-2 py-0.5 rounded border border-ink-200">
                {scheme.state ? `${scheme.state} State Scheme` : 'Central Sector Program'}
              </span>

              <span className="text-[10px] font-mono text-ink-400 bg-white px-2 py-0.5 rounded border border-ink-200">
                Launched {scheme.launchYear}
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-ink-900 leading-snug">
              {scheme.title}
            </h2>

            <p className="text-xs text-ink-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-ink-400 flex-shrink-0" />
              <span>{scheme.ministry}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-ink-400 hover:text-ink-700 p-1.5 rounded hover:bg-ink-100 transition shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-xs sm:text-sm touch-scroll">
          {/* Key Benefit Highlight Box with Green Left Border and Soft Emerald Tint */}
          <div className="bg-emerald-50/70 border-l-4 border-emerald-700 p-3.5 sm:p-4 rounded-r">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block mb-0.5">
              Primary Financial &amp; Welfare Entitlement
            </span>
            <p className="text-sm sm:text-base font-bold text-emerald-950 leading-snug">
              {scheme.benefitSummary}
            </p>
          </div>

          {/* 1. Scheme Objective */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Scheme Objective &amp; Scope</span>
            </h3>
            <p className="text-ink-600 leading-relaxed bg-ink-50/50 p-3 rounded border border-ink-100 text-xs">
              {scheme.objective}
            </p>
          </div>

          {/* 2. Key Benefits */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Key Benefits &amp; Provisions</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white border border-ink-200 rounded p-2.5 flex items-start gap-2 text-xs text-ink-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Eligibility Criteria */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Eligibility &amp; Qualification Checklist</span>
            </h3>
            <div className="bg-ink-50/50 border border-ink-200 rounded-lg p-3.5 space-y-2">
              <ul className="space-y-1.5 text-xs text-ink-700">
                {scheme.eligibilityCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <span className="leading-relaxed">{crit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-ink-200 text-[11px] text-ink-500">
                Target Beneficiary Groups: <strong className="text-ink-800 font-semibold">{scheme.targetBeneficiaries.join(', ')}</strong>
              </div>
            </div>
          </div>

          {/* 4. Sequential Step-by-Step Guide */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800 mb-2 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
              <span>Step-by-Step Application Guide</span>
            </h3>
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.num} className="bg-white border border-ink-200 rounded-lg p-3 flex items-start gap-3 hover:border-emerald-300 transition">
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-ink-900">{step.title}</h4>
                    <p className="text-xs text-ink-600 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Required Documents Checklist */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-800 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mandatory Documents Checklist</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {scheme.requiredDocuments.map((doc, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 bg-emerald-50/50 text-emerald-900 text-xs px-2.5 py-1 rounded border border-emerald-200/70">
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span>{doc}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 border-t border-ink-100 bg-ink-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Helpline */}
          <div className="flex items-center gap-2 text-xs text-ink-600 w-full sm:w-auto">
            <Phone className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-ink-400 block uppercase font-bold">Helpline</span>
              <a href={`tel:${scheme.helpline.split('/')[0].trim()}`} className="font-mono font-bold text-ink-900 hover:text-emerald-800">
                {scheme.helpline}
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleAskAI}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded border border-ink-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-ink-800 text-xs font-semibold transition"
              title="Ask CoopSathi AI about this scheme"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ask CoopSathi AI</span>
            </button>

            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
