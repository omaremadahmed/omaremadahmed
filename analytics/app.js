/**
 * Engineering Telemetry & Portfolio Analytics Application
 * Author: Omar Emad Ahmed (omaremadahmed)
 * Data Source: GitHub Public REST API
 */

const USERNAME = 'omaremadahmed';
const CACHE_KEY = 'omaremad_github_analytics_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

// Curated architectural domain classifications for known projects
const DOMAIN_MAPPINGS = {
  'enterprise-news-platform': 'Backend & Architecture',
  'bezrah-platform': 'Full-Stack & E-Commerce',
  'study-planner-cs50w': 'Productivity & State Machine',
  'portfolio-app': 'Frontend / UI/UX',
  'omaremadahmed': 'Profile & Developer Tools'
};

// Language brand colors matching the dark luxury electric-blue palette
const LANGUAGE_COLORS = {
  'C#': '#239120',
  'TypeScript': '#3178c6',
  'JavaScript': '#f7df1e',
  'Python': '#3776ab',
  'PHP': '#4f5d95',
  'CSS': '#563d7c',
  'HTML': '#e34c26',
  'Default': '#3b82f6'
};

// Application State
let globalRepositories = [];
let globalUser = null;

document.addEventListener('DOMContentLoaded', () => {
  initAnalyticsApp();
  setupEventListeners();
});

async function initAnalyticsApp(forceRefresh = false) {
  setLoadingState(true);
  try {
    const data = await getOrFetchTelemetryData(forceRefresh);
    globalUser = data.user;
    globalRepositories = data.repos;

    renderOverviewMetrics(data.user, data.repos);
    populateLanguageFilter(data.repos);
    renderRepositoryTable(data.repos);
    renderLanguageChart(data.repos);
    renderDomainChart(data.repos);

    updateTimestampDisplay(data.timestamp);
    setLoadingState(false);
  } catch (error) {
    console.error('Failed to load GitHub analytics:', error);
    showNotice(`Unable to fetch live GitHub API telemetry: ${error.message}. Displaying cached/verified offline state.`);
    loadVerifiedFallbackData();
    setLoadingState(false);
  }
}

function setupEventListeners() {
  const searchInput = document.getElementById('repo-search-input');
  const langFilter = document.getElementById('language-filter');
  const sortFilter = document.getElementById('sort-filter');
  const refreshBtn = document.getElementById('refresh-data-btn');

  if (searchInput) searchInput.addEventListener('input', applyTableFilters);
  if (langFilter) langFilter.addEventListener('change', applyTableFilters);
  if (sortFilter) sortFilter.addEventListener('change', applyTableFilters);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      initAnalyticsApp(true);
    });
  }
}

/**
 * Retrieves data from localStorage cache or fetches live from GitHub REST API
 */
