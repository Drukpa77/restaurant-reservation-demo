# Handoff: Terra & Vine — Restaurant Reservation Platform

## Overview
A restaurant website + reservation web app for a fictional premium restaurant ("Terra & Vine", Fitzroy, Melbourne). Guests discover the restaurant, book a table in a 3-step flow, and — for groups over 10 — complete an extra meal **pre-order** step so the kitchen can prepare. Guests can then manage or cancel the booking from a reference-keyed page. Desktop (1440px) and mobile (390px) are both designed.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look, structure and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (React/Next, Vue, SwiftUI, native, etc.), using its established component library, routing, styling and form patterns. If there is no codebase yet, pick the framework that best fits the project (for a web app of this shape: Next.js + TypeScript + Tailwind, or Vite + React) and implement the designs there.

The HTML uses inline styles and a custom `<image-slot>` placeholder element for photography. Neither should survive into production: convert inline styles into the codebase's styling system (tokens below), and replace every `<image-slot>` with a real image component.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows, states and copy are final-intent and should be recreated faithfully. One low-fidelity ancestor is included for context only (`Reservation Wireframes.dc.html` — the original UX wireframe, plus `Reservation Wireframes Deck.dc.html`, a presentation of it). Build against the hi-fi file; use the wireframe only to understand flow decisions.

Photography is unresolved: all images are placeholders. Layout assumes the stated aspect/heights.

---

## Product logic (do not change without a UX reason)

- Guest count drives the flow:
  - **≤ 10 guests** → `Table → Details → Confirm` (3 steps)
  - **> 10 guests** → `Table → Pre-order → Details → Confirm` (4 steps)
- Selecting "more than 10" raises a **group notice** (modal on desktop, bottom sheet on mobile) explaining the pre-order. It is informative, never blocking: "Continue Group Booking" or "View Menu".
- The **booking draft persists**. A guest can leave to browse the menu at any point and return to the step they left.
- Pre-order is **not required to hold the table**. "Complete later" is always available; quantities are editable until 48h before the reservation.
- The table is **held for 10 minutes** once a time is selected (a countdown shows in the Details header: "Table held · 8:24 remaining").
- Confirmation is delivered on-screen plus email + SMS. The **booking reference** (`#RES1048` format) is the key for manage/cancel.
- Mobile number is **required** — confirmations are texted.
- Group capacity caps at 14 (the communal table).

---

## Screens / Views

### 1. Home (desktop 1440 / mobile 390)
**Purpose:** discover the restaurant and start a booking above the fold.

Layout (desktop):
- **Header** — 22px 56px padding, 1px bottom border `rgba(35,32,28,.08)`. Left: wordmark `TERRA & VINE` (Cormorant Garamond 400/24px, letter-spacing .14em) with `FITZROY` beneath (Jost 400/9px, .3em, `#9A9287`). Right: nav Home / Menu / About / Contact (Jost 400/15px; active item has a 1px bottom border) + primary pill CTA "Book a Table".
- **Hero** — 620px tall, full-bleed image, overlay `linear-gradient(90deg, rgba(24,21,18,.78), rgba(24,21,18,.5) 48%, rgba(24,21,18,.12))`. Content centered vertically, 86px 56px padding: eyebrow rule + `WOOD FIRE · MEDITERRANEAN` (12px, .34em, `#E3C9A8`); H1 "An Evening Worth Reserving" (Cormorant 300/88px, line-height 1.02, max-width 760px); sub "Seasonal dishes, warm hospitality and a table waiting for you." (Jost 300/22px, max-width 520px); buttons "Book a Table" (cream fill) + "View Menu" (1px cream outline); meta row: open status with `#8FAE72` dot + halo, address, `★★★★★ 4.8 · 612 reviews`.
- **Quick booking card** — overlaps hero by -64px, inset 56px. Cream `#FBF7F0`, radius 18, shadow `0 20px 50px rgba(35,32,28,.16)`, padding 26px 30px. 4-column grid: Guests / Date / Time / CTA. Each field = 44px circular `#F2EADD` icon chip + label (Jost 500/11px, .2em, `#9A9287`) + value (Cormorant 400/20px). 1px vertical dividers between fields. CTA "Find a Table" = olive pill, 19px 40px.
- **About split** — 96px top padding, `1fr 1.05fr` grid, 72px gap. Left: eyebrow, H2 (Cormorant 300/52px), body (Jost 300/19px, line-height 1.75), 3 stats (72 seats / 4.8 rating / 14 max group; Cormorant 300/40px over Jost 300/14px `#9A9287`), text link. Right: 460px image, radius 16.
- **Signature plates** — 3-up card grid, 26px gap. Card: radius 16, 1px border, shadow `0 10px 30px rgba(35,32,28,.07)`, 260px image, 24px padding, name (Cormorant 400/26px) + price (Cormorant 400/20px, terracotta) on a baseline row, description (Jost 300/16px, `#6E675D`), dietary pills (11px, .14em, olive 1px outline, radius 999).
- **Hours / find us / CTA strip** — `#F2EADD`, 64px 56px, 3-column.
- **Footer** — `#23201C`, 44px 56px, wordmark + link row + copyright at `rgba(251,247,240,.72)`.

