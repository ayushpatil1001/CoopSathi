import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { SEO_PAGES } from '../utils/seo';

export default function Laws() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <SEOHead {...SEO_PAGES.laws} />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">MSCS Act 2023 & Laws</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-ink-900 mb-2">MSCS Act 2023 & Cooperative Laws</h1>
      <p className="text-ink-500 text-sm mb-8">Statutory framework governing multi-state cooperative societies in India</p>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-4">Multi-State Co-operative Societies (Amendment) Act 2023</h2>
          <p className="text-ink-700 mb-4">The Multi-State Co-operative Societies (Amendment) Act 2023 (Act No. 11 of 2023) introduces landmark reforms to democratize, professionalize, and strengthen cooperative governance in India.</p>

          <h3 className="text-base font-semibold text-ink-800 mb-3">Key Provisions</h3>
          <ul className="list-disc pl-5 space-y-2 text-ink-700 text-sm">
            <li><strong>Section 29 — Voting Rights:</strong> Every member of a multi-state cooperative society is entitled to vote. No society may deny voting rights to an active member.</li>
            <li><strong>Section 45 — Election Authority:</strong> Creation of a Cooperative Election Authority (CEA) for free and fair elections.</li>
            <li><strong>Section 85A–C — Cooperative Ombudsman:</strong> Statutory grievance redressal mechanism with a 30-day resolution SLA.</li>
            <li><strong>Model By-Laws:</strong> Standardized Model By-Laws for PACS enabling 25+ multipurpose activities including Jan Aushadhi Kendras and CSC services.</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://crcs.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg hover:bg-emerald-100 transition">
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              Download MSCS Act (CRCS)
            </a>
            <Link to="/ombudsman" className="inline-flex items-center gap-1 text-sm bg-ink-50 border border-ink-200 text-ink-700 px-4 py-2 rounded-lg hover:bg-ink-100 transition">
              <span className="material-symbols-outlined text-sm">balance</span>
              Cooperative Ombudsman
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm">
          <h2 className="text-xl font-bold text-ink-900 mb-4">Cooperative Election Rules & Gazette Notifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-ink-700">
            <div className="p-4 border border-ink-100 rounded bg-ink-50">
              <h3 className="font-semibold text-ink-800 mb-1">Cooperative Election Authority (CEA)</h3>
              <p>Ensures free, fair, and transparent elections for all multi-state cooperative societies at regular intervals.</p>
            </div>
            <div className="p-4 border border-ink-100 rounded bg-ink-50">
              <h3 className="font-semibold text-ink-800 mb-1">Model PACS By-Laws 2024</h3>
              <p>Standardized by-laws allowing PACS to provide 25+ CSC services, banking, fertilizers, seeds, and Jan Aushadhi.</p>
            </div>
            <div className="p-4 border border-ink-100 rounded bg-ink-50">
              <h3 className="font-semibold text-ink-800 mb-1">CRCS Ombudsman Regulations</h3>
              <p>Forms VI and VII for filing statutory complaints. Resolution within 30 working days mandatory.</p>
            </div>
            <div className="p-4 border border-ink-100 rounded bg-ink-50">
              <h3 className="font-semibold text-ink-800 mb-1">Official Gazette</h3>
              <p><a href="https://egazette.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">egazette.gov.in</a> — All cooperative society gazette notifications.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Pages</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/ombudsman" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">File Grievance</Link>
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Government Schemes</Link>
          <Link to="/about" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">About Ministry</Link>
        </div>
      </div>
    </main>
  );
}
