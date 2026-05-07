# NMC Smart City — Citizen Platform
### Design Concept v2.0 · Full Architecture · Nagpur Municipal Corporation

> **Positioning:** Not a government website. A premium, AI-first civic operating system.
> **Benchmarks:** Apple · Stripe · Linear · Tesla UI · Perplexity / Notion AI
> **North Star:** Pay your tax in 30 seconds. File a complaint in 60. Find any service in one sentence.

---

## 0 · The Constitution

| # | Principle | What it means in practice |
|---|---|---|
| 1 | **Conversation > Navigation** | Every primary task starts as a sentence. The home is an assistant, not a menu. |
| 2 | **One screen, one intent** | No page-to-page hops for a single task. Surfaces morph in place. |
| 3 | **Predict, then ask** | We pre-fetch what we know. Questions only when ambiguous. |
| 4 | **Calm, not loud** | Color and motion are reserved for meaning. |
| 5 | **Trust is visible** | Govt seal, encryption, and "where your tax goes" — present without shouting. |
| 6 | **Motion is grammar** | Transitions explain causality. Nothing teleports. |

---

## 1 · Information Architecture

```
/                    Home — civic intelligence layer
/ask                 Ask NMC — full AI chat (deep link via ?q=…)
/property            Property tax — discover · understand · pay · history
/map                 Smart City GIS — wards · projects · infra · pins
/report              Report an issue — photo/voice/geo · live tracking
/services            Civic services — certificates · licenses · NOCs · permits
/projects            Transparency portal — live works · budgets · tenders
/alerts              Emergency — weather · water · traffic · health
/data                Open data — KPIs · ward leaderboards · datasets · API
/community           Engagement — events · polls · volunteer drives · stories
```

**Global surfaces (always available):**
- ⌘K Command Palette — "Ask NMC anything"
- Floating Assistant pill (bottom-right)
- Live ticker (top right) — LIVE · HH:MM IST · N served today

**No 7-item top nav.** Navigation comes from: the AI assistant, the home service tiles, the footer sitemap, and ⌘K.

---

## 2 · Homepage Stack

The home is a sequence of **layers**, each scrolled into.

```
┌────────────────────────────────────────────────────────────┐
│ TopBar  · NMC seal · LIVE pill · Search ⌘K · Avatar       │
├────────────────────────────────────────────────────────────┤
│ AlertStrip  (live marquee — water shutdown, rebate window) │
├────────────────────────────────────────────────────────────┤
│ Hero  ·  "Pay your tax, in a moment."                     │
│        +  Property card with bill, animated CountUp,       │
│           ward progress, dark CTA pill (UPI)               │
├────────────────────────────────────────────────────────────┤
│ AskBar  ·  Secondary command bar, rotating placeholder     │
├────────────────────────────────────────────────────────────┤
│ CivicPulse  ·  4 metric tiles · sparklines · animated      │
├────────────────────────────────────────────────────────────┤
│ ServiceTiles  ·  6 large, photo-grade tiles to modules     │
├────────────────────────────────────────────────────────────┤
│ ProjectsRibbon  ·  Horizontal scroll · live projects       │
├────────────────────────────────────────────────────────────┤
│ TrustTheatre  ·  "Where your tax goes" — big-type facts    │
├────────────────────────────────────────────────────────────┤
│ CommunityRow  ·  Events · polls · campaigns                │
├────────────────────────────────────────────────────────────┤
│ Footer  ·  Sitemap · status · privacy · accessibility      │
└────────────────────────────────────────────────────────────┘
```

---

## 3 · Module-by-Module UX

### 3.1 `/ask` — AI Civic Assistant

**Empty state:** sparkle icon, big serif "Ask anything *civic.*", 6 starter chips, ⌘K composer pinned bottom.

**Conversation state:**
- User bubbles: dark pill, right-aligned.
- Assistant bubbles: typography-only, with a tiny sparkle avatar.
- Rich responses: a chat bubble can include a CTA pill ("See full breakdown →") that deep-links into the relevant module.
- Thinking state: 3 dots, animated.
- Composer: bottom-pinned glass bar, Shift+Enter for new line, ⌘K opens palette.

**Sample interactions** (rule-matched in the demo, LLM-grounded in production):

