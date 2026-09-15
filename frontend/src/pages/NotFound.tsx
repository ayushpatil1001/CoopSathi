import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center" id="main-content">
      <SEOHead
        title="404 — Page Not Found | CoopSathi AI"
        description="The requested page could not be located on the Ministry of Cooperation CoopSathi AI platform."
        canonical="https://coopsathi.gov.in/404"
      />

      <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
        <span className="material-symbols-outlined text-3xl">warning</span>
      </div>

      {/* ONE H1 */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-ink-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        The requested statutory resource or page is not available or may have moved under the updated MSCS Act 2023 portal structure.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-ink-900 hover:bg-ink-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          Return to Home
        </Link>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-1.5 bg-white border border-ink-200 hover:border-emerald-500 text-ink-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          <span className="material-symbols-outlined text-sm">storefront</span>
          View Schemes
        </Link>
        <Link
          to="/chat"
          className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 px-5 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          <span className="material-symbols-outlined text-sm">smart_toy</span>
          Ask CoopSathi AI
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-ink-100 text-xs text-ink-400">
        Need assistance? Call Kisan Call Centre Toll-Free: <strong className="text-ink-700 font-mono">1800-180-1551</strong> or PMFBY Desk: <strong className="text-ink-700 font-mono">14447</strong>
      </div>
    </main>
  );
}
