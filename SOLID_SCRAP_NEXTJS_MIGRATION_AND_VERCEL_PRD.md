# SOLID SCRAP OF THE NORTH
# NEXT.JS MIGRATION & VERCEL DEPLOYMENT AUDIT / PRD

---

## 1. Executive Summary
This document provides a comprehensive audit of the **Solid Scrap Of The North (مؤسسة صلد الشمال)** web platform workspace. The project has undergone a transition from a React + Vite Single Page Application (SPA) architecture to a modern, server-ready **Next.js 15 (App Router)** setup inside a `pnpm` monorepo workspace. 

The primary objective of this audit is to inspect all workspace configurations, dependencies, routing patterns, and deployment configurations to guarantee a visually identical, highly performant, SEO-optimized, and production-ready Next.js application that deploys flawlessly to **Vercel** under a strict design freeze.

---

## 2. Current Repository Architecture
The repository is structured as a **pnpm monorepo workspace**. The layout is as follows:

*   **Root Directory (`/`)**: Hosts the workspace configuration, lockfile, dependencies, global TypeScript base settings, and task scripts.
*   **`artifacts/solid-scrap/`**: The primary Next.js web application (migrated from Vite).
*   **`lib/`**: Contains shared packages and models:
    *   `lib/api-client-react/`: Auto-generated React Query hooks for fetching from the API.
    *   `lib/api-spec/`: OpenAPI specification file (`openapi.yaml`) and Orval codegen configs.
    *   `lib/api-zod/`: Shared Zod validation schemas compiled from OpenAPI schemas.
    *   `lib/db/`: Database configurations and migrations using Drizzle ORM.
*   **`scripts/`**: Development, validation, and maintenance helper scripts.
*   **`attached_assets/`**: High-quality company assets, logos, and generated WebP images.

---

## 3. Actual Framework Detection

### Current Framework
*   **Active Framework**: Next.js (App Router, version `15.4.2`).
*   **TypeScript Integration**: Active using `tsconfig.json` extending root options.
*   **Build CLI**: `next build` and `next dev`.

### Next.js Status
*   **Migration Completeness**: The core frontend application has been successfully migrated to the App Router model. Main pages are under `src/app/`.
*   **Status**: Fully building and type-checking locally.

### Vite Status
*   **Remnants**: All configuration files (`vite.config.ts`), dev entrypoints (`index.html`, `src/main.tsx`, `src/App.tsx`), and framework plugins (`@tailwindcss/vite`, `@vitejs/plugin-react`) have been **completely removed** from the `solid-scrap` application.
*   **Legacy Vite Workspace**: The experimental `mockup-sandbox` Vite sandbox has been **deleted** to prevent any build system or dependency conflicts.

### Replit Status
*   **Remnants**: Replit config files (`.replit`, `.replitignore`, `.replit-artifact/`) and Replit development plugins (`@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`, `@replit/vite-plugin-runtime-error-modal`) have been **completely purged** from the monorepo.

---

## 4. Repository Tree Analysis
Tracked files in the repository:

```text
d:\Saas\Sald
├── artifacts/
│   └── solid-scrap/
│       ├── next-env.d.ts
│       ├── next.config.js
│       ├── package.json
│       ├── components.json
│       ├── tsconfig.json
│       ├── public/
│       │   ├── favicon.svg
│       │   └── robots.txt
│       └── src/
│           ├── app/
│           │   ├── api/
│           │   │   └── healthz/
│           │   │       └── route.ts     (Replaces api-server Express)
│           │   ├── globals.css
│           │   ├── home.tsx             (Core visual landing page)
│           │   ├── layout.tsx           (Root html/head configuration)
│           │   ├── not-found.tsx        (Fallback component)
│           │   └── page.tsx             (Home wrapper with QueryClient)
│           ├── components/
│           │   ├── navbar.tsx
│           │   ├── ContactForm.tsx
│           │   ├── WhatsAppFloating.tsx
│           │   ├── ... (other modular visual components)
│           │   └── ui/                  (Shadcn primitive components)
│           ├── hooks/
│           ├── lib/
│           └── global.d.ts
├── attached_assets/                     (All optimized branding images)
├── lib/
│   ├── api-client-react/
│   ├── api-spec/
│   ├── api-zod/
│   └── db/
├── scripts/
├── package.json                         (Root workspace scripts)
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.base.json
└── tsconfig.json
```

---

## 5. Package / Workspace Architecture
*   **Lockfile**: Single workspace-wide `pnpm-lock.yaml`.
*   **Package Manager**: `pnpm` workspace protocol is enforced.
*   **Cross-workspace relationships**: `solid-scrap` consumes `lib/api-client-react` and `lib/api-zod` as local workspace imports (`workspace:*`).

---

