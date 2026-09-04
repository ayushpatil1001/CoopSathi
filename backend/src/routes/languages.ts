import { Router, Request, Response } from 'express';
import { BACKEND_LANGUAGES } from '../data/mockData.js';

export const languagesRouter = Router();

languagesRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    supportedCount: BACKEND_LANGUAGES.length,
    languages: BACKEND_LANGUAGES
  });
});
