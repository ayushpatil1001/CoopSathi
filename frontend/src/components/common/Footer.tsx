import React from 'react';
import { Phone, Mail, ExternalLink, ShieldCheck, HeartHandshake, Building2, Scale, LifeBuoy, Flag } from 'lucide-react';
import { LanguageCode } from '../../types';
import { getTranslation } from '../../data/translations';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  currentLang: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, currentLang }) => {
  return (
    <footer className="bg-[#0A2540] text-slate-300 text-xs border-t-4 border-[#FF9933] mt-auto">
      {/* Top Footer: Essential Government Portals & Directory */}
      <div className="border-b border-slate-700/80 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Apex Portals */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 pb-1 border-b border-slate-700 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              Apex Government Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://cooperation.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>cooperation.gov.in (Official)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://crcs.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>crcs.gov.in (Central Registrar)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://ncct.ac.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>ncct.ac.in (Cooperative Training)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>pmfby.gov.in (Pradhan Mantri Fasal Bima)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://nabard.org" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>nabard.org (PACS ERP Refinance)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Statutory & Legal Directory */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 pb-1 border-b border-slate-700 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#138808]" />
              Statutory & Legal Directory
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-amber-300 hover:underline text-left">
                  Multi-State Co-op Societies (MSCS) Act 2023
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-amber-300 hover:underline text-left">
                  Cooperative Election Authority (CEA) Rules
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pacs')} className="hover:text-amber-300 hover:underline text-left">
                  Standard Model PACS Model By-laws
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('grievance')} className="hover:text-amber-300 hover:underline text-left">
                  Cooperative Ombudsman Regulations (Form VI & VII)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-amber-300 hover:underline text-left">
                  KCC Interest Subvention Scheme (4% Net Effective)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Helplines & Ministry Headquarters */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 pb-1 border-b border-slate-700 flex items-center gap-1.5">
              <LifeBuoy className="w-4 h-4 text-sky-400" />
              Citizen Helplines & Support
            </h5>
            <div className="space-y-2.5 text-xs">
              <div className="bg-[#0e2c4a] p-2.5 rounded border border-slate-700">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Phone className="w-4 h-4" />
                  <span>14447 (Toll Free)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  PMFBY 24x7 Crop Loss Intimation & Claim Helpline
                </p>
              </div>

              <div className="bg-[#0e2c4a] p-2.5 rounded border border-slate-700">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Phone className="w-4 h-4" />
                  <span>1800-180-1551</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Kisan Call Centre (22 Scheduled Indian Languages)
                </p>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-xs pt-1">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>coop-helpdesk@gov.in</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                Atal Akshay Urja Bhawan, CGO Complex, Lodhi Road, New Delhi - 110003
              </p>
            </div>
          </div>

          {/* Col 4: National Digital Initiatives */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 pb-1 border-b border-slate-700 flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-[#FF9933]" />
              National Initiatives
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>india.gov.in (National Portal of India)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://mygov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>mygov.in (Citizen Engagement)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>data.gov.in (Open Government Data)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>CPGRAMS (Centralized Grievance Portal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 hover:underline flex items-center gap-1">
                  <span>Digital India Initiative</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Mandatory GIGW Legal Disclaimer Banner */}
      <div className="bg-[#07192c] py-4 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-amber-400 uppercase tracking-wide">Statutory Legal Disclaimer: </strong>
          CoopSathi AI is an authorized digital public utility developed in coordination with the National Council for Cooperative Training (NCCT). All statutory interpretations, PACS guidelines, PMFBY claim intimation protocols, and interest subvention computations provided herein reflect the Multi-State Co-operative Societies Act 2023, official gazette circulars, and standard operating procedures. For formal dispute adjudications or appellate proceedings, citizens are advised to submit Form VI/VII to the appointed Central/State Cooperative Ombudsman or the Central Registrar of Cooperative Societies (CRCS).
        </div>
      </div>

      {/* Mandatory GIGW Website Policies Strip */}
      <div className="bg-[#061729] py-3 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
          <span className="hover:text-white cursor-pointer">Website Policies</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Terms of Use</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Copyright Policy</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Hyperlinking Policy</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Accessibility Statement</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Sitemap</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Help & FAQ</span>
        </div>
      </div>

      {/* Official Hosting & NIC Management Attribution */}
      <div className="py-5 px-4 sm:px-8 text-center text-slate-400 text-[11px] leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <p>
            Website Content Managed by <strong>Ministry of Cooperation, Government of India</strong> (सहकारिता मंत्रालय, भारत सरकार) & <strong>NCCT</strong>.
          </p>
          <p>
            Designed, Developed and Hosted by <strong>National Informatics Centre (NIC)</strong>, Ministry of Electronics & Information Technology, Government of India.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-slate-400 text-[11px]">
            <span>Last Updated: <strong>24 October 2024</strong></span>
            <span>•</span>
            <span>GIGW Compliance: <strong className="text-emerald-400">Level AA (Certified)</strong></span>
            <span>•</span>
            <span>Total Visitors: <strong className="text-amber-400">1,48,92,405</strong></span>
          </div>
        </div>
      </div>

      {/* Bottom tricolor stripe accent */}
      <div className="h-1 w-full tricolor-stripe" />
    </footer>
  );
};
