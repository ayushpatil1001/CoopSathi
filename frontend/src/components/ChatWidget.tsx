import React, { useState, useRef, useEffect } from 'react';
import { aiChatService } from '../services/aiChatService';
import { speechService } from '../services/speechService';
import { ChatMessage, LanguageCode, VerifiedSource } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function ChatWidget() {
  const { language: portalLang, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [voiceModeActive, setVoiceModeActive] = useState(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'analyzing' | 'speaking'>('idle');
  const [detectedVoiceLang, setDetectedVoiceLang] = useState<LanguageCode>(portalLang);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const [lang, setLang] = useState<LanguageCode>(portalLang);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showSources, setShowSources] = useState<VerifiedSource[] | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Sync with global portal language when changed
  useEffect(() => {
    setLang(portalLang);
    setDetectedVoiceLang(portalLang);
  }, [portalLang]);

  // Set welcome message based on active language
  useEffect(() => {
    const welcomeMessages: Record<LanguageCode, string> = {
      en: 'Namaskar! I am **CoopSathi AI**, your official statutory assistant for the Ministry of Cooperation. Speak via Voice Chat or type your question about PACS, PMFBY, KCC loans, or cooperative laws.',
      hi: 'नमस्कार! मैं **कूपसाथी AI** हूँ, सहकारिता मंत्रालय का आधिकारिक सहायक। आप बोलकर (Voice Chat) या लिखकर पैक्स (PACS), पीएम फसल बीमा, केसीसी अथवा सहकारी कानूनों के बारे में पूछ सकते हैं।',
      mr: 'नमस्कार! मी **कूपसाथी AI** आहे, सहकार मंत्रालयाचा अधिकृत डिजिटल मित्र. तुम्ही बोलून (Voice Chat) किंवा टाईप करून पॅक्स (PACS), पीक विमा, केसीसी कर्ज अथवा सहकारी नियमांविषयी विचारू शकता.',
      gu: 'નમસ્કાર! હું **CoopSathi AI** છું, સહકાર મંત્રાલયનો સત્તાવાર ડિજિટલ સહાયક. તમે બોલીને (Voice Chat) અથવા લખીને PACS, પાક વીમા, KCC અથવા સહકારી નિયમો વિશે પૂછી શકો છો.',
      ta: 'வணக்கம்! நான் **CoopSathi AI**, கூட்டுறவு அமைச்சகத்தின் அதிகாரப்பூர்வ மெய்நிகர் உதவியாளர். நீங்கள் குரல் மூலமாகவோ தட்டச்சு செய்தோ வினாக்களை கேட்கலாம்.',
      te: 'నమస్కారం! నేను **CoopSathi AI**, సహకార మంత్రిత్వ శాఖ అధికారిక సహాయకుడిని. వాయిస్ ద్వారా లేదా టైప్ చేసి మీ ప్రశ్నలను అడగండి.',
      bn: 'নমস্কার! আমি **CoopSathi AI**, সমবায় মন্ত্রকের অফিসিয়াল ডিজিটাল সহায়ক। মুখে বলে বা লিখে আপনার প্রশ্ন জিজ্ঞাসা করুন।'
    };

    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: welcomeMessages[lang] || welcomeMessages.en,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        isVerified: true,
        suggestedActions: [
          'PACS Modernization ₹2,516 Cr',
          'PMFBY 72-Hour Calamity Rule',
          'KCC 4% Interest Subvention',
          'Cooperative Member Voting Rights'
        ]
      }
    ]);
  }, [lang]);

  useEffect(() => {
    if (isOpen && !voiceModeActive) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, voiceModeActive]);

  // Clean up speech when widget closes
  useEffect(() => {
    if (!isOpen) {
      speechService.stop();
      recognitionRef.current?.stop();
      setVoiceModeActive(false);
      setVoiceState('idle');
      setSpeakingId(null);
    }
  }, [isOpen]);

  const handleSend = async (queryText?: string, overrideLang?: LanguageCode) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    const targetLang = overrideLang || lang;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      language: targetLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const botReply = await aiChatService.generateResponse(textToSend, targetLang);
      setMessages(prev => [...prev, botReply]);

      // If in Voice Mode or auto-speak is requested, speak the reply in the preferred language
      if (voiceModeActive) {
        setVoiceState('speaking');
        speechService.speak(
          botReply.text,
          botReply.language || targetLang,
          () => {
            setVoiceState('speaking');
            setSpeakingId(botReply.id);
          },
          () => {
            setVoiceState('idle');
            setSpeakingId(null);
          },
          () => {
            setVoiceState('idle');
            setSpeakingId(null);
          }
        );
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: targetLang === 'mr'
          ? 'माहिती मिळवण्यात अडचण येत आहे. कृपया किसान कॉल सेंटर १८००-१८०-१५५१ वर संपर्क साधा.'
          : targetLang === 'hi'
          ? 'जानकारी प्राप्त करने में असमर्थ। कृपया किसान कॉल सेंटर 1800-180-1551 पर संपर्क करें।'
          : 'Unable to retrieve live advisory. Please contact the Kisan Call Centre at 1800-180-1551.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: targetLang
      };
      setMessages(prev => [...prev, errorMsg]);
      if (voiceModeActive) {
        speechService.speak(errorMsg.text, targetLang);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Start Voice Chat Session
   * Listens to the user, analyzes the voice language, sets reply language accordingly, and speaks the response back.
   */
  const startVoiceChatSession = () => {
    setVoiceModeActive(true);
    setVoiceState('listening');
    setVoiceTranscript('');
    speechService.stop();

    recognitionRef.current = speechService.startListening(
      lang,
      (transcript, detectedLang) => {
        setVoiceTranscript(transcript);
        setVoiceState('analyzing');
        setDetectedVoiceLang(detectedLang);

        // Update active language to match what was spoken
        if (detectedLang && detectedLang !== lang) {
          setLang(detectedLang);
        }

        setTimeout(() => {
          handleSend(transcript, detectedLang);
        }, 500);
      },
      (err) => {
        console.warn('Voice chat error:', err);
        setVoiceState('idle');
      },
      () => {
        if (voiceState === 'listening') {
          setVoiceState('idle');
        }
      }
    );
  };

  const stopVoiceChat = () => {
    recognitionRef.current?.stop();
    speechService.stop();
    setVoiceState('idle');
    setVoiceModeActive(false);
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

  const getLanguageLabel = (code: LanguageCode): string => {
    const found = supportedLanguages.find(l => l.code === code);
    return found ? `${found.nativeName} (${found.name})` : code;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 z-50 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label={isOpen ? 'Close CoopSathi AI Assistant' : 'Open CoopSathi AI Assistant'}
        title="CoopSathi AI — Official Voice & Chat Assistant"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      {/* Floating Chat Container */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-3 sm:right-6 w-[94vw] sm:w-[430px] h-[580px] max-h-[84vh] bg-white rounded-2xl shadow-2xl border border-ink-200 flex flex-col z-50 overflow-hidden animate-fadeIn"
          role="dialog"
          aria-label="CoopSathi AI Chat Assistant"
        >
          {/* Header */}
          <div className="bg-emerald-900 text-white p-3.5 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-xs tracking-tight">CoopSathi AI</h2>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-800 text-[9px] font-mono border border-emerald-700 uppercase">Gov RAG</span>
                </div>
                <p className="text-[10px] text-emerald-200">Ministry of Cooperation, GoI</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Chat Mode Toggle Button */}
              <button
                onClick={voiceModeActive ? stopVoiceChat : startVoiceChatSession}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition ${
                  voiceModeActive
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border-emerald-700'
                }`}
                title="Start Voice Chat with Speech Recognition & Audio Reply"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {voiceModeActive ? 'mic' : 'settings_voice'}
                </span>
                <span>{voiceModeActive ? 'Live Voice' : 'Voice Chat'}</span>
              </button>

              {/* Language Selector */}
              <select
                aria-label="Assistant Language"
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className="bg-emerald-800 text-white text-[11px] font-medium rounded px-2 py-0.5 border border-emerald-700 focus:outline-none"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-emerald-800 flex items-center justify-center text-emerald-200 hover:text-white transition"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* DEDICATED VOICE CHAT OVERLAY */}
          {voiceModeActive && (
            <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-ink-900 text-white p-6 flex flex-col items-center justify-between flex-1 relative animate-fadeIn">
              {/* Top status indicator */}
              <div className="w-full flex items-center justify-between text-xs text-emerald-300 border-b border-emerald-800/80 pb-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Voice Assistant Active
                </span>
                <span className="text-[11px] bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">
                  Language: {getLanguageLabel(detectedVoiceLang)}
                </span>
              </div>

              {/* Center Animated Voice Pulsar */}
              <div className="my-auto flex flex-col items-center text-center px-4">
                <div className="relative flex items-center justify-center mb-6">
                  {voiceState === 'listening' && (
                    <>
                      <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-ping"></div>
                      <div className="absolute w-24 h-24 rounded-full bg-emerald-500/30 animate-pulse"></div>
                    </>
                  )}
                  {voiceState === 'speaking' && (
                    <>
                      <div className="absolute w-28 h-28 rounded-full bg-amber-400/20 animate-ping"></div>
                      <div className="absolute w-24 h-24 rounded-full bg-amber-400/30 animate-pulse"></div>
                    </>
                  )}
                  <button
                    onClick={voiceState === 'listening' ? () => recognitionRef.current?.stop() : startVoiceChatSession}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform transform active:scale-95 ${
                      voiceState === 'listening'
                        ? 'bg-rose-600 text-white'
                        : voiceState === 'speaking'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-4xl">
                      {voiceState === 'listening' ? 'mic' : voiceState === 'speaking' ? 'volume_up' : 'mic'}
                    </span>
                  </button>
                </div>

                <div className="font-bold text-base mb-1">
                  {voiceState === 'listening' && 'Listening to your voice...'}
                  {voiceState === 'analyzing' && 'Analyzing voice language...'}
                  {voiceState === 'speaking' && 'Speaking answer in your preferred language...'}
                  {voiceState === 'idle' && 'Tap microphone to speak'}
                </div>

                <p className="text-xs text-emerald-200 max-w-xs leading-relaxed min-h-[36px]">
                  {voiceTranscript ? `"${voiceTranscript}"` : 'Speak in English, हिन्दी, मराठी, ગુજરાતી, தமிழ், etc.'}
                </p>
              </div>

              {/* Bottom Voice Controls */}
              <div className="w-full flex items-center justify-center gap-3 pt-3 border-t border-emerald-800/80">
                <button
                  onClick={startVoiceChatSession}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-full text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <span className="material-symbols-outlined text-sm">replay</span>
                  Speak Again
                </button>
                <button
                  onClick={stopVoiceChat}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold text-white transition"
                >
                  Switch to Text
                </button>
              </div>
            </div>
          )}

          {/* NORMAL TEXT / MESSAGE STREAM */}
          {!voiceModeActive && (
            <>
              {/* Messages Scroll Area */}
              <div className="flex-1 p-3.5 overflow-y-auto bg-ink-50/40 flex flex-col gap-3 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`max-w-[88%] rounded-xl p-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-800 text-white self-end rounded-br-none'
                        : 'bg-white border border-ink-200 text-ink-800 self-start rounded-bl-none'
                    }`}
                  >
                    {/* Message Text */}
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text.split('\n').map((line, i) => {
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={i} className="mb-1 last:mb-0">
                            {parts.map((p, j) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return (
                                  <strong key={j} className={msg.sender === 'user' ? 'text-white font-bold' : 'text-ink-900 font-bold'}>
                                    {p.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return p;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    {/* Assistant Footer (Citations & Voice Playback) */}
                    {msg.sender === 'assistant' && (
                      <div className="mt-2 pt-2 border-t border-ink-100 flex items-center justify-between text-[10px] text-ink-400">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono">{msg.timestamp}</span>
                          {msg.isVerified && (
                            <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold">
                              <span className="material-symbols-outlined text-[12px]">verified</span>
                              Gazette Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {msg.sources && msg.sources.length > 0 && (
                            <button
                              onClick={() => setShowSources(msg.sources || null)}
                              className="text-emerald-800 font-semibold hover:underline flex items-center gap-0.5 text-[10px]"
                            >
                              <span className="material-symbols-outlined text-[12px]">library_books</span>
                              {msg.sources.length} Sources
                            </button>
                          )}

                          <button
                            onClick={() => handleSpeak(msg.id, msg.text, msg.language)}
                            className="w-6 h-6 rounded hover:bg-ink-100 flex items-center justify-center text-ink-600 transition"
                            title={speakingId === msg.id ? 'Stop audio' : 'Listen with native voice'}
                            aria-label="Read message aloud"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              {speakingId === msg.id ? 'volume_off' : 'volume_up'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Suggested Action Chips */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-ink-100 flex flex-wrap gap-1">
                        {msg.suggestedActions.map((action, k) => (
                          <button
                            key={k}
                            onClick={() => handleSend(action)}
                            className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full transition"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="bg-white border border-ink-200 text-ink-600 self-start rounded-xl p-3 shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-base text-emerald-700">sync</span>
                    <span className="text-[11px] font-medium">Synthesizing Government Gazettes &amp; Schematics...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Sources Modal */}
              {showSources && (
                <div className="absolute inset-0 bg-white z-20 flex flex-col p-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-ink-100">
                    <h3 className="font-bold text-xs text-ink-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-emerald-700">menu_book</span>
                      Statutory Sources &amp; Gazettes
                    </h3>
                    <button
                      onClick={() => setShowSources(null)}
                      className="text-ink-400 hover:text-ink-900"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
                    {showSources.map((src, i) => (
                      <div key={i} className="p-2.5 border border-ink-200 rounded-lg bg-ink-50/50 text-[11px]">
                        <div className="font-bold text-ink-900">{src.title}</div>
                        <div className="text-[10px] text-emerald-800 font-medium">{src.authority} • {src.actOrScheme}</div>
                        <div className="text-[10px] text-ink-500 mt-0.5">{src.sectionOrDoc}</div>
                        <p className="mt-1 text-ink-700 italic text-[10px]">"{src.excerpt}"</p>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-0.5 text-[10px] text-emerald-700 hover:underline font-semibold"
                        >
                          <span>Verify on Official Portal</span>
                          <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Bar */}
              <div className="p-2.5 bg-white border-t border-ink-100 flex items-center gap-1.5">
                <button
                  onClick={startVoiceChatSession}
                  className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center transition"
                  title="Speak via Voice Chat"
                  aria-label="Voice input"
                >
                  <span className="material-symbols-outlined text-lg">mic</span>
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about PACS, PMFBY, KCC, laws..."
                  className="flex-1 bg-ink-50 border border-ink-200 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-ink-900"
                  aria-label="Type your cooperative query"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 bg-emerald-700 hover:bg-emerald-800 disabled:bg-ink-200 text-white rounded-full flex items-center justify-center transition"
                  aria-label="Send message"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
