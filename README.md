# Cardbook — Prompt Rx Series

**Owner:** OJ  
**Domain Expert:** Angela, Lead Pharmacist, HQ  
**Demo:** 10 October 2026  
**Build:** Solo build  
**PRD:** `PRD- RX CARDBOOK V1.1.md` (v1.1, source of truth)

## 1. What is Cardbook?

Cardbook is a **reconciliation system for branch pharmacies**. It helps staff record daily sales, identify differences between their records, and perform a small daily physical stock check before problems become month-end problems.

> Find the difference early. Show the facts. Record who dealt with it. Do not let the problem wait until month-end.

Cardbook is **not** a full pharmacy inventory system, till, accounting, payroll, supplier, online pharmacy, or clinical system.

## 2. Problem

Four small branch pharmacies operate under one HQ.

Today each branch uses paper:
- **Inventory card** — one per drug, expected quantity on shelf
- **Exercise book** — each sale: medication, price, quantity only (no patient details)

At month-end, branches total records and send to HQ. HQ combines 4 reports for audit.

Problems:
- Errors found only at month-end
- Late branch reports
- No mid-month visibility for HQ
- Repeated manual adding/checking
- Card vs book can disagree
- Hard to trace who entered a figure
- Records can agree while physical shelf is different

## 3. Solution — Two Daily Checks

### Record check (every day)
Compares:
- sales recorded
- expected stock (`opening + received - sales ± approved adjustments`)
- stock issued by HQ
- inventory-card figures

Shows only disagreeing lines. Matching lines stay silent.

### Physical stock check (2 drugs per day)
- Cardbook randomly selects 2 drugs per branch per day
- Staff counts actual shelf quantity in the drug's primary unit
- Cardbook compares Expected vs Physical
- Difference is recorded, explained, and stays visible until settled

Physical count **never auto-adjusts stock**. It starts a branch + HQ investigation.

Cardbook checks records daily and 2 physical items daily. It does not guarantee every item is correct.

## 4. People

**Counter (Branch staff)**
- Individual Cardbook account mandatory (phone number or email + verification code, no shared accounts)
- Record sales quickly, work offline, see correct drug/price, answer differences, do 2 counts, explain differences, close day
- Simple language, large buttons, minimal typing

**Angela / Lead Pharmacist / HQ**
- Owns: drug catalogue, standard prices, branch-specific prices, stock issued, price-exception approvals, refund/reversal approvals, unresolved review, period lock
- Needs backup authorised approver

**Auditor**
- No Cardbook login. Receives spreadsheet export + printed trail traceable to person/date/change.

Every action records: who, branch, date/time.

## 5. Daily Journey

1. **HQ setup:** catalogue, standard + branch prices, opening stock, dispatch, staff accounts, approvers. Branch does not type drug names/prices. Excel import supported (see below).
2. **Start of day:** sign in with individual account, see branch/drugs/prices/expected stock, confirm delivery received.
3. **During day:** select drug → +/- quantity → see price → confirm. Fast for normal sale. Price exception requires reason, records actual price, notifies HQ, price list unchanged.
4. **Physical check:** count 2 selected drugs, enter physical qty, Cardbook compares, reason required if different.
5. **Evening check:**
   - Check 1: sales vs expected calculation?
   - Check 2: 2 counts done? differences?
   - Check 3: outstanding? (unanswered differences, pending refunds/exceptions, failed uploads)
   - Green = complete, no open required issue. Amber = needs attention but closable. Red = required check missing / serious block.
6. **Day close:** person + time recorded. Offline allowed, syncs later without duplicates.

Offline-first: sales, counts, answers, closing work offline. Phone clearly shows: saved on phone / sent to HQ / waiting / failed. Never shows “sent to HQ” when only on phone.

## 6. Key Rules

- Expected stock is calculated, not proof of shelf.
- Physical difference ≠ loss/theft/error. No blame language. Show: Expected 20, Physical 18, Difference 2, What happened?
- Undo = correct entry error. Refund = genuine reversal (branch requests, HQ approves, no total change until approved). Returned medicine = never auto-resaleable, needs approved outcome (saleable/quarantined/damaged/expired/other).
- Locked periods: no silent edits, only visible dated/named adjustments.
- One primary stock unit per drug (Tablet/Pack/Strip/Bottle/Ampoule/Vial/Other). Same unit for opening/received/sales/expected/count. No auto conversion (e.g. pack≠tablets unless HQ defines it).
- No patient data anywhere.
- No branch/staff rankings.

## 7. HQ View (simple)

Per branch: today's sales, evening status, physical-count status, unresolved differences, pending refunds/exceptions, sync status (up-to-date/waiting/failed). Visibility, not surveillance.

## 8. Excel Import (FR-39 / FR-40)

Authorised HQ only: Upload Excel → Cardbook reads → HQ reviews/edits/adds/removes → Confirm and Add to Cardbook. No changes until confirmed.

Supports: Medicine Code, Medicine Name, Generic, Strength, Dosage/Form, Pack Size, Stock Unit, Standard/Branch Price, Quantity, Branch, Date Received, Delivery Ref. Recognises aliases (Drug/Medicine Name, Qty/Quantity, etc.). Highlights missing/invalid/duplicates. Records who uploaded/confirmed, file ref, adds/updates, review changes.

Two modes: 1) Import/Update Catalogue 2) Add/Receive Stock (stock upload must not silently change catalogue).

## 9. Scope V1

Included: staff accounts, catalogue, prices + branch prices, stock received, daily/offline sales, record reconciliation, 2-drug count + difference + reasons, evening check, day close, refunds, price exceptions, auto-send, HQ view, period lock + adjustments, export + audit trail.

Not included: full daily stocktake, auto investigation/theft detection/adjustment/approvals, patient records, clinical, accounting/payroll, supplier, online ordering, staff rankings.

## 10. Demo Data (10 Oct 2026)

Story: mistake at branch found that evening, investigated, answered, visible to HQ before month-end.

12 drugs, 4 branches, staff accounts, opening stock, 1 dispatch/branch, normal sales, 1 incorrect quantity, 1 price exception, 2 selected count drugs, 1 deliberate physical difference + explanation, 1 refund request, close, resync, HQ view, refund approval, period lock, visible correction after lock, export.

## 11. Build Order

1. catalogue 2. prices 3. branch prices 4. staff accounts 5. opening stock 6. dispatch 7. delivery confirm 8. sale 9. offline sale 10. price exception 11. expected calc 12. evening check 13. 2-drug count 14. physical difference 15. reasons 16. day close 17. auto-send 18. HQ view 19. refund request 20. refund approval 21. period lock 22. locked adjustment 23. export. Branch flow before extra HQ reporting.

## 12. Repo

```
/PRD- RX CARDBOOK V1.1.md  # PRD v1.1 - source of truth
/README.md                  # this file
```

## 13. Core Principle

Branch: Does this make the day easier than the paper book?  
HQ: Does this make figures easier to understand and defend?  
If neither, don't add it.

Beginner-friendly: familiar pharmacy words, no technical jargon. e.g. “Your sale is saved on this phone but has not reached HQ yet. We'll try again when the internet returns.”
