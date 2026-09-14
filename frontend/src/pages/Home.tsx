import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <main className="flex-grow" id="main-content">
{/*  6. HERO STATEMENT & PRIMARY WORKSPACE  */}
<section className="py-12 sm:py-16 px-4 sm:px-8 border-b border-ink-100 bg-white">
<div className="max-w-7xl mx-auto">
{/*  Minimal Hero Typography Header  */}
<div className="max-w-3xl mb-12">
<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-ink-200 text-ink-600 text-[11px] font-medium bg-ink-50 mb-4" style={{backgroundColor: 'rgb(234, 241, 236)', borderColor: 'rgb(196, 215, 202)', color: 'rgb(45, 80, 56)'}}>
<span className="text-ink-900 font-semibold font-devanagari">सहकार से समृद्धि</span>
<span className="text-ink-300">|</span>
<span className="">Prosperity Through Cooperation</span>
</div>
<h2 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight">
            Empowering India's Rural Economy through Transparent, Modern Cooperatives
          </h2>
<p className="mt-3 text-sm sm:text-base text-ink-500 leading-relaxed max-w-2xl font-normal">
            Strengthening Primary Agricultural Credit Societies (PACS), integrating multi-state cooperatives under the MSCS Act 2023, and delivering statutory security to 30+ crore members.
          </p>
</div>
{/*  Two Column Architecture: Executive Profiles + AI Assistant Terminal  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
{/*  Column 1: Executive Leadership (5 cols)  */}
<div className="lg:col-span-5 border border-ink-200 rounded-lg p-5 bg-white shadow-sm space-y-4">
<div className="flex items-center justify-between pb-3 border-b border-ink-100">
<span className="text-xs font-bold uppercase tracking-wider text-ink-900">Institutional Leadership</span>
<span className="text-[10px] font-mono text-ink-500">GOI Executive</span>
</div>
{/*  Profile Cards  */}
<div className="space-y-3">
{/*  Shri Amit Shah  */}
<div className="flex items-center gap-3.5 p-3 rounded border border-ink-100 hover:border-ink-300 bg-ink-50/50 transition">
<img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Amit_Shah_Official_Portrait.jpg" alt="Shri Amit Shah" className="w-12 h-12 rounded-lg object-cover border border-ink-200 shadow-sm flex-shrink-0" />
<div>
<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 block">Union Minister</span>
<h4 className="text-xs font-bold text-ink-900">Shri Amit Shah</h4>
<p className="text-[11px] text-ink-500">Minister for Cooperation &amp; Minister of Home Affairs</p>
</div>
</div>
{/*  Shri Murlidhar Mohol  */}
<div className="flex items-center gap-3.5 p-3 rounded border border-ink-100 hover:border-ink-300 bg-ink-50/50 transition">
<img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Murlidhar_Mohol.png" alt="Shri Murlidhar Mohol" className="w-12 h-12 rounded-lg object-cover border border-ink-200 shadow-sm flex-shrink-0" />
<div>
<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 block">Minister of State</span>
<h4 className="text-xs font-bold text-ink-900">Shri Murlidhar Mohol</h4>
<p className="text-[11px] text-ink-500">Minister of State for Cooperation &amp; Civil Aviation</p>
</div>
</div>
{/*  Dr. Ashish Kumar Bhutani  */}
<div className="flex items-center gap-3.5 p-3 rounded border border-ink-100 hover:border-ink-300 bg-ink-50/50 transition">
<img src="https://crcs.gov.in/sites/default/files/2023-10/dummy-user.jpg" alt="Secretary" className="w-12 h-12 rounded-lg object-cover border border-ink-200 shadow-sm flex-shrink-0" />
<div>
<span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 block">Secretary</span>
<h4 className="text-xs font-bold text-ink-900">Dr. Ashish Kumar Bhutani, IAS</h4>
<p className="text-[11px] text-ink-500">Secretary, Ministry of Cooperation</p>
</div>
</div>
</div>
<div className="pt-3 border-t border-ink-100 text-[11px] text-ink-500 leading-normal">
              "Cooperation is the bedrock of rural self-reliance. Transparent digital systems unlock unprecedented grassroots scale."
            </div>
