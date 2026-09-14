import React, { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Namaskar! I am CoopSathi AI, the official Government LLM assistant for the Ministry of Cooperation. How can I help you with our schemes and services today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${SUPABASE_URL}/functions/v1/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting to the Government LLM.' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Network error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 h-[85vh] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-emerald-700">smart_toy</span>
          CoopSathi AI Chat
        </h1>
        <p className="text-ink-500 text-sm mt-1">Official Government LLM Assistant powered by Gemini & Ministry of Cooperation Database</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-ink-200 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-ink-50/30 flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`max-w-[85%] rounded-2xl p-4 text-sm ${msg.role === 'user' ? 'bg-emerald-100/60 text-emerald-950 self-end rounded-br-sm' : 'bg-white border border-ink-200 text-ink-800 self-start rounded-bl-sm shadow-sm'}`}>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {msg.text.split('\n').map((line, i) => {
                   const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                     if (part.startsWith('**') && part.endsWith('**')) {
                       return <strong key={j} className="text-ink-900">{part.slice(2, -2)}</strong>;
                     }
                     return part;
                   });
                   return <p key={i} className="mb-1.5 last:mb-0">{formattedLine}</p>;
                })}
              </div>
            </div>
          ))}
          {loading && (
            <div className="bg-white border border-ink-200 text-ink-500 self-start rounded-2xl rounded-bl-sm shadow-sm p-4 text-sm flex items-center gap-3">
              <span className="material-symbols-outlined animate-spin text-xl text-emerald-600">sync</span>
              <span className="text-sm font-medium">Consulting Government Schemes...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-ink-100 flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question about PMFBY, PACS, or KCC here..."
            className="flex-1 bg-ink-50 border border-ink-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-ink-900 shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-ink-300 text-white rounded-lg px-6 flex items-center justify-center transition-colors font-semibold shadow-sm"
          >
            <span className="material-symbols-outlined mr-2">send</span>
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
