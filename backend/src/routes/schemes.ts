import { Router, Request, Response } from 'express';
import { BACKEND_SCHEMES } from '../data/mockData.js';

export const schemesRouter = Router();

// GET /api/schemes?category=...&search=...
schemesRouter.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;

  let results = [...BACKEND_SCHEMES];

  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.ministry.toLowerCase().includes(q)
    );
  }

  res.json({
    total: results.length,
    schemes: results
  });
});

// GET /api/schemes/:id
schemesRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const scheme = BACKEND_SCHEMES.find(s => s.id === id);

  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }

  res.json(scheme);
});
