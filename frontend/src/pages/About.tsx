import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.about} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">About Ministry</li>
        </ol>
      </nav>

      {/* ONE h1 per page */}
      <h1 className="text-3xl font-bold text-ink-900 mb-6">About the Ministry of Cooperation</h1>

      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700 space-y-4">
        <p>The Ministry of Cooperation was established by the Government of India on <strong>6 July 2021</strong> with the visionary mission of <em>"Sahakar Se Samriddhi"</em> — Prosperity through Cooperation. It is headed by Hon'ble Minister Shri Amit Shah.</p>
        <p>The Ministry provides a separate administrative, legal, and policy framework for strengthening the cooperative movement across India. It streamlines processes for "Ease of doing business" for co-operatives and enables the development of Multi-State Co-operative Societies (MSCS) under the MSCS Act 2023.</p>

        <h2 className="text-xl font-bold mt-6 mb-3 text-ink-900">Key Objectives</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To realize the vision of <strong>"Sahakar se Samriddhi"</strong> — making cooperatives the engine of rural economic growth.</li>
          <li>To deepen co-operatives as a true people-based movement reaching up to the grassroots across 36 States and UTs.</li>
          <li>To develop a cooperative-based economic model where each member works with a spirit of responsibility.</li>
          <li>To computerize 79,630 Primary Agricultural Credit Societies (PACS) with a Cabinet Outlay of ₹2,516 Crore.</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3 text-ink-900">Institutional Structure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="p-4 border border-ink-100 rounded-lg bg-ink-50">
            <h3 className="font-semibold text-ink-800 mb-1">Hon'ble Minister</h3>
            <p className="text-sm">Shri Amit Shah — Cabinet Minister, Ministry of Cooperation</p>
          </div>
          <div className="p-4 border border-ink-100 rounded-lg bg-ink-50">
            <h3 className="font-semibold text-ink-800 mb-1">Secretary</h3>
            <p className="text-sm">Dr. Ashish Kumar Bhutani, IAS — Secretary, Ministry of Cooperation</p>
          </div>
          <div className="p-4 border border-ink-100 rounded-lg bg-ink-50">
            <h3 className="font-semibold text-ink-800 mb-1">CRCS</h3>
            <p className="text-sm">Central Registrar of Cooperative Societies — Regulatory authority for all multi-state cooperatives</p>
          </div>
          <div className="p-4 border border-ink-100 rounded-lg bg-ink-50">
            <h3 className="font-semibold text-ink-800 mb-1">Official Portal</h3>
            <p className="text-sm"><a href="https://cooperation.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">cooperation.gov.in</a></p>
          </div>
        </div>
      </div>

      {/* Internal Links */}
      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Explore More</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Government Schemes</Link>
          <Link to="/laws" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">MSCS Act 2023</Link>
          <Link to="/pacs" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">PACS Services</Link>
          <Link to="/ombudsman" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">File a Grievance</Link>
        </div>
      </div>
    </main>
  );
}
