import React from 'react';
import { X, AlertTriangle, Phone, Smartphone, Clock, FileCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ClaimGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropName: string;
  stateName: string;
}

export const ClaimGuideModal: React.FC<ClaimGuideModalProps> = ({
  isOpen,
  onClose,
  cropName,
  stateName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                PMFBY 72-Hour Crop Loss Claim Guide
              </h2>
              <p className="text-xs text-amber-100">
                Localized Calamities (Hailstorm, Flooding, Cloudburst) & Post-Harvest Damage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800 text-xs sm:text-sm">
          {/* Critical Timer Alert */}
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-start space-x-3 text-red-950">
            <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-extrabold text-xs uppercase tracking-wide text-red-700 block">
                Rule 21.3 Statutory Deadline: 72 Hours
              </span>
              <p className="text-xs mt-1">
                For crop loss due to hailstorms, landslides, cloudburst, or inundation in {stateName}, you <strong>MUST</strong> intimate within <strong>72 hours</strong> from occurrence of damage. Claims notified after 72 hours are subject to survey disqualification.
              </p>
            </div>
          </div>

          {/* 4 Steps to Claim */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">
              Step-by-Step Claim Intimation:
            </h3>

            {/* Step 1 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-gov-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Intimate Loss via Crop Insurance App (Recommended)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Open the official <strong>Crop Insurance App</strong> on your smartphone. Click <i>"Crop Loss Intimation"</i>, enter your policy number or Aadhaar, take 2 geotagged photos of your damaged {cropName || 'crop'} field, and submit. An instant <strong>Loss Docket Number</strong> is generated.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-gov-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Dial National Toll-Free Helpline: 14447</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you do not possess a smartphone, immediately dial <strong>14447</strong> from your registered mobile. The operator will record your village, Khasra/7-12 number, and estimated damage percentage in Marathi, Hindi, or your regional language.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-gov-blue-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Joint Field Survey within 10 Days</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A joint inspection committee consisting of the Insurance Loss Assessor, District Agriculture Officer, and Village Patwari will visit your field. Do not plough the damaged field until the joint survey form is signed!
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                4
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">DBT Compensation Payout</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The insurance company must disburse compensation directly to your Aadhaar-linked bank account within 15 days of survey completion.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Helplines Box */}
          <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block text-xs">Need emergency claim filing assistance?</span>
              <span className="text-[11px] text-slate-500">Contact your nearest PACS Secretary or Agriculture Supervisor.</span>
            </div>
            <a
              href="tel:14447"
              className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call 14447</span>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gov-blue-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gov-blue-800 transition"
          >
            I Understand the 72-Hour Rule
          </button>
        </div>
      </div>
    </div>
  );
};
