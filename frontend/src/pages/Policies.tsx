import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function Policies() {
  const location = useLocation();
  const path = location.pathname.replace('/', '') || 'privacy';

  const policyTitles: Record<string, { title: string; desc: string }> = {
    privacy: {
      title: 'Privacy Policy',
      desc: 'Information collection, data protection principles, and citizen privacy safeguards under Ministry of Cooperation portals.',
    },
    terms: {
      title: 'Terms of Use',
      desc: 'Terms, statutory conditions, and acceptable use guidelines governing the CoopSathi AI and Ministry of Cooperation web platforms.',
    },
    copyright: {
      title: 'Copyright Policy',
      desc: 'Ownership of published statutory notices, gazettes, data sets, and reproduction guidelines for public cooperative materials.',
    },
    hyperlink: {
      title: 'Hyperlinking Policy',
      desc: 'Guidelines for linking to and from Ministry of Cooperation and allied Government of India portals.',
    },
    accessibility: {
      title: 'Accessibility Statement',
      desc: 'Commitment to Guidelines for Indian Government Websites (GIGW 3.0) and Web Content Accessibility Guidelines (WCAG 2.1 Level AA).',
    },
    disclaimer: {
      title: 'Disclaimer',
      desc: 'Legal disclaimer regarding advisory information, statutory interpretations, and automated AI assistance.',
    },
    sitemap: {
      title: 'Portal Sitemap',
      desc: 'Hierarchical navigation directory of all sections, services, citizen helpdesks, and statutory legal resources on CoopSathi AI.',
    },
  };

  const current = policyTitles[path] || policyTitles.privacy;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 min-h-[65vh]" id="main-content">
      <SEOHead
        title={`${current.title} — Ministry of Cooperation, Government of India`}
        description={current.desc}
        canonical={`https://coopsathi.gov.in/${path}`}
        schemaType="WebPage"
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-500">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-ink-800 transition">Home</Link></li>
          <li><span className="mx-1">›</span></li>
          <li className="text-ink-700 font-medium">{current.title}</li>
        </ol>
      </nav>

      {/* ONE H1 PER PAGE */}
      <h1 className="text-3xl font-bold text-ink-900 mb-2">{current.title}</h1>
      <p className="text-ink-500 text-sm mb-8">{current.desc}</p>

      {/* Policy Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-ink-200 text-xs">
        {Object.entries(policyTitles).map(([key, val]) => (
          <Link
            key={key}
            to={`/${key}`}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              path === key
                ? 'bg-ink-900 text-white'
                : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-100'
            }`}
          >
            {val.title}
          </Link>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg border border-ink-200 shadow-sm text-ink-700 space-y-6 leading-relaxed">
        {path === 'privacy' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">1. Information Collection and Purpose</h2>
            <p>
              The Ministry of Cooperation and the CoopSathi AI platform do not automatically capture any specific personal information (like name, phone number, or e-mail address) that allows us to identify you individually, unless you specifically choose to provide such information (for example, when filing a grievance, searching claim status, or using interactive helpdesk tools).
            </p>
            <h2 className="text-xl font-bold text-ink-900">2. Data Security & Storage</h2>
            <p>
              All interactions with the CoopSathi AI portal are protected under 256-bit TLS/SSL encryption. Statutory grievances and claims queries are routed directly through authorized National Informatics Centre (NIC) and Ministry of Cooperation backend systems. No personal banking or Aadhaar data is stored unencrypted.
            </p>
            <h2 className="text-xl font-bold text-ink-900">3. Cookies & Session Storage</h2>
            <p>
              This portal uses minimal functional session cookies strictly required for maintaining your preferred regional language (e.g., Hindi, Marathi, Tamil) and high-contrast accessibility preferences. No commercial tracking or third-party advertising cookies are deployed.
            </p>
          </>
        )}

        {path === 'terms' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this portal, you agree to comply with and be bound by these Terms of Use, framed in accordance with the Information Technology Act, 2000 and the Multi-State Co-operative Societies Act, 2023.
            </p>
            <h2 className="text-xl font-bold text-ink-900">2. Official Statutory Records</h2>
            <p>
              While CoopSathi AI strives to provide the latest guidelines, gazette notifications, and scheme rules, the authoritative legal text remains the Gazette of India published by the Department of Publication.
            </p>
            <h2 className="text-xl font-bold text-ink-900">3. Unacceptable Use</h2>
            <p>
              Users shall not attempt to breach security controls, introduce malicious code, execute denial-of-service queries, or submit fabricated claims or false statutory complaints.
            </p>
          </>
        )}

        {path === 'copyright' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">1. Material Ownership</h2>
            <p>
              The material featured on this website is subject to Government of India copyright protection under the Ministry of Cooperation, unless indicated otherwise.
            </p>
            <h2 className="text-xl font-bold text-ink-900">2. Permitted Reproduction</h2>
            <p>
              The material may be reproduced free of charge in any format or media without requiring specific permission, provided the material is reproduced accurately, not used in a derogatory manner or misleading context, and the source is prominently acknowledged as the <em>Ministry of Cooperation, Government of India</em>.
            </p>
          </>
        )}

        {path === 'hyperlink' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">1. Links to External Websites</h2>
            <p>
              At many places in this website, you will find links to other websites/portals (e.g., NABARD, CRCS, PMFBY, NCCT). These links have been placed for your convenience. The Ministry of Cooperation is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them.
            </p>
            <h2 className="text-xl font-bold text-ink-900">2. Linking to CoopSathi AI</h2>
            <p>
              Prior permission is not required to link directly to the information hosted on this portal. However, we do not permit our pages to be loaded into frames on external sites.
            </p>
          </>
        )}

        {path === 'accessibility' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">1. Compliance Commitment</h2>
            <p>
              We are committed to ensuring that the CoopSathi AI portal is accessible to all users irrespective of device in use, technology, or ability. It has been built with an aim to comply with Guidelines for Indian Government Websites (GIGW 3.0) and World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            </p>
            <h2 className="text-xl font-bold text-ink-900">2. Accessibility Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Skip to Main Content:</strong> Direct keyboard shortcut for screen reader and keyboard-only users.</li>
              <li><strong>Font Resizing Controls:</strong> Interactive A-, A, A+ buttons allowing scaling without layout breakage.</li>
              <li><strong>High Contrast Mode:</strong> High contrast color schemes for visually impaired citizens.</li>
              <li><strong>Speech Synthesis & Recognition:</strong> Multilingual audio support across official languages.</li>
              <li><strong>Descriptive Alt Text:</strong> All images, emblems, and visual icons contain descriptive text.</li>
            </ul>
          </>
        )}

        {path === 'disclaimer' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">1. Advisory Nature of AI Assistant</h2>
            <p>
              CoopSathi AI is an automated government information and advisory assistant trained on verified gazettes, Model By-laws, and operational guidelines. The outputs generated are for informational and navigational assistance.
            </p>
            <h2 className="text-xl font-bold text-ink-900">2. Statutory Grievances & Court Filings</h2>
            <p>
              For formal statutory dispute redressal, petitions must be submitted through the prescribed Form VI or Form VII directly to the Central Registrar of Cooperative Societies (CRCS) or the designated Co-operative Ombudsman.
            </p>
          </>
        )}

        {path === 'sitemap' && (
          <>
            <h2 className="text-xl font-bold text-ink-900">CoopSathi AI — Portal Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              <div className="border border-ink-100 p-4 rounded-lg bg-ink-50">
                <h3 className="font-bold text-ink-900 mb-2">Core Navigation</h3>
                <ul className="space-y-1 text-sm text-emerald-800">
                  <li><Link to="/" className="hover:underline">Home Portal</Link></li>
                  <li><Link to="/about" className="hover:underline">About the Ministry</Link></li>
                  <li><Link to="/laws" className="hover:underline">MSCS Act 2023 & Rules</Link></li>
                  <li><Link to="/schemes" className="hover:underline">Government Schemes & Subsidies</Link></li>
                  <li><Link to="/telemetry" className="hover:underline">National Cooperative Telemetry</Link></li>
                  <li><Link to="/chat" className="hover:underline">CoopSathi AI Full Terminal</Link></li>
                </ul>
              </div>
              <div className="border border-ink-100 p-4 rounded-lg bg-ink-50">
                <h3 className="font-bold text-ink-900 mb-2">Citizen Services</h3>
                <ul className="space-y-1 text-sm text-emerald-800">
                  <li><Link to="/pacs" className="hover:underline">PACS ERP & Digital Services</Link></li>
                  <li><Link to="/pmfby" className="hover:underline">PMFBY Crop Insurance & Claims</Link></li>
                  <li><Link to="/ombudsman" className="hover:underline">Cooperative Ombudsman (Form VI/VII)</Link></li>
                  <li><Link to="/ncct" className="hover:underline">NCCT Management Training</Link></li>
                </ul>
              </div>
              <div className="border border-ink-100 p-4 rounded-lg bg-ink-50">
                <h3 className="font-bold text-ink-900 mb-2">Statutory Policies</h3>
                <ul className="space-y-1 text-sm text-emerald-800">
                  <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
                  <li><Link to="/copyright" className="hover:underline">Copyright Policy</Link></li>
                  <li><Link to="/hyperlink" className="hover:underline">Hyperlinking Policy</Link></li>
                  <li><Link to="/accessibility" className="hover:underline">Accessibility Statement</Link></li>
                  <li><Link to="/disclaimer" className="hover:underline">Legal Disclaimer</Link></li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-ink-100">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-500 mb-4">Related Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Home Portal</Link>
          <Link to="/schemes" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">All Schemes</Link>
          <Link to="/ombudsman" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Grievance Ombudsman</Link>
          <Link to="/chat" className="text-sm bg-white border border-ink-200 hover:border-emerald-400 text-ink-700 px-4 py-2 rounded-lg transition">Ask AI Assistant</Link>
        </div>
      </div>
    </main>
  );
}