Mobile Home: 284px hero with bottom-anchored headline (Cormorant 300/38px), quick-book card as 3 compact `#F2EADD` tiles + full-width CTA, short intro paragraph, 2 dish thumbnails, and a **sticky bottom bar** ("Sat 24 Oct · 2 guests" + "Book a Table"). Compact sticky header keeps `Book` visible at all times.

### 2. Booking — Step 1, Select a table (desktop)
- Slim app header: wordmark / `RESERVATIONS` / phone number.
- **Progress indicator** centered: 34px numbered circles + label, 110px 1px connectors. Active = olive fill, cream numeral; inactive = 1px `rgba(35,32,28,.2)` outline, `#9A9287` text.
- Body grid `1fr 372px`, 48px gap.
- **Guest selector** — pill container (1px border, radius 999, padding 10px 18px): 46px `−` circle (`#F2EADD`, olive glyph), count (Cormorant 400/28px, min-width 96px), 46px `+` circle (olive fill, cream glyph). Beside it: quick chips 2 / 6 / 8 and a dashed terracotta `10+ · group` chip.
- **Date selector** — 6 equal cards, 12px gap, radius 14: weekday (Jost 500/11px, .2em), day (Cormorant 300/34px), month (Jost 300/13px). Selected = olive fill + shadow `0 10px 24px rgba(61,74,49,.26)`. Unavailable = `#F4F1EA` fill, `#BEB6A9` text, label "Closed". "More dates" text link with calendar icon opens the month calendar.
- **Time grid** — 4 columns, 12px gap, radius 12, 18px vertical padding. Time (Jost 400/18px) + status caption (12px): Available (`#9A9287`), Selected (olive fill), Popular (olive caption + shadow), "Only 2 tables left" (terracotta 1px border, `rgba(182,90,52,.06)` fill), Fully booked (`#F4F1EA`, `#BEB6A9`). A legend row explains the four states.
- **Summary sidebar** (sticky) — `#F2EADD`, radius 18, 32px padding: label, date (Cormorant 300/34px, two lines), "7:00 PM · 4 guests" (Jost 400/22px), divider, venue + address, Edit date / Edit time / Edit guests outline chips, primary "Continue to details", hold note.

Mobile equivalents are separate screens/sheets: **Select guests** (bottom sheet with stepper + quick chips), **Select date** (horizontal day strip + inline month calendar), **Select time** (2-column slot grid with a sticky summary + CTA).

### 3. Group notice
Desktop: dimmed (34% scrim) step-1 behind a 560px modal — radius 20, 40px padding, shadow `0 30px 70px rgba(35,32,28,.3)`. 52px `#F2EADD` circle with a terracotta group icon, H2 "Planning something bigger?" (Cormorant 300/38px), body explaining the pre-order, then "Continue Group Booking" (primary) + "View Menu" (secondary).
Mobile: identical content as a bottom sheet (radius 28 top, drag handle, stacked full-width buttons).

### 4. Group reservation dashboard (desktop)
Header row: `GROUP RESERVATION` label + status pill "Pre-order required" (`rgba(182,90,52,.1)` on terracotta text). H1 "Your group reservation". 2×2 grid of `#F2EADD` stat tiles (Guests 14 / Date / Time / Table "Long table"), each label 11px .2em over Cormorant 300/30px. Footer row: reassurance copy, "Complete later" text button, primary "Start Pre-order".

