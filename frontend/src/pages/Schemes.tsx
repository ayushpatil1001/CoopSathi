import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

const schemes = [
  { name: 'PACS Digital Modernization (ERP)', desc: 'Computerization of 79,630 PACS with centralized cloud ERP. Cabinet outlay ₹2,516 Crore.', link: '/pacs', icon: 'storefront', color: 'emerald' },
  { name: 'Kisan Credit Card (KCC) — 4% MISS', desc: 'Short-term crop loans up to ₹3,00,000 at 4% per annum under Modified Interest Subvention Scheme.', link: '/pmfby', icon: 'credit_card', color: 'teal' },
  { name: 'PMFBY Crop Insurance', desc: 'Premium as low as 2% (Kharif) / 1.5% (Rabi) for comprehensive crop risk coverage.', link: '/pmfby', icon: 'shield', color: 'amber' },
  { name: 'Bharatiya Beej Sahakari Samiti (BBSSL)', desc: 'National cooperative for certified high-yield seed multiplication and distribution from PACS farmers.', link: '/', icon: 'grass', color: 'green' },
  { name: 'National Cooperative Organics Ltd (NCOL)', desc: 'Bharat Organics brand for standardized testing, packaging, and marketing of organic farmer produce.', link: '/', icon: 'eco', color: 'lime' },
  { name: 'National Cooperative Exports Ltd (NCEL)', desc: 'Direct overseas market access for cooperative surplus, dividends returned to primary societies.', link: '/', icon: 'language', color: 'blue' },
];

export default function Schemes() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.schemes} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">Government Schemes</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">Government Cooperative Schemes</h1>
      <p className="text-ink-500 text-sm mb-8">Official schemes and initiatives under the Ministry of Cooperation, Government of India</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {schemes.map((scheme) => (
          <div key={scheme.name} className="bg-white rounded-lg border border-ink-200 hover:border-emerald-300 p-6 flex flex-col justify-between transition-all shadow-sm">
            <div>
              <span className="material-symbols-outlined text-2xl text-ink-500 mb-3 block">{scheme.icon}</span>
              <h2 className="text-sm font-bold text-ink-900 mb-2">{scheme.name}</h2>
              <p className="text-xs text-ink-500 leading-relaxed">{scheme.desc}</p>
            </div>
            <Link to={scheme.link} className="mt-4 text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
              Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ Section for Schema */}
      <section className="bg-white rounded-lg border border-ink-200 p-8 mb-8">
        <h2 className="text-xl font-bold text-ink-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {SEO_PAGES.schemes.faqItems?.map((faq) => (
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
          <Link to="/pmfby" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PMFBY Insurance</Link>
          <Link to="/laws" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">MSCS Act 2023</Link>
          <Link to="/ncct" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">NCCT Training</Link>
        </div>
      </div>
    </main>
  );
}
