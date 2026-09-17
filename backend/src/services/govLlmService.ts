import { ragEngineService, RAGChunk } from './ragEngineService.js';

export interface GovChatResponse {
  text: string;
  isOfficialGovLLM: boolean;
  provider: 'official_gov_rag' | 'bhashini' | 'gemini_gov_rag';
  modelUsed: string;
  confidence: number;
  sources: {
    id: string;
    title: string;
    authority: string;
    actOrScheme: string;
    sectionOrDoc: string;
    excerpt: string;
    url: string;
    verifiedDate: string;
  }[];
  suggestedActions: string[];
  retrievedContextCount: number;
}

export class GovLlmService {
  private getProvider(): string {
    return process.env.GOV_LLM_PROVIDER?.trim().toLowerCase() || 'official_gov_rag';
  }

  private getBhashiniApiKey(): string {
    return process.env.BHASHINI_INFERENCE_KEY?.trim() || process.env.BHASHINI_API_KEY?.trim() || '';
  }

  private getBhashiniInferenceKey(): string {
    return process.env.BHASHINI_INFERENCE_KEY?.trim() || process.env.BHASHINI_API_KEY?.trim() || '';
  }

  private getBhashiniUdyatKey(): string {
    return process.env.BHASHINI_UDYAT_KEY?.trim() || process.env.BHASHINI_ULCA_API_KEY?.trim() || '';
  }

  private getBhashiniUserId(): string {
    return process.env.BHASHINI_USER_ID?.trim() || '';
  }

  private getGeminiApiKey(): string {
    return process.env.GEMINI_API_KEY?.trim() || '';
  }

  private isGreeting(query: string): boolean {
    const clean = query.trim().toLowerCase();
    return /^(hi|hello|hey|namaste|namaskar|pranam|kem\s*cho|vanakkam|sat\s*sri\s*akal|good\s*(morning|afternoon|evening)|who\s*are\s*you|what\s*(is|can)\s*(coopsathi|you\s*do)|तू\s*कोण\s*आहेस|काय\s*करू\s*शकतोस|आप\s*कौन\s*हैं|आप\s*क्या\s*कर\s*सकते\s*हैं|नमस्ते|नमस्कार|प्रणाम|केम\s*છો)(\s|[!?,.]|$)/i.test(clean) || (clean.length <= 4 && ['hi', 'hey', 'hello'].includes(clean));
  }

  private getGreetingResponse(language: string): string {
    if (language === 'mr') {
      return `**नमस्कार! मी CoopSathi AI – सहकारिता मंत्रालय व NCCT चा अधिकृत डिजिटल सहाय्यक.**\n\n` +
        `मी भारतातील शेतकरी, सहकारी संस्थांचे सभासद आणि नागरिकांना अधिकृत सरकारी योजना व सहकार कायद्यांविषयी प्रमाणित माहिती देतो.\n\n` +
        `**मी खालील विषयांवर आपली मदत करू शकतो:**\n` +
        `• 🌾 **सरकारी योजना व अनुदाने:** पीएम-किसान, पीएमएफबीवाय (पीक विमा), केसीसी ४% कर्ज, नमो ड्रोन दीदी, लखपती दीदी, इ.\n` +
        `• 🏛️ **पॅक्स (PACS) व सहकार सुधारणा:** आदर्श उपविधी, २५+ बहुउद्देशीय सेवा, संगणकीकरण व सभासदत्व.\n` +
        `• 📝 **चरण-दर-चरण अर्ज प्रक्रिया:** योजनांसाठी अर्ज कसा करावा, लागणारी कागदपत्रे व अधिकृत पोर्टल्स.\n` +
        `• ⚖️ **कायदेशीर तरतुदी:** बहुराज्य सहकारी संस्था कायदा २०२३ (MSCS Act), मतदानाचे हक्क व कलम २९.\n` +
        `• 🛡️ **तक्रार निवारण:** सहकार लोकपालकडे (Ombudsman) तक्रार दाखल करण्याची पद्धत.\n\n` +
        `💡 *तुम्हाला कोणत्या योजनेबद्दल किंवा नियमाबद्दल माहिती हवी आहे? खाली प्रश्न विचारा.*`;
    }

    if (language === 'hi') {
      return `**नमस्ते! मैं CoopSathi AI हूँ – सहकारिता मंत्रालय एवं NCCT, भारत सरकार का आधिकारिक डिजिटल सहायक।**\n\n` +
        `मैं भारतीय किसानों, सहकारी समितियों के सदस्यों एवं नागरिकों को प्रमाणित सरकारी योजनाओं और विधिक नियमों की सटीक जानकारी प्रदान करता हूँ।\n\n` +
        `**मैं निम्न विषयों पर आपकी सहायता कर सकता हूँ:**\n` +
        `• 🌾 **प्रमुख सरकारी योजनाएं एवं अनुदान:** पीएम-किसान, फसल बीमा (PMFBY), किसान क्रेडिट कार्ड (KCC 4% ऋण), ड्रोन दीदी, आदि।\n` +
        `• 🏛️ **पैक्स (PACS) एवं सहकारी सेवाएं:** नए मॉडल उपनियम, 25+ बहुउद्देशीय सेवाएं, जन औषधि केंद्र एवं सदस्यता नियम।\n` +
        `• 📝 **चरण-दर-चरण आवेदन प्रक्रिया:** योजनाओं में आवेदन कैसे करें, आवश्यक दस्तावेज एवं आधिकारिक पोर्टल।\n` +
        `• ⚖️ **विधिक अधिकार:** बहु-राज्य सहकारी सोसायटी अधिनियम २०२३, मतदान अधिकार (धारा २९) एवं निर्वाचन।\n` +
        `• 🛡️ **शिकायत निवारण:** सहकार लोकपाल (Ombudsman) के समक्ष शिकायत दर्ज करने की प्रक्रिया (प्रपत्र VI)।\n\n` +
        `💡 *आप किस योजना अथवा विषय के बारे में जानना चाहते हैं? कृपया अपना प्रश्न पूछें।*`;
    }

    if (language === 'gu') {
      return `**નમસ્તે! હું CoopSathi AI છું – સહકારિતા મંત્રાલય અને NCCT, ભારત સરકારનો સત્તાવાર ડિજિટલ સહાયક.**\n\n` +
        `હું ભારતના ખેડૂતો અને સહકારી મંડળીઓના સભ્યોને સત્તાવાર સરકારી યોજનાઓ અને સહકારી કાયદાઓ વિશે સચોટ માર્ગદર્શન આપું છું.\n\n` +
        `**હું તમને નીચેના વિષયોમાં સહાય કરી શકું છું:**\n` +
        `• 🌾 **સરકારી યોજનાઓ અને સબસિડી:** પીએમ-કિસાન, પીએમએફબીવાય પાક વીમો, કેસીસી ૪% ધિરાણ, વગેરે.\n` +
        `• 🏛️ **પેક્સ (PACS) મંડળી:** આદર્શ પેટા-નિયમો, ૨૫+ સેવાઓ અને સભ્યપદ પ્રક્રિયા.\n` +
        `• 📝 **પગલાંવાર અરજી પ્રક્રિયા:** યોજનાઓમાં અરજી કેવી રીતે કરવી અને જરૂરી દસ્તાવેજો.\n` +
        `• ⚖️ **સહકારી કાયદા:** મલ્ટી-સ્ટેટ કો-ઓપરેટિવ સોસાયટીઝ એક્ટ 2023 અને સભ્યોના મતદાન અધિકારો.\n` +
        `• 🛡️ **ફરિયાદ નિવારણ:** સહકારી લોકપાલ સમક્ષ ફરિયાદ પ્રક્રિયા.\n\n` +
        `💡 *આપને કઈ યોજના કે સહકારી નિયમ વિશે માહિતી જોઈએ છે? કૃપા કરીને જણાવો.*`;
    }

    return `**Hello! I am CoopSathi AI – Official Virtual Assistant for the Ministry of Cooperation & NCCT, Government of India.**\n\n` +
      `I provide verified, statutory guidance grounded in official Acts, Gazettes, and the 93+ Central Government Schemes.\n\n` +
      `**Here is how I can assist you:**\n` +
      `• 🌾 **Government Schemes & Subsidies:** PM-KISAN, PMFBY Crop Insurance, 4% KCC Loans, AIF, NaMo Drone Didi, etc.\n` +
      `• 🏛️ **PACS Modernization & Governance:** Model By-Laws, Cloud ERP, 25+ multipurpose activities, and membership enrollment.\n` +
      `• 📝 **Step-by-Step Application Guides:** Detailed procedures, required KYC documents, application channels, and official links.\n` +
      `• ⚖️ **Legal & Compliance Inquiries:** Multi-State Co-operative Societies (MSCS) Act 2023, Section 29 voting rights, board governance, and audit mandates.\n` +
      `• 🛡️ **Grievance Redressal:** Filing complaints with the Co-operative Ombudsman under Section 85 (Form VI).\n\n` +
      `💡 *What scheme, law, or service would you like to inquire about today?*`;
  }

  private isGibberish(query: string): boolean {
    const clean = query.trim();
    if (clean.length < 3) return true;
    const lettersOnly = clean.replace(/[^a-zA-Z]/g, '');
    if (lettersOnly.length > 5) {
      const vowelCount = (lettersOnly.match(/[aeiouy]/gi) || []).length;
      if (vowelCount === 0 || vowelCount / lettersOnly.length < 0.1) {
        return true;
      }
    }
    if (/^(.)\1{4,}$/.test(clean)) return true;
    return false;
  }

  private getGibberishResponse(language: string): string {
    if (language === 'mr') {
      return `मी आपला प्रश्न स्पष्टपणे समजू शकलो नाही. **CoopSathi AI** म्हणून, मी आपल्याला अधिकृत सरकारी योजना (PMFBY, KCC, PM-KISAN), प्राथमिक कृषी पतसंस्था (PACS), बहुराज्य सहकारी संस्था कायदा २०२३ (MSCS Act) आणि अर्ज प्रक्रियेविषयी मदत करण्यास तयार आहे.\n\nकृपया आपला प्रश्न पुन्हा सुस्पष्ट शब्दात विचारा किंवा खालील विषयांवर क्लिक करा.`;
    }
    if (language === 'hi') {
      return `मैं आपका प्रश्न स्पष्ट रूप से समझ नहीं पाया। **CoopSathi AI** के रूप में, मैं सरकारी योजनाओं (PMFBY, KCC, PM-KISAN), प्राथमिक कृषि ऋण समितियों (PACS), सहकारिता कानून और आवेदन प्रक्रिया की जानकारी देने के लिए उपलब्ध हूँ।\n\nकृपया अपना प्रश्न स्पष्ट शब्दों में पूछें अथवा नीचे दिए गए विकल्पों में से चुनें।`;
    }
    return `I couldn't quite understand your query. As **CoopSathi AI**, I am ready to provide verified guidance on Indian Government Schemes (PMFBY, KCC, PM-KISAN), Primary Agricultural Credit Societies (PACS), MSCS Act 2023 legal compliance, and step-by-step application procedures.\n\nPlease rephrase your question or select one of the suggested topics below.`;
  }

  private isOutOfDomain(query: string, maxScore: number): boolean {
    if (maxScore > 10) return false;
    const outOfDomainRegex = /\b(president\s+of|capital\s+of|prime\s+minister\s+of\s+(?!india)|movie|hollywood|bollywood|football|cricket\s+score|fifa|weather\s+in|python\s+code|javascript\s+code|write\s+a\s+poem|solve\s+equation|joke|sing\s+a\s+song)\b/i;
    return outOfDomainRegex.test(query) || maxScore === 0;
  }

  private getOutOfDomainResponse(language: string): string {
    if (language === 'mr') {
      return `मी **CoopSathi AI**, **सहकारिता मंत्रालय, भारत सरकार** चा अधिकृत डिजिटल सहाय्यक आहे. माझी माहिती भारतीय सरकारी योजना, कृषी पतपुरवठा (KCC ४%), पीक विमा (PMFBY), पॅक्स (PACS) आधुनिकीकरण आणि सहकार कायद्यांपुरती मर्यादित आहे.\n\nमाझ्याकडे बाह्य विषयांची (उदा. परदेशी राजकारण किंवा मनोरंजनाची) माहिती उपलब्ध नाही, परंतु मी आपल्याला भारतातील **९३+ सरकारी योजना**, अनुदान किंवा सहकार नियमांविषयी निश्चितपणे मदत करू शकतो!`;
    }
    if (language === 'hi') {
      return `मैं **CoopSathi AI**, **सहकारिता मंत्रालय, भारत सरकार** का आधिकारिक डिजिटल सहायक हूँ। मेरा ज्ञानक्षेत्र भारत सरकार की कल्याणकारी योजनाओं, कृषि ऋण (KCC ४%), फसल बीमा (PMFBY), पैक्स आधुनिकीकरण और सहकारी नियमों (MSCS Act) तक समर्पित है।\n\nमेरे पास गैर-सरकारी अथवा बाहरी सामान्य विषयों की जानकारी उपलब्ध नहीं है, परंतु मैं भारत की **९३+ सरकारी योजनाओं**, सब्सिडी एवं सहकारी प्रक्रियाओं पर आपकी पूरी सहायता कर सकता हूँ!`;
    }
    return `I am **CoopSathi AI**, the official virtual assistant dedicated to the **Ministry of Cooperation, Government of India**, agricultural credit (4% KCC), crop insurance (PMFBY), PACS modernization, and central government welfare schemes.\n\nI do not provide information on non-governmental topics, foreign politics, or entertainment, but I would be glad to help you with any of India's **93+ verified government schemes**, cooperative laws, subsidies, and application steps!`;
  }

  private isHowToApply(query: string): boolean {
    return /how\s+(to|can\s+i|do\s+i|should\s+i|we)?\s*(apply|register|enroll|avail|submit|file|claim|get|obtain|join|take|open|acquire|access)|application\s+(process|steps|procedure|form|guide|method)|registration\s+(process|steps|procedure|form)|enrollment\s+(process|steps|procedure)|procedure\s+(to|for)|steps\s+(to|for)|process\s+(to|of)|form\s+filling|where\s+to\s+apply|eligibility\s+and\s+apply|कसा\s+(करावा|करावे|भरावा|नोंदवावा|मिळवावा|घेता\s+येईल)|कशी\s+(करावी|मिळेल)|कसे\s+(करावे|मिळेल|घ्यावे)|अर्ज\s*(कसा|कशी|प्रक्रिया|नमुना|करणे)?|नोंदणी|पायऱ्या|पायरी|आवेदन\s*(कैसे|प्रक्रिया|प्रपत्र|करना)?|पंजीकरण|चरण|प्रक्रिया|अप्लाई|કેવી\s+રીતે\s*(અરજી|મેળવવું|નોંધણી|લેવું)|અરજી\s*(કેવી\s+રીતે|પ્રક્રિયા|ફોર્મ)?|નોંધણી|પગલાં|કઈ\s+રીતે|વિશે\s+અरજી|વિશે\s+માહિતી|મેળવવી|વિશે\s+અરજી|விண்ணப்பிப்பது|దరఖాస్తు|আবেদন/i.test(query);
  }

