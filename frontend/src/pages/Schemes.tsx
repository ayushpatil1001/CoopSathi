import React from 'react';

export default function Schemes() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">Schemes & Subsidies</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">The Ministry of Cooperation oversees various schemes and financial subsidies to empower primary agricultural credit societies (PACS) and other cooperatives.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border border-ink-200 p-4 rounded-lg">
                <h4 className="font-bold text-ink-900">PACS Computerization</h4>
                <p className="text-sm mt-2 text-ink-600">?2,516 Crore budget allocation to onboard 63,000 PACS to a unified national ERP platform.</p>
            </div>
            <div className="border border-ink-200 p-4 rounded-lg">
                <h4 className="font-bold text-ink-900">Agri-Infrastructure Fund (AIF)</h4>
                <p className="text-sm mt-2 text-ink-600">Interest subvention of 3% for developing post-harvest management infrastructure at the society level.</p>
            </div>
        </div>
      </div>
    </main>
  );
}
