import React from 'react';

export default function Telemetry() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">National Cooperative Database Telemetry</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">The National Cooperative Database (NCD) is a comprehensive, centralized data repository capturing real-time analytics across all 36 States and UTs.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-ink-900 text-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold">8.54 Lakh</div>
                <div className="text-sm text-ink-300 mt-2">Registered Societies</div>
            </div>
            <div className="bg-ink-900 text-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold">29.00 Crore</div>
                <div className="text-sm text-ink-300 mt-2">Total Members</div>
            </div>
            <div className="bg-ink-900 text-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold">31.5 Lakh</div>
                <div className="text-sm text-ink-300 mt-2">Daily Transactions</div>
            </div>
        </div>
      </div>
    </main>
  );
}
