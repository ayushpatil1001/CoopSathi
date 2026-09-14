import React from 'react';

export default function Ncct() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">NCCT Training & Capacity Building</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">The National Council for Cooperative Training (NCCT) is responsible for organizing cooperative education and training programs for personnel working in the cooperative sector.</p>
        <p className="mb-4">NCCT operates through VAMNICOM (Pune) and 19 Institutes of Cooperative Management (ICMs) located across different states.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Flagship Programs:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Higher Diploma in Cooperative Management (HDCM)</li>
            <li>Diploma in Cooperative Audit</li>
            <li>Leadership Development Programs for Board of Directors</li>
        </ul>
      </div>
    </main>
  );
}
