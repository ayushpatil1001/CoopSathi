# 🤝 CoopSathi AI

> **Multilingual Cooperative Governance & Legal Assistance Platform**

[![Live Demo](https://img.shields.io/badge/Live-coopsathi.vercel.app-0A2540?style=for-the-badge&logo=vercel&logoColor=white)](https://coopsathi.vercel.app)
[![SIH 2026](https://img.shields.io/badge/SIH_2026-Prototype-FF9933?style=for-the-badge)](https://www.sih.gov.in)
[![Team](https://img.shields.io/badge/Team-HexYZ-138808?style=for-the-badge)]()

> [!CAUTION]
> **This is a prototype built by Team HexYZ for Smart India Hackathon (SIH) 2026.**
> It is **not** an official service of the Ministry of Cooperation, NCCT, or the Government of India.
> All government data, scheme details, and statutory references are sourced from publicly available official documents and are included for demonstration purposes only.

---

## 💡 What is CoopSathi AI?

CoopSathi AI is an AI-powered platform that makes India's cooperative sector accessible to every citizen — across languages, literacy levels, and devices. It provides access to **93 government welfare schemes**, statutory acts, crop insurance tools, and cooperative services through an intelligent multilingual interface.

---

## ✨ Key Features

| Feature | Description |
|:---|:---|
| 🤖 **AI Chat Assistant** | Conversational AI with a client-side knowledge engine and optional backend RAG pipeline (Gemini 2.5 Flash + statutory context). Falls back gracefully when the backend is unavailable. |
| 📋 **93 Government Schemes** | Catalog with eligibility, benefits, and 5-step guided application flows sourced from public government data |
| 🌐 **7 Indian Languages** | Full UI & scheme translations in English, Hindi, Marathi, Gujarati, Tamil, Telugu, and Bengali |
| 🌾 **PMFBY Crop Insurance** | Premium calculator, claim intimation workflows, and district-wise crop data |
| ⚖️ **Cooperative Laws** | Searchable MSCS Act 2023 sections and Model By-Laws |
| 🏘️ **PACS Services** | Digitized operations dashboard for Primary Agricultural Credit Societies |
| 📊 **Reference Data Dashboards** | Curated dashboards showing cooperative sector metrics (sourced from official reports; not a live API feed) |
| 🛡️ **Ombudsman Portal** | Cooperative grievance redressal with prescribed forms and CPGRAMS routing |

---

## 🏗️ Architecture

```
CoopSathi/
├── frontend/              # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/    # UI (Chat, Schemes, PMFBY, PACS, Ombudsman, etc.)
│   │   ├── pages/         # Route pages (Home, Schemes, Laws, Chat, etc.)
│   │   ├── data/          # Translations, scheme catalog, statutory data
│   │   ├── services/      # API client, client-side AI fallback, speech
│   │   └── utils/         # Localization, SEO, helpers
│   └── public/            # Static assets
│
├── backend/               # Node.js + Express + TypeScript (runs separately)
│   ├── src/
│   │   ├── routes/        # /api/chat, /api/schemes, /api/pmfby, etc.
│   │   ├── services/      # Gemini LLM orchestrator, RAG engine, Bhashini NMT
│   │   ├── data/          # Statutory & scheme databases (curated JSON)
│   │   └── middleware/     # CORS, CSP, security headers
│   └── .env.example       # Required environment variables template
│
└── python-backend/        # (Optional) FastAPI + LangChain + Supabase pgvector
    ├── main.py            # Alternate RAG pipeline with Groq LLaMA 3
    ├── requirements.txt
    └── .env.example       # Required environment variables template
```

### Deployment Model

| Component | Deployment | Notes |
|:---|:---|:---|
| **Frontend** | Vercel (static SPA) | Deployed at [coopsathi.vercel.app](https://coopsathi.vercel.app). Includes a client-side AI knowledge engine as fallback. |
| **Backend (Express)** | Separate host / local | Not deployed on Vercel. The frontend degrades gracefully — the chat assistant uses a built-in client-side knowledge engine when the backend is unavailable. |
| **Python Backend** | Optional / local | Alternate ML pipeline for experimentation. Not required for the core demo. |

### AI Pipeline

```
User Query
    │
    ├──► Frontend tries POST /api/chat (Express backend)
    │       │
    │       ├── Gemini 2.5 Flash (grounded with statutory RAG context)
    │       ├── Bhashini Dhruva NMT (multilingual translation)
    │       └── Failover → Sovereign RAG synthesizer
    │
    └──► If backend unavailable → Client-side knowledge engine
            (pattern-matched responses from curated statutory data)
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, React Router v6 |
| **Backend (Primary)** | Node.js 20+, Express, TypeScript |
| **Backend (ML Pipeline)** | Python 3.10+, FastAPI, LangChain, Supabase pgvector |
| **AI / LLM** | Google Gemini 2.5 Flash (backend-only, key never exposed to client) |
| **Translation** | Digital India Bhashini Dhruva NMT |
| **Database** | Supabase (PostgreSQL + pgvector) — used by the Python backend |
| **Deployment** | Vercel (frontend), with HSTS, CSP, and security headers |

> [!NOTE]
> The Gemini API key is stored exclusively in `backend/.env` and is **never bundled** into the client-side JavaScript. The frontend's Content Security Policy (CSP) is configured defensively but the browser never makes direct calls to `generativelanguage.googleapis.com`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm
- Python 3.10+ *(only if running the optional ML backend)*

### 1. Clone the Repository

```bash
git clone https://github.com/ayushpatil1001/CoopSathi.git
cd CoopSathi
```

### 2. Configure Environment Variables

```bash
# Backend (required for full AI features)
cp backend/.env.example backend/.env
# Fill in: GEMINI_API_KEY, BHASHINI_UDYAT_KEY, BHASHINI_INFERENCE_KEY, etc.

# Python backend (optional)
cp python-backend/.env.example python-backend/.env
# Fill in: SUPABASE_URL, SUPABASE_KEY, GROQ_API_KEY, etc.
```

> [!TIP]
> The frontend works without any `.env` configuration. It uses the client-side AI fallback when no backend is available.

### 3. Install Dependencies & Run

```bash
# Start both frontend (port 5173) and backend (port 5000) together:
npm install
npm run dev
```

Or start them individually:

```bash
# Backend only
cd backend && npm install && npm run dev

# Frontend only (in another terminal)
cd frontend && npm install && npm run dev
```

### 4. Open in Browser

```
http://localhost:5173
```

---

## 📡 API Reference

> [!IMPORTANT]
> These endpoints are served by the Express backend (`localhost:5000`). They are **not available** on the Vercel deployment, which serves only the frontend SPA. The frontend falls back to its client-side knowledge engine when these endpoints are unreachable.

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/chat` | AI chat with Gemini + RAG retrieval & verified citations |
| `GET` | `/api/chat/status` | Backend health check and LLM provider status |
| `GET` | `/api/schemes` | 93 welfare schemes with category filters & search |
| `POST` | `/api/pmfby/calculate` | Crop insurance premium calculator |
| `GET` | `/api/pmfby/states` | States, districts, and crop catalogs |
| `GET/POST` | `/api/grievances` | Cooperative grievance submission & listing |
| `GET` | `/api/track-status/:ref` | Grievance lifecycle tracking |
| `GET` | `/api/languages` | Supported Indian languages |
| `GET` | `/api/documents` | Statutory acts & model by-laws |
| `GET` | `/api/realtime/*` | **Curated reference data** (sourced from official reports; not a live government API feed) |

---

## 🌍 Supported Languages

| Language | Script | Code |
|:---|:---|:---|
| English | Latin | `en` |
| हिन्दी (Hindi) | Devanagari | `hi` |
| मराठी (Marathi) | Devanagari | `mr` |
| ગુજરાતી (Gujarati) | Gujarati | `gu` |
| தமிழ் (Tamil) | Tamil | `ta` |
| తెలుగు (Telugu) | Telugu | `te` |
| বাংলা (Bengali) | Bengali | `bn` |

---

## ⚠️ Disclaimers

- **Not an official government service.** This is a student prototype for SIH 2026.
- **Reference data dashboards** (`/api/realtime/*`) display curated data sourced from publicly available government reports and press releases. They do not connect to live government APIs.
- **Legal references** (MSCS Act 2023, PMFBY guidelines, Model By-Laws) are included for demonstration and should be independently verified against official gazette publications for any legal purpose.
- **Portal sync** functionality shown in the UI is a simulated demonstration of the planned roadmap feature.

---

## 👥 Team HexYZ

Built with ❤️ for **Smart India Hackathon 2026**.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
