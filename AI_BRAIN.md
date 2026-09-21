# AI BRAIN - Durable Project Memory

## Project Overview
- **Name**: CoopSathi AI
- **Domain**: Official Legal, Statutory & Welfare Knowledge Platform for the Ministry of Cooperation & National Council for Cooperative Training (NCCT), Government of India.
- **Production URL**: `https://coopsathi.vercel.app`

## Tech Stack & Architecture
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router v6. Deployed on Vercel.
- **Backend (Node.js)**: Node.js 20+, Express, TypeScript. Handles Statutory RAG, LLM synthesis, scheme queries, and security middleware. Port: 5000.
- **Backend (Python)**: FastAPI, LangChain, Supabase, Groq (LLaMA 3), Bhashini ASR/TTS. Port: 8000.
- **LLM & Language Engines**:
  1. Google Gemini (`gemini-2.5-flash`) grounded with statutory RAG context.
  2. Digital India Bhashini Dhruva NMT (`https://dhruva-api.bhashini.gov.in/services/inference/pipeline`).
  3. Sovereign Statutory RAG Neural Engine (built-in fallback).

## Key File Locations
- **Backend Entry & Routing**:
  - `backend/src/index.ts`: Express app entry point.
  - `backend/src/routes/chat.ts`: `/api/chat` (inquiry), `/api/chat/status` (health/provider status).
  - `backend/src/routes/schemes.ts`: `/api/schemes` (listing, search, sync).
  - `backend/src/middleware/security.ts`: CORS whitelist (`https://coopsathi.vercel.app` + dev ports), CSP headers.
- **Backend Services & Data**:
  - `backend/src/services/govLlmService.ts`: Core orchestrator for Gemini 2.5 Flash, Bhashini Dhruva NMT, Sovereign RAG, 5-step application guides, greetings, and out-of-domain filtering.
  - `backend/src/services/ragEngineService.ts`: In-memory keyword/alias RAG retriever with statutory penalty/boost scoring.
  - `backend/src/data/schemesDatabase.json`: Master database of 93 government schemes.
  - `backend/src/data/statutoryDatabase.json`: Official acts (MSCS Act 2023, Model By-Laws, PMFBY, KCC MISS).
- **Frontend Core**:
  - `frontend/src/pages/Home.tsx`: Hero, Institutional Leadership, Core Pillars, Statistics.
  - `frontend/src/pages/Schemes.tsx`: 93 government schemes catalog, dynamic multilingual filter, sort, and detail modals.
  - `frontend/src/utils/schemeLocalization.ts`: Dynamic regional language localizer for all 93 schemes, 14 sectors, 48 ministries, and 24 beneficiaries.
  - `frontend/src/data/schemesTranslations.json`: Complete multilingual database covering all 93 schemes across 6 Indian regional languages (hi, mr, gu, ta, te, bn).
  - `frontend/src/data/translations.ts`: Master multilingual UI dictionaries (English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali).
  - `frontend/src/components/chat/ChatInterface.tsx`: Chat window, multi-lingual language selector.
  - `frontend/src/data/schemesCatalog.ts`: Client-side scheme definitions (matches backend DB).
  - `frontend/public/images/leadership/`: Photos of Amit Shah, Murlidhar Mohol, Ashish Bhutani.
- **Environment Files**:
  - `backend/.env`: `GEMINI_API_KEY`, `GEMINI_MODEL=gemini-2.5-flash`, `GOV_LLM_PROVIDER`, `BHASHINI_UDYAT_KEY`, `BHASHINI_INFERENCE_KEY`, `BHASHINI_USER_ID`, `ALLOWED_ORIGINS`.
  - `python-backend/.env`: `SUPABASE_URL`, `SUPABASE_KEY`, `GROQ_API_KEY`, `BHASHINI_*`.

## Architectural Decisions & Constraints
1. **CORS Security**: Backend strictly allows `https://coopsathi.vercel.app` (and local `localhost:5173`/`localhost:3000` during development).
2. **Mandatory 5-Step Application Guidance**: Any query matching `isHowToApply` (including "how to get", "how to apply", regional queries like "अर्ज कसा करावा") MUST return a numbered 5-step application guide with official portals, KYC documents, and SLAs.
3. **Bhashini Two-Key Model**:
   - `BHASHINI_UDYAT_KEY`: Model/pipeline discovery.
   - `BHASHINI_INFERENCE_KEY`: Dhruva compute authorization header.
4. **Resilient Failover**: Gemini rate limits (429) or timeouts fail over smoothly to Bhashini Dhruva or Sovereign Gov-RAG synthesizer without erroring out.
5. **No Visual Clutter**: Top header "Skip to main Content", font resizing controls, and high-contrast toggle have been removed per design review.
6. **Unified Multilingual Reactivity**: All portal pages (including `/schemes`, cards, modals, and telemetry banner) must consume `LanguageContext` (`useLanguage()`) so language switches in the top navbar immediately re-render the UI without page reload.

## Current Project Status
- Both frontend (`tsc -b && vite build`) and backend (`tsc`) pass build validation with code 0.
- All 48 automated schemes multilingual integration tests verified passing across all 7 languages (558/558 scheme checks).
- Live servers running: Node.js Express backend (port 5000) and Vite frontend (port 5173).
- 100% of all 93 scheme feature cards, detail modals, 14 sectors, 48 ministries, 24 beneficiary tags, and telemetry indicators are fully translated and reactively switch across Hindi, Marathi, Gujarati, Tamil, Telugu, and Bengali.
