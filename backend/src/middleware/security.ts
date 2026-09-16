import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/**
 * Returns the list of permitted origins.
 * Primary production origin: https://coopsathi.vercel.app
 * In non-production environments, localhost origins are included for development testing.
 */
export function getPermittedOrigins(): string[] {
  const configured = (process.env.ALLOWED_ORIGINS || 'https://coopsathi.vercel.app')
    .split(',')
    .map(origin => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  const isDev = process.env.NODE_ENV !== 'production';
  const localDevOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5000',
  ];

  return isDev ? Array.from(new Set([...configured, ...localDevOrigins])) : configured;
}

/**
 * Strict CORS Configuration Whitelist
 */
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Permit non-browser calls (e.g. uptime monitors, health checks, curl)
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.replace(/\/+$/, '');
    const permitted = getPermittedOrigins();

    if (permitted.includes(cleanOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS_NOT_ALLOWED: Origin '${origin}' is not authorized to access CoopSathi API. Allowed: https://coopsathi.vercel.app`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours preflight cache
};

/**
 * Clean 403 response handler for CORS rejections
 */
export function corsErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err && typeof err.message === 'string' && err.message.startsWith('CORS_NOT_ALLOWED')) {
    return res.status(403).json({
      error: 'Forbidden: CORS policy violation',
      message: 'Access is restricted to authorized frontend origins only (https://coopsathi.vercel.app).',
      rejectedOrigin: req.headers.origin || 'unknown',
      timestamp: new Date().toISOString(),
    });
  }
  next(err);
}

/**
 * Helmet Security Header Directives
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: [
        "'self'",
        'https://coopsathi.vercel.app',
        'https://*.supabase.co',
        'https://generativelanguage.googleapis.com',
        'https://dhruva-api.bhashini.gov.in',
        'http://localhost:5000',
        'http://localhost:5173',
        'ws:',
        'wss:',
      ],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: 'sameorigin' },
  noSniff: true,
  dnsPrefetchControl: { allow: false },
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
});

/**
 * Global API Rate Limiter
 * 300 requests per 15 minutes per IP
 */
export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Global API rate limit exceeded. Please try again after 15 minutes.',
  },
});

/**
 * Dedicated Strict Rate Limiter for AI Chat (/api/chat)
 * 30 queries per 1 minute per IP (prevents LLM token flooding and DDoS)
 */
export const chatApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Rate limit exceeded',
    message: 'Too many queries submitted to CoopSathi AI. Please wait a moment before asking your next question.',
  },
});

/**
 * Dedicated Rate Limiter for Citizen Grievance Submissions (/api/grievances)
 * 20 submissions per hour per IP (prevents spam ticket floods)
 */
export const grievanceApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Rate limit exceeded',
    message: 'Maximum grievance submissions reached for this hour. Please try again later.',
  },
});

/**
 * Input Sanitization Helper: neutralizes dangerous HTML/script injection
 */
function sanitizeString(str: string): string {
  return str
    .replace(/\0/g, '') // Null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Script tags
    .replace(/javascript:/gi, '') // Javascript protocol
    .replace(/on\w+\s*=/gi, ''); // Inline DOM event handlers (onload=, onerror=, etc.)
}

function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (obj !== null && typeof obj === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }
  return obj;
}

/**
 * Deep Request Sanitization Middleware
 */
export function sanitizeRequestMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }
  next();
}

/**
 * Production Secure Error Shield
 * Prevents internal stack traces and server internals from leaking in responses
 */
export function secureErrorShield(err: any, req: Request, res: Response, _next: NextFunction) {
  const isDev = process.env.NODE_ENV !== 'production';
  console.error(`[Security Shield Error] ${req.method} ${req.originalUrl}:`, err);

  if (res.headersSent) return;

  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error: isDev ? (err.message || 'Internal Server Error') : 'An unexpected error occurred while processing your request.',
    code: err.code || 'SECURE_SERVER_ERROR',
    ...(isDev && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
}
