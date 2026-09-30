# 🤝 CoopSathi AI

> **Multilingual Cooperative Governance & Legal Assistance Platform**

[![Live Demo](https://img.shields.io/badge/Live-coopsathi.vercel.app-0A2540?style=for-the-badge&logo=vercel&logoColor=white)](https://coopsathi.vercel.app)
[![SIH 2026](https://img.shields.io/badge/SIH_2026-Prototype-FF9933?style=for-the-badge)](https://www.sih.gov.in)
[![Team](https://img.shields.io/badge/Team-HexYZ-138808?style=for-the-badge)]()

**⚠️ DISCLAIMER: This is a Smart India Hackathon (SIH) 2026 prototype built by Team HexYZ. It is NOT an official service of the Ministry of Cooperation, NCCT, or the Government of India. The legal citations, schemes, and statutory data presented are for demonstration purposes only.**

**CoopSathi AI** is an AI-powered platform prototype that envisions making India's cooperative sector accessible to every citizen — across languages, literacy levels, and devices. It provides instant access to **93 government welfare schemes**, statutory acts, crop insurance tools, and cooperative services through an intelligent multilingual interface.

---

## ✨ Key Features & Roadmap

| Feature | Status | Description |
|:---|:---|:---|
| 🤖 **AI Chat Assistant** | Implemented | Conversational AI grounded in statutory databases with verified citations (Demo uses simulated client-side fallback) |
| 📋 **93 Government Schemes** | Implemented | Catalog with eligibility, benefits, application steps, and guided flows |
| 🌐 **7 Indian Languages** | Implemented | Full UI & scheme translations (English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali) |
| 🌾 **PMFBY Crop Insurance** | Implemented | Premium calculator, claim intimation workflows, and district-wise crop data |
| ⚖️ **Cooperative Laws** | Implemented | Searchable MSCS Act 2023 sections, Model By-Laws |
| 🏘️ **PACS Services** | Roadmap | Digitized operations for Primary Agricultural Credit Societies |
| 📊 **Live Telemetry** | Simulated | Dashboards for scheme utilization and financial metrics (Mock data for prototype) |
| 🛡️ **Ombudsman Portal** | Roadmap | Cooperative grievance redressal with Forms VI & VII and CPGRAMS routing |
| 🔄 **Portal Sync** | Roadmap | Real-time sync with central government portals |

---

## 🏗️ Architecture vs Deployment

**IMPORTANT DEPLOYMENT NOTE:** The live Vercel demo (`coopsathi.vercel.app`) serves the **Frontend UI only** with simulated client-side chat fallbacks and mock data. To experience the true hybrid RAG architecture (Supabase + Vector Store, Gemini, Bhashini), you must run the backend services locally as outlined in the setup steps.

```mermaid
flowchart TD
    Client[Frontend UI (React/Vite)] --> |HTTP Requests| Gateway[Node.js / Express Backend]
    Client --> |Client-side Mock| MockData[Simulated Data Fallback]
    
    Gateway --> RAG[LangChain RAG Engine (Python)]
    Gateway --> LLM[Google Gemini 2.5 Flash]
    Gateway --> NMT[Bhashini Translation API]
    
    RAG --> DB[(Supabase PostgreSQL + pgvector)]
    RAG --> Llama[Groq LLaMA 3]
```

### Full Tech Stack

| Layer | Technologies |
|:---|:---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS |
| **Backend (Primary)** | Node.js 20+, Express, TypeScript |
| **Backend (ML Pipeline)** | Python, FastAPI, LangChain, Supabase pgvector |
| **AI / LLM** | Google Gemini 2.5 Flash, Groq LLaMA 3 |
| **Translation** | Digital India Bhashini Dhruva NMT (22 Indian languages) |
| **Database** | Supabase (PostgreSQL + pgvector) |
| **Deployment** | Vercel (frontend static demo) |

---

## 🚀 Local Development Setup

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
# Backend (Required for LLM and Translation)
cp backend/.env.example backend/.env
# Add your GEMINI_API_KEY, BHASHINI keys, etc.

# Python backend (Required for Vector DB)
cp python-backend/.env.example python-backend/.env
# Add your SUPABASE_URL, GROQ_API_KEY, etc.
```

### 3. Install Dependencies & Run

```bash
# Start both frontend (port 5173) and backend (port 5000) together:
npm install
npm run dev
```

### 4. Open in Browser

```
http://localhost:5173
```

---

## 📡 Backend API Reference

*Note: These endpoints require the local Node.js backend to be running.*

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

## ⚖️ Legal Disclaimer

The statutory content (e.g., MSCS Act 2023 Sections 29, 45, 85, 106, Model By-Laws) provided by this prototype is based on public demonstration datasets. It is **not** legally verified and should not be used as official legal counsel. 

---

## 👥 Team HexYZ

Built with ❤️ for **Smart India Hackathon 2026**.

## 📄 License

This project is a prototype built for SIH 2026. All rights reserved by Team HexYZ.
