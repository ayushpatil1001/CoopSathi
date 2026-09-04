import { VerifiedSource, KnowledgeDocument } from '../types';

export const MOCK_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'DOC-MSCS-2023',
    title: 'Multi-State Co-operative Societies (Amendment) Act, 2023',
    category: 'Cooperative Law',
    fileType: 'Gazette',
    version: 'Act No. 11 of 2023',
    lastUpdated: '2024-02-15',
    isVerified: true,
    ragStatus: 'Live',
    totalChunks: 142,
    authority: 'Ministry of Cooperation, Government of India',
  },
  {
    id: 'DOC-PACS-BYLAWS',
    title: 'Model By-Laws for Primary Agricultural Credit Societies (PACS)',
    category: 'PACS Governance',
    fileType: 'PDF',
    version: 'v2.4 Final',
    lastUpdated: '2024-04-10',
    isVerified: true,
    ragStatus: 'Live',
    totalChunks: 98,
    authority: 'Ministry of Cooperation & NABARD',
  },
  {
    id: 'DOC-PMFBY-2024',
    title: 'PM Fasal Bima Yojana (PMFBY) Revised Operational Guidelines',
    category: 'Crop Insurance',
    fileType: 'PDF',
    version: 'Rev. 2024-25',
    lastUpdated: '2024-06-01',
    isVerified: true,
    ragStatus: 'Live',
    totalChunks: 185,
    authority: 'Ministry of Agriculture & Farmers Welfare, GoI',
  },
  {
    id: 'DOC-NCCT-TRAIN',
    title: 'NCCT Cooperative Management & Governance Training Curriculum',
    category: 'Education & Training',
    fileType: 'PDF',
    version: 'NCCT-2024',
    lastUpdated: '2024-01-20',
    isVerified: true,
    ragStatus: 'Live',
    totalChunks: 64,
    authority: 'National Council for Cooperative Training (NCCT)',
  },
  {
    id: 'DOC-AIF-GUIDELINES',
    title: 'Agriculture Infrastructure Fund (AIF) Financing Facility for PACS',
    category: 'Schemes',
    fileType: 'PDF',
    version: 'Cir. No. 4/2023',
    lastUpdated: '2023-11-12',
    isVerified: true,
    ragStatus: 'Live',
    totalChunks: 52,
    authority: 'Department of Agriculture & Farmers Welfare',
  },
  {
    id: 'DOC-COOP-ELECTION',
    title: 'Co-operative Election Authority Rules & Dispute Redressal Mechanism',
    category: 'Cooperative Law',
    fileType: 'Gazette',
    version: 'GSR 532(E)',
    lastUpdated: '2023-09-08',
    isVerified: true,
    ragStatus: 'Live',
    totalChunks: 76,
    authority: 'Central Registrar of Cooperative Societies (CRCS)',
  }
];

