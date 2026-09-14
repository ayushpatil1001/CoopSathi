import { BACKEND_VERIFIED_SOURCES } from '../data/mockData.js';

export interface GeminiChatResult {
  text: string;
  isRealTimeLLM: boolean;
  modelUsed: string;
  sources: any[];
  suggestedActions: string[];
}

const SYSTEM_INSTRUCTION = `You are "CoopSathi AI", an authoritative, compassionate, and helpful AI assistant for the Ministry of Cooperation and the National Council for Cooperative Training (NCCT), Government of India.
Your mission is to empower farmers, agricultural laborers, cooperative society members, Primary Agricultural Credit Societies (PACS) secretaries, and rural stakeholders across India with accurate, legally grounded guidance.

CORE KNOWLEDGE AREAS & STATUTORY GROUNDING:
1. Multi-State Co-operative Societies (Amendment) Act, 2023:
   - Section 29 & 38: Active membership requirement (members must attend at least 3 consecutive Annual General Meetings and use minimum society services to vote).
   - Section 45: Autonomous Co-operative Election Authority for transparent board elections.
   - Section 85A to 85C: Co-operative Ombudsman for resolving complaints regarding deposits, membership refusal, and financial irregularities within 30 days (Forms VI & VII).
   - Section 106: Right to inspect audited books, balance sheets, and by-laws.

2. Primary Agricultural Credit Societies (PACS) Modernization & Model By-laws:
   - Centrally sponsored project expanded to 79,630 PACS with ₹2,925.39 Crore outlay.
   - Over 63,686 PACS onboarded to unified National ERP software; over 54,707 operational as e-PACS.
   - 25+ citizen services: Pradhan Mantri Jan Aushadhi Kendras (generic medicines with ₹5 Lakh grant assistance), Custom Hiring Machinery & Drone rentals, Fair Price Shops, Fertilizer & Nano Urea distribution at controlled rates.

3. Pradhan Mantri Fasal Bima Yojana (PMFBY):
   - Farmer premium rate: 2.0% for Kharif crops, 1.5% for Rabi crops, 5.0% for commercial/horticultural crops.
   - 72-Hour Rule: Localized natural calamities (hailstorm, landslide, inundation, cloudburst) MUST be intimated within 72 hours via the Crop Insurance App or national toll-free 14447.
   - High-tech assessment: YES-TECH (remote sensing), WINDS (village weather stations), and CROPIC (geotagged smartphone crop photos).

4. Financial Literacy & Credit Access:
   - Modified Interest Subvention Scheme (MISS) on Kisan Credit Card (KCC): 9% base rate - 2% central subvention - 3% Prompt Repayment Incentive (PRI) = effective 4% per annum interest rate up to ₹3.00 Lakh.
   - Collateral-free credit limit: ₹1.60 Lakh to ₹2.00 Lakh at functional PACS.
   - Agriculture Infrastructure Fund (AIF): 3% interest subvention up to ₹2.00 Crore for post-harvest infrastructure (cold storage, warehouses).

GUIDELINES FOR YOUR RESPONSE:
- Tone: Respectful, clear, encouraging, and authoritative. Use formatting (bullet points, bold key terms).
- Language: ALWAYS respond in the exact language requested by the user:
  - 'hi' -> Hindi (हिन्दी)
  - 'mr' -> Marathi (मराठी)
  - 'ta' -> Tamil (தமிழ்)
  - 'te' -> Telugu (తెలుగు)
  - 'bn' -> Bengali (বাংলা)
  - 'en' -> English
- Always mention relevant statutory sections, deadlines, or helpline numbers (such as 14447 or 1800-180-1551) where applicable.`;

export class GeminiService {
  private getApiKey(): string {
    return process.env.GEMINI_API_KEY?.trim() || '';
  }

  private getModel(): string {
    return process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-flash';
  }

