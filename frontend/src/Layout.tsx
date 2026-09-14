import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
<>

    <div className="min-h-screen bg-ink-50 text-ink-900 font-sans selection:bg-ink-900 selection:text-white">

{/*  1. MONOCHROMATIC TOP ACCENT LINE  */}

{/*  2. STREAMLINED GIGW ACCESSIBILITY & SOVEREIGN ATTRIBUTION BAR  */}
<header className="border-b border-ink-100 bg-ink-50/70 text-ink-600 text-[11px] py-1.5 px-4 sm:px-8">
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
{/*  Left: Official Attribution & Skip Links  */}
<div className="flex items-center space-x-3 text-ink-600">
<div className="flex items-center gap-1.5 font-medium tracking-normal text-ink-700">
<svg className="w-3.5 h-3.5 text-ink-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="9"></circle>
<path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6"></path>
</svg>
<span className="">भारत सरकार • Government of India</span>
</div>



<Link className="hover:text-ink-900 transition-colors hidden md:flex items-center gap-1" to="#accessibility">


</Link>
</div>
{/*  Right: Refined Accessibility Controls & Language  */}
<div className="flex items-center space-x-3">
{/*  Font sizing  */}
<div className="flex items-center text-ink-600 space-x-1 border border-ink-200 bg-white rounded px-1.5 py-0.5 shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
<button className="hover:text-ink-900 px-1 font-semibold text-[10px]" title="Decrease font">A-</button>
<span className="text-ink-300 text-[10px]">|</span>
<button className="text-ink-900 font-semibold px-1 text-[10px]" title="Reset font">A</button>
<span className="text-ink-300 text-[10px]">|</span>
<button className="hover:text-ink-900 px-1 font-semibold text-[10px]" title="Increase font">A+</button>
</div>
<button className="flex items-center gap-1 text-ink-600 hover:text-ink-900 px-2 py-0.5 border border-ink-200 bg-white rounded shadow-[0_1px_1px_rgba(0,0,0,0.02)] transition-colors" title="High Contrast Mode">
<span className="material-symbols-outlined text-[13px]">contrast</span>
<span className="hidden sm:inline">Contrast</span>
</button>
<div className="flex items-center gap-1 border border-ink-200 bg-white rounded px-2 py-0.5 shadow-[0_1px_1px_rgba(0,0,0,0.02)]">
<span className="material-symbols-outlined text-[13px] text-ink-500">translate</span>
<select aria-label="Select Language" className="bg-transparent text-ink-700 text-[11px] focus:outline-none cursor-pointer border-0 py-0 pl-0 pr-4" defaultValue="en">
<option value="en">English</option>
<option value="hi">हिन्दी (Hindi)</option>
<option value="mr">मराठी (Marathi)</option>
<option value="gu">ગુજરાતી (Gujarati)</option>
<option value="ta">தமிழ் (Tamil)</option>
<option value="te">తెలుగు (Telugu)</option>
<option value="bn">বাংলা (Bengali)</option>
</select>
</div>
</div>
</div>
</header>
{/*  3. REFINED MASTHEAD / IDENTITY BAR  */}
<section className="border-b border-ink-200/80 bg-white py-4 px-4 sm:px-8">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
{/*  Ministry Brand & State Emblem  */}
<div className="flex items-center gap-4">
{/*  Ashoka Emblem Minimal  */}
<div className="flex-shrink-0 pr-4 border-r border-ink-200 flex items-center justify-center">
<svg className="w-10 h-14 text-ink-800" fill="none" viewBox="0 0 100 120">
<path d="M50 14C42 14 36 19 36 27C36 33 40 37 44 41C42 47 38 53 38 61C38 73 45 79 50 79C55 79 62 73 62 61C62 53 58 47 56 41C60 37 64 33 64 27C64 19 58 14 50 14Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="2.5"></path>
<path d="M26 27C26 35 32 43 36 47C34 55 32 63 34 71" stroke="#1e293b" strokeLinecap="round" strokeWidth="2"></path>
<path d="M74 27C74 35 68 43 64 47C66 55 68 63 66 71" stroke="#1e293b" strokeLinecap="round" strokeWidth="2"></path>
<rect fill="#1e293b" height="7" rx="1.5" width="56" x="22" y="79"></rect>
<circle cx="50" cy="82.5" fill="#ffffff" r="2.5"></circle>
<path d="M29 86L33 94H67L71 86H29Z" fill="#334155"></path>
<text fill="#1e293b" fontFamily="'Noto Sans Devanagari', sans-serif" fontSize="8" fontWeight="700" textAnchor="middle" x="50" y="106">सत्यमेव जयते</text>
</svg>
</div>
<div>
<div className="flex items-center gap-2 mb-0.5">
<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 font-devanagari">भारत सरकार</span>
<span className="text-[10px] text-ink-300">•</span>
<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">Government of India</span>
</div>
<h1 className="text-lg sm:text-xl font-bold text-ink-900 font-devanagari tracking-tight leading-none">
            सहकारिता मंत्रालय
          </h1>
