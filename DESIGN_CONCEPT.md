# NMC Smart City — Citizen Platform + Municipal ERP
### Design Concept v3.0 · Full Architecture · Nagpur Municipal Corporation

> **Positioning:** Two halves of a single AI-native operating system for the city.
> **Citizen side** — premium, AI-first civic experience. Apple · Stripe · Linear · Perplexity.
> **ERP side** — agentic operations console for commissioners and officers. Palantir · Linear · Bloomberg Terminal · Tesla UI.
> **North Star (Citizen):** Pay tax in 30 seconds. File a complaint in 60. Find any service in one sentence.
> **North Star (ERP):** Decide what matters today, in five minutes, with the AI doing the triage.

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

# Part II · Municipal ERP — `/erp`

> **Positioning:** Not municipal software. A municipal **operating system** for the people running the city.
> Not a dashboard. An **agentic console** that triages your day, surfaces risk, and lets you act in one click.
> The citizen side is the city's front door. The ERP is its **mission control**.

## E0 · The ERP Constitution

| # | Principle | What it means in practice |
|---|---|---|
| 1 | **AI is the primary interaction layer** | Every screen opens with what the AI thinks you should do next. The sidebar is reordered by AI ranking. The command bar (⌘K) is conversational, not a search. |
| 2 | **Action-first, not passive** | No screen is a read-only "report". Every metric clicks through to an action. Every escalation has an AI-suggested next step ready. |
| 3 | **Role-adaptive** | Six roles, six different homepages, six different AI insight panels, six different sidebar orderings. The system reshapes itself per persona. |
| 4 | **Risk made visible** | Heatmaps, severity badges, SLA timers, fraud signals — anything that needs human attention is surfaced loudly. Everything else stays quiet. |
| 5 | **Realistic, not generic** | Real ward names. Real fee structures. Real dept terminology. Real escalation patterns. No lorem ipsum. |
| 6 | **Audited everywhere** | Every action has a human or agent name attached, every screen mentions the audit trail. Trust is made structural. |
| 7 | **Cinematic, not corporate** | Dark theme. Layered depth. Subtle phosphor pulses on live data. Type-led headlines. This is Palantir-grade, not SAP-grade. |

## E1 · Information Architecture

```
/erp/sign-in           Role chooser · 6 personas · biometric step-up implied
/erp                   Commissioner cockpit (or auto-redirect by role)
/erp/revenue           CAFO · revenue intelligence · forecasts · campaigns
/erp/inspections       Field Inspector · today's route · SLA radar
/erp/approvals         Trade License Officer · queue + fraud flags
/erp/grievances        Grievance Command · heatmap + escalations
/erp/projects          Projects (planned) · multi-stage workflow board
/erp/intelligence      Intelligence (planned) · cross-dept patterns
```

Every page is wrapped by **`ErpShell`**:

```
┌──────────┬──────────────────────────────────────────────────────────┐
│          │   [topbar: live · time · ⌘K command bar · alerts · me]   │
│ Adaptive │ ┌──────────────────────────────────┬────────────────────┐│
│ Sidebar  │ │ Main content (cockpit / tables)  │  AI Insights Panel ││
│ (role +  │ │                                  │  (live, role-aware)││
│  AI rank)│ │                                  │                    ││
│          │ └──────────────────────────────────┴────────────────────┘│
│          │   [live ops ticker — ambient bottom strip]               │
└──────────┴──────────────────────────────────────────────────────────┘
```

## E2 · Roles & Persona Intelligence

| Role | Persona | Home view | AI surfaces |
|---|---|---|---|
| **Commissioner** | Dr. Anita Patil — Office of the Commissioner | `/erp` Cockpit | Risk heatmap, governance escalations, Q forecast, sentiment |
| **CAFO** | Suresh Bhandari — Finance | `/erp/revenue` | Defaulter recovery model, reconciliation gaps, campaign orchestrator |
| **Field Inspector** | Vikram Shinde — Public Works · Zone 4 | `/erp/inspections` | Optimised route, SLA breaches, photo evidence quality |
| **Trade License Officer** | Priya Deshmukh — Licensing · Zone 2 | `/erp/approvals` | Fraud signals, auto-approve safe renewals, inspection coord. |
| **Survey Officer** | Rahul Joshi — GIS & Property | `/erp` (cockpit-lite) | Survey backlog · prioritised route |
| **Revenue Officer** | Meera Kale — Property Tax · Ward 14 | `/erp/revenue` | Ward due window, door-to-door coord. |