export const MOCK_VERIFIED_SOURCES: Record<string, VerifiedSource> = {
  mscs_voting_rights: {
    id: 'SRC-MSCS-SEC29',
    title: 'Voting Rights and Active Membership Requirements',
    authority: 'Central Registrar of Cooperative Societies (CRCS)',
    actOrScheme: 'Multi-State Co-operative Societies Act, 2002 (Amended 2023)',
    sectionOrDoc: 'Section 29 & Section 38',
    excerpt: 'No member of a multi-state co-operative society shall exercise the rights of a member, including voting in elections or general body meetings, unless they have attended at least three consecutive general meetings and utilized the minimum level of products or services of the society as specified in the bye-laws.',
    url: 'https://cooperation.gov.in/act-rules',
    verifiedDate: '15 Aug 2023'
  },
  mscs_election_authority: {
    id: 'SRC-MSCS-SEC45',
    title: 'Co-operative Election Authority Establishment',
    authority: 'Ministry of Cooperation, GoI',
    actOrScheme: 'MSCS Amendment Act 2023',
    sectionOrDoc: 'Section 45',
    excerpt: 'The Central Government shall establish an independent "Co-operative Election Authority" to conduct free, fair, and timely elections of the board of multi-state co-operative societies, preventing arbitrary tenures and ensuring democratic control.',
    url: 'https://cooperation.gov.in',
    verifiedDate: '03 Aug 2023'
  },
  pacs_multipurpose: {
    id: 'SRC-PACS-MOD-01',
    title: 'Model By-Laws: Diversification into 25+ Economic Activities',
    authority: 'Ministry of Cooperation & NABARD',
    actOrScheme: 'Model By-Laws for Primary Agricultural Credit Societies (PACS)',
    sectionOrDoc: 'Clause 4: Objects and Activities',
    excerpt: 'PACS are empowered to operate beyond short-term credit: establishing Custom Hiring Centres for farm machinery, managing Fair Price Shops, setting up Pradhan Mantri Jan Aushadhi Kendras, running Common Service Centres (CSC), and acting as LPG/petrol retail outlets.',
    url: 'https://cooperation.gov.in/model-bye-laws',
    verifiedDate: '10 Jan 2024'
  },
  pacs_computerization: {
    id: 'SRC-PACS-COMP-02',
    title: 'Centrally Sponsored Project for Computerization of 63,000 PACS',
    authority: 'Ministry of Cooperation, GoI',
    actOrScheme: 'PACS Computerization Guidelines',
    sectionOrDoc: 'Cabinet Note & Operational Norms (Outlay Rs. 2,516 Crore)',
    excerpt: 'All functional PACS are being integrated with an ERP-based common national software connecting PACS directly to District Central Cooperative Banks (DCCBs) and State Cooperative Banks (StCBs) to prevent audit leakage and enable instantaneous Kisan Credit Card disbursements.',
    url: 'https://cooperation.gov.in/pacs-computerization',
    verifiedDate: '14 Feb 2024'
  },
  pmfby_claim_intimation: {
    id: 'SRC-PMFBY-CLAUSE21',
    title: 'Post-Harvest and Localized Calamities 72-Hour Loss Intimation Rule',
    authority: 'Ministry of Agriculture & Farmers Welfare',
    actOrScheme: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) Operational Guidelines',
    sectionOrDoc: 'Section XXI: Assessment of Localized Calamities & Post-Harvest Losses',
    excerpt: 'In case of localized perils (hailstorm, landslide, inundation, cloudburst) or post-harvest loss within 14 days of cut-and-spread drying, the insured farmer MUST intimate the loss within 72 hours via the Crop Insurance App, toll-free helpline 14447, or nearest agriculture/bank branch.',
    url: 'https://pmfby.gov.in',
    verifiedDate: '20 Apr 2024'
  },
  pmfby_premium_rates: {
    id: 'SRC-PMFBY-RATES',
    title: 'Uniform Maximum Premium Rates Payable by Farmers',
    authority: 'Ministry of Agriculture & Farmers Welfare, GoI',
    actOrScheme: 'PMFBY Gazette Notification',
    sectionOrDoc: 'Schedule II: Premium Subsidies',
    excerpt: 'Farmers pay a maximum capped premium of only 2.0% of Sum Insured for Kharif foodgrain/oilseed crops, 1.5% for Rabi foodgrain/oilseed crops, and 5.0% for Annual Commercial/Horticultural crops. The remainder actuarial premium is subsidized 50:50 by Central and State Governments (90:10 for North Eastern States).',
    url: 'https://pmfby.gov.in/premiumCalculator',
    verifiedDate: '01 Jun 2024'
  },
  ncct_diploma: {
    id: 'SRC-NCCT-01',
    title: 'Higher Diploma in Cooperative Management (HDCM)',
    authority: 'National Council for Cooperative Training (NCCT)',
    actOrScheme: 'NCCT Training Standards & Accreditation',
    sectionOrDoc: 'Academic Handbook Chapter 2',
    excerpt: 'NCCT coordinates training for cooperative personnel across 1 VAMNICOM (National Institute at Pune) and 14 Institutes of Cooperative Management (ICMs) across India, providing recognized diplomas for PACS secretaries, cooperative bank managers, and state audit officers.',
    url: 'https://ncct.ac.in',
    verifiedDate: '15 Jan 2024'
  },
  coop_ombudsman: {
    id: 'SRC-MSCS-OMBUDSMAN',
    title: 'Co-operative Ombudsman for Redressal of Member Complaints',
    authority: 'Ministry of Cooperation, GoI',
    actOrScheme: 'MSCS Amendment Act 2023',
    sectionOrDoc: 'Section 85A to 85C',
    excerpt: 'The Central Government appoints one or more Co-operative Ombudsmen with territorial jurisdiction to inquire into complaints filed by members of multi-state co-operative societies regarding deposits, corruption, refusal of shares, or denial of statutory records within 30 days of grievance receipt.',
    url: 'https://cooperation.gov.in/ombudsman-portal',
    verifiedDate: '12 Sep 2023'
  }
};
