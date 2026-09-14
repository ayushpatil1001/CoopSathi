import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Mic, MicOff, Plus, Trash2, ShieldCheck, 
  Scale, FileText, Warehouse, MessageSquareText, 
  Globe, Sparkles, AlertCircle, RefreshCw, Check, X
} from 'lucide-react';
import { ChatMessage, LanguageCode, VerifiedSource, AssistantType } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';
import { aiChatService } from '../../services/aiChatService';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storageService';
import { ChatMessageItem } from './ChatMessageItem';
import { SourceDrawer } from './SourceDrawer';

interface ChatInterfaceProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  initialQuery?: string;
  initialAssistantType?: AssistantType;
  onSelectTab: (tab: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentLang,
  onSelectLang,
  initialQuery,
  initialAssistantType,
  onSelectTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechListener, setSpeechListener] = useState<{ stop: () => void } | null>(null);
  const [selectedSource, setSelectedSource] = useState<VerifiedSource | null>(null);
  const [activeCategory, setActiveCategory] = useState<AssistantType>(initialAssistantType || 'general');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-canned suggested questions
  const suggestedQuestions: Record<LanguageCode, string[]> = {
    en: [
      'What are my rights as a cooperative member?',
      'Which government schemes am I eligible for?',
      'How do I apply for PM Fasal Bima Yojana?',
      'How can I file a grievance?',
      'What services are available through PACS?'
    ],
    hi: [
      'सहकारी समिति के सदस्य के रूप में मेरे क्या अधिकार हैं?',
      'मैं किन सरकारी योजनाओं के लिए पात्र हूँ?',
      'प्रधानमंत्री फसल बीमा योजना के लिए आवेदन कैसे करें?',
      'सहकार लोकपाल या निबंधक को शिकायत कैसे दर्ज करें?',
      'पैक्स (PACS) के माध्यम से कौन सी सेवाएं उपलब्ध हैं?'
    ],
    mr: [
      'सहकारी संस्थेचा सभासद म्हणून माझे काय कायदेशीर हक्क आहेत?',
      'मी कोणत्या शासकीय योजनांसाठी पात्र आहे?',
      'प्रधानमंत्री पीक विमा योजनेसाठी अर्ज कसा करावा?',
      'सहकारी संस्थेविरुद्ध तक्रार कशी नोंदवावी?',
      'पॅक्स (PACS) कडून कोणत्या शेतकरी सेवा उपलब्ध आहेत?'
    ],
    ta: [
      'கூட்டுறவு சங்க உறுப்பினராக எனது உரிமைகள் என்ன?',
      'நான் எந்த அரசு திட்டங்களுக்கு தகுதியானவன்?',
      'பயிர் காப்பீட்டு திட்டத்திற்கு எவ்வாறு விண்ணப்பிப்பது?'
    ],
    te: [
      'సహకార సంఘం సభ్యునిగా నా హక్కులు ఏమిటి?',
      'నేను ఏ ప్రభుత్వ పథకాలకు అర్హుడను?',
      'పీఎం ఫసల్ బీమా యోజన కోసం ఎలా దరఖాస్తు చేయాలి?'
    ],
    bn: [
      'সমবায় সমিতির সদস্য হিসেবে আমার কী কী অধিকার রয়েছে?',
      'আমি কোন সরকারি প্রকল্পের জন্য যোগ্য?',
      'প্রধানমন্ত্রী ফসল বিমা যোজনার জন্য কীভাবে আবেদন করব?'
    ]
  };

  // Initialize or load conversation
  useEffect(() => {
    const saved = storageService.getChatHistory();
    if (saved && saved.length > 0) {
      setMessages(saved);
    } else {
      // Default welcome greeting
      const welcomeMsg: ChatMessage = {
        id: 'WELCOME-01',
        sender: 'assistant',
        text: getTranslation(currentLang, 'greeting'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLang,
        isVerified: true,
        confidence: 0.99,
        suggestedActions: [
          'What are my voting rights?',
          'Calculate PMFBY Premium',
          'PACS Computerization',
          'File a Grievance'
        ]
      };
      setMessages([welcomeMsg]);
      storageService.saveChatHistory([welcomeMsg]);
    }
  }, [currentLang]);

  // Handle initial query triggered from outside (e.g. Hero search or Featured assistant)
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'USER-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLang,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const aiResponse = await aiChatService.generateResponse(query, currentLang);
      const newMessages = [...updatedMessages, aiResponse];
      setMessages(newMessages);
      storageService.saveChatHistory(newMessages);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
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
        handleSendMessage(transcript);
      },
      () => {
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
    setSpeechListener(listener);
  };

  const createWelcomeMessage = (lang: LanguageCode): ChatMessage => ({
    id: 'WELCOME-01',
    sender: 'assistant',
    text: getTranslation(lang, 'greeting'),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    language: lang,
    isVerified: true,
    confidence: 0.99,
    suggestedActions: [
      'What are my voting rights?',
      'Calculate PMFBY Premium',
      'PACS Computerization',
      'File a Grievance'
    ]
  });

  const handleConfirmDeleteAllHistory = () => {
    storageService.clearChatHistory();
    const welcomeMsg = createWelcomeMessage(currentLang);
    setMessages([welcomeMsg]);
    storageService.saveChatHistory([welcomeMsg]);
    setShowDeleteModal(false);
    setToastMessage('Chat history deleted successfully');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteSingleMessage = (messageId: string) => {
    const updated = storageService.deleteChatMessage(messageId);
    if (updated.length === 0) {
      const welcomeMsg = createWelcomeMessage(currentLang);
      setMessages([welcomeMsg]);
      storageService.saveChatHistory([welcomeMsg]);
    } else {
      setMessages(updated);
    }
    setToastMessage('Message removed from chat');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCategoryFilter = (category: AssistantType, prompt: string) => {
    setActiveCategory(category);
    handleSendMessage(prompt);
  };

  return (
    <div className="bg-[#FBF9F5] min-h-[calc(100vh-140px)] flex flex-col">
      {/* Top Banner with Government & Language Indicators */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gov-blue-900 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <span>CoopSathi AI Live Assistant</span>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400 shadow-2xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>Official Government RAG LLM</span>
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Grounded in MSCS Act 2023, PMFBY Operational Guidelines & Bhashini NLU
              </p>
            </div>
          </div>

          {/* Controls: Language Switcher & Clear */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
              <Globe className="w-3.5 h-3.5 text-gov-blue-700" />
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Delete History Button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200/80 transition text-xs font-bold shadow-2xs"
              title="Delete all chat history"
              aria-label="Delete all chat history"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Delete History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Workspace Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar (Desktop & Tablet) */}
        <div className="w-full lg:w-72 bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-gov shrink-0 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* New Conversation Button */}
            <button
              onClick={() => {
                if (messages.length > 1) {
                  setShowDeleteModal(true);
                }
              }}
              className="w-full bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>New Conversation</span>
            </button>

            {/* Specialized Assistant Selectors */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 pb-1">
                Assistant Topics
              </span>
              {[
                { id: 'laws' as AssistantType, label: 'Cooperative Laws', icon: Scale, prompt: 'What are the main rules in the Multi-State Co-operative Societies Act 2023?' },
                { id: 'schemes' as AssistantType, label: 'Government Schemes', icon: FileText, prompt: 'Which central and state cooperative schemes are available right now?' },
                { id: 'pmfby' as AssistantType, label: 'PMFBY Crop Insurance', icon: ShieldCheck, prompt: 'How does PMFBY crop loss intimation work within 72 hours?' },
                { id: 'pacs' as AssistantType, label: 'PACS Services & ERP', icon: Warehouse, prompt: 'What services does a computerized PACS provide to rural members?' },
                { id: 'grievance' as AssistantType, label: 'Grievance Support', icon: MessageSquareText, prompt: 'How do I file a grievance with the Cooperative Ombudsman?' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryFilter(item.id, item.prompt)}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Clear History Sidebar Action */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-dashed border-slate-300 hover:border-rose-300 transition"
              title="Delete entire chat history"
              aria-label="Delete entire chat history"
            >
              <span className="flex items-center space-x-2">
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Delete History</span>
              </span>
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-500">
                {messages.length} msgs
              </span>
            </button>
          </div>

          {/* Bottom Sidebar Notice / Disclaimer */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center space-x-1 text-slate-700 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Legal Advisory Notice</span>
            </div>
            <p className="leading-tight">
              CoopSathi AI provides statutory guidance for informational purposes under Ministry of Cooperation norms.
            </p>
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex-1 bg-white rounded-2xl border-2 border-slate-200 shadow-gov flex flex-col h-[700px] overflow-hidden">
          {/* Scrollable Message List */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                currentLang={currentLang}
                onViewSource={(source) => setSelectedSource(source)}
                onSelectAction={(actionText) => handleSendMessage(actionText)}
                onDeleteMessage={handleDeleteSingleMessage}
              />
            ))}

            {/* Animated Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 my-4 animate-fadeIn">
                <div className="w-10 h-10 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div className="bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-2xs">
                  <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-gov-blue-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-gov-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gov-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="ml-2 text-slate-500 font-semibold">
                      Retrieving verified Ministry gazettes & guidelines...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Question Pills */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap uppercase">
              Quick:
            </span>
            {(suggestedQuestions[currentLang] || suggestedQuestions.en).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap bg-white hover:bg-amber-50 hover:text-amber-900 border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-medium shadow-2xs transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getTranslation(currentLang, 'chatPlaceholder')}
                className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-blue-600 focus:bg-white transition"
              />

              {/* Voice recognition microphone */}
              <button
                type="button"
                onClick={handleMicClick}
                className={`p-3 rounded-xl transition flex items-center justify-center ${
                  isListening
                    ? 'bg-red-500 text-white animate-bounce shadow-md ring-4 ring-red-200'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
                title={isListening ? 'Stop listening' : 'Voice Input in your language'}
                aria-label="Voice input button"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Send button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-gov-blue-900 hover:bg-gov-blue-800 disabled:opacity-40 text-white p-3 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                aria-label="Send message"
              >
                <span className="hidden sm:inline">Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {isListening && (
              <div className="mt-2 text-xs text-red-600 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  Listening in {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.name}... Speak your question clearly
                </span>
                <button
                  type="button"
                  onClick={() => setIsListening(false)}
                  className="underline hover:text-red-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal to Delete Chat History */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Delete Chat History?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete all messages from this session? This action will remove the conversation stored on your browser and cannot be undone.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAllHistory}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete History</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Source Citation Drawer Modal */}
      <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(null)} />
    </div>
  );
};
