import { Router, Request, Response } from 'express';
import { BACKEND_GRIEVANCES } from '../data/mockData.js';

export const grievancesRouter = Router();

export const storedGrievances = [...BACKEND_GRIEVANCES];

// GET /api/grievances
grievancesRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    count: storedGrievances.length,
    grievances: storedGrievances
  });
});

// POST /api/grievances
grievancesRouter.post('/', (req: Request, res: Response) => {
  const { category, subject, description, applicantName, state = 'MH', district, phone, societyName } = req.body;

  if (!subject || !applicantName) {
    return res.status(400).json({ error: 'Subject and applicantName are required' });
  }

  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const stateCode = (state || 'IN').slice(0, 2).toUpperCase();
  const refCode = `COOP-2026-${stateCode}-${randomSuffix}`;

  const newGrievance = {
    referenceNumber: refCode,
    category: category || 'Cooperative Society Issue',
    subject,
    description: description || subject,
    applicantName,
    district: district || 'Kolhapur',
    state: state || 'Maharashtra',
    phoneNumber: phone || '+91 98000 00000',
    societyName: societyName || 'Primary Cooperative Society',
    assignedAuthority: 'District Registrar of Cooperative Societies',
    status: 'Submitted',
    submittedAt: new Date().toISOString(),
    timeline: [
      { stage: 'Submitted', date: new Date().toLocaleDateString(), completed: true, remarks: 'Registered via CoopSathi AI backend API.' },
      { stage: 'Under Review', date: 'Pending', completed: false, remarks: 'Automatic jurisdictional routing.' },
      { stage: 'Assigned to Authority', date: 'Pending', completed: false, remarks: 'Forwarding to competent registrar.' },
      { stage: 'Resolved', date: 'Pending', completed: false, remarks: 'Statutory 15-day resolution window.' }
    ]
  };

  storedGrievances.unshift(newGrievance);

  res.status(201).json({
    message: 'Grievance submitted successfully',
    record: newGrievance
  });
});
