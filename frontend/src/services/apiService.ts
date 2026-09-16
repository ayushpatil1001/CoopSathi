import { ChatMessage, LanguageCode, Scheme, PmfbyCalculationRequest, PmfbyCalculationResult, GrievanceRecord, KnowledgeDocument } from '../types';

const VITE_API_ORIGIN = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = VITE_API_ORIGIN ? `${VITE_API_ORIGIN}/api` : '/api';

export interface RealTimeGovSummary {
  lastSynced: string;
  sourceAuthority: string;
  syncStatus: 'Active' | 'Synchronized' | 'Updating';
  officialPortalsConnected: string[];
  metrics: {
    totalRegisteredCooperatives: string;
    cooperativeCitizensCovered: string;
    pacsComputerizationTarget: string;
    pacsOutlayBudget: string;
    pacsOnboardedToERP: string;
    ePacsDeclared: string;
    digitalTransactionsRecorded: string;
    pmfbyAnnualBudget: string;
    pmfbyClaimsDisbursedSinceInception: string;
    kccEffectiveInterestRate: string;
    collateralFreeCreditLimit: string;
  };
}

export interface RealTimePacsData {
  projectTitle: string;
  nodalMinistry: string;
  implementingAgency: string;
  approvedOutlay: string;
  targetSocieties: number;
  onboardedSocieties: number;
  ePacsFunctional: number;
  hardwareDeliveredSocieties: number;
  digitalTransactionsCount: string;
  cscServicesAvailable: number;
  liveFeatures: string[];
  lastMinistryReportDate: string;
}

export interface RealTimePmfbyData {
  schemeName: string;
  annualBudgetFY26: string;
  totalFarmerAppsInsured: string;
  totalClaimsPaidOut: string;
  nationalTollFree: string;
  statutoryIntimationSLA: string;
  technologiesDeployed: {
    name: string;
    acronym: string;
    purpose: string;
  }[];
  seasonRates: {
    season: string;
    farmerShare: string;
    govSubsidy: string;
    deadline: string;
  }[];
}

export interface RealTimeFinancialLiteracyItem {
  initiative: string;
  baseInterestRate: string;
  interestSubventionRate: string;
  promptRepaymentIncentiveRate: string;
  netEffectiveRate: string;
  standardLimit: string;
  collateralFreeLimit: string;
  subsidyCeiling: string;
  repaymentPeriod: string;
  keyRule: string;
}

export interface RealTimeLawItem {
  id: string;
  actTitle: string;
  gazetteNumber: string;
  notifiedDate: string;
  keySections: {
    section: string;
    title: string;
    statutorySummary: string;
    officialClauseUrl: string;
  }[];
}

export interface RealTimeGrievanceItem {
  authority: string;
  statutoryBasis: string;
  jurisdiction: string;
  prescribedForms: {
    formName: string;
    description: string;
  }[];
  resolutionTimeframeDays: number;
  officialFilingUrl: string;
  directContacts: {
    channel: string;
    contact: string;
  }[];
}

export const apiService = {
  // 1. POST /api/chat
  async sendChat(query: string, language: LanguageCode = 'en'): Promise<ChatMessage | null> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // 2. GET /api/schemes
  async getSchemes(category?: string, search?: string): Promise<Scheme[] | null> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/schemes?${params.toString()}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.schemes || [];
    } catch {
      return null;
    }
  },

  // 3. POST /api/pmfby/calculate
  async calculatePmfby(payload: PmfbyCalculationRequest): Promise<PmfbyCalculationResult | null> {
    try {
      const res = await fetch(`${API_BASE}/pmfby/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // 4. POST /api/grievances
  async submitGrievance(data: Partial<GrievanceRecord>): Promise<GrievanceRecord | null> {
    try {
      const res = await fetch(`${API_BASE}/grievances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) return null;
      const body = await res.json();
      return body.record || null;
    } catch {
      return null;
    }
  },

  // 5. GET /api/track-status/:ref
  async trackStatus(referenceNumber: string): Promise<GrievanceRecord | null> {
    try {
      const res = await fetch(`${API_BASE}/track-status/${encodeURIComponent(referenceNumber.trim())}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // 6. GET /api/languages
  async getLanguages(): Promise<{ code: string; name: string; nativeName: string }[] | null> {
    try {
      const res = await fetch(`${API_BASE}/languages`);
      if (!res.ok) return null;
      const body = await res.json();
      return body.languages || null;
    } catch {
      return null;
    }
  },

  // 7. GET /api/documents
  async getDocuments(): Promise<KnowledgeDocument[] | null> {
    try {
      const res = await fetch(`${API_BASE}/documents`);
      if (!res.ok) return null;
      const body = await res.json();
      return body.documents || null;
    } catch {
      return null;
    }
  },

  // 8. REAL-TIME GOV DATA ENDPOINTS
  async getRealTimeSummary(): Promise<RealTimeGovSummary | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/summary`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getRealTimePacs(): Promise<RealTimePacsData | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/pacs`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getRealTimePmfby(): Promise<RealTimePmfbyData | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/pmfby`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getRealTimeLaws(): Promise<RealTimeLawItem[] | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/laws`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.laws || [];
    } catch {
      return null;
    }
  },

  async getRealTimeFinancialLiteracy(): Promise<RealTimeFinancialLiteracyItem[] | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/financial-literacy`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.initiatives || [];
    } catch {
      return null;
    }
  },

  async getRealTimeGrievances(): Promise<RealTimeGrievanceItem[] | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/grievances`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.frameworks || [];
    } catch {
      return null;
    }
  },

  async syncRealTimeGovData(): Promise<{ status: string; syncedAt: string; message: string } | null> {
    try {
      const res = await fetch(`${API_BASE}/realtime/sync`, { method: 'POST' });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};
