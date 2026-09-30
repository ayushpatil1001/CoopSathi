# 🤝 CoopSathi AI

> **Multilingual Cooperative Governance & Legal Assistance Platform**

[![Live Demo](https://img.shields.io/badge/Live-coopsathi.vercel.app-0A2540?style=for-the-badge&logo=vercel&logoColor=white)](https://coopsathi.vercel.app)
[![SIH 2026](https://img.shields.io/badge/SIH_2026-Prototype-FF9933?style=for-the-badge)](https://www.sih.gov.in)
[![Team](https://img.shields.io/badge/Team-HexYZ-138808?style=for-the-badge)]()

**CoopSathi AI** is an AI-powered platform that makes India's cooperative sector accessible to every citizen — across languages, literacy levels, and devices. It provides instant, verified access to **93 government welfare schemes**, statutory acts, crop insurance tools, and cooperative services through an intelligent multilingual interface.

Built for **Smart India Hackathon (SIH) 2026** by **Team HexYZ**.

---

## ✨ Key Features

| Feature | Description |
|:---|:---|
| 🤖 **AI Chat Assistant** | RAG-powered conversational AI grounded in statutory databases (MSCS Act 2023, PMFBY, Model By-Laws) with verified citations |
| 📋 **93 Government Schemes** | Complete catalog with eligibility, benefits, application steps, and 5-step guided application flows |
| 🌐 **7 Indian Languages** | Full UI & scheme translations in English, Hindi, Marathi, Gujarati, Tamil, Telugu, and Bengali |
| 🌾 **PMFBY Crop Insurance** | Premium calculator, claim intimation workflows, and district-wise crop data |
| ⚖️ **Cooperative Laws** | Searchable MSCS Act 2023 sections, Model By-Laws, and gazette notifications |
| 🏘️ **PACS Services** | Digitized operations for 79,630+ Primary Agricultural Credit Societies |
| 📊 **Live Telemetry** | Real-time dashboards for scheme utilization, PACS onboarding, and financial metrics |
| 🛡️ **Ombudsman Portal** | Cooperative grievance redressal with Forms VI & VII and CPGRAMS routing |

---

## 🏗️ Architecture

```
CoopSathi/
├── frontend/              # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/    # UI components (Chat, Schemes, PMFBY, PACS, etc.)
│   │   ├── pages/         # Route pages (Home, Schemes, Laws, Chat, etc.)
│   │   ├── data/          # Translations, scheme catalog, statutory data
│   │   ├── services/      # API client, speech services
│   │   └── utils/         # Localization, SEO, helpers
│   └── public/            # Static assets
│
├── backend/               # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/        # /api/chat, /api/schemes, /api/pmfby, etc.
│   │   ├── services/      # Gemini LLM, RAG engine, Bhashini NMT
│   │   ├── data/          # Statutory & scheme databases (JSON)
│   │   └── middleware/     # CORS, CSP, security headers
│   └── .env.example
│
└── python-backend/        # FastAPI + LangChain + Supabase pgvector
    ├── main.py            # RAG pipeline with Groq LLaMA 3
    └── .env.example
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, React Router v6 |
| **Backend (Primary)** | Node.js 20+, Express, TypeScript |
| **Backend (ML Pipeline)** | Python, FastAPI, LangChain, Supabase pgvector |
| **AI / LLM** | Google Gemini 2.5 Flash, Groq LLaMA 3 |
| **Translation** | Digital India Bhashini Dhruva NMT (22 Indian languages) |
| **Database** | Supabase (PostgreSQL + pgvector) |
| **Deployment** | Vercel (frontend), with HSTS, CSP, and GIGW 3.0 security headers |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm
- Python 3.10+ (for the ML backend)

### 1. Clone the Repository

```bash
git clone https://github.com/ayushpatil1001/CoopSathi.git
cd CoopSathi
```

### 2. Configure Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Add your GEMINI_API_KEY, BHASHINI keys, etc.

# Python backend (optional)
cp python-backend/.env.example python-backend/.env
# Add your SUPABASE_URL, GROQ_API_KEY, BHASHINI keys, etc.
```

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

| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/chat` | AI chat with RAG retrieval & verified citations |
| `GET` | `/api/schemes` | 93 welfare schemes with filters & search |
| `POST` | `/api/pmfby/calculate` | Crop insurance premium calculator |
| `GET` | `/api/pmfby/states` | States, districts, and crop catalogs |
| `GET/POST` | `/api/grievances` | Cooperative grievance submission & listing |
| `GET` | `/api/track-status/:ref` | Grievance status tracking |
| `GET` | `/api/languages` | Supported Indian languages |
| `GET` | `/api/documents` | Statutory acts & model by-laws |
| `GET` | `/api/realtime/*` | Live dashboards (laws, schemes, PACS, PMFBY, grievances) |
| `GET` | `/api/health` | Backend health check |

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

## 👥 Team HexYZ

Built with ❤️ for **Smart India Hackathon 2026**.

---

## 📄 License

This project is a prototype built for SIH 2026. All rights reserved by Team HexYZ.