Persona context drives:
- Sidebar item **weights** (commissioner sees Cockpit at top, CAFO sees Revenue, inspector sees Inspections)
- The **AI Insight panel** content (different forecasts, different alerts)
- The **AI shortcuts** at the top of the sidebar ("9 escalations need review" for commissioner; "3 SLA breaches imminent" for inspector)
- The **Command Console** suggestions ("Forecast Q4 collection" for CAFO; "Today's route" for inspector)

## E3 · The Adaptive Sidebar

Not a static menu. A panel with three regions, all reactive to role:

1. **Workspace block** — NMC Operations brand · current user (name, role, dept) · live status pill
2. **AI · prioritized for you** — 3 contextual shortcuts, each with a coloured dot indicating tone (danger / warn / sage / accent)
3. **Workspace nav** — ranked nav items, ordered by AI weight per role. Each item carries a live badge (e.g. "47 pending", "₹4.2 Cr today")

Footer of the sidebar shows **System status**: GIS sync · UPI gateway · AI agents active · Aadhaar API throttling. So you always know the operational stance of the platform itself.

## E4 · The AI Command Console (⌘K)

The primary navigation device. Opened from anywhere in the ERP via `⌘K` or the topbar pill.

- **Suggestions are role-tailored**, tagged as `Query` (asks the data), `Action` (mutates state), or `Jump` (navigates)
- Free-form input becomes a **conversation** — the assistant returns grounded answers in 1-2 paragraphs
- Sample dialogues (commissioner role):
  - *"Show me wards underperforming this quarter"* → "Three wards are >15% below their Q3 target: Mahal (52%), Lakadganj (58%), Sitabuldi (61%). Mahal also has the highest grievance backlog. Recommend a coordinated revenue + grievance push."
  - *"Why is Sitabuldi grievance rate spiking?"* → grounded explanation linking the May 4 storm → drainage failures → garbage backlog cascade.
  - *"Forecast Q3 collection at current trajectory"* → "On current trajectory, Q3 closes at ₹126 Cr (target: ₹130 Cr). Three levers can close the gap: …"
- **Hard rule**: every action requires explicit human approval. The AI suggests; the human commits.
- Footer of the console shows: `Govt-grade · audited` — every prompt and action is logged.

## E5 · Screen-by-Screen UX

### E5.1 `/erp/sign-in` — Role Selector

**Purpose:** show every persona is supported, then enter their workspace.
**User persona:** any officer, on first login or role switch.
**AI behaviour:** none yet — this screen is configuration.
**Layout:** dark hero with animated grid + glow. 6 role cards arranged in a responsive grid. Each card has emoji, role name, dept, blurb, capability chips, "Continue as [name]" CTA.
**Visual hierarchy:** large display heading ("The municipal operating system — signed in as.") then six tactile role cards.
**Operational logic:** clicking a card writes `nmc-erp-role` to localStorage and routes to that role's home (`ROLES[role].homeHref`).

### E5.2 `/erp` — Commissioner Cockpit (the marquee)

**Purpose:** "what does the city need from me today?" answered in five minutes.
**User persona:** Commissioner.
**AI behaviour:**
- **Action stack** — three top items, ranked, with severity badges (escalation / decision / approval)
- **AI Insights panel** — Sitabuldi grievance spike, Q3 forecast (with recommended levers), SLA risks, citizen sentiment
- **Risk heatmap** — wards coloured by composite score with the highest-risk wards visually loud
- **Escalation stream** — live feed of grievances reaching the commissioner's desk

**Adaptive behaviour:** the page redirects non-commissioners to their own home view on mount. The Live Ops ticker at the bottom is always running.
**Suggested actions:** the action stack is the primary CTA — "Review brief", "Review & approve", "Approve" — each one resolves an open decision in one click.
**Visual hierarchy:** cinematic hero strip ("Good evening, Anita. The city is mostly on track.") → action stack → KPI grid → heatmap + escalations → workflow timeline.
**Animations:** staggered card mounts, ward heatmap fade-up, KPI bars fill on scroll-into-view.
**Operational logic:** every escalation card carries a name, age, severity, and AI summary; every KPI carries trend; every action is one-tap.