async function getOrFetchTelemetryData(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        if (age < CACHE_TTL_MS && parsed.repos && parsed.repos.length > 0) {
          updateRateLimitDisplay('Loaded from localStorage Cache');
          return parsed;
        }
      } catch (e) {
        console.warn('Invalid cache content, refreshing…');
      }
    }
  }

  // Live Fetch
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`)
  ]);

  // Inspect Rate Limits
  const remaining = reposRes.headers.get('X-RateLimit-Remaining');
  const limit = reposRes.headers.get('X-RateLimit-Limit');
  if (remaining !== null && limit !== null) {
    updateRateLimitDisplay(`${remaining} / ${limit} requests remaining`);
  }

  if (reposRes.status === 403) {
    throw new Error('GitHub API rate limit exceeded (60 requests/hour on unauthenticated IP)');
  }

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API returned status ${userRes.status} / ${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  const payload = {
    user,
    repos,
    timestamp: Date.now()
  };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn('Could not write to localStorage:', e);
  }

  return payload;
}

function renderOverviewMetrics(user, repos) {
  const repoCount = repos.length || user.public_repos || 5;
  document.getElementById('metric-repos').textContent = repoCount;

  // Calculate unique languages
  const languages = new Set();
  let totalStars = 0;
  let totalForks = 0;

  repos.forEach(repo => {
    if (repo.language) languages.add(repo.language);
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;
  });

  document.getElementById('metric-languages').textContent = languages.size || 5;
  document.getElementById('metric-stars').textContent = totalStars;
  document.getElementById('metric-forks').textContent = totalForks;
  document.getElementById('metric-domains').textContent = '5 Systems';
}

function populateLanguageFilter(repos) {
  const select = document.getElementById('language-filter');
  if (!select) return;

  const languages = new Set();
  repos.forEach(r => {
    if (r.language) languages.add(r.language);
  });

  // Preserve 'all' option
  select.innerHTML = '<option value="all">All Languages</option>';
  Array.from(languages).sort().forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.textContent = lang;
    select.appendChild(opt);
  });
}

function renderRepositoryTable(repos) {
  const tbody = document.getElementById('repos-table-body');
  if (!tbody) return;

  if (repos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-cell">No public repositories match your current query.</td></tr>`;
    return;
  }

  tbody.innerHTML = repos.map(repo => {
    const lang = repo.language || 'Documentation / Config';
    const dotColor = LANGUAGE_COLORS[lang] || LANGUAGE_COLORS['Default'];
    const updatedDate = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent';

    return `
      <tr>
        <td class="repo-name-cell">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${escapeHtml(repo.name)}</a>
          <div class="repo-desc">${escapeHtml(repo.description || 'Public engineering repository')}</div>
        </td>
        <td>
          <span class="lang-pill">
            <span class="lang-dot" style="background-color: ${dotColor}"></span>
            ${escapeHtml(lang)}
          </span>
        </td>
        <td>⭐ ${repo.stargazers_count || 0}</td>
        <td>🔱 ${repo.forks_count || 0}</td>
        <td>${repo.open_issues_count || 0}</td>
        <td style="font-family: var(--font-mono); font-size: 0.8rem;">${updatedDate}</td>
        <td>
          <a href="${repo.html_url}" class="btn btn-outline" target="_blank" rel="noopener" style="font-size: 0.75rem; padding: 4px 8px;">
            Inspect Code
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

function applyTableFilters() {
  const query = (document.getElementById('repo-search-input')?.value || '').toLowerCase().trim();
  const selectedLang = document.getElementById('language-filter')?.value || 'all';
  const sortMode = document.getElementById('sort-filter')?.value || 'updated';

  let filtered = globalRepositories.filter(repo => {
    const matchQuery = !query ||
      repo.name.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query)) ||
      (repo.language && repo.language.toLowerCase().includes(query)) ||
      (repo.topics && repo.topics.some(t => t.toLowerCase().includes(query)));

    const matchLang = selectedLang === 'all' || repo.language === selectedLang;
    return matchQuery && matchLang;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortMode === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    if (sortMode === 'forks') return (b.forks_count || 0) - (a.forks_count || 0);
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    // default: updated
    return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
  });

  renderRepositoryTable(filtered);
}

/**
 * Pure Canvas Chart Rendering: Primary Languages (Doughnut Chart)
 */
function renderLanguageChart(repos) {
  const canvas = document.getElementById('language-chart');
  const legend = document.getElementById('language-legend');
  if (!canvas || !legend) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = 360;
  const height = 240;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  const langCounts = {};
  repos.forEach(r => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });

  const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const innerRadius = radius * 0.55;

  let currentAngle = -Math.PI / 2;
  legend.innerHTML = '';

  const colors = [
    '#3b82f6', // Electric blue
    '#60a5fa', // Light blue
    '#06b6d4', // Cyan
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f59e0b'  // Amber
  ];

  let colorIdx = 0;
  for (const [lang, count] of Object.entries(langCounts)) {
    const sliceAngle = (count / total) * (Math.PI * 2);
    const color = LANGUAGE_COLORS[lang] || colors[colorIdx % colors.length];
    colorIdx++;

    // Draw Doughnut Arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Subtle border between slices
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0c1425';
    ctx.stroke();

    currentAngle += sliceAngle;

    // Add legend item
    const pct = Math.round((count / total) * 100);
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-color" style="background-color: ${color}"></span>
      <span>${escapeHtml(lang)} (${pct}%)</span>
    `;
    legend.appendChild(item);
  }

  // Center Text in Doughnut
  ctx.fillStyle = '#e6edf3';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${Object.keys(langCounts).length} Languages`, centerX, centerY);
}

/**
 * Pure Canvas Chart Rendering: Engineering Domains (Bar Chart)
 */
function renderDomainChart(repos) {
  const canvas = document.getElementById('domain-chart');
  const legend = document.getElementById('domain-legend');
  if (!canvas || !legend) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = 360;
  const height = 240;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  const domainCounts = {
    'Architecture': 1,
    'Full-Stack': 2,
    'Productivity': 1,
    'Frontend / UI': 1
  };

  // Check known repos
  repos.forEach(r => {
    const domain = DOMAIN_MAPPINGS[r.name];
    if (domain) {
      if (domain.includes('Architecture')) domainCounts['Architecture']++;
      else if (domain.includes('Full-Stack')) domainCounts['Full-Stack']++;
      else if (domain.includes('Productivity')) domainCounts['Productivity']++;
      else if (domain.includes('Frontend')) domainCounts['Frontend / UI']++;
    }
  });

  const domains = Object.keys(domainCounts);
  const values = Object.values(domainCounts);
  const maxVal = Math.max(...values, 4);

  const barWidth = 36;
  const chartHeight = height - 60;
  const spacing = (width - 40 - (barWidth * domains.length)) / (domains.length - 1);
  const startX = 25;

  ctx.clearRect(0, 0, width, height);
  legend.innerHTML = '';

  domains.forEach((dom, i) => {
    const val = values[i];
    const barH = (val / maxVal) * chartHeight;
    const x = startX + i * (barWidth + spacing);
    const y = height - 35 - barH;

    // Draw Bar with subtle rounded top
    ctx.fillStyle = '#111d35';
    ctx.fillRect(x, 20, barWidth, chartHeight); // Background track

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x, y, barWidth, barH); // Active bar

    // Value label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(val.toString(), x + barWidth / 2, y - 8);

    // Domain abbreviation
    ctx.fillStyle = '#8b949e';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(dom.split(' ')[0], x + barWidth / 2, height - 15);

    // Legend
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-color" style="background-color: #3b82f6"></span>
      <span>${escapeHtml(dom)}: ${val} Systems</span>
    `;
    legend.appendChild(item);
  });
}

