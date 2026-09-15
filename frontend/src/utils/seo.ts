// Centralized SEO configuration for all pages
// Domain: https://coopsathi.gov.in

export interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  schemaType?: 'WebPage' | 'FAQPage' | 'GovernmentService';
  faqItems?: { question: string; answer: string }[];
}

const BASE_DOMAIN = 'https://coopsathi.gov.in';
const OG_IMAGE = `${BASE_DOMAIN}/og-image.svg`;
const SITE_NAME = 'CoopSathi AI — Ministry of Cooperation, Government of India';

export const SEO_PAGES: Record<string, SEOConfig> = {
  home: {
    title: 'CoopSathi AI — Ministry of Cooperation, Government of India',
    description: 'Official AI-powered portal of the Ministry of Cooperation, Government of India. Access PACS services, PMFBY crop insurance, MSCS Act 2023, cooperative schemes, and the CoopSathi AI chatbot.',
    canonical: `${BASE_DOMAIN}/`,
    schemaType: 'WebPage',
  },
  about: {
    title: 'About the Ministry of Cooperation — CoopSathi AI',
    description: 'Learn about the Ministry of Cooperation, Government of India — established in 2021 with the vision of Sahakar Se Samriddhi (Prosperity through Cooperation) to strengthen cooperative societies.',
    canonical: `${BASE_DOMAIN}/about`,
    schemaType: 'WebPage',
  },
  schemes: {
    title: 'Government Cooperative Schemes — PACS, KCC, PMFBY | CoopSathi AI',
    description: 'Explore all official government cooperative schemes including PACS Computerization, Kisan Credit Card (KCC), PMFBY crop insurance, BBSSL seeds, NCOL organics, and NCEL exports.',
    canonical: `${BASE_DOMAIN}/schemes`,
    schemaType: 'FAQPage',
    faqItems: [
      { question: 'What is the Kisan Credit Card (KCC) scheme?', answer: 'KCC provides short-term crop loans to farmers at an effective 4% per annum under the Modified Interest Subvention Scheme (MISS) for loans up to ₹3,00,000.' },
      { question: 'How do I apply for PACS computerization?', answer: 'Contact your nearest PACS or visit cooperation.gov.in to apply for ERP onboarding under the ₹2,516 Cr PACS Computerization scheme.' },
      { question: 'What is BBSSL?', answer: 'Bharatiya Beej Sahakari Samiti Limited (BBSSL) is a national cooperative for quality seed multiplication and distribution directly from PACS farmers.' },
    ],
  },
  laws: {
    title: 'MSCS Act 2023 & Cooperative Laws — CoopSathi AI',
    description: 'Access the Multi-State Co-operative Societies (Amendment) Act 2023, model by-laws for PACS, cooperative election rules, CRCS gazette notifications, and ombudsman regulations.',
    canonical: `${BASE_DOMAIN}/laws`,
    schemaType: 'WebPage',
  },
  pacs: {
    title: 'PACS Services — Primary Agricultural Credit Society Computerization | CoopSathi AI',
    description: 'Access PACS ERP services, Common Service Center (CSC) integration, PACS computerization status, Jan Aushadhi Kendra, and 25+ multipurpose cooperative services.',
    canonical: `${BASE_DOMAIN}/pacs`,
    schemaType: 'FAQPage',
    faqItems: [
      { question: 'How many PACS are computerized in India?', answer: 'As of 2026, 79,630 PACS have been onboarded on the common ERP platform under the ₹2,516 Cr computerization scheme.' },
      { question: 'What services do computerized PACS offer?', answer: 'Computerized PACS offer 25+ services including banking, fertilizer distribution, seed supply, Pradhan Mantri Jan Aushadhi Kendras, and Common Service Center (CSC) services.' },
    ],
  },
  pmfby: {
    title: 'PMFBY Crop Insurance — Pradhan Mantri Fasal Bima Yojana | CoopSathi AI',
    description: 'Apply for PMFBY crop insurance, track claims, report crop loss within 72 hours, and learn about premium rates (2% Kharif, 1.5% Rabi) for all notified crops across India.',
    canonical: `${BASE_DOMAIN}/pmfby`,
    schemaType: 'FAQPage',
    faqItems: [
      { question: 'What is the PMFBY premium rate for Kharif crops?', answer: 'Farmers pay only 2% of the sum insured for Kharif crops under PMFBY; the rest is subsidized by Central and State governments.' },
      { question: 'How to report crop loss under PMFBY?', answer: 'Report localized crop loss within 72 hours via the Crop Insurance App or the national toll-free helpline 14447.' },
    ],
  },
  ombudsman: {
    title: 'Cooperative Ombudsman — Grievance Redressal | CoopSathi AI',
    description: 'File statutory grievances with the Cooperative Ombudsman under Section 85A of MSCS Act 2023. Download Form VI and Form VII, track complaints online through crcs.gov.in.',
    canonical: `${BASE_DOMAIN}/ombudsman`,
    schemaType: 'GovernmentService',
  },
  ncct: {
    title: 'NCCT Cooperative Management Training — VAMNICOM | CoopSathi AI',
    description: 'Enroll in cooperative management education at VAMNICOM Pune and 19 Institutes of Cooperative Management (ICMs). Higher Diploma, national certificate programs, and leadership training.',
    canonical: `${BASE_DOMAIN}/ncct`,
    schemaType: 'WebPage',
  },
  telemetry: {
    title: 'National Cooperative Telemetry & Data Dashboard | CoopSathi AI',
    description: 'Access the National Cooperative Database (NCD) with real-time telemetry data on 8.5 lakh cooperative societies, 30 crore members, and PACS ERP operational metrics.',
    canonical: `${BASE_DOMAIN}/telemetry`,
    schemaType: 'WebPage',
  },
};

export const BASE_OG_IMAGE = OG_IMAGE;
export const BASE_SITE_NAME = SITE_NAME;
export const BASE_DOMAIN_URL = BASE_DOMAIN;
