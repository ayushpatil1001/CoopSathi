export interface VerifiedSource {
  id: string;
  title: string;
  authority: string;
  actOrScheme: string;
  sectionOrDoc: string;
  excerpt: string;
  url?: string;
  verifiedDate: string;
}

export const BACKEND_VERIFIED_SOURCES: Record<string, VerifiedSource> = {
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
  pmfby_claim_intimation: {
    id: 'SRC-PMFBY-CLAUSE21',
    title: 'Post-Harvest and Localized Calamities 72-Hour Loss Intimation Rule',
    authority: 'Ministry of Agriculture & Farmers Welfare',
    actOrScheme: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) Operational Guidelines',
    sectionOrDoc: 'Section XXI: Assessment of Localized Calamities',
    excerpt: 'In case of localized perils (hailstorm, landslide, inundation, cloudburst) or post-harvest loss within 14 days of harvest, the insured farmer MUST intimate the loss within 72 hours via the Crop Insurance App, toll-free helpline 14447, or nearest agriculture office.',
    url: 'https://pmfby.gov.in',
    verifiedDate: '20 Apr 2024'
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

export const BACKEND_SCHEMES = [
  {
    id: 'SCHEME-PM-KISAN',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    category: 'agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    shortDesc: 'Direct income support of ₹6,000 per year in three equal instalments of ₹2,000 to landholding farmer families.',
    benefits: ['₹6,000 annual DBT transfer', 'Zero intermediaries', 'Direct bank credit'],
    eligibility: ['Landholding farmer families', 'Active Aadhaar-DBT linked bank account'],
    officialUrl: 'https://pmkisan.gov.in'
  },
  {
    id: 'SCHEME-PACS-COMP',
    title: 'PACS Computerization & Modernization Project',
    category: 'cooperative',
    ministry: 'Ministry of Cooperation, GoI',
    shortDesc: 'Centrally sponsored ₹2,516 Cr project to digitize 63,000 functional PACS across India with ERP software.',
    benefits: ['Cloud ERP for societies', 'Instant KCC loan processing', '25+ diversified citizen services'],
    eligibility: ['Functional PACS registered under State Co-op Acts'],
    officialUrl: 'https://cooperation.gov.in/pacs-computerization'
  },
  {
    id: 'SCHEME-PMFBY',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'insurance',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    shortDesc: 'Comprehensive risk insurance covering yield loss, localized natural calamities, and post-harvest losses.',
    benefits: ['Only 2% Kharif / 1.5% Rabi premium', '72-hour localized calamity claims', 'Direct DBT settlement'],
    eligibility: ['Farmers cultivating notified crops in notified areas'],
    officialUrl: 'https://pmfby.gov.in'
  },
  {
    id: 'SCHEME-KCC',
    title: 'Kisan Credit Card (KCC) 4% Prompt Repayment Scheme',
    category: 'credit',
    ministry: 'Ministry of Finance & Ministry of Agriculture',
    shortDesc: 'Affordable working capital crop loans up to ₹3 Lakh at an effective interest rate of 4% per annum.',
    benefits: ['3% Prompt Repayment Incentive', 'Collateral-free up to ₹1.60 Lakh', 'Valid for 5 years'],
    eligibility: ['Individual owner cultivators, tenant farmers, and sharecroppers'],
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc'
  },
  {
    id: 'SCHEME-JAN-AUSHADHI-PACS',
    title: 'Pradhan Mantri Bhartiya Janaushadhi Kendra (PMBJK) through PACS',
    category: 'rural',
    ministry: 'Ministry of Cooperation & Chemicals/Fertilizers',
    shortDesc: 'Empowering PACS to open generic medicine pharmacies with 50% to 90% discounts and ₹5 Lakh subsidy.',
    benefits: ['Up to ₹5 Lakh government grant for setup', '20% trade margin for PACS', 'Low-cost medicines'],
    eligibility: ['Eligible PACS with minimum 120 sq ft commercial space & licensed pharmacist'],
    officialUrl: 'https://janaushadhi.gov.in'
  }
];

export const BACKEND_GRIEVANCES = [
  {
    referenceNumber: 'COOP-2026-MH-84920',
    category: 'Cooperative Society Issue',
    subject: 'Denial of Voting Rights in Society Annual General Meeting',
    applicantName: 'Rameshwar Patil',
    district: 'Kolhapur',
    state: 'Maharashtra',
    assignedAuthority: 'District Registrar of Cooperative Societies, Kolhapur',
    status: 'Assigned to Authority',
    submittedAt: '24 Aug 2026, 10:30 AM',
    timeline: [
      { stage: 'Submitted', date: '24 Aug 2026', completed: true, remarks: 'Registered via CoopSathi AI.' },
      { stage: 'Under Review', date: '26 Aug 2026', completed: true, remarks: 'Checked against MSCS Act Sec 29.' },
      { stage: 'Assigned to Authority', date: '28 Aug 2026', completed: true, remarks: 'Forwarded to Assistant Registrar Kolhapur.' },
      { stage: 'Resolved', date: 'Pending', completed: false, remarks: 'Hearing scheduled.' }
    ]
  },
  {
    referenceNumber: 'PMFBY-2026-UP-41029',
    category: 'Insurance Claim',
    subject: 'Delayed Kharif Crop Loss Payout for Inundated Paddy Fields',
    applicantName: 'Satish Kumar Yadav',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    assignedAuthority: 'State PMFBY Grievance Redressal Committee',
    status: 'Resolved',
    submittedAt: '12 Jul 2026',
    timeline: [
      { stage: 'Submitted', date: '12 Jul 2026', completed: true, remarks: 'Loss intimation under Clause 21.6.' },
      { stage: 'Under Review', date: '15 Jul 2026', completed: true, remarks: 'Survey report verified.' },
      { stage: 'Assigned to Authority', date: '19 Jul 2026', completed: true, remarks: 'Escalated with 12% penal interest notice.' },
      { stage: 'Resolved', date: '28 Aug 2026', completed: true, remarks: 'Full compensation credited to farmer account.' }
    ]
  }
];

export const BACKEND_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
];
