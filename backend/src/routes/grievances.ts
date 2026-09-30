import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { BACKEND_GRIEVANCES } from '../data/mockData.js';
import { fileURLToPath } from 'url';

export const grievancesRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '..', 'data', 'grievancesDB.json');

// Initialize local DB file
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(BACKEND_GRIEVANCES, null, 2));
}

export function getGrievances() {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveGrievances(data: any[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET /api/grievances
grievancesRouter.get('/', (_req: Request, res: Response) => {
  const stored = getGrievances();
  res.json({
    count: stored.length,
    grievances: stored
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
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
    timeline: [
      { stage: 'Submitted', date: new Date().toLocaleDateString(), completed: true, remarks: 'Registered via CoopSathi AI backend API.' },
      { stage: 'Under Review', date: 'Pending', completed: false, remarks: 'Automatic jurisdictional routing.' },
      { stage: 'Assigned to Authority', date: 'Pending', completed: false, remarks: 'Forwarding to competent registrar.' },
      { stage: 'Resolved', date: 'Pending', completed: false, remarks: 'Statutory 15-day resolution window.' }
    ]
  };

  const stored = getGrievances();
  stored.unshift(newGrievance);
  saveGrievances(stored);

  res.status(201).json({
    message: 'Grievance submitted successfully',
    record: newGrievance
  });
});

// PATCH /api/grievances/:id/status
grievancesRouter.patch('/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Status is required' });

  const stored = getGrievances();
  const index = stored.findIndex((g: any) => g.referenceNumber === req.params.id);
  
  if (index === -1) return res.status(404).json({ error: 'Grievance not found' });
  
  stored[index].status = status;
  saveGrievances(stored);

  res.json({ message: 'Status updated', record: stored[index] });
});

// GET /api/grievances/:id
grievancesRouter.get('/:id', (req: Request, res: Response) => {
  const stored = getGrievances();
  const grievance = stored.find((g: any) => g.referenceNumber === req.params.id);
  
  if (!grievance) return res.status(404).json({ error: 'Grievance not found' });
  
  res.json({ record: grievance });
});
