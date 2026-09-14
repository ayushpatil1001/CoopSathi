import React, { useState } from 'react';
import { Bot, User, Volume2, Square, Copy, Check, ThumbsUp, ThumbsDown, ShieldCheck, ChevronDown, ChevronUp, ExternalLink, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage, LanguageCode, VerifiedSource } from '../../types';
import { speechService } from '../../services/speechService';

interface ChatMessageItemProps {
  message: ChatMessage;
  currentLang: LanguageCode;
  onViewSource: (source: VerifiedSource) => void;
  onSelectAction?: (actionText: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  currentLang,
  onViewSource,
  onSelectAction,
  onDeleteMessage,
}) => {
  const isAssistant = message.sender === 'assistant';
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'unhelpful' | null>(message.feedback || null);
  const [showSources, setShowSources] = useState(false);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speechService.speak(
      message.text,
      message.language || currentLang,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to format basic markdown (bold, lists)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const italicLine = formattedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        return (
          <li
            key={idx}
            className="ml-4 list-disc my-1"
            dangerouslySetInnerHTML={{ __html: italicLine.replace(/^[-•]\s*/, '') }}
          />
        );
      }
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div
            key={idx}
            className="ml-2 my-1.5 font-medium"
            dangerouslySetInnerHTML={{ __html: italicLine }}
          />
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p
          key={idx}
          className="my-1 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: italicLine }}
        />
      );
    });
  };

  return (
    <div className={`flex items-start space-x-3 my-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#134A7B] text-white flex items-center justify-center shadow-md shrink-0 mt-1">
          <Bot className="w-5 h-5 text-amber-300" />
        </div>
      )}

      <div className={`max-w-2xl w-full ${isAssistant ? '' : 'flex flex-col items-end'}`}>
        {/* Message bubble */}
        <div
          className={`rounded-2xl p-4 sm:p-5 shadow-gov transition-all ${
            isAssistant
              ? 'bg-white text-slate-800 border-2 border-slate-200/90 rounded-tl-xs'
              : 'bg-[#0A2540] text-white rounded-tr-xs ml-auto'
          }`}
        >
          {/* Header row for Assistant message */}
          {isAssistant && (
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-[#0A2540] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  CoopSathi AI
                </span>
                {message.isOfficialGovLLM ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-400 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>🏛️ Official Government RAG ({message.modelUsed || 'Bhashini-Aligned'})</span>
                  </span>
                ) : message.isRealTimeLLM ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>{message.modelUsed || 'Live AI'}</span>
                  </span>
                ) : message.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    ✓ Verified Government Source
                  </span>
                ) : null}
              </div>

              <span className="text-[10px] text-slate-400 font-medium">
                {message.timestamp}
              </span>
            </div>
          )}

          {/* User message header */}
          {!isAssistant && (
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/20 text-xs text-slate-200">
              <span className="font-semibold text-amber-300">You (Farmer / Member)</span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-300">{message.timestamp}</span>
                {onDeleteMessage && (
                  <button
                    onClick={() => onDeleteMessage(message.id)}
                    className="text-slate-300 hover:text-rose-300 p-0.5 rounded transition opacity-80 hover:opacity-100"
                    title="Delete this message"
                    aria-label="Delete this message"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Message Content */}
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
            {isAssistant ? (
              <div className="space-y-1">{renderFormattedText(message.text)}</div>
            ) : (
              <p className="text-white font-medium whitespace-pre-wrap">{message.text}</p>
            )}
          </div>

          {/* Suggested Actions Chips */}
          {isAssistant && message.suggestedActions && message.suggestedActions.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Suggested Next Steps:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {message.suggestedActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectAction?.(action)}
                    className="text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <span>👉</span>
                    <span>{action}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Collapsible Verified Sources Section */}
          {isAssistant && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowSources(!showSources)}
                className="flex items-center justify-between w-full text-xs font-bold text-gov-blue-800 hover:text-gov-blue-950 bg-gov-blue-50/70 p-2 rounded-lg border border-gov-blue-100 transition"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>View Official Citations & Sources ({message.sources.length})</span>
                </span>
                {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showSources && (
                <div className="mt-2 space-y-2 animate-fadeIn">
                  {message.sources.map((src) => (
                    <div
                      key={src.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0A2540]">{src.title}</span>
                        <button
                          onClick={() => onViewSource(src)}
                          className="text-[11px] text-gov-blue-700 hover:underline font-bold flex items-center gap-0.5"
                        >
                          Inspect Section <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        {src.actOrScheme} • {src.sectionOrDoc}
                      </p>
                      <p className="text-slate-600 text-[11px] italic bg-white p-2 rounded border border-slate-200 line-clamp-2">
                        "{src.excerpt}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assistant Action Bar: Audio, Copy, Feedback */}
          {isAssistant && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              {/* Left actions: Read aloud & Copy */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleAudio}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition font-semibold text-xs ${
                    isPlayingAudio
                      ? 'bg-red-100 text-red-700 font-bold border border-red-200 animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Listen to response in selected language"
                >
                  {isPlayingAudio ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-gov-blue-700" />
                      <span>Read Aloud</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  title="Copy text to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {onDeleteMessage && (
                  <button
                    onClick={() => onDeleteMessage(message.id)}
                    className="flex items-center space-x-1 px-2 py-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete this message"
                    aria-label="Delete this message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Delete</span>
                  </button>
                )}
              </div>

              {/* Right actions: Helpful / Not helpful */}
              <div className="flex items-center space-x-1.5 text-[11px]">
                <span className="text-slate-400">Helpful?</span>
                <button
                  onClick={() => setFeedback('helpful')}
                  className={`p-1 rounded hover:bg-slate-100 transition ${
                    feedback === 'helpful' ? 'text-emerald-600 font-bold' : 'text-slate-400'
                  }`}
                  title="Mark as helpful"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${feedback === 'helpful' ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setFeedback('unhelpful')}
                  className={`p-1 rounded hover:bg-slate-100 transition ${
                    feedback === 'unhelpful' ? 'text-red-500 font-bold' : 'text-slate-400'
                  }`}
                  title="Mark as not helpful"
                >
                  <ThumbsDown className={`w-3.5 h-3.5 ${feedback === 'unhelpful' ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md shrink-0 mt-1">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