<h2 className="text-sm sm:text-base font-semibold text-ink-700 tracking-tight mt-0.5">
            Ministry of Cooperation
          </h2>
<p className="text-[11px] text-ink-500 mt-0.5">
            National Council for Cooperative Training (NCCT) • राष्ट्रीय सहकारी प्रशिक्षण परिषद
          </p>
</div>
</div>
{/*  Search & Sovereign Badges  */}
<div className="flex items-center gap-4 w-full md:w-auto justify-end">
{/*  Clean Search Field  */}
<div className="relative w-full sm:w-72">
<input className="w-full pl-9 pr-14 py-1.5 text-xs bg-ink-50 hover:bg-ink-100/70 focus:bg-white border border-ink-200 rounded text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-ink-800 transition" placeholder="Search Acts, Rules, PACS, Circulars..." type="search" />
<span className="material-symbols-outlined absolute left-2.5 top-2 text-ink-400 text-sm">search</span>
<kbd className="absolute right-2 top-2 text-[10px] font-mono text-ink-400 border border-ink-200 px-1 rounded bg-white hidden sm:inline">⌘K</kbd>
</div>
{/*  Minimalist Pill Logos  */}
<div className="hidden lg:flex items-center gap-2 border-l border-ink-200 pl-4">
<div className="px-2.5 py-1 rounded border border-ink-200 text-left bg-ink-50/50">
<span className="text-[9px] font-bold uppercase tracking-wider text-ink-500 block">Motto</span>
<span className="text-xs font-bold text-ink-900">सहकार से समृद्धि</span>
</div>
<div className="px-2.5 py-1 rounded border border-ink-200 text-left bg-ink-50/50">
<span className="text-[9px] font-bold uppercase tracking-wider text-ink-500 block">Initiative</span>
<span className="text-xs font-semibold text-ink-900">Digital India</span>
</div>
</div>
</div>
</div>
</section>
{/*  4. CLEAN TEXT NAVIGATION (Monochromatic Deep Obsidian Ink)  */}
<nav className="bg-ink-900 text-white border-b border-ink-800 sticky top-0 z-40" style={{backgroundColor: 'rgb(28, 50, 36)', borderBottomColor: 'rgb(39, 67, 49)'}}>
<div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto text-xs font-medium">
<ul className="flex items-center whitespace-nowrap">
<li className="">
<Link className="inline-flex items-center gap-1 py-3 px-3 text-white font-semibold border-b-2 border-white" to="/">
<span className="">Home</span>
</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/about">About Ministry</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/laws">MSCS Act 2023</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/schemes">Schemes &amp; Subsidies</Link>
</li>
<li className="">
<Link className="inline-flex items-center gap-1.5 py-3 px-3 hover:text-white transition-colors" to="/pacs">
<span className="">PACS Services</span>
<span className="bg-ink-800 border border-ink-700 text-ink-300 text-[10px] px-1.5 py-0.2 rounded font-mono">79,630</span>
</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/pmfby">Crop Insurance (PMFBY)</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/ombudsman">Ombudsman</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/ncct">NCCT Training</Link>
</li>
<li className="">
<Link className="py-3 px-3 hover:text-white transition-colors" to="/telemetry">National Telemetry</Link>
</li>
</ul>

  {/* AI Chatbot Launcher */}
  <div className="ml-auto flex items-center">
    <Link to="/chat" className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold transition shadow-sm border border-emerald-500">
      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
      CoopSathi AI
    </Link>
  </div>


