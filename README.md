<div align="center">

<img src="./assets/omar-emad-banner.jpg" alt="Omar Emad Ahmed — Software Engineering and Architecture" width="100%" />

<br />

# Omar Emad Ahmed

**Software Engineering · Full-Stack Architecture · Systems Design**

*Second-year Business Information Systems student building modular full-stack applications and exploring distributed systems principles.*

<br />

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Omar%20Emad-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/omar-emad-90b242401)
[![Email](https://img.shields.io/badge/Email-omargls600%40gmail.com-3b82f6?style=flat-square&logo=gmail&logoColor=white)](mailto:omargls600@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-omaremadahmed-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/omaremadahmed)
[![Portfolio](https://img.shields.io/badge/Portfolio_Hub-Engineering_Projects-1a2744?style=flat-square&logo=github&logoColor=3b82f6)](https://github.com/omaremadahmed?tab=projects)

</div>

<br />

<div align="center">
<img src="./assets/section-divider.svg" alt="" width="500" />
</div>

<br />

## ♞ Engineering Philosophy

> *Every system is a game of strategy — clear openings, disciplined middlegame, decisive endgame.*

My approach bridges business systems analysis with hands-on software development. I treat every project as an evolving system requiring deliberate structure, boundary discipline, and trade-off evaluation.

- **Clear Domain Boundaries** — Isolating business logic from delivery mechanisms and databases for long-term maintainability.
- **Pragmatic Trade-off Evaluation** — Choosing modular monoliths before distributed complexity; balancing normalization against query ergonomics.
- **Defensive Engineering** — Robust server-side validation, consistent error contracts, and relational schema integrity across transactional workflows.
- **Bidirectional User Experience** — Engineering interfaces where Arabic (RTL) and English (LTR) are first-class layouts with fluid mirroring.

---

## ♜ Technical Domains

<div align="center">

| | Domain | Focus Areas |
|:---:|:---|:---|
| 🌐 | **Full-Stack Development** | End-to-end web application engineering |
| 🏗 | **Software Architecture** | Clean Architecture, DDD, CQRS, modular design |
| ⚙️ | **Software Engineering** | SOLID, design patterns, testing practices |
| 📱 | **Mobile Development** | Responsive mobile-first, cross-platform UI |
| 🔌 | **Networking** | TCP/IP, HTTP lifecycle, WebSockets, subnetting |
| ☁️ | **DevOps & Cloud** | Docker, CI/CD, Linux, Nginx, infrastructure |
| 🎨 | **UI/UX Design** | Figma, accessibility, design systems, typography |

</div>

---

## ♝ Technology Stack

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

**Backend**

![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=csharp&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

**Data & Infrastructure**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)

**Architecture & Patterns**

![Clean Architecture](https://img.shields.io/badge/Clean_Architecture-1a2744?style=flat-square)
![CQRS](https://img.shields.io/badge/CQRS-1a2744?style=flat-square)
![DDD](https://img.shields.io/badge/Domain--Driven_Design-1a2744?style=flat-square)
![MediatR](https://img.shields.io/badge/MediatR-1a2744?style=flat-square)
![SOLID](https://img.shields.io/badge/SOLID-1a2744?style=flat-square)
![SignalR](https://img.shields.io/badge/SignalR-1a2744?style=flat-square)

---

## ♛ Flagship Project

### [Enterprise News Platform](https://github.com/omaremadahmed/enterprise-news-platform) — Clean Architecture & CQRS

*An enterprise-structured editorial and news publication platform engineered for auditable content lifecycles.*

**Problem:** Editorial newsrooms require structured, multi-role publishing workflows with strict review stages and real-time updates.

**Architecture:** Clean Architecture across five decoupled layers (`Domain` → `Application` → `Infrastructure` → `Persistence` → `API`). CQRS via MediatR isolates read/write pipelines. FluentValidation enforces pre-execution checks. SignalR provides real-time event broadcasting.

**Key capabilities:**
- State-machine lifecycle: `Draft` → `PendingReview` → `Approved` → `Published`
- Role-Based Access Control across editorial, reviewer, and reader roles
- Real-time event broadcasting via SignalR for concurrent editorial notices
- Redis caching layer for read-heavy categories and trending content

**Stack:** `C#` · `ASP.NET Core` · `Angular 18` · `PostgreSQL` · `Entity Framework Core` · `Redis` · `SignalR` · `Docker`

> 📖 [Full Architecture Documentation](./docs/ENTERPRISE_NEWS_PLATFORM_README.md)

---

## ♞ Project Portfolio

<table>
<tr>
<td width="50%">

### [Bezrah (بذرة) Platform](https://github.com/omaremadahmed/bezrah-platform)

*Bilingual agricultural e-commerce connecting regional growers with buyers.*

Native bidirectional frontend (RTL/LTR) with zero layout disruption. Vue 3 Composition API + Pinia state management. Multi-provider OAuth authentication.

`Vue 3` · `Vite` · `Pinia` · `Laravel` · `PostgreSQL` · `Docker`

> 📖 [Architecture Docs](./docs/BEZRAH_PLATFORM_README.md)

</td>
<td width="50%">

### [Study Planner](https://github.com/omaremadahmed/study-planner-cs50w)

*Academic productivity suite — Harvard CS50W Capstone Project.*

Interactive Pomodoro timer with async AJAX session tracking. Three-tier data hierarchy: Subjects → Tasks → Sessions. Strict user-isolated query boundaries.

`Python` · `Django` · `JavaScript` · `SQLite` · `CSS Grid`

> 📖 [Architecture Docs](./docs/STUDY_PLANNER_README.md)

</td>
</tr>
<tr>
<td width="50%">

### [Engineering Portfolio App](https://github.com/omaremadahmed/portfolio-app)

*Bilingual web portfolio with chess-inspired design system.*

Next.js 15 App Router + React 19 with strict TypeScript schemas. Client-side internationalization with full layout mirroring. Floating glass dock navigation.

`Next.js 15` · `React 19` · `TypeScript` · `Tailwind CSS` · `Vercel`

> 📖 [Architecture Docs](./docs/PORTFOLIO_APP_README.md)

</td>
<td width="50%">

### House Platform — Architecture Base

*Multi-domain enterprise web ecosystem integrating academic coordination, financial simulation, and digital commerce.*

Domain-isolated Django service layer with decoupled modules (`edu`, `bank`, `marketplace`). Double-entry financial accounting. Celery + Redis async task processing.

`Django REST` · `React` · `PostgreSQL` · `Celery` · `Redis` · `Docker`

> 📖 [Architecture Docs](./docs/HOUSE_PLATFORM_README.md)

</td>
</tr>
</table>

---

## ♝ Architecture & Engineering Practices

| Practice | Application |
|:---|:---|
| **Clean Architecture** | Five-layer separation in Enterprise News Platform; domain-isolated modules in House Platform |
| **CQRS Pattern** | MediatR command/query pipeline separation for scalable read/write paths |
| **Domain-Driven Design** | Bounded context isolation, aggregate root patterns, ubiquitous language |
| **Defensive Validation** | FluentValidation pre-execution checks, server-side input sanitization |
| **State Machine Workflows** | Article lifecycle management, Pomodoro timer state transitions |
| **Bidirectional UI** | Native RTL/LTR layout mirroring in Bezrah and Portfolio App |
| **RBAC Security** | Granular role-based permission systems across all major platforms |
| **Event-Driven Communication** | SignalR real-time broadcasting, Celery async task processing |

---

## ♜ Current Learning Focus

- **Distributed Systems** — Event-driven architecture patterns, message broker trade-offs, microservices boundary analysis
- **Database Optimization** — PostgreSQL query execution plans, index strategies (B-tree, GIN), connection pooling
- **System Observability** — Structured logging, application health metrics, tracing fundamentals

---

## ♞ Academic Foundation

**Business Information Systems (BIS)** — University Degree Program *(2nd Year In Progress)*
> Systems Analysis & Design · Database Management · Business Process Modeling · Enterprise Information Architecture

**Harvard CS50 Coursework** — Harvard University / edX
> `CS50x` Computer Science · `CS50P` Python · `CS50W` Web Programming · `CS50 SQL` Databases · `CS50 Cybersecurity`

**ICDL** — International Computer Driving Licence *(Certified)*

---

<div align="center">

<img src="./assets/section-divider.svg" alt="" width="500" />

<br />
<br />

### ♛ Engineering Portfolio & Project Hub

*All projects organized, tracked, and connected in one central command center.*

[![View Portfolio Hub](https://img.shields.io/badge/View_Portfolio_Hub-Engineering_Projects-060b18?style=for-the-badge&logo=github&logoColor=3b82f6)](https://github.com/omaremadahmed?tab=projects)

<br />

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Omar%20Emad-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/omar-emad-90b242401)
[![Email](https://img.shields.io/badge/Email-omargls600%40gmail.com-3b82f6?style=flat-square&logo=gmail&logoColor=white)](mailto:omargls600@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-omaremadahmed-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/omaremadahmed)

<br />

<sub>Engineered with precision. Structured for maintainability. © Omar Emad Ahmed</sub>

</div>
