import React from 'react';
import { Phone, Mail, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';
import { LanguageCode } from '../../types';
import { getTranslation } from '../../data/translations';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  currentLang: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, currentLang }) => {
  return (
    <footer className="bg-[#0A2540] text-slate-300 pt-12 pb-24 md:pb-12 border-t-4 border-[#FF9933]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Ministry & Project Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 font-bold text-lg border border-white/20">
                🏛️
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  {getTranslation(currentLang, 'ministryName')}
                </h3>
                <p className="text-amber-400 text-xs font-semibold">
                  {getTranslation(currentLang, 'ncctName')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              CoopSathi AI is an innovative public digital good built to democratize cooperative laws, simplify PACS modernization, expedite PMFBY crop insurance claims, and bridge the digital literacy gap for rural farmers and cooperative societies across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="bg-slate-800/80 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Legal Engine
              </span>
              <span className="bg-slate-800/80 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                6+ Regional Languages
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase border-b border-slate-700 pb-2">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-amber-400 transition">
                  {getTranslation(currentLang, 'navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('chat')} className="hover:text-amber-400 transition">
                  CoopSathi AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-amber-400 transition">
                  {getTranslation(currentLang, 'navSchemes')}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pmfby')} className="hover:text-amber-400 transition">
                  {getTranslation(currentLang, 'navPmfby')}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pacs')} className="hover:text-amber-400 transition">
                  {getTranslation(currentLang, 'navPacs')}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('grievance')} className="hover:text-amber-400 transition">
                  {getTranslation(currentLang, 'navGrievance')}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('admin')} className="hover:text-amber-400 transition">
                  {getTranslation(currentLang, 'navAdmin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase border-b border-slate-700 pb-2">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://cooperation.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition"
                >
                  <span>Ministry of Cooperation</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ncct.ac.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition"
                >
                  <span>NCCT Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmfby.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition"
                >
                  <span>PMFBY National Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition"
                >
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://agriinfra.dac.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 hover:text-amber-400 transition"
                >
                  <span>Agri Infrastructure Fund (AIF)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Farmer Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase border-b border-slate-700 pb-2">
              National Helplines
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <Phone className="w-4 h-4" />
                  <span>14447</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  PMFBY 24x7 Crop Insurance Claim & Loss Intimation Helpline
                </p>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <Phone className="w-4 h-4" />
                  <span>1800-180-1551</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Kisan Call Centre (All Languages)
                </p>
              </div>

              <div className="flex items-center space-x-2 text-slate-400 text-xs pt-1">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@coopsathi.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer as explicitly requested in specs */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-slate-400 text-[11px] leading-relaxed mb-8">
          <span className="text-amber-400 font-bold mr-1.5">Official Government Disclaimer:</span>
          CoopSathi AI provides informational guidance based on verified gazettes, statutory acts, and model by-laws. For official legal decisions, formal court representations, or complex inter-state disputes, users are advised to consult the Central Registrar of Cooperative Societies (CRCS), District Cooperative Court, or authorized legal practitioners.
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Ministry of Cooperation / NCCT, Government of India. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Accessibility Statement</span>
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
            <span>Hyperlinking Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
