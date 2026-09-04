import { Router, Request, Response } from 'express';
import { realTimeGovDataService } from '../services/realTimeGovDataService.js';
import { BACKEND_SCHEMES } from '../data/mockData.js';

export const realTimeGovRouter = Router();

// GET /api/realtime/summary
realTimeGovRouter.get('/summary', (_req: Request, res: Response) => {
  const summary = realTimeGovDataService.getSummary();
  res.json(summary);
});

// GET /api/realtime/laws
realTimeGovRouter.get('/laws', (_req: Request, res: Response) => {
  const laws = realTimeGovDataService.getLaws();
  res.json({
    totalActs: laws.length,
    laws
  });
});

// GET /api/realtime/schemes
realTimeGovRouter.get('/schemes', (_req: Request, res: Response) => {
  res.json({
    total: BACKEND_SCHEMES.length,
    lastVerified: '2026-09-03',
    schemes: BACKEND_SCHEMES
  });
});

// GET /api/realtime/pacs
realTimeGovRouter.get('/pacs', (_req: Request, res: Response) => {
  const pacs = realTimeGovDataService.getPacsData();
  res.json(pacs);
});

// GET /api/realtime/pmfby
realTimeGovRouter.get('/pmfby', (_req: Request, res: Response) => {
  const pmfby = realTimeGovDataService.getPmfbyData();
  res.json(pmfby);
});

// GET /api/realtime/financial-literacy
realTimeGovRouter.get('/financial-literacy', (_req: Request, res: Response) => {
  const financial = realTimeGovDataService.getFinancialLiteracyData();
  res.json({
    totalInitiatives: financial.length,
    initiatives: financial
  });
});

// GET /api/realtime/grievances
realTimeGovRouter.get('/grievances', (_req: Request, res: Response) => {
  const grievances = realTimeGovDataService.getGrievanceData();
  res.json({
    totalFrameworks: grievances.length,
    frameworks: grievances
  });
});

// POST /api/realtime/sync
realTimeGovRouter.post('/sync', (_req: Request, res: Response) => {
  const result = realTimeGovDataService.syncWithGovPortals();
  res.json(result);
});
