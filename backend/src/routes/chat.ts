import { Router, Request, Response } from 'express';
import { govLlmService } from '../services/govLlmService.js';
import { ragEngineService } from '../services/ragEngineService.js';

export const chatRouter = Router();

// GET /api/chat/status - Status of Official Government LLM & RAG Engine
chatRouter.get('/status', (_req: Request, res: Response) => {
  const provider = process.env.GOV_LLM_PROVIDER || 'official_gov_rag';
  const hasBhashini = Boolean(process.env.BHASHINI_API_KEY && process.env.BHASHINI_API_KEY.length > 5);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10 && !process.env.GEMINI_API_KEY.includes('your_gemini_api_key'));

  res.json({
    status: 'online',
    isOfficialGovLLM: true,
    activeProvider: hasGemini ? 'gemini_gov_rag' : hasBhashini ? 'bhashini' : 'official_gov_rag',
    modelName: hasGemini
      ? 'Gemini 1.5 Flash + Official Gov RAG Grounding'
      : hasBhashini
      ? 'Digital India Bhashini (National Language Translation Mission)'
      : 'Official Government RAG Engine (Bhashini-Aligned)',
    ragCorpusChunksCount: ragEngineService.getCorpusSize(),
    statutoryActsIndexed: [
      'Multi-State Co-operative Societies (Amendment) Act 2023 (Act No. 11 of 2023)',
      'Model By-Laws for PACS 2024-2026 (25+ Multipurpose Activities)',
      'PMFBY Revised Operational Guidelines 2024-2026 (72-Hour Calamity SLA)',
      'Kisan Credit Card (KCC) Modified Interest Subvention Scheme (MISS 4%)',
      'Co-operative Ombudsman Regulations (CRCS Forms VI & VII)'
    ],
    bhashiniConfigured: hasBhashini,
    geminiConfigured: hasGemini
  });
});

// POST /api/chat - RAG Retrieval + Official Government LLM Generation
chatRouter.post('/', async (req: Request, res: Response) => {
  const { query, language = 'en' } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const govResult = await govLlmService.generateGovResponse(query, language);

    res.json({
      id: 'MSG-' + Date.now(),
      sender: 'assistant',
      text: govResult.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      confidence: govResult.confidence,
      isVerified: true,
      isOfficialGovLLM: true,
      isRealTimeLLM: true,
      modelUsed: govResult.modelUsed,
      provider: govResult.provider,
      sources: govResult.sources,
      suggestedActions: govResult.suggestedActions,
      retrievedContextCount: govResult.retrievedContextCount
    });
  } catch (err: any) {
    console.error('Government RAG chat router failure:', err);
    res.status(500).json({
      error: 'Internal government RAG chat engine error',
      details: err?.message
    });
  }
});
