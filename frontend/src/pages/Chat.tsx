import React, { useState, useRef, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { aiChatService } from '../services/aiChatService';
import { speechService } from '../services/speechService';
import { ChatMessage, LanguageCode, VerifiedSource } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function Chat() {
  const { language: portalLang, supportedLanguages } = useLanguage();
  const [lang, setLang] = useState<LanguageCode>(portalLang);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'analyzing' | 'speaking'>('idle');
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [detectedVoiceLang, setDetectedVoiceLang] = useState<LanguageCode>(portalLang);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeSources, setActiveSources] = useState<VerifiedSource[] | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Sync with global portal language when changed
  useEffect(() => {
    setLang(portalLang);
    setDetectedVoiceLang(portalLang);
  }, [portalLang]);

  useEffect(() => {
    const welcomeByLang: Record<LanguageCode, { text: string; actions: string[] }> = {
      en: {
        text: 'Namaskar! I am **CoopSathi AI**, the official Government LLM & Legal Assistance Terminal for the Ministry of Cooperation, Government of India.\n\nI am grounded in official statutory gazettes, including the **Multi-State Co-operative Societies (Amendment) Act 2023**, **Model By-laws for PACS**, and **PMFBY Operational Guidelines**.\n\nYou can speak using **Voice Chat** or type below in any Indian language.',
        actions: [
          'How do I check my voting rights in a cooperative society under Section 29?',
          'What are the 25+ services available at computerized PACS?',
          'How to report crop loss within 72 hours under PMFBY?',
          'Explain the 4% KCC Prompt Repayment Interest Subvention Scheme',
          'How to file a statutory grievance with the Cooperative Ombudsman (Form VI)?'
        ]
      },
      hi: {
        text: 'नमस्कार! मैं **कूपसाथी AI** हूँ, सहकारिता मंत्रालय, भारत सरकार का आधिकारिक विधिक एवं योजना सहायक।\n\nमैं आधिकारिक सरकारी राजपत्रों, जैसे **बहु-राज्य सहकारी सोसायटी अधिनियम 2023**, **मॉडल पैक्स उपनियम**, और **पीएम फसल बीमा योजना** के आधार पर सटीक उत्तर देता हूँ।\n\nआप **वॉइस चैट (Voice Chat)** से बोलकर या लिखकर अपनी भाषा में प्रश्न पूछ सकते हैं।',
        actions: [
          'धारा 29 के तहत सहकारी समिति में मतदान अधिकार कैसे प्राप्त करें?',
          'कम्प्यूटरीकृत पैक्स (PACS) में कौन-कौन सी 25+ सेवाएं उपलब्ध हैं?',
          'फसल नुकसान होने पर 72 घंटे में PMFBY क्लेम कैसे दर्ज करें?',
          '4% केसीसी (KCC) ब्याज अनुदान योजना की पात्रता क्या है?',
          'सहकारी लोकपाल (Ombudsman) के पास प्रपत्र VI में शिकायत कैसे दर्ज करें?'
        ]
      },
      mr: {
        text: 'नमस्कार! मी **कूपसाथी AI** आहे, सहकार मंत्रालय, भारत सरकारचा अधिकृत कायदेशीर व योजना साहाय्यक.\n\nमी **बहुराज्य सहकारी संस्था कायदा २०२३**, **आदर्श पॅक्स उपविधी**, आणि **पीएम पीक विमा योजना** या अधिकृत शासकीय राजपत्रानुसार अचूक मार्गदर्शन करतो.\n\nतुम्ही **व्हॉईस चॅट (Voice Chat)** वापरून आवाजाने विचारू शकता किंवा खाली टाईप करू शकता.',
        actions: [
          'कलम २९ नुसार सहकारी संस्थेत मतदानाचा हक्क कसा मिळतो?',
          'संगणकीकृत पॅक्स (PACS) मध्ये मिळणाऱ्या २५+ सेवा कोणत्या?',
          'नैसर्गिक आपत्ती आल्यास ७२ तासांच्या आत पीक विमा क्लेम कसा करावा?',
          '४% केसीसी (KCC) व्याज सवलत योजना काय आहे?',
          'सहकारी लोकपाल (Ombudsman) कडे प्रपत्र VI द्वारे तक्रार कशी करावी?'
        ]
      },
      gu: {
        text: 'નમસ્કાર! હું **CoopSathi AI** છું, સહકાર મંત્રાલય, ભારત સરકારનો સત્તાવાર ડિજિટલ સહાયક.\n\nહું **MSCS અધિનિયમ 2023**, **PACS મોડેલ પેટા-નિયમો**, અને **PM ફસલ બીમા યોજના** ના આધારે સત્તાવાર સલાહ આપું છું.\n\nતમે **વોઇસ ચેટ (Voice Chat)** થી બોલીને અથવા નીચે લખીને પૂછી શકો છો.',
        actions: [
          'કલમ 29 હેઠળ સહકારી મંડળીમાં મતદાન અધિકાર કેવી રીતે મળે?',
          'PACS માં મળતી 25+ કોમન સર્વિસ સેન્ટર સેવાઓ કઈ છે?',
          'પાક નુકસાન થાય તો 72 કલાકમાં વીમા ક્લેમ કેવી રીતે કરવો?',
          '4% KCC વ્યાજ સહાય યોજના વિશે જણાવો',
          'સહકારી લોકપાલ પાસે ફરિયાદ કેવી રીતે કરવી?'
        ]
      },
      ta: {
        text: 'வணக்கம்! நான் **CoopSathi AI**, இந்திய அரசின் கூட்டுறவு அமைச்சகத்தின் அதிகாரப்பூர்வ மெய்நிகர் உதவியாளர்.\n\nசட்டப்பூர்வ அரசு ஆவணங்கள் அடிப்படையில் பதிலளிக்கிறேன். நீங்கள் குரல் வழியிலோ அல்லது தட்டச்சு செய்தோ வினாக்களை எழுப்பலாம்.',
        actions: [
          'பிரிவு 29 கீழ் வாக்குரிமை பெறுவது எப்படி?',
          'PACS கணினிமயமாக்கலில் கிடைக்கும் 25+ சேவைகள் எவை?',
          '72 மணி நேரத்திற்குள் பயிர் இழப்பை எவ்வாறு தெரிவிப்பது?',
          '4% KCC பயிர்க்கடன் வட்டி மானியம் பெறுவது எப்படி?'
        ]
      },
      te: {
        text: 'నమస్కారం! నేను **CoopSathi AI**, భారత ప్రభుత్వ సహకార మంత్రిత్వ శాఖ అధికారిక సహాయకుడిని.\n\nఅధికారిక గెజిట్‌ల ఆధారంగా సమాధానాలు ఇస్తాను. మీరు వాయిస్ చాట్ ద్వారా మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు.',
        actions: [
          'సెక్షన్ 29 ప్రకారం ఓటు హక్కు ఎలా పొందాలి?',
          'కంప్యూటరీకరించిన PACS లో లభించే 25+ సేవలు ఏమిటి?',
          '72 గంటల్లో పంట నష్టం సమాచారం ఎలా నమోదు చేయాలి?',
          '4% KCC వడ్డీ రాయితీ గురించి వివరించండి'
        ]
      },
      bn: {
        text: 'নমস্কার! আমি **CoopSathi AI**, ভারত সরকারের সমবায় মন্ত্রকের অফিসিয়াল ডিজিটাল সহায়ক।\n\nআপনি ভয়েস চ্যাটে মুখে বলে বা নিচে টাইপ করে আপনার প্রশ্ন জিজ্ঞাসা করতে পারেন।',
        actions: [
          'ধারা ২৯ অনুযায়ী ভোটাধিকার কীভাবে নিশ্চিত করবেন?',
          'ডিজিটাল প্যাক্সে (PACS) ২৫+ সেবা কী কী পাওয়া যায়?',
          '৭২ ঘণ্টার মধ্যে ফসল বিমা ক্ষতিপূরণ দাবি কীভাবে করবেন?',
          '৪% KCC সুদের ভর্তুকি প্রকল্প কীভাবে কাজ করে?'
        ]
      }
    };

    const current = welcomeByLang[lang] || welcomeByLang.en;
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: current.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        isVerified: true,
        suggestedActions: current.actions
      }
    ]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, voiceActive]);

  const handleSend = async (customQuery?: string, overrideLang?: LanguageCode) => {
    const textToSend = (customQuery || input).trim();
    if (!textToSend || loading) return;

    const targetLang = overrideLang || lang;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      language: targetLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiChatService.generateResponse(textToSend, targetLang);
      setMessages(prev => [...prev, response]);

      // If in Voice Mode, speak the reply in the preferred/detected language automatically
      if (voiceActive) {
        setVoiceStatus('speaking');
        speechService.speak(
          response.text,
          response.language || targetLang,
          () => {
            setVoiceStatus('speaking');
            setSpeakingId(response.id);
          },
          () => {
            setVoiceStatus('idle');
            setSpeakingId(null);
          },
          () => {
            setVoiceStatus('idle');
            setSpeakingId(null);
          }
        );
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: targetLang === 'mr'
            ? 'माहिती मिळवण्यात अडचण येत आहे. कृपया किसान कॉल सेंटर १८००-१८०-१५५१ वर संपर्क साधा.'
            : targetLang === 'hi'
            ? 'जानकारी प्राप्त करने में असमर्थ। कृपया किसान कॉल सेंटर 1800-180-1551 पर संपर्क करें।'
            : 'I am currently synthesizing official guidelines offline. For urgent queries, please call the Kisan Call Centre at 1800-180-1551.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: targetLang
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Voice Chat Session
   * Listens to speech, analyzes voice language, changes reply language, and speaks response aloud
   */
  const startVoiceChatSession = () => {
    setVoiceActive(true);
    setVoiceStatus('listening');
    setSpokenTranscript('');
    speechService.stop();

    recognitionRef.current = speechService.startListening(
      lang,
      (transcript, detectedLang) => {
        setSpokenTranscript(transcript);
        setVoiceStatus('analyzing');
        setDetectedVoiceLang(detectedLang);

        if (detectedLang && detectedLang !== lang) {
          setLang(detectedLang);
        }

        setTimeout(() => {
          handleSend(transcript, detectedLang);
        }, 500);
      },
      (err) => {
        console.warn('Voice speech error:', err);
        setVoiceStatus('idle');
      },
      () => {
        if (voiceStatus === 'listening') {
          setVoiceStatus('idle');
        }
      }
    );
  };

  const stopVoiceChat = () => {
    recognitionRef.current?.stop();
    speechService.stop();
    setVoiceActive(false);
    setVoiceStatus('idle');
    setSpeakingId(null);
  };

  const handleSpeak = (msgId: string, text: string, msgLang?: LanguageCode) => {
    if (speakingId === msgId) {
      speechService.stop();
      setSpeakingId(null);
    } else {
      setSpeakingId(msgId);
      speechService.speak(
        text,
        msgLang || lang,
        () => setSpeakingId(msgId),
        () => setSpeakingId(null),
        () => setSpeakingId(null)
      );
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 min-h-[85vh] flex flex-col" id="main-content">
      <SEOHead
        title="CoopSathi AI Voice & Chat Terminal — Ministry of Cooperation, GoI"
        description="Interact with the official Government LLM chatbot for Ministry of Cooperation. Voice chat and text assistance in Hindi, Marathi, Gujarati, English, and other regional languages."
        canonical="https://coopsathi.gov.in/chat"
        schemaType="WebPage"
      />

      {/* Header & Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-3xl text-emerald-700">smart_toy</span>
            CoopSathi AI — Multilingual Voice &amp; Chat Terminal
          </h1>
          <p className="text-ink-500 text-xs sm:text-sm mt-1">
            Grounded in verified gazettes of the Ministry of Cooperation &amp; NCCT, Government of India
          </p>
        </div>

        {/* Voice Chat Launch & Language Selection */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          {/* Prominent Voice Chat Option Button */}
          <button
            onClick={voiceActive ? stopVoiceChat : startVoiceChatSession}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition shadow-sm border ${
              voiceActive
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-600'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {voiceActive ? 'mic' : 'settings_voice'}
            </span>
            <span>{voiceActive ? 'Stop Voice Mode' : 'Start Voice Chat'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 border border-ink-200 bg-white rounded-lg px-2.5 py-1">
            <span className="material-symbols-outlined text-base text-emerald-700">translate</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LanguageCode)}
              className="text-xs bg-transparent text-ink-800 focus:outline-none font-semibold cursor-pointer border-0 py-1"
              aria-label="Select Assistant Language"
            >
              {supportedLanguages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Terminal Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-ink-200 flex flex-col md:flex-row overflow-hidden min-h-[600px] relative">
        {/* Left: Chat Flow */}
        <div className="flex-1 flex flex-col relative">
          {/* VOICE CHAT INTERACTIVE BANNER WHEN ACTIVE */}
          {voiceActive && (
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white px-6 py-4 border-b border-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                    <span>Voice Chat Active</span>
                    <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded border border-emerald-700">
                      Analyzing Language: {supportedLanguages.find(l => l.code === detectedVoiceLang)?.name || detectedVoiceLang}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5">
                    {voiceStatus === 'listening' && 'Listening to your microphone... (speak now)'}
                    {voiceStatus === 'analyzing' && `Voice detected. Synthesizing response in ${detectedVoiceLang.toUpperCase()}...`}
                    {voiceStatus === 'speaking' && 'Speaking reply in your preferred language...'}
                    {voiceStatus === 'idle' && 'Waiting for your speech. Click Speak Again below.'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={startVoiceChatSession}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-full text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span className="material-symbols-outlined text-sm">replay</span>
                  Speak Again
                </button>
                <button
                  onClick={stopVoiceChat}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold transition"
                >
                  Close Voice
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-ink-50/30 flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-2xl p-4 text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white self-end rounded-br-sm'
                    : 'bg-white border border-ink-200 text-ink-800 self-start rounded-bl-sm'
                }`}
              >
                {/* Formatted Text */}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text.split('\n').map((line, i) => {
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className="mb-1.5 last:mb-0">
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={j} className={msg.sender === 'user' ? 'text-white font-bold' : 'text-ink-900 font-bold'}>
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>

                {/* Assistant Verification & Voice Controls */}
                {msg.sender === 'assistant' && (
                  <div className="mt-3 pt-2.5 border-t border-ink-100 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px]">{msg.timestamp}</span>
                      {msg.isVerified && (
                        <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          Gazette Grounded
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.sources && msg.sources.length > 0 && (
                        <button
                          onClick={() => setActiveSources(msg.sources || null)}
                          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold text-xs hover:underline"
                        >
                          <span className="material-symbols-outlined text-sm">library_books</span>
                          {msg.sources.length} Verified Sources
                        </button>
                      )}

                      <button
                        onClick={() => handleSpeak(msg.id, msg.text, msg.language)}
                        className="p-1 rounded hover:bg-ink-100 text-ink-600 transition"
                        title={speakingId === msg.id ? 'Stop audio' : 'Listen with native voice'}
                        aria-label="Listen to response"
                      >
                        <span className="material-symbols-outlined text-base">
                          {speakingId === msg.id ? 'volume_off' : 'volume_up'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested Action Buttons */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-ink-100 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(action)}
                        className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full transition"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="bg-white border border-ink-200 text-ink-600 self-start rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <span className="material-symbols-outlined animate-spin text-xl text-emerald-700">sync</span>
                <span className="text-sm font-medium">Synthesizing Government Gazettes &amp; Schematics...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Voice Controls */}
          <div className="p-4 bg-white border-t border-ink-100 flex items-center gap-2">
            <button
              onClick={startVoiceChatSession}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition flex-shrink-0 ${
                voiceActive
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
              title="Speak via Voice Chat"
              aria-label="Voice input"
            >
              <span className="material-symbols-outlined text-xl">
                {voiceActive ? 'mic' : 'settings_voice'}
              </span>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about PACS, PMFBY, KCC loans, or cooperative laws..."
              className="flex-1 bg-ink-50 border border-ink-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-ink-900"
              aria-label="Type your cooperative question"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="w-11 h-11 bg-emerald-700 hover:bg-emerald-800 disabled:bg-ink-200 text-white rounded-full flex items-center justify-center transition flex-shrink-0"
              aria-label="Send query"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar: Quick Topic Explorer & Helpline Cards */}
        <aside className="w-full md:w-80 border-t md:border-t-0 md:border-l border-ink-200 bg-ink-50/60 p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-3">
              Statutory Knowledge Bases
            </h2>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleSend('Tell me about the MSCS Act 2023 and voting rights')}
                className="w-full text-left p-2.5 rounded-lg border border-ink-200 bg-white hover:border-emerald-400 transition"
              >
                <div className="font-semibold text-ink-900">MSCS Act 2023</div>
                <div className="text-[11px] text-ink-500 mt-0.5">Section 29, 45, 85 guidelines</div>
              </button>
              <button
                onClick={() => handleSend('What are the services under PACS computerization?')}
                className="w-full text-left p-2.5 rounded-lg border border-ink-200 bg-white hover:border-emerald-400 transition"
              >
                <div className="font-semibold text-ink-900">PACS Modernization</div>
                <div className="text-[11px] text-ink-500 mt-0.5">₹2,516 Cr Common ERP &amp; 25+ services</div>
              </button>
              <button
                onClick={() => handleSend('What is the 72-hour crop loss intimation rule under PMFBY?')}
                className="w-full text-left p-2.5 rounded-lg border border-ink-200 bg-white hover:border-emerald-400 transition"
              >
                <div className="font-semibold text-ink-900">PMFBY Crop Insurance</div>
                <div className="text-[11px] text-ink-500 mt-0.5">72-Hour Calamity Intimation rule</div>
              </button>
              <button
                onClick={() => handleSend('How does KCC 4% interest subvention work?')}
                className="w-full text-left p-2.5 rounded-lg border border-ink-200 bg-white hover:border-emerald-400 transition"
              >
                <div className="font-semibold text-ink-900">Kisan Credit Card (MISS)</div>
                <div className="text-[11px] text-ink-500 mt-0.5">4% per annum prompt repayment rate</div>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink-200 text-[11px] text-ink-500 space-y-1">
            <div className="font-bold text-ink-700">Official Helplines:</div>
            <div>Kisan Call Centre: <strong className="text-ink-900 font-mono">1800-180-1551</strong></div>
            <div>PMFBY Desk: <strong className="text-ink-900 font-mono">14447</strong></div>
            <div>CRCS Helpline: <strong className="text-ink-900 font-mono">1800 103 6891</strong></div>
          </div>
        </aside>
      </div>

      {/* Sources Modal */}
      {activeSources && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700">verified</span>
                Verified Statutory Sources
              </h2>
              <button
                onClick={() => setActiveSources(null)}
                className="text-ink-400 hover:text-ink-900"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {activeSources.map((src, i) => (
                <div key={i} className="p-3.5 border border-ink-200 rounded-xl bg-ink-50/50 text-xs">
                  <div className="font-bold text-ink-900 text-sm">{src.title}</div>
                  <div className="text-emerald-800 font-semibold text-[11px] mt-0.5">
                    {src.authority} • {src.actOrScheme}
                  </div>
                  <div className="text-ink-500 text-[11px] mt-0.5">{src.sectionOrDoc}</div>
                  <p className="mt-2 text-ink-700 italic bg-white p-2.5 rounded border border-ink-100 text-[11px]">
                    "{src.excerpt}"
                  </p>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-emerald-700 hover:underline font-semibold text-xs"
                  >
                    <span>View Official Government Document</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
