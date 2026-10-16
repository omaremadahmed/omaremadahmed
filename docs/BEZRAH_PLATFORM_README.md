# Bezrah (بذرة): Bilingual Agricultural E-Commerce Platform

A production-grade, bilingual digital marketplace connecting agricultural producers with markets, built with **Vue 3 (Composition API)**, **Vite**, **Pinia**, **Laravel REST API**, and **PostgreSQL**.

---

## 1. Project Overview

**Bezrah** is an agricultural commerce platform engineered to facilitate transparent trade, product discovery, and catalog exploration for fresh produce, seeds, and agricultural supplies. The platform bridges regional producers and global distributors through a bilingual user interface that seamlessly supports both Arabic (RTL) and English (LTR).

Designed for high visual fidelity and rapid response times, Bezrah integrates product management, multi-provider authentication (OAuth), granular role-based authorization, and modern reactive state management.

---

## 2. Problem Statement

Agricultural commerce in regional markets suffers from:
- **Poor Digital Visibility:** Small-to-medium agricultural producers lack accessible digital channels to showcase certified crops.
- **Language & Cultural Barriers:** Most e-commerce templates default to left-to-right (LTR) layouts with awkward or broken Arabic right-to-left (RTL) adaptations.
- **Scattered Logistics & Communication:** Inquiries, specifications, and bulk orders are often handled through informal channels without centralized auditability.

Bezrah addresses these needs through native bidirectional design, rich product specification sheets, and unified inquiry management.

---

## 3. Main Features

- 🌿 **Bilingual Interface (Arabic & English):**
  Full directional switching between Arabic (RTL) and English (LTR) with tailored typography and layout mirroring.
- 📦 **Organized Product Catalog:**
  Filterable product grids categorized by agricultural type, packaging specs, seasonality, and harvest details.
- 🔐 **Multi-Provider Authentication:**
  Secure registration and login via standard Email/Password, Google OAuth, and GitHub OAuth powered by Laravel Sanctum & Socialite.
- ⚡ **Reactive State Management:**
  Pinia stores managing shopping cart state, user session persistence, active language selection, and wishlist items.
- 🛡 **Role-Based Access Control (RBAC):**
  Separation of roles for Administrators, Catalog Managers, and Commercial Buyers.
- 📱 **Mobile-First Responsive Layout:**
  Clean, accessible design engineered for smartphones, tablets, and desktop workstations without bloated UI framework overhead.
- 📊 **Inquiry & Lead Management:**
  Direct inquiry submission pipeline allowing buyers to request wholesale quotes.

---

## 4. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | Vue 3 (Composition API), Vite, Vue Router 4, Pinia |
| **Internationalization** | Vue I18n (Dynamic RTL and LTR switching) |
| **Styling & Design** | Modern Vanilla CSS, CSS Variables, Flexbox/Grid Layouts |
| **Backend REST API** | Laravel 10/11, Laravel Sanctum, Laravel Socialite |
| **Database** | PostgreSQL |
| **Container & CI/CD** | Docker, Docker Compose, Jenkinsfile, Kubernetes manifests |

---

## 5. Architecture Overview

```text
┌────────────────────────────────────────────────────────┐
│               Vue 3 Single Page Client                 │
│  Vue Router  │  Pinia State  │  Vue I18n (RTL/LTR)     │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / REST API
┌───────────────────────────▼────────────────────────────┐
│                    Nginx / Gateway                     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                 Laravel REST API Core                  │
│  ├── Auth & OAuth (Sanctum / Socialite)                │
│  ├── Product Catalog Controller                        │
│  ├── Category & Taxonomy Controller                    │
│  └── Inquiry & Order Pipeline                          │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  PostgreSQL Database                   │
│   (Products, Categories, Inquiries, Users, Roles)       │
└────────────────────────────────────────────────────────┘
```

---

## 6. Directory Structure

