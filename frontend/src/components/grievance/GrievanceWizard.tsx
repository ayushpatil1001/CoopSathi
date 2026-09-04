import React, { useState } from 'react';
import { 
  MessageSquareText, Mic, MicOff, Sparkles, Send, CheckCircle, 
  ArrowRight, ArrowLeft, Download, ShieldCheck, Building2, FileCheck, FileText, AlertCircle
} from 'lucide-react';
import { LanguageCode, GrievanceRecord } from '../../types';
import { GRIEVANCE_CATEGORIES } from '../../data/mockGrievances';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storageService';
import { StatusTracker } from './StatusTracker';

interface GrievanceWizardProps {
  currentLang: LanguageCode;
  onSelectTab: (tab: string) => void;
}

export const GrievanceWizard: React.FC<GrievanceWizardProps> = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'track'>('file');
  const [step, setStep] = useState(1);

  // Form State
  const [selectedCat, setSelectedCat] = useState(GRIEVANCE_CATEGORIES[0]);
  const [applicantName, setApplicantName] = useState('Anand Shinde');
  const [stateName, setStateName] = useState('Maharashtra');
  const [districtName, setDistrictName] = useState('Kolhapur');
  const [phone, setPhone] = useState('+91 98220 12345');
  const [societyName, setSocietyName] = useState('Gramin Vividh Karyakari Seva Sahakari Sanstha');
  
  const [rawProblem, setRawProblem] = useState(
    'सोसायटीच्या सचिवांनी मला सांगितले की आमचे खत संपले आहे पण बाहेरच्या व्यापाऱ्यांना जास्त भावाने विकत आहेत. तसेच मला मतदानाच्या यादीत घेतलेले नाही.'
  );
  const [isListening, setIsListening] = useState(false);
  const [speechListener, setSpeechListener] = useState<{ stop: () => void } | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  // Structured Draft State (AI output)
  const [structuredSubject, setStructuredSubject] = useState(
    'Grievance regarding irregular distribution of subsidized fertilizers and illegal exclusion from cooperative society voter roll'
  );
  const [structuredDescription, setStructuredDescription] = useState(
    'The applicant, a registered shareholder member of the society, reports non-availability of statutory subsidized fertilizer quotas under government MSP norms, coupled with denial of voting participation in the upcoming board election without mandatory notice under Section 29 of the MSCS Act 2023.'
  );
  const [supportingDocs, setSupportingDocs] = useState<string[]>([
    'Society_Passbook_Copy.pdf',
    'Fertilizer_Allotment_Slip.jpg'
  ]);

  // Submission result
  const [generatedRecord, setGeneratedRecord] = useState<GrievanceRecord | null>(null);

  // Mic voice input
  const handleMicToggle = () => {
    if (isListening) {
      speechListener?.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const listener = speechService.startListening(
      'mr',
      (transcript) => {
        setRawProblem((prev) => (prev ? prev + ' ' + transcript : transcript));
        setIsListening(false);
      },
      () => setIsListening(false),
      () => setIsListening(false)
    );
    setSpeechListener(listener);
  };

  // AI Refine for Government Clarity feature
  const handleAiRefine = async () => {
    setIsRefining(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Refined output based on category
    setStructuredSubject(
      `Formal Representation regarding: ${selectedCat.label.split('(')[0].trim()} at ${societyName || districtName}`
    );
    setStructuredDescription(
      `To the Competent Authority (${selectedCat.authority}): The applicant ${applicantName} residing in ${districtName}, ${stateName}, submits that despite lawful compliance with cooperative guidelines, the local administration/society has committed administrative lapses: "${rawProblem.trim()}". Kindly order an inquiry under statutory audit and grievance provisions.`
    );
    setIsRefining(false);
  };

  // Submit Final Grievance
  const handleSubmitGrievance = () => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const refCode = `COOP-2026-${stateName.slice(0, 2).toUpperCase()}-${randomSuffix}`;

    const newRecord: GrievanceRecord = {
      id: 'GRV-' + Date.now(),
      referenceNumber: refCode,
      category: selectedCat.label,
      subject: structuredSubject,
      description: structuredDescription,
      applicantName,
      district: districtName,
      state: stateName,
      phoneNumber: phone,
      coopSocietyName: societyName,
      assignedAuthority: selectedCat.authority,
      status: 'Submitted',
      submittedAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      supportingDocs,
      timeline: [
        {
          stage: 'Submitted',
          date: 'Just now',
          completed: true,
          remarks: 'Successfully recorded on CoopSathi AI central registry with digital timestamp.'
        },
        {
          stage: 'Under Review',
          date: 'Estimated: 24-48 Hours',
          completed: false,
          remarks: 'Automated legal checks and jurisdictional routing in progress.'
        },
        {
          stage: 'Assigned to Authority',
          date: 'Pending',
          completed: false,
          remarks: `Will be dispatched to ${selectedCat.authority}`
        },
        {
          stage: 'Resolved',
          date: 'Target: 15 Working Days',
          completed: false,
          remarks: 'Resolution or hearing order by Competent Officer.'
        }
      ]
    };

    storageService.addGrievance(newRecord);
    setGeneratedRecord(newRecord);
    setStep(4);
  };

  return (
    <div className="bg-[#FBF9F5] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-900 px-3 py-1 rounded-full text-xs font-bold border border-red-300">
            <MessageSquareText className="w-3.5 h-3.5 text-red-600" />
            <span>Statutory Redressal & Ombudsman Routing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            Cooperative Grievance Redressal Portal
          </h1>
          <p className="text-slate-600 text-xs sm:text-base">
            Draft legally grounded complaints with AI clarity assistance and track real-time resolution from District Registrars and Ombudsmen.
          </p>
        </div>

        {/* Top Switcher: File a Grievance vs Track Existing */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('file')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'file'
                  ? 'bg-gov-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step-by-Step Grievance Wizard
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'track'
                  ? 'bg-gov-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Track Complaint Status (संदर्भ स्थिती)
            </button>
          </div>
        </div>

        {activeTab === 'track' ? (
          <div className="max-w-3xl mx-auto">
            <StatusTracker initialRef={generatedRecord?.referenceNumber} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-gov space-y-6">
            {/* Wizard Step Progress Indicator */}
            {step < 4 && (
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Step {step} of 3: {step === 1 ? 'Select Issue Category' : step === 2 ? 'Describe Your Problem' : 'AI Structured Preview'}</span>
                  <span className="text-gov-blue-800">Grievance Wizard</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gov-blue-900 h-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* STEP 1: Select Category & Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    Step 1: Select Grievance Category
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose the problem category to automatically identify the appropriate legal authority.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GRIEVANCE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCat(cat)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                        selectedCat.id === cat.id
                          ? 'bg-gov-blue-50 border-gov-blue-800 text-gov-blue-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{cat.label}</span>
                      <span className="text-[10px] text-slate-500 mt-2 block">
                        Routes to: {cat.authority.split('/')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Applicant Details Form */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
                    Applicant & Society Verification
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Your Full Name:</label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Mobile Number:</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">District & State:</label>
                      <input
                        type="text"
                        value={`${districtName}, ${stateName}`}
                        onChange={(e) => setDistrictName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Cooperative / PACS Name:</label>
                      <input
                        type="text"
                        value={societyName}
                        onChange={(e) => setSocietyName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition"
                  >
                    <span>Proceed to Describe Problem</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Describe Your Problem (Text + Voice) */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0A2540]">
                      Step 2: Describe Your Problem
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Type or speak naturally in Marathi, Hindi, or English. Don't worry about legal formatting.
                    </p>
                  </div>
                  {/* Voice mic toggle */}
                  <button
                    type="button"
                    onClick={handleMicToggle}
                    className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition ${
                      isListening
                        ? 'bg-red-500 text-white border-red-600 animate-bounce'
                        : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isListening ? 'Stop' : 'Speak Voice'}</span>
                  </button>
                </div>

                {isListening && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
                    <span>Listening... Speak your complaint clearly into the microphone.</span>
                  </div>
                )}

                <textarea
                  rows={5}
                  value={rawProblem}
                  onChange={(e) => setRawProblem(e.target.value)}
                  placeholder="Describe what happened, dates, society name, and any officers involved..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-blue-800 focus:bg-white transition"
                />

                {/* AI Refine Button */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-amber-950 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      AI Legal Clarification Engine
                    </span>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Our government AI automatically extracts dates, legal sections, and standardizes bureaucratic language.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAiRefine}
                    disabled={isRefining || !rawProblem.trim()}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 shrink-0 shadow-sm disabled:opacity-40 transition"
                  >
                    {isRefining ? 'Refining...' : 'AI Refine for Government Clarity'}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => {
                      if (!structuredSubject) handleAiRefine();
                      setStep(3);
                    }}
                    className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition"
                  >
                    <span>Preview Structured Grievance</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AI Structured Grievance Preview */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-[#0A2540]">
                    Step 3: Review Structured Representation
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    This formatted text will be dispatched to the designated government authority with digital seal.
                  </p>
                </div>

                {/* Formal preview letter box */}
                <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 space-y-4 text-xs font-sans">
                  {/* Subject */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Subject
                    </span>
                    <input
                      type="text"
                      value={structuredSubject}
                      onChange={(e) => setStructuredSubject(e.target.value)}
                      className="w-full mt-1 bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900 text-xs"
                    />
                  </div>

                  {/* Body Description */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Representation Text (Statutory Language)
                    </span>
                    <textarea
                      rows={5}
                      value={structuredDescription}
                      onChange={(e) => setStructuredDescription(e.target.value)}
                      className="w-full mt-1 bg-white border border-slate-300 rounded-lg p-2.5 text-slate-700 text-xs leading-relaxed"
                    />
                  </div>

                  {/* Relevant Authority */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Competent Authority:</span>
                    <span className="font-bold text-gov-blue-900">{selectedCat.authority}</span>
                  </div>

                  {/* Supporting Documents */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Supporting Documents Attached
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {supportingDocs.map((doc, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-50 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1"
                        >
                          <FileCheck className="w-3 h-3 text-emerald-600" />
                          {doc}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSupportingDocs([...supportingDocs, 'Land_Record_7_12.pdf'])}
                        className="text-[11px] font-semibold text-gov-blue-700 hover:underline"
                      >
                        + Attach 7/12 land extract
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleSubmitGrievance}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow-md transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Grievance to Authority</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Successful Submission & Reference Card */}
            {step === 4 && generatedRecord && (
              <div className="space-y-6 text-center animate-scaleUp py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Officially Registered
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A2540] mt-3">
                    Grievance Successfully Lodged
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Your complaint has been registered on the Ministry of Cooperation grievance portal. Save your reference number below:
                  </p>
                </div>

                {/* Big Reference Badge */}
                <div className="bg-slate-50 border-2 border-dashed border-gov-blue-600/60 rounded-2xl p-6 max-w-md mx-auto">
                  <span className="text-xs text-slate-400 uppercase font-semibold block">
                    Grievance Reference Number
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-gov-blue-900 tracking-wider block my-1">
                    {generatedRecord.referenceNumber}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Assigned to: {generatedRecord.assignedAuthority}
                  </span>
                </div>

                {/* Actions: Track Now & Download Receipt */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('track')}
                    className="bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                  >
                    <span>Track Status Live</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    onClick={() => alert(`Official Receipt for ${generatedRecord.referenceNumber} downloaded.`)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-5 rounded-xl text-xs sm:text-sm border border-slate-300 flex items-center gap-1.5 transition"
                  >
                    <Download className="w-4 h-4 text-gov-blue-900" />
                    <span>Download Official Receipt</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
