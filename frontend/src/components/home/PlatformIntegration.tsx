import React, { useState } from 'react';
import { MessageCircle, Send, Globe, Smartphone, Check, ExternalLink } from 'lucide-react';
import { LanguageCode } from '../../types';

interface PlatformIntegrationProps {
  currentLang: LanguageCode;
  onSelectTab: (tab: string) => void;
}

export const PlatformIntegration: React.FC<PlatformIntegrationProps> = ({
  onSelectTab,
}) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (channel: string) => {
    setCopiedLink(channel);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-gov-blue-50 text-gov-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-gov-blue-200">
            <Smartphone className="w-3.5 h-3.5 text-gov-blue-700" />
            <span>Multi-Channel Citizen Access</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight">
            Available Wherever You Need Help.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Access CoopSathi AI through the web browser, official WhatsApp chatbot, or Telegram bot with zero installation barrier.
          </p>
        </div>

        {/* 3 Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Web Portal */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-gov hover:shadow-gov-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gov-blue-900 text-white flex items-center justify-center shadow-md">
                  <Globe className="w-6 h-6 text-amber-300" />
                </div>
                <span className="text-[11px] font-bold text-gov-blue-800 bg-gov-blue-50 px-2.5 py-1 rounded-full border border-gov-blue-200">
                  Full Feature Hub
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A2540]">Web Portal</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Interactive calculators, document verified citations, grievance filing wizard, and official gazette downloads.
                </p>
              </div>

              {/* Mock UI preview */}
              <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 text-xs space-y-2 font-mono text-[11px] text-slate-700">
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-[9px] ml-1">coopsathi.gov.in/chat</span>
                </div>
                <p className="text-gov-blue-900 font-sans font-medium">
                  "How to calculate PMFBY insurance premium for 3 acres?"
                </p>
                <p className="text-emerald-700 font-sans font-semibold">
                  ✓ Calculated: ₹1,440 farmer share (2% Kharif)
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('chat')}
              className="mt-6 w-full bg-gov-blue-900 hover:bg-gov-blue-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <span>Open Web Assistant</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-gov hover:shadow-gov-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Official Green Tick
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A2540]">WhatsApp Assistant</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Send voice notes in Marathi, Hindi, Tamil, or English and receive instant audio replies directly on WhatsApp.
                </p>
              </div>

              {/* Mock UI preview */}
              <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200 text-xs space-y-2 text-slate-800">
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-1 text-[11px]">
                  <span className="font-bold text-emerald-900">CoopSathi WhatsApp Bot</span>
                  <span className="text-emerald-600 font-semibold">Online</span>
                </div>
                <div className="bg-white p-2 rounded-lg text-[11px] text-slate-700 shadow-2xs">
                  🎙️ <i>Voice message (0:14)</i>: "खतांची उपलब्धता कशी तपासावी?"
                </div>
                <div className="bg-emerald-100 p-2 rounded-lg text-[11px] text-emerald-950 font-medium">
                  "तुमच्या गावातील पॅक्समध्ये आज ३४० नॅनो युरिया बाटल्या उपलब्ध आहेत."
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy('whatsapp')}
              className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{copiedLink === 'whatsapp' ? 'Opening WhatsApp (+91 14447)...' : 'Chat on WhatsApp'}</span>
              {copiedLink === 'whatsapp' && <Check className="w-4 h-4 text-amber-300" />}
            </button>
          </div>

          {/* Card 3: Telegram */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-gov hover:shadow-gov-lg transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                  <Send className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  Fast & Lightweight
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A2540]">Telegram Channel & Bot</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Low-bandwidth access, scheme notification broadcasts, and cooperative circular alert PDFs.
                </p>
              </div>

              {/* Mock UI preview */}
              <div className="bg-sky-50/70 rounded-xl p-3 border border-sky-200 text-xs space-y-2 text-slate-800">
                <div className="flex items-center justify-between border-b border-sky-200/60 pb-1 text-[11px]">
                  <span className="font-bold text-sky-900">@CoopSathiGovBot</span>
                  <span className="text-sky-600 font-semibold">Verified Bot</span>
                </div>
                <div className="bg-white p-2 rounded-lg text-[11px] text-slate-700 shadow-2xs">
                  /schemes agriculture
                </div>
                <div className="bg-sky-100 p-2 rounded-lg text-[11px] text-sky-950 font-medium">
                  📢 <b>AIF Subvention Notification:</b> 3% interest subvention for PACS warehouses released.
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCopy('telegram')}
              className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <Send className="w-4 h-4" />
              <span>{copiedLink === 'telegram' ? 'Connecting @CoopSathiGovBot...' : 'Connect on Telegram'}</span>
              {copiedLink === 'telegram' && <Check className="w-4 h-4 text-amber-300" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
