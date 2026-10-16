# Enterprise News Platform

An enterprise-grade, domain-driven publishing and news lifecycle management platform engineered with **ASP.NET Core Web API**, **Clean Architecture**, **MediatR (CQRS)**, **PostgreSQL**, and **Angular 18**.

---

## 1. Project Overview

The **Enterprise News Platform** is a full-lifecycle editorial content management system designed for media organizations and digital news agencies. It orchestrates the end-to-end journey of journalism: from draft composition and editorial review to scheduled publication, automated archiving, reader engagement, and real-time newsflashes.

Engineered with enterprise patterns, the system decouples business logic from frameworks, guarantees transactional integrity across 21 relational tables, and ensures real-time client synchronization.

---

## 2. Problem Statement

Modern newsrooms face several operational bottlenecks:
- **Chaotic Review Workflows:** Informal revision cycles often lead to unverified news being prematurely published.
- **Tightly Coupled Architecture:** Legacy CMS platforms entangle database queries, business rules, and UI templates, causing fragility when scaling.
- **High Concurrency Surges:** Breaking news events create unpredictable read spikes that exhaust database connection pools.
- **Lack of Auditability:** Media platforms require strict, immutable tracking of who authored, edited, approved, and published every article.

The Enterprise News Platform resolves these challenges through a strict state machine, CQRS separation, in-memory caching with Redis, and audit logging.

---

## 3. Main Features

- 📰 **State Machine News Lifecycle:**
  `Draft` → `PendingReview` → `Approved` → `Published` (with `Scheduled`, `Rejected`, and `Archived` transitions).
- 👥 **Role-Based Access Control (RBAC):**
  Granular permissions for Administrator, Editor-in-Chief, Section Editor, Journalist, Reviewer, Photographer, Publisher, and Reader.
- ⚡ **CQRS with MediatR:**
  Complete separation of read and write paths. Commands handle state mutations; queries handle optimized data fetching.
- 🛡 **Validation Pipeline:**
  Pre-execution request validation powered by `FluentValidation` middleware, rejecting invalid DTOs before touching application state.
- 🔄 **Real-Time Event Broadcasting:**
  `SignalR` integration for instant notifications when breaking news is published or an article is assigned for review.
- 🚀 **High-Performance Caching:**
  Redis caching layer for trending articles, top categories, and system settings with sub-10ms response times.
- 🗄 **Enterprise Persistence:**
  Entity Framework Core with PostgreSQL backing 21 relational entities with foreign-key constraints and indexes.
- 🌐 **Modern Angular UI:**
  Angular 18 standalone components, JWT authentication interceptors, automated token refresh, and bidirectional RTL/LTR layout support.

---

## 4. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Angular 18 (Standalone Components), TypeScript, RxJS, Tailwind CSS |
| **Backend API** | ASP.NET Core Web API (.NET 8/9), MediatR, FluentValidation |
| **Data Persistence** | PostgreSQL, Entity Framework Core, Repository & Unit of Work patterns |
| **Caching & Real-Time** | Redis, SignalR |
| **Security & Auth** | JWT (JSON Web Tokens), PBKDF2 Password Hashing, RBAC Policies |
| **DevOps & Containers** | Docker, Docker Compose, Nginx |

---

## 5. Architecture Overview

The system strictly adheres to **Clean Architecture** (Onion/Hexagonal) principles:

```text
┌────────────────────────────────────────────────────────┐
│                      API Layer                         │
│       Controllers  │  SignalR Hubs  │  Middlewares     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Application Layer                     │
│      CQRS Commands & Queries  │  DTOs  │  Pipelines    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Domain Layer                        │
│     Entities  │  Enums  │  Value Objects  │  Exceptions │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│                 Infrastructure & Persistence           │
│    AppDbContext (EF Core)  │  Redis  │  File Storage   │
└────────────────────────────────────────────────────────┘
```

---

## 6. Directory Structure

