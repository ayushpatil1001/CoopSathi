# CoopSathi AI – Multilingual Cooperative Governance & Legal Assistance Platform

Ministry of Cooperation and National Council for Cooperative Training (NCCT), Government of India.

Tagline: **“Cooperation Made Simple. Information Made Accessible.”**

---

## Project Structure

```
Govern/
├── package.json              # Root orchestrator scripts
├── README.md
├── frontend/                 # React + Vite + Tailwind CSS Frontend Application
│   ├── src/
│   │   ├── components/       # Common, Home, Chat, PMFBY, Schemes, Grievance, Admin, PACS
│   │   ├── data/             # Laws, By-laws, Schemes, PMFBY rates, Translations
│   │   ├── services/         # aiChatService, apiService, speechService, storageService
│   │   └── types/            # TypeScript interfaces
│   ├── public/               # Favicon & assets
│   ├── vite.config.ts        # Proxy to http://localhost:5000 for /api
│   ├── tailwind.config.js    # Gov-tech colors (Deep Blue, India Green, Saffron)
│   └── package.json
│
└── backend/                  # Node.js + Express + TypeScript Backend Server
    ├── src/
    │   ├── server.ts         # Express server on port 5000
    │   ├── routes/           # /api/chat, /api/schemes, /api/pmfby, /api/grievances, /api/track-status, /api/languages, /api/documents
    │   └── data/             # Statutory acts, scheme repositories, and mock data
    ├── tsconfig.json
    └── package.json
```

---

## How to Run

### 1. Start the Backend API Server (Port 5000)
```bash
cd backend
npm install
npm run dev
```
Health Check: `http://localhost:5000/api/health`

### 2. Start the Frontend Application (Port 5173)
```bash
cd frontend
npm install
npm run dev
```
Open: `http://localhost:5173`

---

## API Endpoints Implemented

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | AI intent detection, RAG retrieval, verified citations |
| `GET` | `/api/schemes` | Central and state welfare schemes with category & query filters |
| `POST` | `/api/pmfby/calculate` | Crop insurance premium, sum insured, and subsidy math |
| `GET` | `/api/pmfby/states` | States, districts, and crop catalogs |
| `GET` | `/api/grievances` | List of registered grievances |
| `POST` | `/api/grievances` | Submit structured grievance with unique reference ID generation |
| `GET` | `/api/track-status/:ref` | Real-time 4-stage lifecycle timeline lookup |
| `GET` | `/api/languages` | Supported Indian languages (EN, HI, MR, TA, TE, BN) |
| `GET` | `/api/documents` | Knowledge base statutory acts & model by-laws |
| `POST` | `/api/documents` | Upload & index new gazette circular into RAG vector repository |
| `GET` | `/api/realtime/summary` | Real-time government summary, last sync timestamp, connected portals, and national metrics |
| `GET` | `/api/realtime/laws` | Statutory acts (MSCS Act 2023, Sections 29, 45, 85, 106, Model By-Laws 2026) |
| `GET` | `/api/realtime/schemes` | Verified schemes with live budget outlays and portal links |
| `GET` | `/api/realtime/pacs` | 79,630 PACS mission metrics (63,686 onboarded, 54,707 e-PACS, 51.58 Cr txns) |
| `GET` | `/api/realtime/pmfby` | ₹12,200 Cr PMFBY data, YES-TECH, WINDS, and CROPIC satellite tech |
| `GET` | `/api/realtime/financial-literacy` | 4% KCC Interest Subvention Scheme (MISS), prompt repayment rules, AIF loans |
| `GET` | `/api/realtime/grievances` | Cooperative Ombudsman powers, Forms VI & VII, and CPGRAMS portal routing |
| `POST` | `/api/realtime/sync` | Trigger instant re-synchronization with central government portals |
