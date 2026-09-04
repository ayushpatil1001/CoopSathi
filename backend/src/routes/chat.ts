import { Router, Request, Response } from 'express';
import { BACKEND_VERIFIED_SOURCES } from '../data/mockData.js';

export const chatRouter = Router();

chatRouter.post('/', async (req: Request, res: Response) => {
  const { query, language = 'en' } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const lower = query.toLowerCase();
  let text = '';
  const sources = [];
  const actions = [];

  if (lower.includes('vote') || lower.includes('right') || lower.includes('हक्क') || lower.includes('मतदान') || lower.includes('election')) {
    sources.push(BACKEND_VERIFIED_SOURCES.mscs_voting_rights);
    actions.push('View MSCS Act 2023 Summary', 'File Grievance on Voting Denial', 'Check Active Member Checklist');
    if (language === 'mr') {
      text = `**सहकारी संस्थेतील सभासदांचे मतदानाचे हक्क (MSCS Act २०२३):**\n१. कलम २९ नुसार मागील किमान ३ सलग वार्षिक सर्वसाधारण सभांना (AGM) हजेरी आवश्यक आहे.\n२. उपविधीनुसार संस्थेच्या किमान सेवांचा लाभ घेतलेला असावा.`;
    } else if (language === 'hi') {
      text = `**सहकारी समिति में सदस्य मतदान अधिकार (MSCS Act २०२३):**\n१. धारा २९ के अनुसार सदस्य को पिछले ३ वार्षिक आम बैठकों में उपस्थित रहना अनिवार्य है।\n२. उपनियमों के अनुसार न्यूनतम सेवाओं का उपयोग किया गया हो।`;
    } else {
      text = `**Cooperative Member Rights & Voting Regulations (MSCS Act 2023):**\n1. Under Section 29, members must attend at least 3 consecutive AGMs to qualify for voting rights.\n2. Members must have utilized the minimum prescribed economic services of the society.`;
    }
  } else if (lower.includes('pmfby') || lower.includes('crop') || lower.includes('insurance') || lower.includes('विमा') || lower.includes('पीक') || lower.includes('claim')) {
    sources.push(BACKEND_VERIFIED_SOURCES.pmfby_claim_intimation);
    actions.push('Calculate Premium Online', '72-Hour Claim Guide', 'Track Insurance Claim');
    if (language === 'mr') {
      text = `**प्रधानमंत्री पीक विमा योजना (PMFBY):**\n१. शेतकरी हप्ता: खरीप २%, रब्बी १.५%, बागायती ५%.\n२. आपत्तीनंतर ७२ तासांच्या आत Crop Insurance App वरून किंवा १४४४७ वर क्लेम नोंदवणे अनिवार्य आहे.`;
    } else {
      text = `**Pradhan Mantri Fasal Bima Yojana (PMFBY) Guidance:**\n1. Subsidized farmer premium: 2% for Kharif, 1.5% for Rabi, and 5% for horticultural crops.\n2. Localized crop loss MUST be reported within 72 hours via the Crop Insurance App or toll-free 14447.`;
    }
  } else if (lower.includes('pacs') || lower.includes('पैक्स') || lower.includes('पॅक्स') || lower.includes('fertilizer') || lower.includes('खत')) {
    sources.push(BACKEND_VERIFIED_SOURCES.pacs_multipurpose);
    actions.push('Explore PACS Multi-Services', 'Check Nano Fertilizer Quota', 'KCC Loan via PACS');
    text = `**Primary Agricultural Credit Societies (PACS) – Modern Services:**\nUnder Ministry Model By-Laws, PACS now provide 25+ citizen services including Jan Aushadhi generic medicines, drone rentals, and computerized KCC credit directly linked to DCCBs.`;
  } else {
    sources.push(BACKEND_VERIFIED_SOURCES.pacs_multipurpose);
    actions.push('Cooperative By-Laws', 'PMFBY Crop Insurance', 'PACS Computerization', 'File Grievance');
    text = `Namaste! I am CoopSathi AI, your assistant for the Ministry of Cooperation & NCCT. I can provide official statutory guidance on cooperative laws, PMFBY crop insurance, PACS services, and grievance redressal.`;
  }

  res.json({
    id: 'MSG-' + Date.now(),
    sender: 'assistant',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    language,
    confidence: 0.96,
    isVerified: true,
    sources,
    suggestedActions: actions
  });
});