| User | Assistant |
|---|---|
| *"Why is my bill high?"* | "Your Q3 bill is ₹4,820. The biggest line items are general tax (₹2,200) and water benefit (₹980). Compared to last quarter you paid ₹4,640, so the increase is mostly from a 4% revision in water benefit cess. You qualify for a ₹240 rebate if you pay before May 31." → *[See full breakdown]* |
| *"Track my application"* | "I see one open application — Birth certificate, submitted April 28. Status: under verification at the Dharampeth zonal office. Estimated completion: 2 working days." → *[Open application]* |
| *"नल का कनेक्शन कैसे लूँ?"* | "You can apply for a new water connection through the Water service. It takes ~7 days. You'll need ID, address proof, and a property document. Want me to start the application?" → *[Start now]* |

**Hard rule:** money never moves through an LLM. Pay flows are deterministic UI; the LLM only explains.

### 3.2 `/property` — Property Tax

- Module hero: *"Pay, understand, and trace every rupee."*
- 3 feature cards: Find · Why this amount? · Pay in 30 sec.
- **Payment timeline** (the dashboard replacement) — vertical record of every paid period. No grid. Each row is a glass card.
- **How your tax is calculated** — split layout with a colored bar legend: General · Water · Sewerage · Education · Tree · Fire cess.
- AI deep link: *"Ask the AI to explain yours →"* → `/ask?q=Why+is+my+bill+high`

### 3.3 `/map` — Smart City GIS

- Two-column on desktop, stack on mobile.
- Left: stylized base map (~600px tall) with paper-tone gradient, road network, animated pulsing pins per category.
- Right: Layers panel (toggles for Tax · Water · Roads · Parks · Complaints), Search by ward, Stats card.
- Floating selected-property card overlaid on the map.

### 3.4 `/report` — Grievance Reporting

- 3-step composer: pick category (6 emoji-led tiles) → location (use my location · pin · type) → media (photo · voice · video).
- AI auto-routing chip: *"Routed to Roads dept · ~6 hours"*.
- After submit: live status timeline, *like an Uber tracker* — Submitted · AI routed · Crew assigned · On the way · Resolved.
- Side panel: live in your ward + median resolution time.

### 3.5 `/services` — Civic Services

- Search bar across 42 services.
- 9 service tiles with emoji + popular badge: Birth · Death · Trade · Water · Building · Mutation · NOC · Marriage · Pet.
- **Track like a delivery** section: an in-progress application card with 4-stage progress, document checklist, AI-assist deep link.

### 3.6 `/projects` — Transparency

- 4 KPI summary tiles: Active · Total value · Wards · On schedule.
- Project rows (full-width cards) with: category chip · ward · budget · progress bar · what's next · contractor.
- Tenders section as a gateway.

### 3.7 `/alerts` — Emergency

- Card stack of advisories with color-coded level badge (info / advisory / critical).
- Each card: detail · area · when, plus a 2-cell facts row.
- Side panel: opt-in toggles for what to be notified about, and emergency contacts (one tap to dial).

### 3.8 `/data` — Open Data

- 4 metric tiles with sparklines and trend.
- **Ward leaderboard** with composite civic score, animated bars.
- Datasets list (CSV/JSON/PDF) + REST API teaser.

### 3.9 `/community` — Engagement

- Events row (date tile + meta + register CTA).
- **Active polls** with animated yes/no bars and weighted-vote indicator.
- Stories: editorial cards with serif headlines.

---

## 4 · Component System

| Component | Purpose |
|---|---|
| `SiteShell` | Wraps every page · Aurora · TopBar · CommandPalette · FloatingAssistant · Footer |
| `TopBar` | NMC mark · LIVE pill · ⌘K · Avatar |
| `CommandPalette` | Global ⌘K modal · search NAV + AI suggestions · keyboard-driven |
| `FloatingAssistant` | Bottom-right contextual nudge pill (delays 2.2s before appearing) |
| `Aurora` | Slow-drifting ambient gradient mesh backdrop |
| `Section` | Consistent max-width + horizontal padding wrapper |
| `SectionLabel` | Eyebrow with hairline rules |
| `ModuleHero` | Reusable big-type module hero (eyebrow + display + italic + description + CTA + meta) |
| `MetricTile` | Stat card with CountUp animation + sparkline |
| `HeroCard` | Home property card with animated bill |
| `AskBar` | Secondary command bar with rotating placeholder |
| `AskNMC` | First-time-user hero variant |
| `PaymentSheet` | UPI-app picker bottom sheet · GPay/PhonePe/Paytm/BHIM |
| `ConfirmCheck` | Cinematic "Done." with serif + receipt + impact teaser |
| `Icon` | Single source for all SVG icons (stroke-consistent) |
| Home: `AlertStrip` `CivicPulse` `ServiceTiles` `ProjectsRibbon` `TrustTheatre` `CommunityRow` |