```text
bezrah/
├── api/                          # Serverless and gateway API configurations
├── backend/                      # Laravel REST API core
│   ├── app/
│   │   ├── Http/Controllers/    # Product, Category, and Auth controllers
│   │   └── Models/              # Product, Category, User, Inquiry models
│   ├── config/                  # Application configuration
│   ├── database/migrations/     # Database migration schemas
│   └── routes/api.php           # REST API route definitions
├── frontend/                     # Vue 3 client application
│   ├── src/
│   │   ├── assets/              # Icons, logos, and branding media
│   │   ├── components/          # ProductCard, Navbar, Footer, LanguageToggle
│   │   ├── locales/             # ar.json and en.json translation bundles
│   │   ├── router/              # Route guards and page mappings
│   │   ├── stores/              # Pinia cart, auth, and theme stores
│   │   └── views/               # Home, Products, About, Contact, Auth views
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── k8s/                          # Kubernetes deployment manifests
├── docker-compose.yml            # Multi-container local deployment
├── Jenkinsfile                   # Automated CI build pipeline
└── README.md
```

---

## 7. Prerequisites

- **Node.js:** 18.x or 20.x
- **PHP:** 8.2 or 8.3
- **Composer:** 2.x
- **PostgreSQL:** 15.x or 16.x
- **Docker:** (Optional, for containerized run)

---

## 8. Installation Instructions

### Clone Repository
```powershell
# Windows PowerShell
git clone https://github.com/omaremadahmed/bezrah-app-frontend.git
Set-Location bezrah-app-frontend
```

```bash
# Linux / macOS
git clone https://github.com/omaremadahmed/bezrah-app-frontend.git
cd bezrah-app-frontend
```

### Frontend Dependencies
```powershell
Set-Location frontend
npm install
```

### Backend Dependencies (if running Laravel locally)
```powershell
Set-Location ../backend
composer install
Copy-Item .env.example .env
php artisan key:generate
```

---

## 9. Environment Variables Configuration

Frontend configuration in `frontend/.env`:
```ini
VITE_API_BASE_URL=http://localhost:8000/api
VITE_DEFAULT_LOCALE=ar
VITE_ENABLE_ANALYTICS=false
```

Backend configuration in `backend/.env`:
```ini
APP_NAME=Bezrah
APP_ENV=local
APP_KEY=base64:GENERATE_KEY_USING_ARTISAN
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=bezrah_db
DB_USERNAME=your_pg_user
DB_PASSWORD=your_pg_password

SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

---

## 10. Database Migrations

```powershell
Set-Location backend
php artisan migrate --seed
```

---

## 11. Running the Project

### Option A: Local Development

**Terminal 1 (Laravel Backend API):**
```powershell
Set-Location backend
php artisan serve --port=8000
```

**Terminal 2 (Vue 3 Frontend Client):**
```powershell
Set-Location frontend
npm run dev
# Accessible at http://localhost:5173
```

### Option B: Docker Compose

```powershell
docker-compose up --build
```

---

## 12. Testing Instructions

```powershell
# Frontend lint and unit checks
Set-Location frontend
npm run test:unit

# Backend tests
Set-Location ../backend
php artisan test
```

---

## 13. Security Considerations

- **OAuth Integrity:** State parameter validation prevents CSRF during Google and GitHub OAuth handshakes.
- **Sanctum Tokens:** API tokens are cryptographically hashed and tied to specific client origins.
- **Input Sanitization:** Contact and quote forms enforce strict server-side validation to block malicious injections.

---

## 14. Known Limitations

- Real-time inventory tracking currently relies on periodic polling rather than WebSocket streaming.
- Payment gateway integration is currently in sandbox/mock mode pending merchant account activation.

---

## 15. Future Improvements

- Direct Stripe and local regional payment gateway integrations.
- Progressive Web App (PWA) offline catalog caching for rural agricultural producers with limited connectivity.

---

## 16. License

This project is licensed under the MIT License.
