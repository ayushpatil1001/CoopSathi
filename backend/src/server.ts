import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { chatRouter } from './routes/chat.js';
import { schemesRouter } from './routes/schemes.js';
import { pmfbyRouter } from './routes/pmfby.js';
import { grievancesRouter } from './routes/grievances.js';
import { statusRouter } from './routes/status.js';
import { languagesRouter } from './routes/languages.js';
import { documentsRouter } from './routes/documents.js';
import { realTimeGovRouter } from './routes/realTimeGovRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/schemes', schemesRouter);
app.use('/api/pmfby', pmfbyRouter);
app.use('/api/grievances', grievancesRouter);
app.use('/api/track-status', statusRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/realtime', realTimeGovRouter);

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CoopSathi AI API Gateway',
    version: '1.0.0',
    ministry: 'Ministry of Cooperation & NCCT, GoI',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🏛️  CoopSathi AI Backend Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat API:     http://localhost:${PORT}/api/chat`);
  console.log(`🌾 Schemes API:  http://localhost:${PORT}/api/schemes`);
  console.log(`======================================================\n`);
});
