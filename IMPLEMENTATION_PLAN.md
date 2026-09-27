# Cardbook — Detailed Implementation Plan (PRD v1.1)

**Source:** `PRD- RX CARDBOOK V1.1.md` + `README.md`
**Repo:** https://github.com/Jazoe-extra/Rx-cardbook — `main`
**Demo date:** 10 October 2026 — one mistake found same evening, answered, visible to HQ before month-end.
**Core rule:** Branch: easier than paper book? HQ: easier to understand/defend? If neither, don't build it.

---

## 0. Architectural Decisions (decide first, before code)

### 0.1 Locked stack (user spec — local-first demo)

- **App framework:** Next.js + TypeScript (single app: `/branch` + `/hq` routes, App Router)
- **UI:** Tailwind CSS — large touch targets, beginner copy, traffic-light components
- **Database:** PostgreSQL — local (Docker Compose for demo). Single source of truth when online.
- **Database access:** Drizzle ORM (schema in `/db/schema.ts`, migrations in `/drizzle`)
- **Authentication:** Better Auth — local, email + phone. Individual account mandatory. First sign-in online, cached session for offline-recognised device. No new accounts offline. Disabled status blocks writes.
- **File storage:** Local file storage for demo (`/uploads` gitignored, original Excel kept + file ref in DB)
- **Excel processing:** ExcelJS (recommended — MIT, better for write + template). SheetJS as fallback for reading odd HQ files. Support aliases: Drug/Medicine Name, Qty/Quantity, Unit Price/Standard Price, Form/Dosage Form.
- **Version control:** Git + GitHub (`Jazoe-extra/Rx-cardbook`, `main`)
- **Run:** app + DB run locally for now (`docker compose up -d db`, `npm run dev`). No cloud needed for demo.

Offline note: pure Next.js needs PWA + IndexedDB outbox to meet FR-08/FR-18 (sales/counts offline). For local demo: add service worker + `idb` outbox with statuses `saved_on_phone / waiting / sent_to_HQ / failed` and UUID idempotency. If offline on cheap phones becomes flaky, revisit Expo later — data model stays the same.

### 0.2 Data model (minimum)

```
users(id, full_name, phone|email unique, branch_id, role: counter|hq_approver|admin, status: active|disabled)
branches(id, name)
drugs(id, code optional unique, name, generic, strength, form, pack_size, stock_unit: Tablet|Pack|Strip|Bottle|Ampoule|Vial|Other, standard_price, created_by, updated_by)
branch_prices(drug_id, branch_id, price)
stock_movements(id UUID, branch_id, drug_id, type: opening|dispatch|sale|refund|adjustment, qty_signed, unit, price_charged, reason, actor_id, device_time, server_time, day_id, ref)
deliveries(id, branch_id, dispatch_ref, status: dispatched|received, received_by, received_at)
physical_checks(id UUID, branch_id, drug_id, day_id, expected_qty, physical_qty, diff, reason, status: pending|complete|explained|escalated, counted_by, counted_at, selection_method: random, replacement_reason)
day_closes(id, branch_id, day, closed_by, closed_at, record_status, physical_status, traffic_light: green|amber|red)
refunds(id UUID, sale_id, reason, requested_by, status: pending|approved|rejected, approved_by)
price_exceptions(id UUID, sale_id, approved_price, charged_price, reason, actor_id)
period_locks(branch_id, period, locked_by, locked_at)
audit_log(id, entity, entity_id, action, actor_id, before_json, after_json, at)
imports(id, file_ref, uploaded_by, uploaded_at, mode: catalogue|stock, branch_id, row_count, status, confirmed_by, confirmed_at)
```

Expected stock (FR-10) is **calculated, never stored as truth**:
`expected = SUM(opening + dispatch_received - sales + approved refunds/adjustments)` per branch+drug+unit. Recompute on read + cache per day.

### 0.3 Design system (beginner-first, before any feature)

Principle from PRD: understandable without training, familiar pharmacy words, few steps, clear next action.

