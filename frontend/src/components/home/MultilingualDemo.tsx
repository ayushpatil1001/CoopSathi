import React, { useState } from 'react';
import { Globe, Volume2, Square, Check, Play, Sparkles, Mic, Headphones } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';
import { speechService } from '../../services/speechService';

interface MultilingualDemoProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onSelectTab: (tab: string) => void;
}

interface DemoDialogue {
  userQuestion: string;
  aiAnswer: string;
  source: string;
  phoneticTip: string;
}

export const MultilingualDemo: React.FC<MultilingualDemoProps> = ({
  currentLang,
  onSelectLang,
  onSelectTab,
}) => {
  const [activeAudio, setActiveAudio] = useState<'user' | 'ai' | null>(null);

  const sampleConversations: Record<LanguageCode, DemoDialogue> = {
    mr: {
      userQuestion: 'पीएम फसल बीमा योजनेसाठी मी पात्र आहे का?',
      aiAnswer: 'होय. सर्व जमीनधारक शेतकरी आणि भाडेकरू शेतकरी या योजनेसाठी पात्र आहेत. तुमची अचूक हप्ता रक्कम तपासण्यासाठी कृपया तुमचे राज्य, जिल्हा आणि पीक निवडा.',
      source: 'PMFBY Operational Guidelines Clause 4.1',
      phoneticTip: 'मराठी बोलीभाषा आणि कृषी संज्ञा ओळखण्यास सक्षम.',
    },
    hi: {
      userQuestion: 'क्या मैं प्रधानमंत्री फसल बीमा योजना के लिए पात्र हूँ?',
      aiAnswer: 'हाँ! सभी भूमिधारक किसान एवं बटाईदार किसान अधिसूचित फसलों के लिए पात्र हैं। अपनी प्रीमियम राशि और अंतिम तिथि जांचने के लिए राज्य और फसल का चयन करें।',
      source: 'पीएमएफबीवाई दिशानिर्देश २०२४ (धारा ४)',
      phoneticTip: 'शुद्ध हिन्दी और ग्रामीण बोलियों में सहज संवाद।',
    },
    en: {
      userQuestion: 'Am I eligible for PM Fasal Bima Yojana crop insurance?',
      aiAnswer: 'Yes. All landholding farmers, tenant farmers, and sharecroppers cultivating notified crops in notified areas are eligible. Premium is capped at only 1.5% to 2%.',
      source: 'PMFBY Operational Guidelines Clause 4.1',
      phoneticTip: 'Standard Indian English with agricultural terminology comprehension.',
    },
    ta: {
      userQuestion: 'நான் பயிர் காப்பீட்டு திட்டத்திற்கு தகுதியானவரா?',
      aiAnswer: 'ஆம்! நில உரிமையாளர்கள் மற்றும் குத்தகை விவசாயிகள் அனைவரும் தகுதியுடையவர்கள். பிரீமியம் வெறும் 1.5% முதல் 2% மட்டுமே.',
      source: 'PMFBY Guidelines 2024',
      phoneticTip: 'தமிழ் மொழி ஆதரவு மற்றும் குரல் வழிகாட்டுதல்.',
    },
    te: {
      userQuestion: 'నేను పీఎం ఫసల్ బీమా యోజనకు అర్హుడనా?',
      aiAnswer: 'అవును. సొంత భూమి ఉన్న రైతులు మరియు కౌలు రైతులు అందరూ అర్హులే. ప్రీమియం 1.5% నుండి 2% మాత్రమే.',
      source: 'PMFBY Guidelines 2024',
      phoneticTip: 'తెలుగు భాషలో సులభమైన వివరణలు.',
    },
    bn: {
      userQuestion: 'আমি কি প্রধানমন্ত্রী ফসল বিমা যোজনার জন্য যোগ্য?',
      aiAnswer: 'হ্যাঁ! সমস্ত জমিসম্পন্ন কৃষক ও ভাগচাষী এই প্রকল্পের জন্য যোগ্য। খরিফ শস্যের জন্য মাত্র ২% এবং রবি শস্যের জন্য ১.৫% প্রিমিয়াম দিতে হয়।',
      source: 'PMFBY Operational Guidelines',
      phoneticTip: 'বাংলা ভাষায় সঠিক ও নির্ভুল সরকারি তথ্য।',
    },
  };

  const currentDialogue = sampleConversations[currentLang] || sampleConversations.mr;

  const handlePlayAudio = (type: 'user' | 'ai', text: string) => {
    if (activeAudio === type) {
      speechService.stop();
      setActiveAudio(null);
      return;
    }

    setActiveAudio(type);
    speechService.speak(
      text,
      currentLang,
      () => setActiveAudio(type),
      () => setActiveAudio(null),
      () => setActiveAudio(null)
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#FBF9F5] via-white to-[#FBF9F5] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-300 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>Inclusive Indian Public Service (भाषिणी अनुरूप)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            {getTranslation(currentLang, 'multilingualHeadline')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {getTranslation(currentLang, 'multilingualSub')}
          </p>
        </div>

        {/* Interactive Language Chips */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-black border-2 transition-all shadow-sm ${
                  isSelected
                    ? 'bg-gov-blue-900 text-white border-gov-blue-900 shadow-lg scale-105 ring-2 ring-amber-400'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-gov-blue-400 hover:bg-slate-50'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-sm">{lang.nativeName}</span>
                <span className="text-[11px] opacity-75 font-normal hidden sm:inline">
                  ({lang.name})
                </span>
                {isSelected && <Check className="w-4 h-4 text-amber-400 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Example Dialogue Interactive Studio Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(10,37,64,0.08)] border-2 border-slate-200 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Live Speech Synthesizer & Dialect Studio
              </span>
            </div>
            <span className="text-xs font-bold text-gov-blue-900 bg-gov-blue-50 px-3 py-1 rounded-full border border-gov-blue-200 flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5 text-amber-600" />
              <span>{SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.name} Studio</span>
            </span>
          </div>

          {/* User Message Bubble */}
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-slate-100 border border-slate-200 rounded-3xl rounded-tr-xs p-5 max-w-lg shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold gap-4">
                <span className="font-bold text-slate-700">Citizen / Farmer Voice Inquiry</span>
                <button
                  onClick={() => handlePlayAudio('user', currentDialogue.userQuestion)}
                  className="flex items-center gap-1 text-xs font-bold text-gov-blue-900 hover:text-gov-blue-700 bg-white px-2.5 py-1 rounded-lg border border-slate-300 shadow-2xs transition"
                >
                  {activeAudio === 'user' ? (
                    <>
                      <Square className="w-3 h-3 text-red-500 fill-current" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-600 fill-current" />
                      <span>Listen Question</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-slate-900 font-bold text-sm sm:text-base">
                "{currentDialogue.userQuestion}"
              </p>

              {/* Animated Equalizer while User Audio Plays */}
              {activeAudio === 'user' && (
                <div className="flex items-center gap-1 pt-1 h-3">
                  {[10, 16, 8, 14, 18, 12].map((h, i) => (
                    <span key={i} className="w-1 bg-gov-blue-800 rounded-full animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}></span>
                  ))}
                </div>
              )}
            </div>

            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
              👨‍🌾
            </div>
          </div>

          {/* AI Response Bubble */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gov-blue-900 text-amber-300 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
              🤖
            </div>

            <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-2 border-emerald-300/80 rounded-3xl rounded-tl-xs p-5 max-w-lg shadow-gov space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-950 font-bold gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="font-extrabold text-gov-blue-900">CoopSathi AI</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    Statutory Grounded
                  </span>
                </span>

                <button
                  onClick={() => handlePlayAudio('ai', currentDialogue.aiAnswer)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs transition"
                >
                  {activeAudio === 'ai' ? (
                    <>
                      <Square className="w-3 h-3 text-red-500 fill-current" />
                      <span>Stop Speech</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Read Aloud</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-sans">
                "{currentDialogue.aiAnswer}"
              </p>

              {/* Animated Equalizer while AI Audio Plays */}
              {activeAudio === 'ai' && (
                <div className="flex items-center gap-1 pt-1 h-3">
                  {[12, 20, 10, 18, 22, 14].map((h, i) => (
                    <span key={i} className="w-1 bg-emerald-600 rounded-full animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}></span>
                  ))}
                </div>
              )}

              {/* Source Verification Badge */}
              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1 font-bold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {currentDialogue.source}
                </span>
                <button
                  onClick={() => onSelectTab('chat')}
                  className="font-bold text-gov-blue-900 hover:underline"
                >
                  Open Live Chat →
                </button>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 text-xs text-slate-500 font-medium">
            💡 {currentDialogue.phoneticTip}
          </div>
        </div>
      </div>
    </section>
  );
};
