import { Router, Request, Response } from 'express';
import { schemesSyncService } from '../services/schemesSyncService.js';

export const schemesRouter = Router();

// 1. GET /api/schemes/meta/sync-status - Daily Synchronization Status & Changelog
schemesRouter.get('/meta/sync-status', (_req: Request, res: Response) => {
  const status = schemesSyncService.getSyncStatus();
  res.json(status);
});

// 2. POST /api/schemes/sync - Trigger On-Demand / Daily Re-Sync with Official Portals
schemesRouter.post('/sync', (_req: Request, res: Response) => {
  const status = schemesSyncService.syncSchemesNow('MANUAL_SYNC');
  res.json({
    message: 'Schemes catalog synchronized successfully with official Government of India portals.',
    status,
  });
});

// 3. GET /api/schemes - Query All Schemes with Filter, Search & Sort
schemesRouter.get('/', (req: Request, res: Response) => {
  const { sector, level, beneficiary, search, sortBy, sortOrder } = req.query;

  const result = schemesSyncService.getAllSchemes({
    sector: typeof sector === 'string' ? sector : undefined,
    level: typeof level === 'string' ? level : undefined,
    beneficiary: typeof beneficiary === 'string' ? beneficiary : undefined,
    search: typeof search === 'string' ? search : undefined,
    sortBy: sortBy === 'title' || sortBy === 'sector' || sortBy === 'year' ? sortBy : 'year',
    sortOrder: sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'desc',
  });

  res.json(result);
});

// 4. GET /api/schemes/:id - Detailed Scheme Information with How to Apply & Eligibility
schemesRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const scheme = schemesSyncService.getSchemeById(id);

  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found', schemeId: id });
  }

  res.json(scheme);
});

// 5. POST /api/schemes - Add a New Government Scheme (Daily Updates / Admin)
schemesRouter.post('/', (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload || !payload.id || !payload.title || !payload.sector || !payload.ministry) {
    return res.status(400).json({ error: 'Missing required scheme fields (id, title, sector, ministry)' });
  }

  try {
    const created = schemesSyncService.addScheme(payload);
    res.status(201).json({ message: 'Scheme added successfully', scheme: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add scheme', details: err.message });
  }
});

// 6. PUT /api/schemes/:id - Update an Existing Scheme
schemesRouter.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = schemesSyncService.updateScheme(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: 'Scheme not found for update', schemeId: id });
  }

  res.json({ message: 'Scheme updated successfully', scheme: updated });
});

// 7. DELETE /api/schemes/:id - Retire / Delete a Scheme
schemesRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = schemesSyncService.deleteScheme(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Scheme not found for deletion', schemeId: id });
  }

  res.json({ message: 'Scheme retired/deleted successfully', schemeId: id });
});
