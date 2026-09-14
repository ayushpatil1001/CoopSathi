import React from 'react';

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">About Ministry of Cooperation</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        <p className="mb-4">The Ministry of Cooperation was created by the Government of India on 6 July 2021 with the vision of "Sahakar Se Samriddhi" (Prosperity through Cooperation).</p>
        <p className="mb-4">It provides a separate administrative, legal, and policy framework for strengthening the cooperative movement in the country. The Ministry works to streamline processes for "Ease of doing business" for co-operatives and enables the development of Multi-State Co-operative Societies (MSCS).</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Key Objectives:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>To realize the vision of "Sahakar se Samriddhi".</li>
            <li>To deepen co-operatives as a true people-based movement reaching up to the grassroots.</li>
            <li>To develop a cooperative based economic model where each member works with a spirit of responsibility.</li>
        </ul>
      </div>
    </main>
  );
}
