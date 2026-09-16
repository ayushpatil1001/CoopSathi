import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface RAGChunk {
  id: string;
  actOrScheme: string;
  authority: string;
  sectionOrClause: string;
  title: string;
  content: string;
  keywords: string[];
  officialUrl: string;
  verifiedDate: string;
  applicableStates?: string[];
  schemeData?: any;
}

export interface RAGRetrievalResult {
  chunk: RAGChunk;
  relevanceScore: number;
}

interface AliasRule {
  patterns: RegExp[];
  targetIds: string[];
}

// Precision alias rules for all major government topics, schemes & statutory acts
const SCHEME_ALIAS_MAP: AliasRule[] = [
  {
    patterns: [/pm[- ]?kisan|kisan samman|६०००|6000|पीएम[- ]?किसान|પીએમ[- ]?કિસાન|किसान सम्मान|કિસાન સન્માન/i],
    targetIds: ['pm-kisan']
  },
  {
    patterns: [/ayushman|pm[- ]?jay|golden card|आरोग्य कार्ड|आयुष्मान|गोल्डन कार्ड|5 lakh health/i],
    targetIds: ['pm-jay']
  },
  {
    patterns: [/pmfby|fasal bima|crop insurance|पीक विमा|फसल बीमा|પાક વીમો|crop loss|हवामान विमा/i],
    targetIds: ['PMFBY-CLAUSE21', 'pmfby', 'PMFBY-CLAUSE4', 'PMFBY-TECH']
  },
  {
    patterns: [/soil health|soil card|मृदा स्वास्थ्य|माती आरोग्य|माती परीक्षण|मृदा परीक्षण|જમીન આરોગ્ય/i],
    targetIds: ['soil-health-card']
  },
  {
    patterns: [/e[- ]?nam|national agriculture market|ई[- ]?नाम|कृषि बाजार|e-mandi/i],
    targetIds: ['e-nam']
  },
  {
    patterns: [/pmay[- ]?g|pmay|awas yojana|आवास योजना|घरकुल|इंदिरा आवास/i],
    targetIds: ['pmay-g', 'pmay-u']
  },
  {
    patterns: [/mudra|pmmy|shishu|kishor|tarun|मुद्रा लोन|मुद्रा योजना/i],
    targetIds: ['mudra']
  },
  {
    patterns: [/mgnrega|nrega|100 days|मनरेगा|रोजगार हमी|नरेगा/i],
    targetIds: ['mgnrega']
  },
  {
    patterns: [/sukanya|ssy|सुकन्या समृद्धी|सुकन्या समृद्धि/i],
    targetIds: ['sukanya-samriddhi']
  },
  {
    patterns: [/atal pension|apy|अटल पेन्शन|अटल पेंशन/i],
    targetIds: ['apy']
  },
  {
    patterns: [/kcc|kisan credit card|किसान क्रेडिट|किसान क्रेडिट कार्ड|४% कर्ज|4% loan/i],
    targetIds: ['KCC-MISS-SUBVENTION', 'kcc', 'CREDIT-COLLATERAL-FREE']
  },
  {
    patterns: [/drone didi|namo drone|ड्रोन दीदी/i],
    targetIds: ['WOMEN-DRONE-DIDI', 'namo-drone-didi']
  },
  {
    patterns: [/lakhpati didi|लखपती दीदी|लखपति दीदी/i],
    targetIds: ['WOMEN-LAKHPATI-DIDI', 'lakhpati-didi']
  },
  {
    patterns: [/\brti\b|right to information|माहिती अधिकार|सूचना का अधिकार|rti act/i],
    targetIds: ['GOV-RTI-2005']
  },
  {
    patterns: [/voter|epic|nvsp|election card|मतदार ओळखपत्र|मतदान ओळखपत्र|मतदाता पहचान|मतदान कार्ड|વોટર આઈડી|voter helpline|form 6\b/i],
    targetIds: ['GOV-VOTER-ECI']
  },
  {
    patterns: [/ration card|onorc|one nation one ration|रेशन कार्ड|राशन कार्ड|अन्न सुरक्षा/i],
    targetIds: ['onorc']
  },
  {
    patterns: [/bbssl|seed cooperative|भारतीय बीज सहकारी/i],
    targetIds: ['COOP-BBSSL']
  },
  {
    patterns: [/ncol|organic cooperative|राष्ट्रीय जैविक सहकारी/i],
    targetIds: ['COOP-NCOL']
  },
  {
    patterns: [/ncel|export cooperative|राष्ट्रीय निर्यात सहकारी/i],
    targetIds: ['COOP-NCEL']
  },
  {
    patterns: [/ncct|vamnicom|cooperative training|राष्ट्रीय सहकारी प्रशिक्षण/i],
    targetIds: ['COOP-NCCT']
  },
  {
    patterns: [/digilocker|डिजिलॉकर|ডিજિલકાર/i],
    targetIds: ['GOV-DIGILOCKER']
  },
  {
    patterns: [/aadhaar|uidai|आधार कार्ड/i],
    targetIds: ['GOV-AADHAAR-UIDAI']
  },
  {
    patterns: [/passport|पासपोर्ट/i],
    targetIds: ['GOV-PASSPORT-SEVA']
  },
  {
    patterns: [/white revolution|dairy coop|दुग्ध क्रांती|श्वेत क्रांती|nddb/i],
    targetIds: ['COOP-WHITE-REV-2']
  },
  {
    patterns: [/ombudsman|grievance|complaint|sec 85|section 85|तक्रार|शिकायत|लोकपाल|form vi/i],
    targetIds: ['MSCS-SEC85']
  },
  {
    patterns: [/voting rights|voting in agm|sec 29|sec 45|मतदान हक्क|मतदान अधिकार/i],
    targetIds: ['MSCS-SEC29', 'MSCS-SEC45']
  },
  {
    patterns: [/\bpacs\b|पैक्स|पॅक्स|मંડળી|model bye[- ]?laws/i],
    targetIds: ['PACS-MODEL-BYLAWS', 'PACS-ERP-MISSION']
  },
  {
    patterns: [/vishwakarma|विश्वकर्मा|artisan|शिल्पकार/i],
    targetIds: ['pm-vishwakarma']
  },
  {
    patterns: [/kusum|solar pump|सौर पंप/i],
    targetIds: ['pm-kusum']
  },
  {
    patterns: [/svanidhi|street vendor|स्ट्रीट वेंडर|स्वनिधि/i],
    targetIds: ['pm-svanidhi']
  },
  {
    patterns: [/surya ghar|rooftop solar|सूर्य घर/i],
    targetIds: ['pm-surya-ghar']
  },
  {
    patterns: [/ujjwala|pmuy|lpg|उज्ज्वला/i],
    targetIds: ['pmuy']
  },
  {
    patterns: [/jal jeevan|har ghar jal|जल जीवन/i],
    targetIds: ['jjm']
  },
  {
    patterns: [/swachh bharat|toilet subsidy|शौचालय|स्वच्छ भारत/i],
    targetIds: ['sbm-g']
  }
];

