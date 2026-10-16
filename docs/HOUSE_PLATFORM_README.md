# House Platform: Multi-Domain Enterprise Web Ecosystem

A production-grade, modular web platform engineered with **Django REST Framework**, **React 18 (Vite)**, **PostgreSQL**, **Celery**, **Redis**, and **Docker**.

---

## 1. Project Overview

**House Platform** is an enterprise-scale digital ecosystem that bridges academic administration, economic/financial simulation, and digital commerce. Designed to support multi-tenant institutional operations, the platform unifies diverse service domains into a cohesive, high-performance web architecture with asynchronous background task processing and real-time responsiveness.

The platform is structured into two flagship sub-platforms:
1. **House Academic Platform (`edu`):** Comprehensive student lifecycle management, department rooms, academic alliances, and assessment workflows.
2. **House Economic Platform (`economic` & `bank`):** High-integrity financial modeling, simulated transaction ledgers, merchant accounts, and business indicators.

---

## 2. Problem Statement

Organizations and educational institutions frequently deploy disconnected tools: one for learning management, one for financial administration, and another for campus commerce. This fragmentation causes:
- Siloed user identities and repetitive credential management.
- Inconsistent security baselines and authentication policies.
- Inefficient cross-system data reconciliation.
- Fragile integrations that fail under peak traffic during exam or enrollment periods.

House Platform unifies these requirements into a modular Django-powered core with an isolated service layer and dedicated React client applications.

---

## 3. Main Features

### A. Academic & Educational Management (`edu`)
- **Multi-Role Portals:** Discrete workflows for Students, Instructors, Department Leads, and Administrators.
- **Academic Alliances:** Inter-institutional collaboration rooms, study alliances, and knowledge hubs.
- **Course & Lecture Scheduling:** Interactive timetables, lecture resource distribution, and curriculum tracking.
- **Assessment & Grading:** Secure assignment submission and gradebook management.

### B. Economic & Financial Engine (`economic` & `bank`)
- **Simulated Financial Ledgers:** High-integrity transaction processing adhering to ACID principles.
- **Tiered Account Structures:** Support for Savings, Current, and Business operational accounts.
- **Merchant Management:** Vendor onboarding, invoice generation, and settlement simulation.
- **Financial Analytics:** Visual indicators for cash flows, expenditure trends, and balance sheets.

### C. Digital Commerce (`marketplace`)
- Dynamic product catalog, categorized browsing, favorites, and responsive shopping cart workflows.

### D. System Resilience & Infrastructure
- **Asynchronous Task Queue:** Celery powered by Redis for background report generation and email notifications.
- **Enterprise Security:** JWT-based stateless authentication, automated rate-limiting, CORS policy validation, and CSRF protection.
- **Modern Responsive Client:** React 18 built with Vite, dark mode support, and fluid layout navigation.

---

## 4. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend Framework** | Django 6.x, Django REST Framework (DRF), SimpleJWT |
| **Frontend Client** | React 18, Vite, Axios, Context API, Lucide Icons |
| **Databases** | PostgreSQL (Production), SQLite (Local Development) |
| **Task Queue & Caching**| Celery, Redis |
| **Web Server & Gateway**| Gunicorn, Nginx (Reverse Proxy) |
| **DevOps & Containers** | Docker, Docker Compose, Multi-stage Dockerfile |

---

## 5. Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                   React 18 Single Page App                  │
│       Vite Build  │  Context API State  │  Axios Client     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON REST APIs
┌──────────────────────────────▼──────────────────────────────┐
│                    Nginx Reverse Proxy                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  Django REST Framework Core                 │
│   ├── edu (Academic Hub)       ├── economic (Financials)    │
│   ├── bank (Ledger System)     ├── marketplace (Commerce)   │
│   └── security (Rate Limit)    └── accounts (Auth & JWT)    │
└───────────────────┬─────────────────────┬───────────────────┘
                    │                     │
          Relational Queries       Async Task Dispatch
                    │                     │
