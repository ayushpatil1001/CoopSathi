import { Scheme } from '../types';

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 'SCHEME-PM-KISAN',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    titleHi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    titleMr: 'प्रधानमंत्री किसान सन्मान निधी योजना',
    category: 'agriculture',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    shortDesc: 'Direct income support of ₹6,000 per year in three equal instalments of ₹2,000 to landholding farmer families.',
    fullDesc: 'PM-KISAN is a central sector scheme with 100% funding from Government of India. It aims to supplement the financial needs of all landholding farmers families in procuring various inputs to ensure proper crop health and appropriate yields.',
    eligibility: [
      'All landholding farmer families who have cultivable landholding in their names',
      'Valid Aadhaar card linked with active bank account (e-KYC mandatory)',
      'Land records (ROR / Khasra / 7-12) updated in state portal',
      'Excludes institutional landholders and constitutional post holders'
    ],
    benefits: [
      'Direct benefit transfer of ₹6,000 per annum in 3 four-monthly cycles',
      'Zero intermediaries; funds credited directly to Aadhaar-linked bank accounts',
      'Automatic integration with PMFBY and Kisan Credit Card schemes'
    ],
    applicationProcess: [
      'Visit your local PACS or Common Service Centre (CSC) with land record and Aadhaar',
      'Apply online through PM-KISAN portal (pmkisan.gov.in) using "New Farmer Registration"',
      'Complete biometric or OTP-based e-KYC',
      'State Nodal Officer verifies village land record'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    badge: 'Popular',
    deadline: 'Open throughout the year',
    targetBeneficiaries: 'Small, Marginal & Medium Farmers across India'
  },
  {
    id: 'SCHEME-PACS-COMP',
    title: 'PACS Computerization & Modernization Project',
    titleHi: 'पैक्स (PACS) का कम्प्यूटरीकरण एवं आधुनिकीकरण प्रोजेक्ट',
    titleMr: 'पॅक्स संगणकीकरण आणि आधुनिकीकरण प्रकल्प',
    category: 'cooperative',
    ministry: 'Ministry of Cooperation, GoI',
    shortDesc: 'Centrally sponsored ₹2,516 Cr project to digitize 63,000 functional Primary Agricultural Credit Societies across India.',
    fullDesc: 'The computerization of PACS with an ERP-based National Common Software brings unprecedented financial transparency, paperless auditing, direct linkages with NABARD & District Cooperative Banks, and enables PACS to offer 25+ diversified citizen services.',
    eligibility: [
      'Functional Primary Agricultural Credit Society registered under State Cooperative Societies Act',
      'PACS managing credit or non-credit business activities',
      'Cooperative members and rural consumers holding PACS passbooks'
    ],
    benefits: [
      'Free Cloud ERP software with bilingual Marathi/Hindi/regional support',
      'Instant KCC loan processing without manual ledger delays',
      'Diversification into Jan Aushadhi Kendras, Fertilizer distribution & CSC centers',
      'Seamless transparency preventing misallocation of subsidized inputs'
    ],
    applicationProcess: [
      'PACS Management Committee submits resolution to District Registrar of Cooperatives',
      'NABARD District Development Manager (DDM) conducts hardware readiness survey',
      'Staff and Secretary are trained at local Institute of Cooperative Management (ICM/NCCT)',
      'Data migration from manual ledger to live portal'
    ],
    officialUrl: 'https://cooperation.gov.in/pacs-computerization',
    badge: 'National Mission',
    deadline: 'Mission active nationwide',
    targetBeneficiaries: '63,000 PACS, 13 Crore Farmer Members'
  },
  {
    id: 'SCHEME-PMFBY',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)',
    titleMr: 'प्रधानमंत्री पीक विमा योजना',
    category: 'insurance',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    shortDesc: 'Comprehensive risk insurance covering yield loss, localized natural calamities, post-harvest losses, and prevented sowing.',
    fullDesc: 'PMFBY provides comprehensive crop insurance from pre-sowing to post-harvest against non-preventable natural risks (drought, flood, hailstorm, pest attack). The farmer pays an extremely low subsidized premium while Central and State governments pay the remainder.',
    eligibility: [
      'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas',
      'Both loanee and non-loanee farmers eligible on voluntary basis',
      'Valid land ownership record (7/12, Khasra) or tenancy agreement'
    ],
    benefits: [
      'Only 2% premium for Kharif crops, 1.5% for Rabi, and 5% for horticultural crops',
      'Post-harvest loss coverage up to 14 days after harvest',
      'Localized calamity assessment for hailstorm, landslide, and cloudburst',
      'Direct claim payout to bank accounts via National Crop Insurance Portal (NCIP)'
    ],
    applicationProcess: [
      'Enroll via nearest PACS, bank branch, or online on pmfby.gov.in before cut-off date',
      'Submit crop sowing declaration, bank passbook, and land title',
      'Pay your 1.5% or 2% farmer premium share',
      'In case of loss, report within 72 hours via Crop Insurance App or 14447'
    ],
    officialUrl: 'https://pmfby.gov.in',
    badge: 'High Subsidy',
    deadline: '31st July (Kharif) / 31st December (Rabi)',
    targetBeneficiaries: 'All farmers growing notified crops'
  },
  {
    id: 'SCHEME-AIF',
    title: 'Agriculture Infrastructure Fund (AIF) for PACS & Cooperatives',
    titleHi: 'कृषि अवसंरचना कोष (एआईएफ) - पैक्स एवं सहकारी समितियां',
    titleMr: 'कृषी पायाभूत सुविधा निधी (AIF)',
    category: 'storage',
    ministry: 'Ministry of Agriculture & Ministry of Cooperation',
    shortDesc: '3% interest subvention and credit guarantee on loans up to ₹2 Crore for modern warehouses, cold chains, and sorting units.',
    fullDesc: 'A ₹1 Lakh Crore medium-to-long term debt financing facility for post-harvest management infrastructure and community farming assets. PACS, FPOs, and cooperatives receive prioritized approval and credit guarantee through CGTMSE.',
    eligibility: [
      'Primary Agricultural Credit Societies (PACS)',
      'Farmer Producer Organizations (FPOs)',
      'Federations of Cooperatives & Agricultural Entrepreneurs',
      'Self-Help Groups (SHGs) involved in agriculture'
    ],
    benefits: [
      '3% per annum interest subvention up to a loan ceiling of ₹2 Crore for 7 years',
      'Credit guarantee coverage under Credit Guarantee Fund Trust (CGTMSE)',
      'No collateral requirement for loans up to ₹2 Crore for eligible PACS',
      'Eligible for convergence with State & Central capital subsidies'
    ],
    applicationProcess: [
      'Submit Detailed Project Report (DPR) on agriinfra.dac.gov.in portal',
      'Ministry of Cooperation & DA&FW evaluates project within 15 days',
      'Lending institution (NABARD / Cooperative Bank / Commercial Bank) inspects and disburses',
      'Subvention disbursed directly to the loan account'
    ],
    officialUrl: 'https://agriinfra.dac.gov.in',
    badge: '3% Subvention',
    deadline: 'Operational till 2032-33',
    targetBeneficiaries: 'PACS, Agri-Entrepreneurs, Cooperatives'
  },
  {
    id: 'SCHEME-KCC',
    title: 'Kisan Credit Card (KCC) & Interest Subvention Scheme (ISS)',
    titleHi: 'किसान क्रेडिट कार्ड (KCC) एवं ब्याज छूट योजना',
    titleMr: 'किसान क्रेडिट कार्ड (केसीसी) व व्याज सवलत योजना',
    category: 'credit',
    ministry: 'Ministry of Finance & Ministry of Agriculture',
    shortDesc: 'Affordable short-term working capital loans up to ₹3 Lakh at an effective interest rate of just 4% per annum upon prompt repayment.',
    fullDesc: 'KCC satisfies the credit requirements of farmers for cultivation of crops, post-harvest expenses, produce marketing, consumption requirements of farmer households, and working capital for maintenance of farm assets and allied activities (dairy, fisheries).',
    eligibility: [
      'Individual farmers / joint borrowers who are owner-cultivators',
      'Tenant farmers, oral lessees & sharecroppers',
      'Self-Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers',
      'Animal Husbandry and Fisheries farmers eligible for limit up to ₹2 Lakh'
    ],
    benefits: [
      'Standard benchmark rate of 9% reduced to 7% via 2% Government Interest Subvention',
      'Additional 3% Prompt Repayment Incentive (PRI), bringing effective interest rate down to 4%',
      'Collateral-free loan up to ₹1.60 Lakh (extended to ₹2.00 Lakh in select PACS)',
      'Flexible revolving credit valid for 5 years with annual renewal'
    ],
    applicationProcess: [
      'Visit your local PACS or DCCB branch with Land Document & Aadhaar',
      'Fill one-page simplified KCC application form',
      'PACS verifies land area and crop schedule',
      'KCC RuPay smart card issued within 14 working days'
    ],
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    badge: '4% Effective Rate',
    deadline: 'Continuous enrollment',
    targetBeneficiaries: 'All practicing farmers, milk producers, and fishers'
  },
  {
    id: 'SCHEME-JAN-AUSHADHI-PACS',
    title: 'Pradhan Mantri Bhartiya Janaushadhi Kendra (PMBJK) through PACS',
    titleHi: 'पैक्स के माध्यम से प्रधानमंत्री जन औषधि केंद्र योजना',
    titleMr: 'पॅक्स मार्फत प्रधानमंत्री जन औषधी केंद्र योजना',
    category: 'rural',
    ministry: 'Ministry of Cooperation & Ministry of Chemicals and Fertilizers',
    shortDesc: 'Empowering PACS to open generic medicine pharmacies in rural villages with 50% to 90% medicine discounts and ₹5 Lakh subsidy.',
    fullDesc: 'Under the historic initiative by the Ministry of Cooperation, over 2,000 PACS have been licensed to establish generic pharmacy outlets. This provides high-quality medicines at nominal rates to rural families while creating an independent revenue stream for cooperative societies.',
    eligibility: [
      'Eligible PACS with minimum 120 sq. ft. commercial space (owned or leased)',
      'Appointment of a licensed pharmacist (B.Pharma / D.Pharma)',
      'Registered under State Cooperative Societies Act with valid audited balance sheet'
    ],
    benefits: [
      'High-quality generic medicines available at 50% to 90% lower cost than market brands',
      'Financial incentive of up to ₹5.00 Lakh to PACS for shop setup and furniture',
      'Additional ₹2.00 Lakh incentive for North-Eastern States, Himalayan areas & aspirational districts',
      '20% trade margin on sales for the PACS society'
    ],
    applicationProcess: [
      'PACS submits online application via Department of Pharmaceuticals portal (janaushadhi.gov.in)',
      'Ministry of Cooperation endorses society eligibility',
      'Pharmaceuticals & Medical Devices Bureau of India (PMBI) grants approval and drug license assistance',
      'Store inaugural setup & supply chain onboarding'
    ],
    officialUrl: 'https://janaushadhi.gov.in',
    badge: 'New Initiative',
    deadline: 'Ongoing rollout',
    targetBeneficiaries: 'PACS Societies & Rural Patients'
  },
  {
    id: 'SCHEME-WOMEN-COOP',
    title: 'Mahila Sahakar Yojana (NCDC Assistance for Women Cooperatives)',
    titleHi: 'महिला सहकार योजना (एनसीडीसी)',
    titleMr: 'महिला सहकार योजना (NCDC)',
    category: 'women',
    ministry: 'National Cooperative Development Corporation (NCDC)',
    shortDesc: 'Concessional term loans and financial assistance exclusively for women-led cooperative societies and agro-processing units.',
    fullDesc: 'Formulated by NCDC to assist women in forming, expanding, and modernizing cooperative societies for agro-processing, food preservation, dairy, handlooms, and rural crafts. It bridges gender equity in rural cooperative leadership.',
    eligibility: [
      'Cooperative societies having 100% women membership or majority women directors',
      'Women Self-Help Groups federating into cooperative societies',
      'Viable project proposal in agribusiness, cold storage, packaging, or dairy'
    ],
    benefits: [
      'Concessional interest rate (subsidized by 2% below prevailing NCDC lending rate)',
      'Generous repayment tenure up to 8 years with initial 2-year moratorium',
      'Technical assistance and capacity building support via NCCT institutes',
      'Up to 80% project cost financed by NCDC'
    ],
    applicationProcess: [
      'Women society prepares project feasibility report with help of local ICM/NCCT',
      'Submit proposal through State Registrar of Cooperatives or directly to NCDC regional office',
      'NCDC technical appraisal committee approves credit guarantee',
      'Fund release directly to society bank account'
    ],
    officialUrl: 'https://www.ncdc.in',
    badge: 'Women Led',
    deadline: 'Open throughout year',
    targetBeneficiaries: 'Rural Women Cooperatives & SHG Federations'
  },
  {
    id: 'SCHEME-FERT-NANO',
    title: 'PM-PRANAM & Subsidized Nano Urea / DAP Distribution via PACS',
    titleHi: 'पीएम-प्रणाम एवं पैक्स के माध्यम से नैनो यूरिया/डीएपी वितरण',
    titleMr: 'पीएम-प्रणाम आणि नॅनो खत योजना',
    category: 'fertilizer',
    ministry: 'Ministry of Chemicals & Fertilizers and Ministry of Cooperation',
    shortDesc: 'Priority quota and credit facility for PACS to supply Nano Urea, Nano DAP, and organic fertilizers at controlled government prices.',
    fullDesc: 'Program for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (PM-PRANAM). Promotes balanced fertilizer usage by making IFFCO / KRIBHCO Nano fertilizers available at every village PACS without transportation markups.',
    eligibility: [
      'All registered farmers holding cooperative passbook or Aadhaar',
      'All functional PACS acting as authorized retail fertilizer distributors'
    ],
    benefits: [
      '500 ml bottle of Nano Urea replaces one 45 kg bag of conventional urea at 50% price',
      'Zero black-marketing: digital POS linked directly to cooperative society ERP',
      'Subsidized soil health testing at PACS Common Service Centre'
    ],
    applicationProcess: [
      'Visit local PACS fertilizer store',
      'Provide Aadhaar or KCC for Aadhaar-authenticated POS transaction',
      'Instant computerized receipt issued with QR code'
    ],
    officialUrl: 'https://fert.nic.in',
    badge: 'Eco Friendly',
    deadline: 'Seasonal allocation',
    targetBeneficiaries: 'All crop cultivators'
  }
];
