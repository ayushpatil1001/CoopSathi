export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  flag?: string;
}

export type AssistantType = 'general' | 'laws' | 'schemes' | 'pmfby' | 'pacs' | 'grievance';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  language?: LanguageCode;
  confidence?: number;
  isVerified?: boolean;
  sources?: VerifiedSource[];
  suggestedActions?: string[];
  audioPlaying?: boolean;
  feedback?: 'helpful' | 'unhelpful' | null;
  isRealTimeLLM?: boolean;
  isOfficialGovLLM?: boolean;
  modelUsed?: string;
  retrievedContextCount?: number;
}

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

export interface Scheme {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  category: 'agriculture' | 'insurance' | 'credit' | 'cooperative' | 'women' | 'storage' | 'fertilizer' | 'rural';
  ministry: string;
  shortDesc: string;
  fullDesc: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  officialUrl: string;
  badge?: string;
  deadline?: string;
  targetBeneficiaries: string;
}

export interface PmfbyCalculationRequest {
  state: string;
  district: string;
  crop: string;
  landArea: number; // in acres
  season: 'Kharif' | 'Rabi' | 'Commercial/Horticultural';
}

export interface PmfbyCalculationResult {
  sumInsuredPerAcre: number;
  totalSumInsured: number;
  farmerPremiumRate: number; // e.g. 2% Kharif, 1.5% Rabi, 5% Commercial
  farmerPremiumAmount: number;
  govtSubsidyRate: number;
  govtSubsidyAmount: number;
  totalActuarialPremium: number;
  cutoffDate: string;
  eligible: boolean;
  mandatoryDocs: string[];
  nearestClaimCentre: string;
  claimTollFree: string;
}

export interface GrievanceRecord {
  id: string;
  referenceNumber: string;
  category: string;
  subject: string;
  description: string;
  originalVoiceNote?: boolean;
  applicantName: string;
  district: string;
  state: string;
  phoneNumber: string;
  coopSocietyName?: string;
  assignedAuthority: string;
  status: 'Submitted' | 'Under Review' | 'Assigned to Authority' | 'Resolved';
  submittedAt: string;
  updatedAt: string;
  timeline: {
    stage: string;
    date: string;
    completed: boolean;
    remarks: string;
  }[];
  supportingDocs: string[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  fileType: 'PDF' | 'DOCX' | 'Gazette';
  version: string;
  lastUpdated: string;
  isVerified: boolean;
  ragStatus: 'Uploaded' | 'Text Extracted' | 'Indexed' | 'Verified' | 'Live';
  totalChunks: number;
  authority: string;
}