- **Type/buttons:** 18sp min, 56dp touch targets, one primary action per screen. Sale = select drug → +/- → price shown → Confirm. No extra taps.
- **Language map (enforce in code):** `Sync failed` → "Your sale is saved on this phone but has not reached HQ yet. We'll try again when internet returns." `Transaction queued` → banned. `Discrepancy` → "Difference found — review required". Never "Who lost / stole / mistake by".
- **Colours:** Green/Amber/Red only for evening check with explicit rule text underneath, plus icons + words (not colour alone).
- **Screens to design first in Figma/paper:** Sign-in + OTP, Today's sales, Sale confirm, Physical count (Today's 2 drugs), Evening check, Day close, HQ branch view. Test with one counter reading aloud.
- **Tokens:** `unit` always shown next to qty (e.g. "20 packs"). Block comparison if units differ.

---

## Phase 1 — Foundations + Accounts (Week 1)

**Goal:** repo builds, auth works, disabled accounts blocked.
**FRs:** FR-06, FR-32, FR-36 (partial)

1. Init `/apps/branch`, `/apps/hq`, `/packages/shared`, Supabase project, migrations for users/branches.
2. Phone/email + OTP sign-in, session cache for offline, `No new accounts offline` guard.
3. HQ: create/assign/disable/reactivate staff. Disabled → cannot write (server + client check).
4. Every write stamps `actor_id + device_time`. History shows "who recorded".
5. `AGENTS.md`, CI (lint + typecheck + unit), seed script for 4 branches + test users.
**Accept:** two staff produce separate identities; disabled staff blocked; offline sign-in works if previously seen.

## Phase 2 — Catalogue, Prices, Stock, Excel Import (Week 2)

**FRs:** FR-01–FR-05, FR-10 (calc stub), FR-39, FR-40

1. HQ CRUD: drugs (code/name/generic/strength/form/pack/unit/standard price), branch-specific prices, opening stock, dispatch → branch confirms receipt (received_by/at).
2. Unit enforced: one `primary_unit` per drug; all movements must match unit or be rejected.
3. Excel import wizard (HQ only):
   - Upload → parse (support aliases: Drug/Medicine Name, Qty/Quantity, Unit Price/Standard Price, Form/Dosage Form) → Review screen → edit/add/remove/correct unit/qty/price/branch → highlight missing/invalid/duplicates (match on code if present, else name+strength+form+pack) → Confirm and Add to Cardbook.
   - Modes: Catalogue vs Stock. Stock import must not silently change catalogue.
   - Audit: uploader, time, file ref, adds/updates, review edits, confirmer. Keep original file in Storage.
4. Seed 12 demo drugs with units/prices.
**Accept:** branch sees correct price automatically; expected stock reflects issue; no catalogue change until Confirm.

## Phase 3 — Sales + Offline + Price Exceptions (Week 3)

**FRs:** FR-07, FR-08, FR-09, FR-34

1. Fast sale: drug list (searchless for 12 drugs, big rows) → +/- qty → auto price (branch price else standard) → Confirm. Records drug/qty/price/person/time/unit/day.
2. Offline: SQLite write + outbox `saved_on_phone`. Auto-retry on reconnect, UUID dedupe.
3. Price exception: if charged ≠ approved → reason required, save actual price, flag for HQ, price list unchanged. Cannot save without reason.
4. No patient fields anywhere.
**Accept:** sale <10s; offline sale survives restart; exception without reason blocked.

## Phase 4 — Expected Calc, Evening Record Check, Day Close (Week 3–4)

**FRs:** FR-10–FR-13, FR-20, FR-37, FR-35

1. `calcExpected(branch, drug, day)` + unit tests.
2. Evening check screen — 3 parts: (1) sales vs expected, (2) physical status, (3) outstanding (unanswered, pending refunds/exceptions, failed uploads). Only disagreeing lines shown, each with drug/expected/recorded/physical/diff/date/who/reason/status.
3. Answer flow: select neutral reason (sale not recorded, wrong qty, counting error, damaged/expired/spoiled/returned/transferred/missing/other) + actor + time.
4. Day close: button records closer + time, computes traffic-light:
   - Green: required checks complete + no unresolved required issue
   - Amber: needs attention but closable per rules
   - Red: required check missing or serious block (e.g. counts not done)
   - Record-complete must never mark physical-complete (FR-35).
**Accept:** incorrect quantity in demo data appears same evening; day shows closer/time.

## Phase 5 — Physical 2-Drug Count (Week 4)