**Banned by default:** card grids of equal-height boxes, tables with rows/columns, accordions, tabs, multi-column forms. If you reach for one, ask whether it should be a timeline, a flip, or an inline expansion instead.

---

## 5 · Visual Language

### 5.1 Colour Tokens (semantic, restrained)

```
Surfaces (light)
  --bg          #F6F3EC   warm cream (book paper)
  --bg-2        #EFEAE0
  --surface     #FFFFFF
  --surface-2   #FBF9F3

Surfaces (dark)
  --bg          #0A0B0D
  --surface     #15171C

Ink scale
  --ink         #0B0C0E
  --ink-2       #2A2E33
  --ink-3       #5C636C
  --ink-4       #8A929B

Brand
  --accent      #E25822   warmer marigold (≤ once per visible viewport)
  --heritage    #1A3A5C   anchors trust
  --sage        #4F8B5C   success
  --amber       #C97A0E   advisory
  --danger      #B0331A   critical only

Glass
  --glass-stroke           rgba(11,12,14,0.07)  light · rgba(255,255,255,0.08) dark
  --glass-blur             22px
```

### 5.2 Typography

- **Display (hero, big numbers, editorial):** Fraunces variable (SOFT, opsz axes). Italic light weight is reserved for the "calm twin" of the headline.
- **UI / body:** Inter variable + Noto Sans Devanagari subset.
- **Numerals:** `tabular` utility — `font-variant-numeric: tabular-nums` so amounts don't wobble.

```
Display    clamp(40px, 7.5vw, 92px)   500   tracking -0.04em
H2         clamp(28px, 4vw, 44px)     500   tracking -0.02em
Body L     17px / 1.6                 400
Body M     14-15px / 1.55             400
Eyebrow    11px uppercase             500   tracking 0.22em
Numeral XL 80–100px tabular           500
```

Hierarchy is created by **size + weight**, not boxes.

### 5.3 Motion Vocabulary

| Token | Curve | Duration | Use |
|---|---|---|---|
| `enter` | (0.16, 1, 0.3, 1) | 400-600ms | Mount, fade-in |
| `morph` | (0.65, 0, 0.35, 1) | 650ms | Layout shifts, flips |
| `nudge` | (0.34, 1.56, 0.64, 1) | 250ms | Hover, focus, micro |
| `decompress` | (0.22, 1, 0.36, 1) | 800ms | Confirmation, success |

- Library: **Framer Motion**. (GSAP ScrollTrigger reserved for the Trust Theatre scroll story when added.)
- `prefers-reduced-motion` is honored — all motion degrades to opacity-only fades.

---

## 6 · AI-First Behaviour

1. **Intent classifier** (lightweight, on-device ONNX) → ~20 civic intents (`tax_inquiry`, `pay_dues`, `bill_explanation`, `complaint_register`, `rebate_check`, `application_status`, `service_lookup`…).
2. **Slot resolution** — assistant asks only what's missing.
3. **Action layer** — calls deterministic NMC APIs.
4. **Explanation layer** — Claude Haiku at edge for grounded answers, citation-backed from the actual data.

**Languages at launch:** English, हिन्दी, मराठी (voice via Web Speech API + server fallback).

**Personalization signals (returning users):**
- Last property accessed
- Outstanding dues
- Last UPI app
- Preferred language
All cached locally; pre-fetched on hero mount.

---

## 7 · Trust & Security

- **Visible signals**: NMC seal, "Govt secured · 256-bit · NPCI · BBPS" line in payment surfaces, blockchain-anchored audit trail for tenders.
- **Encryption everywhere**: TLS, no sensitive data in URLs or logs.
- **Privacy posture**: PostHog self-hosted, no third-party trackers.
- **Authentication**: OTP first, DigiLocker future. No passwords required for citizens at launch.
- **AI never moves money**: pay surfaces are deterministic UI. The LLM explains; it does not pay.