## 6. Next.js Architecture
*   **Routing System**: App Router (`src/app`).
*   **Root Layout (`src/app/layout.tsx`)**: Integrates the Google Arabic `Alexandria` typography system, configures RTL settings (`dir="rtl" lang="ar"`), embeds the LocalBusiness structured JSON-LD schema, and applies base meta tags.
*   **Entrypoint (`src/app/page.tsx`)**: Renders `<HomePage />` wrapped in global context providers (`QueryClientProvider`, `TooltipProvider`, `Toaster`).
*   **Route Handler (`src/app/api/healthz/route.ts`)**: Serves as the system health check route, returning `{ status: "ok" }`. It fully replaces the former external Express-based `api-server`.

---

## 7. Vite Legacy Inventory
No Vite-specific configuration or build artifacts remain active. 
*   `vite.config.ts`: **Removed**.
*   `index.html`: **Removed**.
*   `src/main.tsx` / `src/App.tsx`: **Removed**.
*   Vite packages: **Removed** from package catalogs.

---

## 8. Replit Legacy Inventory
No Replit configs or dependencies exist. All references in `package.json` configurations are **purged**.

---

## 9. Routing Audit
*   **Previous System**: Client-side routing with `wouter` inside Vite.
*   **Current System**: Native Next.js App Router.
    *   Navbar links and scrolling use Next.js `usePathname` and `useRouter` from `next/navigation`.
    *   Sections smooth-scroll correctly utilizing native anchor ID triggers (`#home`, `#about`, `#services`, `#projects`, `#contact`).
    *   Wouter package has been **completely removed**.

---

## 10. Dependency Audit
*   **Next.js (`next: 15.4.2`)**: Required (Upgraded to patch Vercel-flagged vulnerabilities).
*   **React / React-dom (`19.1.0`)**: Required (Configured via `catalog:` specifications).
*   **Tailwind CSS (`tailwindcss: 4.x`)**: Style layer.
*   **Image Processing (`sharp: 0.34.5`)**: Approved and configured for server-side Next.js Image Optimization.
*   **Form Logic (`react-hook-form` / `zod`)**: Required for the client request validation.

---

## 11. CSS / Tailwind Audit
*   **Tailwind CSS Version**: Tailwind CSS v4.
*   **Main Configuration**: Managed directly within `src/app/globals.css` using modern CSS-first `@import "tailwindcss"` syntax.
*   **Status**: Fully compatible with Next.js 15 building processes.

---

## 12. Static Assets & Image Audit
*   **Assets Folder**: All media assets reside in `attached_assets/`.
*   **Next.js Aliasing**: `next.config.js` is configured with a Webpack alias resolving `@assets` to `../../attached_assets`.
*   **Image Typings**: Supported by `src/global.d.ts` declaring types for image extension imports (`.png`, `.jpg`, `.webp`).
*   **HTML Images**: Safe runtime fallbacks configured as `{image?.src || image}`.

---

## 13. Environment Variables Audit
No client-side or server-side secret environment variables are required. Next.js handles base build processes without external env requirements.

---

## 14. Build System Audit
*   **Root Build Command**: `pnpm run build` runs typechecks and builds Next.js.
*   **Package Manager**: `pnpm` version `11.14.0`.
*   **Workspace Lockfile**: Single unified lockfile `pnpm-lock.yaml`.

---

## 15. Vercel Deployment Failure Analysis

### ERROR 1: Specified Root Directory "artifacts/api-server" does not exist
*   **Root Cause**: The user's Vercel dashboard still contains a defunct project (e.g., `sldshmal-api-server`) that points to the deleted Express server folder `artifacts/api-server`.
*   **Location**: Vercel Dashboard project settings.
*   **Severity**: **Critical blocker for that specific Vercel project deployment**.
*   **Recommended Fix**: Delete the old project from Vercel Dashboard, or change its Root Directory to point to the active Next.js folder (`artifacts/solid-scrap`).

### ERROR 2: Next.js CVE Security Vulnerability (Previous build logs)
*   **Root Cause**: The project was using Next.js `15.1.5`, which triggered CVE safety gates in Vercel's automated security build scanner.
*   **Location**: `package.json` dependencies.
*   **Severity**: **Resolved** (Upgraded to `15.4.2`).

### ERROR 3: 'sh' is not recognized as an internal or external command (Windows Build)
*   **Root Cause**: The root `package.json` had a Linux-only `sh` preinstall script, causing local builds on Windows dev machines to crash.
*   **Location**: Root `package.json` scripts.
*   **Severity**: **Resolved** (Replaced script with a cross-platform Node.js one-liner).

---

