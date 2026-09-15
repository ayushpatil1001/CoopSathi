import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function Ncct() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.ncct} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">NCCT Training</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">NCCT — National Council for Cooperative Training</h1>
      <p className="text-ink-500 text-sm mb-8">Capacity building and professional education for cooperative sector management across India</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">Training Programs</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-ink-700">
            <li><strong>Higher Diploma in Cooperative Management (HDCM)</strong></li>
            <li>Diploma in Cooperative Management (DCM)</li>
            <li>Certificate Course in Cooperative Management</li>
            <li>Leadership Development Programs for PACS</li>
            <li>Digital Cooperative Management (ERP Training)</li>
            <li>National Certificate Verification System</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">Institutes of Cooperative Management</h2>
          <p className="text-sm text-ink-700 mb-3">NCCT operates through <strong>VAMNICOM Pune</strong> (Apex Institute) and <strong>19 regional Institutes of Cooperative Management (ICMs)</strong> across India.</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <a href="https://ncct.ac.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg hover:bg-emerald-100 transition">
              <span className="material-symbols-outlined text-sm">open_in_new</span>ncct.ac.in
            </a>
            <a href="https://vamnicom.ac.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm bg-ink-50 border border-ink-200 text-ink-700 px-4 py-2 rounded-lg hover:bg-ink-100 transition">
              <span className="material-symbols-outlined text-sm">open_in_new</span>VAMNICOM Pune
            </a>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-bold text-emerald-900 mb-2">How to Apply</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-emerald-800">
          <li>Visit <a href="https://ncct.ac.in" target="_blank" rel="noopener noreferrer" className="underline">ncct.ac.in</a> and select your nearest ICM.</li>
          <li>Download the admission form for your desired program.</li>
          <li>Submit with educational certificates and cooperative society membership proof.</li>
          <li>Attend the entrance test / interview as notified.</li>
        </ol>
      </div>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/pacs" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PACS Services</Link>
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Government Schemes</Link>
          <Link to="/about" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">About Ministry</Link>
        </div>
      </div>
    </main>
  );
}
