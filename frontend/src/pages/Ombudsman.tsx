import React from 'react';

export default function Ombudsman() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">Cooperative Ombudsman Redressal</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">In accordance with Section 85 of the MSCS (Amendment) Act 2023, the Cooperative Ombudsman acts as an independent authority to resolve disputes and grievances.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Jurisdiction:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Disputes regarding elections and membership rights.</li>
            <li>Grievances related to deposit returns and share certificates.</li>
            <li>Financial irregularities or maladministration within MSCS.</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700">Lodge Official Complaint (Form VI)</button>
      </div>
    </main>
  );
}