**FRs:** FR-14–FR-19

1. Daily random selection of 2 eligible active drugs per branch (seeded random, stored with date/branch/drug/actor). Cannot skip because inconvenient — replacement needs reason + audit, then new random pick. History kept for HQ.
2. Count flow: see drug → count shelf in shown unit → enter physical → show expected → auto diff. Agree → complete. Differ → reason required → stays visible (explained/escalated).
3. Rule: physical never auto-adjusts stock. Original expected + physical remain visible even after approved adjustment.
4. Offline counts + branch+HQ investigation thread (branch note + HQ note + agreed outcome + resolver + time).
**Accept:** 2 counts appear daily; Expected 20 / Physical 18 → Diff -2 + reason, stock unchanged until authorised adjustment.

## Phase 6 — Sync + HQ View (Week 5)

**FRs:** FR-21–FR-24, FR-33

1. Sync worker: push outbox FIFO, exponential backoff, `sent_to_HQ` only on server ack, `failed` with retry button. `waiting/failed/up-to-date` badges per branch + per record.
2. HQ dashboard per branch: today's sales, evening traffic-light, physical status, unresolved diffs, pending refunds/exceptions, sync status. No rankings, no league tables.
3. Duplicate prevention test: replay same UUID → single row.
**Accept:** offline day → reconnect → HQ sees data once; HQ can tell completed vs outstanding vs not-yet-updated.

## Phase 7 — Refunds, Undo, Returns, Locks (Week 5–6)

**FRs:** FR-25–FR-30

1. Undo (entry error) vs Refund (genuine reversal: branch requests + reason, HQ approver approves, branch cannot self-approve, day total unchanged until approved).
2. Returned medicine: record return, require approved outcome (saleable/quarantined/damaged/spoiled/expired/other) — never auto-resaleable. Confirm exact rule with Angela.
3. Period lock (HQ approver): locked rows immutable; corrections = new visible adjustment (before + after + who + when). Test silent-edit blocked.
**Accept:** pending refund doesn't change total; locked edit creates adjustment, original preserved.

## Phase 8 — Export, Hardening, Demo Data (Week 6)

**FRs:** FR-31, FR-38

1. Auditor export (CSV/Excel + printable): every figure traceable to person/date/change, no login needed. Agree format with Angela before freeze.
2. Hardening: disable-account enforcement, device/server time display, empty-state + offline banners, error copy review, backup approver set.
3. Demo seed (exact): 12 drugs, 4 branches, staff accounts, opening + 1 dispatch each, normal sales, 1 wrong qty, 1 price exception, 2 count drugs (1 deliberate diff), 1 refund request.
4. Measures logging: same-day catch %, evening completion, physical completion + diffs found, time-to-settle, sale entry time, paper fallback, month-end recount time, unsynced at close, pending at lock, correction rate.
**Accept:** 16-step demo runs end-to-end offline → online → HQ → lock → correction → export.

## Phase 9 — Rehearsal + Open Decisions (to 10 Oct)

Confirm with Angela before freeze:
1. Exact unit per drug 2. Final physical/price reason lists 3. Backup approver 4. Shared-device sign-in rule 5. Return handling 6. Export format 7. Random-selection rule detail 8. Unresolved-count at close rule 9. Locked-period physical rule 10. Device vs server time rule + multi-unit selling.

Rehearse deliberate-diff script twice on real phones with airplane mode.

---

## Risks → Controls (build these in)

Paper fallback → faster than paper. Second-book fear → staff enter only own facts. HQ price wrong → HQ owns catalogue, show source/version. Blame → neutral copy + who-recorded only. Auditor reject → agree export early. Single approver → backup. Offline → SQLite+outbox. Duplicates → UUID. Shelf wrong but records agree → 2 counts. Auto-adjust → blocked. Resale of returns → approved outcome. Shared account → mandatory individual. Clock wrong → dual timestamps. Silent lock edit → adjustment rows.

## What to build next (concrete)

1. Confirm stack (Expo + Supabase recommended) + create `/apps/*` skeleton
2. Figma/paper for 6 branch screens + HQ table, test copy with one counter
3. Implement Phases 1–2, then demo sale → evening → count loop before adding refunds/locks