### 5. Group pre-order (desktop + mobile)
- Stepper in the header as a 4-item text progression (Table → Pre-order → Details → Confirm), plus "Saved automatically".
- Title "Pre-order for 14 guests" (Cormorant 300/44px) + supporting copy. Right-aligned progress block: `MEALS SELECTED`, "10 / 14" (Cormorant 300/34px), 6px progress bar (`#E6E1D6` track, olive fill, 71%).
- Filter row: category pills (All / Starters / Mains / Vegetarian / Desserts / Drinks; active = `#23201C` fill) and dietary filter pills on the right.
- **Food cards** — 2-column grid, 22px gap. Horizontal card: 130px square image (radius 12), name (Cormorant 400/23px), price (Cormorant 400/19px terracotta), description (Jost 300/15px), dietary pills, and a quantity stepper (36px circles, olive `+`). A card with quantity > 0 gets a 1px olive border and `0 12px 28px rgba(61,74,49,.12)` shadow.
- **Sticky summary** — `#F2EADD`, radius 18: Guests, Meals selected, divider, line items (`2 × Chargrilled Chicken … $64`), divider, "Food total" (Cormorant 300/30px), terracotta warning block when incomplete ("4 guests still need meals selected."), primary "Continue Booking", "Complete later" text button.
- Mobile: full-width stacked food cards (132px image on top), sticky bottom bar showing "10 meals · $317" + "View pre-order", and a **pre-order basket bottom sheet** with editable line items, total, warning, and both CTAs.

### 6. Guest details (desktop + mobile)
- Header keeps the stepper + hold countdown.
- Title "Who's joining us?" + "We'll send your confirmation by email and text."
- 2-column field grid (20px gap): First name, Last name, Email (focused state shown), Phone (error state shown). Inputs: radius 12, 1px `rgba(35,32,28,.16)`, 16px 18px padding, Jost 400/17px. Labels: Jost 400/12px, .18em, `#9A9287`.
- Occasion select (None / Birthday / Anniversary / Business dinner / Celebration / Other) with chevron.
- Special requests textarea (96px).
- Dietary requirement pills (multi-select; selected = olive fill) — Vegetarian / Vegan / Gluten free / Nut allergy / Shellfish.
- Checkboxes (22px, radius 6; checked = olive fill + cream tick): High chair required / Wheelchair accessibility needed / Send me seasonal menu news.
- Policy acknowledgement block on `#F2EADD`, radius 14, with checkbox + 16px copy and a "Read the full policy" link.
- Sidebar summary as step 1, plus for groups: "Pre-order — 12 of 14 meals", progress bar, "Edit pre-order" link.
- Primary CTA disabled (`#C9C2B5`) until phone + policy validate.

### 7. Confirmation (desktop + mobile)
Olive `#3D4A31` banner (56px 44px): 74px translucent circle with cream tick + `0 0 0 12px rgba(251,247,240,.07)` halo (animate in: scale + fade), H1 "Your table is reserved" (Cormorant 300/46px), sub "We look forward to welcoming you.".
Below: a bordered reservation card (radius 16, 30px padding) with `RESERVATION` label + `#RES1048`, divider, 2×2 grid of Date / Time / Guests / Booked by (Cormorant 300/26px values). Three equal buttons: "Add to Calendar" (primary), "Manage Reservation", "View Menu". Secondary icon row: Directions / Call restaurant / Share reservation. Closing note block on `#F2EADD` confirming email + SMS and the 24-hour change window.

### 8. Manage reservation (desktop + mobile)
Header: `MANAGE RESERVATION · #RES1048` + date (Cormorant 300/40px) and a "Confirmed" status pill (`rgba(61,74,49,.1)` / olive, 7px dot). Three `#F2EADD` tiles (Time / Guests / Table). Two-column block for Contact and Special requests. Terracotta-tinted pre-order block ("12 of 14 meals selected" + "Edit Pre-order" outline button). Action row: Change date / Change time / Change guests (secondary) + "Save changes" (primary). **Cancel reservation is deliberately de-emphasised**: `#9A9287` text with an underline, bottom of the page.