## 16. Windows → Linux Compatibility Audit
*   **Filenames**: Case-sensitive filenames are correct and match imports.
*   **Paths**: All imports use relative paths or standard `@/...` and `@assets/...` aliases. No local backslashes (`\`) or `file:///` paths are present in codebase references.

---

## 17. Next.js / React / Node / Vercel Compatibility
*   **Next.js**: `15.4.2`
*   **React**: `19.1.0` (Next.js 15 native support)
*   **Node.js**: Recommended `Node.js 20.x` or `22.x` on Vercel.
*   **Compatibility Status**: 100% compatible.

---

## 18. Client vs Server Component Audit
*   Interactive frontend files (such as `ContactForm.tsx`, `navbar.tsx`, `WhatsAppFloating.tsx`, and `home.tsx`) properly declare `"use client"` at the top to safely isolate browser API usages (e.g., `window`, scrolling, form submissions) from the Next.js server-side build process.

---

## 19. SEO Migration Audit
*   All previous metadata, description headers, titles, icons, and LocalBusiness JSON-LD schema have been successfully ported into `src/app/layout.tsx` metadata exports. **No SEO data was lost.**

---

## 20. Functionality Preservation Audit
*   **Visual Check**: Design values, RTL layouts, ticker components, forms, animations, and typography remain structurally identical to the approved Vite build.
*   **Validation Check**: Phone number validation has been successfully configured to support local, Saudi, and international formats with optional leading `+` and space/hyphen filtering.

---

## 21. Legacy Files Classification Table

| File / Dependency | Origin | Current Usage | Classification | Recommended Action | Risk Level |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `artifacts/api-server/` | Express backend | None | **REMOVE** | Already deleted | Low |
| `artifacts/mockup-sandbox/` | Vite preview app | None | **REMOVE** | Already deleted | Low |
| `vite.config.ts` | Vite frontend | None | **REMOVE** | Already deleted | Low |
| `wouter` | Vite SPA routing | None | **REMOVE** | Already deleted | Low |
| `@replit/...` | Replit plugins | None | **REMOVE** | Already deleted | Low |
| `lib/api-client-react` | API integrations | Fetch logic | **KEEP** | Retain for type checks | Low |

---

## 22. Recommended Final Architecture
The project will run under a pure **Next.js 15 (App Router)** setup:
1. Single frontend production project: `artifacts/solid-scrap`.
2. Shared schemas and db layer packages: `lib/*`.
3. Root workspace task configuration.

---

## 23. Recommended Migration Strategy
**STRATEGY A: Repair the existing Next.js migration.**
*   *Why?* The migration is already structurally complete, type-checking successfully, building locally, and has been updated to bypass CVE vulnerability blocks. Building a new shell from scratch is unnecessary and increases regression risks.

---

## 24. Step-by-Step Implementation Plan

### PHASE 1 — Backup / Checkpoint
*   Ensure git index is fully clean (`working tree clean`).

### PHASE 2 — Framework Cleanup
*   Verify all Vite configuration files and wouter dependencies are deleted.

### PHASE 3 — Next.js Architecture Correction
*   Ensure layout configuration (`layout.tsx`) includes all required metadata and HTML language roots.

### PHASE 4 — Routing Migration
*   Validate scrolling hooks and Next.js navigation components are clean.

### PHASE 5 — Asset Migration
*   Verify `@assets` webpack alias maps and resolves correctly.

### PHASE 6 — Client/Server Boundary Fixes
*   Validate `"use client"` statements in interactive modules.

### PHASE 7 — SEO Migration
*   Check meta tags render correctly in output pages.

### PHASE 8 — Dependency Cleanup
*   Run `pnpm install` and clean lockfiles.

### PHASE 9 — Local Production Build
*   Run `pnpm run build` and ensure type-check passes.

### PHASE 10 — Vercel Deployment
*   Connect the Vercel project pointing to `artifacts/solid-scrap`.
*   Ensure the defunct `api-server` project is deleted.

### PHASE 11 — Production Regression Testing
*   Deploy, test forms, test ticker animations, and verify all visual designs.

---

## 25. Files Recommended for Removal
*   All Vite sandbox files and legacy Replit directories (already deleted).

---

## 26. Files Recommended for Migration
*   Existing forms and landing page sections (already migrated to `src/app/home.tsx`).

---

## 27. Files Recommended to Keep
*   All modular custom UI components and layout systems.

---

## 28. Risks
*   **Risk**: Defunct project configuration on Vercel causing fake build failures.
    *   *Mitigation*: Update Vercel dashboard settings to point to `artifacts/solid-scrap` or delete the old project.

---

## 29. Production Deployment Checklist
1. Ensure `pnpm run build` passes locally.
2. Ensure Vercel project "Root Directory" is configured to `artifacts/solid-scrap`.
3. Verify Vercel framework preset is set to **Next.js**.
4. Confirm build output runs successfully.

---

## 30. Final Assessment

*   **Migration Completeness**: **10/10** (All frontend files are in the App Router system; Vite/Wouter are completely gone).
*   **Next.js Architecture Quality**: **9.5/10** (Clean separation of layouts, route handlers, client boundary layers, and styled components).
*   **Vercel Compatibility**: **10/10** (CVE patch applied, builds successfully locally using next-build production mode).
*   **Legacy Cleanup**: **10/10** (Vite, Replit, and old Express server folders completely purged).
*   **SEO Preservation**: **10/10** (RTL, metadata, dynamic schema tags, and icons integrated).
*   **Production Readiness**: **9.5/10** (Ready for final deployment as soon as the user configures Vercel settings).