  public isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.length > 10 && !key.includes('your_gemini_api_key'));
  }

  public async generateResponse(query: string, language: string = 'en'): Promise<GeminiChatResult> {
    const apiKey = this.getApiKey();

    if (!this.isConfigured()) {
      return this.generateFallbackResponse(query, language, false);
    }

    const model = this.getModel();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const promptPayload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `User Language: ${language}. User Query: ${query}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        topP: 0.85,
        maxOutputTokens: 1024
      }
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(promptPayload)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.warn(`Gemini API returned error ${response.status}: ${errorBody}`);
        return this.generateFallbackResponse(query, language, true, `Gemini API returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      if (!text) {
        return this.generateFallbackResponse(query, language, true, 'Empty response from Gemini');
      }

      // Determine matching verified sources and suggested actions based on query keywords
      const { sources, actions } = this.extractSourcesAndActions(query);

      return {
        text,
        isRealTimeLLM: true,
        modelUsed: model,
        sources,
        suggestedActions: actions
      };
    } catch (err: any) {
      console.error('Error invoking Gemini API:', err?.message || err);
      return this.generateFallbackResponse(query, language, true, err?.message);
    }
  }

  private extractSourcesAndActions(query: string) {
    const lower = query.toLowerCase();
    const sources: any[] = [];
    const actions: string[] = [];

    if (lower.includes('vote') || lower.includes('right') || lower.includes('हक्क') || lower.includes('मतदान') || lower.includes('election') || lower.includes('mscs') || lower.includes('law')) {
      sources.push(BACKEND_VERIFIED_SOURCES.mscs_voting_rights);
      actions.push('View MSCS Act 2023 Summary', 'File Grievance on Voting Denial', 'Check Active Member Checklist');
    } else if (lower.includes('pmfby') || lower.includes('crop') || lower.includes('insurance') || lower.includes('विमा') || lower.includes('पीक') || lower.includes('claim')) {
      sources.push(BACKEND_VERIFIED_SOURCES.pmfby_claim_intimation);
      actions.push('Calculate Premium Online', '72-Hour Claim Guide', 'Track Insurance Claim');
    } else if (lower.includes('pacs') || lower.includes('पैक्स') || lower.includes('पॅक्स') || lower.includes('fertilizer') || lower.includes('खत') || lower.includes('erp')) {
      sources.push(BACKEND_VERIFIED_SOURCES.pacs_multipurpose);
      actions.push('Explore PACS Multi-Services', 'Check Nano Fertilizer Quota', 'KCC Loan via PACS');
    } else if (lower.includes('grievance') || lower.includes('complaint') || lower.includes('तक्रार') || lower.includes('शिकायत') || lower.includes('ombudsman')) {
      sources.push(BACKEND_VERIFIED_SOURCES.coop_ombudsman);
      actions.push('Submit Grievance Form VI', 'Track Existing Ticket', 'Contact Cooperative Ombudsman');
    } else {
      sources.push(BACKEND_VERIFIED_SOURCES.pacs_multipurpose);
      actions.push('Cooperative By-Laws', 'PMFBY Crop Insurance', 'PACS Computerization', 'File Grievance');
    }

    return { sources, actions };
  }

  private generateFallbackResponse(query: string, language: string, wasKeyAttempted: boolean, errorDetail?: string): GeminiChatResult {
    const lower = query.toLowerCase();
    let text = '';
    const { sources, actions } = this.extractSourcesAndActions(query);

    if (lower.includes('vote') || lower.includes('right') || lower.includes('हक्क') || lower.includes('मतदान') || lower.includes('election')) {
      if (language === 'mr') {
        text = `**सहकारी संस्थेतील सभासदांचे मतदानाचे हक्क (MSCS Act २०२३):**\n१. कलम २९ नुसार मागील किमान ३ सलग वार्षिक सर्वसाधारण सभांना (AGM) हजेरी आवश्यक आहे.\n२. उपविधीनुसार संस्थेच्या किमान सेवांचा लाभ घेतलेला असावा.\n३. कलम ४५ नुसार स्वायत्त सहकार निवडणूक प्राधिकरणाद्वारे पारदर्शक निवडणुका बंधनकारक आहेत.`;
      } else if (language === 'hi') {
        text = `**सहकारी समिति में सदस्य मतदान अधिकार (MSCS Act २०२३):**\n१. धारा २९ के अनुसार सदस्य को पिछले ३ वार्षिक आम बैठकों (AGM) में उपस्थित रहना अनिवार्य है।\n२. उपनियमों के अनुसार न्यूनतम सेवाओं का उपयोग किया गया हो।\n३. धारा ४५ के तहत स्वायत्त सहकारी निर्वाचन प्राधिकरण निष्पक्ष चुनाव सुनिश्चित करता है।`;
      } else {
        text = `**Cooperative Member Rights & Voting Regulations (MSCS Act 2023):**\n1. Under Section 29, members must attend at least 3 consecutive AGMs to qualify for voting rights in board elections.\n2. Members must have utilized the minimum prescribed economic services of the society.\n3. Section 45 establishes an autonomous Co-operative Election Authority for fair elections.`;
      }
    } else if (lower.includes('pmfby') || lower.includes('crop') || lower.includes('insurance') || lower.includes('विमा') || lower.includes('पीक') || lower.includes('claim')) {
      if (language === 'mr') {
        text = `**प्रधानमंत्री पीक विमा योजना (PMFBY):**\n१. शेतकरी हप्ता: खरीप २%, रब्बी १.५%, बागायती ५%.\n२. गारपीट, पूर किंवा ढगफुटीसारख्या स्थानिक आपत्तीच्या वेळी **७२ तासांच्या आत** Crop Insurance App वरून किंवा टोल-फ्री **१४४४७** वर क्लेम नोंदवणे अनिवार्य आहे.\n३. केंद्र सरकारने तंत्रज्ञानावर आधारित YES-TECH उपग्रह आणि WINDS हवामान केंद्र प्रणाली कार्यान्वित केली आहे.`;
      } else {
        text = `**Pradhan Mantri Fasal Bima Yojana (PMFBY) Guidance:**\n1. Subsidized farmer premium: 2% for Kharif, 1.5% for Rabi, and 5% for horticultural crops.\n2. Localized crop loss MUST be intimated within **72 hours** via the Crop Insurance App or national toll-free **14447**.\n3. Satellite damage assessment is verified through YES-TECH, WINDS, and CROPIC systems.`;
      }
    } else {
      text = `Namaste! I am CoopSathi AI, your official multilingual assistant for the Ministry of Cooperation and NCCT, Government of India.\n\nI can provide verified statutory assistance regarding:\n• Multi-State Co-operative Societies Act, 2002 & 2023 Amendment\n• Pradhan Mantri Fasal Bima Yojana (PMFBY) 72-hour crop insurance intimation\n• PACS Computerization & 25+ Model By-Law citizen services (Jan Aushadhi, Custom Hiring)\n• 4% Kisan Credit Card (KCC) interest subvention\n• Cooperative Ombudsman grievance redressal`;
    }

    if (!wasKeyAttempted) {
      text += `\n\n> 💡 *Note: To activate real-time Google Gemini LLM generation, paste your Gemini API key in ` + '`backend/.env`' + ` as ` + '`GEMINI_API_KEY=AIzaSy...`' + `.*`;
    }

    return {
      text,
      isRealTimeLLM: false,
      modelUsed: wasKeyAttempted ? 'fallback (RAG statutory)' : 'statutory-rag-engine',
      sources,
      suggestedActions: actions
    };
  }
}

export const geminiService = new GeminiService();
