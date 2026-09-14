import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Send, Volume2, Globe, ArrowRight, 
  Sparkles, CheckCircle2, ChevronRight, User, ShieldCheck, 
  HelpCircle, Building2, Landmark, PhoneCall 
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';
import { speechService } from '../../services/speechService';

interface HeroSectionProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onLaunchQuery: (query: string, lang: LanguageCode) => void;
  onSelectTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onSelectLang,
  onLaunchQuery,
  onSelectTab,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechListener, setSpeechListener] = useState<{ stop: () => void } | null>(null);
  const [activePersona, setActivePersona] = useState<string>('farmer');

  const rotatingPrompts = [
    'Ask about PMFBY 72-hour crop loss intimation...',
    'Ask about active member voting rights in PACS (Section 29)...',
    'Ask about 4% effective interest rate on Kisan Credit Card loans...',
    'Ask about opening a Jan Aushadhi Kendra at your local PACS...',
    'Ask about filing a complaint with the Cooperative Ombudsman (Form VI)...'
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingPrompts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const personas = [
    {
      id: 'farmer',
      label: 'Small Farmer (2 Acres)',
      prompt: 'What are the subsidized PMFBY premium rates for 2 acres of Kharif soybean crop?'
    },
    {
      id: 'pacs',
      label: 'PACS Society Member',
      prompt: 'What are my active voting rights in the Annual General Meeting under Section 29?'
    },
    {
      id: 'women',
      label: 'Women Dairy SHG Member',
      prompt: 'What subsidies are available under NCDC Mahila Sahakar Yojana for agro-processing?'
    },
    {
      id: 'credit',
      label: 'KCC Loan Borrower',
      prompt: 'How to get 4% effective interest rate on Kisan Credit Card with prompt repayment?'
    }
  ];

  const handlePersonaSelect = (p: typeof personas[0]) => {
    setActivePersona(p.id);
    setInputText(p.prompt);
  };

  const handleMicClick = () => {
    if (isListening) {
      speechListener?.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const listener = speechService.startListening(
      currentLang,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        onLaunchQuery(transcript, currentLang);
      },
      () => setIsListening(false),
      () => setIsListening(false)
    );
    setSpeechListener(listener);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputText.trim();
    if (!query) return;
    onLaunchQuery(query, currentLang);
  };

  return (
    <div id="main-content" className="w-full bg-[#F8FAFC]">
      
      {/* 1. OFFICIAL GAZETTE & CIRCULARS ANNOUNCEMENT TICKER */}
      <section className="bg-amber-50 border-b border-amber-200 text-xs py-2 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="shrink-0 flex items-center gap-1.5 bg-[#FF9933] text-slate-950 font-bold px-2.5 py-1 rounded shadow-xs text-xs mr-3 z-10">
            <span className="font-devanagari">📢 नवीन परिपत्रक</span>
            <span className="hidden sm:inline">/ Gazette Notifications</span>
          </div>
          
          <div className="overflow-hidden relative w-full flex items-center">
            <div className="animate-ticker text-slate-800 font-medium space-x-8">
              <span className="inline-flex items-center gap-1.5 text-slate-900">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                <strong>Model By-laws:</strong> Adopted across 79,630 PACS to transform into multipurpose rural service centers.
              </span>
              <span className="text-slate-400">|</span>
              <span className="inline-flex items-center gap-1">
                <strong>PMFBY Calamity Alert:</strong> 72-Hour Crop Loss Intimation active through Toll-Free 14447 & NCIP Portal.
              </span>
              <span className="text-slate-400">|</span>
              <span className="inline-flex items-center gap-1">
                <strong>National Cooperative Database:</strong> Complete census of 8.5+ Lakh registered cooperatives published online.
              </span>
              <span className="text-slate-400">|</span>
              <span className="inline-flex items-center gap-1">
                <strong>Kisan Credit Card (MISS):</strong> 4% effective interest subvention for timely repayment by cooperative members.
              </span>
              <span className="text-slate-400">|</span>
              <span className="inline-flex items-center gap-1">
                <strong>NCCT Admissions 2026:</strong> Higher Diploma in Cooperative Management (HDCM) registration now open.
              </span>
            </div>
          </div>

          <div className="hidden md:flex shrink-0 ml-3 pl-3 border-l border-amber-300">
            <button
              onClick={() => onSelectTab('schemes')}
              className="text-blue-800 hover:underline font-bold text-xs flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. HERO & INSTITUTIONAL FOCUS SECTION */}
      <section className="bg-gradient-to-b from-white via-[#F1F5F9]/50 to-white py-8 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Institutional Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-300 rounded-full text-amber-900 text-xs font-bold mb-3">
              <span className="text-[#FF9933]">🏛️</span>
              <span className="font-devanagari">सहकार से समृद्धि</span>
              <span>|</span>
              <span>Prosperity Through Cooperation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A2540] tracking-tight leading-tight">
              Empowering India's Rural Economy through Transparent, Modern Cooperatives
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Strengthening Primary Agricultural Credit Societies (PACS), integrating multi-state cooperatives under the MSCS Act 2023, and delivering statutory welfare to 30+ crore cooperative members across India.
            </p>
          </div>

          {/* Grid: Left Leadership Showcase + Right CoopSathi AI Service Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Official Government Leadership (5 Columns) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0A2540] flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-amber-600" />
                    Institutional Leadership
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-semibold">
                    Ministry of Cooperation
                  </span>
                </div>

                {/* Minister Profiles */}
                <div className="space-y-3">
                  
                  {/* Union Minister Shri Amit Shah */}
                  <div className="flex items-center gap-3.5 p-3 rounded-lg bg-amber-50/50 border border-amber-200/90 hover:border-amber-400 transition-all">
                    <div className="w-13 h-15 rounded-md bg-slate-100 border-2 border-amber-400/80 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                      <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-700">
                        <User className="w-6 h-6 text-slate-600" />
                        <span className="text-[8px] font-bold mt-0.5 text-slate-600 uppercase">Minister</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#FF9933] tracking-wider block">
                        Hon'ble Union Minister
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        Shri Amit Shah
                      </h4>
                      <p className="text-xs text-slate-600 leading-tight">
                        Minister for Cooperation & Minister of Home Affairs, Government of India
                      </p>
                    </div>
                  </div>

                  {/* MoS Shri Murlidhar Mohol */}
                  <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <div className="w-13 h-15 rounded-md bg-slate-100 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-700">
                        <User className="w-5 h-5 text-slate-600" />
                        <span className="text-[8px] font-medium mt-0.5 text-slate-600 uppercase">MoS</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                        Hon'ble Minister of State
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        Shri Murlidhar Mohol
                      </h4>
                      <p className="text-xs text-slate-600 leading-tight">
                        Minister of State for Cooperation & Civil Aviation, Government of India
                      </p>
                    </div>
                  </div>

                  {/* Secretary Dr. Ashish Kumar Bhutani */}
                  <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                    <div className="w-13 h-15 rounded-md bg-slate-100 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center">
                      <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-700">
                        <Building2 className="w-5 h-5 text-slate-600" />
                        <span className="text-[8px] font-medium mt-0.5 text-slate-600 uppercase">Secretary</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#138808] tracking-wider block">
                        Secretary (Cooperation)
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        Dr. Ashish Kumar Bhutani, IAS
                      </h4>
                      <p className="text-xs text-slate-600 leading-tight">
                        Secretary, Ministry of Cooperation, Government of India
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Official Vision Quote */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-200">
                "Cooperation is the foundational pillar of rural prosperity and farmer self-reliance. Through transparent digital PACS and national seed & organic cooperatives, we are building a vibrant grassroots economy."
              </div>
            </div>

            {/* Right: CoopSathi AI - Official Citizen Service Terminal (7 Columns) */}
            <div id="coopsathi" className="lg:col-span-7 bg-white border-2 border-slate-300 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
              
              <div>
                {/* Module Official Masthead */}
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#0A2540] text-white flex items-center justify-center shadow-xs">
                      <span className="font-bold text-amber-400 text-sm">सह</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#0A2540]">
                          CoopSathi AI • सहकार सारथी
                        </h3>
                        <span className="px-2 py-0.5 bg-[#138808] text-white text-[10px] font-bold rounded">
                          GIGW ACCESSIBLE
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Official Multilingual Citizen Knowledge & Grievance Assistance Terminal
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
                    NCCT & Bhashini Aligned
                  </span>
                </div>

                {/* Service Desk Notice */}
                <p className="text-xs text-slate-700 mt-3 leading-relaxed">
                  Speak or type in any of the <strong>22 Official Indian Languages</strong> to consult Multi-State Cooperative Society rules, PACS election guidelines, PMFBY claim intimation, and NCCT training calendar.
                </p>

                {/* Stakeholder Role Selector */}
                <div className="mt-3.5 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Select Your Citizen / Stakeholder Profile:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {personas.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePersonaSelect(p)}
                        className={`text-xs px-2.5 py-1 rounded font-semibold transition border ${
                          activePersona === p.id
                            ? 'bg-amber-100 text-amber-950 border-amber-400 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Central Query Input Container */}
                <div className="mt-4 bg-slate-50 border border-slate-300 rounded-lg p-3 shadow-inner">
                  {/* Language Selector Row inside Input */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-3.5 h-3.5 text-[#0A2540]" />
                      <span className="text-slate-600 font-semibold hidden sm:inline">Language:</span>
                      <div className="flex gap-1 overflow-x-auto py-0.5 max-w-[280px] sm:max-w-none">
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => onSelectLang(lang.code)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                              currentLang === lang.code
                                ? 'bg-[#0A2540] text-white shadow-xs'
                                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {lang.nativeName}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center space-x-1 text-emerald-800 text-[11px] font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      <Volume2 className="w-3 h-3" />
                      <span>Voice Enabled</span>
                    </div>
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={rotatingPrompts[placeholderIndex]}
                      className="flex-1 bg-white text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 border border-slate-300 rounded px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A2540]"
                    />

                    {/* Voice Input Mic Button */}
                    <button
                      type="button"
                      onClick={handleMicClick}
                      className={`p-2.5 rounded transition flex items-center justify-center ${
                        isListening
                          ? 'bg-red-600 text-white font-bold ring-2 ring-red-300 animate-pulse'
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                      }`}
                      title={isListening ? 'Listening... click to stop' : 'Click to speak in your regional language'}
                      aria-label="Voice Input"
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="bg-[#0A2540] hover:bg-slate-900 disabled:opacity-40 text-white px-4 py-2.5 rounded font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
                    >
                      <span>खोजें</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>

              {/* Pre-indexed Quick Citizen Questions matching Stitch Designed Output */}
              <div className="mt-3.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                  Commonly Asked by Farmers & Cooperatives:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onLaunchQuery('What are the electoral reform rules under MSCS Act 2023?', currentLang)}
                    className="text-[11px] bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 px-2.5 py-1 rounded border border-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span className="text-amber-600">📋</span>
                    <span>MSCS Act 2023 Electoral Reform Rules</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onLaunchQuery('How do I submit crop loss intimation within 72 hours on Toll-Free 14447 under PMFBY?', currentLang)}
                    className="text-[11px] bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 px-2.5 py-1 rounded border border-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span className="text-emerald-600">🌾</span>
                    <span>72-Hour PMFBY Claim Toll-Free Process</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onLaunchQuery('What 25+ citizen services can a PACS provide under Model By-laws?', currentLang)}
                    className="text-[11px] bg-slate-100 hover:bg-blue-100 hover:text-blue-900 text-slate-700 px-2.5 py-1 rounded border border-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span className="text-blue-600">🏪</span>
                    <span>PACS Model By-laws 25+ Citizen Services</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onLaunchQuery('How to verify NCCT diploma certificates and admission process?', currentLang)}
                    className="text-[11px] bg-slate-100 hover:bg-purple-100 hover:text-purple-900 text-slate-700 px-2.5 py-1 rounded border border-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span className="text-purple-600">🎓</span>
                    <span>NCCT Certificate Verification Portal</span>
                  </button>
                </div>
              </div>

              {/* Terminal Footer Status */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#138808]"></span>
                  <span>Official Knowledge Base Version: <strong>2024.3 (CRCS & NCCT Verified)</strong></span>
                </span>
                <button
                  type="button"
                  onClick={() => onSelectTab('grievance')}
                  className="text-[#0A2540] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Official Ombudsman Grievance Lodging</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