  /**
   * Main entry point for user chat inquiries.
   * 1. Performs RAG retrieval against official Gazette knowledge corpus.
   * 2. Synthesizes an authoritative answer in the requested Indian language.
   */
  public async generateGovResponse(query: string, language: string = 'en'): Promise<GovChatResponse> {
    // Step 1: Execute RAG retrieval
    const ragResults = ragEngineService.retrieve(query, 3);
    const topChunks = ragResults.map(r => r.chunk);
    const maxScore = ragResults[0]?.relevanceScore || 0;

    // Check for Greetings
    if (this.isGreeting(query)) {
      return {
        text: this.getGreetingResponse(language),
        isOfficialGovLLM: true,
        provider: 'official_gov_rag',
        modelUsed: 'CoopSathi Conversational Engine',
        confidence: 1.0,
        sources: [],
        suggestedActions: [
          'How to apply for PMFBY crop insurance?',
          'How to get KCC loan at 4%?',
          'PACS 25+ Citizen Services',
          'Cooperative Ombudsman Complaint (Form VI)'
        ],
        retrievedContextCount: 0
      };
    }

    // Check for Gibberish / Noise
    if (this.isGibberish(query)) {
      return {
        text: this.getGibberishResponse(language),
        isOfficialGovLLM: true,
        provider: 'official_gov_rag',
        modelUsed: 'CoopSathi Clarification Engine',
        confidence: 0.95,
        sources: [],
        suggestedActions: [
          'What is PMFBY crop insurance?',
          'How to join PACS?',
          'Kisan Credit Card 4% Interest',
          'Search 93+ Government Schemes'
        ],
        retrievedContextCount: 0
      };
    }

    // Check for Out-of-Domain queries
    if (this.isOutOfDomain(query, maxScore)) {
      return {
        text: this.getOutOfDomainResponse(language),
        isOfficialGovLLM: true,
        provider: 'official_gov_rag',
        modelUsed: 'CoopSathi Scope Engine',
        confidence: 0.95,
        sources: [],
        suggestedActions: [
          'What are the 93+ Government Schemes?',
          'How to apply for PM-KISAN?',
          'PACS Modernization and ERP',
          'MSCS Act 2023 Rules'
        ],
        retrievedContextCount: 0
      };
    }

    // Map chunks to frontend source interface
    const sources = topChunks.map(c => ({
      id: c.id,
      title: c.title,
      authority: c.authority,
      actOrScheme: c.actOrScheme,
      sectionOrDoc: c.sectionOrClause,
      excerpt: c.content,
      url: c.officialUrl,
      verifiedDate: c.verifiedDate
    }));

    const suggestedActions = this.deriveSuggestedActions(topChunks, query);
    const provider = this.getProvider();
    const bhashiniKey = this.getBhashiniInferenceKey();
    const geminiKey = this.getGeminiApiKey();

    // Step 2A: If Bhashini provider is explicitly chosen
    if (provider === 'bhashini') {
      if (bhashiniKey && bhashiniKey.length > 5) {
        const bhashiniResult = await this.generateWithBhashini(query, language, topChunks);
        if (bhashiniResult) {
          return {
            text: bhashiniResult,
            isOfficialGovLLM: true,
            provider: 'bhashini',
            modelUsed: `Digital India Bhashini (National Language Translation Mission - Dhruva)`,
            confidence: 0.99,
            sources,
            suggestedActions,
            retrievedContextCount: topChunks.length
          };
        }
      }
    }

    // Step 2B: Check if Gemini is configured to act as neural synthesizer with RAG context
    if (provider === 'gemini_gov_rag' || (provider !== 'bhashini' && geminiKey && geminiKey.length > 10 && !geminiKey.includes('your_gemini_api_key'))) {
      const geminiResult = await this.generateWithGeminiRAG(query, language, topChunks, geminiKey);
      if (geminiResult) {
        return {
          text: geminiResult,
          isOfficialGovLLM: true,
          provider: 'gemini_gov_rag',
          modelUsed: `Gemini 2.5 Flash + Official Gov RAG Grounding`,
          confidence: 0.99,
          sources,
          suggestedActions,
          retrievedContextCount: topChunks.length
        };
      }
    }

    // Step 3: Check if Digital India Bhashini is configured as fallback provider
    if (bhashiniKey && bhashiniKey.length > 5) {
      const bhashiniResult = await this.generateWithBhashini(query, language, topChunks);
      if (bhashiniResult) {
        return {
          text: bhashiniResult,
          isOfficialGovLLM: true,
          provider: 'bhashini',
          modelUsed: `Digital India Bhashini (National Language Translation Mission - Dhruva)`,
          confidence: 0.98,
          sources,
          suggestedActions,
          retrievedContextCount: topChunks.length
        };
      }
    }

    // Step 4: Built-in Sovereign Gov-RAG Neural Synthesizer (Instant, Zero External Keys)
    const sovereignText = this.synthesizeGovRagAnswer(query, language, topChunks);

    return {
      text: sovereignText,
      isOfficialGovLLM: true,
      provider: 'official_gov_rag',
      modelUsed: 'Official Government RAG Engine (Bhashini-Aligned)',
      confidence: 0.98,
      sources,
      suggestedActions,
      retrievedContextCount: topChunks.length
    };
  }