### E5.3 `/erp/revenue` — CAFO Revenue Intelligence

**Purpose:** find the money, recover the money, prove the money.
**Persona:** CAFO; Revenue Officer (lighter view).
**AI behaviour:**
- **Defaulter intelligence** — top 5 of 342 high-value accounts, each with reason ("repeated non-response", "address mismatch · field check needed")
- **Forecast chart** — actual line + dashed forecast + dashed target; three "levers" toggleable as scenarios ("Top 800 reminders +₹3.4 Cr")
- **Reconciliation stream** — 4 unmatched UPI/card batches with auto-recon CTA
- **Campaign orchestrator** — pre-segmented 800 defaulters, channel mix (WhatsApp/SMS/Voice) optimised by past response rates, single "Approve & launch" gate

**Operational logic:** the AI does the segmentation, the human approves the launch. Every reminder sent is logged with `model v3.2` audit hash.

### E5.4 `/erp/inspections` — Field Inspector

**Purpose:** "what does my day look like, in optimal order?"
**Persona:** Field Inspector; Trade License Officer (when coordinating field work).
**AI behaviour:**
- **Optimised route** — 12 stops re-ordered, 22 minutes saved, avoids Wardha Rd 11–12 jam
- **SLA radar** — 3 inspections at risk, surfaced as a separate strip
- **Photo evidence quality** — running stat ("96% first-pass") to motivate good practice

**Layout:** two-pane on desktop — stylized dark map (with pulsing pins, route line, info card) on the left, ordered queue list on the right. Mobile-first considerations: this view is built to work on a 6" phone in the field.

### E5.5 `/erp/approvals` — Trade License Officer

**Purpose:** clear the queue safely. Approve safe ones in bulk, scrutinise risky ones.
**Persona:** Trade License Officer.
**AI behaviour:**
- **Queue triage** — every application carries a 0–100 risk score from the model. High → red, mid → amber, low → sage.
- **Fraud signals** — explicit chips on each card ("Duplicate PAN", "Address mismatch", "Premises photo doesn't match address")
- **Auto-approve 42** — single CTA in the hero clears the 42 low-risk renewals at once. The 5 flagged cases stay for human review.
- **Detail pane** — clicking an application opens an in-line detail with AI assessment paragraph, doc-by-doc verification status, flag explanations, and Approve / Send to inspection / Reject CTAs (with biometric step-up implied for high-risk).

### E5.6 `/erp/grievances` — Grievance Command

**Purpose:** see patterns, not just complaints. Decide where to act.
**Persona:** Commissioner; supporting role for Inspector / Trade Officer / CAFO.
**AI behaviour:**
- **Ward heatmap** — stacked bar per ward broken down by category (garbage / drainage / water / streetlight). Clicking surfaces ward detail.
- **Category trend** — 14-day line chart showing co-movement of garbage and drainage post-storm vs water trending separately
- **Escalations** — 9 cases at the bottom, each with severity, ward, age, AI summary, AI-suggested action ("Dispatch 2 sanitation crews + brief Zone 2 head"), and Approve / Open file CTAs

The view tells a **story**: the heatmap says "Sitabuldi & Mahal need help"; the trend explains "garbage and drainage spiked together"; the escalation list says "here's what to do about it".

## E6 · Visual Language (ERP)

The ERP **forces dark theme** (`<div className="dark">`) and overlays:
- A **grid background** at 4–5% opacity (mission-control vibe)
- A subtle **radial accent glow** at the top of the page

The token palette is the same as Citizen — but the same glass+ink+sage system reads differently against deep `--bg` `#0A0B0D`. We don't run a separate theme; we run the same theme darker.

Specific ERP treatments:
- **Borders are sharper** — `rounded-md` instead of `rounded-lg` for tables and rows. `rounded-[14px]` for cards.
- **Numerics are everywhere** — `tabular` font-feature applied to every number for stable column alignment.
- **Live indicators** — `live-dot` pulse on every "live" status, with `bg-sage` for healthy, `bg-amber` for degraded, `bg-danger` for critical.
- **AI presence** — sparkle icon in `bg-accent/15 text-accent` rounded squares marks every AI-driven surface.
- **Type weight** — Fraunces display reserved for hero headlines and big numerics only. Body is Inter at 11–14px for density.