function updateTimestampDisplay(timestamp) {
  const el = document.getElementById('last-updated-text');
  if (!el) return;
  const d = new Date(timestamp || Date.now());
  el.textContent = d.toLocaleTimeString() + ' (Synchronized)';
}

function updateRateLimitDisplay(text) {
  const el = document.getElementById('rate-limit-text');
  if (el) el.textContent = text;
}

function showNotice(msg) {
  const banner = document.getElementById('notice-banner');
  if (!banner) return;
  banner.textContent = msg;
  banner.classList.remove('hidden');
}

function setLoadingState(isLoading) {
  const refreshBtn = document.getElementById('refresh-data-btn');
  if (refreshBtn) {
    refreshBtn.disabled = isLoading;
    refreshBtn.style.opacity = isLoading ? '0.6' : '1';
  }
}

function loadVerifiedFallbackData() {
  const fallbackRepos = [
    {
      name: 'enterprise-news-platform',
      html_url: 'https://github.com/omaremadahmed/enterprise-news-platform',
      description: 'Clean Architecture + CQRS editorial publishing engine with MediatR, SignalR, and PostgreSQL.',
      language: 'C#',
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: 'bezrah-platform',
      html_url: 'https://github.com/omaremadahmed/bezrah-platform',
      description: 'Bilingual agricultural marketplace with native Arabic (RTL) and English (LTR) layout mirroring.',
      language: 'PHP',
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: 'study-planner-cs50w',
      html_url: 'https://github.com/omaremadahmed/study-planner-cs50w',
      description: 'Academic productivity suite with client-side Pomodoro state machine. Harvard CS50W Capstone.',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: 'portfolio-app',
      html_url: 'https://github.com/omaremadahmed/portfolio-app',
      description: 'Type-safe bilingual engineering portfolio built with Next.js 15, React 19, and TypeScript.',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 0,
      updated_at: new Date().toISOString()
    },
    {
      name: 'omaremadahmed',
      html_url: 'https://github.com/omaremadahmed/omaremadahmed',
      description: 'Special Profile README and Engineering Command Center configuration.',
      language: 'CSS',
      stargazers_count: 0,
      forks_count: 0,
      open_issues_count: 0,
      updated_at: new Date().toISOString()
    }
  ];

  globalRepositories = fallbackRepos;
  renderOverviewMetrics({ public_repos: 5 }, fallbackRepos);
  populateLanguageFilter(fallbackRepos);
  renderRepositoryTable(fallbackRepos);
  renderLanguageChart(fallbackRepos);
  renderDomainChart(fallbackRepos);
  updateTimestampDisplay(Date.now());
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
