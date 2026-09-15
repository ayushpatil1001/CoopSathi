import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function Pacs() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.pacs} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">PACS Services</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">PACS — Primary Agricultural Credit Society Services</h1>
      <p className="text-ink-500 text-sm mb-8">Computerized ERP services for 79,630 PACS under the ₹2,516 Crore Cabinet-approved scheme</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">PACS Computerization Scheme</h2>
          <p className="text-ink-700 text-sm mb-4">The Cabinet approved ₹2,516 Crore for computerizing 63,000 eligible PACS across India with a common ERP platform maintained by NABARD.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-ink-700">
            <li>Target: 63,000 PACS on common ERP</li>
            <li>Achieved: 79,630 PACS onboarded</li>
            <li>Enables 25+ multipurpose CSC services</li>
            <li>Standardized Financial Accounting System (FAS)</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-lg font-bold text-ink-900 mb-4">Services Available at PACS</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-ink-700">
            <li>Agricultural loans and KCC disbursement</li>
            <li>Fertilizer and pesticide distribution</li>
            <li>Certified seed supply (BBSSL)</li>
            <li>Pradhan Mantri Jan Aushadhi Kendra</li>
            <li>Aadhaar-enabled Common Service Center (CSC)</li>
            <li>Custom Hiring Centers — tractor & drone rental</li>
            <li>Nano Urea and Bio-fertilizer supply</li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white rounded-lg border border-ink-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-ink-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {SEO_PAGES.pacs.faqItems?.map((faq) => (
            <details key={faq.question} className="border border-ink-100 rounded-lg p-4">
              <summary className="font-semibold text-ink-800 cursor-pointer text-sm">{faq.question}</summary>
              <p className="mt-3 text-ink-600 text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
        <h2 className="text-base font-bold text-emerald-900 mb-2">PACS ERP Login & Support</h2>
        <p className="text-sm text-emerald-800 mb-3">PACS secretaries and members can access the PACS ERP portal via NABARD's cooperative digital platform.</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://nabard.org" target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-700 font-semibold hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">open_in_new</span>nabard.org
          </a>
          <span className="text-emerald-400">|</span>
          <span className="text-sm text-emerald-800">PACS Helpdesk: <strong>011-24362140</strong></span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">All Schemes</Link>
          <Link to="/pmfby" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PMFBY Insurance</Link>
          <Link to="/laws" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Model By-Laws</Link>
          <Link to="/ombudsman" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">File Grievance</Link>
        </div>
      </div>
    </main>
  );
}
