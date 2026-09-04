import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { Scheme } from '../../types';

interface EligibilityQuizModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  onOpenChat: (query: string) => void;
}

export const EligibilityQuizModal: React.FC<EligibilityQuizModalProps> = ({
  scheme,
  onClose,
  onOpenChat,
}) => {
  const [hasLand, setHasLand] = useState<'yes' | 'no' | null>('yes');
  const [hasAadhaarDbt, setHasAadhaarDbt] = useState<'yes' | 'no' | null>('yes');
  const [isCoopMember, setIsCoopMember] = useState<'yes' | 'no' | null>('yes');
  const [farmerType, setFarmerType] = useState<'small' | 'large' | 'tenant'>('small');
  const [submitted, setSubmitted] = useState(false);

  if (!scheme) return null;

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isEligible = hasAadhaarDbt === 'yes';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white p-6 flex items-center justify-between border-b border-gov-blue-800">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
              Eligibility Verification Engine
            </span>
            <h2 className="text-base sm:text-lg font-black text-white mt-1">
              Check Your Eligibility for {scheme.title.split('(')[0]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-slate-800 text-xs sm:text-sm">
          {!submitted ? (
            <form onSubmit={handleEvaluate} className="space-y-4">
              {/* Question 1: Landholding */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">
                  1. Do you cultivate agricultural land (owned or tenant)?
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setHasLand('yes')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                      hasLand === 'yes' ? 'bg-gov-blue-900 text-white border-gov-blue-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Yes (होय / हाँ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasLand('no')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                      hasLand === 'no' ? 'bg-gov-blue-900 text-white border-gov-blue-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    No (नाही / नहीं)
                  </button>
                </div>
              </div>

              {/* Question 2: Aadhaar DBT */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">
                  2. Is your Aadhaar linked with your active bank account for DBT?
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setHasAadhaarDbt('yes')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                      hasAadhaarDbt === 'yes' ? 'bg-gov-blue-900 text-white border-gov-blue-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Yes (e-KYC Done)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasAadhaarDbt('no')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                      hasAadhaarDbt === 'no' ? 'bg-gov-blue-900 text-white border-gov-blue-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    No / Not sure
                  </button>
                </div>
              </div>

              {/* Question 3: Cooperative Membership */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">
                  3. Are you an active member of a village PACS or cooperative society?
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCoopMember('yes')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                      isCoopMember === 'yes' ? 'bg-gov-blue-900 text-white border-gov-blue-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Yes (PACS Member)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCoopMember('no')}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold ${
                      isCoopMember === 'no' ? 'bg-gov-blue-900 text-white border-gov-blue-900' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Not yet
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-gov-blue-900 to-gov-blue-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Evaluate Scheme Qualification</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {isEligible ? (
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-950">
                    Congratulations! You Appear Eligible.
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Based on your verified responses, you satisfy the primary criteria for <strong>{scheme.title}</strong> under Ministry guidelines.
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-amber-950">
                    Aadhaar Bank Linkage Required
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Please visit your local PACS Common Service Centre to complete e-KYC and link your Aadhaar with your DBT bank account before submitting your application.
                  </p>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-700 block">Next Steps Recommended by CoopSathi AI:</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Carry your 7/12 land record or tenancy certificate.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Submit biometric registration at your village PACS.
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenChat(`I want to apply for ${scheme.title}. Guide me through the process.`);
                  }}
                  className="flex-1 bg-gov-blue-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Chat with AI Guide</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
                >
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