export class RagEngineService {
  private corpus: RAGChunk[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private loadJsonData(relativeFromDist: string, relativeFromSrc: string): any[] {
    const p1 = path.resolve(__dirname, relativeFromDist);
    if (fs.existsSync(p1)) {
      try {
        return JSON.parse(fs.readFileSync(p1, 'utf-8'));
      } catch (e) {
        console.warn('Failed reading ' + p1 + ':', e);
      }
    }
    const p2 = path.resolve(__dirname, relativeFromSrc);
    if (fs.existsSync(p2)) {
      try {
        return JSON.parse(fs.readFileSync(p2, 'utf-8'));
      } catch (e) {
        console.warn('Failed reading ' + p2 + ':', e);
      }
    }
    return [];
  }

  private init(): void {
    if (this.initialized) return;

    const statutoryData: any[] = this.loadJsonData(
      '../data/statutoryDatabase.json',
      '../../src/data/statutoryDatabase.json'
    );

    const schemesData: any[] = this.loadJsonData(
      '../data/schemesDatabase.json',
      '../../src/data/schemesDatabase.json'
    );

    const loadedChunks: RAGChunk[] = [];

    // Ingest Statutory Knowledge
    for (const item of statutoryData) {
      loadedChunks.push({
        id: item.id,
        actOrScheme: item.actOrScheme,
        authority: item.authority,
        sectionOrClause: item.sectionOrClause,
        title: item.title,
        content: item.content,
        keywords: item.keywords || [],
        officialUrl: item.officialUrl || 'https://cooperation.gov.in',
        verifiedDate: item.verifiedDate || '15 Aug 2026'
      });
    }

    // Ingest 93+ Official Government Schemes
    for (const s of schemesData) {
      const step1 = s.applicationProcess?.step1 || '';
      const step2 = s.applicationProcess?.step2 || '';
      const content = s.benefitSummary + '. ' + s.objective + ' Eligibility: ' + ((s.eligibilityCriteria || []).join('; ')) + '. Benefits: ' + ((s.benefits || []).join('; ')) + '. How to Apply: ' + step1 + ' ' + step2 + '. Documents: ' + ((s.requiredDocuments || []).join(', ')) + '. Official Portal: ' + s.officialUrl + '. Helpline: ' + s.helpline + '.';

      const keywords = new Set<string>();
      keywords.add(s.id.toLowerCase());
      if (s.shortName) keywords.add(s.shortName.toLowerCase());
      s.title.toLowerCase().split(/[^a-z0-9]+/i).forEach((w: string) => {
        if (w.length > 2) keywords.add(w);
      });
      if (s.sector) {
        s.sector.toLowerCase().split(/[^a-z0-9]+/i).forEach((w: string) => {
          if (w.length > 2) keywords.add(w);
        });
      }
      if (Array.isArray(s.targetBeneficiaries)) {
        s.targetBeneficiaries.forEach((b: string) => keywords.add(b.toLowerCase()));
      }

      loadedChunks.push({
        id: s.id,
        actOrScheme: s.title,
        authority: s.ministry || 'Government of India',
        sectionOrClause: (s.shortName || s.title) + ' Guidelines',
        title: s.title,
        content,
        keywords: Array.from(keywords),
        officialUrl: s.officialUrl || 'https://myscheme.gov.in',
        verifiedDate: s.lastUpdated || '2026-09-15',
        schemeData: s
      });
    }

    this.corpus = loadedChunks;
    this.initialized = true;
  }

  public getCorpusSize(): number {
    if (!this.initialized) this.init();
    return this.corpus.length;
  }

  public retrieve(query: string, topK: number = 3): RAGRetrievalResult[] {
    if (!this.initialized || this.corpus.length === 0) {
      this.init();
    }

    const qLower = query.toLowerCase().trim();
    const queryTokens = qLower
      .replace(/[^a-z0-9ऀ-ॿ઀-૿]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1);

    const boostedIds = new Set<string>();
    for (const alias of SCHEME_ALIAS_MAP) {
      for (const pat of alias.patterns) {
        if (pat.test(query)) {
          alias.targetIds.forEach(id => boostedIds.add(id));
          break;
        }
      }
    }

    const scored: RAGRetrievalResult[] = this.corpus.map(chunk => {
      let score = 0;
      const cIdLower = chunk.id.toLowerCase();
      const cTitleLower = chunk.title.toLowerCase();
      const cContentLower = chunk.content.toLowerCase();

      // Priority 1: Boosted Alias Match (+600 points)
      if (boostedIds.has(chunk.id) || boostedIds.has(cIdLower)) {
        score += 600;
      }

      // Priority 2: Exact ID match (+200 points)
      if (queryTokens.some(t => t.length > 2 && cIdLower === t)) {
        score += 200;
      }

      // Priority 3: Title matches (+40 points per token)
      for (const t of queryTokens) {
        if (t.length <= 2) continue;
        if (cTitleLower.includes(t)) {
          score += 40;
        }
      }

      // Priority 4: Keywords matches (+25 points per keyword match)
      for (const kw of chunk.keywords) {
        const kwLower = kw.toLowerCase();
        if (qLower.includes(kwLower) || queryTokens.includes(kwLower)) {
          score += 25;
        }
      }

      // Priority 5: Content matches (+5 points per token)
      for (const t of queryTokens) {
        if (t.length <= 3) continue;
        if (cContentLower.includes(t)) {
          score += 5;
        }
      }

      // Disambiguation penalties:
      // If query is about Voter ID card, penalize MSCS voting rights
      if (/voter|epic|nvsp|मतदार ओळखपत्र|मतदान ओळखपत्र|मतदाता पहचान|मतदान कार्ड/i.test(query) && chunk.id.includes('MSCS-SEC29')) {
        score -= 400;
      }
      // If query is specifically about PM-KISAN, don't match KCC
      if (/pm[- ]?kisan/i.test(query) && (chunk.id.includes('KCC') || chunk.id.includes('kcc'))) {
        score -= 400;
      }
      // If query is about Ayushman Bharat, don't match PMFBY
      if (/ayushman|pm[- ]?jay/i.test(query) && chunk.id.includes('PMFBY')) {
        score -= 400;
      }
      // If query is about Crop Insurance / PMFBY, don't match KCC
      if (/crop|fasal|विमा|फसल|pmfby/i.test(query) && chunk.id.includes('KCC')) {
        score -= 200;
      }

      return { chunk, relevanceScore: score };
    });

    scored.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return scored.slice(0, topK);
  }
}

export const ragEngineService = new RagEngineService();
