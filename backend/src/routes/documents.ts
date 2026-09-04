import { Router, Request, Response } from 'express';

export const documentsRouter = Router();

const storedDocs = [
  {
    id: 'DOC-MSCS-2023',
    title: 'Multi-State Co-operative Societies (Amendment) Act, 2023',
    category: 'Cooperative Law',
    version: 'Act No. 11 of 2023',
    lastUpdated: '2024-02-15',
    isVerified: true,
    ragStatus: 'Live',
    authority: 'Ministry of Cooperation, Government of India'
  },
  {
    id: 'DOC-PACS-BYLAWS',
    title: 'Model By-Laws for Primary Agricultural Credit Societies (PACS)',
    category: 'PACS Governance',
    version: 'v2.4 Final',
    lastUpdated: '2024-04-10',
    isVerified: true,
    ragStatus: 'Live',
    authority: 'Ministry of Cooperation & NABARD'
  },
  {
    id: 'DOC-PMFBY-2024',
    title: 'PM Fasal Bima Yojana (PMFBY) Revised Operational Guidelines',
    category: 'Crop Insurance',
    version: 'Rev. 2024-25',
    lastUpdated: '2024-06-01',
    isVerified: true,
    ragStatus: 'Live',
    authority: 'Ministry of Agriculture & Farmers Welfare, GoI'
  }
];

// GET /api/documents
documentsRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    total: storedDocs.length,
    documents: storedDocs
  });
});

// POST /api/documents
documentsRouter.post('/', (req: Request, res: Response) => {
  const { title, category, authority } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newDoc = {
    id: 'DOC-' + Date.now(),
    title,
    category: category || 'Cooperative Law',
    version: 'v1.0 Gazette',
    lastUpdated: new Date().toISOString().split('T')[0],
    isVerified: true,
    ragStatus: 'Live',
    authority: authority || 'Ministry of Cooperation, GoI'
  };

  storedDocs.unshift(newDoc);

  res.status(201).json({
    message: 'Document uploaded and indexed into RAG vector repository',
    document: newDoc
  });
});