  /**
   * Generates response via Gemini using strictly injected RAG context
   */
  private async generateWithGeminiRAG(query: string, language: string, contextChunks: RAGChunk[], apiKey: string): Promise<string | null> {
    try {
      let model = process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash';
      if (model === 'gemini-1.5-flash' || model === 'gemini-pro') {
        model = 'gemini-2.5-flash';
      }
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

      let contextText = contextChunks
        .map((c, i) => `[STATUTE ${i + 1}]: ${c.actOrScheme} - ${c.sectionOrClause} (${c.title})\nAuthority: ${c.authority}\nText: ${c.content}`)
        .join('\n\n');

      // If user is asking an application question, inject the verified 5-step procedure into the RAG context
      if (this.isHowToApply(query)) {
        const verifiedSteps = this.synthesizeStepByStepApplication(query, language, contextChunks);
        contextText += `\n\n=== VERIFIED STATUTORY STEP-BY-STEP APPLICATION PROCEDURE ===\n${verifiedSteps}\n=============================================================`;
      }

      const systemPrompt = `You are "CoopSathi AI", the official legal and governance AI assistant for the Ministry of Cooperation and NCCT, Government of India.
You must answer the user's question STRICTLY utilizing the following verified official statutory context:

=== OFFICIAL VERIFIED STATUTORY RAG CONTEXT ===
${contextText}
================================================

RULES:
1. Base all facts, timelines, numbers, and legal citations directly on the statutory context above.
2. ALWAYS respond fluently in the requested language: '${language}' (e.g. Hindi if 'hi', Marathi if 'mr', Tamil if 'ta', Telugu if 'te', Bengali if 'bn', English if 'en').
3. Cite the exact Section, Clause, or Act (e.g., Section 29 MSCS Act 2023, Clause 21 PMFBY).
4. Maintain a respectful, supportive, and authoritative government public service tone.
5. MANDATORY STEP-BY-STEP FORMAT FOR APPLICATION QUERIES:
   Whenever the user asks "How to apply", "how do I apply", "application process", "steps to apply", "registration procedure", "how can I file/claim", or queries like 'आवेदन कैसे करें', 'अर्ज कसा करावा', 'અરજી કેવી રીતે કરવી', 'ఎలా దరఖాస్తు చేయాలి', 'எப்படி விண்ணப்பிப்பது', 'কীভাবে आवेदन করবেন', you MUST format your response as a clear, numbered, sequential step-by-step guide:
   - **Step 1: Check Eligibility & Prepare Required Documents**
   - **Step 2: Choose Application Channel (Online Portal or Offline PACS/Bank Branch)**
   - **Step 3: Registration & Form Details**
   - **Step 4: Fee/Premium Payment & Acknowledgment Receipt**
   - **Step 5: Post-Submission Verification, Tracking & Helplines**
   Always include official portal links (e.g., pmfby.gov.in, crcs.gov.in) and toll-free helpline numbers.`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: `User Query: ${query}` }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024 }
        })
      });

      if (!response.ok) {
        console.warn(`[Gemini] API error HTTP ${response.status}: ${response.statusText}`);
        return null;
      }

      const json = (await response.json()) as any;
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || null;
      if (!text) return null;

      // If Gemini returned a refusal (e.g. "not in provided context"), fall back to sovereign synthesizer
      const isRefusal = /does\s+not\s+contain|not\s+mentioned\s+in\s+the\s+provided|not\s+available\s+in\s+the\s+provided|वैधानिक\s+संदर्भात\s+उपलब्ध\s+नाही|माहिती\s+उपलब्ध\s+नाही|संदर्भ\s+में\s+नहीं\s+दिया|उपलब्ध\s+नहीं\s+है|सંદર્ભમાં\s+નથી/i.test(text);
      if (isRefusal) {
        console.warn('[Gemini] Context absence refusal detected; falling back to Sovereign Synthesizer');
        return null;
      }

      return text;
    } catch (err) {
      console.warn('[Gemini] Generation failed:', err);
      return null;
    }
  }

  /**
   * Digital India Bhashini (Dhruva / ULCA) Integration
   * Grounded with Official Statutory RAG Context + High-Fidelity NMT Translation
   */
  private async generateWithBhashini(query: string, language: string, contextChunks: RAGChunk[]): Promise<string | null> {
    const inferenceKey = this.getBhashiniInferenceKey();
    if (!inferenceKey || inferenceKey.length < 5) return null;

    try {
      // 1. Synthesize sovereign statutory response in English first for pure legal precision
      const baseAnswer = this.synthesizeGovRagAnswer(query, 'en', contextChunks);
      if (!baseAnswer) return null;

      // If user language is English, return the authoritative English statutory response directly
      if (!language || language.toLowerCase() === 'en') {
        return baseAnswer;
      }

      // 2. Call Bhashini Dhruva NMT inference pipeline to translate into citizen's native language
      const targetLang = language.toLowerCase();
      const computeUrl = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';

      // Split into logical paragraphs to ensure payload fits comfortably within compute limits
      const paragraphs = baseAnswer.split('\n\n').filter(p => p.trim().length > 0);
      const inputItems = paragraphs.map(p => ({ source: p }));

      const payload = {
        pipelineTasks: [
          {
            taskType: 'translation',
            config: {
              language: {
                sourceLanguage: 'en',
                targetLanguage: targetLang
              }
            }
          }
        ],
        inputData: {
          input: inputItems
        }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000); // 7-second SLA

      const response = await fetch(computeUrl, {
        method: 'POST',
        headers: {
          'Authorization': inferenceKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[Bhashini] Dhruva API error HTTP ${response.status}: ${response.statusText}`);
        return null;
      }

      const json = (await response.json()) as any;
      const outputs = json?.pipelineResponse?.[0]?.output;
      if (Array.isArray(outputs) && outputs.length > 0) {
        const translated = outputs.map((item: any) => item.target || item.source).join('\n\n');
        if (translated.trim().length > 0) {
          return translated;
        }
      }

      return null;
    } catch (err) {
      console.warn('[Bhashini] Dhruva inference request failed:', err);
      return null;
    }
  }

  /**
   * Synthesizes rich overview for any of the 93+ official government schemes
   */
  private synthesizeSchemeProfile(scheme: any, language: string): string {
    const title = scheme.title;
    const ministry = scheme.ministry || 'Government of India';
    const summary = scheme.benefitSummary || '';
    const objective = scheme.objective || '';
    const benefits = (scheme.benefits || []).map((b: string) => `• ${b}`).join('\n');
    const eligibility = (scheme.eligibilityCriteria || []).map((e: string) => `• ${e}`).join('\n');
    const beneficiaries = (scheme.targetBeneficiaries || []).join(', ');
    const url = scheme.officialUrl || 'https://myscheme.gov.in';
    const helpline = scheme.helpline || '1800-180-1551';

    if (language === 'mr') {
      return `**${title} – अधिकृत माहिती व लाभ**\n\n` +
        `🏛️ **संबंधित मंत्रालय:** ${ministry}\n\n` +
        `🎯 **उद्दिष्ट:**\n${objective}\n\n` +
        `💰 **प्रमुख आर्थिक लाभ:**\n${summary}\n${benefits}\n\n` +
        `✅ **पात्रता निकष:**\n${eligibility}\n\n` +
        `👥 **लक्ष्य लाभार्थी:** ${beneficiaries}\n\n` +
        `🌐 **अधिकृत पोर्टल:** [${url}](${url})\n` +
        `📞 **२४x७ राष्ट्रीय हेल्पलाइन:** ${helpline}\n\n` +
        `💡 *अर्ज प्रक्रिया जाणून घेण्यासाठी "या योजनेसाठी अर्ज कसा करावा?" असा प्रश्न विचारा.*`;
    }

    if (language === 'hi') {
      return `**${title} – आधिकारिक विवरण एवं लाभ**\n\n` +
        `🏛️ **संबंधित मंत्रालय:** ${ministry}\n\n` +
        `🎯 **योजना का उद्देश्य:**\n${objective}\n\n` +
        `💰 **प्रमुख वित्तीय लाभ:**\n${summary}\n${benefits}\n\n` +
        `✅ **पात्रता मानदंड:**\n${eligibility}\n\n` +
        `👥 **लक्षित लाभार्थी:** ${beneficiaries}\n\n` +
        `🌐 **आधिकारिक पोर्टल:** [${url}](${url})\n` +
        `📞 **२४x७ राष्ट्रीय हेल्पलाइन:** ${helpline}\n\n` +
        `💡 *आवेदन प्रक्रिया जानने के लिए "इस योजना हेतु आवेदन कैसे करें?" पूछें।*`;
    }

    if (language === 'gu') {
      return `**${title} – સત્તાવાર વિગત અને લાભો**\n\n` +
        `🏛️ **સંબંધિત મંત્રાલય:** ${ministry}\n\n` +
        `🎯 **મુખ્ય ઉદ્દેશ:**\n${objective}\n\n` +
        `💰 **આર્થિક સહાય અને લાભ:**\n${summary}\n${benefits}\n\n` +
        `✅ **પાત્રતાના માપદંડ:**\n${eligibility}\n\n` +
        `👥 **લાભાર્થીઓ:** ${beneficiaries}\n\n` +
        `🌐 **સત્તાવાર પોર્ટલ:** [${url}](${url})\n` +
        `📞 **રાષ્ટ્રીય હેલ્પલાઇન:** ${helpline}\n\n` +
        `💡 *અરજી કરવાની પ્રક્રિયા જાણવા માટે "અરજી કેવી રીતે કરવી?" પૂછો.*`;
    }

    return `**${title} – Official Scheme Overview**\n\n` +
      `🏛️ **Nodal Ministry:** ${ministry}\n\n` +
      `🎯 **Objective:**\n${objective}\n\n` +
      `💰 **Key Financial & Welfare Benefits:**\n${summary}\n${benefits}\n\n` +
      `✅ **Eligibility Criteria:**\n${eligibility}\n\n` +
      `👥 **Target Beneficiaries:** ${beneficiaries}\n\n` +
      `🌐 **Official Portal:** [${url}](${url})\n` +
      `📞 **24x7 National Helpline:** ${helpline}\n\n` +
      `💡 *To view application procedure, simply ask: "How to apply for ${scheme.shortName || title}?"*`;
  }

  /**
   * Sovereign Official Gov-RAG Synthesizer
   * Synthesizes verified statutory knowledge into natural multilingual guidance
   */
  private synthesizeGovRagAnswer(query: string, language: string, chunks: RAGChunk[]): string {
    const isHowToApply = /how\s+(to|can\s+i|do\s+i|should\s+i|we)?\s*(apply|register|enroll|avail|submit|file|claim|get|obtain|join|take|open|acquire|access)|application\s+(process|steps|procedure|form|guide|method)|registration\s+(process|steps|procedure|form)|enrollment\s+(process|steps|procedure)|procedure\s+(to|for)|steps\s+(to|for)|process\s+(to|of)|form\s+filling|where\s+to\s+apply|eligibility\s+and\s+apply|कसा\s+(करावा|करावे|भरावा|नोंदवावा|मिळवावा|घेता\s+येईल)|कशी\s+(करावी|मिळेल)|कसे\s+(करावे|मिळेल|घ्यावे)|अर्ज\s*(कसा|कशी|प्रक्रिया|नमुना|करणे)?|नोंदणी|पायऱ्या|पायरी|आवेदन\s*(कैसे|प्रक्रिया|प्रपत्र|करना)?|पंजीकरण|चरण|प्रक्रिया|अप्लाई|કેવી\s+રીતે\s*(અરજી|મેળવવું|નોંધણી|લેવું)|અરજી\s*(કેવી\s+રીતે|પ્રક્રિયા|ફોર્મ)?|નોંધણી|પગલાં|કઈ\s+રીતે|વિશે\s+અરજી|વિશે\s+માહિતી|મેળવવી|વિશે\s+અરજી|விண்ணப்பிப்பது|దరఖాస్తు|আবেদন/i.test(query);

    if (isHowToApply) {
      return this.synthesizeStepByStepApplication(query, language, chunks);
    }

    const primary = chunks[0];
    const secondary = chunks[1];

    if (!primary) {
      return 'CoopSathi AI: Information not found. Please visit https://india.gov.in or https://cooperation.gov.in.';
    }

    // 1. Matched Official Government Scheme with rich metadata
    if (primary.schemeData) {
      return this.synthesizeSchemeProfile(primary.schemeData, language);
    }

    // 2. Right to Information Act, 2005
    if (primary.id === 'GOV-RTI-2005') {
      if (language === 'mr') {
        return `**माहितीचा अधिकार कायदा, २००५ (RTI Act 2005) – मार्गदर्शक माहिती:**\n\n` +
          `१. **माहिती मिळवण्याचा मूलभूत अधिकार:** भारतातील कोणत्याही नागरिकाला केंद्र किंवा राज्य सरकारच्या सार्वजनिक प्राधिकरणांकडून सरकारी निर्णय, अभिलेख, निविदा आणि विकास कामांची माहिती मागण्याचा कायदेशीर अधिकार आहे.\n\n` +
          `२. **३० दिवसांची अनिवार्य कालमर्यादा (SLA):** माहितीचा अर्ज मिळाल्यापासून जन माहिती अधिकाऱ्याने (PIO) **३० दिवसांच्या आत** माहिती पुरवणे कायद्याने बंधनकारक आहे. जर माहिती नागरिकाच्या 'जीवन किंवा स्वातंत्र्याशी' संबंधित असेल, तर ती **४८ तासांत** द्यावी लागते.\n\n` +
          `३. **अर्ज शुल्क:** सर्वसाधारण अर्ज शुल्क फक्त **₹१०** आहे. दारिद्र्यरेषेखालील (BPL) नागरिकांना कोणतीही फी आकारली जात नाही.\n\n` +
          `४. **प्रथम अपील:** वेळेत माहिती न मिळाल्यास किंवा असमाधानकारक असल्यास, ३० दिवसांत प्रथम अपीलीय प्राधिकरणाकडे (FAA) अपील दाखल करता येते.\n\n` +
          `🌐 **ऑनलाइन अर्ज पोर्टल:** [rtionline.gov.in](https://rtionline.gov.in)`;
      } else if (language === 'hi') {
        return `**सूचना का अधिकार अधिनियम, २००५ (RTI Act 2005) – प्रमुख प्रावधान:**\n\n` +
          `१. **संवैधानिक अधिकार:** प्रत्येक नागरिक को सरकारी कार्यालयों, विकास परियोजनाओं एवं सार्वजनिक प्राधिकरणों से अभिलेख, दस्तावेज एवं निर्णय की प्रति प्राप्त करने का विधिक अधिकार है।\n\n` +
          `२. **३० दिनों की अनिवार्य समय-सीमा:** लोक सूचना अधिकारी (PIO) द्वारा आवेदन प्राप्ति के **३० दिनों के भीतर** सूचना उपलब्ध कराना अनिवार्य है। यदि मामला जीवन या स्वतंत्रता से संबंधित हो, तो **४८ घंटे** में सूचना दी जाती है।\n\n` +
          `३. **आवेदन शुल्क:** केंद्रीय कार्यालयों हेतु शुल्क मात्र **₹१०** है (बीपीएल कार्डधारकों हेतु पूर्णतः निःशुल्क)।\n\n` +
          `४. **अपील प्रक्रिया:** ३० दिनों में सूचना न मिलने पर धारा १९(१) के तहत प्रथम अपीलीय अधिकारी के समक्ष अपील दायर की जा सकती है।\n\n` +
          `🌐 **ऑनलाइन पोर्टल:** [rtionline.gov.in](https://rtionline.gov.in)`;
      } else {
        return `**Right to Information Act, 2005 (RTI Act) – Statutory Guidelines:**\n\n` +
          `1. **Empowerment of Citizens:** Any Indian citizen can inspect public work, obtain certified copies of government documents, and seek transparency from Central and State public authorities.\n\n` +
          `2. **30-Day Mandatory SLA:** The Public Information Officer (PIO) is statutorily required to provide information within **30 days**. If the request concerns the life or liberty of a person, it must be provided within **48 hours**.\n\n` +
          `3. **Nominal Fee:** Central RTI application fee is capped at **₹10** (Completely Free for Below Poverty Line - BPL cardholders).\n\n` +
          `4. **First Appeal Mechanism:** If information is denied or not furnished within 30 days, the citizen may file a First Appeal under Section 19(1) within 30 days.\n\n` +
          `🌐 **National Filing Portal:** [rtionline.gov.in](https://rtionline.gov.in)`;
      }
    }

    // 3. Election Commission Voter ID / NVSP
    if (primary.id === 'GOV-VOTER-ECI') {
      if (language === 'mr') {
        return `**मतदार ओळखपत्र व निवडणूक आयोग सेवा (ECI Voter Services):**\n\n` +
          `१. **नवीन मतदार नोंदणी (फॉर्म ६):** १८ वर्षे पूर्ण केलेल्या प्रत्येक भारतीय नागरिकाला मतदार यादीत नाव नोंदवून अधिकृत 'EPIC' (मतदार ओळखपत्र) मिळवण्याचा हक्क आहे.\n\n` +
          `२. **ऑनलाइन मतदार सेवा पोर्टल:** निवडणूक आयोगाच्या **voters.eci.gov.in** पोर्टलवरून किंवा 'Voter Helpline App' द्वारे घरबसल्या अर्ज करता येतो.\n\n` +
          `३. **डिजिटल e-EPIC डाऊनलोड:** फॉर्म मंजूर होताच सुरक्षित डिजिटल मतदार ओळखपत्र (e-EPIC) पीडीएफ स्वरूपात तात्काळ डाऊनलोड करता येते.\n\n` +
          `📞 **राष्ट्रीय मतदार २४x७ हेल्पलाइन:** १९५० (टोल-फ्री) | 🌐 **पोर्टल:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      } else if (language === 'hi') {
        return `**मतदाता पहचान पत्र एवं निर्वाचन आयोग नागरिक सेवाएं (ECI):**\n\n` +
          `१. **नया मतदाता पंजीकरण (प्रपत्र ६):** १८ वर्ष की आयु पूर्ण कर चुके नागरिक भारत निर्वाचन आयोग के पोर्टल पर प्रपत्र ६ भरकर अपना मतदाता पहचान पत्र (EPIC) बनवा सकते हैं।\n\n` +
          `२. **डिजिटल e-EPIC कार्ड:** आवेदन स्वीकृत होते ही डिजिटल हस्ताक्षरित e-EPIC कार्ड पीडीएफ में डाउनलोड किया जा सकता है, जो भौतिक कार्ड के समान वैध है।\n\n` +
          `३. **सुधार एवं स्थानांतरण:** पता बदलने या नाम सुधारने हेतु प्रपत्र ८ ऑनलाइन भरें।\n\n` +
          `📞 **राष्ट्रीय मतदाता हेल्पलाइन:** 1950 | 🌐 **आधिकारिक पोर्टल:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      } else {
        return `**Election Commission of India (ECI) – Voter Registration & Services:**\n\n` +
          `1. **New Voter Enrollment (Form 6):** Indian citizens who have attained 18 years of age can enroll via Form 6 on the official ECI portal.\n\n` +
          `2. **Instant e-EPIC Digital Download:** Once approved by the Electoral Registration Officer (ERO), you can download the digitally signed e-EPIC PDF valid across all Indian elections.\n\n` +
          `3. **Corrections & Shifting (Form 8):** For address shift or demographic corrections, submit Form 8 online.\n\n` +
          `📞 **National Voter Toll-Free Helpline:** 1950 | 🌐 **Official Portal:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      }
    }

    // 4. NaMo Drone Didi
    if (primary.id === 'WOMEN-DRONE-DIDI') {
      if (language === 'mr') {
        return `**नमो ड्रोन दीदी योजना (NaMo Drone Didi Scheme) – महिला सक्षमीकरण:**\n\n` +
          `१. **८०% थेट अनुदान:** केंद्र सरकार महिला स्वयंसहाय्यता समूहांना (SHGs) शेतीसाठी आधुनिक कीटकनाशक व खत फवारणी ड्रोन खरेदीसाठी **८०% (जास्तीत जास्त ₹८ लाख)** थेट अनुदान देते.\n\n` +
          `२. **१५ दिवसांचे मोफत डीजीसीए (DGCA) पायलट प्रशिक्षण:** समूहातील महिला सदस्याला अधिकृत ड्रोन पायलट लायसन्स व १० दिवसांचे कृषी फवारणी तंत्रज्ञान प्रशिक्षण मोफत दिले जाते.\n\n` +
          `३. **शाश्वत ग्रामीण उत्पन्न:** ड्रोन भाडेतत्त्वावर देऊन महिला पायलट दरमहा **₹१५,००० ते ₹२५,०००** ची शाश्वत कमाई करू शकतात.\n\n` +
          `🏛️ **अंमलबजावणी:** दीनदयाळ अंत्योदय योजना – DAY-NRLM व कृषी मंत्रालय.`;
      } else {
        return `**NaMo Drone Didi Scheme – Empowering Rural Women via Agritech:**\n\n` +
          `1. **80% Central Drone Subsidy:** Provides 80% capital subsidy (capped at **₹8.00 Lakh**) to Women Self-Help Groups (SHGs) for purchasing modern agricultural spray drones.\n\n` +
          `2. **15-Day Free DGCA Drone Pilot Certification:** Women SHG members receive professional DGCA-certified drone pilot training and agronomy spray protocols.\n\n` +
          `3. **Sustainable Livelihoods:** Drone Didis earn ₹15,000 to ₹25,000 per month by offering precision nano-urea and pesticide spraying services to village farmers.\n\n` +
          `🏛️ **Implementing Agencies:** DAY-NRLM & Ministry of Agriculture and Farmers Welfare.`;
      }
    }

    // 5. Lakhpati Didi
    if (primary.id === 'WOMEN-LAKHPATI-DIDI') {
      if (language === 'mr') {
        return `**लखपती दीदी योजना (Lakhpati Didi Initiative):**\n\n` +
          `१. **उद्दिष्ट:** ग्रामीण भागातील महिला स्वयंसहाय्यता समूहांच्या (SHGs) किमान ३ कोटी महिलांचे वार्षिक उत्पन्न **किमान ₹१ लाख किंवा त्यापेक्षा अधिक** करणे.\n\n` +
          `२. **सुलभ कर्ज व व्याज सवलत:** डे-एनआरएलएम (DAY-NRLM) अंतर्गत महिलांना व्यवसाय सुरू करण्यासाठी **₹१ लाख ते ₹३ लाख** पर्यंत विनातारण सवलतीच्या व्याजदरात कर्ज.\n\n` +
          `३. **कौशल्य प्रशिक्षण:** शेळीपालन, दुग्धव्यवसाय, मधुमक्षिकापालन, सेंद्रिय खत निर्मिती आणि एलईडी बल्ब उत्पादनाचे विशेष प्रशिक्षण.\n\n` +
          `🏛️ **अधिकृत माहिती:** [aajeevika.gov.in](https://aajeevika.gov.in)`;
      } else {
        return `**Lakhpati Didi Initiative (DAY-NRLM):**\n\n` +
          `1. **Vision:** Enable at least 3 Crore rural women SHG members to earn a sustainable income of **at least ₹1.00 Lakh per annum**.\n\n` +
          `2. **Financial Enablement:** Access to low-interest, collateral-free credit (₹1 to ₹3 Lakh) through Community Investment Funds and bank linkages.\n\n` +
          `3. **Value Chain & Skill Training:** Training in organic farming, goat rearing, poultry, drone flying, tailoring, and food processing.\n\n` +
          `🏛️ **Official Portal:** [aajeevika.gov.in](https://aajeevika.gov.in)`;
      }
    }

    // 6. NCCT & VAMNICOM Training
    if (primary.id === 'COOP-NCCT') {
      return `**National Council for Cooperative Training (NCCT) & VAMNICOM Pune:**\n\n` +
        `1. **Statutory Mandate:** Operating under the Ministry of Cooperation, NCCT oversees 5 Regional Institutes of Cooperative Management (RICMs) and 14 Institutes of Cooperative Management (ICMs) across India.\n\n` +
        `2. **Premier Institute:** Vaikunth Mehta National Institute of Cooperative Management (VAMNICOM), Pune offers AICTE-approved PGDM-ABM programs and leadership training for top cooperative executives.\n\n` +
        `3. **PACS Secretary Modernization:** Conducts nationwide digital training modules for 100,000+ PACS secretaries on the national Cloud ERP system.\n\n` +
        `🌐 **Official Portal:** [ncct.ac.in](https://ncct.ac.in) | [vamnicom.gov.in](https://vamnicom.gov.in)`;
    }

    // 7. DigiLocker Legal Parity
    if (primary.id === 'GOV-DIGILOCKER') {
      return `**DigiLocker Digital Public Infrastructure (IT Rules 2016):**\n\n` +
        `1. **Statutory Validity (Rule 9A):** Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules 2016, issued documents in DigiLocker are treated at par with original physical documents.\n\n` +
        `2. **Verifiable Issued Documents:** Legally accepted for Driving Licences, RC books, Aadhaar, PAN, marksheets, and cooperative share certificates by traffic police, railways, and banks.\n\n` +
        `🌐 **Official Portal:** [digilocker.gov.in](https://digilocker.gov.in)`;
    }

    // 8. Aadhaar UIDAI
    if (primary.id === 'GOV-AADHAAR-UIDAI') {
      return `**UIDAI Aadhaar Services & Direct Benefit Transfer (DBT):**\n\n` +
        `1. **Section 7 Mandate:** Under Section 7 of the Aadhaar Act 2016, Aadhaar authentication is the verified gateway for DBT benefits in PM-KISAN, PMFBY, and PMAY.\n\n` +
        `2. **NPCI Bank Seeding:** Ensure your active bank account is NPCI-seeded to receive direct subsidy transfers.\n\n` +
        `📞 **UIDAI 24x7 Helpline:** 1947 | 🌐 **Portal:** [myaadhaar.uidai.gov.in](https://myaadhaar.uidai.gov.in)`;
    }

    if (primary.id === 'MSCS-SEC29' || primary.id === 'MSCS-SEC45') {
      if (language === 'mr') {
        return `**सहकारी संस्थेतील सभासदांचे मतदानाचे हक्क (MSCS Act २०२३):**\n\n` +
          `१. **सक्रिय सभासदत्व (कलम २९):** बहुराज्य सहकारी संस्था (दुरुस्ती) कायदा २०२३ च्या कलम २९ नुसार, संस्थेच्या निवडणुकीत किंवा वार्षिक सर्वसाधारण सभेत (AGM) मतदानाचा हक्क मिळवण्यासाठी सभासदाने मागील किमान **३ सलग वार्षिक सर्वसाधारण सभांना** उपस्थित राहणे आवश्यक आहे.\n\n` +
          `२. **किमान सेवेचा वापर:** सभासदाने उपविधीमध्ये नमूद केलेल्या किमान आर्थिक उत्पादनांचा किंवा सेवांचा (जसे खते खरेदी किंवा पीक कर्ज) लाभ घेतलेला असणे बंधनकारक आहे.\n\n` +
          `३. **स्वायत्त सहकार निवडणूक प्राधिकरण (कलम ४५):** संचालक मंडळाच्या निवडणुका वेळेत आणि पारदर्शकपणे घेण्यासाठी केंद्र सरकारने स्वायत्त 'सहकार निवडणूक प्राधिकरण' स्थापन केले आहे.\n\n` +
          `⚖️ *जर संस्थेने कायदेशीर नोटीस न देता मतदार यादीतून तुमचे नाव वगळले असल्यास, तुम्ही कलम ८५ अन्वये सहकार ओम्बड्समनकडे (Ombudsman) दाद मागू शकता.*`;
      } else if (language === 'hi') {
        return `**सहकारी समिति में सदस्य मतदान अधिकार एवं नियम (MSCS Act २०२३):**\n\n` +
          `१. **सक्रिय सदस्यता नियम (धारा २९):** बहु-राज्य सहकारी सोसायटी (संशोधन) अधिनियम २०२३ की धारा २९ के अनुसार, चुनाव में मतदान का अधिकार केवल उन्हीं सदस्यों को प्राप्त होगा जिन्होंने पिछले कम से कम **३ लगातार वार्षिक आम बैठकों (AGM)** में भाग लिया हो।\n\n` +
          `२. **न्यूनतम सेवाओं का उपयोग:** सदस्य द्वारा उपनियमों में उल्लिखित न्यूनतम वस्तुओं या सेवाओं का उपभोग किया गया हो।\n\n` +
          `३. **सहकारी निर्वाचन प्राधिकरण (धारा ४५):** चुनाव को निष्पक्ष एवं समयबद्ध कराने के लिए स्वायत्त सहकारी निर्वाचन प्राधिकरण गठित है।\n\n` +
          `⚖️ *अधिकारों के हनन की स्थिति में धारा ८५ के तहत सहकार ओम्बड्समैन के पास शिकायत दर्ज की जा सकती है।*`;
      } else if (language === 'gu') {
        return `**સહકારી મંડળીમાં સભ્યોના મતદાન અધિકારો (MSCS Act 2023):**\n\n` +
          `૧. **સક્રિય સભ્યપદ (કલમ 29):** મલ્ટી-સ્ટેટ કો-ઓપરેટિવ સોસાયટીઝ એક્ટ 2023 ની કલમ 29 મુજબ, ચૂંટણીમાં મતદાન કરવા માટે સભ્યએ છેલ્લી ઓછામાં ઓછી **3 વાર્ષિક સામાન્ય સભાઓ (AGM)** માં હાજરી આપવી ફરજિયાત છે.\n\n` +
          `૨. **ન્યૂનતમ સેવાઓનો ઉપયોગ:** મંડળીના પેટા-નિયમોમાં દર્શાવેલ લઘુત્તમ સેવાઓ (ખાતર, બિયારણ કે ધિરાણ) નો લાભ લીધેલ હોવો જોઈએ.\n\n` +
          `૩. **સ્વાયત્ત ચૂંટણી સત્તામંડળ (કલમ 45):** બોર્ડની ચૂંટણીઓ મુક્ત અને સમયસર યોજવા માટે સહકારી ચૂંટણી સત્તામંડળની રચના કરવામાં આવી છે.\n\n` +
          `⚖️ *જો ગેરકાયદેસર રીતે નામ રદ થયું હોય, તો કલમ 85A હેઠળ સહકારી લોકપાલ પાસે ફરિયાદ નોંધાવી શકાય છે.*`;
      } else {
        return `**Cooperative Member Voting Rights & Statutory Requirements (MSCS Act 2023):**\n\n` +
          `1. **Active Membership (Section 29):** Under Section 29 of the Multi-State Co-operative Societies (Amendment) Act 2023, no member shall exercise voting rights in board elections or AGMs unless they have attended **at least 3 consecutive Annual General Meetings**.\n\n` +
          `2. **Minimum Patronage Requirement:** The member must have utilized the minimum level of products or economic services prescribed in the registered society bye-laws.\n\n` +
          `3. **Autonomous Election Authority (Section 45):** Mandates an independent Co-operative Election Authority to prevent arbitrary postponement of elections and ensure democratic board constitution.\n\n` +
          `⚖️ *Remedy: If your voting rights have been unlawfully denied, you may file a statutory complaint with the Co-operative Ombudsman under Section 85A (Form VI).*`;
      }
    }

    if (primary.id === 'PMFBY-CLAUSE21' || primary.id === 'PMFBY-CLAUSE4') {
      if (language === 'mr') {
        return `**प्रधानमंत्री पीक विमा योजना (PMFBY) – अधिकृत मार्गदर्शक तत्त्वे:**\n\n` +
          `१. **७२ तासांचा अनिवार्य आपत्ती नियम (Clause 21.6):** गारपीट, पूर, ढगफुटी किंवा काढणीनंतरचे चक्रीवादळ यामुळे पिकाचे नुकसान झाल्यास, नुकसान झाल्यापासून **७२ तासांच्या आत** Crop Insurance App द्वारे किंवा राष्ट्रीय टोल-फ्री क्रमांक **१४४४७** वर क्लेम नोंदवणे कायद्याने बंधनकारक आहे.\n\n` +
          `२. **सवलतीचे शेतकरी हप्ते:**\n` +
          `   - खरीप पिके: विम्याच्या फक्त **२.०%**\n` +
          `   - रब्बी पिके: विम्याच्या फक्त **१.५%**\n` +
          `   - नगदी/बागायती पिके: विम्याच्या **५.०%**\n\n` +
          `३. **उपग्रह सर्वेक्षण तंत्रज्ञान:** केंद्र सरकारने मानवी त्रुटी टाळण्यासाठी YES-TECH (उपग्रह रिमोट सेन्सिंग) व WINDS प्रणाली अनिवार्य केली आहे.\n\n` +
          `📞 *२४x७ पीक विमा तक्रार निवारण क्रमांक: १४४४७*`;
      } else if (language === 'hi') {
        return `**प्रधानमंत्री फसल बीमा योजना (PMFBY) – आधिकारिक दिशा-निर्देश:**\n\n` +
          `१. **७२ घंटे की अनिवार्य सूचना समय-सीमा (Clause 21):** ओलावृष्टि, जलभराव या चक्रवात से फसल नुकसान होने पर किसान को **७२ घंटे के भीतर** 'क्रॉप इंश्योरेंस ऐप' अथवा राष्ट्रीय टोल-फ्री नंबर **14447** पर सूचना देना अनिवार्य है।\n\n` +
          `२. **रियायती किसान प्रीमियम:**\n` +
          `   - खरीफ फसलें: केवल **२.०%**\n` +
          `   - रबी फसलें: केवल **१.५%**\n` +
          `   - वाणिज्यिक/बागवानी: **५.०%**\n\n` +
          `३. **डीबीटी (DBT) सीधा भुगतान:** शेष प्रीमियम सरकार देती है एवं क्लेम राशि सीधे बैंक खाते में जमा होती है।\n\n` +
          `📞 *राष्ट्रीय २४x७ हेल्पलाइन: 14447*`;
      } else if (language === 'gu') {
        return `**પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY) – સત્તાવાર માર્ગદર્શિકા:**\n\n` +
          `૧. **૭૨ કલાકનો અનિવાર્ય નિયમ (Clause 21):** કમોસમી વરસાદ, કરા કે પૂરથી પાક નુકસાન થાય તો **72 કલાકની અંદર** Crop Insurance App અથવા ટોલ-ફ્રી નંબર **14447** પર જાણ કરવી ફરજિયાત છે.\n\n` +
          `૨. **ખેડૂત પ્રીમિયમ દરો:**\n` +
          `   - ખરીફ પાકો: માત્ર **2.0%**\n` +
          `   - રવી પાકો: માત્ર **1.5%**\n` +
          `   - બાગાયતી/વાણિજ્યિક: **5.0%**\n\n` +
          `📞 *રાષ્ટ્રીય 24x7 હેલ્પલાઇન: 14447*`;
      } else {
        return `**Pradhan Mantri Fasal Bima Yojana (PMFBY) Official Guidelines:**\n\n` +
          `1. **72-Hour Mandatory Calamity Intimation Rule (Section XXI):** In case of localized natural calamities (hailstorm, cloudburst, landslide, or inundation), the farmer MUST intimate loss within **72 hours** via the Crop Insurance App or national toll-free helpline **14447**.\n\n` +
          `2. **Subsidized Farmer Premium Rates:**\n` +
          `   - Kharif crops: Capped at **2.0%** of Sum Insured\n` +
          `   - Rabi crops: Capped at **1.5%** of Sum Insured\n` +
          `   - Commercial / Horticultural: Capped at **5.0%** of Sum Insured\n` +
          `   - The remaining actuarial balance is 100% subsidized by the Central and State Governments.\n\n` +
          `3. **High-Tech Remote Sensing:** Deploys YES-TECH satellite observation, WINDS weather networks, and CROPIC geotagged photographs for automated DBT settlements.\n\n` +
          `📞 *National 24x7 PMFBY Helpline: 14447*`;
      }
    }

    if (primary.id.includes('PACS')) {
      if (language === 'mr') {
        return `**प्राथमिक कृषी पतसंस्था (PACS) – आदर्श उपविधी व संगणकीकरण:**\n\n` +
          `१. **₹२,९२५.३९ कोटींचा राष्ट्रीय प्रकल्प:** देशभरातील ७९,६३० पॅक्सचे केंद्रीकृत क्लाउड ईआरपी सॉफ्टवेअरद्वारे संगणकीकरण.\n\n` +
          `२. **२५+ बहुउद्देशीय सेवा:** पॅक्समध्ये आता जन औषधी केंद्र (५०% ते ९०% स्वस्त औषधे), कस्टम हायरिंग ट्रॅक्टर व ड्रोन, आणि सीएससी (CSC) ई-सेवा उपलब्ध.\n\n` +
          `🏛️ *अधिकृत स्रोत: cooperation.gov.in/model-bye-laws*`;
      } else if (language === 'hi') {
        return `**प्राथमिक कृषि ऋण समितियां (PACS) – मॉडल उपनियम एवं ईआरपी:**\n\n` +
          `१. **₹२,९२५.३९ करोड़ का आधुनिकीकरण:** ७९,६३० सक्रिय पैक्स को राष्ट्रीय क्लाउड ईआरपी से जोड़ा जा रहा है।\n\n` +
          `२. **२५+ बहुउद्देशीय सेवाएं:** प्रधानमंत्री जन औषधि केंद्र, ड्रोन व कृषि उपकरण किराए पर, तथा ३००+ कॉमन सर्विस सेंटर सेवाएं।\n\n` +
          `🏛️ *मंत्रालय स्रोत: cooperation.gov.in/model-bye-laws*`;
      } else if (language === 'gu') {
        return `**પ્રાથમિક કૃષિ ધિરાણ મંડળી (PACS) – આધુનિકીકરણ અને 25+ સેવાઓ:**\n\n` +
          `૧. **₹2,925.39 કરોડ પ્રોજેક્ટ:** 79,630 મંડળીઓનું કેન્દ્રીય ERP ક્લાઉડ સોફ્ટવેર સાથે જોડાણ.\n\n` +
          `૨. **25+ સેવાઓ:** જન ઔષધિ કેન્દ્ર, ટ્રેક્ટર-ડ્રોન ભાડે આપવા અને 300+ ડિજિટલ CSC સેવાઓ.\n\n` +
          `🏛️ *સત્તાવાર પોર્ટલ: cooperation.gov.in/model-bye-laws*`;
      } else {
        return `**Primary Agricultural Credit Societies (PACS) – Model By-Laws & 79,630 ERP Project:**\n\n` +
          `1. **₹2,925.39 Cr Modernization Outlay:** Covers 79,630 functional PACS across India with centralized cloud ERP software directly synced to District Central Cooperative Banks (DCCBs).\n\n` +
          `2. **25+ Multipurpose Activities (Clause 4):** PACS now provide:\n` +
          `   - Pradhan Mantri Jan Aushadhi Kendras (up to ₹5 Lakh setup grant, 80% cheaper generic medicines)\n` +
          `   - Custom Hiring Machinery & Drone Spraying Rentals\n` +
          `   - Aadhaar-enabled Common Service Centers (CSCs) delivering 300+ e-services\n` +
          `   - Subsidized Nano Urea and Bio-fertilizer distribution at controlled government rates.\n\n` +
          `🏛️ *Ministry Source: cooperation.gov.in/model-bye-laws*`;
      }
    }

    if (primary.id.includes('KCC') || primary.id.includes('CREDIT')) {
      if (language === 'mr') {
        return `**किसान क्रेडिट कार्ड (KCC) व ४% व्याज सवलत योजना (MISS):**\n\n` +
          `१. **४.०% प्रभावी वार्षिक व्याजदर:** मूळ व्याजदर ९.०% असतो. केंद्र सरकार २% अनुदान देते आणि वेळेवर परतफेड करणाऱ्या शेतकऱ्यांना ३% प्रोत्साहन (PRI) देते. त्यामुळे शेतकऱ्यांना ₹३.०० लाखांपर्यंतचे कर्ज फक्त **४% वार्षिक दराने** मिळते.\n\n` +
          `२. **विनातारण कर्ज:** ₹१.६० लाखांपर्यंतच्या (पॅक्समध्ये ₹२.०० लाख) कर्जासाठी कोणतीही जमीन गहाण ठेवण्याची गरज नाही.`;
      } else if (language === 'hi') {
        return `**किसान क्रेडिट कार्ड (KCC) एवं ४% ब्याज अनुदान योजना (MISS):**\n\n` +
          `१. **४.०% प्रभावी वार्षिक ब्याज दर:** बैंक की सामान्य दर ९% है। केंद्र सरकार २% सबवेंशन और समय पर पुनर्भुगतान पर ३% अतिरिक्त प्रोत्साहन (PRI) देती है, जिससे ₹३.०० लाख तक का ऋण मात्र **४% वार्षिक** पड़ता है।\n\n` +
          `२. **बिना गारंटी/बंधक ऋण:** ₹१.६० लाख (कम्प्यूटरीकृत पैक्स में ₹२.०० लाख) तक बिना भूमि बंधक रखे ऋण मिलता है।`;
      } else if (language === 'gu') {
        return `**કિસાન ક્રેડિટ કાર્ડ (KCC) અને 4% વ્યાજ સહાય યોજના:**\n\n` +
          `૧. **4.0% અસરકારક વાર્ષિક વ્યાજ:** સમયસર ધિરાણ ભરપાઈ કરવા પર ₹3.00 લાખ સુધીનું પાક ધિરાણ માત્ર **4% વાર્ષિક વ્યાજે** મળે છે.\n\n` +
          `૨. **કોલેટરલ ફ્રી ધિરાણ:** ₹1.60 લાખ સુધીના ધિરાણ માટે કોઈ જમીન ગીરો રાખવાની જરૂર નથી.`;
      } else {
        return `**Kisan Credit Card (KCC) & 4% Interest Subvention Scheme (MISS):**\n\n` +
          `1. **4.0% Effective Annual Rate:** Base bank rate is 9.0%. Central Government provides a 2.0% subvention (reducing rate to 7.0%) plus a **3.0% Prompt Repayment Incentive (PRI)** for farmers repaying on time, bringing net interest to only **4% per annum** for loans up to ₹3.00 Lakh.\n\n` +
          `2. **Collateral-Free Limit:** Loans up to ₹1.60 Lakh (extended to ₹2.00 Lakh in computerized PACS) require zero land mortgage or collateral.\n\n` +
          `3. **Agriculture Infrastructure Fund (AIF):** Offers a 3.0% interest subvention for PACS to construct cold storages and warehouses up to ₹2.00 Crore.`;
      }
    }

    if (primary.id === 'MSCS-SEC85') {
      if (language === 'mr') {
        return `**सहकारी लोकपाल तक्रार निवारण (Section 85A–C):**\n\n` +
          `१. **अधिकारक्षेत्र:** बहुराज्य सहकारी संस्थांमधील ठेवी, लाभांश किंवा गैरकारभाराबाबत थेट तक्रार करता येते.\n\n` +
          `२. **अर्ज प्रपत्र:**\n` +
          `   - **Form VI:** सहकारी लोकपाल कडे अधिकृत तक्रार.\n` +
          `   - **Form VII:** अपीलीय अर्ज.\n\n` +
          `३. **निकालाची मुदत:** ३० दिवसांच्या आत तक्रारीचा निपटारा करणे बंधनकारक आहे.\n\n` +
          `🌐 *पोर्टल: crcs.gov.in/ombudsman-portal*`;
      } else if (language === 'hi') {
        return `**सहकारी लोकपाल (Ombudsman) शिकायत निवारण तंत्र:**\n\n` +
          `१. **अधिकार क्षेत्र:** बहु-राज्य सहकारी सोसायटियों में जमा न मिलने, लाभांश में देरी या धोखाधड़ी पर शिकायत दर्ज करें।\n\n` +
          `२. **निर्धारित प्रपत्र:**\n` +
          `   - **प्रपत्र VI:** लोकपाल के पास मुख्य शिकायत।\n` +
          `   - **प्रपत्र VII:** अपीलीय आवेदन।\n\n` +
          `३. **समाधान समय-सीमा:** अधिकतम **३० दिनों** के भीतर जांच और समाधान अनिवार्य है।\n\n` +
          `🌐 *पोर्टल: crcs.gov.in/ombudsman-portal*`;
      } else if (language === 'gu') {
        return `**સહકારી લોકપાલ ફરિયાદ નિવારણ પ્રક્રિયા (Section 85A):**\n\n` +
          `૧. **ફરિયાદ:** થાપણો, ડિવિડન્ડ કે ગેરરીતિ અંગે લોકપાલ સમક્ષ ફરિયાદ કરી શકાય છે.\n\n` +
          `૨. **ફોર્મ:** ફોર્મ VI (મુખ્ય ફરિયાદ) અને ફોર્મ VII (અપીલ).\n\n` +
          `૩. **સમયમર્યાદા:** 30 દિવસમાં ફરિયાદનો નિકાલ ફરજિયાત છે.\n\n` +
          `🌐 *પોર્ટલ: crcs.gov.in/ombudsman-portal*`;
      } else {
        return `**Cooperative Ombudsman Grievance Redressal Mechanism (Section 85A–C):**\n\n` +
          `1. **Statutory Jurisdiction:** Members of multi-state cooperative societies can file grievances regarding unpaid deposits, delayed dividends, refusal of membership, or corruption.\n\n` +
          `2. **Prescribed Forms:**\n` +
          `   - **Form VI:** Official Complaint to Co-operative Ombudsman\n` +
          `   - **Form VII:** Statutory Appeal against Society Information Officers\n\n` +
          `3. **Statutory SLA:** The Ombudsman must investigate and resolve complaints within a maximum of **30 days**.\n\n` +
          `🌐 *Online Filing Portal: crcs.gov.in/ombudsman-portal*`;
      }
    }

    // Default statutory summary
    return `Namaste! I am CoopSathi AI, powered by the **Official Government RAG Engine** of the Ministry of Cooperation & NCCT.\n\n` +
      `Grounded in statutory gazettes:\n` +
      `• **${primary.actOrScheme}** (${primary.sectionOrClause})\n` +
      `• **${secondary ? secondary.actOrScheme + ' (' + secondary.sectionOrClause + ')' : ''}**\n\n` +
      `${primary.content}\n\n` +
      `Official Authority: ${primary.authority}\nVerified Portal: ${primary.officialUrl}`;
  }

  private deriveSuggestedActions(chunks: RAGChunk[], query: string): string[] {
    const primary = chunks[0];
    if (!primary) return ['Check Scheme Eligibility', 'Download Application Form', 'Track Status'];

    // 1. If matched chunk is an official scheme with schemeData
    if (primary.schemeData) {
      const s = primary.schemeData;
      let portalHost = 'Official Portal';
      try {
        if (s.officialUrl) {
          const u = new URL(s.officialUrl);
          portalHost = u.hostname.replace('www.', '');
        }
      } catch {}

      const helplineNumber = s.helpline ? s.helpline.split('/')[0].split(',')[0].trim() : '1800-180-1551';
      return [
        `Apply Online on ${portalHost}`,
        `Check Eligibility & Documents`,
        `Call Helpline: ${helplineNumber}`
      ];
    }

    // 2. Statutory Knowledge chunk actions
    const id = primary.id;
    if (id === 'GOV-RTI-2005') {
      return ['File RTI Online (rtionline.gov.in)', '30-Day SLA & First Appeal', 'RTI Fee: ₹10 (BPL Free)'];
    }
    if (id === 'GOV-VOTER-ECI') {
      return ['Apply Form 6 (voters.eci.gov.in)', 'Download e-EPIC Digital Card', 'Call 1950 Voter Helpline'];
    }
    if (id === 'GOV-DIGILOCKER') {
      return ['Open DigiLocker (digilocker.gov.in)', 'Issued Documents Legal Status (Rule 9A)', 'Link Aadhaar to DigiLocker'];
    }
    if (id === 'GOV-AADHAAR-UIDAI') {
      return ['Book Appointment at Ask Kendra', 'Update Mobile Number in Aadhaar', 'Check Aadhaar-Bank DBT Status'];
    }
    if (id === 'GOV-PASSPORT-SEVA') {
      return ['Apply on passportindia.gov.in', 'Tatkaal vs Normal Passport', 'Track Dispatch Status'];
    }
    if (id === 'WOMEN-DRONE-DIDI') {
      return ['80% Drone Subsidy Rules', 'Namo Drone Didi SHG Criteria', '15-Day DGCA Pilot Training'];
    }
    if (id === 'WOMEN-LAKHPATI-DIDI') {
      return ['Lakhpati Didi SHG Criteria', '₹1-3 Lakh Collateral-Free Credit', 'Community Resource Person Guidance'];
    }
    if (id === 'COOP-NCCT') {
      return ['NCCT Training Calendar', 'VAMNICOM Pune Cooperative MBA', 'PACS Secretary Digital Training'];
    }
    if (id === 'COOP-BBSSL') {
      return ['Certified Seeds Purchase (bbssl.in)', 'PACS Seed Distribution Margin', 'Become BBSSL Member Society'];
    }
    if (id === 'COOP-NCOL') {
      return ['Bharat Organics Certification', 'PACS Organic Aggregation Centre', 'Direct Export Market Premium'];
    }
    if (id === 'COOP-NCEL') {
      return ['Export Access via NCEL', 'Surplus Agri Produce Aggregation', 'Export Documentation Support'];
    }
    if (id === 'COOP-WHITE-REV-2') {
      return ['Set up Dairy PACS in Village', '50% NDDB Micro-Dairy Subsidy', 'Micro-Chilling & Milk Testing Grant'];
    }
    if (id === 'MSCS-SEC29' || id === 'MSCS-SEC45') {
      return ['View Active Member Criteria', 'File Complaint on Voting Denial', 'Section 29 MSCS Act Gazette'];
    }
    if (id === 'MSCS-SEC85') {
      return ['Download Form VI Grievance Form', 'CRCS Ombudsman Digital Portal', '30-Day Statutory Redressal SLA'];
    }
    if (id === 'PACS-MODEL-BYLAWS' || id === 'PACS-ERP-MISSION') {
      return ['Download Form 1 PACS Membership', 'Explore 25+ Business Activities', 'Jan Aushadhi Kendra Application'];
    }
    if (id.includes('PMFBY')) {
      return ['Report Loss within 72 Hours', 'Call 14447 PMFBY Helpline', 'Crop Insurance App Download'];
    }
    if (id.includes('KCC') || id.includes('CREDIT')) {
      return ['Download 1-Page KCC Form', 'Calculate 4% Interest Terms', 'Collateral-Free Limit Rules'];
    }

    return ['Check Scheme Eligibility', 'Download Application Form', 'Track Application Status'];
  }

  /**
   * Synthesizes 5-step application guide for any of the 93+ official government schemes
   */
  private synthesizeSchemeApplication(s: any, language: string): string {
    const title = s.title;
    const shortName = s.shortName || title;
    const step1 = s.applicationProcess?.step1 || 'Check eligibility requirements and prepare documents.';
    const step2 = s.applicationProcess?.step2 || 'Visit the designated online portal or local office.';
    const step3 = s.applicationProcess?.step3 || 'Fill out the registration form with personal and land/bank details.';
    const step4 = s.applicationProcess?.step4 || 'Upload required documents and submit the application.';
    const step5 = s.applicationProcess?.step5 || 'Receive acknowledgment receipt and track status online.';
    const docs = (s.requiredDocuments || ['Aadhaar Card', 'Bank Passbook']).join(', ');
    const portal = s.officialUrl || 'https://myscheme.gov.in';
    const helpline = s.helpline || '1800-180-1551';

    if (language === 'mr') {
      return `**पायरी-दर-पायरी मार्गदर्शक: ${title} साठी अर्ज कसा करावा**\n\n` +
        `**पायरी १: पात्रता तपासा व आवश्यक कागदपत्रे गोळा करा**\n` +
        `• **पात्रता:** ${(s.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
        `• **आवश्यक कागदपत्रे:** ${docs}\n\n` +
        `**पायरी २: अर्ज करण्याचे माध्यम निवडा (ऑनलाइन किंवा ऑफलाइन)**\n` +
        `• **ऑनलाइन माध्यम:** केंद्र सरकारच्या **${portal}** या अधिकृत पोर्टलवर जा.\n` +
        `• **ऑफलाइन माध्यम:** गावातील **प्राथमिक कृषी पतसंस्था (PACS)**, सीएससी (CSC) केंद्र किंवा संबंधित बँक शाखेत जा.\n\n` +
        `**पायरी ३: अधिकृत नोंदणी व तपशील भरणे**\n` +
        `• ${step2} ${step3}\n\n` +
        `**पायरी ४: कागदपत्रे अपलोड व पोचपावती (Acknowledgment)**\n` +
        `• ${step4}\n\n` +
        `**पायरी ५: अर्ज मंजुरी व ट्रॅकिंग**\n` +
        `• ${step5}\n\n` +
        `📞 **राष्ट्रीय २४x७ हेल्पलाइन:** ${helpline} | 🌐 **अधिकृत पोर्टल:** [${portal}](${portal})`;
    }

    if (language === 'hi') {
      return `**चरण-दर-चरण मार्गदर्शिका: ${title} हेतु आवेदन कैसे करें**\n\n` +
        `**चरण १: पात्रता जांचें एवं आवश्यक दस्तावेज तैयार करें**\n` +
        `• **पात्रता:** ${(s.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
        `• **अनिवार्य दस्तावेज:** ${docs}\n\n` +
        `**चरण २: आवेदन माध्यम का चयन करें (ऑनलाइन अथवा ऑफलाइन)**\n` +
        `• **ऑनलाइन माध्यम:** आधिकारिक पोर्टल **${portal}** पर जाएं।\n` +
        `• **ऑफलाइन माध्यम:** निकटतम **पैक्स (PACS)** समिति, जन सेवा केंद्र (CSC) अथवा बैंक शाखा में संपर्क करें।\n\n` +
        `**चरण ३: पंजीकरण एवं विवरण प्रविष्टि**\n` +
        `• ${step2} ${step3}\n\n` +
        `**चरण ४: दस्तावेज अपलोड एवं पावती रसीद**\n` +
        `• ${step4}\n\n` +
        `**चरण ५: सत्यापन एवं आवेदन स्थिति ट्रैकिंग**\n` +
        `• ${step5}\n\n` +
        `📞 **राष्ट्रीय हेल्पलाइन:** ${helpline} | 🌐 **आधिकारिक पोर्टल:** [${portal}](${portal})`;
    }

    if (language === 'gu') {
      return `**પગલાંવાર માર્ગદર્શિકા: ${title} માટે અરજી કેવી રીતે કરવી**\n\n` +
        `**પગલું ૧: પાત્રતા ચકાસો અને જરૂરી દસ્તાવેજો એકત્રિત કરો**\n` +
        `• **પાત્રતા:** ${(s.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
        `• **જરૂરી દસ્તાવેજો:** ${docs}\n\n` +
        `**પગલું ૨: અરજીનું માધ્યમ પસંદ કરો (ઓનલાઇન કે ઓફલાઇન)**\n` +
        `• **ઓનલાઇન પોર્ટલ:** ભારત સરકારના સત્તાવાર પોર્ટલ **${portal}** પર જાઓ.\n` +
        `• **ઓફલાઇન કેન્દ્ર:** તમારી ગામની **પેક્સ (PACS)** મંડળી અથવા નજીકના CSC કેન્દ્ર પર જાઓ.\n\n` +
        `**પગલું ૩: રજીસ્ટ્રેશન અને વિગતો ભરો**\n` +
        `• ${step2} ${step3}\n\n` +
        `**પગલું ૪: દસ્તાવેજો અપલોડ અને પહોંચ મેળવો**\n` +
        `• ${step4}\n\n` +
        `**પગલું ૫: ચકાસણી અને સ્થિતિ ટ્રેક કરો**\n` +
        `• ${step5}\n\n` +
        `📞 **રાષ્ટ્રીય હેલ્પલાઇન:** ${helpline} | 🌐 **સત્તાવાર પોર્ટલ:** [${portal}](${portal})`;
    }

    return `**Step-by-Step Guide: How to Apply for ${title}**\n\n` +
      `**Step 1: Check Eligibility & Prepare Required Documents**\n` +
      `• **Eligibility:** ${(s.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
      `• **Required Documents:** ${docs}\n\n` +
      `**Step 2: Choose Application Channel (Online or Offline)**\n` +
      `• **Online Channel:** Access the official Government Portal at **${portal}**.\n` +
      `• **Offline Channel:** Visit your village **Primary Agricultural Credit Society (PACS)**, Common Service Centre (CSC), or nearest authorized Bank Branch.\n\n` +
      `**Step 3: Registration & Data Entry**\n` +
      `• ${step2} ${step3}\n\n` +
      `**Step 4: Document Verification & Acknowledgment Receipt**\n` +
      `• ${step4}\n\n` +
      `**Step 5: Sanction, DBT Disbursal & Status Tracking**\n` +
      `• ${step5}\n\n` +
      `📞 **24x7 National Helpline:** ${helpline} | 🌐 **Official Portal:** [${portal}](${portal})`;
  }

  /**
   * Generates authoritative step-by-step application guidance across all major schemes & services
   */
  private synthesizeStepByStepApplication(query: string, language: string, chunks: RAGChunk[]): string {
    const primary = chunks[0];
    if (!primary) {
      return 'Please visit https://india.gov.in for government application guidelines.';
    }

    // 0.1 RTI Act 2005 Application
    if (primary.id === 'GOV-RTI-2005') {
      if (language === 'mr') {
        return `**पायरी-दर-पायरी मार्गदर्शक: माहिती अधिकारांतर्गत (RTI) अर्ज कसा करावा**\n\n` +
          `**पायरी १: माहितीचा विषय व संबंधित मंत्रालय निश्चित करा**\n` +
          `• तुम्हाला हवी असलेली माहिती केंद्र सरकारच्या कोणत्या विभागाशी संबंधित आहे ते तपासा.\n\n` +
          `**पायरी २: अधिकृत ऑनलाइन पोर्टलवर जा**\n` +
          `• केंद्र सरकारच्या **rtionline.gov.in** या पोर्टलवर जाऊन "Submit Request" वर क्लिक करा.\n\n` +
          `**पायरी ३: अर्ज व अचूक प्रश्न लिहा**\n` +
          `• ५०० शब्दांपर्यंत नेमके प्रश्न लिहा. वैयक्तिक माहिती व मोबाईल नंबर भरा.\n\n` +
          `**पायरी ४: ₹१० नाममात्र शुल्क भरा**\n` +
          `• UPI, नेट बँकिंग किंवा डेबिट कार्डने फक्त ₹१० फी भरा (BPL कार्डधारकांना पूर्ण मोफत).\n\n` +
          `**पायरी ५: ३० दिवसांत उत्तर मिळवा (Statutory SLA)**\n` +
          `• नोंदणी क्रमांक मिळतो. कायदेशीर नियमांनुसार **३० दिवसांच्या आत** जन माहिती अधिकाऱ्याने (PIO) उत्तर देणे बंधनकारक आहे.\n\n` +
          `🌐 **अधिकृत पोर्टल:** [rtionline.gov.in](https://rtionline.gov.in)`;
      } else {
        return `**Step-by-Step Guide: How to File an RTI Application Online (RTI Act 2005)**\n\n` +
          `**Step 1: Identify Public Authority & Specific Questions**\n` +
          `• Identify the relevant Ministry, Department, or Autonomous body and frame concise, specific queries (within 500 words).\n\n` +
          `**Step 2: Access the National RTI Online Portal**\n` +
          `• Visit **rtionline.gov.in** and click on "Submit Request". Accept terms and guidelines.\n\n` +
          `**Step 3: Fill Out Applicant & Public Authority Details**\n` +
          `• Select Ministry/Department, enter personal details, email, and active mobile number for SMS alerts.\n\n` +
          `**Step 4: Pay Statutory ₹10 Fee (Free for BPL)**\n` +
          `• Pay the nominal ₹10 application fee via UPI, Net Banking, or Credit/Debit Card. If Below Poverty Line, upload BPL Certificate for 100% fee exemption.\n\n` +
          `**Step 5: Track Registration ID & Receive Reply within 30 Days**\n` +
          `• Note the unique Registration Number. Under Section 7(1), the PIO must reply within **30 days** (or 48 hours for life/liberty issues).\n\n` +
          `🌐 **Official Portal:** [rtionline.gov.in](https://rtionline.gov.in)`;
      }
    }

    // 0.2 Voter ID Registration Form 6
    if (primary.id === 'GOV-VOTER-ECI') {
      if (language === 'mr') {
        return `**पायरी-दर-पायरी मार्गदर्शक: नवीन मतदार ओळखपत्रासाठी (Voter ID) अर्ज कसा करावा**\n\n` +
          `**पायरी १: कागदपत्रे तयार ठेवा**\n` +
          `• वयाचा पुरावा (आधार/जन्म दाखला), पत्त्याचा पुरावा (रेशन कार्ड/वीज बिल) आणि पासपोर्ट फोटो.\n\n` +
          `**पायरी २: ECI पोर्टलवर 'फॉर्म ६' निवडा**\n` +
          `• **voters.eci.gov.in** पोर्टलवर किंवा 'Voter Helpline App' वर जाऊन 'New Voter Registration (Form 6)' निवडा.\n\n` +
          `**पायरी ३: वैयक्तिक व मतदारसंघाचा तपशील भरा**\n` +
          `• विधानसभा मतदारसंघ, नाव, जन्मतारीख व पत्ता भरा आणि कागदपत्रे अपलोड करा.\n\n` +
          `**पायरी ४: बीएलओ (BLO) प्रत्यक्ष पडताळणी**\n` +
          `• अर्ज सबमिट केल्यावर संदर्भ क्रमांक मिळतो. स्थानिक मतदान केंद्र अधिकारी (BLO) घरपोच येऊन खातरजमा करतात.\n\n` +
          `**पायरी ५: डिजिटल e-EPIC डाऊनलोड करा व मूळ कार्ड घरपोच मिळवा**\n` +
          `• मंजुरी मिळताच e-EPIC पीडीएफ डाऊनलोड करा. मूळ प्लास्टिक कार्ड भारतीय पोस्टाद्वारे मोफत घरपोच पाठवले जाते.\n\n` +
          `📞 **हेल्पलाइन:** १९५० | 🌐 **पोर्टल:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      } else {
        return `**Step-by-Step Guide: How to Apply for a New Voter ID Card (Form 6)**\n\n` +
          `**Step 1: Check Eligibility & Prepare Documents**\n` +
          `• Eligibility: Indian citizen aged 18+.\n` +
          `• Documents: Aadhaar Card / Birth Certificate, Address Proof (Electricity bill / Ration card / Passport), and recent passport photo.\n\n` +
          `**Step 2: Access ECI Voters Portal or App**\n` +
          `• Visit **voters.eci.gov.in** or download the official **Voter Helpline App** on Android/iOS.\n\n` +
          `**Step 3: Fill Out Form 6 (New Voter Registration)**\n` +
          `• Select State, District, and Assembly Constituency. Fill out demographic details and upload verified documents.\n\n` +
          `**Step 4: Field Verification by Booth Level Officer (BLO)**\n` +
          `• Save your Reference ID. The designated BLO conducts physical verification of residency.\n\n` +
          `**Step 5: Download Digital e-EPIC & Receive Postal Card**\n` +
          `• Download your digitally signed e-EPIC card instantly online. The physical voter card is delivered via Speed Post free of cost.\n\n` +
          `📞 **Toll-Free Helpline:** 1950 | 🌐 **Official Portal:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      }
    }

    const primaryId = primary.id;

    // 1. PMFBY (Pradhan Mantri Fasal Bima Yojana) / Crop Insurance & Claims
    if (primaryId.includes('PMFBY') || /pmfby|fasal|bima|crop|विमा|पीक|फसल|કાપડ|બીમા/i.test(query)) {
      if (language === 'mr') {
        return `**पायरी-दर-पायरी मार्गदर्शक: प्रधानमंत्री पीक विमा योजनेसाठी (PMFBY) अर्ज कसा करावा**\n\n` +
          `**पायरी १: पात्रता तपासा व आवश्यक कागदपत्रे गोळा करा**\n` +
          `• **पात्रता:** अधिसूचित महसूल मंडळात अधिसूचित पिके घेणारे सर्व शेतकरी (कर्जदार, बिगर-कर्जदार, कुळ व भाडेकरू शेतकरी).\n` +
          `• **आवश्यक कागदपत्रे:**\n` +
          `  - आधार कार्ड (बँक खात्याशी संलग्न असलेले)\n` +
          `  - चालू ७/१२ आणि ८-अ उतारा (जमिनीचा दाखला)\n` +
          `  - बँक पासबुकची प्रत (बँकेचे नाव, IFSC कोड व खाते क्रमांक स्पष्ट)\n` +
          `  - चालू हंगामाचे पीक पेरा स्वयंघोषणापत्र / तलाठी पीक नोंद दाखला.\n\n` +
          `**पायरी २: अर्ज करण्याचे माध्यम निवडा (ऑनलाइन किंवा ऑफलाइन)**\n` +
          `• **ऑनलाइन माध्यम:** केंद्र सरकारच्या **pmfby.gov.in** या अधिकृत पोर्टलवर किंवा **Crop Insurance App** वरून थेट अर्ज करा.\n` +
          `• **ऑफलाइन माध्यम:** गावातील **प्राथमिक कृषी पतसंस्था (PACS)**, जिल्हा मध्यवर्ती सहकारी बँक (DCCB), राष्ट्रीयीकृत बँक किंवा आपले सरकार / सीएससी (CSC) केंद्रावर जा.\n\n` +
          `**पायरी ३: शेतकरी नोंदणी व पिकाचा तपशील भरा**\n` +
          `• मोबाईल नंबर व आधार ओटीपी द्वारे पोर्टलवर लॉग इन करा.\n` +
          `• जिल्हा, तालुका, गाव, गट क्रमांक आणि पिकाखालील प्रत्यक्ष क्षेत्राची अचूक नोंद करा.\n` +
          `• ७/१२ उतारा व पीक पेरा प्रमाणपत्राची प्रत अपलोड करा.\n\n` +
          `**पायरी ४: सवलतीचा शेतकरी विमा हप्ता भरा व पावती मिळवा**\n` +
          `• विहित शेतकरी हप्ता ऑनलाइन किंवा पॅक्समध्ये जमा करा:\n` +
          `  - **खरीप पिके:** विमा संरक्षित रकमेच्या फक्त **२.०%**\n` +
          `  - **रब्बी पिके:** विमा संरक्षित रकमेच्या फक्त **१.५%**\n` +
          `  - **नगदी/बागायती पिके:** विमा संरक्षित रकमेच्या **५.०%**\n` +
          `• अर्ज सबमिट केल्यावर अधिकृत **विमा पॉलिसी पावती व ॲप्लिकेशन ट्रॅकिंग नंबर** तात्काळ डाऊनलोड करा.\n\n` +
          `**पायरी ५: नैसर्गिक आपत्ती आल्यास ७२ तासांत क्लेम नोंदवा (Clause 21)**\n` +
          `• गारपीट, पूर किंवा अतिवृष्टी झाल्यास नुकसान झाल्यापासून **७२ तासांच्या आत** Crop Insurance App द्वारे किंवा टोल-फ्री क्रमांकावर संपर्क साधा.\n\n` +
          `📞 **राष्ट्रीय २४x७ हेल्पलाइन:** १४४४७ | 🌐 **अधिकृत पोर्टल:** pmfby.gov.in`;
      } else if (language === 'hi') {
        return `**चरण-दर-चरण मार्गदर्शिका: प्रधानमंत्री फसल बीमा योजना (PMFBY) के लिए आवेदन कैसे करें**\n\n` +
          `**चरण १: पात्रता जांचें एवं आवश्यक दस्तावेज तैयार करें**\n` +
          `• **पात्रता:** अधिसूचित क्षेत्रों में अधिसूचित फसलों की बुवाई करने वाले सभी किसान (ऋणी, गैर-ऋणी, बटाईदार एवं पट्टेदार किसान)।\n` +
          `• **अनिवार्य दस्तावेज:**\n` +
          `  - आधार कार्ड (डीबीटी बैंक खाते से लिंक)\n` +
          `  - नवीनतम खतौनी / भू-अभिलेख (७/१२ या जमीन की नकल)\n` +
          `  - बैंक पासबुक की प्रति (आईएफएससी कोड व खाता संख्या स्पष्ट)\n` +
          `  - पटवारी या ग्राम प्रधान द्वारा जारी फसल बुवाई प्रमाण पत्र / स्वघोषणा पत्र।\n\n` +
          `**चरण २: आवेदन माध्यम का चयन करें (ऑनलाइन अथवा ऑफलाइन)**\n` +
          `• **ऑनलाइन माध्यम:** राष्ट्रीय फसल बीमा पोर्टल (**pmfby.gov.in**) अथवा **Crop Insurance App** पर जाएं।\n` +
          `• **ऑफलाइन माध्यम:** अपनी निकटतम **प्राथमिक कृषि ऋण समिति (PACS)**, जिला केंद्रीय सहकारी बैंक (DCCB), वाणिज्यिक बैंक शाखा या जन सेवा केंद्र (CSC) पर जाएं।\n\n` +
          `**चरण ३: किसान पंजीकरण एवं फसल विवरण भरें**\n` +
          `• मोबाइल नंबर एवं आधार सत्यापन (OTP) द्वारा पंजीकरण करें।\n` +
          `• राज्य, जिला, तहसील, खसरा/खतौनी नंबर एवं बोई गई फसल का रकबा दर्ज करें।\n` +
          `• भू-अभिलेख एवं बुवाई प्रमाण पत्र की स्पष्ट प्रति अपलोड करें।\n\n` +
          `**चरण ४: रियायती प्रीमियम का भुगतान करें एवं पावती प्राप्त करें**\n` +
          `• सरकार द्वारा निर्धारित न्यूनतम किसान प्रीमियम जमा करें:\n` +
          `  - **खरीफ फसलें:** बीमित राशि का मात्र **२.०%**\n` +
          `  - **रबी फसलें:** बीमित राशि का मात्र **१.५%**\n` +
          `  - **व्यावसायिक/बागवानी फसलें:** बीमित राशि का **५.०%**\n` +
          `• आवेदन जमा कर अपनी **आधिकारिक पॉलिसी रसीद व आवेदन ट्रैकिंग नंबर** अवश्य सुरक्षित रखें।\n\n` +
          `**चरण ५: फसल क्षति होने पर ७२ घंटे में सूचना दर्ज करें**\n` +
          `• ओलावृष्टि, जलभराव या चक्रवात से नुकसान होने पर **७२ घंटे के भीतर** ऐप अथवा राष्ट्रीय हेल्पलाइन पर क्लेम दर्ज कराएं।\n\n` +
          `📞 **राष्ट्रीय २४x७ हेल्पलाइन:** 14447 | 🌐 **आधिकारिक पोर्टल:** pmfby.gov.in`;
      } else if (language === 'gu') {
        return `**પગલાંવાર માર્ગદર્શિકા: પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY) માટે અરજી કેવી રીતે કરવી**\n\n` +
          `**પગલું ૧: પાત્રતા ચકાસો અને જરૂરી દસ્તાવેજો એકત્રિત કરો**\n` +
          `• **પાત્રતા:** સૂચિત વિસ્તારોમાં સૂચિત પાકોની વાવણી કરનારા તમામ ખેડૂતો (ધિરાણધારક અને બિન-ધિરાણધારક ખેડૂતો).\n` +
          `• **જરૂરી દસ્તાવેજો:**\n` +
          `  - આધાર કાર્ડ (બેંક એકાઉન્ટ સાથે લિંક થયેલ)\n` +
          `  - જમીનના ૭/૧૨ અને ૮-અ ના તાજા ઉતારા\n` +
          `  - બેંક પાસબુક (IFSC કોડ સ્પષ્ટ દેખાતો હોય)\n` +
          `  - તલાટી/ગ્રામસેવક દ્વારા પ્રમાણિત પાક વાવણી અંગેનું પ્રમાણપત્ર.\n\n` +
          `**પગલું ૨: અરજીનું માધ્યમ પસંદ કરો (ઓનલાઇન કે ઓફલાઇન)**\n` +
          `• **ઓનલાઇન પોર્ટલ:** ભારત સરકારના સત્તાવાર પોર્ટલ **pmfby.gov.in** પર જાઓ અથવા **Crop Insurance App** ડાઉનલોડ કરો.\n` +
          `• **ઓફલાઇન કેન્દ્ર:** તમારી ગામની **પ્રાથમિક કૃષિ ધિરાણ મંડળી (PACS)**, જિલ્લા મધ્યસ્થ સહકારી બેંક (DCCB) અથવા નજીકના CSC કેન્દ્ર પર જાઓ.\n\n` +
          `**પગલું ૩: ખેડૂત રજીસ્ટ્રેશન અને પાક વિગત ભરો**\n` +
          `• મોબાઇલ નંબર અને આધાર ઓટીપી દ્વારા લોગિન કરો.\n` +
          `• જિલ્લો, તાલુકો, ગામ, સર્વે નંબર અને વાવેતર કરેલ પાકની વિગત નોંધો.\n` +
          `• ૭/૧૨ અને વાવણી પ્રમાણપત્ર સ્કેન કરી અપલોડ કરો.\n\n` +
          `**પગલું ૪: રાહત દરે પ્રીમિયમ ભરો અને વીમા સ્લિપ મેળવો**\n` +
          `• ખેડૂતે ભરવાપાત્ર સબસિડીયુક્ત પ્રીમિયમ ભરો:\n` +
          `  - **ખરીફ પાકો:** વીમા રકમના માત્ર **૨.૦%**\n` +
          `  - **રવિ પાકો:** વીમા રકમના માત્ર **૧.૫%**\n` +
          `  - **વાણિજ્યિક/બાગાયતી:** વીમા રકમના **૫.૦%**\n` +
          `• અરજી જમા કરી તમારી **વીમા પોલિસી સ્લિપ અને એપ્લિકેશન ટ્રેકિંગ આઈડી** સાચવી રાખો.\n\n` +
          `**પગલું ૫: પાક નુકસાનીના કિસ્સામાં ૭૨ કલાકમાં જાણ કરો**\n` +
          `• કમોસમી વરસાદ, કરા કે પૂરના નુકસાન વખતે **૭૨ કલાકની અંદર** એપ અથવા ટોલ-ફ્રી નંબર પર ક્લેમ નોંધાવો.\n\n` +
          `📞 **રાષ્ટ્રીય ૨૪x૭ હેલ્પલાઇન:** 14447 | 🌐 **સત્તાવાર પોર્ટલ:** pmfby.gov.in`;
      } else {
        return `**Step-by-Step Guide: How to Apply for Pradhan Mantri Fasal Bima Yojana (PMFBY)**\n\n` +
          `**Step 1: Verify Eligibility & Gather Mandatory Documents**\n` +
          `• **Eligibility:** All farmers growing notified crops in notified areas (loanee, non-loanee, sharecroppers, and tenant farmers).\n` +
          `• **Required Documents:**\n` +
          `  - Aadhaar Card (mandatory for identity and DBT credit linkage)\n` +
          `  - Land Record Document (7/12 extract / Khatauni / Land Possession Certificate)\n` +
          `  - Bank Passbook with clear IFSC and account number\n` +
          `  - Crop Sowing Certificate / Self-Declaration issued by Patwari or Agricultural Officer.\n\n` +
          `**Step 2: Select Your Application Mode (Online or Offline)**\n` +
          `• **Online Portal:** Access the National Crop Insurance Portal at **pmfby.gov.in** or download the official **Crop Insurance App** from the Google Play Store.\n` +
          `• **Offline Center:** Visit your nearest **Primary Agricultural Credit Society (PACS)**, District Central Cooperative Bank (DCCB), Commercial Bank branch, or Common Service Centre (CSC).\n\n` +
          `**Step 3: Complete Farmer Registration & Crop Sowing Details**\n` +
          `• Register or log in using your Mobile Number and Aadhaar OTP.\n` +
          `• Select your State, District, Tehsil, Village, Survey / Khasra Number, and the exact notified crop sown.\n` +
          `• Upload clear scanned copies of your Land Record and Sowing Certificate.\n\n` +
          `**Step 4: Remit Subsidized Farmer Premium & Obtain Policy Receipt**\n` +
          `• Pay your heavily subsidized farmer share of premium:\n` +
          `  - **Kharif Crops:** Capped at **2.0%** of Sum Insured\n` +
          `  - **Rabi Crops:** Capped at **1.5%** of Sum Insured\n` +
          `  - **Commercial / Horticultural Crops:** Capped at **5.0%** of Sum Insured\n` +
          `• Download and print your official **Policy Certificate with unique Application Tracking ID**.\n\n` +
          `**Step 5: Post-Harvest Loss & Calamity Claim Intimation (72-Hour Rule)**\n` +
          `• If crops suffer localized damage due to hailstorm, inundation, landslide, or cloudburst, submit loss intimation within **72 hours** via the Crop Insurance App or national helpline.\n\n` +
          `📞 **National 24x7 PMFBY Helpline:** 14447 | 🌐 **Portal:** pmfby.gov.in`;
      }
    }

    // 2. PACS Membership & 25+ Citizen Services
    if (primaryId.includes('PACS') || /pacs|पैक्स|पॅक्स|मંડળી|membership|सभासद|सदस्य|સભ્ય|aushadhi/i.test(query)) {
      if (language === 'mr') {
        return `**पायरी-दर-पायरी मार्गदर्शक: पॅक्स (PACS) सभासदत्व व सेवांसाठी अर्ज कसा करावा**\n\n` +
          `**पायरी १: पात्रता तपासा व कागदपत्रे तयार करा**\n` +
          `• **पात्रता:** पॅक्सच्या कार्यक्षेत्रातील कोणताही शेतकरी किंवा ग्रामीण रहिवासी.\n` +
          `• **कागदपत्रे:** आधार कार्ड, रहिवासी दाखला, ७/१२ उतारा, २ पासपोर्ट आकाराचे फोटो आणि बँक पासबुक.\n\n` +
          `**पायरी २: सभासदत्व अर्ज (Form 1) प्राप्त करा**\n` +
          `• स्थानिक पॅक्स कार्यालयातून सचिव (Secretary) यांच्याकडून विहित 'नमुना १' अर्ज मिळवा किंवा राष्ट्रीय पॅक्स पोर्टलवरून डाऊनलोड करा.\n\n` +
          `**पायरी ३: किमान भागभांडवल (Share Capital) जमा करा**\n` +
          `• संस्थेच्या उपविधीनुसार किमान १ शेअर्स रक्कम (उदा. ₹१०० ते ₹५००) आणि नाममात्र प्रवेश शुल्क (₹१०) जमा करा.\n\n` +
          `**पायरी ४: संचालक मंडळाची मान्यता (३० दिवसांची मुदत)**\n` +
          `• आदर्श उपविधी कलम ६ नुसार, अर्ज सादर केल्यापासून **३० दिवसांच्या आत** संचालक मंडळाने मान्यता देणे बंधनकारक आहे.\n\n` +
          `**पायरी ५: सभासद पासबुक मिळवा व २५+ सेवांचा लाभ घ्या**\n` +
          `• मंजुरीनंतर अधिकृत सभासद क्रमांक व पासबुक मिळते. यानंतर जन औषधी केंद्र (५०-९०% स्वस्त औषधे), स्वस्त खते, ट्रॅक्टर-ड्रोन भाडे, आणि शून्य टक्के व्याज केसीसी कर्जाचा लाभ गावातच मिळतो.\n\n` +
          `🏛️ *अधिक माहिती: cooperation.gov.in/model-bye-laws*`;
      } else if (language === 'hi') {
        return `**चरण-दर-चरण मार्गदर्शिका: पैक्स (PACS) सदस्यता एवं सेवाओं हेतु आवेदन कैसे करें**\n\n` +
          `**चरण १: पात्रता एवं आवश्यक दस्तावेज**\n` +
          `• **पात्रता:** पैक्स के कार्यक्षेत्र में रहने वाला कोई भी कृषक अथवा ग्रामीण नागरिक।\n` +
          `• **दस्तावेज:** आधार कार्ड, निवास प्रमाण पत्र, भू-अभिलेख (खतौनी), २ पासपोर्ट फोटो व बैंक पासबुक।\n\n` +
          `**चरण २: सदस्यता आवेदन पत्र (प्रपत्र १) प्राप्त करें**\n` +
          `• अपनी ग्राम पंचायत की पैक्स समिति के सचिव से सदस्यता प्रपत्र प्राप्त करें।\n\n` +
          `**चरण ३: न्यूनतम शेयर पूंजी एवं प्रवेश शुल्क जमा करें**\n` +
          `• उपनियमों के अनुसार न्यूनतम शेयर राशि (₹100 - ₹500) तथा प्रवेश शुल्क जमा कर रसीद प्राप्त करें।\n\n` +
          `**चरण ४: ३० दिनों में अनिवार्य स्वीकृति (मॉडल उपनियम)**\n` +
          `• नए मॉडल उपनियमों के तहत आवेदन जमा करने के **३० दिनों के भीतर** प्रबंध समिति द्वारा सदस्यता स्वीकृत की जाती है।\n\n` +
          `**चरण ५: सदस्यता पासबुक प्राप्त कर २५+ सेवाओं का लाभ लें**\n` +
          `• सदस्यता संख्या मिलते ही रियायती खाद, शून्य प्रतिशत ब्याज KCC ऋण, जन औषधि केंद्र से सस्ती दवाएं, और ड्रोन किराए की सुविधा प्राप्त करें।\n\n` +
          `🏛️ *सत्यापित स्रोत: cooperation.gov.in/model-bye-laws*`;
      } else if (language === 'gu') {
        return `**પગલાંવાર માર્ગદર્શિકા: પેક્સ (PACS) સભ્યપદ અને સેવાઓ માટે અરજી કેવી રીતે કરવી**\n\n` +
          `**પગલું ૧: પાત્રતા અને જરૂરી દસ્તાવેજો**\n` +
          `• **પાત્રતા:** મંડળીના કાર્યક્ષેત્રમાં રહેતો કોઈપણ ખેડૂત અથવા ગ્રામીણ નાગરિક.\n` +
          `• **દસ્તાવેજો:** આધાર કાર્ડ, ૭/૧૨ અને ૮-અ ઉતારા, ૨ ફોટા અને બેંક પાસબુક.\n\n` +
          `**પગલું ૨: સભ્યપદ ફોર્મ મેળવો**\n` +
          `• ગામની પેક્સ મંડળીના મંત્રી પાસેથી સભ્યપદ અરજી ફોર્મ મેળવો.\n\n` +
          `**પગલું ૩: લઘુત્તમ શેર મૂડી જમા કરો**\n` +
          `• મંડળીના નિયમો અનુસાર ઓછામાં ઓછો ૧ શેર (₹૧૦૦ થી ₹૫૦૦) અને પ્રવેશ ફી ભરીને પહોંચ મેળવો.\n\n` +
          `**પગલું ૪: ૩૦ દિવસમાં સત્તાવાર મંજૂરી**\n` +
          `• આદર્શ પેટા-નિયમો હેઠળ અરજી કર્યાના **૩૦ દિવસની અંદર** કારોબારી સમિતિએ મંજૂરી આપવી ફરજિયાત છે.\n\n` +
          `**પગલું ૫: સભ્ય પાસબુક મેળવો અને ૨૫+ સેવાઓનો લાભ લો**\n` +
          `• સભ્ય બન્યા પછી ૪% વ્યાજે KCC પાક ધિરાણ, ખાતર-બિયારણ, સસ્તા ભાવે દવાઓ અને ટ્રેક્ટર-ડ્રોન ભાડે મેળવી શકાય છે.\n\n` +
          `🏛️ *સત્તાવાર પોર્ટલ: cooperation.gov.in/model-bye-laws*`;
      } else {
        return `**Step-by-Step Guide: How to Apply for PACS Membership & Citizen Services**\n\n` +
          `**Step 1: Check Eligibility & Prepare KYC Documents**\n` +
          `• **Eligibility:** Any cultivator, agricultural worker, or rural resident residing within the operational area of the PACS.\n` +
          `• **Required Documents:** Aadhaar Card, Land Record (7/12 or Khatauni), 2 Passport Photos, and Active Bank Passbook.\n\n` +
          `**Step 2: Collect Membership Application Form (Form 1)**\n` +
          `• Collect Form 1 from the PACS Secretary or download it from the National Cooperation Portal (**cooperation.gov.in**).\n\n` +
          `**Step 3: Remit Share Capital & Entrance Fee**\n` +
          `• Purchase minimum share capital (typically ₹100 to ₹500) and pay a nominal entrance fee (₹10 to ₹50) against an official signed receipt.\n\n` +
          `**Step 4: Managing Committee Resolution (30-Day Statutory SLA)**\n` +
          `• Under Clause 6 of the Model Bye-Laws, the Managing Committee must decide on the membership within **30 days** of application.\n\n` +
          `**Step 5: Receive Membership Number & Access 25+ Multipurpose Services**\n` +
          `• Once enrolled, your member passbook is issued, granting direct access to subsidized fertilizers, KCC zero-interest crop credit, generic medicines at Jan Aushadhi Kendras, and tractor/drone rental services.\n\n` +
          `🏛️ *Official Portal: cooperation.gov.in/model-bye-laws*`;
      }
    }

    // 3. Kisan Credit Card (KCC) 4% Loan Application
    if (primaryId.includes('KCC') || primaryId.includes('CREDIT') || /kcc|loan|credit|कर्ज|ऋण|ધિરાણ/i.test(query)) {
      if (language === 'mr') {
        return `**पायरी-दर-पायरी मार्गदर्शक: किसान क्रेडिट कार्ड (KCC) ४% कर्जासाठी अर्ज कसा करावा**\n\n` +
          `**पायरी १: पात्रता व जमिनीची कागदपत्रे तपासा**\n` +
          `• **पात्रता:** वैयक्तिक/संयुक्त शेतकरी, कुळ शेतकरी आणि पॅक्सचे सर्व पात्र सभासद.\n` +
          `• **कागदपत्रे:** आधार कार्ड, पॅन कार्ड, चालू ७/१२ आणि ८-अ उतारा, आणि बँकेचे थकबाकी नसलेले प्रमाणपत्र (No-Dues Certificate).\n\n` +
          `**पायरी २: १ पानाचा सुटसुटीत KCC अर्ज भरा**\n` +
          `• गावातील प्राथमिक कृषी पतसंस्था (PACS), जिल्हा मध्यवर्ती सहकारी बँक (DCCB) किंवा राष्ट्रीयीकृत बँकेतून १ पानाचा KCC अर्ज घ्या.\n\n` +
          `**पायरी ३: विनातारण कर्ज मंजुरी (₹१.६० लाख ते ₹२.०० लाख)**\n` +
          `• ₹१.६० लाखांपर्यंतच्या कर्जासाठी कोणतीही जमीन गहाण ठेवण्याची गरज नाही (संगणकीकृत पॅक्समध्ये ₹२.०० लाखांपर्यंत विनातारण).\n\n` +
          `**पायरी ४: १४ दिवसांच्या आत कर्ज वितरण**\n` +
          `• आरबीआय नियमांनुसार अर्ज सादर केल्यापासून **१४ दिवसांच्या आत** कर्ज खात्यात मंजूर करणे बंधनकारक आहे.\n\n` +
          `**पायरी ५: RuPay KCC कार्ड व ४% व्याज सवलत (PRI)**\n` +
          `• वेळेवर परतफेड केल्यास ३% अतिरिक्त सवलत मिळून निव्वळ व्याजदर फक्त **४% प्रतिवर्ष** लागतो. RuPay कार्डद्वारे एटीएम किंवा खत खरेदीसाठी त्वरित पैसे काढता येतात.\n\n` +
          `🏛️ *अधिकृत माहिती: nabard.org*`;
      } else if (language === 'hi') {
        return `**चरण-दर-चरण मार्गदर्शिका: किसान क्रेडिट कार्ड (KCC) ४% ऋण हेतु आवेदन कैसे करें**\n\n` +
          `**चरण १: पात्रता एवं आवश्यक दस्तावेज**\n` +
          `• **पात्रता:** भूमिधारक किसान, बटाईदार व पैक्स समिति के सदस्य।\n` +
          `• **दस्तावेज:** आधार कार्ड, नवीनतम खतौनी/भू-अभिलेख, बैंक खाता विवरण एवं नो-ड्यूज शपथ पत्र।\n\n` +
          `**चरण २: १-पृष्ठीय सरल KCC फॉर्म भरें**\n` +
          `• निकटतम पैक्स (PACS) समिति, जिला सहकारी बैंक अथवा सरकारी बैंक शाखा से १-पृष्ठ का सरल फॉर्म प्राप्त कर भरें।\n\n` +
          `**चरण ३: बिना बंधक ऋण सीमा (₹1.60 लाख तक)**\n` +
          `• ₹1.60 लाख तक के ऋण हेतु कोई जमीन बंधक रखने की आवश्यकता नहीं है (कम्प्यूटरीकृत पैक्स में ₹2.00 लाख तक)।\n\n` +
          `**चरण ४: १४ कार्यदिवसों में ऋण स्वीकृति**\n` +
          `• सरकारी दिशा-निर्देशों के अनुसार पूर्ण आवेदन जमा करने के **१४ दिनों के भीतर** केसीसी कार्ड जारी किया जाता है।\n\n` +
          `**चरण ५: RuPay कार्ड एवं ४% रियायती ब्याज दर**\n` +
          `• समय पर अदायगी करने पर ३% त्वरित पुनर्भुगतान प्रोत्साहन (PRI) प्राप्त होता है, जिससे प्रभावी ब्याज दर मात्र **४% वार्षिक** रह जाती है।\n\n` +
          `🏛️ *आधिकारिक स्रोत: nabard.org*`;
      } else if (language === 'gu') {
        return `**પગલાંવાર માર્ગદર્શિકા: કિસાન ક્રેડિટ કાર્ડ (KCC) 4% ધિરાણ માટે અરજી કેવી રીતે કરવી**\n\n` +
          `**પગલું ૧: પાત્રતા અને દસ્તાવેજો**\n` +
          `• **પાત્રતા:** ખેતીની જમીન ધરાવતા તમામ ખેડૂતો અને પેક્સના સભ્યો.\n` +
          `• **દસ્તાવેજો:** આધાર કાર્ડ, ૭/૧૨ અને ૮-અ ઉતારા, પાક વાવણી વિગત અને બેંક પાસબુક.\n\n` +
          `**પગલું ૨: ૧ પાનાનું સરળ KCC ફોર્મ ભરો**\n` +
          `• સ્થાનિક પેક્સ અથવા સહકારી બેંકમાંથી ૧ પાનાનું ફોર્મ મેળવીને ભરો.\n\n` +
          `**પગલું ૩: જમીન ગીરો રાખ્યા વગર ધિરાણ (₹1.60 લાખ સુધી)**\n` +
          `• ₹1.60 લાખ સુધીના ધિરાણ માટે કોઈ પણ જમીન ગીરો રાખવાની જરૂર નથી.\n\n` +
          `**પગલું ૪: ૧૪ દિવસમાં ધિરાણ મંજૂરી**\n` +
          `• સરકારી નિયમ મુજબ અરજી કર્યાના **૧૪ દિવસમાં** ધિરાણ મંજૂર કરવું ફરજિયાત છે.\n\n` +
          `**પગલું ૫: RuPay કાર્ડ અને 4% વાર્ષિક વ્યાજ દર**\n` +
          `• સમયસર ભરપાઈ કરવાથી ૩% વ્યાજ સહાય મળીને ચોખ્ખું વ્યાજ માત્ર **૪% વાર્ષિક** રહે છે.\n\n` +
          `🏛️ *સત્તાવાર પોર્ટલ: nabard.org*`;
      } else {
        return `**Step-by-Step Guide: How to Apply for Kisan Credit Card (KCC) at 4% Interest**\n\n` +
          `**Step 1: Check Eligibility & Prepare Necessary Documents**\n` +
          `• **Eligibility:** All owner-cultivators, tenant farmers, sharecroppers, and members of Primary Agricultural Credit Societies (PACS).\n` +
          `• **Required Documents:** Aadhaar Card, PAN Card, Updated Land Records (7/12 & 8-A / Khatauni), and a simple No-Dues Declaration.\n\n` +
          `**Step 2: Collect & Complete the Simplified 1-Page KCC Form**\n` +
          `• Obtain the standard 1-page application form from your village PACS, District Central Cooperative Bank (DCCB), or nearest Commercial Bank branch.\n\n` +
          `**Step 3: Collateral-Free Sanction up to ₹1.60 Lakh**\n` +
          `• Loans up to ₹1.60 Lakh (extended to ₹2.00 Lakh in computerized PACS) require **zero mortgage or land collateral**.\n\n` +
          `**Step 4: Statutory 14-Day Processing Window**\n` +
          `• Under Central Government norms, the bank/PACS must process and sanction eligible KCC applications within **14 working days**.\n\n` +
          `**Step 5: Card Issuance & 4% Subsidized Annual Interest**\n` +
          `• You receive an activated RuPay Kisan Card. When repaid on time, a **3.0% Prompt Repayment Incentive (PRI)** reduces the net interest rate to just **4.0% per annum**.\n\n` +
          `🏛️ *Official Portal: nabard.org*`;
      }
    }

    // 4. Grievance / Ombudsman Complaint (MSCS Act Section 85A, Form VI)
    if (primaryId.includes('MSCS-SEC85') || /grievance|complaint|ombudsman|तक्रार|शिकायत|लोकपाल|ફરિયાદ/i.test(query)) {
      if (language === 'mr') {
        return `**पायरी-दर-पायरी मार्गदर्शक: सहकार लोकपालकडे (Ombudsman) अधिकृत तक्रार कशी करावी**\n\n` +
          `**पायरी १: संस्थेला प्रथम लेखी नोटीस द्या**\n` +
          `• प्रथम संबंधित सहकारी संस्थेकडे लेखी तक्रार नोंदवा आणि ३० दिवस वाट पाहा.\n\n` +
          `**पायरी २: अधिकृत तक्रार अर्ज (Form VI) डाऊनलोड करा**\n` +
          `• सहकार निबंधक पोर्टलवरून (**crcs.gov.in/ombudsman-portal**) विहित 'प्रपत्र ६' (Form VI) डाऊनलोड करा.\n\n` +
          `**पायरी ३: पुरावे व कागदपत्रे जोडा**\n` +
          `• सभासदत्वाचा पुरावा, संस्थेकडे जमा केलेल्या ठेवींची पावती किंवा मतदान हक्क नाकारल्याचा पुरावा जोडा.\n\n` +
          `**पायरी ४: ऑनलाइन किंवा प्रत्यक्ष सादर करा**\n` +
          `• पोर्टलवर ऑनलाइन तक्रार दाखल करा किंवा प्रादेशिक सहकार लोकपाल कार्यालयात प्रत्यक्ष जमा करा.\n\n` +
          `**पायरी ५: ३० दिवसांत निकाल व ट्रॅकिंग आयडी**\n` +
          `• तक्रार दाखल झाल्यावर युनिक ट्रॅकिंग नंबर मिळतो. लोकपालांना कायद्याने **३० दिवसांच्या आत** सुनावणी घेऊन निकाल देणे बंधनकारक आहे.\n\n` +
          `🌐 *अधिकृत तक्रार पोर्टल: crcs.gov.in/ombudsman-portal*`;
      } else if (language === 'hi') {
        return `**चरण-दर-चरण मार्गदर्शिका: सहकार लोकपाल (Ombudsman) के पास शिकायत कैसे दर्ज करें**\n\n` +
          `**चरण १: समिति को प्रथम लिखित सूचना दें**\n` +
          `• पहले अपनी सहकारी समिति को लिखित शिकायत दें। यदि ३० दिनों में समाधान न हो, तो लोकपाल के पास जाएं।\n\n` +
          `**चरण २: निर्धारित प्रपत्र ६ (Form VI) प्राप्त करें**\n` +
          `• केंद्रीय पंजीयक पोर्टल (**crcs.gov.in/ombudsman-portal**) से अधिकृत 'प्रपत्र VI' डाउनलोड करें।\n\n` +
          `**चरण ३: आवश्यक साक्ष्य संलग्न करें**\n` +
          `• सदस्यता प्रमाण, जमा रसीद, अथवा मतदान अधिकार से वंचित किए जाने का लिखित प्रमाण साथ लगाएं।\n\n` +
          `**चरण ४: ऑनलाइन अथवा डाक द्वारा आवेदन प्रेषित करें**\n` +
          `• ऑनलाइन पोर्टल पर शिकायत अपलोड करें अथवा क्षेत्रीय सहकार लोकपाल कार्यालय में जमा करें।\n\n` +
          `**चरण ५: ३० दिनों में अनिवार्य निस्तारण**\n` +
          `• शिकायत संख्या (Tracking ID) प्राप्त होती है। कानूनन **३० दिनों के भीतर** लोकपाल द्वारा जांच व अंतिम आदेश पारित किया जाता है।\n\n` +
          `🌐 *शिकायत पोर्टल: crcs.gov.in/ombudsman-portal*`;
      } else if (language === 'gu') {
        return `**પગલાંવાર માર્ગદર્શિકા: સહકારી લોકપાલ સમક્ષ ફરિયાદ કેવી રીતે નોંધાવવી**\n\n` +
          `**પગલું ૧: મંડળીને લેખિત નોટિસ આપો**\n` +
          `• પ્રથમ મંડળી સમક્ષ લેખિત ફરિયાદ રજૂ કરો અને ૩૦ દિવસ રાહ જુઓ.\n\n` +
          `**પગલું ૨: નિયત ફોર્મ VI (Form VI) ડાઉનલોડ કરો**\n` +
          `• સત્તાવાર પોર્ટલ **crcs.gov.in/ombudsman-portal** પરથી 'ફોર્મ VI' ડાઉનલોડ કરો.\n\n` +
          `**પગલું ૩: પુરાવા અને દસ્તાવેજો જોડો**\n` +
          `• સભ્યપદની પહોંચ, થાપણ રસીદ અથવા અન્યાયી રીતે નામ રદ કર્યાનો પુરાવો જોડો.\n\n` +
          `**પગલું ૪: ઓનલાઇન કે રૂબરૂ ફરિયાદ જમા કરો**\n` +
          `• પોર્ટલ પર સીધી ઓનલાઇન ફરિયાદ નોંધાવો અથવા સહકારી લોકપાલની કચેરીમાં સબમિટ કરો.\n\n` +
          `**પગલું ૫: ૩૦ દિવસમાં ફરિયાદનો નિકાલ**\n` +
          `• ટ્રેકિંગ નંબર પ્રાપ્ત થાય છે અને કાયદા મુજબ **૩૦ દિવસમાં** લોકપાલ દ્વારા નિકાલ કરવામાં આવે છે.\n\n` +
          `🌐 *પોર્ટલ: crcs.gov.in/ombudsman-portal*`;
      } else {
        return `**Step-by-Step Guide: How to File a Statutory Grievance with the Cooperative Ombudsman**\n\n` +
          `**Step 1: Serve Initial Representation to the Society**\n` +
          `• First serve a formal written complaint to the managing committee or secretary of your cooperative society. Allow 30 days for internal redressal.\n\n` +
          `**Step 2: Download Statutory Form VI**\n` +
          `• Download official **Form VI** (Complaint to Co-operative Ombudsman) from the Central Registrar website (**crcs.gov.in/ombudsman-portal**).\n\n` +
          `**Step 3: Collate Supporting Documentary Evidence**\n` +
          `• Attach copy of society membership proof, deposit/share receipts, written communication with the society, and specific violation details under the MSCS Act 2023.\n\n` +
          `**Step 4: Submit Online or via Registered Post**\n` +
          `• File the complaint directly via the National Ombudsman Digital Portal or submit signed physical sets to your Territorial Co-operative Ombudsman.\n\n` +
          `**Step 5: Track Case & Receive Order within 30 Days**\n` +
          `• Note your unique Grievance Tracking ID. Under Section 85 of the MSCS Act 2023, the Ombudsman is legally mandated to complete investigation and issue binding directives within **30 days**.\n\n` +
          `🌐 *National Portal: crcs.gov.in/ombudsman-portal*`;
      }
    }

    // 5. If matched chunk has rich schemeData from 93+ schemes catalog
    if (primary.schemeData) {
      return this.synthesizeSchemeApplication(primary.schemeData, language);
    }

    // 6. General Scheme / Registration Procedure Fallback
    if (language === 'mr') {
      return `**पायरी-दर-पायरी मार्गदर्शक: सहकारी योजना व सेवांसाठी अर्ज प्रक्रिया**\n\n` +
        `**पायरी १: अधिकृत पात्रता व नियमावली तपासा**\n` +
        `• योजनेच्या निकषानुसार आवश्यक पात्रता व विहित कागदपत्रे (आधार, ७/१२, बँक पासबुक) तयार ठेवा.\n\n` +
        `**पायरी २: अर्ज केंद्र किंवा पोर्टल निवडा**\n` +
        `• गावातील **प्राथमिक कृषी पतसंस्था (PACS)**, CSC केंद्र किंवा अधिकृत शासकीय पोर्टलवर जा.\n\n` +
        `**पायरी ३: अचूक माहितीसह अर्ज भरा**\n` +
        `• विहित नमुन्यातील अर्ज भरून सर्व सत्यप्रत कागदपत्रे जोडा.\n\n` +
        `**पायरी ४: पोचपावती (Acknowledgment) प्राप्त करा**\n` +
        `• अर्ज जमा केल्यावर स्वाक्षरी व शिक्का असलेली पोचपावती किंवा डिजिटल ॲप्लिकेशन आयडी मिळवा.\n\n` +
        `**पायरी ५: स्थिती ट्रॅक करा व मंजुरी मिळवा**\n` +
        `• संबंधित विभागाच्या संकेतस्थळावरून किंवा हेल्पलाईनवरून अर्जाची सद्यस्थिती तपासा.\n\n` +
        `🏛️ *सहकारिता मंत्रालय अधिकृत पोर्टल: cooperation.gov.in*`;
    } else if (language === 'hi') {
      return `**चरण-दर-चरण मार्गदर्शिका: सरकारी योजना व सहकारी सेवाओं हेतु आवेदन प्रक्रिया**\n\n` +
        `**चरण १: पात्रता एवं आवश्यक दस्तावेज की जांच करें**\n` +
        `• योजना की अधिकृत शर्तों के अनुसार आधार कार्ड, भू-अभिलेख एवं बैंक खाता विवरण तैयार रखें।\n\n` +
        `**चरण २: सही आवेदन केंद्र या पोर्टल का चयन करें**\n` +
        `• अपनी स्थानीय **पैक्स (PACS)** समिति, सीएससी केंद्र अथवा आधिकारिक पोर्टल पर जाएं।\n\n` +
        `**चरण ३: आवेदन पत्र भरें एवं दस्तावेज संलग्न करें**\n` +
        `• निर्धारित प्रपत्र में संपूर्ण व्यक्तिगत व कृषि विवरण भरकर आवश्यक दस्तावेज अपलोड करें।\n\n` +
        `**चरण ४: पावती रसीद व ट्रैकिंग संख्या प्राप्त करें**\n` +
        `• आवेदन जमा कर सील व हस्ताक्षर युक्त पावती अथवा डिजिटल रसीद अवश्य प्राप्त करें।\n\n` +
        `**चरण ५: आवेदन की स्थिति ट्रैक करें**\n` +
        `• आधिकारिक पोर्टल या किसान कॉल सेंटर १८००-१८०-१५५१ के माध्यम से स्थिति जानें।\n\n` +
        `🏛️ *सहकारिता मंत्रालय आधिकारिक पोर्टल: cooperation.gov.in*`;
    } else if (language === 'gu') {
      return `**પગલાંવાર માર્ગદર્શિકા: સહકારી યોજનાઓ માટે અરજી કરવાની સામાન્ય પ્રક્રિયા**\n\n` +
        `**પગલું ૧: પાત્રતા ચકાસો અને દસ્તાવેજો તૈયાર કરો**\n` +
        `• આધાર કાર્ડ, જમીન ૭/૧૨ ના ઉતારા અને બેંક પાસબુક તૈયાર રાખો.\n\n` +
        `**પગલું ૨: અરજી કેન્દ્ર અથવા પોર્ટલ પસંદ કરો**\n` +
        `• સ્થાનિક **પેક્સ (PACS)** મંડળી, CSC કેન્દ્ર અથવા સત્તાવાર સરકારી પોર્ટલ પર જાઓ.\n\n` +
        `**પગલું ૩: નિયત અરજી ફોર્મ ભરો**\n` +
        `• જરૂરી વિગતો ભરીને પ્રમાણિત દસ્તાવેજો અપલોડ કરો.\n\n` +
        `**પગલું ૪: પહોંચ રસીદ અને ટ્રેકિંગ નંબર મેળવો**\n` +
        `• અરજી સબમિટ કર્યા પછી સત્તાવાર પહોંચ રસીદ સાચવી રાખો.\n\n` +
        `**પગલું ૫: અરજીની સ્થિતિ ટ્રેક કરો**\n` +
        `• સત્તાવાર પોર્ટલ અથવા કિસાન હેલ્પલાઇન 1800-180-1551 દ્વારા સ્થિતિ તપાસો.\n\n` +
        `🏛️ *સત્તાવાર પોર્ટલ: cooperation.gov.in*`;
    } else {
      return `**Step-by-Step Guide: How to Apply for Cooperative Schemes & Services**\n\n` +
        `**Step 1: Check Eligibility & Prepare Required Documents**\n` +
        `• Confirm that you satisfy scheme criteria and prepare identity proof (Aadhaar), Land Records (7/12 or Khatauni), and an active DBT-linked Bank Passbook.\n\n` +
        `**Step 2: Select the Designated Application Channel**\n` +
        `• Visit your nearest **Primary Agricultural Credit Society (PACS)**, Common Service Centre (CSC), or access the respective official Government Portal.\n\n` +
        `**Step 3: Fill Out the Prescribed Application Form**\n` +
        `• Enter your personal, land, and crop/activity details accurately and upload verified documentary attachments.\n\n` +
        `**Step 4: Obtain Acknowledgment & Application Tracking ID**\n` +
        `• Submit the application and ensure you receive a stamped physical acknowledgment or digital reference number.\n\n` +
        `**Step 5: Verification, Sanction & Tracking**\n` +
        `• Track your application status online or contact the 24x7 Kisan Call Centre at 1800-180-1551 for progress updates.\n\n` +
        `🏛️ *Ministry of Cooperation Portal: cooperation.gov.in*`;
    }
  }
}

export const govLlmService = new GovLlmService();

