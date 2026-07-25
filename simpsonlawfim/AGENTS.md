# AGENTS.md — Simpson Law Firm Website

This file tells any coding agent (Claude Code, Cursor, Copilot Workspace, etc.) how to build,
extend, and review this project. It is the source of truth for architecture, conventions, and
non‑negotiable rules. If an instruction in a prompt conflicts with this file, this file wins
unless a human explicitly overrides it in writing in the PR description.

The static prototype (`simpson-law-firm.html`) is the **design reference**. It is not legacy
code to preserve line-for-line — it's the visual and tonal contract every screen must honor
when re-implemented as a React + Django app. Content in the prototype (firm name, address,
phone, attorney names/bios, practice areas) reflects Simpson Law Firm's real, public business
information — treat it as authoritative unless the client provides updates.

The live site at `https://www.simpsonlawpartners.net/` is the **content reference** for page
structure, copy, and navigation. Our build replaces the Hibu template with a custom React +
Django app while preserving the same pages, content, and information architecture.

---

## 1. Project Summary

- **Product**: Multi-page marketing + intake website for **Simpson & Simpson Attorney at Law**, a personal
  injury and litigation practice in Searcy, AR.
- **Firm Name**: **Simpson & Simpson Attorney at Law** (NOT "Simpson Law Firm", NOT "Simpson Law Partners")
- **Phone**: (501) 279-9292
- **Address**: 200 N Spring St, Searcy, AR 72143
- **Email**: info@simpsonlawpartners.net
- **Founded**: 2008
- **Tagline**: "Protecting Your Rights Since 2008"
- **Goal**: Convert visitors into scheduled free consultations. Every page exists to build
  trust and move someone toward the contact form or phone number.
- **Audience**: Non-lawyers in a stressful moment (accident, arrest, divorce). Copy and UI must
  never read as cold, corporate, or condescending — this firm's real differentiator is being
  locally and family owned, and personally responsive (home/hospital/jail visits).
- **Stack**: React (frontend) + Django REST Framework (backend API) + PostgreSQL.

---

## 2. Pages & Navigation

The site has these pages, matching the live site's information architecture:

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, tagline, practice area cards, "Outstanding Legal Counsel" section, video, CTA |
| **Personal Injury** | `/practice-areas/personal-injury` | Detail page for personal injury cases |
| **Wrongful Death** | `/practice-areas/wrongful-death` | Detail page for wrongful death cases |
| **Tractor-Trailer/Car Accident** | `/practice-areas/vehicle-accidents` | Detail page for vehicle accident cases |
| **Criminal Law** | `/practice-areas/criminal-law` | Detail page for criminal defense |
| **Litigation** | `/practice-areas/litigation` | Detail page for civil litigation |
| **Divorce/Custody** | `/practice-areas/divorce-custody` | Detail page for family law |
| **Community Involvement** | `/community-involvement` | Community engagement and local involvement |
| **Reviews** | `/reviews` | Client testimonials and reviews |
| **About Us** | `/about` | Firm history, attorney bios, mission |
| **Contact** | `/contact` | Contact form, office info, map |
| **Request a Call Back** | `/request-a-call-back` | Dedicated intake form |

**Navigation structure:**
- Home
- Practice Areas (dropdown with 6 sub-pages)
- Community Involvement
- Request a Call Back
- Reviews
- About Us
- Contact

---

## 3. Repository Layout

```
/frontend                 React app (Vite + TypeScript)
  /src
    /components           Reusable, presentational components (no data fetching)
    /features             Feature folders (practice-areas, team, testimonials, contact)
    /pages                Route-level components
    /lib                  API client, hooks, utilities
    /styles               Design tokens (tokens.css), global styles
    /assets               Images, fonts, icons
  /public                 Static assets (favicon, robots.txt)
  vite.config.ts
  package.json

/backend                  Django project
  /config                 settings, urls, wsgi/asgi
  /apps
    /practice_areas       PracticeArea model + API
    /team                 TeamMember model + API
    /testimonials         Testimonial model + API
    /inquiries            ContactInquiry model + API
    /offices              Office model + API
    /pages                Static page content model (Community Involvement, etc.)
  manage.py
  pyproject.toml

AGENTS.md                 (this file)
docker-compose.yml
.env.example
```