## E7 · Motion vocabulary (ERP-specific additions)

| Token | Use |
|---|---|
| `enter-stagger` | Action stack, KPI grid, heatmap cells fade-up on viewport with 0.04–0.08s stagger |
| `live-pulse` | Existing pulse on live dots and ping rings on map pins |
| `ticker-marquee` | Bottom Live Ops ticker scrolls right-to-left at 30s/loop |
| `chart-draw` | Forecast lines and progress bars animate width 0 → target on scroll into view |

`prefers-reduced-motion` continues to honour and degrade everything to opacity-only fades.

## E8 · AI Agentic Behaviour (ERP)

Underneath the ERP run **9 AI agents** (visible in the sidebar's System Status):

| Agent | Owner | What it does |
|---|---|---|
| **Triage** | Grievances | Categorises every complaint, links related ones, escalates patterns |
| **Route** | Inspections | Re-orders inspections daily, accounts for traffic / SLA |
| **Forecast** | Revenue | Q-on-Q revenue projection with confidence bands |
| **Recon** | Finance | Auto-matches UPI/card batches to bills, surfaces gaps |
| **Fraud** | Approvals | Scores trade applications on PAN / address / ownership signals |
| **Recover** | Revenue | Segments defaulters and drafts personalised reminders in 3 languages |
| **Sentiment** | Governance | Aggregates citizen-side feedback into a single composite score |
| **Audit** | Cross-cutting | Every screen, every action, hashed and signed |
| **Brief** | Commissioner | One-page daily brief + on-demand "explain" for any KPI |

**Hard rules**:
- Money never moves through the LLM. Pay surfaces (citizen) and recovery campaigns (officer) are always human-confirmed.
- Every model output carries a confidence score and a model-version stamp.
- No LLM has write access to the ledger; only deterministic actions backed by RBAC.

## E9 · Trust & Audit (ERP-specific)

- **Aadhaar + RBAC** for officer auth (demo mode bypasses this for exploration)
- **Biometric step-up** required for: launching a recovery campaign, approving > ₹10 L worth of trade renewals in bulk, escalating to disciplinary action
- **Every page footer** says "Audit log on" — every interaction is logged with timestamp, user, role, action, and resulting state diff
- **Tender + recovery flows** are anchored to a state-government blockchain audit trail (planned)

## E10 · What's built today (ERP v1.0)

```
✓ /erp/sign-in            Six role cards · auto-route to role home
✓ /erp                    Commissioner cockpit · hero · action stack · KPIs · heatmap · escalations · timeline
✓ /erp/revenue            CAFO console · defaulters · forecast chart · reconciliation · campaign orchestrator
✓ /erp/inspections        Inspector route · stylized dark map · ranked queue · SLA radar
✓ /erp/approvals          Trade approvals · risk-scored queue · in-line detail · fraud flags
✓ /erp/grievances         Grievance command · ward heatmap · category trend · escalation cards
✓ ErpShell                Three-column shell · adaptive sidebar · topbar with ⌘K · insights panel · live ticker
✓ AdaptiveSidebar         Role-weighted nav order · AI shortcuts · system status footer
✓ CommandConsole          ⌘K · role-tailored suggestions · conversational with grounded sample replies
✓ InsightsPanel           Live AI insights with type badges (forecast / alert / action / info) + confidence
✓ LiveOpsTicker           Bottom-strip ambient feed of platform events
```

## E11 · ERP Roadmap

- **v1.1** — Real Aadhaar + RBAC · biometric step-up · ledger audit chain
- **v1.2** — Plug agents into real Claude / OpenAI behind grounded retrieval (NMC's structured data warehouse)
- **v1.3** — `/erp/projects` (multi-dept workflow board) and `/erp/intelligence` (cross-dept pattern detection)
- **v1.4** — Mobile inspector PWA with offline + camera-first photo evidence
- **v2.0** — Voice command on the cockpit ("Hey NMC, what should I look at first?")

---

*One platform. Two halves. Built for the citizen, run by the city.*
