import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Send, Sparkles, ShieldCheck, ArrowRight, 
  Volume2, Globe, CheckCircle2, ChevronRight, Activity, Zap, Award, Flame, Play, Square
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';
import { speechService } from '../../services/speechService';
import { StitchShaderWaveform } from './StitchShaderWaveform';

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
  const [isSamplePlaying, setIsSamplePlaying] = useState(false);

  // Rotating placeholder topics
  const rotatingPrompts = [
    'Ask about PMFBY 72-hour crop loss intimation...',
    'Ask about active member voting rights in PACS...',
    'Ask about 4% interest Kisan Credit Card loans...',
    'Ask about opening a Jan Aushadhi Kendra in your village...',
    'Ask about Agriculture Infrastructure Fund (AIF) 3% subsidy...'
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingPrompts.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const personas = [
    {
      id: 'farmer',
      label: '👨‍🌾 Small Farmer (2 Acres)',
      prompt: 'What are the subsidized PMFBY premium rates for 2 acres of Kharif soybean crop?'
    },
    {
      id: 'pacs',
      label: '🏛️ PACS Society Member',
      prompt: 'What are my active voting rights in the Annual General Meeting under Section 29?'
    },
    {
      id: 'women',
      label: '👩‍🌾 Women Cooperative SHG',
      prompt: 'What subsidies are available under NCDC Mahila Sahakar Yojana for agro-processing?'
    },
    {
      id: 'credit',
      label: '💰 KCC Loan Seeker',
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

  const handlePlaySampleSpeech = () => {
    const sampleText = currentLang === 'mr'
      ? 'होय. सर्व जमीनधारक शेतकरी आणि भाडेकरू शेतकरी या योजनेसाठी पात्र आहेत. खरीप पिकांसाठी फक्त २% हप्ता भरावा लागतो.'
      : currentLang === 'hi'
      ? 'हाँ! सभी भूमिधारक किसान एवं बटाईदार किसान पात्र हैं। खरीफ फसलों के लिए मात्र २% प्रीमियम दर निर्धारित है।'
      : 'Yes. All landholding farmers and sharecroppers are eligible. Farmer premium is capped at only 1.5% to 2% under Government of India guidelines.';

    if (isSamplePlaying) {
      speechService.stop();
      setIsSamplePlaying(false);
      return;
    }

    setIsSamplePlaying(true);
    speechService.speak(
      sampleText,
      currentLang,
      () => setIsSamplePlaying(true),
      () => setIsSamplePlaying(false),
      () => setIsSamplePlaying(false)
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#06182B] via-[#0A2540] to-[#0D3459] text-white pt-6 pb-20 lg:py-24 border-b border-gov-blue-800">
      {/* 1. Top Live National Announcement Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 px-4 py-2 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase shrink-0 flex items-center gap-1 shadow-xs">
              <Flame className="w-3 h-3 text-red-700" />
              LIVE UPDATE
            </span>
            <div className="text-slate-200 truncate font-medium">
              📢 <b>Ministry Gazette:</b> Model By-Laws adopted across 30,000+ PACS nationwide • 🌾 Kharif 2026 PMFBY enrollment active • 📞 24x7 Helpline: 14447
            </div>
          </div>
          <button
            onClick={() => onSelectTab('schemes')}
            className="hidden md:flex items-center space-x-1 text-amber-300 font-bold hover:text-white shrink-0 transition"
          >
            <span>View All Circulars</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Atmospheric Multi-layer Background Gradients & Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Saffron Aura on Top Right */}
        <div className="absolute -top-24 -right-24 w-[550px] h-[550px] bg-gradient-to-br from-[#FF9933]/25 to-[#EA580C]/10 rounded-full blur-3xl opacity-70"></div>
        {/* India Green Aura on Bottom Left */}
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#138808]/25 to-[#107507]/10 rounded-full blur-3xl opacity-60"></div>
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column: Headline, Voice AI Input & Persona Switcher */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* National Initiative Badge */}
            <div className="inline-flex items-center space-x-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-amber-300 font-bold">Government of India</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200">Ministry of Cooperation & NCCT</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                AI 2026
              </span>
            </div>

            {/* Main Punchy Headline with Tricolor Gradient Accent */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
              Your Cooperative & Agriculture Assistant,{' '}
              <span className="bg-gradient-to-r from-[#FF9933] via-amber-200 to-[#54B758] bg-clip-text text-transparent">
                in Your Language.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {getTranslation(currentLang, 'heroSubheadline')}
            </p>

            {/* Persona Switcher Chips ("Try as:") */}
            <div className="space-y-2 text-left">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Select Your Stakeholder Role:
              </span>
              <div className="flex flex-wrap gap-2">
                {personas.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePersonaSelect(p)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition border ${
                      activePersona === p.id
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-102'
                        : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/15'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Large Interactive AI Voice & Text Search Container */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-4 text-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-2 border-amber-400/80 focus-within:border-amber-400 transition-all overflow-hidden">
              {/* Stitch WebGL Tricolor Equalizer Shader */}
              <StitchShaderWaveform isActive={true} />

              {/* Language Selector row inside search box */}
              <div className="relative z-10 flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs">
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-gov-blue-800" />
                  <span className="text-slate-600 font-bold hidden sm:inline">Language:</span>
                  <div className="flex gap-1 overflow-x-auto py-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => onSelectLang(lang.code)}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                          currentLang === lang.code
                            ? 'bg-gov-blue-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden sm:flex items-center space-x-1.5 text-emerald-800 text-[11px] font-bold bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Voice Enabled</span>
                </div>
              </div>

              {/* Main Input Form */}
              <form onSubmit={handleSubmit} className="relative z-10 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={rotatingPrompts[placeholderIndex]}
                  className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none px-2 py-2"
                />

                {/* Voice Input Mic Button with Visual Feedback */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`p-3 rounded-2xl transition-all flex items-center justify-center ${
                    isListening
                      ? 'bg-red-500 text-white animate-bounce shadow-lg ring-4 ring-red-300'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200 hover:scale-105 active:scale-95'
                  }`}
                  title={isListening ? 'Listening... click to stop' : 'Click to speak in your language'}
                  aria-label="Voice Input"
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gov-blue-900 via-gov-blue-800 to-gov-blue-950 hover:from-gov-blue-800 hover:to-gov-blue-900 text-white px-5 sm:px-7 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-xl transition-all transform active:scale-95 shrink-0"
                >
                  <span>{getTranslation(currentLang, 'askButton')}</span>
                  <Send className="w-4 h-4 text-amber-400" />
                </button>
              </form>

              {/* Live Audio Equalizer Animation while Listening */}
              {isListening && (
                <div className="mt-3 p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    <span className="font-bold">Listening in {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.name}... Speak now</span>
                  </div>
                  {/* Visual Waveform */}
                  <div className="flex items-end gap-1 h-5">
                    {[16, 24, 12, 20, 28, 14, 22].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-red-500 rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onSelectTab('chat')}
                className="bg-gradient-to-r from-[#FF9933] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white px-7 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Ask CoopSathi AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab('schemes')}
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-6 py-3.5 rounded-2xl font-bold text-sm backdrop-blur-md transition flex items-center gap-2"
              >
                <span>Explore Government Schemes</span>
              </button>
            </div>
          </div>

          {/* Right Hero Column: Interactive Glassmorphic Live AI Simulator Terminal */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Floating Luminous Badges */}
              <div className="absolute -top-5 -left-4 z-20 bg-white text-slate-900 px-3.5 py-1.5 rounded-2xl shadow-xl border border-slate-200 text-[11px] font-black flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '3s' }}>
                <Zap className="w-4 h-4 text-amber-500 fill-current" />
                <span>RAG Retrieval &lt; 1.2s</span>
              </div>

              <div className="absolute -bottom-5 -right-4 z-20 bg-emerald-900/90 text-emerald-100 border border-emerald-500/60 px-3.5 py-1.5 rounded-2xl shadow-xl text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Gazette Citations</span>
              </div>

              {/* Main Terminal Glass Container */}
              <div className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border border-white/25 space-y-6">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                      🏛️
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                        <span>CoopSathi AI Verified Engine</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      </h3>
                      <p className="text-[11px] text-amber-300 font-semibold">
                        Ministry of Cooperation Knowledge Base
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/40">
                    Live Grounded
                  </span>
                </div>

                {/* Simulated Real Conversation Card */}
                <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10 space-y-3 font-sans">
                  {/* User Query */}
                  <div className="flex items-start space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0">
                      👨‍🌾
                    </span>
                    <div className="bg-white/10 rounded-xl p-2.5 text-xs text-slate-100 flex-1">
                      <p className="font-semibold text-amber-200">
                        "What are my voting rights under MSCS Act Section 29?"
                      </p>
                    </div>
                  </div>

                  {/* AI Response with TTS Audio Button */}
                  <div className="flex items-start space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-gov-blue-700 text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                      🤖
                    </span>
                    <div className="bg-emerald-950/70 border border-emerald-600/40 rounded-xl p-3 text-xs text-emerald-100 flex-1 space-y-2">
                      <div className="flex items-center justify-between border-b border-emerald-700/50 pb-1.5 text-[10px]">
                        <span className="font-bold text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Multi-State Co-op Societies Act 2023
                        </span>
                        <button
                          type="button"
                          onClick={handlePlaySampleSpeech}
                          className="flex items-center gap-1 text-[10px] bg-emerald-800/80 hover:bg-emerald-700 text-white px-2 py-0.5 rounded font-bold transition"
                        >
                          {isSamplePlaying ? (
                            <>
                              <Square className="w-2.5 h-2.5 fill-current text-red-400" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-2.5 h-2.5 fill-current text-amber-300" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                        "Active members who attended <b>at least 3 consecutive AGMs</b> and utilized minimum society services hold inviolable voting rights in board elections."
                      </p>

                      <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                        <span>Confidence Score: <b>99.4%</b></span>
                        <span className="text-amber-300 font-bold">Section 29 Citation ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Quick Pillar Cards */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center text-xs">
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-lg font-black text-amber-300">63,000+</div>
                    <div className="text-[10px] text-slate-300 font-medium">PACS ERP Synced</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-lg font-black text-emerald-400">1.5% - 2%</div>
                    <div className="text-[10px] text-slate-300 font-medium">PMFBY Premium</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="text-lg font-black text-sky-300">6+ Langs</div>
                    <div className="text-[10px] text-slate-300 font-medium">Voice NLU Built</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
