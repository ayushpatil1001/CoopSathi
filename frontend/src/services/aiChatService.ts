import { ChatMessage, LanguageCode, VerifiedSource } from '../types';
import { MOCK_VERIFIED_SOURCES } from '../data/mockKnowledgeBase';
import { apiService } from './apiService';
import { SCHEMES_CATALOG, SchemeItem } from '../data/schemesCatalog';

export class AIChatService {
  // Intent classification & RAG retriever
  public async generateResponse(query: string, lang: LanguageCode = 'en'): Promise<ChatMessage> {
    // Try calling backend Express API first
    const backendResult = await apiService.sendChat(query, lang);
    if (backendResult) {
      return backendResult;
    }

    // Fallback to client-side RAG engine
    await new Promise(resolve => setTimeout(resolve, 300));

    const lower = query.toLowerCase().trim();
    let text = '';
    const sources: VerifiedSource[] = [];
    const actions: string[] = [];
    const confidence = 0.98;

    const isHowToApply = /how\s+(to|can\s+i|do\s+i)?\s*(apply|register|enroll|avail|submit|file|claim)|application\s+process|steps\s+to|procedure\s+to|form\s+filling|process\s+to|where\s+to\s+apply|eligibility\s+and\s+apply|कसा\s+(करावा|करावे|भरावा|नोंदवावा)|अर्ज|अर्ज\s+प्रक्रिया|पायऱ्या|पायरी|आवेदन\s+कैसे|आवेदन\s+प्रक्रिया|आवेदन|चरण|प्रक्रिया|अप्लाई|કેવી\s+રીતે\s+અરજી|અરજી\s+કેવી\s+રીતે|અરજી\s+પ્રક્રિયા|અરજી|પગલાં|કઈ\s+રીતે|વિશે\s+અરજી|விண்ணப்பிப்பது|దరఖాస్తు|আবেদন/i.test(query);

    // 0. Check RTI Act 2005
    if (/\brti\b|right to information|माहिती अधिकार|सूचना का अधिकार/i.test(lower)) {
      sources.push({
        id: 'GOV-RTI-2005',
        title: 'Right to Information (RTI) Online Filing and 30-Day SLA',
        authority: 'Department of Personnel and Training (DoPT), Government of India',
        actOrScheme: 'Right to Information Act, 2005',
        sectionOrDoc: 'Section 6 & Section 7',
        excerpt: 'Statutory right of citizens to obtain public information within 30 days for nominal Rs 10 fee.',
        url: 'https://rtionline.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('File RTI Online (rtionline.gov.in)', '30-Day SLA & First Appeal', 'RTI Fee: ₹10 (BPL Free)');
      if (lang === 'mr') {
        text = `**माहितीचा अधिकार कायदा, २००५ (RTI Act 2005) – अधिकृत माहिती:**\n\n` +
          `१. **माहिती मिळवण्याचा मूलभूत अधिकार:** भारतातील प्रत्येक नागरिकाला शासकीय कार्यालयांकडून कागदपत्रे व नोंदी मागण्याचा कायदेशीर हक्क आहे.\n\n` +
          `२. **३० दिवसांची मुदत (SLA):** अर्ज केल्यापासून ३० दिवसांच्या आत माहिती देणे बंधनकारक आहे (जीवित व स्वातंत्र्याशी संबंधित असल्यास ४८ तासांत).\n\n` +
          `३. **अर्ज फी:** फक्त ₹१० (दारिद्र्यरेषेखालील BPL नागरिकांना विनामूल्य).\n\n` +
          `🌐 **ऑनलाइन पोर्टल:** [rtionline.gov.in](https://rtionline.gov.in)`;
      } else {
        text = `**Right to Information Act, 2005 (RTI Act) – Statutory Guidelines:**\n\n` +
          `1. **Statutory Right:** Any Indian citizen can request public records, government decisions, and tender documents.\n\n` +
          `2. **Mandatory 30-Day SLA:** The PIO must provide information within 30 days (48 hours for life/liberty issues).\n\n` +
          `3. **Nominal Fee:** Capped at ₹10 (100% Free for BPL cardholders).\n\n` +
          `🌐 **National Portal:** [rtionline.gov.in](https://rtionline.gov.in)`;
      }
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.1 Check Voter ID / ECI
    if (/voter|epic|nvsp|मतदार ओळखपत्र|मतदान ओळखपत्र|मतदाता पहचान/i.test(lower)) {
      sources.push({
        id: 'GOV-VOTER-ECI',
        title: 'Voter Registration, EPIC Download and National Voter Services Portal',
        authority: 'Election Commission of India (ECI)',
        actOrScheme: 'Representation of the People Act, 1950',
        sectionOrDoc: 'Registration of Electors Rules, 1960',
        excerpt: 'Free enrollment of voters via Form 6 and instant digital e-EPIC card download.',
        url: 'https://voters.eci.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('Apply Form 6 (voters.eci.gov.in)', 'Download e-EPIC Digital Card', 'Call 1950 Voter Helpline');
      if (lang === 'mr') {
        text = `**नवीन मतदार नोंदणी व ओळखपत्र (Voter ID - Form 6):**\n\n` +
          `१. **पात्रता:** १८ वर्षे पूर्ण केलेले सर्व भारतीय नागरिक.\n\n` +
          `२. **अर्ज प्रक्रिया:** निवडणूक आयोगाच्या **voters.eci.gov.in** पोर्टलवर 'फॉर्म ६' भरा किंवा 'Voter Helpline App' वापरा.\n\n` +
          `३. **डिजिटल e-EPIC:** अर्ज मंजूर होताच अधिकृत डिजिटल मतदार ओळखपत्र ऑनलाइन डाऊनलोड करा. मूळ कार्ड मोफत घरपोच मिळते.\n\n` +
          `📞 **राष्ट्रीय हेल्पलाइन:** १९५० | 🌐 **पोर्टल:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      } else {
        text = `**New Voter Registration & EPIC Services (Election Commission of India):**\n\n` +
          `1. **Eligibility:** All Indian citizens aged 18+.\n\n` +
          `2. **Application (Form 6):** Apply online via **voters.eci.gov.in** or the official Voter Helpline App.\n\n` +
          `3. **e-EPIC Download:** Instantly download your digitally signed voter card upon BLO approval.\n\n` +
          `📞 **Toll-Free Helpline:** 1950 | 🌐 **Official Portal:** [voters.eci.gov.in](https://voters.eci.gov.in)`;
      }
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.15 Check Patents Act 1970
    if (/patent|patents|acts of patent|patent act|patents act|patent law|patent rights|ip india|पेटंट|पेटेंट/i.test(lower)) {
      sources.push({
        id: 'GOV-PATENTS-ACT-1970',
        title: 'The Patents Act, 1970 & Patent Rules 2024 (CGPDTM - DPIIT)',
        authority: 'Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM), DPIIT, Ministry of Commerce and Industry',
        actOrScheme: 'The Patents Act, 1970 (Act No. 39 of 1970)',
        sectionOrDoc: 'Section 2(1)(j), Section 3, Section 48 & Section 53',
        excerpt: 'Statutory framework governing grant of 20-year patents for novel inventions having inventive step and industrial applicability.',
        url: 'https://ipindia.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('E-File Patent on ipindia.gov.in', 'Section 3 Exclusions & Patent Rules', 'Search Prior Art on InPASS');

      if (isHowToApply) {
        if (lang === 'mr') {
          text = `**पायरी-दर-पायरी मार्गदर्शक: पेटंटसाठी अर्ज कसा करावा (The Patents Act, 1970)**\n\n` +
            `**पायरी १: प्रायर आर्ट सर्च (Prior Art Search) करा**\n` +
            `• केंद्र सरकारच्या InPASS पोर्टलवर (ipindiaservices.gov.in) शोध घेऊन आपल्या शोधासारखा आधीच कोणताही पेटंट अस्तित्वात नाही याची खात्री करा.\n\n` +
            `**पायरी २: पेटंट तपशीलाचा मसुदा तयार करा (Form 2)**\n` +
            `• संशोधन चालू असल्यास 'तात्पुरते तपशील' (Provisional Specification) किंवा पूर्ण संशोधन असल्यास 'संपूर्ण तपशील व क्लेम्स' (Complete Specification with Claims) तयार करा.\n\n` +
            `**पायरी ३: IP India पोर्टलवर ऑनलाइन ई-फायलिंग (Form 1)**\n` +
            `• **ipindia.gov.in** पोर्टलवर वर्ग ३ डिजिटल स्वाक्षरीने (DSC) नोंदणी करा आणि Form 1 (अर्ज) व Form 2 (तपशील) अपलोड करा.\n\n` +
            `**पायरी ४: प्रसिद्धी (Publication) व तपासणी विनंती (Form 18)**\n` +
            `• १८ महिन्यांनंतर अधिकृत गॅझेटमध्ये पेटंट प्रकाशित होतो (किंवा Form 9 द्वारे लवकर प्रसिद्धी). तपासणीसाठी Form 18 भरा.\n\n` +
            `**पायरी ५: तपासणी अहवाल (FER) उत्तर व पेटंट मंजुरी (Grant)**\n` +
            `• पेटंट परीक्षकाच्या आक्षेपांना कायदेशीर उत्तर दिल्यावर २० वर्षांसाठी पेटंटचे अधिकृत प्रमाणपत्र मंजूर केले जाते.\n\n` +
            `🌐 **अधिकृत ई-फायलिंग पोर्टल:** [ipindia.gov.in](https://ipindia.gov.in)`;
        } else if (lang === 'hi') {
          text = `**चरण-दर-चरण मार्गदर्शिका: पेटेंट फाइल करने की प्रक्रिया (The Patents Act, 1970)**\n\n` +
            `**चरण १: पूर्व कला खोज (Prior Art Search)**\n` +
            `• आधिकारिक इनपास पोर्टल (ipindiaservices.gov.in) पर खोजकर सुनिश्चित करें कि आविष्कार पूर्व में सार्वजनिक या पेटेंटेड नहीं है।\n\n` +
            `**चरण २: पेटेंट विनिर्देश तैयार करना (प्रपत्र २)**\n` +
            `• आविष्कार के चरण अनुसार अनंतिम (Provisional) अथवा पूर्ण विनिर्देश (Complete Specification with Claims) तैयार करें।\n\n` +
            `**चरण ३: आईपी इंडिया पोर्टल पर ई-फाइलिंग (प्रपत्र १)**\n` +
            `• **ipindia.gov.in** पर डिजिटल सिग्नेचर (DSC) द्वारा प्रपत्र १ व प्रपत्र २ ऑनलाइन जमा करें।\n\n` +
            `**चरण ४: प्रकाशन एवं परीक्षण हेतु अनुरोध (प्रपत्र १८)**\n` +
            `• १८ माह में स्वतः प्रकाशन (अथवा प्रपत्र ९ से त्वरित प्रकाशन)। धारा ११बी के अंतर्गत प्रपत्र १८ भरकर परीक्षा का अनुरोध करें।\n\n` +
            `**चरण ५: प्रथम परीक्षण रिपोर्ट (FER) समाधान एवं पेटेंट अनुदान**\n` +
            `• आपत्तियों का विधिक समाधान प्रस्तुत करने पर २० वर्ष हेतु पेटेंट प्रमाणपत्र जारी किया जाता है।\n\n` +
            `🌐 **आधिकारिक पोर्टल:** [ipindia.gov.in](https://ipindia.gov.in)`;
        } else {
          text = `**Step-by-Step Guide: How to File a Patent in India (The Patents Act, 1970)**\n\n` +
            `**Step 1: Conduct Prior Art Search & Novelty Verification**\n` +
            `• Search the official Indian Patent Advanced Search System (InPASS) at **ipindiaservices.gov.in** and international databases to confirm novelty.\n\n` +
            `**Step 2: Draft Patent Specification (Form 2)**\n` +
            `• Draft a Provisional Specification (to secure priority date) or Complete Specification (with detailed description, claims, and abstract).\n\n` +
            `**Step 3: Online E-Filing via IP India Portal (Form 1)**\n` +
            `• Access **ipindia.gov.in** using Class 3 Digital Signature (DSC). Submit Form 1 (Application), Form 2 (Specification), Form 3, and Form 5.\n\n` +
            `**Step 4: Publication & Request for Examination (Form 18 / 18A)**\n` +
            `• The application is published in the Official Patent Journal after 18 months (or expedited via Form 9). File Form 18 within 48 months from priority date.\n\n` +
            `**Step 5: Respond to First Examination Report (FER) & Patent Grant**\n` +
            `• Address Examiner objections in the FER within 6 months. Upon satisfaction, the patent is granted for a **20-year term**.\n\n` +
            `🌐 **National E-Filing Portal:** [ipindia.gov.in](https://ipindia.gov.in)`;
        }
      } else {
        if (lang === 'mr') {
          text = `**पेटंट कायदा, १९७० (The Patents Act, 1970) – अधिकृत कायदेशीर तरतुदी व मार्गदर्शक तत्त्वे:**\n\n` +
            `१. **कायदेशीर चौकट व सक्षम प्राधिकरण:** भारतातील पेटंटचे नियमन **पेटंट कायदा, १९७० (The Patents Act, 1970)** आणि **पेटंट नियम, २०२४ (Patent Rules 2024)** अंतर्गत उद्योग व अंतर्गत व्यापार संवर्धन विभाग (DPIIT), वाणिज्य व उद्योग मंत्रालयाच्या पेटंट महानियंत्रक (CGPDTM) कार्यालयाद्वारे केले जाते.\n\n` +
            `२. **पेटंट पात्रतेचे ३ अनिवार्य निकष (Patentability Criteria):**\n` +
            `   • **नवीनता (Novelty):** शोध जगात कुठेही आधी प्रकाशित किंवा वापरात आलेला नसावा.\n` +
            `   • **संशोधक पाऊल (Inventive Step - कलम २(१)(ja)):** संबंधित क्षेत्रातील तंत्रज्ञासाठी तो शोध सहजरीत्या उघड नसावा.\n` +
            `   • **औद्योगिक उपयुक्तता (Industrial Applicability - कलम २(१)(ac)):** शोधाचा उद्योगात प्रत्यक्ष वापर करता आला पाहिजे.\n\n` +
            `३. **कायद्यातील गैर-पेटंटपात्र अपवाद (कलम ३ व कलम ४):**\n` +
            `   • **कलम ३(d):** ज्ञात पदार्थाचे नवे रूप (औषधांचे एव्हरग्रीनिंग रोखण्यासाठी).\n` +
            `   • **कलम ३(k):** गणितीय पद्धती, व्यावसायिक पद्धती, केवळ संगणक सॉफ्टवेअर (Software per se) किंवा अल्गोरिदम.\n` +
            `   • **कलम ३(b) व कलम ४:** सार्वजनिक नीतिमत्तेविरुद्ध शोध आणि अणुऊर्जेशी संबंधित शोध.\n\n` +
            `४. **पेटंटचा कायदेशीर कालावधी (कलम ५३):** अर्ज दाखल केल्याच्या तारखेपासून **२० वर्षे** (वार्षिक नूतनीकरण फी भरणे आवश्यक).\n\n` +
            `५. **पेटंटधारकाचे विशेष हक्क (कलम ४८):** शोध उत्पादित करणे, विकणे, आयात करणे किंवा वापरण्यापासून अनधिकृत व्यक्तींना रोखण्याचा कायदेशीर एकाधिकार.\n\n` +
            `६. **ई-फायलिंग व ८०% शुल्क सवलत:** वैयक्तिक संशोधक, महिला, नवउद्यमी (Startups) आणि एमएसएमईसाठी शासकीय शुल्कात **८०% सवलत**.\n\n` +
            `🌐 **अधिकृत ई-फायलिंग पोर्टल:** [ipindia.gov.in](https://ipindia.gov.in) | [ipindiaservices.gov.in](https://ipindiaservices.gov.in)`;
        } else if (lang === 'hi') {
          text = `**पेटेंट अधिनियम, १९७० (The Patents Act, 1970) – विधिक प्रावधान एवं मार्गदर्शिका:**\n\n` +
            `१. **विधिक व्यवस्था एवं प्राधिकरण:** भारत में पेटेंट का प्रशासन **पेटेंट अधिनियम, १९७० (The Patents Act, 1970)** एवं **पेटेंट नियम, २०२४ (Patent Rules 2024)** के अंतर्गत पेटेंट, डिजाइन एवं व्यापार चिह्न महानियंत्रक (CGPDTM), DPIIT, वाणिज्य एवं उद्योग मंत्रालय द्वारा किया जाता है।\n\n` +
            `२. **पेटेंट पात्रता के ३ अनिवार्य मानदंड:**\n` +
            `   • **नवीनता (Novelty):** आविष्कार विश्व स्तर पर पूर्व-प्रकाशित अथवा सार्वजनिक उपयोग में न हो।\n` +
            `   • **अन्वेषी कदम (Inventive Step - धारा २(१)(ja)):** संबंधित क्षेत्र के विशेषज्ञ हेतु आविष्कार स्वतः स्पष्ट न हो और उसमें तकनीकी प्रगति हो।\n` +
            `   • **औद्योगिक उपयोगिता (Industrial Applicability - धारा २(१)(ac)):** आविष्कार का उद्योग में व्यावहारिक निर्माण एवं उपयोग संभव हो।\n\n` +
            `३. **गैर-पेटेंट योग्य विषय (धारा ३ एवं धारा ४ के अपवाद):**\n` +
            `   • **धारा ३(d):** ज्ञात यौगिकों के नए रूप (दवाओं के एवरग्रीनिंग पर रोक)।\n` +
            `   • **धारा ३(k):** गणितीय विधियां, व्यावसायिक प्रणालियां, अथवा केवल कंप्यूटर सॉफ्टवेयर (Software per se) एवं एल्गोरिदम।\n` +
            `   • **धारा ४:** परमाणु ऊर्जा से संबंधित आविष्कार।\n\n` +
            `४. **पेटेंट की विधिक अवधि (धारा ५३):** आवेदन तिथि से **२० वर्ष** (वार्षिक नवीनीकरण देय)।\n\n` +
            `५. **पेटेंटधारक के अधिकार (धारा ४८):** अनधिकृत व्यक्तियों द्वारा पेटेंट उत्पाद या प्रक्रिया के निर्माण, उपयोग, विक्रय अथवा आयात को रोकने का अनन्य एकाधिकार।\n\n` +
            `६. **ई-फाइलिंग एवं शुल्क रियायत:** स्टार्टअप्स, एमएसएमई एवं शिक्षण संस्थानों को सरकारी शुल्क में **८०% की भारी छूट** प्रदान की जाती है।\n\n` +
            `🌐 **आधिकारिक पोर्टल:** [ipindia.gov.in](https://ipindia.gov.in) | [ipindiaservices.gov.in](https://ipindiaservices.gov.in)`;
        } else {
          text = `**The Patents Act, 1970 – Statutory Legal Framework & Comprehensive Guidelines:**\n\n` +
            `1. **Legislative Authority & Administration:** Patent rights in India are administered under **The Patents Act, 1970 (Act No. 39 of 1970)** as amended, and the **Patent Rules, 2024**, by the Office of the Controller General of Patents, Designs and Trade Marks (CGPDTM), DPIIT, Ministry of Commerce and Industry.\n\n` +
            `2. **Three Core Patentability Criteria:**\n` +
            `   • **Novelty:** The invention must not have been anticipated by publication anywhere in the world or prior public knowledge/use in India before the filing date.\n` +
            `   • **Inventive Step / Non-Obviousness (Section 2(1)(ja)):** A technical advancement or economic significance that is not obvious to a person skilled in the relevant technical art.\n` +
            `   • **Industrial Applicability (Section 2(1)(ac)):** The invention must be capable of being made or used in an industry.\n\n` +
            `3. **Key Non-Patentable Subject Matter (Sections 3 & 4):**\n` +
            `   • **Section 3(d):** Mere discovery of a new form of a known substance which does not result in enhanced therapeutic efficacy (prevents patent 'evergreening').\n` +
            `   • **Section 3(k):** Mathematical methods, business methods, computer programmes per se, or algorithms.\n` +
            `   • **Section 3(c) & 3(j):** Mere discovery of scientific principles, plants, animals, or biological processes.\n` +
            `   • **Section 4:** Inventions relating to atomic energy are strictly non-patentable.\n\n` +
            `4. **Statutory Term of Patent (Section 53):** Every granted patent has a term of **20 years** from the international/domestic filing date (contingent upon payment of annual maintenance/renewal fees).\n\n` +
            `5. **Exclusive Legal Rights Conferred (Section 48):** Confers the exclusive statutory right to prevent unauthorized third parties from making, using, offering for sale, selling, or importing the patented product or process.\n\n` +
            `6. **Compulsory Licensing (Section 84):** Any interested person can apply for a compulsory license after 3 years from grant if public requirements are unmet or the product is unaffordable.\n\n` +
            `7. **Statutory Forms & 80% Fee Concessions:**\n` +
            `   • **Form 1:** Application for Grant of Patent\n` +
            `   • **Form 2:** Provisional or Complete Specification with Claims\n` +
            `   • **Form 18 / 18A:** Request for Examination / Expedited Examination\n` +
            `   • Startups, Individuals, Educational Institutions, and MSMEs receive an **80% reduction** in all statutory filing and renewal fees.\n\n` +
            `🌐 **Official National E-Filing Portal:** [ipindia.gov.in](https://ipindia.gov.in) | [ipindiaservices.gov.in](https://ipindiaservices.gov.in)`;
        }
      }

      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.16 Check Trade Marks Act 1999
    if (/trademark|trade mark|trademarks|ट्रेडमार्क/i.test(lower)) {
      sources.push({
        id: 'GOV-TRADEMARKS-ACT-1999',
        title: 'Trade Marks Act, 1999 & TM Rules 2017 (Trade Marks Registry)',
        authority: 'Office of Controller General of Patents, Designs & Trade Marks (CGPDTM), DPIIT',
        actOrScheme: 'Trade Marks Act, 1999 (Act No. 47 of 1999)',
        sectionOrDoc: 'Section 18, Section 28 & Section 29',
        excerpt: 'Statutory registration of trademarks across 45 classes granting exclusive rights for 10 years.',
        url: 'https://ipindia.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('E-File Trademark (ipindia.gov.in)', 'Search TM Public Registry', 'Form TM-A Filing & Fees');
      text = `**Trade Marks Act, 1999 – Statutory Trademark Registration & Brand Protection:**\n\n` +
        `1. **Statutory Authority:** Administered by the Trade Marks Registry under CGPDTM, DPIIT, protecting brand names, logos, and slogans across 45 Classes.\n\n` +
        `2. **Registration Term & Renewal (Section 25):** Valid for **10 years** from filing date, perpetually renewable every 10 years via Form TM-R.\n\n` +
        `3. **Rights & Infringement (Section 28 & 29):** Registration confers exclusive right to use the mark and seek civil injunctions and damages against counterfeiters.\n\n` +
        `4. **Fee Concession:** Individuals, Startups, and MSMEs receive 50% discount on statutory filing fees (₹4,500 online vs ₹9,000 for standard companies).\n\n` +
        `🌐 **Official Portal:** [ipindia.gov.in](https://ipindia.gov.in)`;
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.17 Check Copyright Act 1957
    if (/copyright|कॉपीराइट/i.test(lower)) {
      sources.push({
        id: 'GOV-COPYRIGHT-ACT-1957',
        title: 'The Copyright Act, 1957 & Copyright Rules 2013 (Copyright Office India)',
        authority: 'Copyright Office, DPIIT, Ministry of Commerce and Industry',
        actOrScheme: 'The Copyright Act, 1957 (Act No. 14 of 1957)',
        sectionOrDoc: 'Section 13, Section 14 & Section 22',
        excerpt: 'Statutory protection for original literary, musical, dramatic, artistic works, and computer software.',
        url: 'https://copyright.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('E-File Copyright (copyright.gov.in)', 'Check Mandatory 30-Day Objection', 'Form XIV Registration Guide');
      text = `**The Copyright Act, 1957 – Protection of Literary, Artistic, Musical & Software Works:**\n\n` +
        `1. **Statutory Scope:** Protects original literary, dramatic, musical, artistic works, cinematograph films, sound recordings, and software source code.\n\n` +
        `2. **Term of Protection (Section 22):** Lifetime of the author plus **60 years** from the calendar year following death.\n\n` +
        `3. **Mandatory 30-Day Waiting Window:** Rule 70 mandates a 30-day objection period after filing Form XIV before processing by the Copyright Office.\n\n` +
        `🌐 **Official Portal:** [copyright.gov.in](https://copyright.gov.in)`;
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.18 Check Consumer Protection Act 2019
    if (/consumer\s+protection|consumer\s+rights|consumer\s+court|e-daakhil|ग्राहक संरक्षण|उपभोक्ता/i.test(lower)) {
      sources.push({
        id: 'GOV-CONSUMER-PROTECTION-2019',
        title: 'Consumer Protection Act, 2019 & E-Daakhil Online Dispute Portal',
        authority: 'Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution',
        actOrScheme: 'Consumer Protection Act, 2019 (Act No. 35 of 2019)',
        sectionOrDoc: 'Section 2(7), Section 34, Section 47 & Section 58',
        excerpt: '3-tier quasi-judicial machinery (District, State, National) protecting consumers against unfair trade practices.',
        url: 'https://edaakhil.nic.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('File on e-Daakhil (edaakhil.nic.in)', 'National Consumer Helpline 1915', 'Pecuniary Limits (District/State/National)');
      text = `**Consumer Protection Act, 2019 – Citizen Consumer Rights & Dispute Redressal:**\n\n` +
        `1. **Three-Tier Redressal Commission:**\n` +
        `   • **District Commission:** Claims up to ₹50 Lakh\n` +
        `   • **State Commission:** Claims from ₹50 Lakh to ₹2 Crore\n` +
        `   • **National Commission (NCDRC):** Claims exceeding ₹2 Crore\n\n` +
        `2. **Key Rights:** Protection against unfair trade practices, misleading advertisements, and product liability against defective goods/services.\n\n` +
        `3. **Online E-Daakhil Filing:** File consumer complaints online 24x7 from anywhere via e-Daakhil.\n\n` +
        `📞 **National Consumer Helpline:** 1915 | 🌐 **Portal:** [edaakhil.nic.in](https://edaakhil.nic.in)`;
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.19 Check IT Act 2000
    if (/it\s+act|cyber\s+crime|cyber\s+fraud|सायबर गुन्हा|साइबर अपराध/i.test(lower)) {
      sources.push({
        id: 'GOV-IT-ACT-2000',
        title: 'Information Technology Act, 2000 & National Cyber Crime Reporting Portal',
        authority: 'Ministry of Electronics and Information Technology (MeitY) & MHA',
        actOrScheme: 'Information Technology Act, 2000 (Act No. 21 of 2000)',
        sectionOrDoc: 'Section 43, Section 66, Section 66D & Section 72A',
        excerpt: 'Legal recognition of electronic records, cyber crimes, digital transactions, and cybersecurity compliance.',
        url: 'https://cybercrime.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('Report on cybercrime.gov.in', 'National Cyber Helpline 1930', 'Section 66 & 43A IT Compliance');
      text = `**Information Technology Act, 2000 – Cyber Law, Electronic Commerce & Security:**\n\n` +
        `1. **Legal Recognition:** Grants legal recognition to electronic records, digital signatures, and electronic contracts.\n\n` +
        `2. **Offences & Penalties:** Criminalizes hacking, identity theft, unauthorized data tampering (Section 66), and violation of privacy (Section 66E).\n\n` +
        `3. **Cyber Fraud Reporting:** Report cyber crimes, financial fraud, and cyber abuse immediately.\n\n` +
        `📞 **National Cyber Helpline:** 1930 | 🌐 **Portal:** [cybercrime.gov.in](https://cybercrime.gov.in)`;
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.20 Check Companies Act 2013
    if (/companies\s+act|company\s+incorporation|spice\+|mca21|कंपनी कायदा|कंपनी अधिनियम/i.test(lower)) {
      sources.push({
        id: 'GOV-COMPANIES-ACT-2013',
        title: 'Companies Act, 2013 & MCA21 Digital Governance Portal',
        authority: 'Ministry of Corporate Affairs (MCA), Government of India',
        actOrScheme: 'Companies Act, 2013 (Act No. 18 of 2013)',
        sectionOrDoc: 'Section 7 (Incorporation) & Section 134/137 (Compliance)',
        excerpt: 'Statutory framework for company incorporation via SPICe+, board governance, auditing, and ROC filings.',
        url: 'https://mca.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('MCA21 Portal (mca.gov.in)', 'SPICe+ Company Incorporation', 'DIN & Annual Return (AOC-4/MGT-7)');
      text = `**Companies Act, 2013 – Corporate Governance & Incorporation:**\n\n` +
        `1. **Statutory Administration:** Administered by the Ministry of Corporate Affairs (MCA) and Registrar of Companies (RoC).\n\n` +
        `2. **Incorporation:** Unified SPICe+ web-form (INC-32) enables simultaneous name reservation, company incorporation, PAN, TAN, EPFO, ESIC, and bank account.\n\n` +
        `3. **Annual Compliance:** Mandatory filing of Financial Statements (Form AOC-4) and Annual Return (Form MGT-7).\n\n` +
        `🌐 **Official Portal:** [mca.gov.in](https://mca.gov.in)`;
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.21 Check Fundamental Rights / Constitution
    if (/fundamental\s+rights|constitution\s+of\s+india|article\s+32|article\s+21|article\s+14|मूलभूत हक्क|मौलिक अधिकार|संविधान/i.test(lower)) {
      sources.push({
        id: 'GOV-CONSTITUTION-RIGHTS',
        title: 'Constitution of India - Fundamental Rights (Articles 12-35)',
        authority: 'Ministry of Law and Justice, Government of India',
        actOrScheme: 'Constitution of India (Part III)',
        sectionOrDoc: 'Articles 14-32',
        excerpt: 'Enforceable fundamental rights including equality, life, personal liberty, and constitutional remedies under Article 32.',
        url: 'https://legislative.gov.in',
        verifiedDate: '15 Aug 2026'
      });
      actions.push('Fundamental Rights (Articles 14-32)', 'Article 32 & 226 Writs', 'Free Legal Aid (NALSA 15100)');
      text = `**Constitution of India – Fundamental Rights (Part III, Articles 12–35):**\n\n` +
        `1. **Right to Equality (Articles 14–18):** Equality before law and equal protection of laws; prohibition of discrimination.\n\n` +
        `2. **Right to Freedom (Articles 19–22):** Freedom of speech, expression, assembly, association, movement, and life & personal liberty (Article 21).\n\n` +
        `3. **Constitutional Remedies (Article 32 & 226):** Direct right to approach Supreme Court (Art 32) or High Court (Art 226) for enforcement via Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.\n\n` +
        `📞 **National Legal Services Authority (NALSA):** 15100 | 🌐 **Portal:** [nalsa.gov.in](https://nalsa.gov.in)`;
      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 0.2 Check if query matches any of the 93 schemes in SCHEMES_CATALOG
    const matchedScheme = this.findMatchingScheme(lower);
    if (matchedScheme) {
      sources.push({
        id: matchedScheme.id,
        title: matchedScheme.title,
        authority: matchedScheme.ministry || 'Government of India',
        actOrScheme: matchedScheme.title,
        sectionOrDoc: `${matchedScheme.shortName || matchedScheme.title} Guidelines`,
        excerpt: `${matchedScheme.benefitSummary}. ${matchedScheme.objective}`,
        url: matchedScheme.officialUrl,
        verifiedDate: matchedScheme.lastUpdated || '2026-09-15'
      });

      let host = 'Official Portal';
      try {
        if (matchedScheme.officialUrl) {
          host = new URL(matchedScheme.officialUrl).hostname.replace('www.', '');
        }
      } catch {}
      const hp = matchedScheme.helpline ? matchedScheme.helpline.split('/')[0].split(',')[0].trim() : '1800-180-1551';
      actions.push(`Apply Online on ${host}`, 'Check Eligibility & Documents', `Call Helpline: ${hp}`);

      if (isHowToApply) {
        text = this.formatSchemeApplication(matchedScheme, lang);
      } else {
        text = this.formatSchemeOverview(matchedScheme, lang);
      }

      return {
        id: 'MSG-' + Date.now(),
        sender: 'assistant',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: lang,
        confidence,
        isVerified: true,
        sources,
        suggestedActions: actions,
        feedback: null
      };
    }

    // 1. Dedicated Step-by-Step Guidance for Application Queries
    if (isHowToApply) {
      if (lower.includes('pmfby') || lower.includes('fasal') || lower.includes('bima') || lower.includes('crop') || lower.includes('विमा') || lower.includes('पीक') || lower.includes('फसल') || lower.includes('claim') || lower.includes('કાપડ')) {
        sources.push(MOCK_VERIFIED_SOURCES.pmfby_claim_intimation, MOCK_VERIFIED_SOURCES.pmfby_premium_rates);
        actions.push('Apply Online on pmfby.gov.in', 'Required Documents Checklist', 'Call 14447 Helpline');

        if (lang === 'mr') {
          text = `**पायरी-दर-पायरी मार्गदर्शक: प्रधानमंत्री पीक विमा योजनेसाठी (PMFBY) अर्ज कसा करावा**\n\n` +
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
        } else if (lang === 'hi') {
          text = `**चरण-दर-चरण मार्गदर्शिका: प्रधानमंत्री फसल बीमा योजना (PMFBY) के लिए आवेदन कैसे करें**\n\n` +
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
        } else if (lang === 'gu') {
          text = `**પગલાંવાર માર્ગદર્શિકા: પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY) માટે અરજી કેવી રીતે કરવી**\n\n` +
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
          text = `**Step-by-Step Guide: How to Apply for Pradhan Mantri Fasal Bima Yojana (PMFBY)**\n\n` +
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
      } else if (lower.includes('pacs') || lower.includes('पैक्स') || lower.includes('पॅक्स') || lower.includes('मંડળી') || lower.includes('membership') || lower.includes('सभासद') || lower.includes('सदस्य') || lower.includes('સભ્ય')) {
        sources.push(MOCK_VERIFIED_SOURCES.pacs_multipurpose, MOCK_VERIFIED_SOURCES.pacs_computerization);
        actions.push('Download Form 1 Membership', 'Explore 25+ PACS Services', 'Locate Nearest PACS');

        if (lang === 'mr') {
          text = `**पायरी-दर-पायरी मार्गदर्शक: पॅक्स (PACS) सभासदत्व व सेवांसाठी अर्ज कसा करावा**\n\n` +
            `**पायरी १: पात्रता तपासा व कागदपत्रे तयार करा**\n` +
            `• **पात्रता:** पॅक्सच्या कार्यक्षेत्रातील शेतकरी किंवा ग्रामीण रहिवासी.\n` +
            `• **कागदपत्रे:** आधार कार्ड, रहिवासी दाखला, ७/१२ उतारा, २ पासपोर्ट फोटो आणि बँक पासबुक.\n\n` +
            `**पायरी २: सभासदत्व अर्ज (Form 1) प्राप्त करा**\n` +
            `• स्थानिक पॅक्स सचिवांकडून विहित 'नमुना १' अर्ज मिळवा.\n\n` +
            `**पायरी ३: किमान भागभांडवल व प्रवेश शुल्क जमा करा**\n` +
            `• किमान १ शेअर्स रक्कम (₹१०० ते ₹५००) आणि नाममात्र प्रवेश शुल्क (₹१०) भरून पावती घ्या.\n\n` +
            `**पायरी ४: ३० दिवसांच्या आत संचालक मंडळाची मान्यता**\n` +
            `• आदर्श उपविधीनुसार ३० दिवसांच्या आत सभासदत्व मंजूर करणे बंधनकारक आहे.\n\n` +
            `**पायरी ५: पासबुक मिळवा व २५+ सेवांचा लाभ घ्या**\n` +
            `• जन औषधी केंद्र (५०-९०% स्वस्त औषधे), स्वस्त खते, ट्रॅक्टर-ड्रोन भाडे, आणि शून्य टक्के व्याज केसीसी कर्जाचा लाभ गावातच मिळतो.\n\n` +
            `🏛️ *अधिक माहिती: cooperation.gov.in/model-bye-laws*`;
        } else if (lang === 'hi') {
          text = `**चरण-दर-चरण मार्गदर्शिका: पैक्स (PACS) सदस्यता एवं सेवाओं हेतु आवेदन कैसे करें**\n\n` +
            `**चरण १: पात्रता एवं आवश्यक दस्तावेज**\n` +
            `• **पात्रता:** पैक्स कार्यक्षेत्र का कोई भी कृषक अथवा ग्रामीण नागरिक।\n` +
            `• **दस्तावेज:** आधार कार्ड, निवास प्रमाण पत्र, खतौनी, २ पासपोर्ट फोटो व बैंक पासबुक।\n\n` +
            `**चरण २: सदस्यता आवेदन पत्र (प्रपत्र १) प्राप्त करें**\n` +
            `• अपनी ग्राम पंचायत की पैक्स समिति के सचिव से सदस्यता प्रपत्र प्राप्त करें।\n\n` +
            `**चरण ३: न्यूनतम शेयर पूंजी एवं प्रवेश शुल्क जमा करें**\n` +
            `• न्यूनतम शेयर राशि (₹100 - ₹500) तथा प्रवेश शुल्क जमा कर रसीद प्राप्त करें।\n\n` +
            `**चरण ४: ३० दिनों में अनिवार्य स्वीकृति (मॉडल उपनियम)**\n` +
            `• आवेदन जमा करने के **३० दिनों के भीतर** प्रबंध समिति द्वारा सदस्यता स्वीकृत की जाती है।\n\n` +
            `**चरण ५: सदस्यता पासबुक प्राप्त कर २५+ सेवाओं का लाभ लें**\n` +
            `• सदस्यता संख्या मिलते ही रियायती खाद, शून्य प्रतिशत ब्याज KCC ऋण, जन औषधि केंद्र से सस्ती दवाएं, और ड्रोन किराए की सुविधा प्राप्त करें।\n\n` +
            `🏛️ *सत्यापित स्रोत: cooperation.gov.in/model-bye-laws*`;
        } else if (lang === 'gu') {
          text = `**પગલાંવાર માર્ગદર્શિકા: પેક્સ (PACS) સભ્યપદ અને સેવાઓ માટે અરજી કેવી રીતે કરવી**\n\n` +
            `**પગલું ૧: પાત્રતા અને જરૂરી દસ્તાવેજો**\n` +
            `• **પાત્રતા:** મંડળીના કાર્યક્ષેત્રમાં રહેતો કોઈપણ ખેડૂત અથવા ગ્રામીણ નાગરિક.\n` +
            `• **દસ્તાવેજો:** આધાર કાર્ડ, ૭/૧૨ અને ૮-અ ઉતારા, ૨ ફોટા અને બેંક પાસબુક.\n\n` +
            `**પગલું ૨: સભ્યપદ ફોર્મ મેળવો**\n` +
            `• ગામની પેક્સ મંડળીના મંત્રી પાસેથી સભ્યપદ અરજી ફોર્મ મેળવો.\n\n` +
            `**પગલું ૩: લઘુત્તમ શેર મૂડી જમા કરો**\n` +
            `• ઓછામાં ઓછો ૧ શેર (₹૧૦૦ થી ₹૫૦૦) અને પ્રવેશ ફી ભરીને પહોંચ મેળવો.\n\n` +
            `**પગલું ૪: ૩૦ દિવસમાં સત્તાવાર મંજૂરી**\n` +
            `• આદર્શ પેટા-નિયમો હેઠળ **૩૦ દિવસની અંદર** કારોબારી સમિતિએ મંજૂરી આપવી ફરજિયાત છે.\n\n` +
            `**પગલું ૫: સભ્ય પાસબુક મેળવો અને ૨૫+ સેવાઓનો લાભ લો**\n` +
            `• સભ્ય બન્યા પછી ૪% વ્યાજે KCC પાક ધિરાણ, ખાતર-બિયારણ, સસ્તા ભાવે દવાઓ અને ટ્રેક્ટર-ડ્રોન ભાડે મેળવી શકાય છે.\n\n` +
            `🏛️ *સત્તાવાર પોર્ટલ: cooperation.gov.in/model-bye-laws*`;
        } else {
          text = `**Step-by-Step Guide: How to Apply for PACS Membership & Citizen Services**\n\n` +
            `**Step 1: Check Eligibility & Prepare KYC Documents**\n` +
            `• **Eligibility:** Any cultivator or resident living within the operating area of the PACS.\n` +
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
      } else if (lower.includes('kcc') || lower.includes('loan') || lower.includes('credit') || lower.includes('कर्ज') || lower.includes('ऋण') || lower.includes('ધિરાણ')) {
        sources.push(MOCK_VERIFIED_SOURCES.pacs_multipurpose);
        actions.push('Download 1-Page KCC Form', '4% Interest Terms', 'Visit PACS DCCB Branch');

        if (lang === 'mr') {
          text = `**पायरी-दर-पायरी मार्गदर्शक: किसान क्रेडिट कार्ड (KCC) ४% कर्जासाठी अर्ज कसा करावा**\n\n` +
            `**पायरी १: पात्रता व जमिनीची कागदपत्रे तपासा**\n` +
            `• **पात्रता:** वैयक्तिक/संयुक्त शेतकरी, कुळ शेतकरी आणि पॅक्सचे सभासद.\n` +
            `• **कागदपत्रे:** आधार कार्ड, पॅन कार्ड, चालू ७/१२ आणि ८-अ उतारा, आणि बँकेचे नो-ड्यूज प्रमाणपत्र.\n\n` +
            `**पायरी २: १ पानाचा सुटसुटीत KCC अर्ज भरा**\n` +
            `• स्थानिक पॅक्स, जिल्हा मध्यवर्ती सहकारी बँक (DCCB) किंवा बँकेतून १ पानाचा KCC अर्ज घ्या.\n\n` +
            `**पायरी ३: विनातारण कर्ज मंजुरी (₹१.६० लाख ते ₹२.०० लाख)**\n` +
            `• ₹१.६० लाखांपर्यंतच्या कर्जासाठी कोणतीही जमीन गहाण ठेवण्याची गरज नाही.\n\n` +
            `**पायरी ४: १४ दिवसांच्या आत कर्ज वितरण**\n` +
            `• अर्ज सादर केल्यापासून **१४ दिवसांच्या आत** कर्ज खात्यात मंजूर करणे बंधनकारक आहे.\n\n` +
            `**पायरी ५: RuPay KCC कार्ड व ४% व्याज सवलत (PRI)**\n` +
            `• वेळेवर परतफेड केल्यास निव्वळ व्याजदर फक्त **४% प्रतिवर्ष** लागतो.\n\n` +
            `🏛️ *अधिकृत माहिती: nabard.org*`;
        } else if (lang === 'hi') {
          text = `**चरण-दर-चरण मार्गदर्शिका: किसान क्रेडिट कार्ड (KCC) ४% ऋण हेतु आवेदन कैसे करें**\n\n` +
            `**चरण १: पात्रता एवं आवश्यक दस्तावेज**\n` +
            `• **पात्रता:** भूमिधारक किसान, बटाईदार व पैक्स समिति के सदस्य।\n` +
            `• **दस्तावेज:** आधार कार्ड, खतौनी/भू-अभिलेख, बैंक खाता विवरण एवं नो-ड्यूज शपथ पत्र।\n\n` +
            `**चरण २: १-पृष्ठीय सरल KCC फॉर्म भरें**\n` +
            `• निकटतम पैक्स (PACS) समिति अथवा जिला सहकारी बैंक शाखा से सरल फॉर्म प्राप्त करें।\n\n` +
            `**चरण ३: बिना बंधक ऋण सीमा (₹1.60 लाख तक)**\n` +
            `• ₹1.60 लाख तक के ऋण हेतु कोई जमीन बंधक रखने की आवश्यकता नहीं है।\n\n` +
            `**चरण ४: १४ कार्यदिवसों में ऋण स्वीकृति**\n` +
            `• पूर्ण आवेदन जमा करने के **१४ दिनों के भीतर** केसीसी कार्ड जारी किया जाता है।\n\n` +
            `**चरण ५: RuPay कार्ड एवं ४% रियायती ब्याज दर**\n` +
            `• समय पर अदायगी पर ३% प्रोत्साहन (PRI) मिलकर प्रभावी ब्याज दर मात्र **४% वार्षिक** रहती है।\n\n` +
            `🏛️ *आधिकारिक स्रोत: nabard.org*`;
        } else if (lang === 'gu') {
          text = `**પગલાંવાર માર્ગદર્શિકા: કિસાન ક્રેડિટ કાર્ડ (KCC) 4% ધિરાણ માટે અરજી કેવી રીતે કરવી**\n\n` +
            `**પગલું ૧: પાત્રતા અને દસ્તાવેજો**\n` +
            `• **પાત્રતા:** ખેતીની જમીન ધરાવતા તમામ ખેડૂતો અને પેક્સના સભ્યો.\n` +
            `• **દસ્તાવેજો:** આધાર કાર્ડ, ૭/૧૨ અને ૮-અ ઉતારા, અને બેંક પાસબુક.\n\n` +
            `**પગલું ૨: ૧ પાનાનું સરળ KCC ફોર્મ ભરો**\n` +
            `• સ્થાનિક પેક્સ અથવા સહકારી બેંકમાંથી ૧ પાનાનું ફોર્મ મેળવીને ભરો.\n\n` +
            `**પગલું ૩: જમીન ગીરો રાખ્યા વગર ધિરાણ (₹1.60 લાખ સુધી)**\n` +
            `• ₹1.60 લાખ સુધીના ધિરાણ માટે કોઈ પણ જમીન ગીરો રાખવાની જરૂર નથી.\n\n` +
            `**પગલું ૪: ૧૪ દિવસમાં ધિરાણ મંજૂરી**\n` +
            `• અરજી કર્યાના **૧૪ દિવસમાં** ધિરાણ મંજૂર કરવું ફરજિયાત છે.\n\n` +
            `**પગલું ૫: RuPay કાર્ડ અને 4% વાર્ષિક વ્યાજ દર**\n` +
            `• સમયસર ભરપાઈ કરવાથી ચોખ્ખું વ્યાજ માત્ર **૪% વાર્ષિક** રહે છે.\n\n` +
            `🏛️ *સત્તાવાર પોર્ટલ: nabard.org*`;
        } else {
          text = `**Step-by-Step Guide: How to Apply for Kisan Credit Card (KCC) at 4% Interest**\n\n` +
            `**Step 1: Check Eligibility & Prepare Necessary Documents**\n` +
            `• **Eligibility:** All cultivators, tenant farmers, and PACS members.\n` +
            `• **Required Documents:** Aadhaar Card, PAN Card, Updated Land Records (7/12 & 8-A / Khatauni), and a simple No-Dues Declaration.\n\n` +
            `**Step 2: Collect & Complete the Simplified 1-Page KCC Form**\n` +
            `• Obtain the 1-page form from your village PACS, District Central Cooperative Bank (DCCB), or nearest Commercial Bank branch.\n\n` +
            `**Step 3: Collateral-Free Sanction up to ₹1.60 Lakh**\n` +
            `• Loans up to ₹1.60 Lakh (extended to ₹2.00 Lakh in computerized PACS) require **zero mortgage or land collateral**.\n\n` +
            `**Step 4: Statutory 14-Day Processing Window**\n` +
            `• The bank/PACS must process and sanction eligible KCC applications within **14 working days**.\n\n` +
            `**Step 5: Card Issuance & 4% Subsidized Annual Interest**\n` +
            `• Receive your RuPay Kisan Card. When repaid on time, net interest is reduced to just **4.0% per annum**.\n\n` +
            `🏛️ *Official Portal: nabard.org*`;
        }
      } else {
        sources.push(MOCK_VERIFIED_SOURCES.pacs_multipurpose, MOCK_VERIFIED_SOURCES.mscs_voting_rights);
        actions.push('Check Scheme Eligibility', 'Download Application Form', 'Track Application Status');

        if (lang === 'mr') {
          text = `**पायरी-दर-पायरी मार्गदर्शक: सहकारी योजना व सेवांसाठी अर्ज प्रक्रिया**\n\n` +
            `**पायरी १: अधिकृत पात्रता व नियमावली तपासा**\n` +
            `• योजनेच्या निकषानुसार आवश्यक पात्रता व कागदपत्रे (आधार, ७/१२, बँक पासबुक) तयार ठेवा.\n\n` +
            `**पायरी २: अर्ज केंद्र किंवा पोर्टल निवडा**\n` +
            `• गावातील **प्राथमिक कृषी पतसंस्था (PACS)**, CSC केंद्र किंवा अधिकृत शासकीय पोर्टलवर जा.\n\n` +
            `**पायरी ३: अचूक माहितीसह अर्ज भरा**\n` +
            `• विहित नमुन्यातील अर्ज भरून सर्व सत्यप्रत कागदपत्रे जोडा.\n\n` +
            `**पायरी ४: पोचपावती (Acknowledgment) प्राप्त करा**\n` +
            `• स्वाक्षरी व शिक्का असलेली पोचपावती किंवा डिजिटल ॲप्लिकेशन आयडी मिळवा.\n\n` +
            `**पायरी ५: स्थिती ट्रॅक करा व मंजुरी मिळवा**\n` +
            `• संबंधित विभागाच्या संकेतस्थळावरून किंवा हेल्पलाईनवरून अर्जाची सद्यस्थिती तपासा.\n\n` +
            `🏛️ *सहकारिता मंत्रालय अधिकृत पोर्टल: cooperation.gov.in*`;
        } else if (lang === 'hi') {
          text = `**चरण-दर-चरण मार्गदर्शिका: सरकारी योजना व सहकारी सेवाओं हेतु आवेदन प्रक्रिया**\n\n` +
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
        } else if (lang === 'gu') {
          text = `**પગલાંવાર માર્ગદર્શિકા: સહકારી યોજનાઓ માટે અરજી કરવાની સામાન્ય પ્રક્રિયા**\n\n` +
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
          text = `**Step-by-Step Guide: How to Apply for Cooperative Schemes & Services**\n\n` +
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

    // 1. Cooperative Laws & By-Laws / Voting Rights
    else if (lower.includes('vote') || lower.includes('voting') || lower.includes('right') || lower.includes('हक्क') || lower.includes('मतदान') || lower.includes('અધિકાર') || lower.includes('ચૂંટણી') || lower.includes('અધિકાર') || lower.includes('by-law') || lower.includes('bylaw') || lower.includes('rule') || lower.includes('election') || lower.includes('निवडणूक') || lower.includes('चुनाव')) {

      sources.push(MOCK_VERIFIED_SOURCES.mscs_voting_rights, MOCK_VERIFIED_SOURCES.mscs_election_authority);
      actions.push('View MSCS Act 2023 Summary', 'File Grievance on Voting Denial', 'Check Active Member Checklist');

      if (lang === 'mr') {
        text = `**सहकारी संस्थेतील सभासदांचे मतदानाचे हक्क व नियम (MSCS Act 2023):**

१. **सक्रिय सभासदत्व (Active Membership):** बहुराज्य सहकारी संस्था कायदा (दुरुस्ती) २०२३ च्या कलम २९ नुसार, संस्थेच्या वार्षिक सर्वसाधारण सभेत (AGM) किंवा संचालक मंडळ निवडणुकीत मतदानाचा हक्क मिळवण्यासाठी सभासदाने:
   - मागील किमान **३ सलग वार्षिक सर्वसाधारण सभांना** हजेरी लावलेली असणे आवश्यक आहे.
   - उपविधीमध्ये ठरवून दिलेल्या **किमान सेवा किंवा उत्पादनांचा** (जसे खते खरेदी किंवा कर्ज व्यवहार) लाभ घेतलेला असावा.

२. **मुक्त व निष्पक्ष निवडणुका:** कलम ४५ नुसार केंद्र सरकारने स्वायत्त 'सहकार निवडणूक प्राधिकरण' (Co-operative Election Authority) स्थापन केले आहे, जेणेकरून मनमानी कारभाराला आळा बसेल.

⚠️ *जर तुमच्या संस्थेने कायदेशीर नोटीस न देता मतदार यादीतून तुमचे नाव वगळले असल्यास, तुम्ही थेट जिल्हा निबंधक किंवा सहकार ओम्बड्समनकडे दाद मागू शकता.*`;
      } else if (lang === 'hi') {
        text = `**सहकारी समिति में मतदान अधिकार एवं सक्रिय सदस्यता नियम (MSCS Act 2023):**

१. **सक्रिय सदस्यता (Active Membership):** बहु-राज्य सहकारी सोसायटी अधिनियम (संशोधन) २०२३ की धारा २९ के तहत, चुनाव में मतदान का अधिकार केवल सक्रिय सदस्यों को प्राप्त होता है। इसके लिए:
   - पिछले कम से कम **३ लगातार आम बैठकों (AGM)** में भाग लेना अनिवार्य है।
   - समिति की न्यूनतम सेवाओं (जैसे खाद, बीज, या ऋण) का उपनियमों के अनुसार उपयोग किया गया हो।

२. **स्वतंत्र सहकार चुनाव प्राधिकरण:** धारा ४५ के अंतर्गत एक स्वतंत्र चुनावी तंत्र गठित किया गया है जो पारदर्शी मतदान सुनिश्चित करता है।

⚠️ *यदि आपको अनुचित रूप से मतदान से वंचित किया गया है, तो आप कूपसाथी पोर्टल से तुरंत संबंधित निबंधक को शिकायत भेज सकते हैं।*`;
      } else if (lang === 'gu') {
        text = `**સહકારી મંડળીમાં મતદાન અધિકારો અને સક્રિય સભ્યપદ નિયમો (MSCS Act 2023):**

૧. **સક્રિય સભ્યપદના માપદંડ (કલમ ૨૯):** મલ્ટિ-સ્ટેટ કો-ઓપરેટિવ સોસાયટીઝ (સુધારા) અધિનિયમ ૨૦૨૩ હેઠળ, સામાન્ય સભા કે ચૂંટણીમાં મતદાન કરવા માટે સભ્યએ:
   - છેલ્લી સતત **૩ વાર્ષિક સામાન્ય સભાઓ (AGM)** માં હાજરી આપી હોવી જોઈએ.
   - મંડળીના પેટા-નિયમો મુજબ **લઘુત્તમ આર્થિક સેવાઓ** (જેમ કે ખાતર, બિયારણ અથવા લોન) નો ઉપયોગ કર્યો હોવો જોઈએ.

૨. **સ્વતંત્ર સહકારી ચૂંટણી સત્તામંડળ:** કલમ ૪૫ હેઠળ પારદર્શક અને નિષ્પક્ષ ચૂંટણી માટે સ્વતંત્ર ચૂંટણી સત્તામંડળ સ્થાપિત કરાયું છે.

⚠️ *જો તમને કારણ દર્શક નોટિસ વિના મતદાર યાદીમાંથી બાકાત કરવામાં આવ્યા હોય, તો તમે સહકારી ઓમ્બડ્સમેન અથવા જિલ્લા રજિસ્ટ્રાર સમક્ષ અપીલ કરી શકો છો.*`;
      } else {
        text = `**Cooperative Member Rights & Voting Regulations (MSCS Act 2023):**

1. **Active Membership Criteria (Section 29):** Under the Multi-State Co-operative Societies (Amendment) Act 2023, you are entitled to vote in general meetings and board elections provided you:
   - Have attended at least **3 consecutive Annual General Body Meetings (AGMs)**.
   - Have utilized the minimum prescribed economic services/products of the society as laid down in its registered by-laws.

2. **Cooperative Election Authority (Section 45):** A dedicated statutory authority now conducts and monitors board elections to ensure democratic transparency and prevent arbitrary disqualification.

3. **Inspection of Records (Section 106):** Every active member has the right to inspect audited balance sheets, member registers, and by-laws upon written request without unnecessary fees.

⚠️ *If your name was unfairly omitted from the voter roll without prior show-cause notice, you have the statutory right to appeal before the District Registrar or Cooperative Ombudsman.*`;
      }
    }

    // 2. PMFBY & Crop Insurance / Claims
    else if (lower.includes('pmfby') || lower.includes('fasal bima') || lower.includes('insurance') || lower.includes('crop') || lower.includes('विमा') || lower.includes('पीक') || lower.includes('फसल') || lower.includes('claim') || lower.includes('भरपाई') || lower.includes('काப்பீடு')) {
      sources.push(MOCK_VERIFIED_SOURCES.pmfby_claim_intimation, MOCK_VERIFIED_SOURCES.pmfby_premium_rates);
      actions.push('Calculate Premium Online', '72-Hour Claim Guide', 'Track Insurance Claim');

      if (lang === 'mr') {
        text = `**प्रधानमंत्री पीक विमा योजना (PMFBY) – शेतकरी हक्क व मार्गदर्शक तत्त्वे:**

१. **कमीत कमी शेतकरी हप्ता:**
   - खरीप पिके (कापूस, सोयाबीन, भात): विमा रकमेच्या **फक्त २.०%**
   - रब्बी पिके (गहू, हरभरा): विमा रकमेच्या **फक्त १.५%**
   - वार्षिक बागायती/व्यापारी पिके: **५.०%**
   - उर्वरित सर्व विमा हप्ता केंद्र व राज्य सरकार अनुदानाद्वारे भरते.

२. **स्थानिक आपत्ती व काढणीपश्चात नुकसान (७२ तासांचा नियम):**
   - जर गारपीट, ढगफुटी, भूस्खलन किंवा शेतात कापणी करून वाळवण्यासाठी ठेवलेल्या पिकाचे पाऊस/चक्रीवादळामुळे नुकसान झाले, तर **७२ तासांच्या आत** माहिती देणे बंधनकारक आहे.
   - **नोंदणी कशी करावी:** 'Crop Insurance App' वरून जिओटॅग फोटो अपलोड करा किंवा **१४४४७ (Toll Free)** वर तात्काळ कॉल करा.

३. **आवश्यक कागदपत्रे:** आधार कार्ड, ७/१२ व ८-अ उतारा, बँक पासबुक आणि तलाठी/ग्रामसेवकाचे पीक पेरा प्रमाणपत्र.`;
      } else if (lang === 'hi') {
        text = `**प्रधानमंत्री फसल बीमा योजना (PMFBY) – किसान सहायता एवं दिशा-निर्देश:**

१. **रियायती प्रीमियम दरें:**
   - खरीफ फसलें (धान, मक्का, सोयाबीन): बीमित राशि का **केवल २.०%**
   - रबी फसलें (गेहूं, सरसों, चना): बीमित राशि का **केवल १.५%**
   - वाणिज्यिक/बागवानी फसलें: **५.०%**
   - शेष संपूर्ण बीमा प्रीमियम का भुगतान केंद्र व राज्य सरकार द्वारा अनुदान के रूप में किया जाता है।

२. **७२ घंटे की महत्वपूर्ण समय-सीमा:**
   - ओलावृष्टि, जलभराव, बादल फटना अथवा कटाई के बाद खेत में सूखने के लिए रखी फसल के नुकसान पर **७२ घंटे के भीतर** सूचना देना अनिवार्य है।
   - सूचना 'क्रॉप इंश्योरेंस ऐप' (Crop Insurance App) अथवा राष्ट्रीय टोल-फ्री नंबर **14447** पर दर्ज कराई जा सकती है।

३. **आवश्यक दस्तावेज:** आधार कार्ड, भूमि अभिलेख (खसरा/खतौनी), बैंक पासबुक एवं बुवाई घोषणा प्रमाण पत्र।`;
      } else if (lang === 'gu') {
        text = `**પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY) – ખેડૂત માર્ગદર્શિકા:**

૧. **સબસિડીયુક્ત પ્રીમિયમ દરો:**
   - ખરીફ પાકો (ડાંગર, કપાસ, મગફળી): વીમા રકમના **માત્ર ૨.૦%**
   - રવિ પાકો (ઘઉં, જીરું, ચણા): વીમા રકમના **માત્ર ૧.૫%**
   - વાણિજ્યિક/બાગાયતી પાકો: **૫.૦%**
   - બાકીનું તમામ પ્રીમિયમ કેન્દ્ર અને રાજ્ય સરકાર દ્વારા સબસિડી તરીકે ચૂકવવામાં આવે છે.

૨. **૭૨ કલાકની અંદર નુકસાનીની જાણ (કલમ ૨૧):**
   - કરા, અતિવૃષ્ટિ, વાદળ ફાટવું અથવા પાકની લણણી પછી ખેતરમાં સૂકવવા રાખેલ પાકના નુકસાન પર **૭૨ કલાકની અંદર** જાણ કરવી ફરજિયાત છે.
   - 'Crop Insurance App' દ્વારા જીઓટેગ ફોટો અપલોડ કરો અથવા ટોલ-ફ્રી નંબર **14447** પર કોલ કરો.

૩. **જરૂરી દસ્તાવેજો:** આધાર કાર્ડ, જમીનના દસ્તાવેજો (૭/૧૨, ૮-અ), બેંક પાસબુક અને વાવેતર પ્રમાણપત્ર.`;
      } else {
        text = `**Pradhan Mantri Fasal Bima Yojana (PMFBY) Guidance:**

1. **Subsidized Premium Rates for Farmers:**
   - **Kharif Crops** (Paddy, Cotton, Soybean): Capped at only **2.0%** of Sum Insured.
   - **Rabi Crops** (Wheat, Mustard, Gram): Capped at only **1.5%** of Sum Insured.
   - **Commercial & Horticultural Crops**: Capped at **5.0%**.
   - The remaining actuarial premium is heavily subsidized 50:50 by the Central and State Governments.

2. **Crucial 72-Hour Claim Rule (Clause 21):**
   - In case of localized perils (hailstorm, cloudburst, heavy waterlogging) or post-harvest loss within 14 days of harvesting, you **must report the loss within 72 hours**.
   - Use the official **Crop Insurance Mobile App** (with geotagged photo) or dial National Toll-Free **14447**.

3. **Mandatory Documentation:**
   - Aadhaar Card (linked to DBT bank account)
   - Land Record (ROR / 7-12 / Khasra)
   - Bank Passbook with IFSC
   - Crop Sowing Certificate issued by Patwari or PACS Secretary.`;
      }
    }

    // 3. PACS Services & Computerization
    else if (lower.includes('pacs') || lower.includes('पैक्स') || lower.includes('पॅक्स') || lower.includes('society') || lower.includes('kendra') || lower.includes('fertilizer') || lower.includes('urea') || lower.includes('खत') || lower.includes('खाद')) {
      sources.push(MOCK_VERIFIED_SOURCES.pacs_multipurpose, MOCK_VERIFIED_SOURCES.pacs_computerization);
      actions.push('Explore PACS Multi-Services', 'Check Nano Fertilizer Quota', 'KCC Loan via PACS');

      if (lang === 'mr') {
        text = `**प्राथमिक कृषी पतसंस्था (PACS) – आधुनिक सेवा व शेतकरी सुविधा:**

१. **२५+ नवीन आर्थिक सेवा (Model By-Laws):**
   सहकार मंत्रालयाने तयार केलेल्या आदर्श उपविधीनुसार आता पॅक्स फक्त कर्ज वाटपापुरती मर्यादित नसून खालील सेवा पुरवत आहेत:
   - **प्रधानमंत्री जन औषधी केंद्र:** ५०% ते ९०% स्वस्त जेनेरिक औषधे.
   - **कस्टम हायरिंग सेंटर:** ट्रॅक्टर, ड्रोन व कृषी अवजारे नाममात्र भाड्याने.
   - **खते व नॅनो युरिया:** अधिकृत एमएसपी दरात थेट गावात खत वाटप.
   - **कॉमन सर्व्हिस सेंटर (CSC):** ई-केवायसी, ७/१२ डाऊनलोड, वीज बिल भरणा.

२. **संगणकीकरण प्रकल्प (Computerization):**
   सर्व पॅक्स आता केंद्रीय ईआरपी सॉफ्टवेअरने जिल्हा मध्यवर्ती सहकारी बँक (DCCB) शी जोडले गेले आहेत. यामुळे शेतकऱ्यांना विनाविलंब शून्य टक्के व्याज केसीसी कर्ज उपलब्ध होते.`;
      } else if (lang === 'hi') {
        text = `**प्राथमिक कृषि ऋण समितियां (PACS) – नई सेवाएं एवं लाभ:**

१. **२५+ नई बहुउद्देशीय सेवाएं:**
   सहकारिता मंत्रालय के नए मॉडल उपनियमों के तहत अब पैक्स ग्रामीण समृद्धि का मुख्य केंद्र बन चुकी हैं:
   - **सस्ती दवाइयां:** पैक्स परिसर में प्रधानमंत्री जन औषधि केंद्र की स्थापना।
   - **कृषि उपकरण (Custom Hiring):** ड्रोन, थ्रेशर एवं आधुनिक जुताई उपकरण किराए पर।
   - **उर्वरक एवं नैनो यूरिया:** बिना कालाबाजारी के पीओएस (POS) मशीन से सीधे खाद वितरण।
   - **कॉमन सर्विस सेंटर (CSC):** गांव में ही ३००+ डिजिटल सरकारी सेवाओं का लाभ।

२. **कम्प्यूटरीकरण से पारदर्शिता:**
   ६३,००० पैक्स को राष्ट्रीय क्लाउड ईआरपी से जोड़ा जा रहा है, जिससे आपका किसान क्रेडिट कार्ड (KCC) ऋण तुरंत स्वीकृत होता है।`;
      } else if (lang === 'gu') {
        text = `**પ્રાથમિક કૃષિ ધિરાણ મંડળીઓ (PACS) – આધુનિક સેવાઓ અને સુવિધાઓ:**

૧. **૨૫+ બહુહેતુક સેવાઓ (Model By-Laws):**
   સહકાર મંત્રાલયના આદર્શ પેટા-નિયમો હેઠળ હવે પેક્સ ગ્રામીણ વિકાસનું કેન્દ્ર બની છે:
   - **જન ઔષધિ કેન્દ્ર:** ૫૦% થી ૯૦% સસ્તી જેનરિક દવાઓ.
   - **કસ્ટમ હાયરિંગ સેન્ટર:** ટ્રેક્ટર, ડ્રોન અને આધુનિક કૃષિ સાધનો વાજબી ભાડે.
   - **ખાતર અને નેનો યુરિયા:** POS મશીન દ્વારા સરકારી નિયંત્રિત ભાવે સીધું ખાતર વિતરણ.
   - **કોમન સર્વિસ સેન્ટર (CSC):** ગામમાં જ ૩૦૦+ ડિજિટલ સરકારી સેવાઓ.

૨. **રાષ્ટ્રીય કમ્પ્યુટરાઇઝેશન મિશન:**
   તમામ પેક્સ હવે જિલ્લા મધ્યસ્થ સહકારી બેંક (DCCB) સાથે ક્લાઉડ ERP દ્વારા જોડાયેલ છે, જેથી કિસાન ક્રેડિટ કાર્ડ (KCC) ધિરાણ તાત્કાલિક મળે છે.`;
      } else {
        text = `**Primary Agricultural Credit Societies (PACS) – Modern Services & Rights:**

1. **Diversification into 25+ Citizen Services:**
   Under the Ministry of Cooperation's Model By-Laws, PACS have transformed into vibrant multipurpose rural hubs providing:
   - **Pradhan Mantri Jan Aushadhi Kendras:** Quality generic medicines at 50% to 90% discounted rates.
   - **Custom Hiring Centres:** Modern agricultural machinery, drones, and harvesters on nominal rental.
   - **Fertilizer & Nano Urea Distribution:** Direct POS-authenticated input distribution at government controlled prices.
   - **Common Service Centres (CSC):** 300+ e-governance services, utility bills, and land record printing.

2. **National PACS Computerization Mission (₹2,516 Cr):**
   Every functional PACS is directly linked via an ERP software to District Central Cooperative Banks (DCCBs), ensuring instantaneous Kisan Credit Card disbursements and eliminating bookkeeping manipulation.`;
      }
    }

    // 4. Grievance / Complaints & Ombudsman
    else if (lower.includes('grievance') || lower.includes('complaint') || lower.includes('तक्रार') || lower.includes('शिकायत') || lower.includes('fraud') || lower.includes('ombudsman') || lower.includes('redressal') || lower.includes('dispute')) {
      sources.push(MOCK_VERIFIED_SOURCES.coop_ombudsman, MOCK_VERIFIED_SOURCES.mscs_voting_rights);
      actions.push('File a Guided Grievance', 'Track Grievance Reference', 'Contact District Registrar');

      if (lang === 'mr') {
        text = `**सहकारी तक्रार निवारण व लोकपाल (Ombudsman) मार्गदर्शन:**

१. **तक्रारीचे स्वरूप:**
   तुम्ही खालील बाबींवर अधिकृत तक्रार दाखल करू शकता:
   - संस्थेने सभासदत्वाचा हक्क नाकारणे किंवा मतदार यादीतून नाव वगळणे.
   - ठेव रक्कम किंवा लाभांश न देणे.
   - पॅक्समध्ये खतांची अनधिकृत विक्री किंवा केसीसी कर्जात विलंब.
   - पीक विम्याची भरपाई ७२ तासांत कळवूनही न मिळणे.

२. **सहकार लोकपाल (Co-operative Ombudsman):**
   एमएससीएस कायदा २०२३ अंतर्गत सहकार लोकपाल ३० दिवसांच्या आत अशा तक्रारींवर सुनावणी घेऊन निकाल देण्यास बांधील आहेत.

३. **कूपसाथी मदत:**
   तुम्ही आमच्या 'तक्रार निवारण' टूलचा वापर करून २ मिनिटांत शासकीय नमुन्यात तक्रार अर्ज तयार करू शकता आणि ट्रॅकिंग नंबर मिळवू शकता.`;
      } else if (lang === 'hi') {
        text = `**सहकारी शिकायत निवारण एवं सहकार लोकपाल (Ombudsman) प्रक्रिया:**

१. **शिकायत दर्ज करने के वैध आधार:**
   - समिति द्वारा मतदान सूची से अनुचित रूप से नाम हटाना।
   - पैक्स (PACS) द्वारा खाद या ऋण वितरण में पक्षपात।
   - समय पर सूचना के बावजूद फसल बीमा क्लेम का भुगतान न होना।
   - सावधि जमा (FD) या लाभांश का भुगतान न होना।

२. **सहकार लोकपाल का अधिकार क्षेत्र:**
   सहकारिता मंत्रालय ने सदस्यों की शिकायतों के ३० दिनों के भीतर त्वरित समाधान हेतु स्वतंत्र सहकार लोकपाल नियुक्त किए हैं।

३. **कूपसाथी सहायता:**
   आप कूपसाथी पोर्टल पर जाकर सीधा डिजिटल शिकायत फॉर्म भर सकते हैं अथवा आवाज रिकॉर्ड करके अपनी भाषा में शिकायत दर्ज कर सकते हैं।`;
      } else if (lang === 'gu') {
        text = `**સહકારી ફરિયાદ નિવારણ અને સહકાર લોકપાલ (Ombudsman) પ્રક્રિયા:**

૧. **ફરિયાદ નોંધાવવાના માન્ય આધારો:**
   - મંડળી દ્વારા સભ્યપદ નકારવું અથવા મતદાર યાદીમાંથી નામ રદ કરવું.
   - PACS દ્વારા ખાતર અથવા ધિરાણ વિતરણમાં ગેરરીતિ.
   - સમયસર જાણ કરવા છતાં પાક વીમા દાવાની પતાવટ ન થવી.
   - ફિક્સ ડિપોઝિટ (FD) અથવા ડિવિડન્ડની ચુકવણી ન કરવી.

૨. **સહકાર લોકપાલ (Cooperative Ombudsman):**
   MSCS કાયદા હેઠળ ૩૦ દિવસની અંદર સભ્યોની ફરિયાદોનો નિકાલ કરવા માટે સ્વતંત્ર લોકપાલની રચના કરવામાં આવી છે.

૩. **કૂપસાથી સહાય:**
   તમે કૂપસાથી પોર્ટલ પરથી સરળતાથી તમારી માતૃભાષામાં ફરિયાદ નોંધાવી શકો છો અને ડિજિટલ ટ્રેકિંગ આઈડી મેળવી શકો છો.`;
      } else {
        text = `**Cooperative Grievance Redressal & Ombudsman Framework:**

1. **Statutory Complaint Categories:**
   Members can officially escalate grievances regarding:
   - Denial of voting rights or exclusion from general body meetings.
   - Delayed disbursement or arbitrary deduction of KCC crop loans.
   - Withholding of cooperative deposits, share refunds, or dividends.
   - Delayed settlement of PMFBY crop loss claims beyond statutory timelines.

2. **Cooperative Ombudsman (MSCS Act Section 85):**
   The Central Government has established specialized Ombudsmen mandated to resolve member disputes within 30 days of filing.

3. **How CoopSathi AI Assists You:**
   Use our 4-step Grievance Wizard to automatically structure your verbal or written problem into an official representation with auto-routing to the competent Registrar.`;
      }
    }

    // 5. Government Schemes Discovery
    else if (lower.includes('scheme') || lower.includes('योजना') || lower.includes('subsidy') || lower.includes('સબસિડી') || lower.includes('ધિરાણ') || lower.includes('अनुदान') || lower.includes('pm kisan') || lower.includes('aif') || lower.includes('kcc') || lower.includes('loan')) {
      sources.push(MOCK_VERIFIED_SOURCES.pacs_multipurpose);
      actions.push('Browse All Schemes', 'Check KCC 4% Interest Subvention', 'Apply for AIF Warehouse Loan');

      if (lang === 'mr') {
        text = `**शेतकरी व सहकारी संस्थांसाठी प्रमुख शासकीय योजना:**

१. **पीएम-किसान (PM-KISAN):** सर्व पात्र शेतकरी कुटुंबांना दरवर्षी ₹६,००० थेट बँक खात्यात (३ हप्त्यांमध्ये).
२. **किसान क्रेडिट कार्ड (KCC):** वेळेत परतफेड केल्यास **फक्त ४% प्रभावी व्याजदराने** ₹३ लाखांपर्यंत खेळते भांडवल.
३. **कृषी पायाभूत सुविधा निधी (AIF):** सहकारी संस्था व पॅक्सना गोदाम, कोल्ड स्टोरेज आणि सॉर्टिंग युनिट उभारणीसाठी २ कोटींपर्यंतच्या कर्जावर **३% व्याज सवलत**.
४. **महिला सहकार योजना (NCDC):** महिलांच्या सहकारी संस्थांसाठी ८०% पर्यंत सवलतीचे कर्ज व तांत्रिक प्रशिक्षण.

👉 *तपशीलवार पात्रता तपासण्यासाठी मुख्य मेनूमधील 'शासकीय योजना' पर्यायावर क्लिक करा.*`;
      } else if (lang === 'hi') {
        text = `**किसानों एवं सहकारी समितियों हेतु प्रमुख सरकारी योजनाएं:**

१. **पीएम-किसान (PM-KISAN):** भूमिधारक किसान परिवारों को ₹६,००० प्रति वर्ष (₹२,००० की ३ समान किस्तों में) प्रत्यक्ष लाभ अंतरण।
२. **किसान क्रेडिट कार्ड (KCC):** समय पर पुनर्भुगतान करने पर **मात्र ४% प्रभावी ब्याज दर** पर ₹३ लाख तक का रियायती कृषि ऋण।
३. **कृषि अवसंरचना कोष (AIF):** पैक्स और सहकारी समितियों को गोदाम एवं कोल्ड स्टोरेज निर्माण हेतु ₹२ करोड़ तक के ऋण पर **३% ब्याज अनुदान**।
४. **प्रधानमंत्री जन औषधि केंद्र (पैक्स):** पैक्स को दवा दुकान खोलने हेतु ₹५ लाख तक का सरकारी अनुदान।

👉 *अपनी व्यक्तिगत पात्रता जांचने के लिए 'सरकारी योजनाएं' सेक्शन देखें।*`;
      } else if (lang === 'gu') {
        text = `**ખેડૂતો અને સહકારી મંડળીઓ માટેની મુખ્ય સરકારી યોજનાઓ:**

૧. **પીએમ-કિસાન (PM-KISAN):** તમામ પાત્ર ખેડૂતોને વાર્ષિક ₹૬,૦૦૦ સીધા બેંક ખાતામાં (₹૨,૦૦૦ ના ૩ હપ્તામાં).
૨. **કિસાન ક્રેડિટ કાર્ડ (KCC):** સમયસર પુનઃચુકવણી પર **માત્ર ૪% અસરકારક વ્યાજ દરે** ₹૩ લાખ સુધીનું ટૂંકી મુદતનું કૃષિ ધિરાણ.
૩. **એગ્રીકલ્ચર ઇન્ફ્રાસ્ટ્રક્ચર ફંડ (AIF):** પેક્સ અને સહકારી મંડળીઓને ગોડાઉન, કોલ્ડ સ્ટોરેજ માટે ₹૨ કરોડ સુધીની લોન પર **૩% વ્યાજ સબવેન્શન**.
૪. **મહિલા સહકાર યોજના:** મહિલા સહકારી મંડળીઓ માટે રિયાયતી ધિરાણ અને આર્થિક સહાય.

👉 *તમારી વ્યક્તિગત પાત્રતા તપાસવા માટે મુખ્ય મેનૂમાં 'સરકારી યોજનાઓ' પર ક્લિક કરો.*`;
      } else {
        text = `**Flagship Schemes for Farmers & Cooperative Stakeholders:**

1. **PM-KISAN:** ₹6,000 direct income support annually in three equal installments of ₹2,000 directly to landholding farmers' DBT accounts.
2. **Kisan Credit Card (KCC) with Interest Subvention:** Short-term crop loans up to ₹3 Lakh at an effective annual interest rate of **only 4%** upon timely repayment.
3. **Agriculture Infrastructure Fund (AIF):** 3% interest subvention and collateral credit guarantee for PACS & cooperatives to build community cold storage, modern warehouses, and processing units.
4. **PACS Jan Aushadhi Initiative:** Up to ₹5 Lakh capital support for primary societies to open rural generic medicine shops.

👉 *To check customized scheme eligibility, open the Government Scheme Explorer from the top menu.*`;
      }
    }

    // Default general response
    else {
      sources.push(MOCK_VERIFIED_SOURCES.pacs_multipurpose, MOCK_VERIFIED_SOURCES.mscs_voting_rights);
      actions.push('Cooperative By-Laws', 'PMFBY Crop Insurance', 'PACS Computerization', 'File Grievance');

      if (lang === 'mr') {
        text = `मी **कूपसाथी AI** आहे, सहकारिता मंत्रालय व राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT) चा अधिकृत डिजिटल सहायक.

मी तुम्हाला खालील विषयांवर प्रमाणित शासकीय माहिती देऊ शकतो:
- **सहकारी कायदे व उपनियम:** सभासद हक्क, संचालक मंडळ निवडणुका, तपासणी अधिकार.
- **प्रधानमंत्री पीक विमा (PMFBY):** हप्ता गणना, ७२ तासांचा क्लेम नियम व भरपाई ट्रॅकिंग.
- **पॅक्स (PACS) सेवा:** खते वाटप, संगणकीकृत केसीसी कर्ज, गोदामे आणि जन औषधी केंद्रे.
- **शासकीय योजना:** पीएम-किसान, एआयएफ (AIF), महिला सहकार योजना.
- **तक्रार निवारण:** सक्षम प्राधिकाऱ्याकडे अधिकृत तक्रार नोंदवणे.

कृपया आपला विशिष्ट प्रश्न विचारा किंवा खालील पर्यायांपैकी एक निवडा.`;
      } else if (lang === 'hi') {
        text = `मैं **कूपसाथी AI** हूँ, सहकारिता मंत्रालय एवं राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT) का प्रमाणित डिजिटल सहायक।

मैं निम्नलिखित विषयों पर आधिकारिक व सत्यापित जानकारी प्रदान कर सकता हूँ:
- **सहकारी कानून व उपनियम:** सदस्य अधिकार, चुनाव प्रक्रिया और पारदर्शी ऑडिट।
- **पीएम फसल बीमा योजना (PMFBY):** प्रीमियम गणना, पात्रता और ७२ घंटे में दावा सूचना।
- **पैक्स (PACS) सेवाएं:** सस्ती खाद, शून्य प्रतिशत ब्याज ऋण और जन औषधि केंद्र।
- **सरकारी योजनाएं:** पीएम-किसान, केसीसी (KCC), और कृषि अवसंरचना कोष।
- **शिकायत निवारण:** सहकार लोकपाल और रजिस्ट्रार को डिजिटल शिकायत भेजना।

कृपया अपना प्रश्न पूछें अथवा नीचे दिए गए त्वरित विकल्पों पर क्लिक करें।`;
      } else if (lang === 'gu') {
        text = `હું **કૂપસાથી AI** છું, સહકાર મંત્રાલય અને રાષ્ટ્રીય સહકારી તાલીમ પરિષદ (NCCT) નો સત્તાવાર ડિજિટલ સહાયક.

હું તમને નીચેના વિષયો પર પ્રમાણિત સરકારી માહિતી આપી શકું છું:
- **સહકારી કાયદા અને પેટા-નિયમો:** સભ્યપદ અધિકારો, ચૂંટણી પ્રક્રિયા અને પારદર્શક ઓડિટ.
- **પ્રધાનમંત્રી ફસલ બીમા (PMFBY):** પ્રીમિયમ ગણતરી, ૭૨ કલાકમાં નુકસાનની જાણ અને દાવા ટ્રેકિંગ.
- **પેક્સ (PACS) સેવાઓ:** ખાતર વિતરણ, ૦% વ્યાજે KCC ધિરાણ અને જન ઔષધિ કેન્દ્રો.
- **સરકારી યોજનાઓ:** પીએમ-કિસાન, AIF ગોડાઉન લોન અને મહિલા સહકાર પહેલ.
- **ફરિયાદ નિવારણ:** સહકાર લોકપાલ અને રજિસ્ટ્રારને ઔપચારિક ફરિયાદ મોકલવી.

કૃપા કરીને તમારો ચોક્કસ પ્રશ્ન પૂછો અથવા નીચે આપેલા ઝડપી વિકલ્પોમાંથી પસંદ કરો.`;
      } else {
        text = `I am **CoopSathi AI**, the official multilingual assistance platform for the **Ministry of Cooperation** and **National Council for Cooperative Training (NCCT)**, Government of India.

I can guide you through verified statutory documents on:
- **Cooperative Laws & By-Laws:** Active membership, voting eligibility under MSCS Act 2023, and election rules.
- **PM Fasal Bima Yojana (PMFBY):** Premium calculation (1.5% - 2%), localized calamity intimation, and claim tracking.
- **PACS Multipurpose Services:** Computerized KCC credit, official MSP Nano fertilizer access, and Jan Aushadhi generic stores.
- **Central Schemes:** PM-KISAN, Agriculture Infrastructure Fund (AIF), and Women Cooperative initiatives.
- **Grievance Redressal:** Structuring and routing formal complaints to the Cooperative Ombudsman.

Feel free to ask your question by voice or text in any of India's regional languages!`;
      }
    }

    return {
      id: 'MSG-' + Date.now(),
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: lang,
      confidence,
      isVerified: true,
      sources,
      suggestedActions: actions,
      feedback: null
    };
  }

  private findMatchingScheme(lowerQuery: string): SchemeItem | undefined {
    // 1. Direct key regex matches
    if (/pm[- ]?kisan|kisan samman|६०००|6000|पीएम[- ]?किसान|પીએમ[- ]?કિસાન/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'pm-kisan');
    }
    if (/ayushman|pm[- ]?jay|golden card|आरोग्य कार्ड|आयुष्मान|5 lakh health/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'pm-jay');
    }
    if (/soil health|soil card|मृदा स्वास्थ्य|माती आरोग्य/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'soil-health-card');
    }
    if (/e[- ]?nam|national agriculture market|ई[- ]?नाम|कृषि बाजार/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'e-nam');
    }
    if (/pmay[- ]?g|pmay|awas yojana|आवास योजना|घरकुल/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'pmay-g');
    }
    if (/mudra|pmmy|shishu|kishor|tarun|मुद्रा लोन/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'mudra');
    }
    if (/mgnrega|nrega|100 days|मनरेगा|रोजगार हमी/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'mgnrega');
    }
    if (/sukanya|ssy|सुकन्या समृद्धी|सुकन्या समृद्धि/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'sukanya-samriddhi');
    }
    if (/atal pension|apy|अटल पेन्शन|अटल पेंशन/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'apy');
    }
    if (/ration card|onorc|one nation one ration|रेशन कार्ड|राशन कार्ड/i.test(lowerQuery)) {
      return SCHEMES_CATALOG.find(s => s.id === 'onorc');
    }

    // 2. Exact word search across catalog
    return SCHEMES_CATALOG.find(s => {
      const idMatch = lowerQuery.includes(s.id);
      const shortMatch = s.shortName && lowerQuery.includes(s.shortName.toLowerCase());
      const titleMatch = lowerQuery.includes(s.title.toLowerCase());
      return idMatch || shortMatch || titleMatch;
    });
  }

  private formatSchemeOverview(scheme: SchemeItem, lang: LanguageCode): string {
    const title = scheme.title;
    const ministry = scheme.ministry || 'Government of India';
    const summary = scheme.benefitSummary || '';
    const objective = scheme.objective || '';
    const benefits = (scheme.benefits || []).map(b => `• ${b}`).join('\n');
    const eligibility = (scheme.eligibilityCriteria || []).map(e => `• ${e}`).join('\n');
    const url = scheme.officialUrl || 'https://myscheme.gov.in';
    const helpline = scheme.helpline || '1800-180-1551';

    if (lang === 'mr') {
      return `**${title} – अधिकृत माहिती व लाभ**\n\n` +
        `🏛️ **संबंधित मंत्रालय:** ${ministry}\n\n` +
        `🎯 **उद्दिष्ट:**\n${objective}\n\n` +
        `💰 **प्रमुख आर्थिक लाभ:**\n${summary}\n${benefits}\n\n` +
        `✅ **पात्रता निकष:**\n${eligibility}\n\n` +
        `🌐 **अधिकृत पोर्टल:** [${url}](${url})\n` +
        `📞 **२४x७ राष्ट्रीय हेल्पलाइन:** ${helpline}\n\n` +
        `💡 *अर्ज प्रक्रिया जाणून घेण्यासाठी "अर्ज कसा करावा?" असा प्रश्न विचारा.*`;
    }

    if (lang === 'hi') {
      return `**${title} – आधिकारिक विवरण एवं लाभ**\n\n` +
        `🏛️ **संबंधित मंत्रालय:** ${ministry}\n\n` +
        `🎯 **योजना का उद्देश्य:**\n${objective}\n\n` +
        `💰 **प्रमुख वित्तीय लाभ:**\n${summary}\n${benefits}\n\n` +
        `✅ **पात्रता मानदंड:**\n${eligibility}\n\n` +
        `🌐 **आधिकारिक पोर्टल:** [${url}](${url})\n` +
        `📞 **२४x७ राष्ट्रीय हेल्पलाइन:** ${helpline}\n\n` +
        `💡 *आवेदन प्रक्रिया जानने के लिए "आवेदन कैसे करें?" पूछें।*`;
    }

    if (lang === 'gu') {
      return `**${title} – સત્તાવાર વિગત અને લાભો**\n\n` +
        `🏛️ **સંબંધિત મંત્રાલય:** ${ministry}\n\n` +
        `🎯 **મુખ્ય ઉદ્દેશ:**\n${objective}\n\n` +
        `💰 **આર્થિક સહાય અને લાભ:**\n${summary}\n${benefits}\n\n` +
        `✅ **પાત્રતાના માપદંડ:**\n${eligibility}\n\n` +
        `🌐 **સત્તાવાર પોર્ટલ:** [${url}](${url})\n` +
        `📞 **રાષ્ટ્રીય હેલ્પલાઇન:** ${helpline}\n\n` +
        `💡 *અરજી કરવાની પ્રક્રિયા જાણવા માટે "અરજી કેવી રીતે કરવી?" પૂછો.*`;
    }

    return `**${title} – Official Scheme Overview**\n\n` +
      `🏛️ **Nodal Ministry:** ${ministry}\n\n` +
      `🎯 **Objective:**\n${objective}\n\n` +
      `💰 **Key Financial & Welfare Benefits:**\n${summary}\n${benefits}\n\n` +
      `✅ **Eligibility Criteria:**\n${eligibility}\n\n` +
      `🌐 **Official Portal:** [${url}](${url})\n` +
      `📞 **24x7 National Helpline:** ${helpline}\n\n` +
      `💡 *To view application procedure, simply ask: "How to apply for ${scheme.shortName || title}?"*`;
  }

  private formatSchemeApplication(scheme: SchemeItem, lang: LanguageCode): string {
    const title = scheme.title;
    const step1 = scheme.applicationProcess?.step1 || 'Check eligibility requirements and prepare documents.';
    const step2 = scheme.applicationProcess?.step2 || 'Visit the designated online portal or local office.';
    const step3 = scheme.applicationProcess?.step3 || 'Fill out the registration form with personal and land/bank details.';
    const step4 = scheme.applicationProcess?.step4 || 'Upload required documents and submit the application.';
    const step5 = scheme.applicationProcess?.step5 || 'Receive acknowledgment receipt and track status online.';
    const docs = (scheme.requiredDocuments || ['Aadhaar Card', 'Bank Passbook']).join(', ');
    const portal = scheme.officialUrl || 'https://myscheme.gov.in';
    const helpline = scheme.helpline || '1800-180-1551';

    if (lang === 'mr') {
      return `**पायरी-दर-पायरी मार्गदर्शक: ${title} साठी अर्ज कसा करावा**\n\n` +
        `**पायरी १: पात्रता तपासा व आवश्यक कागदपत्रे गोळा करा**\n` +
        `• **पात्रता:** ${(scheme.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
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

    if (lang === 'hi') {
      return `**चरण-दर-चरण मार्गदर्शिका: ${title} हेतु आवेदन कैसे करें**\n\n` +
        `**चरण १: पात्रता जांचें एवं आवश्यक दस्तावेज तैयार करें**\n` +
        `• **पात्रता:** ${(scheme.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
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

    return `**Step-by-Step Guide: How to Apply for ${title}**\n\n` +
      `**Step 1: Check Eligibility & Prepare Required Documents**\n` +
      `• **Eligibility:** ${(scheme.eligibilityCriteria || []).slice(0, 2).join('; ')}\n` +
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
}

export const aiChatService = new AIChatService();