Agents must not invent alternate top-level folders (e.g. `src/` at repo root, `api/` instead
of `backend/`). If the layout must change, propose it in the PR description first.

---

## 4. Design Tokens (do not deviate without approval)

Port these directly from the HTML prototype into `/frontend/src/styles/tokens.css` as CSS
custom properties, and mirror them in the Tailwind config (`theme.extend.colors`,
`theme.extend.fontFamily`) if Tailwind is used.

```css
--ink:        #2B2924;   /* primary text, dark surfaces */
--ink-soft:   #4A4638;   /* secondary text on light surfaces */
--paper:      #E8E1D0;   /* section background (warm bone) */
--paper-white:#F8F4E9;   /* card / content background */
--brass:      #A83E32;   /* primary accent — terracotta red, buttons, links, active states */
--brass-light:#C36B55;   /* accent hover / highlight */
--ribbon:     #6E2A25;   /* deep accent — stamps, eyebrows, dark-surface accents */
--moss:       #5C6B4C;   /* tertiary accent, used sparingly for variety (avatars etc.) */
--slate:      #6E6A5C;   /* muted body copy */
```

**Rules:**
- Never introduce gold/brass-yellow or navy-blue as primary accents — this palette was
  deliberately chosen to avoid the generic "AI trust-badge" look (navy+gold, or
  black+neon-green). Stay in the warm charcoal / bone paper / terracotta-red family.
- Typography: **Fraunces** (display/serif, headings), **Inter** (body/UI), **IBM Plex Mono**
  (docket numbers, labels, data), **Caveat** (handwritten accents only — attorney monograms,
  small human touches; never for body copy or anything load-bearing/legible-critical).
- Keep the "case file" visual language: folder-tab navigation for practice areas, docket-style
  numbering, hand-stamped (organic, slightly rotated) shapes instead of perfect circles/badges.
  This is the site's signature — don't flatten it into generic cards during the React rebuild.
- Any new component must reuse tokens, not hard-coded hex values. A PR introducing a raw hex
  color outside this list should be rejected in review.

---

## 5. Data Model (Django apps)

| App             | Model              | Key fields |
|-----------------|--------------------|------------|
| `practice_areas`| `PracticeArea`     | `slug`, `title` (Personal Injury, Wrongful Death, Tractor-Trailer/Car Accident, Criminal Law, Litigation, Divorce/Custody), `docket_number` (int), `summary`, `body`, `bullet_points` (JSON/array), `stamp_label`, `stamp_body`, `order`, `hero_image`, `meta_description` |
| `team`          | `TeamMember`       | `slug`, `name` (e.g. James A. Simpson, Jr.; Clay Eliot Simpson), `role`, `bio`, `initials`, `avatar_color` (choice), `order`, `is_active`, `photo` |
| `testimonials`  | `Testimonial`      | `quote`, `attribution` (role-based, e.g. "Personal Injury Client" — **never** a full real name/photo without signed consent on file), `practice_area` (FK, nullable), `is_published`, `rating` |
| `offices`       | `Office`           | `name`, `address_line1` (200 N Spring St), `address_line2`, `city/state/zip` (Searcy, AR 72143), `phone` ((501) 279-9292), `hours` (JSON), `lat`, `lng` |
| `inquiries`     | `ContactInquiry`   | `full_name`, `phone`, `email` (optional), `matter_type` (FK to PracticeArea or choice), `details`, `created_at`, `status` (`new`/`contacted`/`closed`), `source_page` |
| `pages`         | `StaticPage`       | `slug`, `title`, `body` (rich text), `meta_description`, `is_published` — for Community Involvement, About Us, etc. |

Rules:
- All content models are editable via Django Admin. Marketing/firm staff must be able to
  update copy without a deploy.
- `ContactInquiry` is **not** editable content — it's user-submitted PII. See §8.

---

## 6. API Conventions

- Base path: `/api/v1/`.
- Read-only public endpoints (`practice-areas`, `team`, `testimonials`, `offices`, `pages`) are DRF
  `ReadOnlyModelViewSet`s, paginated, cached at the view or CDN layer (content changes rarely).