</div>
{/*  Column 2: CoopSathi AI Service Terminal (7 cols)  */}
<div className="lg:col-span-7 border border-ink-200 rounded-lg p-6 bg-white shadow-sm flex flex-col justify-between relative" id="helpdesk-services"><div className="space-y-4"><div className="flex items-center justify-between pb-3 border-b border-ink-100"><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800"><span className="material-symbols-outlined text-lg">support_agent</span></div><div><div className="flex items-center gap-2"><h3 className="text-sm font-bold text-ink-900">Citizen Helpdesk &amp; Quick Services</h3><span className="text-[10px] font-devanagari text-ink-500 font-medium">नागरिक सहायता एवं त्वरित सेवाएं</span></div><p className="text-[11px] text-ink-500">Official Support, Statutory Filings &amp; Circular Registry</p></div></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div className="p-3 rounded border border-ink-100 bg-ink-50/50"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">National Helpline</span><span className="material-symbols-outlined text-sm text-ink-500">call</span></div><div className="text-base font-bold text-ink-900 font-mono mt-1">1800-180-1551</div><p className="text-[10px] text-ink-500 mt-0.5">Kisan Call Centre (Toll-Free)</p></div><div className="p-3 rounded border border-ink-100 bg-ink-50/50"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Crop Insurance Desk</span><span className="material-symbols-outlined text-sm text-ink-500">phone_in_talk</span></div><div className="text-base font-bold text-ink-900 font-mono mt-1">14447</div><p className="text-[10px] text-ink-500 mt-0.5">PMFBY Claim Intimation Toll-Free</p></div></div><div className="bg-ink-50/70 border border-ink-200 rounded p-3"><div className="flex items-center justify-between mb-2"><span className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Find Official Circulars &amp; Statutory Notices</span><span className="text-[10px] font-mono text-ink-400">CRCS / MSCS</span></div><div className="relative flex items-center"><input className="w-full pl-8 pr-24 py-1.5 text-xs bg-white border border-ink-200 rounded text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-ink-800" placeholder="Enter subject, circular number, or date..." type="text" /><span className="material-symbols-outlined absolute left-2 text-ink-400 text-sm">search</span><button className="absolute right-1 px-2.5 py-1 text-[11px] font-semibold bg-ink-900 hover:bg-ink-800 text-white rounded transition">Search</button></div></div><div><span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block mb-2">Key Statutory Resources &amp; Downloads</span><div className="flex flex-wrap gap-1.5"><Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/laws"><span className="material-symbols-outlined text-xs text-ink-500">description</span><span className="">MSCS Act 2023 Rules</span></Link><Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/bylaws"><span className="material-symbols-outlined text-xs text-ink-500">description</span><span className="">Model PACS By-laws</span></Link><Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/ombudsman"><span className="material-symbols-outlined text-xs text-ink-500">gavel</span><span className="">Ombudsman Guidelines</span></Link><Link className="text-[11px] text-ink-700 bg-white hover:bg-ink-100 border border-ink-200 px-2.5 py-1 rounded transition inline-flex items-center gap-1" to="/ncct"><span className="material-symbols-outlined text-xs text-ink-500">verified</span><span className="">NCCT Verification</span></Link></div></div></div><div className="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between text-[11px] text-ink-500"><span className="">Official Grievance Desk: <strong>coop-helpdesk@gov.in</strong></span><Link className="text-ink-900 font-medium hover:underline flex items-center gap-0.5" to="/ombudsman">Statutory Grievance Redressal →</Link></div></div>
</div>
</div>
</section>
{/*  7. CITIZEN & COOPERATIVE SERVICES (ULTRA-CLEAN MONOCHROME CARDS)  */}
<section className="py-12 sm:py-16 px-4 sm:px-8 bg-ink-50/50 border-b border-ink-100" id="services" style={{backgroundColor: 'rgb(250, 247, 242)', borderBottomColor: 'rgb(232, 226, 216)'}}>
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-ink-200/80">
<div>
<span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 block">Direct Access</span>
<h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
              Priority Cooperative Services &amp; Citizen Portals
            </h3>
