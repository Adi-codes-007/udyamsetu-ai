# UdyamSetu AI (उद्यमसेतु AI)

> **"One Business Profile. One Approval Roadmap. One Window."**  
> *Intelligent industrial approvals, compliance guidance, and government support orchestration for entrepreneurs.*  
> **Smart India Hackathon 2026 | Problem Statement 26130 – Industrial Approvals & Government Support**

---

## 1. Project Overview

Navigating industrial clearances in India traditionally requires entrepreneurs to decipher hundreds of regulations across multiple siloed departments (Pollution Control, Fire Safety, Factory Directorate, Electricity Distribution, Local Municipalities, Water Resources) while missing out on applicable state industrial policies and capital subsidies.

**UdyamSetu AI** solves this by shifting the paradigm from *manual multi-portal hunting* to *intelligent parameter-driven orchestration*:
1. **Unified Enterprise Profile:** The entrepreneur registers their operational scale, location, power, water, effluent, and workforce parameters once.
2. **Deterministic Regulatory Engine:** Clearances are evaluated using rule-based algorithms anchored in state acts (Water & Air Acts, Maharashtra Factories Rules 1963, Fire Prevention Act 2006, MERC Supply Code) with zero generative hallucinations.
3. **Approval Dependency Graph:** Visualizes critical-path sequencing so entrepreneurs know which approvals unblock subsequent utilities (e.g., Land Possession → Fire NOC → Factory Plan → Power Energization).
4. **Document AI & Pre-Validation:** Upload deeds, project reports, and test certificates once. The pre-validation engine flags missing engineer seals, mismatched plot numbers, or expired tenures before formal desk scrutiny.
5. **Government Support Matching:** Algorithmic scoring (100-point model) matches capital investment and local employment quotas against schemes such as the Maharashtra Package Scheme of Incentives (PSI 2025) and PM Kisan SAMPADA.
6. **Regulatory Copilot:** An auditable enterprise assistant providing grounded legal citations, reasoning, and next actions.
7. **Officer Scrutiny & Single Window Desk:** A multi-role interface enabling departmental officers to review pre-screened applications, schedule joint site visits, issue deficiency queries, and enforce Right to Public Services (RTS) SLAs.

---

## 2. Architecture & Service Boundaries

```
                    ┌────────────────────────────────────────────────────────┐
                    │                    UDYAMSETU AI                       │
                    │         Single-Window Assistance & Orchestration       │
                    └────────────────────────────────────────────────────────┘
                                                │
         ┌──────────────────────────────────────┼──────────────────────────────────────┐
         ▼                                      ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐                   ┌──────────────────┐
│  ENTREPRENEUR    │                  │  OFFICER DESK    │                   │  ADMIN ENGINE    │
│  - Dashboard     │                  │  - Queue         │                   │  - Rules Matrix  │
│  - Profile (5-st)│                  │  - 3-Col Review  │                   │  - Source Gazettes│
│  - Roadmap & Graph│                 │  - Inspections   │                   │  - Scheme Config │
│  - Document AI   │                  │  - SLA Analytics │                   │  - Telemetry     │
│  - Copilot (RAG) │                  └──────────────────┘                   └──────────────────┘
└──────────────────┘                            │                                      │
         │                                      │                                      │
         └──────────────────────────────────────┴──────────────────────────────────────┘
                                                │
                                                ▼
                            ┌──────────────────────────────────────┐
                            │        CORE ENGINES & SERVICES       │
                            ├──────────────────────────────────────┤
                            │ • /services/approvalEngine           │
                            │ • /services/documentAI (OCR & Check) │
                            │ • /services/schemeEngine (100pt Match│
                            │ • /services/rag (Grounded Copilot)   │
                            │ • /lib/store (Reactive State Hub)    │
                            └──────────────────────────────────────┘
                                                │
                                                ▼
                            ┌──────────────────────────────────────┐
                            │    DATA LAYER (PostgreSQL Ready)     │
                            │  Users, Businesses, Approvals, Docs  │
                            │  Applications, Audits, pgvector RAG  │
                            └──────────────────────────────────────┘
```

---

## 3. Technology Stack

- **Frontend & App Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling & Design System:** Tailwind CSS v4, Custom Government-Tech Design Tokens (Deep Navy `#17324D`, `#1F4E79`, Emerald `#16855B`, Amber `#D9822B`, Border `#D9E1E8`)
- **Iconography:** Lucide Icons (`lucide-react`)
- **State Management & Persistence:** React Context & Local Persistence Store with Real-Time Rule Evaluation
- **Data Models:** Comprehensive TypeScript definitions matching statutory government clearance hierarchies
- **Future Integration Hooks:** REST / FastAPI backend architecture with PostgreSQL & `pgvector` for circular semantic retrieval