- `POST /api/v1/inquiries/` is the only public write endpoint. It:
  - Is throttled (DRF `AnonRateThrottle`, e.g. 5/hour per IP) to prevent spam/abuse.
  - Validates and sanitizes all fields server-side regardless of frontend validation.
  - Never echoes back stored PII in the response — return `{"status": "received"}` plus a
    reference id, nothing else.
  - Triggers a notification (email/Slack webhook) to intake staff, not a synchronous
    third-party call blocking the response — use a background task (Celery/RQ) if any
    external call is needed.
- Use DRF serializers for all input validation. No raw `request.POST` access in views.
- Version the API from day one (`/api/v1/`) even though there's only one version now.
- Errors follow DRF's standard error shape; don't invent a custom error envelope.

---

## 7. Frontend Conventions

- **Functional components only**, hooks for state/effects. No class components.
- Data fetching lives in `/lib/api` (typed client functions) or a small React Query/TanStack
  Query layer — never `fetch` calls scattered inside presentational components.
- Naming: `PascalCase` for components/files (`PracticeAreaTabs.tsx`), `camelCase` for
  functions/variables, `kebab-case` for CSS classes if not using CSS Modules/Tailwind.
- One component = one responsibility. The folder-tab "case file" widget, the contact form, and
  the hero should each be self-contained, reusable components with typed props — not one giant
  `HomePage.tsx`.
- Accessibility is not optional (see §9) — build it in per component, not as a final pass.
- Respect `prefers-reduced-motion` for every animation/transition, matching the prototype.
- Images: use `next-gen` formats (WebP/AVIF) with fallbacks, explicit width/height to avoid
  layout shift, and meaningful `alt` text. No fake stock photos of "attorneys" presented as if
  real unless they are the client's actual, approved headshots.

---

## 8. Legal-Industry Compliance Rules (non-negotiable)

This is a law firm site. These rules exist because they are real regulatory/ethical
requirements for legal marketing in the U.S., not house style preferences:

1. **Attorney Advertising disclaimer** must appear in the footer of every page, unchanged in
   substance: *"Attorney Advertising. Prior results do not guarantee a similar outcome."* (or
   the client's approved variant). Do not remove or bury it.
2. **No legal advice disclaimer**: any blog/FAQ/resource content must state that it is general
   information, not legal advice, and does not create an attorney-client relationship until
   engagement is signed. The contact form must not promise representation.
3. **Testimonials**: never attribute a testimonial to a full real name + case outcome without
   documented client consent on file. Default to role-based attribution ("Family Law Client")
   unless the client firm supplies signed releases.
4. **PII handling for `ContactInquiry`**: treat submitted details (case facts, phone, email) as
   sensitive. Encrypt at rest if the hosting provider doesn't already, restrict admin access by
   role, and define a data retention/deletion policy with the client rather than keeping
   inquiries indefinitely.
5. **ADA / accessibility**: law firm websites are a common target of ADA web-accessibility
   litigation in the U.S. WCAG 2.1 AA is a floor, not a stretch goal — see §9.
6. **Jurisdiction-specific bar rules**: this firm practices in Arkansas. Confirm any new
   marketing copy against the Arkansas Rules of Professional Conduct (Rule 7.1–7.5 govern
   lawyer advertising) before publishing — don't assume compliance. Flag for human legal
   review rather than guessing.

---

## 9. Accessibility Standard

- Target: **WCAG 2.1 AA** minimum across the whole site.
- All interactive elements (folder tabs, form fields, nav) must be keyboard-operable and have
  visible focus states (the prototype's `:focus-visible` outline is the baseline — keep it).
- Color contrast: verify every text/background pairing from the token list against WCAG AA
  contrast ratios before shipping a new component; several accent-on-accent combinations (e.g.
  `--brass` text on `--paper`) need checking, not assuming.
- Forms: every input has a associated `<label>`, inline error messages are announced to screen
  readers (`aria-live` or `aria-describedby`), and the contact form works fully without
  JavaScript for the base submission where feasible (progressive enhancement).
- Motion: respect `prefers-reduced-motion`; no autoplay video/audio.
- Run automated checks (axe-core / Lighthouse a11y) in CI on every PR; a regression below the
  agreed score threshold blocks merge.

---

## 10. Code Quality / Tooling

**Frontend**
- Lint: ESLint (`eslint-config-airbnb-typescript` or equivalent) + Prettier, enforced in CI.
- Types: TypeScript strict mode. No `any` without a `// TODO` comment explaining why.
- Tests: React Testing Library + Vitest/Jest. Every feature component gets at least one
  rendering test and one interaction test (e.g. clicking a folder tab shows the right case
  file).

**Backend**
- Style: `black`, `isort`, `flake8` (or `ruff`), enforced in CI. PEP 8 throughout.
- Type hints on all function signatures; `mypy` in CI if the project adopts it.
- Tests: `pytest` + `pytest-django`. Every model, serializer, and view/endpoint has test
  coverage, including the throttling and validation behavior on `ContactInquiry`.
- Migrations are committed with the PR that changes models — never generated ad hoc later.

**Both**
- No secrets in code or committed `.env` files — only `.env.example` with placeholder values.
- Environment variables documented in `.env.example` with a one-line comment each.

---

## 11. Environment Variables (baseline — extend as needed)

```
# backend
DJANGO_SECRET_KEY=
DJANGO_DEBUG=False
DATABASE_URL=postgres://user:pass@localhost:5432/simpson_law
ALLOWED_HOSTS=
CORS_ALLOWED_ORIGINS=
INQUIRY_NOTIFY_EMAIL=
INQUIRY_NOTIFY_WEBHOOK_URL=

# frontend
VITE_API_BASE_URL=
```

---

## 12. Git / PR Workflow

- Branch naming: `feature/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`.
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
- Every PR description states: what changed, why, how it was tested, and any screenshots for
  visual changes (required for anything touching `/styles` or a shared component).
- No direct commits to `main`. All changes go through PR review, even agent-authored ones.
- CI must pass (lint, type check, tests, a11y check) before merge.

---

## 13. Definition of Done (checklist for any change)

- [ ] Matches the design tokens and "case file" visual language in §4 — no unapproved colors.
- [ ] Keyboard-navigable and passes automated a11y checks (§9).
- [ ] Server-side validation exists for any new user input, independent of frontend validation.
- [ ] Tests added/updated on both frontend and backend as applicable.
- [ ] No secrets, no PII, no fabricated client testimonials or unverified firm facts committed.
- [ ] Attorney advertising / no-legal-advice disclaimers still present and unmodified.
- [ ] Responsive from mobile (375px) up, `prefers-reduced-motion` respected.
- [ ] PR description filled out per §12.

---

## 14. What Agents Should Ask a Human For

Do not guess on these — flag them explicitly instead of assuming:
- **Unverified details**: the email (`info@simpsonlawpartners.net`) and hours are from the
  live site but should be confirmed with the client before launch.
- Signed testimonial releases before publishing any real client name or photo — the prototype
  intentionally uses role-based attribution ("Personal Injury Client") instead of real names.
- Legal review of any new page copy that makes claims about outcomes, fees, or guarantees,
  checked against Arkansas's lawyer advertising rules.
- Updated attorney headshots/photos to replace the initials-based avatars, with the client's
  approval to use them publicly.
- Analytics/tracking tool choice (and a cookie consent approach if one is added) — none is
  wired up in the prototype.
- Community Involvement page content — the live site has this page but content was not
  extractable from the Hibu template. Get the real content from the client.
- Video content — the live site has a "Watch Our Video" section. Confirm if video assets
  exist and should be included.

---

## 15. Client Requirements Summary

The client wants a **complete, production-ready, multi-page website** — NOT a demo or
single-page prototype. Key requirements:

1. **All real content** — real phone number, real address, real email, real statistics
2. **Multiple pages** — Home, 6 Practice Area pages, Community Involvement, Reviews, About Us, Contact, Request a Call Back
3. **No placeholders** — no "Coming Soon", no zeroed statistics, no stock photos of "attorneys"
4. **Custom domain** — production-ready, not a Vercel subdomain
5. **Perfect attention to detail** — firm name is "Simpson & Simpson Attorney at Law" everywhere
6. **Human-quality code** — not obviously AI-generated; professional, clean, well-structured
7. **Ready to show** — the client will present this to the actual attorney for approval
