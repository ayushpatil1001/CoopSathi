import React from 'react';
import { X, ShieldCheck, ExternalLink, BookOpen, Calendar, Building2 } from 'lucide-react';
import { VerifiedSource } from '../../types';

interface SourceDrawerProps {
  source: VerifiedSource | null;
  onClose: () => void;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideLeft">
        {/* Drawer Header */}
        <div className="p-6 bg-[#0A2540] text-white flex items-center justify-between border-b border-gov-blue-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Verified Statutory Source
              </h3>
              <p className="text-[11px] text-amber-300">
                Official Government Knowledge Base
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Source Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gov-blue-700 bg-gov-blue-50 px-2.5 py-1 rounded-full border border-gov-blue-200">
              {source.id}
            </span>
            <h2 className="text-lg font-black text-[#0A2540] mt-2 leading-snug">
              {source.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-600">
              <Building2 className="w-4 h-4 text-gov-blue-600" />
              <div>
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Issuing Authority</span>
                <span className="font-bold text-slate-800">{source.authority}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-600">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Verified Date</span>
                <span className="font-bold text-slate-800">{source.verifiedDate}</span>
              </div>
            </div>
          </div>

          {/* Statutory Document & Section */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wide">
              Statutory Instrument & Section
            </span>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-950 font-semibold flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{source.actOrScheme} – {source.sectionOrDoc}</span>
            </div>
          </div>

          {/* Verbatim Excerpt */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wide">
              Official Legal Excerpt (Gazette / Circular)
            </span>
            <blockquote className="p-4 bg-slate-100/80 border-l-4 border-gov-blue-800 rounded-r-xl text-slate-700 italic text-xs leading-relaxed font-serif">
              "{source.excerpt}"
            </blockquote>
          </div>

          {/* Assurance Note */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 leading-relaxed space-y-1">
            <span className="font-bold flex items-center gap-1 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Audit Integrity Guarantee
            </span>
            <p>
              This text was retrieved directly from the vector index of authentic Ministry of Cooperation gazettes. No unverified third-party content was introduced.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
            >
              <span>Open Official Gazette / Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-500">Official Internal Circular</span>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
