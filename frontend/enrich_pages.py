import os

pages_data = {
    'About': {
        'title': 'About Ministry of Cooperation',
        'content': '''<p className="mb-4">The Ministry of Cooperation was created by the Government of India on 6 July 2021 with the vision of "Sahakar Se Samriddhi" (Prosperity through Cooperation).</p>
        <p className="mb-4">It provides a separate administrative, legal, and policy framework for strengthening the cooperative movement in the country. The Ministry works to streamline processes for "Ease of doing business" for co-operatives and enables the development of Multi-State Co-operative Societies (MSCS).</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Key Objectives:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>To realize the vision of "Sahakar se Samriddhi".</li>
            <li>To deepen co-operatives as a true people-based movement reaching up to the grassroots.</li>
            <li>To develop a cooperative based economic model where each member works with a spirit of responsibility.</li>
        </ul>'''
    },
    'Laws': {
        'title': 'MSCS Act 2023 & Cooperative Laws',
        'content': '''<p className="mb-4">The Multi-State Co-operative Societies (Amendment) Act, 2023 was introduced to enhance transparency, accountability, and ease of doing business in the cooperative sector.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Key Provisions:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Establishment of the Cooperative Election Authority (CEA) to conduct fair and timely elections.</li>
            <li>Appointment of Cooperative Ombudsman for the redressal of grievances.</li>
            <li>Rehabilitation and Reconstruction Fund for reviving sick multi-state cooperative societies.</li>
            <li>Concurrent audit provisions to ensure financial discipline.</li>
        </ul>'''
    },
    'Schemes': {
        'title': 'Schemes & Subsidies',
        'content': '''<p className="mb-4">The Ministry of Cooperation oversees various schemes and financial subsidies to empower primary agricultural credit societies (PACS) and other cooperatives.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border border-ink-200 p-4 rounded-lg">
                <h4 className="font-bold text-ink-900">PACS Computerization</h4>
                <p className="text-sm mt-2 text-ink-600">?2,516 Crore budget allocation to onboard 63,000 PACS to a unified national ERP platform.</p>
            </div>
            <div className="border border-ink-200 p-4 rounded-lg">
                <h4 className="font-bold text-ink-900">Agri-Infrastructure Fund (AIF)</h4>
                <p className="text-sm mt-2 text-ink-600">Interest subvention of 3% for developing post-harvest management infrastructure at the society level.</p>
            </div>
        </div>'''
    },
    'Pacs': {
        'title': 'PACS Services & ERP',
        'content': '''<p className="mb-4">Primary Agricultural Credit Societies (PACS) form the grassroots level of the short-term cooperative credit structure in India.</p>
        <p className="mb-4">Under the historic digital modernization initiative, over 63,000 PACS are being computerized to function as Multi-Service Centers (MSCs).</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Available CSC Services through PACS:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Banking & Micro-ATM Services</li>
            <li>Direct Benefit Transfer (DBT)</li>
            <li>Fertilizer and Seed Distribution</li>
            <li>FSSAI License registration</li>
        </ul>'''
    },
    'Pmfby': {
        'title': 'Crop Insurance (PMFBY)',
        'content': '''<p className="mb-4">Pradhan Mantri Fasal Bima Yojana (PMFBY) is the flagship agricultural insurance scheme supported by the cooperative network.</p>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded mt-4">
            <h4 className="font-bold text-amber-900">National Insurance Helpline: 14447</h4>
            <p className="text-sm text-amber-800 mt-1">Report localized crop loss within 72 hours of adverse weather events.</p>
        </div>
        <p className="mt-4">Over ?1.50 Lakh Crore has been disbursed to farmers' accounts via Direct Benefit Transfer (DBT) directly linked through their cooperative bank accounts.</p>'''
    },
    'Ombudsman': {
        'title': 'Cooperative Ombudsman Redressal',
        'content': '''<p className="mb-4">In accordance with Section 85 of the MSCS (Amendment) Act 2023, the Cooperative Ombudsman acts as an independent authority to resolve disputes and grievances.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Jurisdiction:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Disputes regarding elections and membership rights.</li>
            <li>Grievances related to deposit returns and share certificates.</li>
            <li>Financial irregularities or maladministration within MSCS.</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700">Lodge Official Complaint (Form VI)</button>'''
    },
    'Ncct': {
        'title': 'NCCT Training & Capacity Building',
        'content': '''<p className="mb-4">The National Council for Cooperative Training (NCCT) is responsible for organizing cooperative education and training programs for personnel working in the cooperative sector.</p>
        <p className="mb-4">NCCT operates through VAMNICOM (Pune) and 19 Institutes of Cooperative Management (ICMs) located across different states.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Flagship Programs:</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li>Higher Diploma in Cooperative Management (HDCM)</li>
            <li>Diploma in Cooperative Audit</li>
            <li>Leadership Development Programs for Board of Directors</li>
        </ul>'''
    },
    'Telemetry': {
        'title': 'National Cooperative Database Telemetry',
        'content': '''<p className="mb-4">The National Cooperative Database (NCD) is a comprehensive, centralized data repository capturing real-time analytics across all 36 States and UTs.</p>
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
        </div>'''
    }
}

for page, data in pages_data.items():
    content = f"""import React from 'react';

export default function {page}() {{
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-ink-900 mb-6">{data['title']}</h1>
      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700">
        {data['content']}
      </div>
    </main>
  );
}}
"""
    with open(f"src/pages/{page}.tsx", "w", encoding="utf-8") as f:
        f.write(content)

print("Enriched pages.")