<p className="text-xs text-ink-500 mt-0.5">Statutory portals, regulatory filings, crop insurance, and digitized PACS operations.</p>
</div>
<span className="text-[11px] text-ink-500 font-mono mt-2 md:mt-0">
            GIGW 3.0 Certified
          </span>
</div>
{/*  6 Minimalist Service Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
{/*  Card 1: MSCS Act  */}
<div className="bg-white rounded-lg border border-ink-200 hover:border-blue-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"><div><div className="flex items-center justify-between"><div className="w-9 h-9 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700"><span className="material-symbols-outlined text-lg">gavel</span></div></div><h4 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-blue-900">Cooperative Laws &amp; MSCS Act 2023</h4><p className="text-xs text-ink-500 mt-2 leading-relaxed">Multi-State Co-operative Societies (MSCS) Act 2023, Sections 29, 45 &amp; 85 rules, model election codes, and CRCS gazette notifications.</p><ul className="mt-4 space-y-1.5 text-xs text-ink-600"><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-500"></span>Model By-laws for PACS &amp; Dairy Societies</li><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-500"></span>Cooperative Election Authority (CEA) Rules</li></ul></div><div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900"><Link className="hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors" to="/laws"><span className="">View Acts &amp; Gazettes</span><span className="material-symbols-outlined text-sm text-blue-600">arrow_forward</span></Link><span className="text-[10px] font-mono text-ink-400">PDF • 4.2 MB</span></div></div>
{/*  Card 2: PMFBY  */}
<div className="bg-white rounded-lg border border-ink-200 hover:border-amber-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"><div><div className="flex items-center justify-between"><div className="w-9 h-9 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700"><span className="material-symbols-outlined text-lg">shield</span></div></div><h4 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-amber-900">PMFBY Crop Insurance &amp; Claims</h4><p className="text-xs text-ink-500 mt-2 leading-relaxed">Pradhan Mantri Fasal Bima Yojana integration. Report localized crop loss within 72 hours of unseasonal rains, hailstorm, or waterlogging.</p><ul className="mt-4 space-y-1.5 text-xs text-ink-600"><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>Direct NCIP Portal Claim Tracking</li><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-500"></span>National Insurance Helpline: <strong className="text-amber-950">14447</strong></li></ul></div><div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900"><a className="hover:text-amber-800 hover:underline flex items-center gap-1 transition-colors" href="https://pmfby.gov.in" target="_blank"><span className="">Access PMFBY Portal</span><span className="material-symbols-outlined text-sm text-amber-600">open_in_new</span></a><span className="text-[10px] font-mono text-ink-400">Direct Link</span></div></div>
{/*  Card 3: PACS Modernization  */}
<div className="bg-white rounded-lg border border-ink-200 hover:border-emerald-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"><div><div className="flex items-center justify-between"><div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700"><span className="material-symbols-outlined text-lg">storefront</span></div></div><h4 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-emerald-900">PACS Digital Modernization (ERP)</h4><p className="text-xs text-ink-500 mt-2 leading-relaxed">Centralized ERP onboarding for Primary Agricultural Credit Societies, enabling delivery of 25+ Common Service Center (CSC) services.</p><ul className="mt-4 space-y-1.5 text-xs text-ink-600"><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-500"></span>Banking, Fertilizer, &amp; Seed Multi-Services</li><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-500"></span>Standardized Financial Accounting System</li></ul></div><div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900"><Link className="hover:text-emerald-800 hover:underline flex items-center gap-1 transition-colors" to="/pacs"><span className="">PACS ERP Status &amp; Login</span><span className="material-symbols-outlined text-sm text-emerald-600">arrow_forward</span></Link><span className="text-[10px] font-mono text-ink-400">NABARD Assisted</span></div></div>
{/*  Card 4: Kisan Credit Card  */}
<div className="bg-white rounded-lg border border-ink-200 hover:border-teal-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"><div><div className="flex items-center justify-between"><div className="w-9 h-9 rounded bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700"><span className="material-symbols-outlined text-lg">credit_card</span></div></div><h4 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-teal-900">Kisan Credit Card (KCC) Subvention</h4><p className="text-xs text-ink-500 mt-2 leading-relaxed">Modified Interest Subvention Scheme (MISS) providing short-term crop loans up to ₹₹3,00,000 at an effective 4% per annum for prompt repayment.</p><ul className="mt-4 space-y-1.5 text-xs text-ink-600"><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-teal-500"></span>Animal Husbandry &amp; Fishery Extension</li><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-teal-500"></span>Simplified 1-Page Application Procedure</li></ul></div><div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900"><Link className="hover:text-teal-800 hover:underline flex items-center gap-1 transition-colors" to="/kcc"><span className="">Guidelines &amp; Forms</span><span className="material-symbols-outlined text-sm text-teal-600">download</span></Link><span className="text-[10px] font-mono text-ink-400">Interest Subvention</span></div></div>
{/*  Card 5: Cooperative Ombudsman  */}
<div className="bg-white rounded-lg border border-ink-200 hover:border-indigo-300 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"><div><div className="flex items-center justify-between"><div className="w-9 h-9 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700"><span className="material-symbols-outlined text-lg">balance</span></div></div><h4 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-indigo-900">Cooperative Ombudsman Redressal</h4><p className="text-xs text-ink-500 mt-2 leading-relaxed">Statutory grievance mechanism under MSCS Rules. Lodge complaints regarding elections, deposits, fraud, or non-issuance of shares.</p><ul className="mt-4 space-y-1.5 text-xs text-ink-600"><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-500"></span>Form VI &amp; VII E-Filing System</li><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-500"></span>Real-time Tracking &amp; Appellate Bench</li></ul></div><div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900"><Link className="hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors" to="/ombudsman"><span className="">Lodge Complaint Online</span><span className="material-symbols-outlined text-sm text-indigo-600">arrow_forward</span></Link><span className="text-[10px] font-mono text-ink-400">Redressal Desk</span></div></div>
{/*  Card 6: NCCT Training  */}
<div className="bg-white rounded-lg border border-ink-200 hover:border-slate-400 p-6 flex flex-col justify-between transition-all group shadow-[0_1px_2px_rgba(0,0,0,0.02)]"><div><div className="flex items-center justify-between"><div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800"><span className="material-symbols-outlined text-lg">school</span></div></div><h4 className="text-sm font-bold text-ink-900 mt-4 group-hover:text-emerald-900">NCCT Cooperative Management Education</h4><p className="text-xs text-ink-500 mt-2 leading-relaxed">Capacity building via VAMNICOM Pune and 19 Institutes of Cooperative Management (ICMs). Professional diplomas &amp; leadership programs.</p><ul className="mt-4 space-y-1.5 text-xs text-ink-600"><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-600"></span>Higher Diploma in Cooperative Management</li><li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-600"></span>National Certificate Verification System</li></ul></div><div className="mt-6 pt-3 border-t border-ink-100 flex items-center justify-between text-xs font-semibold text-ink-900"><a className="hover:text-emerald-800 hover:underline flex items-center gap-1 transition-colors" href="https://ncct.ac.in" target="_blank"><span className="">ncct.ac.in Portal</span><span className="material-symbols-outlined text-sm text-emerald-700">open_in_new</span></a><span className="text-[10px] font-mono text-ink-400">Academic</span></div></div>
</div>
</div>
</section>
{/*  8. MINIMALIST NATIONAL IMPACT & TELEMETRY  */}
<section className="py-14 px-4 sm:px-8 bg-white border-b border-ink-100" id="telemetry">
<div className="max-w-7xl mx-auto">
<div className="text-left mb-10 pb-3 border-b border-ink-200">
<span className="text-[10px] font-mono text-ink-500 uppercase tracking-widest block">Live Telemetry • राष्ट्रीय सांख्यिकी</span>
<h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mt-0.5">
            National Cooperative Database
          </h3>