</div>
</nav>
{/*  5. REFINED TICKER / OFFICIAL NOTICES (Monochrome & Subtle)  */}
<section className="border-b border-ink-100 bg-ink-50 text-[11px] py-1.5 px-4 sm:px-8 text-ink-600 overflow-hidden" style={{backgroundColor: 'rgb(246, 243, 238)', borderBottomColor: 'rgb(229, 224, 214)', color: 'rgb(74, 84, 77)'}}>
<div className="max-w-7xl mx-auto flex items-center gap-3">

<div className="overflow-hidden relative w-full flex items-center">
<div className="animate-marquee space-x-8 text-ink-700">
<span className=""><strong>Model By-laws:</strong> Standardized multi-purpose adoption operational across 79,630 primary societies.</span>
<span className="text-ink-300">•</span>
<span className=""><strong>PMFBY Calamity Alert:</strong> 72-Hour crop loss intimation active via Toll-Free 14447 and NCIP portal.</span>
<span className="text-ink-300">•</span>
<span className=""><strong>National Cooperative Database:</strong> Census of 8.5+ Lakh cooperatives published with district-wise indicators.</span>
<span className="text-ink-300">•</span>
<span className=""><strong>Kisan Credit Card (MISS):</strong> 4% effective interest subvention for prompt PACS repayment schedules.</span>
<span className="text-ink-300">•</span>
<span className=""><strong>NCCT Admissions 2024-25:</strong> Higher Diploma in Cooperative Management (HDCM) registration active.</span>
</div>
</div>
<Link className="flex-shrink-0 text-ink-600 hover:text-ink-900 font-medium hover:underline hidden md:inline" to="#gazette">All Circulars →</Link>
</div>
</section>
{/*  MAIN CONTENT AREA  */}

      <Outlet />

{/*  10. ULTRA-PROFESSIONAL MINIMALIST MONOCHROME FOOTER  */}
<footer className="bg-ink-900 text-ink-400 text-xs border-t border-ink-800 mt-auto" style={{backgroundColor: 'rgb(23, 42, 30)', borderTopColor: 'rgb(36, 62, 45)', color: 'rgb(155, 179, 162)'}}>
{/*  Link Grid  */}
<div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 border-b border-ink-800/80">
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
<div>
<h5 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
            Apex Portals
          </h5>
<ul className="space-y-2 text-ink-400 text-xs">
<li className=""><a className="hover:text-white transition" href="https://cooperation.gov.in" target="_blank">cooperation.gov.in</a></li>
<li className=""><a className="hover:text-white transition" href="https://crcs.gov.in" target="_blank">crcs.gov.in (Registrar)</a></li>
<li className=""><a className="hover:text-white transition" href="https://ncct.ac.in" target="_blank">ncct.ac.in (NCCT Apex)</a></li>
<li className=""><a className="hover:text-white transition" href="https://pmfby.gov.in" target="_blank">pmfby.gov.in (Insurance)</a></li>
<li className=""><a className="hover:text-white transition" href="https://nabard.org" target="_blank">nabard.org</a></li>
</ul>
</div>
<div>
<h5 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
            Statutory &amp; Legal
          </h5>
