# Assets Directory Documentation & Visual Architecture Guide

This directory contains the visual system, original vector graphics, architectural schematics, and identity assets for the engineering portfolio of **Omar Emad Ahmed** (`omaremadahmed`).

---

## 1. Visual Identity Standards & Color Tokens

All custom SVG graphics follow a cohesive Dark Luxury & High-Integrity Engineering design language:

| Design Token | Hex Code | Purpose & Semantic Role |
|:---|:---|:---|
| **Canvas Background** | `#060b18` | Deep Obsidian Navy foundation across all diagrams |
| **Card / Surface Fill** | `#0a1224` / `#0c1425` | Elevated surface containers and grouping boundaries |
| **Header Accent** | `#111d35` | Title container blocks and structural headers |
| **Primary Border** | `#1a2744` | High-contrast structural line division |
| **Electric Blue Accent** | `#3b82f6` | Primary interactive color, arrows, and key highlights |
| **Radiant Cyan Highlight** | `#60a5fa` | Flow highlights, text callouts, and hover simulation |
| **Emerald Verification** | `#10b981` | Passing pipelines, active states, and database health |
| **Amber Caution** | `#f59e0b` | Pause states, operational warnings, and telemetry |
| **Primary Text** | `#ffffff` / `#e6edf3` | High-contrast sans-serif typography |
| **Secondary Text** | `#8b949e` / `#93c5fd` | Monospace code labels and metadata |

---

## 2. Inventory of Visual Assets

| Asset Filename | Format | Dimensions | Purpose & Placement | Animation Technique |
|:---|:---:|:---:|:---|:---|
| `omar-emad-banner.jpg` | JPEG | 100% responsive | Hero Profile Banner (Preserved) | Static (Preserved asset) |
| `omar-emad-profile.jpg` | JPEG | 1:1 portrait | Official Profile Portrait (Preserved) | Static (Preserved asset) |
| `animated-header-hud.svg` | SVG | 900×120 (`100%`) | Header HUD bar below hero banner | CSS `@keyframes` (laser scan, status blink, border glow) |
| `animated-section-divider.svg` | SVG | 800×32 (`100%`) | Elegant section divider with chess knight | CSS `@keyframes` (traveling light pulse, knight breathing glow) |
| `portfolio-navigation-banner.svg` | SVG | 880×180 (`100%`) | Section 2: Portfolio Hubs & strategic routing | CSS `@keyframes` (border breathing glow) |
| `diagram-clean-architecture.svg` | SVG | 880×440 (`100%`) | Section 24: Enterprise News Platform Clean Architecture | CSS `@keyframes` (dashed flow line translation, core pulse) |
| `diagram-bezrah-mirroring.svg` | SVG | 880×280 (`100%`) | Section 25: Bezrah Arabic/English RTL/LTR mirroring engine | CSS `@keyframes` (mirroring flow pulse, logical dashes) |
| `diagram-study-planner-automata.svg` | SVG | 880×260 (`100%`) | Section 25: Pomodoro Finite-State Machine lifecycle | CSS `@keyframes` (state pulse glow, transition dashes) |
| `diagram-devops-pipeline.svg` | SVG | 880×300 (`100%`) | Section 15: CI/CD, Quality Gate & Docker orchestration | CSS `@keyframes` (pipeline flow dashes, status pulses) |
| `animated-footer-signature.svg` | SVG | 880×140 (`100%`) | Section 35: Official signature with chess knight | CSS `@keyframes` (knight emblem glow, status pulse) |
| `section-divider.svg` | SVG | 800×20 | Static fallback divider | Static SVG |

---

## 3. GitHub Camo Renderer Compatibility & Validation

GitHub renders image references through its **Camo image proxy** (`camo.githubusercontent.com`). To guarantee 100% compatibility and zero broken elements:

1. **Strictly Vector-Only & Self-Contained:** Every SVG defines its own gradients, filters, and animations internally inside `<defs>` and `<style>`.
2. **Zero JavaScript Execution:** GitHub strictly sanitizes and strips `<script>` tags from SVGs. None of the SVGs contain any JavaScript.
3. **Pure CSS `@keyframes`:** Animation is achieved using standard CSS transforms (`translateX`, `stroke-dashoffset`, `opacity`, `filter`). These are natively rendered by Chromium, WebKit, and Gecko engines inside `<img>` tags.
4. **Fallback Typography:** Fonts utilize a cross-platform font stack (`'JetBrains Mono', Consolas, Monaco, monospace` and `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) to prevent external font network dependencies.
5. **Accessibility & Responsive Scalability:** All SVGs declare a scalable `viewBox` with `width="100%"` ensuring seamless scaling on high-DPI desktop screens and mobile viewports.

---

## 4. Maintenance & Validation Checklist

When modifying or adding new visual assets:

```bash
# 1. Validate SVG XML syntax
python -c "import xml.etree.ElementTree as ET, glob; [ET.parse(f) for f in glob.glob('assets/*.svg')]; print('All SVGs parsed successfully!')"

# 2. Check file size limits (< 50 KB per SVG recommended)
ls -lh assets/
```