---

## 8 · Mobile Experience

- 80% of traffic. Mobile-first, but **not "shrunken desktop."**
- Hero takes 70% of viewport; assistant is the experience.
- Bottom-sheet pattern for payment confirmation (native feel, drag-indicator).
- Floating assistant pill in thumb zone.
- Maps are full-bleed when active.
- All swipes / pinch / long-press handled.
- Offline fallback: last-fetched bill viewable; payments queued for reconnection.

---

## 9 · Accessibility & Inclusivity

- WCAG 2.2 AA verified across both themes.
- Fully keyboard-navigable; assistant reachable in one Tab.
- Voice end-to-end for low-literacy users.
- Indian numbering format (₹4,82,000 not ₹482,000).
- `aria-live="polite"` for assistant state changes.
- Reduced-motion is a first-class variant.
- Elderly mode (planned): larger type, slower animations, fewer elements per screen.
- High-contrast mode (planned).

---

## 10 · Performance & PWA

| Metric | Budget |
|---|---|
| FCP on 3G | < 1.2s |
| TTI on 3G | < 2.0s |
| Initial JS | < 180kb gz |
| Lighthouse PWA / a11y | 100 / ≥95 |

- Edge-rendered hero (Vercel/Cloudflare).
- AI intent classifier shipped as ONNX Web (~2MB), lazy-loaded.
- Map tiles pre-cached per-ward via Service Worker.
- Background-sync queues offline payments.
- AVIF/WebP, Inter Variable subset (Latin + Devanagari), `font-display: optional`.

---

## 11 · Recommended Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 13.5 App Router (currently — upgrade to 15 once Node 20 is on the box) |
| Styling | Tailwind v3.4 + CSS-variable token system |
| Motion | Framer Motion + GSAP (for Trust Theatre) |
| Maps | Mapbox GL JS with custom NMC palette + tilt 45° |
| State | Zustand + React Query · offline-friendly |
| AI | On-device ONNX intent classifier + Claude Haiku at edge for explanations |
| Auth | OTP via mobile (DigiLocker future) |
| Payments | NPCI UPI Intent + Razorpay/BharatPe gateway |
| Analytics | PostHog (self-hosted) |
| Hosting | Vercel + Cloudflare for India edge |

---

## 12 · The Three "Wow" Moments

1. **The first sentence.** Type *"Pay my property tax"* on the home → hero card transforms → bottom sheet → tap UPI app → green check. **18 seconds.**
2. **Where your tax goes.** Scroll on home or open `/projects` → animated progress bars on real ward projects, "₹3.1 Cr funding the new Dharampeth water line." Live, not dressed up.
3. **The chat that does things.** *"Track my application"* → assistant returns the right answer with a deep-link CTA that opens the right module pre-filtered.

---

## 13 · What's built today (v1.0)

```
✓ Hero · property card · animated count-up
✓ Payment sheet · UPI cards · trust strip
✓ Confirmation · cinematic check · receipt · impact teaser
✓ Command palette · ⌘K global · NAV + AI suggestions
✓ TopBar · LIVE ticker · Search pill · avatar
✓ Aurora ambient backdrop · paper grain
✓ Floating assistant
✓ Footer with sitemap
✓ /ask · full chat with starters, thinking dots, deep-link CTAs
✓ /property · timeline + breakdown
✓ /map · stylized GIS · layer panel · pins
✓ /report · 3-step composer + Uber-style tracker
✓ /services · 9 services + open application tracker
✓ /projects · KPIs + live project rows + tenders
✓ /alerts · advisories + notification preferences + emergency contacts
✓ /data · KPIs + ward leaderboard + datasets + API
✓ /community · events + polls + stories
```

## 14 · Roadmap

- **v1.1** — Returning-user personalization · dark theme toggle · Mapbox real tiles
- **v1.2** — LLM-grounded `/ask` answers (Claude Haiku) · voice end-to-end
- **v1.3** — Real Trust Theatre with GSAP scroll storytelling
- **v1.4** — Self-service expansion — full certificate/license workflows
- **v2.0** — Native mobile app (React Native shell · same design system)

---

*Built for Nagpur. Designed for India. Benchmarked against the world.*
