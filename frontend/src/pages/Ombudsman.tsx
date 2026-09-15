import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function Ombudsman() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.ombudsman} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">Cooperative Ombudsman</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">Cooperative Ombudsman — Statutory Grievance Redressal</h1>
      <p className="text-ink-500 text-sm mb-8">File complaints under Section 85A of the MSCS Act 2023. Mandatory resolution within <strong>30 working days</strong>.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">Who Can File?</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-ink-700">
            <li>Members of any multi-state cooperative society</li>
            <li>Members whose voting rights were denied (Section 29)</li>
            <li>Depositors with unpaid or delayed returns</li>
            <li>Members facing dividend withholding or share denial</li>
            <li>Members alleging corruption or election irregularities</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">Required Forms</h2>
          <div className="space-y-3">
            <div className="p-3 border border-indigo-100 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 text-sm">Form VI — Official Complaint</h3>
              <p className="text-xs text-indigo-700 mt-1">File your statutory complaint to the Cooperative Ombudsman under CRCS.</p>
              <a href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">download</span>Download from crcs.gov.in
              </a>
            </div>
            <div className="p-3 border border-indigo-100 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 text-sm">Form VII — Statutory Appeal</h3>
              <p className="text-xs text-indigo-700 mt-1">Appeal against the Society Information Officers' decision.</p>
              <a href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">download</span>Download from crcs.gov.in
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-ink-900 mb-4">How to File a Complaint</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-ink-700">
          <li>Download <strong>Form VI</strong> from <a href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">crcs.gov.in</a>.</li>
          <li>Fill in your membership number, society name, and nature of grievance.</li>
          <li>Submit online via CPGRAMS portal or send by post to the CRCS office, New Delhi.</li>
          <li>The Ombudsman must <strong>acknowledge within 7 days</strong> and <strong>resolve within 30 days</strong>.</li>
          <li>If unsatisfied, file a statutory appeal (Form VII) to the Appellate Authority.</li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
            <span className="material-symbols-outlined text-sm">open_in_new</span>CRCS Portal — File Online
          </a>
          <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm bg-ink-50 border border-ink-200 text-ink-700 px-4 py-2 rounded-lg hover:bg-ink-100 transition">
            <span className="material-symbols-outlined text-sm">open_in_new</span>CPGRAMS — Track Status
          </a>
          <a href="tel:18001036891" className="inline-flex items-center gap-1 text-sm bg-ink-50 border border-ink-200 text-ink-700 px-4 py-2 rounded-lg hover:bg-ink-100 transition">
            <span className="material-symbols-outlined text-sm">call</span>1800 103 6891 — CRCS Helpline
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/laws" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">MSCS Act 2023</Link>
          <Link to="/about" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">About Ministry</Link>
          <Link to="/chat" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Ask CoopSathi AI</Link>
        </div>
      </div>
    </main>
  );
}