<ul className="space-y-2 text-ink-400 text-xs">
<li className=""><Link className="hover:text-white transition" to="/mscs">MSCS Act 2023</Link></li>
<li className=""><Link className="hover:text-white transition" to="/election">Cooperative Election Rules</Link></li>
<li className=""><Link className="hover:text-white transition" to="/circulars">Gazette Notifications</Link></li>
<li className=""><Link className="hover:text-white transition" to="/bylaws">Standard Model PACS By-laws</Link></li>
<li className=""><Link className="hover:text-white transition" to="/ombudsman">Ombudsman Regulations</Link></li>
</ul>
</div>
<div>
<h5 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
            Citizen Support
          </h5>
<ul className="space-y-2 text-ink-400 text-xs">
<li className="text-ink-300">PMFBY Toll Free: <span className="text-white font-mono font-medium">14447</span></li>
<li className="text-ink-300">Kisan Call Centre: <span className="text-white font-mono font-medium">1800-180-1551</span></li>
<li className="">Email: <a className="hover:text-white text-ink-300 transition" href="mailto:coop-helpdesk@gov.in">coop-helpdesk@gov.in</a></li>
<li className="text-[11px] text-ink-500 pt-1 leading-normal">
              Atal Akshay Urja Bhawan, CGO Complex, Lodhi Road, New Delhi 110003
            </li>
</ul>
</div>
<div>
<h5 className="text-ink-200 font-semibold text-xs uppercase tracking-wider mb-3">
            National Portals
          </h5>
<ul className="space-y-2 text-ink-400 text-xs">
<li className=""><a className="hover:text-white transition" href="https://india.gov.in" target="_blank">india.gov.in</a></li>
<li className=""><a className="hover:text-white transition" href="https://mygov.in" target="_blank">mygov.in</a></li>
<li className=""><a className="hover:text-white transition" href="https://data.gov.in" target="_blank">data.gov.in</a></li>
<li className=""><a className="hover:text-white transition" href="https://pgportal.gov.in" target="_blank">CPGRAMS Redressal</a></li>
<li className=""><a className="hover:text-white transition" href="https://digitalindia.gov.in" target="_blank">Digital India</a></li>
</ul>
</div>
</div>
</div>
{/*  Mandatory Policies Strip  */}
<div className="py-3 px-4 sm:px-8 border-b border-ink-800/60 bg-[#0b1322]" style={{backgroundColor: 'rgb(17, 32, 23)', borderColor: 'rgb(32, 53, 39)'}}>
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-ink-400">
<Link className="hover:text-ink-200" to="/privacy">Privacy Policy</Link>
<span className="">•</span>
<Link className="hover:text-ink-200" to="/terms">Terms of Use</Link>
<span className="">•</span>
<Link className="hover:text-ink-200" to="/copyright">Copyright Policy</Link>
<span className="">•</span>
<Link className="hover:text-ink-200" to="/hyperlink">Hyperlinking Policy</Link>
<span className="">•</span>
<Link className="hover:text-ink-200" to="/accessibility">Accessibility Statement</Link>
<span className="">•</span>
<Link className="hover:text-ink-200" to="/disclaimer">Disclaimer</Link>
<span className="">•</span>
<Link className="hover:text-ink-200" to="/sitemap">Sitemap</Link>
</div>
</div>
{/*  Official Hosting & NIC Management Attribution  */}
<div className="py-5 px-4 sm:px-8 text-center text-[11px] text-ink-400">
<div className="max-w-4xl mx-auto space-y-1">
<p className="">Website Content Managed by <strong>Ministry of Cooperation, Government of India</strong> (सहकारिता मंत्रालय, भारत सरकार).</p>
<p className="text-ink-400">Designed, Developed and Hosted by <strong>National Informatics Centre (NIC)</strong>, MeitY, Government of India.</p>
<div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-ink-400 text-[10px]">
<span className="">Last Updated: <strong>24 October 2024</strong></span>
<span className="">•</span>
<span className="">GIGW Compliance: <strong>Level AA</strong></span>
<span className="">•</span>
<span className="">Certified Standard v3.0</span>
</div>
</div>
</div>
</footer>






    </div>
    </>
  );
}