┌───────────────────▼───────────┐ ┌───────▼───────────────────┐
│     PostgreSQL Database       │ │   Redis Broker / Cache    │
│   (ACID Relational Storage)   │ └───────┬───────────────────┘
└───────────────────────────────┘         │
                                  ┌───────▼───────────────────┐
                                  │      Celery Workers       │
                                  └───────────────────────────┘
```

---

## 6. Directory Structure

```text
House/
├── accounts/                     # User authentication and profile management
├── bank/                         # Banking simulation, accounts, virtual cards
├── core/                         # Base models, middleware, global utilities
├── docker/                       # Docker deployment configurations
├── ecommerce/                    # Commerce logic and order models
├── edu/                          # Academic platform, alliances, course hubs
├── frontend/                     # React 18 frontend (Vite project)
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # Authentication and Theme context
│   │   ├── pages/                # Academic, Economic, Marketplace views
│   │   └── services/             # Axios API service clients
│   ├── package.json
│   └── vite.config.js
├── home/                         # Landing pages and static routing
├── House/                        # Project configuration (settings, urls, wsgi)
├── marketplace/                  # Marketplace views and endpoints
├── media/                        # User-uploaded assets
├── scripts/                      # Deployment and maintenance scripts
├── security/                     # Rate limiting, CSRF and security policies
├── static/                       # Static CSS, JavaScript, and branding
├── docker-compose.yml            # Multi-container orchestration
├── Dockerfile                    # Production container build
├── manage.py                     # Django CLI
├── requirements.txt              # Python dependencies
└── render.yaml                   # Cloud deployment manifest
```

---

## 7. Prerequisites

- **Python:** 3.11 or 3.12
- **Node.js:** 18.x or 20.x
- **PostgreSQL:** 15.x or 16.x
- **Redis:** 7.x (for Celery background tasks and caching)
- **Docker:** (Optional, for containerized run)

---

## 8. Installation Instructions

### Clone Repository
```powershell
# Windows PowerShell
git clone https://github.com/omaremadahmed/House120.git
Set-Location House120
```

```bash
# Linux / macOS
git clone https://github.com/omaremadahmed/House120.git
cd House120
```

### Backend Virtual Environment & Dependencies
```powershell
# Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

```bash
# Linux / macOS
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Dependencies
```powershell
Set-Location frontend
npm install
Set-Location ..
```

---

## 9. Environment Variables Configuration

Copy `.env.example` to `.env` in the project root:

```ini
# Django Core Settings
SECRET_KEY=enter-a-secure-random-secret-key-for-production
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# Database Configuration
DATABASE_URL=postgres://house_user:secure_password@localhost:5432/house_db

# Celery and Redis Configuration
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# CORS Allowed Origins
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## 10. Database Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

---

## 11. Running the Project

### Option A: Local Development

**Terminal 1 (Django Backend):**
```powershell
python manage.py runserver
# Backend running at http://127.0.0.1:8000
```

**Terminal 2 (Celery Background Worker):**
```powershell
celery -A House worker --loglevel=info
```

**Terminal 3 (React Vite Frontend):**
```powershell
Set-Location frontend
npm run dev
# Frontend running at http://localhost:5173
```

### Option B: Docker Compose (Full Stack)

```powershell
docker-compose up --build
```

---

## 12. Testing Instructions

```powershell
# Run backend test suite
python manage.py test

# Run frontend test suite
Set-Location frontend
npm test
```

---

## 13. Security Considerations

- **Stateless Authentication:** JSON Web Tokens (SimpleJWT) are transmitted via secure headers.
- **CSRF & CORS Hardening:** Restricted origins allow only trusted frontend domains.
- **Password Hashing:** Django PBKDF2 with SHA-256 password security.
- **SQL Injection Prevention:** 100% ORM-parameterized query execution.

---

## 14. Known Limitations

- High-concurrency Celery processing requires dedicated Redis sentinel configuration in enterprise clusters.
- Real-time video conferencing inside Academic Alliance rooms currently routes through external conference providers.

---

## 15. Future Improvements

- Native multi-tenant database partitioning using PostgreSQL schemas.
- WebSocket-based bidirectional notifications using Django Channels.
- Dedicated mobile client for Android and iOS using React Native.

---

## 16. License

This project is licensed under the MIT License.
