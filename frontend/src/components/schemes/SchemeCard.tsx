import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SchemeItem } from '../../data/schemesCatalog';

interface SchemeCardProps {
  scheme: SchemeItem;
  onSelect: (scheme: SchemeItem) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(scheme)}
      className="group bg-white rounded-lg border border-ink-200 hover:border-emerald-600/70 p-5 flex flex-col justify-between transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-xs cursor-pointer"
    >
      <div>
        {/* Top Micro-Metadata Bar with Subtle Green Sector Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200/80 truncate max-w-[190px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 flex-shrink-0"></span>
            <span className="truncate">{scheme.sector}</span>
          </span>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-ink-500">
            <span>{scheme.state ? scheme.state : 'Central'}</span>
            <span className="text-ink-300">•</span>
            <span>{scheme.launchYear}</span>
          </div>
        </div>

        {/* Scheme Title with Green Hover Transition */}
        <h3 className="text-sm sm:text-[15px] font-bold text-ink-900 group-hover:text-emerald-800 transition-colors leading-snug mb-1">
          {scheme.title}
        </h3>

        {/* Ministry / Administering Agency */}
        <p className="text-[11px] text-ink-500 line-clamp-1 mb-3">
          {scheme.ministry}
        </p>

        {/* Key Benefit Callout Box with Forest Green Left Border and Soft Tint */}
        <div className="bg-emerald-50/60 border-l-2 border-emerald-700 p-2.5 rounded-r mb-3">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span>Key Benefit</span>
          </div>
          <p className="text-xs font-bold text-emerald-950 leading-snug">
            {scheme.benefitSummary}
          </p>
        </div>

        {/* Objective Snippet */}
        <p className="text-xs text-ink-600 line-clamp-2 leading-relaxed mb-3">
          {scheme.objective}
        </p>
      </div>

      {/* Card Footer with Green CTA Link */}
      <div className="pt-3 border-t border-ink-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2 text-[11px] text-ink-500 truncate max-w-[65%]">
          <span className="truncate">{scheme.targetBeneficiaries.slice(0, 2).join(', ')}</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(scheme);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition duration-150"
        >
          <span>View &amp; Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
