import React from 'react';

export default function Pmfby() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">Crop Insurance (PMFBY)</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">Pradhan Mantri Fasal Bima Yojana (PMFBY) is the flagship agricultural insurance scheme supported by the cooperative network.</p>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded mt-4">
            <h4 className="font-bold text-amber-900">National Insurance Helpline: 14447</h4>
            <p className="text-sm text-amber-800 mt-1">Report localized crop loss within 72 hours of adverse weather events.</p>
        </div>
        <p className="mt-4">Over ?1.50 Lakh Crore has been disbursed to farmers' accounts via Direct Benefit Transfer (DBT) directly linked through their cooperative bank accounts.</p>
      </div>
    </main>
  );
}