<p className="text-xs text-ink-500 mt-1">Census statistics verified by Ministry of Cooperation &amp; National Informatics Centre (NIC)</p>
</div>
{/*  5 Clean Metric Blocks  */}
<div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-ink-200 border border-ink-200 rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]"><div className="p-6 text-left hover:bg-ink-50/40 transition"><div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">Registered Societies</div><div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">8.5+ Lakh</div><div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Across 36 States &amp; UTs</div></div><div className="p-6 text-left hover:bg-ink-50/40 transition"><div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">Total Members</div><div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">30+ Crore</div><div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Farmers, Artisans, Rural Women</div></div><div className="p-6 text-left hover:bg-ink-50/40 transition"><div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">Computerized PACS</div><div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">79,630</div><div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Operating on Common ERP</div></div><div className="p-6 text-left hover:bg-ink-50/40 transition"><div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">Cabinet Outlay</div><div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">₹₹2,516 Cr</div><div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>PACS Digital Modernization</div></div><div className="p-6 text-left col-span-2 md:col-span-1 hover:bg-ink-50/40 transition"><div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">PMFBY Disbursed</div><div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-1.5 tracking-tight">₹₹1.50 L Cr</div><div className="text-[10px] text-ink-500 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>Direct DBT Settlements</div></div></div>
<div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-500 gap-2">
<div className="flex items-center gap-2">
<span className="w-1.5 h-1.5 rounded-full bg-ink-900"></span>
<span className="">Source: <strong>cooperativedatabase.gov.in</strong> (NIC Portal)</span>
</div>
<Link className="text-ink-900 font-medium hover:underline flex items-center gap-1" to="/">
<span className="">Download Annual Census Report (PDF)</span>
<span className="material-symbols-outlined text-xs">download</span>
</Link>
</div>
</div>
</section>
{/*  9. THREE NEW NATIONAL COOPERATIVES (MINIMALIST INITIATIVE STRIP)  */}
<section className="py-12 px-4 sm:px-8 bg-ink-50/50 border-b border-ink-200">
<div className="max-w-7xl mx-auto">
<div className="text-left mb-6">
<span className="text-[10px] font-mono text-ink-500 uppercase tracking-wider block">Historic Cabinet Initiative</span>
<h3 className="text-base sm:text-lg font-bold text-ink-900">Three Apex Multi-State Cooperative Societies</h3>
<p className="text-xs text-ink-500">PACS empowerment through direct equity participation in global exports, organic branding, and seeds.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="p-5 rounded-md border border-ink-200 bg-white hover:border-emerald-300 transition relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div><span className="inline-block text-[10px] font-mono text-emerald-800 uppercase px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 mb-2">1. Quality Seeds</span><h5 className="text-xs font-bold text-ink-900">Bharatiya Beej Sahakari Samiti (BBSSL)</h5><p className="text-[11px] text-ink-500 mt-1 leading-relaxed">Multiplication and distribution of certified high-yield seeds directly produced by PACS members.</p></div><div className="p-5 rounded-md border border-ink-200 bg-white hover:border-amber-300 transition relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div><span className="inline-block text-[10px] font-mono text-amber-800 uppercase px-1.5 py-0.5 rounded bg-amber-50 border border-amber-100 mb-2">2. Organic Marketing</span><h5 className="text-xs font-bold text-ink-900">National Cooperative Organics Ltd (NCOL)</h5><p className="text-[11px] text-ink-500 mt-1 leading-relaxed">Standardized testing, packaging, and marketing for fair organic farmer price realizations under 'Bharat Organics'.</p></div><div className="p-5 rounded-md border border-ink-200 bg-white hover:border-blue-300 transition relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div><span className="inline-block text-[10px] font-mono text-blue-800 uppercase px-1.5 py-0.5 rounded bg-blue-50 border border-blue-100 mb-2">3. Global Export</span><h5 className="text-xs font-bold text-ink-900">National Cooperative Exports Ltd (NCEL)</h5><p className="text-[11px] text-ink-500 mt-1 leading-relaxed">Direct overseas market access for cooperative surplus with dividends returned to primary societies.</p></div></div>
</div>
</section>
</main>
    </>
  );
}
