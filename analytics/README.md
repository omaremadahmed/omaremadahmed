# Engineering Telemetry & Portfolio Analytics Dashboard

> **Live Client-Side Application for GitHub Telemetry & Portfolio Metrics**  
> *Author:* Omar Emad Ahmed (`omaremadahmed`)  
> *Application Root:* [`analytics/index.html`](./index.html)

---

## 1. Application Overview

The **Engineering Telemetry & Portfolio Analytics Dashboard** is a zero-dependency, lightweight, client-side web application designed to retrieve and visualize public GitHub metadata and architectural metrics for the [`omaremadahmed`](https://github.com/omaremadahmed) engineering portfolio.

Unlike static graphics, this application performs live API synchronization, client-side filtering, sorting, and dynamic HTML5 Canvas chart rendering in the browser.

```
analytics/
  ├── index.html        # Semantic HTML5 dashboard layout
  ├── styles.css        # Dark Luxury design system (Navy #060b18 & Electric Blue #3b82f6)
  ├── app.js            # Live GitHub REST API client, cache manager & Canvas chart engine
  └── README.md         # Architecture, deployment guide, and methodology
```

---

## 2. Technical Architecture & Data Engineering

### 2.1 Data Sources
The application connects to the official unauthenticated GitHub REST API v3:
1. `GET https://api.github.com/users/omaremadahmed`
   - Yields public profile statistics: public repository counts, follower metrics, and profile metadata.
2. `GET https://api.github.com/users/omaremadahmed/repos?per_page=100&sort=updated`
   - Yields repository records: names, primary languages, star counts, fork counts, open issue metrics, topics, and ISO 8601 update timestamps.

### 2.2 Rate Limit Management & Caching Strategy
- **Unauthenticated Threshold:** GitHub enforces an IP-level rate limit of 60 requests per hour on unauthenticated REST API requests.
- **Client-Side Cache:** To prevent quota exhaustion during repeated page visits, `app.js` persists fetched payloads into browser `localStorage` under the key `omaremad_github_analytics_cache`.
- **Cache TTL:** 15 minutes (900,000 ms).
- **Manual Invalidation:** The top navigation bar includes a **"Sync Data"** button allowing the user to bypass the cache and fetch fresh telemetry on demand.
- **Graceful Fallback:** If the client encounters an HTTP 403 (Rate Limit Exceeded) or network disconnection, it falls back seamlessly to the verified offline repository state with an explanatory banner.

---

## 3. Visual Layout & Analytics Modules

### Module A: Executive Summary Metrics
- **Public Repositories:** Real-time count of public source repositories.
- **Primary Languages:** Distinct count of programming languages detected by GitHub Linguist.
- **Cumulative Stars & Forks:** Total engagement telemetry across repositories.
- **Engineered Systems:** Total active platforms in the engineering portfolio.

### Module B: Interactive Technology Charts (Pure Canvas)
- **Language Distribution (Doughnut Chart):** Dynamically computes language percentage shares from repository metadata and renders a multi-color doughnut chart on an HTML5 `<canvas>` with custom legends.
- **Engineering Domain Breakdown (Bar Chart):** Maps verified repositories into specialized disciplines (Architecture, Full-Stack, Productivity, Frontend/UI) and renders proportional vertical bars.

### Module C: Repository Explorer Table
- **Live Search Input:** Instant debounced filtering against repository name, description, and GitHub topics.
- **Language Dropdown:** Filters the table dynamically by primary programming language.
- **Sort Modes:** Sort by Recently Updated, Most Stars, Repository Name (A-Z), or Most Forks.
- **Direct Action Links:** Clickable buttons opening the repository source tree on GitHub.

### Module D: Systems Portfolio Matrix
Detailed summary cards covering:
1. **Enterprise News Platform** (Clean Architecture + CQRS, C#, ASP.NET Core 8, Angular 18, EF Core 21 tables)
2. **Bezrah Platform** (Vue 3, Pinia, Laravel REST API, native bidirectional RTL/LTR mirroring)
3. **Study Planner CS50W** (Python, Django, JavaScript, Pomodoro finite-state machine)
4. **Portfolio Web App** (Next.js 15, React 19, TypeScript strict mode)
5. **House Platform** (Modular monolith architecture base)

---

## 4. How to Run Locally

Because the application is built with pure Vanilla JavaScript and standard ES6 APIs, it requires **zero build steps, zero node_modules, and zero compilers**.

### Option 1: Direct File Open
Simply double-click [`analytics/index.html`](./index.html) in your file explorer to open it in Google Chrome, Microsoft Edge, or Firefox.

### Option 2: Local HTTP Server (Python)
From the root workspace directory, run:
```bash
python -m http.server 8080
```
Then navigate to: `http://localhost:8080/analytics/index.html`

---

## 5. Deployment Options

### Deploying via GitHub Pages
1. Go to repository **Settings** on GitHub ➔ **Pages**.
2. Under **Build and deployment** ➔ **Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)` or configure a GitHub Actions Pages workflow.
4. Once deployed, the analytics application will be live at:  
   `https://omaremadahmed.github.io/omaremadahmed/analytics/`

### Deploying via Vercel / Netlify
1. Connect the repository `omaremadahmed/omaremadahmed` to Vercel or Netlify.
2. Root directory: `./`
3. Output directory: `./analytics` (or access via `/analytics/index.html`).

---

## 6. Privacy & Security Assurance

- **Zero Secrets:** No Personal Access Tokens (PATs) or API keys are embedded or required.
- **Zero Private Leaks:** Private repositories (`House120`, `Housemar`) are not queryable via public unauthenticated API endpoints, ensuring total data confidentiality.
- **Zero Third-Party Trackers:** No tracking pixels, Google Analytics, or third-party advertising scripts.