---

## 4. Folder Structure

```
c:\Users\hp\Documents\130\
├── public/                     # Static assets, branding icons, and favicons
├── src/
│   ├── app/
│   │   ├── admin/              # Administrator Management Portal
│   │   │   ├── analytics/      # System health and engine telemetry
│   │   │   ├── dashboard/      # Admin central control console
│   │   │   ├── rules/          # Deterministic approval rules editor
│   │   │   ├── schemes/        # Government scheme definitions
│   │   │   ├── sources/        # Authoritative regulatory gazette registry
│   │   │   └── users/          # Role-based user directory
│   │   ├── entrepreneur/       # Industrialist / Entrepreneur Portal
│   │   │   ├── applications/   # Inter-departmental application & SLA tracker
│   │   │   ├── approval/[id]/  # Individual approval detail inspector
│   │   │   ├── approval-roadmap/# Filterable 12-clearance roadmap
│   │   │   ├── business-profile/# 5-step onboarding & parameterization wizard
│   │   │   ├── copilot/        # Grounded Regulatory Copilot AI console
│   │   │   ├── dashboard/      # Enterprise dashboard with readiness score
│   │   │   ├── dependency-graph/# Interactive dependency & critical-path graph
│   │   │   ├── documents/      # Document repository & pre-validation preview
│   │   │   │   └── ocr/        # Interactive Document OCR extraction sandbox
│   │   │   ├── notifications/  # Milestone alerts & deficiency notices
│   │   │   ├── schemes/        # Government support finder (100pt model)
│   │   │   ├── settings/       # DSC token and notification thresholds
│   │   │   └── simulator/      # What-If scenario compliance sandbox
│   │   ├── officer/            # Government Scrutiny Desk Portal
│   │   │   ├── analytics/      # Circle SLA adherence and disposal benchmarks
│   │   │   ├── applications/   # Application scrutiny queue
│   │   │   │   └── [id]/       # 3-column split desk review interface
│   │   │   ├── dashboard/      # Officer workload and 184-dossier KPI summary
│   │   │   └── inspections/    # Joint inspection calendar & field dispatch
│   │   ├── login/              # Split-view authentication & instant demo personas
│   │   ├── register/           # Entity onboarding registration
│   │   ├── globals.css         # Government-tech design tokens and utilities
│   │   ├── layout.tsx          # Root provider with global session context
│   │   └── page.tsx            # High-conversion public landing page
│   ├── components/
│   │   ├── brand/              # Abstract bridge/node Logo component
│   │   ├── layout/             # Navbar, Sidebar, and PortalLayout wrappers
│   │   └── ui/                 # StatusBadge, SlaIndicator, and data controls
│   ├── lib/
│   │   └── store.tsx           # Global state hub, seeded accounts, and actions
│   ├── services/
│   │   ├── approvalEngine.ts   # Rule evaluation matrix for clearances
│   │   ├── documentAI.ts       # Document OCR simulation & pre-validation logic
│   │   ├── rag.ts              # Grounded Regulatory Copilot query router
│   │   └── schemeEngine.ts     # 100-point weighted scheme matching model
│   └── types/
│       └── index.ts            # Enterprise TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

---

## 5. Instant Demo Credentials & Persona Navigation

For Smart India Hackathon evaluators and judges, the application provides an **Instant Persona Switcher** directly in the top navigation bar and on the login page:

| Persona | Name | Role | Access Route | Demo Credentials |
| :--- | :--- | :--- | :--- | :--- |
| **Entrepreneur** | Rahul Sharma | Managing Partner, *Shree Foods & Agro Processing* | `/entrepreneur/dashboard` | `rahul.sharma@shreefoods.in` / `••••••••` |
| **Review Officer** | Suresh Patil | Joint Director of Industries, Chhatrapati Sambhajinagar Circle | `/officer/dashboard` | `suresh.patil@maharashtra.gov.in` / `••••••••` |
| **System Admin** | Dr. Anjali Mehta | Principal Nodal Administrator, MAITRI Single Window | `/admin/dashboard` | `anjali.mehta@nic.in` / `••••••••` |

*Judges can click any demo persona button on `/login` or the top navbar at any time to switch perspective instantly without re-authenticating.*

---

## 6. How the Core Engines Work

### A. Approval Engine (`/services/approvalEngine.ts`)
The engine evaluates the enterprise profile parameters against a structured rule matrix:
- **Environmental Consents (MPCB):** If `pollutionCategory != 'White'`, requires *MPCB Consent to Establish (CTE)*. If water effluent is present, validates Effluent Treatment Plant (ETP) capacity.
- **Occupational Safety (DISH):** If `isManufacturing == true` or `constructionRequired == true` and worker projection $\ge 10$, mandates *Factory Building Plan Scrutiny* under the Factories Act 1948.
- **Fire Safety (Maharashtra Fire Services):** Enforces *Provisional Fire Safety NOC* based on plot floor area and industrial categorization.
- **High-Tension Power (MSEDCL):** If `electricityRequirementKw > 20 kW`, allocates dedicated express feeder line clearances under the MERC Supply Code 2021.
- **Groundwater (CGWA):** Evaluates sub-surface borewell consumption against notified water-stress zones.

### B. Document AI & Pre-Validation (`/services/documentAI.ts`)
Avoids premature government rejections by executing consistency checks:
- **Entity Matching:** Cross-references name on lease deeds and tax registrations against the master enterprise profile.
- **Address & Plot Validation:** Ensures survey numbers and plot coordinates match MIDC allotment records.
- **Tenure Check:** Scans lease execution and expiration dates to prevent expired deeds from being submitted.
- **Missing Seal / Endorsement Detection:** Flags absence of empanelled structural engineer seals before submission.

### C. Scheme Matching Model (`/services/schemeEngine.ts`)
Uses a 100-point weighted scoring model:
$$\text{Score} = \text{Sector}(30) + \text{Location Tier}(20) + \text{Investment Slab}(20) + \text{Employment Quota}(15) + \text{Constitution}(15)$$
- Matches against the **Maharashtra Package Scheme of Incentives (PSI 2025)** (SGST reimbursement, stamp duty exemption, power subsidies) and **PM Kisan SAMPADA Yojana**.

### D. Grounded Regulatory Copilot (`/services/rag.ts`)
Structured responses provide:
1. Direct Answer
2. Reasoning & Legal Context
3. Recommended Next Step
4. Authoritative Source Citation
5. Last Verified Timestamp

---

## 7. How to Run Locally

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### Commands

1. **Clone & Navigate:**
   ```bash
   git clone <repo-url>
   cd 130
   ```

2. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run Development Dev Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run Production Build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 8. What is Real Functionality vs. Prototype Functionality

| Capability | Real Functionality in Current Build | Prototype Mock Simulation | Future Production Enhancement |
| :--- | :--- | :--- | :--- |
| **Approval Rule Engine** | Real rule-based evaluation of parameters generating clearances, timelines, and dependencies. | Uses client-side rule matrix instead of server DB. | Migrated to PostgreSQL stored procedures or Python rule engine. |
| **Persona Switching** | Real state switching updating UI, navigation permissions, and dashboards. | Authenticated sessions stored in state context. | Keycloak / State SSO integration. |
| **Document Pre-Validation** | Real field-by-field verification (match, missing, mismatch) with UI updates. | OCR extraction simulated on local document templates. | Tesseract / AWS Textract / PaddleOCR integration. |
| **Application State Flow** | Real status updates when officers Approve, Raise Query, or Schedule Visits. | Updates in-memory application store. | PostgreSQL ACID transactions with Kafka events. |
| **SLA Risk Monitoring** | Real calculation of elapsed days vs. statutory SLA thresholds. | Seeded calendar dates. | Direct webhook integration with MAITRI & RTS Commission. |
| **Regulatory Copilot** | Real grounded retrieval returning legal citations based on business parameters. | Seeded regulatory knowledge base. | LLM (e.g. Gemini 1.5 Pro) with `pgvector` hybrid search. |

---

## 9. Future Roadmap & Production Hardening

1. **PostgreSQL + pgvector Migration:** Store regulatory circulars as vector embeddings for semantic search over state gazettes.
2. **e-Sign & Digilocker Integration:** Direct API integration with DigiLocker to auto-fetch Aadhaar, PAN, and Udyam credentials.
3. **Department Webhooks:** Bi-directional webhooks with MPCB, DISH, and MSEDCL single-window backends for instant status synchronization.
4. **Offline Mobile Inspection App:** Progressive Web App (PWA) with GPS geo-tagging for field officers during site visits.

---

## 10. Compliance & Ethical Boundaries

> **Regulatory Disclaimer:**  
> UdyamSetu AI is developed as an engineering prototype for the Smart India Hackathon 2026. While built in alignment with authentic Maharashtra Government enactments and departmental procedures, all statutory clearances and benefit claims must be verified with the respective competent nodal authorities prior to commercial execution.
