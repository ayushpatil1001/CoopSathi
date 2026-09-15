import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function Telemetry() {
  const stats = [
    { label: 'Registered Societies', value: '8.54 Lakh', desc: 'Across 36 States & UTs', color: 'blue' },
    { label: 'Total Members', value: '30+ Crore', desc: 'Farmers, Artisans, Rural Women', color: 'amber' },
    { label: 'Computerized PACS', value: '79,630', desc: 'On Common ERP Platform', color: 'emerald' },
    { label: 'Cabinet Outlay', value: '₹2,516 Cr', desc: 'PACS Computerization', color: 'indigo' },
    { label: 'PMFBY Disbursed', value: '₹1.50 L Cr', desc: 'Direct DBT Settlements', color: 'teal' },
    { label: 'KCC Accounts', value: '7.35 Cr', desc: 'Active Kisan Credit Cards', color: 'rose' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.telemetry} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">National Telemetry</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">National Cooperative Telemetry Dashboard</h1>
      <p className="text-ink-500 text-sm mb-8">Real-time national statistics from the <a href="https://cooperativedatabase.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">National Cooperative Database (NCD)</a></p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-ink-200 p-6 hover:shadow-md transition">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1">{stat.label}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">{stat.value}</div>
            <div className="text-[10px] text-ink-500 mt-1">{stat.desc}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-ink-900 mb-4">Data Sources</h2>
        <p className="text-sm text-ink-700 mb-4">All statistics are sourced from official government databases and are updated regularly:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-ink-700">
          <li><a href="https://cooperativedatabase.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">cooperativedatabase.gov.in</a> — National Cooperative Database (NCD)</li>
          <li><a href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">crcs.gov.in</a> — Central Registrar of Cooperative Societies</li>
          <li><a href="https://nabard.org" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">nabard.org</a> — NABARD PACS ERP data</li>
          <li><a href="https://pmfby.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">pmfby.gov.in</a> — PMFBY disbursement data</li>
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/pacs" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PACS Services</Link>
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Government Schemes</Link>
          <Link to="/pmfby" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PMFBY Insurance</Link>
        </div>
      </div>
    </main>
  );
}