```text
EnterpriseNewsPlatform/
├── backend/
│   ├── API/
│   │   ├── Controllers/          # REST API endpoints
│   │   ├── Hubs/                 # SignalR hubs for real-time events
│   │   ├── Middleware/           # Global error handling and JWT middleware
│   │   ├── Program.cs            # Dependency injection and app configuration
│   │   └── appsettings.json      # Configuration settings
│   ├── Application/
│   │   ├── Common/               # Behaviors, interfaces, mappings
│   │   ├── Features/             # CQRS Commands and Queries by domain
│   │   └── DTOs/                 # Data transfer objects
│   ├── Domain/
│   │   ├── Common/               # BaseEntity, AuditableEntity
│   │   ├── Entities/             # News, Category, Tag, Comment, User, Role
│   │   └── Enums/                # NewsStatus, UserRole
│   ├── Infrastructure/
│   │   ├── Identity/             # JWT token provider, PBKDF2 hasher
│   │   ├── Services/             # Redis cache, email notifications
│   │   └── Storage/              # Local and cloud file storage service
│   ├── Persistence/
│   │   ├── Repositories/         # Repository implementations
│   │   ├── AppDbContext.cs       # EF Core DbContext with 21 entity configurations
│   │   └── UnitOfWork.cs         # Transaction coordinator
│   └── Tests/
│       ├── Auth/                 # Authentication unit tests
│       └── Domain/               # News state machine unit tests
├── frontend/
│   └── angular-news/
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/         # Guards, interceptors, base services
│       │   │   ├── features/     # News editor, reader feed, dashboard
│       │   │   └── shared/       # Reusable components and pipes
│       │   ├── environments/     # Environment configurations
│       │   └── main.ts           # Standalone bootstrap
│       ├── angular.json
│       └── package.json
└── docker-compose.yml
```

---

## 7. Prerequisites

- **.NET SDK:** 8.0 or 9.0
- **Node.js:** 18.x or 20.x
- **PostgreSQL:** 15.x or 16.x
- **Redis:** 7.x (Optional for local development; required for caching)
- **Docker & Docker Compose:** (Optional, for containerized run)

---

## 8. Installation Instructions

### Clone Repository
```powershell
# Windows PowerShell
git clone https://github.com/omaremadahmed/EnterpriseNewsPlatform.git
Set-Location EnterpriseNewsPlatform
```

```bash
# Linux / macOS
git clone https://github.com/omaremadahmed/EnterpriseNewsPlatform.git
cd EnterpriseNewsPlatform
```

### Backend Dependencies
```powershell
Set-Location backend/API
dotnet restore
```

### Frontend Dependencies
```powershell
Set-Location ../../frontend/angular-news
npm install
```

---

## 9. Environment Variables & Configuration

Backend configuration in `backend/API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=EnterpriseNewsDb;Username=YOUR_PG_USER;Password=YOUR_PG_PASSWORD"
  },
  "Jwt": {
    "Key": "ENTER_AT_LEAST_32_CHARACTERS_SECURE_KEY_HERE",
    "Issuer": "EnterpriseNewsPlatform",
    "Audience": "EnterpriseNewsPlatformClients",
    "AccessTokenMinutes": "30"
  },
  "Redis": {
    "Connection": "localhost:6379"
  }
}
```

> **Security Note:** In production, override these settings using environment variables or Azure Key Vault / AWS Secrets Manager. Never commit production credentials.

---

## 10. Database Setup & Migrations

```powershell
# Apply EF Core migrations to PostgreSQL
Set-Location backend/API
dotnet ef database update --project ../Persistence
```

---

## 11. Running the Project

### Option A: Local Development

**Terminal 1 (Backend API):**
```powershell
Set-Location backend/API
dotnet run
# API runs at https://localhost:5001 and http://localhost:5000
# Swagger UI available at https://localhost:5001/swagger
```

**Terminal 2 (Angular Frontend):**
```powershell
Set-Location frontend/angular-news
npm start
# Client available at http://localhost:4200
```

### Option B: Docker Compose

```powershell
docker-compose up --build
```

---

## 12. Testing Instructions

```powershell
Set-Location backend/Tests
dotnet test --verbosity normal
```

---

## 13. Security Considerations

- **PBKDF2 Password Hashing:** Passwords are never stored in plaintext; salted and hashed with high iteration counts.
- **JWT Protection:** Access tokens expire in 30 minutes; secured with cryptographic signing.
- **Input Sanitization:** Rich-text news inputs are validated and sanitized to prevent Stored Cross-Site Scripting (XSS).
- **SQL Injection Prevention:** Parameterized queries enforced throughout via Entity Framework Core.

---

## 14. Known Limitations

- Real-time video upload streaming is currently managed via standard multipart upload rather than chunked cloud streaming.
- Translation integration is currently structured at the database schema level, pending integration with external localization APIs.

---

## 15. Future Improvements

- Implementation of Elasticsearch for millisecond full-text searching across millions of archival news articles.
- Integration of automated AI summarization microservice adhering to the `IAiTextProcessor` interface.
- Native mobile application using Flutter targeting the existing REST and SignalR APIs.

---

## 16. License

This project is licensed under the MIT License.
