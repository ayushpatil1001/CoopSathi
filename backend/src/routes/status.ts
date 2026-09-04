import { Router, Request, Response } from 'express';
import { storedGrievances } from './grievances.js';

export const statusRouter = Router();

// GET /api/track-status/:ref
statusRouter.get('/:ref', (req: Request, res: Response) => {
  const { ref } = req.params;

  const found = storedGrievances.find(
    g => g.referenceNumber.toLowerCase() === ref.trim().toLowerCase()
  );

  if (!found) {
    return res.status(404).json({
      error: `No grievance found with reference number ${ref}`
    });
  }

  res.json(found);
});
