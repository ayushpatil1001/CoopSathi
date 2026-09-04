import { GrievanceRecord } from '../types';

export const GRIEVANCE_CATEGORIES = [
  { id: 'coop_society', label: 'Cooperative Society Issue (उपनियम/सोसायटी वाद)', authority: 'District Registrar / Central Registrar of Co-op Societies (CRCS)' },
  { id: 'pacs_service', label: 'PACS Service Issue (खत, कर्ज, संगणक सेवा समस्या)', authority: 'District Central Cooperative Bank (DCCB) & District Development Manager, NABARD' },
  { id: 'loan_credit', label: 'Loan / Credit / KCC Issue (व्याज सवलत, कर्ज वाटप अडचण)', authority: 'Lead District Manager (LDM) & Cooperative Banking Ombudsman' },
  { id: 'insurance_claim', label: 'Insurance Claim / PMFBY (पीक विमा नुकसान भरपाई प्रलंबित)', authority: 'District Level Grievance Redressal Committee (DGRC) & PMFBY Nodal Officer' },
  { id: 'scheme_application', label: 'Scheme Application Rejection (योजना अर्ज समस्या)', authority: 'State Directorate of Agriculture / District Agriculture Officer' },
  { id: 'other', label: 'Other Cooperative & Rural Grievance (इतर सहकार तक्रार)', authority: 'Ministry of Cooperation Public Grievance Cell (CPGRAMS)' },
];

export const INITIAL_GRIEVANCE_RECORDS: GrievanceRecord[] = [
  {
    id: 'GRV-001',
    referenceNumber: 'COOP-2026-MH-84920',
    category: 'Cooperative Society Issue',
    subject: 'Denial of Voting Rights in Society Annual General Meeting',
    description: 'The management committee of Shivaji Gramin Seva Sahakari Sanstha has arbitrarily excluded 42 active farmer members from the voter roll for the upcoming board election without issuing statutory notice under Section 29.',
    applicantName: 'Rameshwar Patil',
    district: 'Kolhapur',
    state: 'Maharashtra',
    phoneNumber: '+91 98230 *****',
    coopSocietyName: 'Shivaji Gramin Seva Sahakari Sanstha',
    assignedAuthority: 'District Registrar of Cooperative Societies, Kolhapur',
    status: 'Assigned to Authority',
    submittedAt: '24 Aug 2026, 10:30 AM',
    updatedAt: '01 Sep 2026, 04:15 PM',
    supportingDocs: ['Society_Passbook_Copy.pdf', 'Notice_Receipt.jpg'],
    timeline: [
      { stage: 'Submitted', date: '24 Aug 2026, 10:30 AM', completed: true, remarks: 'Grievance submitted via CoopSathi AI portal with biometric Aadhaar verification.' },
      { stage: 'Under Review', date: '26 Aug 2026, 02:00 PM', completed: true, remarks: 'AI verification checked against MSCS Act 2023 Sec 29 active membership rules. Discrepancy confirmed.' },
      { stage: 'Assigned to Authority', date: '28 Aug 2026, 11:45 AM', completed: true, remarks: 'Forwarded to Assistant Registrar, Cooperative Societies, Kolhapur division for spot inspection and notice to society secretary.' },
      { stage: 'Resolved', date: 'Estimated: 10 Sep 2026', completed: false, remarks: 'Hearing scheduled; provisional voter inclusion order pending.' },
    ]
  },
  {
    id: 'GRV-002',
    referenceNumber: 'PMFBY-2026-UP-41029',
    category: 'Insurance Claim',
    subject: 'Delayed Kharif 2025 Crop Loss Payout for Inundated Paddy Fields',
    description: 'Post-flood crop loss was reported within 48 hours via Crop Insurance App with geotagged pictures of 3.5 acres of inundated paddy. Survey completed by Joint Committee but claim payout pending for 90 days.',
    applicantName: 'Satish Kumar Yadav',
    district: 'Gorakhpur',
    state: 'Uttar Pradesh',
    phoneNumber: '+91 94500 *****',
    coopSocietyName: 'Pipraich Primary Agricultural Credit Society',
    assignedAuthority: 'State PMFBY Grievance Redressal Committee & AIC of India',
    status: 'Resolved',
    submittedAt: '12 Jul 2026, 09:15 AM',
    updatedAt: '28 Aug 2026, 03:30 PM',
    supportingDocs: ['Crop_Survey_Survey_Receipt.pdf', 'Khasra_Record.pdf'],
    timeline: [
      { stage: 'Submitted', date: '12 Jul 2026, 09:15 AM', completed: true, remarks: 'Claim delay flagged under PMFBY Revised Operational Guidelines Clause 21.6.' },
      { stage: 'Under Review', date: '15 Jul 2026, 01:10 PM', completed: true, remarks: 'Survey report verified from National Crop Insurance Portal (NCIP) database.' },
      { stage: 'Assigned to Authority', date: '19 Jul 2026, 10:00 AM', completed: true, remarks: 'Escalated to District Agriculture Officer and Insurance Nodal Officer with 12% penal interest notice for delayed settlement.' },
      { stage: 'Resolved', date: '28 Aug 2026, 03:30 PM', completed: true, remarks: 'Full compensation of ₹58,400 along with interest credited directly to farmer’s Aadhaar-linked Bank of Baroda account.' },
    ]
  },
  {
    id: 'GRV-003',
    referenceNumber: 'PACS-2026-MP-19382',
    category: 'PACS Service Issue',
    subject: 'Non-availability of subsidized Nano Urea at declared MSP quota',
    description: 'Local PACS center denying Nano Urea allotment claiming server outage on ERP, directing farmers to private vendors selling at black-market inflated prices.',
    applicantName: 'Bhanwar Singh Rajput',
    district: 'Hoshangabad',
    state: 'Madhya Pradesh',
    phoneNumber: '+91 99810 *****',
    coopSocietyName: 'Itarsi Krishak Seva Sahakari Samiti',
    assignedAuthority: 'Deputy Director of Agriculture & Cooperative Auditor',
    status: 'Under Review',
    submittedAt: '02 Sep 2026, 11:00 AM',
    updatedAt: '03 Sep 2026, 09:40 AM',
    supportingDocs: ['PACS_Invoice_Denial.jpg'],
    timeline: [
      { stage: 'Submitted', date: '02 Sep 2026, 11:00 AM', completed: true, remarks: 'Auto-categorized and flagged as high-priority seasonal input complaint.' },
      { stage: 'Under Review', date: '03 Sep 2026, 09:40 AM', completed: true, remarks: 'Central ERP fertilizer quota stock audit initiated against Society inventory logs.' },
      { stage: 'Assigned to Authority', date: 'Pending', completed: false, remarks: 'Pending assignment to Sub-Divisional Magistrate / Agri Inspector.' },
      { stage: 'Resolved', date: 'Pending', completed: false, remarks: 'Awaiting inspection report.' },
    ]
  }
];
