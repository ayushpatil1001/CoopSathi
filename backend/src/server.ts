import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {
  corsOptions,
  corsErrorHandler,
  helmetConfig,
  globalApiLimiter,
  chatApiLimiter,
  grievanceApiLimiter,
  sanitizeRequestMiddleware,
  secureErrorShield,
  getPermittedOrigins,
} from './middleware/security.js';

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

// Security: Disable Express fingerprinting banner
app.disable('x-powered-by');

// Security: Enable proxy trust for reverse proxies (Render, Railway, Vercel, Nginx)
app.set('trust proxy', 1);

// Security: Advanced Helmet HTTP Security Headers (CSP, HSTS, X-Content-Type-Options, etc.)
app.use(helmetConfig);

// Security: Restrict CORS strictly to https://coopsathi.vercel.app (and dev origins in development)
app.use(cors(corsOptions));
app.use(corsErrorHandler);

// Security: Strict Request Body Size Limits (Mitigate JSON/Payload Flooding DoS)
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Security: Deep Input Sanitization Middleware (Neutralize XSS/Script Injections)
app.use(sanitizeRequestMiddleware);

// Security: Global Rate Limiting across all /api routes
app.use('/api', globalApiLimiter);

// API Routes with Dedicated Route-Level Rate Limiters
app.use('/api/chat', chatApiLimiter, chatRouter);
app.use('/api/grievances', grievanceApiLimiter, grievancesRouter);
app.use('/api/schemes', schemesRouter);
app.use('/api/pmfby', pmfbyRouter);
app.use('/api/track-status', statusRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/realtime', realTimeGovRouter);

// Health Check with Security & Gateway Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CoopSathi AI API Gateway',
    version: '1.0.0',
    ministry: 'Ministry of Cooperation & NCCT, GoI',
    security: {
      enforceStrictCors: true,
      allowedOrigins: getPermittedOrigins(),
      rateLimitingActive: true,
      helmetProtection: true,
      sanitizationActive: true,
    },
    clientOrigin: req.headers.origin || 'direct/server-side',
    timestamp: new Date().toISOString(),
  });
});

// Fallback 404 handler for unmatched API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested API endpoint does not exist on CoopSathi API Gateway.',
  });
});

// Centralized Secure Error Shield Middleware
app.use(secureErrorShield);

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🏛️  CoopSathi AI Backend Server running on port ${PORT}`);
  console.log(`🔒 Security: Strict CORS locked to [${getPermittedOrigins().join(', ')}]`);
  console.log(`🛡️  Security: Helmet, Rate Limiter & Input Sanitizer active`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat API:     http://localhost:${PORT}/api/chat`);
  console.log(`🌾 Schemes API:  http://localhost:${PORT}/api/schemes`);
  console.log(`======================================================\n`);
});