### 9. Menu (desktop + mobile)
340px hero image with `linear-gradient(180deg, rgba(24,21,18,.15), rgba(24,21,18,.65))`, centered "Our Menu" (Cormorant 300/76px) + "Seasonal ingredients. Thoughtfully prepared.". Sticky-ish category pill row + dietary key. Body is a mixed layout: left column = **editorial menu sections** (dish name, dotted leader, price, description with inline dietary letters), right column = **image cards** (chef's pick) plus a group-booking promo card. Dark footer strip with a persistent "Book a Table" CTA.

### 10. About (desktop)
Story split (H1 Cormorant 300/62px + two body paragraphs, 520px image), chef introduction (image left, name + bio + pull quote in italic Cormorant 300/26px with a 1px terracotta left rule), three numbered philosophy columns (`01/02/03` in Cormorant 300/40px terracotta), a 3-up photo gallery (`1.4fr 1fr 1fr`, 294px tall), and a `#F2EADD` closing CTA band.

### 11. Contact / location (desktop)
Address headline (Cormorant 300/54px) + wayfinding sentence, 2×2 info grid (Hours / Contact / Parking / Public transport; labels 11px .2em over Jost 300/17px, line-height 1.9), private-dining CTA card, 480px map placeholder with Get directions / Call / Email buttons, dark footer.

---

## Interactions & Behavior

- **Nav / CTA:** "Book a Table" routes to `/book` (step 1). Menu/About/Contact are standard routes. The booking draft survives navigation (persist to `localStorage` + URL query).
- **Step 1 gating:** Continue is disabled until date **and** time are selected. Changing guests re-fetches availability; changing date resets the time selection.
- **Crossing 10 guests:** raises the group notice once per session; accepting switches the progress model to 4 steps and routes to `/book/pre-order`.
- **Hold timer:** starts on time selection, 10 minutes, displayed in the Details header. On expiry: return to step 1 with a toast ("Your hold expired — times refreshed").
- **Pre-order:** steppers update the counter, progress bar and summary optimistically; saves debounce to the server ("Saved automatically"). Total = Σ qty × price. Quantity cannot exceed remaining guest count (cap at 14). "Complete later" continues the booking with the current selection.
- **Validation:** on blur, not on submit. First/last name required; email format; phone required and mobile-format; policy checkbox required. Errors render as a 13px `#A33A2B` message under the field, plus a 1px `#A33A2B` border and `rgba(163,58,43,.04)` fill. Submit stays disabled while invalid.
- **Confirm:** button enters a loading state (spinner + "Confirming…", label retained). Success → confirmation route with reference. Failure → the "Booking failed" state (table not booked, offer Try again + Call restaurant).
- **Hover (desktop):** primary button darkens `#3D4A31 → #33402A` and lifts 1px with a deeper shadow; secondary gets `#F2EADD` fill + `#23201C` border; cards lift 2px and their shadow grows to `0 16px 32px rgba(35,32,28,.12)`; date/time cards take a `#F2EADD` fill with `#23201C` border. Pressed primary: `#2B3623`.
- **Focus:** 3px olive ring — inputs `0 0 0 3px rgba(61,74,49,.14)` inside a 1px olive border; buttons `0 0 0 3px #FBF7F0, 0 0 0 5px #3D4A31`. All interactive elements must be keyboard reachable in visual order.
- **Motion:** 180ms ease-out for hover/press; 260ms for sheets and modals (sheet slides up, scrim fades); confirmation tick scales 0.9→1 with a fading halo; skeletons shimmer while availability loads.
- **Loading:** time grid renders 6 skeleton tiles (`linear-gradient(90deg,#EFE9DE,#F7F3EB,#EFE9DE)` shimmer) before availability resolves.
- **Toasts:** `#23201C` fill, cream text, radius 12, `#8FAE72` tick icon — "Pre-order saved", "Reservation updated".
- **Mobile specifics:** date, guests and time use bottom sheets (28px top radius, drag handle, 38% scrim); the booking summary is a compact expandable card; primary actions live in a sticky bottom bar; all hit targets ≥ 44px; pre-order cards are full-width.
- **Responsive:** the 1440 desktop layout collapses at ~1100px (sidebar moves below content as a summary card) and at ~760px switches to the mobile patterns above.

## State Management

Booking draft (persisted, server-authoritative on submit):
```
guests: number                     // 1..14; >10 flips groupMode
date: ISO date | null
time: string | null                // from availability
groupMode: boolean                 // derived: guests > 10
groupNoticeAcknowledged: boolean
preOrder: { dishId: string, qty: number }[]
mealsSelected: number              // Σ qty
holdExpiresAt: timestamp | null
details: { firstName, lastName, email, phone, occasion, requests,
           dietary: string[], highChair, accessibility, marketingOptIn,
           policyAccepted }
step: 'table' | 'preorder' | 'details' | 'confirm'
status: 'draft' | 'submitting' | 'confirmed' | 'failed'
reference: string | null           // #RES1048
```
Server data: availability per (date, guests) → time slots with `status: available | almost_full | full` and optional `label`; menu (categories, dishes, prices, dietary tags, images); reservation by reference (for manage/cancel); mutations for create, update, cancel, and pre-order save.

## Design Tokens

Colors
```
primary / olive        #3D4A31   (hover #33402A, pressed #2B3623)
secondary / terracotta #B65A34   (hover/text-dark #8E4426)
background             #FBF7F0
surface                #F2EADD
surface alt / disabled #F4F1EA
ink / text             #23201C   (body alt #3A352E)
muted text             #6E675D   (subtle #9A9287, disabled #C9C2B5 / #BEB6A9)
hairline               rgba(35,32,28,.08–.25)
success                #4E7A52   (accent dot #8FAE72)
warning                #C08A2E
error                  #A33A2B
hero accent (on dark)  #E3C9A8
track                  #E6E1D6
```
Typography — Display: **Cormorant Garamond** (300/400/500/600). UI: **Jost** (300/400/500).
```
display   Cormorant 300 · 88px / 1.02      (mobile 38–44px)
h1        Cormorant 300 · 54px / 1.12
h2        Cormorant 300 · 40px
h3        Cormorant 400 · 24px
price     Cormorant 400 · 19–20px (terracotta)
body      Jost 300 · 17px / 1.7
small     Jost 300 · 14px
label     Jost 400 · 11px · letter-spacing .2em · uppercase
button    Jost 400 · 15–16px · letter-spacing .05em
wordmark  Cormorant 400 · 24px · letter-spacing .14em
```
Spacing scale: `4 / 8 / 12 / 20 / 32 / 48 / 72 / 104`. Page gutter 56px desktop, 20px mobile.

Radius: inputs & slots 12 · cards 14–18 · modal 20 · sheets 28 (top) · pills 999.

Shadows
```
card    0 10px 30px rgba(35,32,28,.07)
raised  0 16px 32px rgba(35,32,28,.12)
float   0 20px 50px rgba(35,32,28,.16)
modal   0 30px 70px rgba(35,32,28,.30)
primary 0 10px 24px rgba(61,74,49,.26)
```
Motion: 180ms ease-out (hover/press), 260ms ease-out (sheets/modals).

## Assets
No real imagery is included. Every photo is a placeholder (`<image-slot>`) with a caption describing the intended shot:
- Home hero (dining room at dusk), home about image, 3 signature-dish photos
- Menu hero (plated dish, overhead), chef's-pick dish card
- About: restaurant portrait, chef portrait, 3 gallery images
- Contact: map screenshot
- Mobile: hero, 2 dish thumbnails, 2 pre-order cards, 4 basket thumbnails

Replace each with production images at the stated container size (`object-fit: cover`). Icons are inline 1.4px-stroke line SVGs (person, calendar, clock, group, pin, phone, share, chevron, tick) — substitute the codebase's icon set at the same optical weight. Fonts load from Google Fonts; self-host for production.

## Files
- `Terra & Vine Booking App.dc.html` — **the hi-fi design** (all desktop pages, 10 mobile screens, states, interaction matrix, design system). Open in a browser.
- `image-slot.js` — the placeholder element used by the design file (reference only; do not port).
- `Reservation Wireframes.dc.html` — original lo-fi UX wireframes (flow rationale, edge cases).
- `Reservation Wireframes Deck.dc.html` — the wireframe walkthrough deck (context for stakeholders).
- `deck-stage.js` — deck shell used by the deck file (reference only).

## Suggested build order
1. Tokens + typography + primitives (button, input, select, checkbox, pill, card, stepper, sheet/modal, toast).
2. Marketing pages (home, menu, about, contact) — static, gets the visual language landed.
3. Booking step 1 with availability data + hold timer.
4. Details + validation + confirm mutation, confirmation page.
5. Group path: notice → dashboard → pre-order + summary.
6. Manage/cancel by reference.
7. States: loading skeletons, no availability, booking failed, pre-order incomplete.
#   r e s t a u r a n t - r e s e r v a t i o n - d e m o  
 