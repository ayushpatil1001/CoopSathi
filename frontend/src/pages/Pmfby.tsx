import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function Pmfby() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.pmfby} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">PMFBY Crop Insurance</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">PMFBY — Pradhan Mantri Fasal Bima Yojana</h1>
      <p className="text-ink-500 text-sm mb-8">Comprehensive crop insurance scheme for all notified crops — report loss within 72 hours on toll-free <strong>14447</strong></p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <h2 className="font-bold text-amber-900 text-sm mb-1">Kharif Crops</h2>
          <p className="text-3xl font-extrabold text-amber-800">2%</p>
          <p className="text-xs text-amber-700 mt-1">Maximum farmer premium (of sum insured)</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <h2 className="font-bold text-blue-900 text-sm mb-1">Rabi Crops</h2>
          <p className="text-3xl font-extrabold text-blue-800">1.5%</p>
          <p className="text-xs text-blue-700 mt-1">Maximum farmer premium (of sum insured)</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
          <h2 className="font-bold text-green-900 text-sm mb-1">Horticultural</h2>
          <p className="text-3xl font-extrabold text-green-800">5%</p>
          <p className="text-xs text-green-700 mt-1">Maximum farmer premium (of sum insured)</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-ink-900 mb-4">How to Report Crop Loss</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-ink-700">
          <li><strong>Within 72 hours</strong> of a natural calamity (hailstorm, cloudburst, inundation, landslide), intimate the loss.</li>
          <li>Call the <strong>national toll-free helpline 14447</strong> (24×7) or use the <strong>Crop Insurance App</strong>.</li>
          <li>Provide your Aadhaar number, account number, and crop details.</li>
          <li>A YES-TECH satellite assessment and WINDS weather verification will automatically be triggered.</li>
          <li>Claims are settled via <strong>Direct Benefit Transfer (DBT)</strong> to your bank account.</li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://pmfby.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg hover:bg-amber-100 transition">
            <span className="material-symbols-outlined text-sm">open_in_new</span>pmfby.gov.in — Apply Online
          </a>
          <a href="tel:14447" className="inline-flex items-center gap-1 text-sm bg-ink-50 border border-ink-200 text-ink-700 px-4 py-2 rounded-lg hover:bg-ink-100 transition">
            <span className="material-symbols-outlined text-sm">call</span>14447 — Helpline
          </a>
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-white rounded-lg border border-ink-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-ink-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {SEO_PAGES.pmfby.faqItems?.map((faq) => (
            <details key={faq.question} className="border border-ink-100 rounded-lg p-4">
              <summary className="font-semibold text-ink-800 cursor-pointer text-sm">{faq.question}</summary>
              <p className="mt-3 text-ink-600 text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/pacs" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PACS Services</Link>
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">All Schemes</Link>
          <Link to="/ombudsman" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">File Grievance</Link>
        </div>
      </div>
    </main>
  );
}
