import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck, Calculator, ArrowRight, ArrowLeft, Calendar, 
  FileText, CheckCircle2, AlertCircle, Phone, Info, Sparkles, Download, Check, Satellite, CloudSun, Camera
} from 'lucide-react';
import { LanguageCode, PmfbyCalculationResult } from '../../types';
import { PMFBY_STATE_DATA, calculatePmfbyPremium } from '../../data/mockPmfby';
import { ClaimGuideModal } from './ClaimGuideModal';
import { apiService, RealTimePmfbyData } from '../../services/apiService';

interface PmfbyAssistantProps {
  currentLang: LanguageCode;
  onSelectTab: (tab: string) => void;
}

export const PmfbyAssistant: React.FC<PmfbyAssistantProps> = ({ onSelectTab }) => {
  // 5 Step Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedState, setSelectedState] = useState(PMFBY_STATE_DATA[0].state);
  const [selectedDistrict, setSelectedDistrict] = useState(PMFBY_STATE_DATA[0].districts[0]);
  const [selectedCrop, setSelectedCrop] = useState(PMFBY_STATE_DATA[0].crops[0].name);
  const [landArea, setLandArea] = useState<number>(2.5);
  const [selectedSeason, setSelectedSeason] = useState<'Kharif' | 'Rabi' | 'Commercial/Horticultural'>('Kharif');
  const [livePmfby, setLivePmfby] = useState<RealTimePmfbyData | null>(null);

  useEffect(() => {
    apiService.getRealTimePmfby().then(data => {
      if (data) setLivePmfby(data);
    });
  }, []);

  // Claim guide modal toggle
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Available districts for chosen state
  const stateObj = useMemo(() => {
    return PMFBY_STATE_DATA.find((s) => s.state === selectedState) || PMFBY_STATE_DATA[0];
  }, [selectedState]);

  // Available crops for chosen state & season
  const availableCrops = useMemo(() => {
    return stateObj.crops;
  }, [stateObj]);

  // Dynamic calculation result
  const result: PmfbyCalculationResult = useMemo(() => {
    return calculatePmfbyPremium({
      state: selectedState,
      district: selectedDistrict,
      crop: selectedCrop,
      landArea: Number(landArea) || 1,
      season: selectedSeason,
    });
  }, [selectedState, selectedDistrict, selectedCrop, landArea, selectedSeason]);

  // When state changes, reset district and crop
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const found = PMFBY_STATE_DATA.find((s) => s.state === stateName);
    if (found) {
      setSelectedDistrict(found.districts[0]);
      setSelectedCrop(found.crops[0].name);
      setSelectedSeason(found.crops[0].season);
    }
  };

  const handleCropChange = (cropName: string) => {
    setSelectedCrop(cropName);
    const crop = stateObj.crops.find((c) => c.name === cropName);
    if (crop) {
      setSelectedSeason(crop.season);
    }
  };

  return (
    <div className="bg-[#FBF9F5] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Government of India • Ministry of Agriculture & Cooperation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            PMFBY Smart Crop Insurance Assistant
          </h1>
          <p className="text-slate-600 text-xs sm:text-base">
            Calculate your subsidized farmer premium, download required document checklists, and learn the mandatory 72-hour claim procedure.
          </p>
        </div>

        {/* 5-Step Visual Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Step {currentStep} of 5</span>
            <span className="text-gov-blue-800">
              {currentStep === 1 && 'Select Your State'}
              {currentStep === 2 && 'Select Your District'}
              {currentStep === 3 && 'Select Sown Crop'}
              {currentStep === 4 && 'Enter Farm Land Area'}
              {currentStep === 5 && 'Select Season'}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-gov-blue-800 via-amber-500 to-emerald-600 h-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          {/* Step circles */}
          <div className="grid grid-cols-5 gap-2 mt-3 text-center text-[11px] font-semibold text-slate-600">
            {['1. State', '2. District', '3. Crop', '4. Acreage', '5. Season'].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx + 1)}
                className={`py-1 rounded-lg transition ${
                  currentStep === idx + 1
                    ? 'bg-gov-blue-900 text-white font-bold'
                    : currentStep > idx + 1
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Wizard + Results Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5-Step Interactive Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-gov space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base sm:text-lg font-bold text-[#0A2540] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-500" />
                <span>Crop Insurance Calculator</span>
              </h2>
              <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                Live Government Subsidies
              </span>
            </div>

            {/* Step 1: Select State */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Step 1: Choose Your State (राज्य निवडा)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PMFBY_STATE_DATA.map((s) => (
                    <button
                      key={s.state}
                      type="button"
                      onClick={() => handleStateChange(s.state)}
                      className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-bold text-left transition flex items-center justify-between ${
                        selectedState === s.state
                          ? 'bg-gov-blue-50 border-gov-blue-800 text-gov-blue-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{s.state}</span>
                      {selectedState === s.state && <Check className="w-4 h-4 text-gov-blue-800" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select District */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Step 2: Choose Your District in {selectedState} (जिल्हा निवडा)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {stateObj.districts.map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => setSelectedDistrict(dist)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition flex items-center justify-between ${
                        selectedDistrict === dist
                          ? 'bg-gov-blue-50 border-gov-blue-800 text-gov-blue-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{dist}</span>
                      {selectedDistrict === dist && <Check className="w-3.5 h-3.5 text-gov-blue-800 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Crop */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Step 3: Choose Sown Crop in {selectedDistrict} (पीक निवडा)
                </label>
                <div className="space-y-2">
                  {availableCrops.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleCropChange(c.name)}
                      className={`w-full p-3 rounded-xl border-2 text-xs sm:text-sm font-bold text-left transition flex items-center justify-between ${
                        selectedCrop === c.name
                          ? 'bg-gov-blue-50 border-gov-blue-800 text-gov-blue-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          {c.season} • Sum Insured: ₹{c.sumInsuredPerAcre.toLocaleString()}/acre
                        </div>
                      </div>
                      {selectedCrop === c.name && <Check className="w-4 h-4 text-gov-blue-800" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Enter Land Area */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Step 4: Total Cultivated Land Area (शेती क्षेत्र एकर मध्ये)
                </label>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-semibold">Land in Acres:</span>
                    <span className="text-2xl font-black text-gov-blue-900">{landArea} Acres</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="25"
                    step="0.5"
                    value={landArea}
                    onChange={(e) => setLandArea(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gov-blue-900"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>0.5 Acre (Small)</span>
                    <span>5 Acres (Medium)</span>
                    <span>25 Acres (Large)</span>
                  </div>

                  {/* Manual input box */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs text-slate-500">Or type custom:</span>
                    <input
                      type="number"
                      min="0.1"
                      max="100"
                      step="0.1"
                      value={landArea}
                      onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                      className="w-24 p-1.5 border border-slate-300 rounded-lg text-xs font-bold text-center"
                    />
                    <span className="text-xs text-slate-600">Acres</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Select Season */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Step 5: Crop Cultivation Season (हंगाम निवडा)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { season: 'Kharif', rate: '2.0%', desc: 'Monsoon (Paddy, Soybean, Cotton)' },
                    { season: 'Rabi', rate: '1.5%', desc: 'Winter (Wheat, Gram, Mustard)' },
                    { season: 'Commercial/Horticultural', rate: '5.0%', desc: 'Annual & Fruits (Sugarcane, Onion)' },
                  ].map((s) => (
                    <button
                      key={s.season}
                      type="button"
                      onClick={() => setSelectedSeason(s.season as any)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                        selectedSeason === s.season
                          ? 'bg-gov-blue-50 border-gov-blue-800 text-gov-blue-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-black text-sm">{s.season}</div>
                        <div className="text-[11px] text-slate-500 mt-1">{s.desc}</div>
                      </div>
                      <div className="mt-3 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                        Farmer Rate: {s.rate}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>View Full Calculation</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Calculated Results & Information Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Result Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300/80 shadow-gov-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                    Eligible & Subsidized
                  </span>
                  <h3 className="text-xl font-black text-[#0A2540] mt-1">
                    {selectedCrop} in {selectedDistrict}, {selectedState}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Sum Insured</span>
                  <span className="text-xl font-black text-gov-blue-900">
                    ₹{result.totalSumInsured.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Premium Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Farmer Premium */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 space-y-1">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <span>Farmer Contribution ({result.farmerPremiumRate}%)</span>
                  </span>
                  <div className="text-2xl font-black text-amber-700">
                    ₹{result.farmerPremiumAmount.toLocaleString()}
                  </div>
                  <p className="text-[10px] text-amber-900 leading-tight font-medium">
                    Maximum capped rate by Government of India. You only pay this amount!
                  </p>
                </div>

                {/* Government Subsidy */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-4 space-y-1">
                  <span className="text-xs font-bold text-emerald-900">
                    Govt Subsidy ({result.govtSubsidyRate}%)
                  </span>
                  <div className="text-2xl font-black text-emerald-700">
                    ₹{result.govtSubsidyAmount.toLocaleString()}
                  </div>
                  <p className="text-[10px] text-emerald-900 leading-tight font-medium">
                    Subsidized 50:50 by Central and State Governments directly to insurer.
                  </p>
                </div>
              </div>

              {/* Deadlines & Centre */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gov-blue-800" />
                    Enrolment Cut-Off Deadline:
                  </span>
                  <span className="font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {result.cutoffDate}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-emerald-700" />
                    Nearest Claim Processing Office:
                  </span>
                  <span className="font-bold text-slate-800">
                    {result.nearestClaimCentre}
                  </span>
                </div>
              </div>

              {/* Action Buttons: 72-Hour Claim Guide & Apply */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>How to File a Claim within 72 Hours (नुकसान भरपाई)</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href="https://pmfby.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
                  >
                    <span>Apply on National PMFBY Portal</span>
                  </a>

                  <button
                    onClick={() => onSelectTab('chat')}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 border border-slate-300 transition"
                  >
                    <span>Ask AI Clarification</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mandatory Required Documents Checklist */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov space-y-4">
              <h4 className="text-sm font-bold text-[#0A2540] flex items-center gap-2">
                <FileText className="w-4 h-4 text-gov-blue-700" />
                <span>Required Documents Checklist for Farmer Enrollment</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {result.mandatoryDocs.map((doc, i) => (
                  <li key={i} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real-Time PMFBY Satellite Technologies (YES-TECH, WINDS, CROPIC) */}
            <div className="bg-gradient-to-br from-gov-blue-900 to-[#0A2540] text-white rounded-3xl p-6 border border-white/20 shadow-gov space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Satellite className="w-5 h-5 text-amber-400 animate-pulse" />
                  <h4 className="text-sm font-bold text-white">
                    Official PMFBY High-Tech Damage Assessment
                  </h4>
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Live Government Tech
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Budget Allocation: <b>{livePmfby?.annualBudgetFY26 || '₹12,200 Crore'}</b>. Total Claims Disbursed: <b>{livePmfby?.totalClaimsPaidOut || '₹2.06 Lakh Crore'}</b>. The scheme replaces manual crop cutting with satellite remote sensing:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-black text-amber-300 block">YES-TECH</span>
                  <p className="text-[10px] text-slate-300 leading-snug">Satellite & drone remote sensing for dispute-free crop loss estimation.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-black text-sky-300 block">WINDS</span>
                  <p className="text-[10px] text-slate-300 leading-snug">Hyper-local village automated weather station rainfall & storm data.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-black text-emerald-300 block">CROPIC</span>
                  <p className="text-[10px] text-slate-300 leading-snug">Geotagged farmer smartphone photographs for instant claim approvals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 72-Hour Claim Procedure Modal */}
      <ClaimGuideModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        cropName={selectedCrop}
        stateName={selectedState}
      />
    </div>
  );
};
