import React from 'react';

export default function Pacs() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">PACS Services & ERP</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">Primary Agricultural Credit Societies (PACS) form the grassroots level of the short-term cooperative credit structure in India.</p>
        <p className="mb-4">Under the historic digital modernization initiative, over 63,000 PACS are being computerized to function as Multi-Service Centers (MSCs).</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Available CSC Services through PACS:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Banking & Micro-ATM Services</li>
            <li>Direct Benefit Transfer (DBT)</li>
            <li>Fertilizer and Seed Distribution</li>
            <li>FSSAI License registration</li>
        </ul>
      </div>
    </main>
  );
}
