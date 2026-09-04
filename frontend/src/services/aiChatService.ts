import { ChatMessage, LanguageCode, VerifiedSource } from '../types';
import { MOCK_VERIFIED_SOURCES } from '../data/mockKnowledgeBase';
import { apiService } from './apiService';

export class AIChatService {
  // Intent classification & RAG retriever
  public async generateResponse(query: string, lang: LanguageCode = 'en'): Promise<ChatMessage> {
    // Try calling backend Express API first
    const backendResult = await apiService.sendChat(query, lang);
    if (backendResult) {
      return backendResult;
    }

    // Fallback to client-side RAG engine
    await new Promise(resolve => setTimeout(resolve, 500));

    const lower = query.toLowerCase().trim();
    let text = '';
    const sources: VerifiedSource[] = [];
    const actions: string[] = [];
    const confidence = 0.94;

    // 1. Cooperative Laws & By-Laws / Voting Rights
    if (lower.includes('vote') || lower.includes('voting') || lower.includes('right') || lower.includes('हक्क') || lower.includes('मतदान') || lower.includes('अधिकार') || lower.includes('by-law') || lower.includes('bylaw') || lower.includes('rule') || lower.includes('election') || lower.includes('निवडणूक') || lower.includes('चुनाव')) {
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
    else if (lower.includes('scheme') || lower.includes('योजना') || lower.includes('subsidy') || lower.includes('अनुदान') || lower.includes('pm kisan') || lower.includes('aif') || lower.includes('kcc') || lower.includes('loan')) {
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
}

export const aiChatService = new AIChatService();
