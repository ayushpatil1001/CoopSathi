import React from 'react';
import { X, ExternalLink, CheckCircle2, FileText, Building2, Calendar, Users, Sparkles } from 'lucide-react';
import { Scheme } from '../../types';

interface SchemeDetailsModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onAskAI: (query: string) => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  onClose,
  onCheckEligibility,
  onAskAI,
}) => {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white p-6 flex items-start justify-between border-b border-gov-blue-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                {scheme.category.toUpperCase()}
              </span>
              {scheme.badge && (
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-700">
                  {scheme.badge}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
              {scheme.title}
            </h2>
            {scheme.titleHi && (
              <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                {scheme.titleHi}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition shrink-0 ml-4"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800 text-xs sm:text-sm">
          {/* Ministry & Target Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-gov-blue-700" />
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Nodal Ministry</span>
                <span className="font-bold text-slate-800">{scheme.ministry}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Beneficiaries</span>
                <span className="font-bold text-slate-800">{scheme.targetBeneficiaries}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-[#0A2540] uppercase text-xs tracking-wider">
              Scheme Overview
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {scheme.fullDesc}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-2">
            <h3 className="font-bold text-emerald-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Benefits & Entitlements</span>
            </h3>
            <div className="space-y-1.5">
              {scheme.benefits.map((b, i) => (
                <div key={i} className="flex items-start space-x-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 text-xs text-emerald-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#0A2540] uppercase text-xs tracking-wider">
              Who is Eligible?
            </h3>
            <div className="space-y-1.5">
              {scheme.eligibility.map((e, i) => (
                <div key={i} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="text-gov-blue-800 font-bold">✓</span>
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#0A2540] uppercase text-xs tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gov-blue-800" />
              <span>Step-by-Step Application Process</span>
            </h3>
            <div className="space-y-2">
              {scheme.applicationProcess.map((proc, i) => (
                <div key={i} className="flex items-start space-x-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-gov-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 pt-0.5">{proc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onCheckEligibility(scheme)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Check My Eligibility</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onAskAI(`Tell me how to register and apply for ${scheme.title}`);
              }}
              className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
            >
              Ask CoopSathi AI
            </button>
            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 px-3.5 rounded-xl text-xs border border-slate-300 flex items-center space-x-1 transition"
            >
              <span>Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
