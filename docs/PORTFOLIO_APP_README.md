# Omar Emad Ahmed: Strategic Engineering Portfolio

A luxury, chess-inspired technology portfolio web application engineered with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Modern CSS**.

---

## 1. Project Overview

This web application serves as the interactive digital portfolio for **Omar Emad Ahmed**, showcasing nine parallel technical domains, verified software engineering platforms, academic coursework, and a chess-inspired development philosophy.

The platform is designed with a dark, architectural aesthetic, featuring subtle gold accents, bilingual support (English and Arabic), and modular, type-safe data models.

---

## 2. Key Features

- ♟ **Strategic Chess Aesthetics:**
  A curated visual identity featuring dark glassmorphism, subtle gold highlights, and development workflows mapped to the six phases of strategic play (Opening to Refinement).
- 🌐 **Full Bilingual Support (EN & AR):**
  Seamless client-side localization switching between English and Arabic, supporting complete layout mirroring (LTR and RTL).
- 🧩 **Structured Domain Showcase:**
  Interactive visual explorer covering nine technical focus areas: Web Development, Mobile Apps, Software Engineering, Networking, Cloud Computing, DevOps, IT, UI/UX Design, and System Architecture.
- 📂 **Type-Safe Data Architecture:**
  Discrete TypeScript data schemas for projects, coursework, tech stack proficiencies, and site configurations in `/data`.
- 📱 **Mobile & Desktop Polish:**
  Responsive layout featuring a floating glass dock navigation bar, smooth accordion drawers, and zero horizontal viewport overflow.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS, Modern Vanilla CSS Variables, Glassmorphism |
| **Icons & Media** | Lucide React |
| **Deployment** | Vercel |

---

## 4. Architecture Overview

```text
portfolio-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Master layout with font and metadata providers
│   ├── page.tsx                  # Dynamic single-page portfolio layout
│   └── globals.css               # Global theme tokens, typography, glassmorphism
├── components/                   # Reusable UI components
│   ├── Navbar.tsx                # Floating glass dock with language switcher
│   ├── Hero.tsx                  # Header with portrait and banner integration
│   ├── DomainGrid.tsx            # Nine-domain interactive cards
│   ├── ProjectsSection.tsx       # Verified engineering projects
│   ├── StagesSection.tsx         # Six-stage chess engineering workflow
│   ├── CoursesSection.tsx        # Harvard CS50 coursework and ICDL
│   └── Footer.tsx                # Contact details and legal attribution
├── context/                      # React contexts
│   └── LanguageContext.tsx       # English (LTR) / Arabic (RTL) state
├── data/                         # Type-safe structured data
│   ├── siteConfig.ts             # Contact details, bio, and stage definitions
│   ├── techStack.ts              # Categorized technical competencies
│   ├── projects.ts               # Detailed project specifications
│   ├── courses.ts                # Verified coursework data
│   ├── domains.ts                # Nine domains technical data
│   └── translations.ts           # Bilingual UI strings
└── public/                       # Static media and assets
```

---

## 5. Prerequisites

- **Node.js:** 18.x or 20.x
- **npm:** 9.x or 10.x

---

## 6. Installation & Execution

### Clone & Install
```powershell
# Windows PowerShell
git clone https://github.com/omaremadahmed/portfolio-app.git
Set-Location portfolio-app
npm install
```

```bash
# Linux / macOS
git clone https://github.com/omaremadahmed/portfolio-app.git
cd portfolio-app
npm install
```

### Local Development Server
```powershell
npm run dev
# Open http://localhost:3000 in your browser
```

### Production Build
```powershell
npm run build
npm start
```

---

## 7. Security & Best Practices

- Zero client-side sensitive secrets.
- Strict TypeScript type safety across all component props and data models.
- Sanitized input handling and accessible HTML semantics.

---

## 8. License

This project is licensed under the MIT License.