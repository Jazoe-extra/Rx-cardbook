**PRD v1.1 — Cardbook**

**Product:** Cardbook  
 **Working name:** Cardbook  
 **Series/folder:** Prompt Rx  
 **Owner:** OJ  
 **Build:** Solo build  
 **Demo:** 10 October 2026  
 **Domain expert:** Angela, Lead Pharmacist, HQ

---

**1\. Problem**

**1.1 The setting**

Four small branch pharmacies operate under one headquarters.

Stock is issued from HQ to each branch roughly monthly, according to stock level. Each branch currently records its activity on paper in two places:

* **Inventory card** — one per drug, showing the expected quantity on the shelf.  
* **Exercise book** — records each sale using medication, price and quantity only. No patient details are recorded.

At month-end, each branch totals its records and sends a report to HQ. HQ combines the four branch reports into one return for audit.

The existing process creates several problems:

* Errors may not be discovered until month-end.  
* Branch reports may arrive late.  
* HQ cannot easily see what is happening between submissions.  
* Figures have to be added and checked repeatedly.  
* Card and book figures can disagree.  
* When a difference is found, it may be difficult to establish who entered the original figure.  
* Records can agree with each other even when the physical stock on the shelf is different.

**1.2 The problem Cardbook solves**

Cardbook is designed to find differences **while there is still time to investigate them**.

The product therefore has two checks:

**Record check**

Cardbook compares:

* sales recorded;  
* expected stock;  
* stock issued by HQ;  
* inventory-card figures.

**Physical stock check**

Cardbook also requires a small physical check:

* **two drugs are selected for physical counting each day;**  
* the staff member counts the actual quantity on the shelf;  
* Cardbook compares the physical count with the expected quantity;  
* any difference is recorded and explained.

This is important because Cardbook must not claim that the shelf is correct simply because the records agree.

**Cardbook checks the records every day and checks two physical drug quantities each day. It does not guarantee the accuracy of every item on the shelf.**

**1.3 Product definition**

**Cardbook is a reconciliation system for branch pharmacies. It helps staff record daily sales, identify differences between their records, and perform a small daily physical stock check before problems become month-end problems.**

Cardbook is **not** intended to replace a full pharmacy inventory system.

Its main job remains:

**Check the numbers every evening and tell a specific person which line needs attention while there is still time to fix it.**

The physical count adds a second protection: it tests whether the calculated quantity agrees with what is actually on the shelf.

---

**2\. Who already owns which fact**

| Fact | Source | Entered by | Frequency |
| :---- | :---- | :---- | :---- |
| Drug name | HQ | HQ | Once |
| Strength | HQ | HQ | Once |
| Pack size | HQ | HQ | Once |
| Standard price | HQ | HQ | Once |
| Branch-specific price | HQ | HQ | As required |
| Quantity issued to branch | HQ dispatch record | HQ | Each delivery |
| Delivery received | Branch | Individual staff member | Each delivery |
| Drug sold | Branch | Individual staff member | During the day |
| Price charged | Cardbook/HQ price | Cardbook, with exception where approved | During sale |
| Expected stock | Cardbook calculation | Cardbook | Continuously |
| Physical stock | Branch shelf | Individual staff member | Two drugs per day |
| Difference between expected and physical stock | Cardbook calculation | Cardbook | When physical count is completed |
| Reason for difference | Branch | Individual staff member | When required |
| Price exception approval | HQ | Authorised HQ approver | As required |
| Refund/reversal approval | HQ | Authorised HQ approver | As required |

**2.1 Expected stock is not physical stock**

Cardbook calculates expected stock from:

**Opening stock \+ stock received − recorded sales ± approved adjustments**

This tells Cardbook what should be present.

It does **not** prove that the same quantity is physically on the shelf.

The physical count provides that second check.

---

**3\. People and responsibilities**

**3.1 The Counter**

The Counter is the pharmacy staff member recording sales and performing the daily checks.

They need to:

* record sales quickly;  
* work without internet;  
* see the correct drug and price;  
* answer differences;  
* perform the two daily physical counts;  
* explain a physical difference where one exists;  
* close the day.

Every staff member must use their **own Cardbook account**.

A shared account is not acceptable because the product needs to show who recorded a sale, who answered a difference and who performed a physical count.

**3.2 Angela / Lead Pharmacist / HQ**

Angela remains responsible for the pharmacy information that comes from HQ.

She is responsible for:

* drug catalogue;  
* standard prices;  
* branch-specific prices;  
* stock issued;  
* approving price exceptions;  
* approving refunds/reversals;  
* reviewing unresolved differences;  
* closing and locking periods.

A **backup authorised HQ approver** should also be defined before the product is relied upon in daily operation.

The backup approver prevents the process from stopping when the main approver is unavailable.

**3.3 Auditor**

The auditor does not need a Cardbook account.

The auditor receives:

* the agreed spreadsheet export;  
* the printed trail;  
* enough information to trace a figure to its source.

---

**4\. Individual staff accounts**

**4.1 Requirement**

Every person who records activity in Cardbook must have an individual account.

The account must identify:

* staff name;  
* branch;  
* account status;  
* date/time of activity.

**4.2 What the account is used for**

The account identifies who:

* recorded a sale;  
* answered a disagreement;  
* performed a physical count;  
* closed a day;  
* raised a refund;  
* raised an adjustment;  
* approved a price exception;  
* approved a refund;  
* made an adjustment to a locked period.

The system must never describe a person as "the person who made the mistake."

It should simply show **who recorded the action**.

**4.3 Account control**

HQ must be able to:

* create a staff account;  
* assign it to a branch;  
* disable an account;  
* reactivate an account where appropriate.

A disabled staff account must not be able to record new transactions.

---

**5\. Goals**

1. Find disagreements on the same day.  
2. Reduce month-end recounting.  
3. Give HQ a daily view of branch activity.  
4. Make every important figure traceable to a person and time.  
5. Check two physical drug quantities every day.  
6. Identify differences between expected and physical stock.  
7. Trace price changes and reversals.  
8. Work when there is no internet connection.  
9. Keep branch input simpler than the paper process.

---

**6\. Non-goals**

Cardbook will not:

* store patient records;  
* make clinical decisions;  
* provide prescribing advice;  
* replace a till or cashier system;  
* provide accounting or payroll;  
* manage supplier orders;  
* operate an online pharmacy;  
* provide an auditor login;  
* create staff league tables;  
* claim to detect theft;  
* guarantee that all physical stock is correct;  
* automatically approve refunds;  
* automatically approve price exceptions;  
* automatically decide what to do with returned medicines;  
* replace HQ's existing price-list or dispatch process;  
* allow silent editing of a locked period.

Cardbook checks records and selected physical stock. It does not replace a full physical stocktake.

---

**7\. Daily pharmacy journey**

**Stage 1 — HQ setup**

HQ prepares:

1. drug catalogue;  
2. standard prices;  
3. branch-specific prices;  
4. opening stock;  
5. stock dispatched to each branch;  
6. authorised staff accounts;  
7. authorised approvers.

The branch receives the information automatically.

The branch does not type drug names or standard prices.

---

**Stage 2 — Start of day**

The staff member signs in using their individual account.

Cardbook shows:

* branch;  
* staff member;  
* available drugs;  
* applicable prices;  
* expected stock.

The staff member confirms any delivery received.

---

**Stage 3 — During the day**

The staff member:

1. selects the drug;  
2. selects quantity using \+ / −;  
3. sees the applicable price;  
4. confirms the sale.

For a normal sale, the process should remain very short.

If the price differs from the approved price:

* a reason is required;  
* the sale records the actual price charged;  
* HQ is notified;  
* the price list itself is not changed.

**Stage 1 — HQ Setup and Stock Import**

HQ sets up the medicines and stock information that Cardbook will use.

Where HQ already has an Excel document containing its medicine list, HQ can upload the document into Cardbook instead of entering every medicine manually.

The process is:

**Upload Excel → Cardbook reads the file → HQ reviews the information → HQ makes adjustments if required → HQ confirms → Cardbook updates the records**

Cardbook must not immediately change the medicine catalogue or stock records when the file is uploaded.

Before confirmation, HQ must be able to:

* Review the medicines Cardbook has identified  
* Correct information  
* Add missing information  
* Remove rows that should not be imported  
* Add medicines that are missing from the file  
* Correct quantities  
* Confirm or change the stock unit  
* Review prices  
* Resolve possible duplicate medicines  
* Confirm which branch the stock belongs to

Only after HQ confirms the import should Cardbook create or update the relevant records.

 

---

**8\. Physical stock check**

**8.1 Purpose**

The physical stock check exists because two records can agree while the shelf is still wrong.

For example:

* Cardbook expects 20 packs;  
* the paper/card record also says 20;  
* but only 18 packs are physically present.

A record-only check would not find this.

A physical check can.

**8.2 Daily requirement**

Each branch performs a physical count of **two drugs per day**.

Cardbook should select or present two drugs for counting.

The selection should be recorded so the branch can see which drugs were checked.

**8.3 Physical count process**

The staff member:

1. sees the drug selected for checking;  
2. counts the quantity physically present;  
3. enters the physical quantity;  
4. Cardbook shows the expected quantity;  
5. Cardbook compares the two;  
6. if they agree, the check is complete;  
7. if they disagree, the staff member selects a reason;  
8. unresolved differences remain visible.

**8.4 Physical-count reasons**

The initial reason list should include:

* counting error;  
* sale not recorded;  
* sale recorded incorrectly;  
* damaged;  
* expired;  
* spoiled;  
* returned;  
* transferred;  
* missing/unaccounted for;  
* other.

The final list should be confirmed with Angela using actual branch experience.

**8.5 Important rule**

A physical count must **not automatically change stock**.

If the expected quantity is 20 and the physical count is 18, Cardbook records:

Expected: 20  
 Physical: 18  
 Difference: −2

The system then asks for an explanation or escalation.

It must not silently change 20 to 18\.

---

**9\. Evening check**

The evening check now contains three parts.

**Check 1 — Sales records**

Does the sales record agree with the expected stock calculation?

**Check 2 — Physical stock**

Were the two selected drugs physically counted?

Were there any differences?

**Check 3 — Outstanding issues**

Are there any:

* unanswered differences;  
* pending refunds;  
* pending price exceptions;  
* failed uploads;  
* other required actions?

**Traffic-light rules**

**Green**

* required checks completed;  
* no unresolved required issue.

**Amber**

* a difference or action requires attention;  
* but the day can still be closed where the rules allow.

**Red**

* a required check has not been completed;  
* or there is a serious unresolved issue that prevents normal closing.

The colours must have clear rules. They must not simply mean "good, maybe, bad."

---

**10\. Disagreements**

Cardbook should show only the lines that need attention.

For each disagreement, show:

* drug;  
* expected quantity;  
* recorded quantity;  
* physical quantity where applicable;  
* difference;  
* date;  
* person who recorded the relevant transaction;  
* person answering the disagreement;  
* reason;  
* status.

The wording should remain neutral.

For example:

**Expected stock: 20**  
 **Physical count: 18**  
 **Difference: 2**  
 **What happened?**

Not:

"Who lost two packs?"

---

**11\. Undo, refund and returned medicines**

These must be treated as separate situations.

**11.1 Undo**

Used when a staff member has entered something incorrectly.

Example:

Wrong quantity entered.

An undo corrects the entry according to the product rules.

**11.2 Refund**

A refund is a genuine reversal of a completed sale.

The Counter can request it.

The authorised HQ approver must approve it.

The refund must not change the day's total until approval.

**11.3 Returned medicine**

A returned medicine must **not automatically go back into saleable stock**.

The product must record that the item was returned and leave the final stock treatment to the authorised decision.

The approved outcome may need to distinguish between:

* returned to saleable stock;  
* quarantined;  
* damaged/spoiled;  
* expired;  
* other approved treatment.

The exact rules should be confirmed with Angela before development.

---

**12\. Price exceptions**

Cardbook must distinguish between:

**Approved branch price**

A price already defined by HQ for that branch.

**One-off price exception**

A sale made at a price different from the approved price.

For a one-off exception:

* reason required;  
* actual price recorded;  
* staff member identified;  
* time recorded;  
* HQ can see the exception;  
* the normal price remains unchanged.

---

**13\. Offline operation**

Cardbook must continue working when there is no internet connection.

At minimum, the following must work offline:

* staff sign-in where the account has already been recognised on the device;  
* sales;  
* physical counts;  
* discrepancy answers;  
* day closing.

The phone must clearly tell the staff member whether information is:

* saved on the phone;  
* sent to HQ;  
* waiting to be sent;  
* failed to send.

Cardbook must never show "saved to HQ" when the information is only saved on the phone.

---

**14\. Sending information to HQ**

When the phone reconnects:

* saved records are sent automatically;  
* failed sends are retried;  
* the same transaction must not appear twice at HQ;  
* HQ can see whether a branch is up to date;  
* information that has not reached HQ is clearly marked.

HQ must never be shown an estimated figure as though it were the final figure.

---

**15\. HQ view**

The HQ screen should remain simple.

For each branch, Angela should be able to see:

* today's sales;  
* evening check status;  
* physical-count status;  
* unresolved differences;  
* pending refunds;  
* pending price exceptions;  
* whether information has reached HQ.

The purpose is visibility, not staff surveillance.

There should be no ranking of branches or staff.

---

**16\. Decision rights**

| Decision | Owner | Rule |
| :---- | :---- | :---- |
| Drug catalogue | HQ | Branch cannot change it |
| Standard price | HQ | Branch cannot change it |
| Branch-specific price | HQ | Set by branch |
| One-off price exception | Authorised HQ approver | Reason required |
| Record sale | Individual branch staff | Individual account required |
| Answer disagreement | Individual branch staff | Person and time recorded |
| Perform physical count | Individual branch staff | Person and time recorded |
| Raise refund | Branch staff | Reason required |
| Approve refund | Authorised HQ approver | Branch cannot approve its own refund |
| Close day | Individual branch staff | Person and time recorded |
| Lock period | Authorised HQ approver | No silent changes afterwards |
| Correct locked period | Authorised person | New visible adjustment |
| Clinical decision | Out of scope | Never made by Cardbook |

---

**17\. Functional requirements**

The original PRD describes the requirements as F1–F34 but later continues the user stories to 38\. This should be corrected in v1.1.

Use one numbering system:

**FR-01, FR-02, FR-03...**

**Core requirements**

| ID | Requirement | Priority | Acceptance check |
| :---- | :---- | :---- | :---- |
| FR-01 | HQ can create and maintain the drug catalogue. | 1 | Branch cannot change catalogue information. |
| FR-02 | HQ can set standard prices. | 1 | Branch sees the correct price automatically. |
| FR-03 | HQ can set branch-specific prices. | 1 | Different branches can see their correct prices. |
| FR-04 | HQ can record stock issued to each branch. | 1 | Branch expected stock reflects the recorded issue. |
| FR-05 | Branch can confirm delivery received. | 1 | Receipt is recorded against the branch. |
| FR-06 | Each staff member has an individual account. | 1 | Two staff members produce separate identities in the record. |
| FR-07 | Staff can record a sale quickly. | 1 | Sale records drug, quantity, price, person and time. |
| FR-08 | Sales can be recorded offline. | 1 | Sale remains safely stored without internet. |
| FR-09 | Price exception requires a reason. | 1 | Sale cannot save without the required reason. |
| FR-10 | Cardbook calculates expected stock. | 1 | Expected quantity changes correctly after stock movement. |
| FR-11 | Cardbook performs the evening record check. | 1 | Differences are shown without requiring manual calculation. |
| FR-12 | Only disagreeing lines are shown for investigation. | 1 | Matching lines remain silent. |
| FR-13 | Staff can record a reason for a record difference. | 1 | Reason and staff identity are saved. |
| FR-14 | Cardbook selects two drugs for physical counting each day. | 1 | Two required physical counts appear for the branch. |
| FR-15 | Staff can enter physical quantity. | 1 | Physical count is saved with drug, person and time. |
| FR-16 | Cardbook compares expected and physical quantity. | 1 | Difference is calculated automatically. |
| FR-17 | Staff can record a reason for physical difference. | 1 | Reason is attached to the difference. |
| FR-18 | Physical count can be performed offline. | 1 | Count remains available after loss of network. |
| FR-19 | Physical count does not automatically adjust stock. | 1 | Difference remains visible until authorised action. |
| FR-20 | Staff can close the day. | 1 | Day shows person and time of closing. |
| FR-21 | HQ can see branch check status. | 1 | HQ can distinguish completed, outstanding and not-yet-updated branches. |
| FR-22 | Information sends automatically when connection returns. | 1 | Offline records reach HQ after reconnection. |
| FR-23 | Duplicate records are prevented. | 1 | One transaction appears once at HQ. |
| FR-24 | HQ can see unresolved differences. | 1 | Open issues are visible by branch and drug. |
| FR-25 | Staff can request a refund. | 1 | Request records reason and person. |
| FR-26 | Refund requires authorised approval. | 1 | Branch cannot approve its own refund. |
| FR-27 | Refund does not change the day's total before approval. | 1 | Pending refund remains clearly marked. |
| FR-28 | Returned medicine requires a recorded outcome. | 2 | Returned stock is not automatically treated as saleable. |
| FR-29 | HQ can close and lock a period. | 1 | Locked records cannot be silently changed. |
| FR-30 | Locked-period corrections use visible adjustments. | 1 | Original value remains visible alongside correction. |
| FR-31 | Export includes the audit trail. | 1 | Figure can be followed to person, date and change. |
| FR-32 | Staff accounts can be disabled. | 1 | Disabled staff cannot record new activity. |
| FR-33 | HQ can identify the status of information sent from each branch. | 1 | Waiting/failed/up-to-date status is visible. |
| FR-34 | Cardbook supports the agreed branch and HQ workflow without requiring patient information. | 1 | No patient field is required anywhere in the process. |
| FR-35 | Cardbook records physical-count completion separately from record reconciliation. | 1 | A completed record check cannot falsely mark physical count as complete. |
| FR-36 | Cardbook keeps an individual history of actions. | 1 | Sale, count, answer, approval and adjustment show the responsible person. |
| FR-37 | Cardbook provides a simple daily status. | 1 | Staff can see whether today's required checks are complete. |
| FR-38 | Auditor export can be produced without an auditor account. | 2 | Export and printed trail contain required evidence. |

 

**FR-39 — HQ Excel Drug and Stock Import**

**Description**  
 HQ can upload an existing Excel document containing medicine and stock information instead of entering every medicine manually into Cardbook.

Cardbook reads the information from the uploaded file and presents it to HQ for review before making any changes to the system.

**Purpose**  
 Reduce manual data entry for HQ when setting up the medicine catalogue or recording stock received by a branch, while giving HQ control over the information that is added to Cardbook.

**Expected behaviour**

1. HQ selects **Import from Excel**.  
2. HQ uploads an Excel file.  
3. Cardbook reads the supported columns from the file.  
4. Cardbook displays the imported information in a review screen.  
5. HQ can edit, remove or add information before confirming the import.  
6. Cardbook highlights missing, invalid or potentially duplicate information.  
7. HQ confirms the final information.  
8. Cardbook adds new medicines or updates the relevant records according to the import action selected.  
9. The import is recorded with the staff member, date and time.  
10. Cardbook must not change existing catalogue or stock information until HQ confirms the import.

**Information that may be imported**

* Medicine name  
* Strength  
* Pack size  
* Primary stock unit  
* Standard price  
* Branch price, where applicable  
* Quantity issued/received  
* Other agreed catalogue information

**Stock units**

Each medicine must have a defined primary stock unit, such as:

* Tablet  
* Pack  
* Strip  
* Bottle  
* Ampoule  
* Vial  
* Other agreed unit

The imported stock unit must be reviewed by HQ before confirmation.

**Import modes**

Cardbook should distinguish between:

**1\. Import/Update Drug Catalogue**  
 Used when HQ is adding or updating the medicines available in Cardbook.

**2\. Add/Receive Stock**  
 Used when HQ is recording stock being issued or received for a particular branch.

An Excel upload for stock should not automatically change the underlying medicine catalogue unless HQ explicitly confirms a catalogue change.

**Duplicate and matching rules**

Cardbook should identify possible matches between uploaded medicines and medicines already in Cardbook. Matching should not rely only on the medicine name where other information such as strength or pack size is available.

Where Cardbook cannot confidently identify a match, HQ must be asked to review the item before confirmation.

**Error handling**

The review screen should clearly identify:

* Missing required information  
* Invalid quantities  
* Missing stock units  
* Possible duplicate medicines  
* Medicines that cannot be matched  
* Unsupported or incorrectly formatted information

HQ should be able to correct the information before completing the import.

**Audit trail**

Cardbook should record:

* Who uploaded the file  
* Date and time of upload  
* File/import reference  
* Medicines added  
* Medicines updated  
* Stock quantities added  
* Changes made during review  
* Person who confirmed the import

**User experience**

The process should be beginner-friendly. HQ should not need technical knowledge of spreadsheets or data imports.

Use simple language such as:

**Upload your Excel file**  
 Cardbook will read the information and show you what it found.

Then:

**Review before adding**  
 Check the medicines and quantities. You can make changes before confirming.

The final action should be clearly labelled:

**Confirm and Add to Cardbook**

 

**FR-40 — Excel Medicine and Stock Import**

**Business Problem**  
 HQ may already maintain its medicine list and stock information in Excel. Re-entering this information manually into Cardbook would create unnecessary work and increase the risk of data-entry errors.

**Description**  
 Cardbook shall allow authorised HQ staff to upload an Excel document containing supported medicine and/or stock information.

Cardbook shall read the supported information and display it to HQ for review before any records are created or changed.

**Supported Medicine Catalogue Fields**

The initial supported fields should include:

| Field | Required? | Example |
| :---- | :---- | :---- |
| Medicine Code | Optional | MED001 |
| Medicine Name | Yes | Paracetamol |
| Generic Name | Optional | Paracetamol |
| Strength | Yes where applicable | 500 mg |
| Dosage/Form | Yes | Tablet |
| Pack Size | Yes where applicable | 100 tablets |
| Stock Unit | Yes | Tablet |
| Standard Price | Yes | £5.00 |
| Branch Price | Optional | £5.50 |

**Supported Stock Fields**

| Field | Required? | Example |
| :---- | :---- | :---- |
| Medicine Code | Preferred | MED001 |
| Medicine Name | Yes | Paracetamol |
| Quantity | Yes | 500 |
| Stock Unit | Yes | Tablet |
| Branch | Yes | Branch 1 |
| Date Received | Yes | 20/09/2026 |
| Stock/Delivery Reference | Optional | DEL-001 |

**Review and Adjustment**

After upload, Cardbook shall display a review screen before importing the information.

HQ shall be able to:

* Edit imported information  
* Add missing information  
* Remove an item  
* Add a new medicine  
* Correct quantities  
* Change the stock unit  
* Correct prices  
* Resolve possible duplicate medicines  
* Confirm the branch receiving the stock

Cardbook shall clearly highlight missing, invalid or potentially duplicate information.

**Confirmation**

Cardbook shall not create or update the relevant records until HQ confirms the reviewed information.

The final action should be clearly presented as:

**Confirm and Add to Cardbook**

**Medicine Matching**

Where a Medicine Code exists, Cardbook should use it to help identify the medicine.

Where no Medicine Code exists, Cardbook should use available information such as medicine name, strength, dosage/form and pack size to identify possible matches.

Where Cardbook cannot confidently determine whether an uploaded medicine already exists, HQ must review the match before confirming the import.

**Audit Trail**

Cardbook shall record:

* Staff member who uploaded the file  
* Date and time of upload  
* Imported file/reference  
* Medicines added  
* Medicines updated  
* Stock quantities added  
* Changes made during review  
* Staff member who confirmed the import

**User Experience**

The process must be beginner-friendly and use simple language.

Example:

**Upload your Excel file**  
 Cardbook will read the information and show you what it found.

Then:

**Review before adding**  
 Check the medicines and quantities. You can make changes before confirming.

The system should not require HQ staff to understand technical data-import terminology.

 

 

**18\. Stock units**

Before development, the PRD must define what quantity means.

For each drug, HQ must specify the unit used for stock recording, for example:

* pack;  
* bottle;  
* strip;  
* tablet;  
* vial;  
* other agreed unit.

The same unit must be used consistently for:

* opening stock;  
* stock received;  
* sales;  
* expected stock;  
* physical count.

Cardbook must not allow staff to accidentally compare different units.

---

**19\. Risks and controls**

| Risk | Control |
| :---- | :---- |
| Staff return to paper | Sale and count process must be quicker and simpler than paper. |
| Cardbook becomes a second book | Staff should enter only information they are responsible for. |
| HQ price is wrong | HQ owns catalogue and prices. |
| Branch is blamed for HQ error | Show the source, price version, person and time without accusing anyone. |
| Auditor rejects export | Agree the format with Angela before final build. |
| Only one person can approve refunds | Define a backup authorised approver. |
| Phone has no internet | Sales and physical counts work offline. |
| Duplicate information reaches HQ | Each saved transaction must be uniquely identifiable. |
| Records agree but shelf is wrong | Two physical drugs are counted each day. |
| Physical difference is treated as an automatic stock adjustment | Physical count records a difference; it does not silently change expected stock. |
| Returned medicine is automatically resold | Return requires an approved outcome. |
| Staff share one account | Individual accounts are mandatory. |
| Phone clock is incorrect | Record device time and server time where available. |
| Locked records are changed silently | Corrections use dated, named adjustments. |

---

**20\. What Cardbook does not claim**

The following statements must remain explicit:

**Cardbook can say:**

"The records disagree."

**Cardbook can say:**

"The expected quantity is 20 and the physical count is 18."

**Cardbook cannot say:**

"Two packs were stolen."

**Cardbook cannot say:**

"The shelf is correct."

**Cardbook cannot say:**

"This person caused the loss."

The system records facts and asks for an explanation. It does not decide blame.

---

**21\. Primary measure**

The primary measure remains:

**Percentage of mismatched lines caught and settled on the same day, before the day is closed.**

Additional measures should include:

| Measure | Why it matters |
| :---- | :---- |
| Evening check completion | Shows whether branches are using the process. |
| Physical count completion | Shows whether the second stock check is actually happening. |
| Physical-count differences found | Shows whether the physical check is finding differences. |
| Time taken to settle differences | Shows whether problems are being dealt with promptly. |
| Sales entry time | Confirms Cardbook is not slower than paper. |
| Fallback to paper | Shows where Cardbook is failing. |
| Month-end recount time | Shows whether the product is reducing manual checking. |
| Unsynced records at close | Shows whether HQ is seeing current information. |
| Pending refunds at lock | Shows whether approvals are being completed. |
| Correction rate | Shows how often recorded information needs to be corrected. |

Targets should be set only after the current branch process has been measured.

---

**22\. Demo — 10 October 2026**

The demo should prove one story:

**A mistake made at a branch is found that evening, investigated, answered, and visible to HQ before month-end.**

The revised demo should include:

1. Individual staff sign-in.  
2. Normal sale.  
3. Offline sale.  
4. Price exception.  
5. Evening record check.  
6. Two-drug physical count.  
7. One deliberate physical-stock difference.  
8. Staff explanation of the difference.  
9. Day closing.  
10. Reconnection and sending to HQ.  
11. HQ view of the branch.  
12. Refund request.  
13. Authorised refund approval.  
14. Period lock.  
15. Visible correction after lock.  
16. Export showing the trail.

The physical-count difference should be deliberate in the demo so the audience can see why the second check exists.

---

**23\. Demo data**

Use:

* 12 drugs;  
* 4 branches;  
* individual staff accounts for each branch;  
* opening stock for each branch;  
* one dispatch per branch;  
* normal sales;  
* one incorrect quantity;  
* one price exception;  
* two selected physical-count drugs;  
* one deliberate physical-count difference;  
* one refund request.

The demo should not contain dozens of artificial problems.

The purpose is to demonstrate the normal process and show how one real difference is handled.

---

**24\. Build order**

Build in this order:

1. HQ drug catalogue.  
2. HQ prices.  
3. Branch prices.  
4. Staff accounts.  
5. Opening stock.  
6. Stock dispatch.  
7. Delivery confirmation.  
8. Sale recording.  
9. Offline sale.  
10. Price exception.  
11. Expected stock calculation.  
12. Evening record check.  
13. Physical count of two drugs.  
14. Physical difference.  
15. Reason recording.  
16. Day closing.  
17. Automatic sending to HQ.  
18. HQ branch view.  
19. Refund request.  
20. Refund approval.  
21. Period lock.  
22. Locked-period adjustment.  
23. Export.

The branch process must be completed before adding extra HQ reporting.

---

**25\. Scope for the first release**

**Included**

* individual staff accounts;  
* HQ catalogue;  
* prices;  
* branch-specific prices;  
* stock received;  
* daily sales;  
* offline sales;  
* record reconciliation;  
* two-drug daily physical count;  
* physical difference recording;  
* evening check;  
* day closing;  
* refunds;  
* price exceptions;  
* automatic sending to HQ;  
* HQ branch view;  
* period locking;  
* visible adjustments;  
* export and audit trail.

**Not included**

* full daily physical stocktake;  
* automatic stock-loss investigation;  
* automatic theft detection;  
* automatic stock adjustment after physical count;  
* automatic approval of refunds;  
* automatic approval of price exceptions;  
* patient records;  
* clinical functions;  
* accounting;  
* payroll;  
* supplier management;  
* online ordering;  
* staff performance ranking.

 

**Excel Import Business Rules**

1. Excel import is available to authorised HQ staff only.  
2. Uploading an Excel file does not automatically change Cardbook records.  
3. All imported information must pass through an HQ review step before confirmation.  
4. Cardbook should support both existing HQ Excel files and a Cardbook-recommended Excel format.  
5. Cardbook should recognise common alternative column names where possible, such as:  
   * Drug Name / Medicine Name  
   * Qty / Quantity  
   * Unit Price / Standard Price  
   * Form / Dosage Form  
6. Where Cardbook cannot identify a column or understand its contents, HQ must be asked to map or correct it before continuing.  
7. A Medicine Code should be used where HQ already has one.  
8. Cardbook must identify possible duplicate medicines before confirmation.  
9. Stock imports must identify the branch receiving the stock.  
10. Stock quantities must use the medicine's defined primary stock unit.  
11. An Excel stock upload must not silently change the medicine catalogue.  
12. Changes made during the review process must be included in the audit trail.  
13. The original uploaded file should remain associated with the import record where technically feasible.  
14. Excel import does not replace Cardbook's normal manual method of adding or adjusting a medicine.

 

---

**26\. Open decisions before development**

The following should be confirmed before development is considered complete:

1. Exact stock unit for each drug.  
2. Final list of physical-count difference reasons.  
3. Final list of price-exception reasons.  
4. Who the backup HQ approver will be.  
5. How individual staff authenticate on the phone.  
6. Whether one device can be used by multiple staff members during a shift, provided each person signs into their own account.  
7. What happens when a returned medicine is received.  
8. Final auditor export format.  
9. Exact rule for selecting the two physical-count drugs each day.  
10. What happens when a physical count remains unresolved at day close.  
11. Treatment of physical differences during a locked period.  
12. Final rule for device time versus server time.

---

**27\. Core product rule**

Every proposed feature must pass one of two tests:

**For the branch:**

**Does this make the day's work easier than the paper book?**

**For HQ:**

**Does this make the figures easier to understand and defend?**

If it does neither, it should not be added simply because it is technically possible.

---

**28\. Final product statement**

**Cardbook helps branch pharmacies record daily sales, check their records every evening, and physically check two drugs each day. When something does not agree, it shows the difference, records who investigated it, and keeps the matter visible until it is settled.**

Cardbook does not try to become a full pharmacy management system.

Its value is narrower:

**Find the difference early. Show the facts. Record who dealt with it. Do not let the problem wait until month-end.**

Yes. These decisions make the PRD clearer, especially around **beginner-friendliness** and how the physical stock check should work.

I would update the four open decisions as follows. I would also make one important change: **do not make staff choose between many complicated sign-in methods during normal use**. Let them create an account with a phone number or email, then make everyday access very simple.

**Updated Decisions for Cardbook PRD v1.1**

**1\. Staff account and sign-in**

**Principle**

Cardbook must be easy enough for a first-time smartphone user to understand without training.

Creating an account and signing in should therefore require as few steps as possible.

**Account creation**

Each staff member creates an individual Cardbook account using either:

* **Mobile phone number**, or  
* **Email address**.

The staff member's account should contain:

* Full name;  
* Phone number or email address;  
* Assigned branch;  
* Account status.

The account is individual. Staff must not share one Cardbook account.

**Recommended sign-in approach**

For beginner-friendly use, Cardbook should support a simple sign-in process.

The preferred approach is:

1. Staff enters their phone number or email address.  
2. Cardbook sends a simple verification code.  
3. Staff enters the code.  
4. Cardbook opens their account.

The app should avoid requiring staff to remember a complicated password unless there is a clear reason to introduce one.

Once a staff member has successfully signed in on an approved device, Cardbook should make subsequent access even easier where practical.

**Important offline rule**

Because Cardbook must work without internet:

* staff who have already been recognised on the device should still be able to access the app when temporarily offline;  
* the app must clearly show when the device is offline;  
* offline activity must still be linked to the correct staff account;  
* the app must not create a new staff account while offline.

**Beginner-friendly design rule**

The staff member should not have to understand technical terms.

For example, Cardbook should say:

**You're offline. Your work is saved on this phone and will be sent when the internet returns.**

It should not say:

**Transaction queued for synchronisation.**

---

**2\. Selecting the two physical-count drugs**

The two drugs will be selected **randomly each day**.

**Daily process**

At the start of the physical stock check, Cardbook randomly selects two eligible drugs from the branch's active drug list.

The staff member sees:

**Today's physical stock check**

1. Amoxicillin 500 mg — 20 packs  
2. Paracetamol 500 mg — 35 packs

The staff member then counts the actual quantity on the shelf and enters the result.

**Important rule**

The staff member should not be able to simply replace the selected drugs because they are inconvenient to count.

If a selected drug genuinely cannot be counted, for example because it is unavailable or there is another valid reason, the staff member should select an appropriate reason and Cardbook should select another drug according to the agreed rule.

The reason for the replacement should be recorded.

**What "random" means**

The purpose of random selection is to prevent the branch from checking only the drugs it expects to be correct.

Over time, different drugs should therefore be checked.

Cardbook should keep a record of:

* date;  
* drug selected;  
* branch;  
* staff member;  
* expected quantity;  
* physical quantity;  
* result.

This gives HQ a history of which drugs have actually been checked.

---

**3\. What happens when physical stock differs**

A physical difference is **not automatically treated as a stock adjustment, loss, theft or staff error**.

The difference starts an investigation between the branch and HQ.

**Example**

Cardbook says:

Expected quantity: 20 packs

The staff member counts:

Physical quantity: 18 packs

Cardbook shows:

**Difference: 2 packs**

The branch then investigates with HQ.

Possible explanations may include:

* sale not recorded;  
* wrong quantity entered;  
* previous stock entry was incorrect;  
* damaged stock;  
* expired stock;  
* spoiled stock;  
* returned medicine;  
* stock transferred elsewhere;  
* counting error;  
* another explanation.

**Branch and HQ responsibility**

The branch provides the information it has.

HQ reviews the relevant records.

Together they decide what happened and what action should be taken.

Cardbook should record:

* original expected quantity;  
* physical quantity counted;  
* difference;  
* explanation;  
* branch response;  
* HQ response;  
* agreed outcome;  
* names of the people involved;  
* date/time the matter was resolved.

**Important rule**

Cardbook should **not decide blame**.

It should also **not automatically change the stock figure** simply because a physical count is different.

The agreed outcome must be confirmed by the appropriate person before the stock record is changed.

**Possible final outcomes**

The agreed outcome could be:

* counting error;  
* missing sale identified;  
* incorrect previous entry;  
* damaged stock;  
* expired stock;  
* spoiled stock;  
* returned stock;  
* stock transfer;  
* approved stock adjustment;  
* other agreed explanation.

The final list should be confirmed with the pharmacist/HQ before development.

---

**4\. Stock units**

Cardbook must support the unit in which each medicine is normally counted and sold.

The unit should be set for each medicine by HQ when the medicine is added to the catalogue.

**Supported stock units**

The initial options should include:

* **Tablet**  
* **Pack**  
* **Bottle**  
* **Strip**  
* **Ampoule**  
* **Vial**  
* **Other agreed unit**

The list can be expanded if the pharmacy identifies additional units that are regularly needed.

**Examples**

| Medicine type | Possible stock unit |
| :---- | :---- |
| Individual tablets | Tablet |
| Box containing multiple items | Pack |
| Syrup | Bottle |
| Medication supplied in strips | Strip |
| Injectable medicine supplied as individual ampoules | Ampoule |
| Injectable medicine supplied as individual vials | Vial |

The important point is that the unit is defined **for each medicine**.

For example:

Paracetamol 500 mg → Tablet

or:

Paracetamol 500 mg → Pack

or:

Cough syrup → Bottle

**The unit must be consistent**

The same agreed unit must be used when Cardbook records:

* opening stock;  
* stock received;  
* sales;  
* expected stock;  
* physical count;  
* stock adjustments.

This prevents Cardbook from comparing different quantities as though they were the same.

**Avoid unnecessary complexity**

Cardbook should not initially try to convert every possible unit automatically.

For example, it should not assume:

1 pack \= 20 tablets

unless HQ has specifically defined that relationship for that medicine.

For the first version, the safest approach is:

**Each medicine has one primary stock unit.**

If conversion between packs, strips and individual tablets becomes necessary later, it can be added as a separate feature.

---

**5\. Updated physical stock process**

The complete process should now be:

**Step 1 — Cardbook selects two drugs**

Selection is random.

**Step 2 — Staff counts the shelf**

The staff member physically counts the quantity using the medicine's defined unit.

**Step 3 — Staff enters the count**

Example:

Expected: 30 bottles  
 Physical: 30 bottles

**Step 4 — Cardbook compares them**

If they agree:

**Physical check complete**

If they differ:

**Difference found — review required**

**Step 5 — Branch investigates**

The branch checks the relevant sales, stock movements and previous information.

**Step 6 — HQ and branch review together**

If the difference cannot be explained immediately, HQ and the branch work together to establish what happened.

**Step 7 — Outcome is recorded**

The agreed explanation and action are recorded.

**Step 8 — Adjustment, if required**

Only an authorised person can approve an actual stock adjustment.

The original physical count and original expected quantity remain visible.

---

**6\. Updated beginner-friendly design principle**

Add the following principle to the PRD:

**Cardbook must be designed for pharmacy staff who may have little technical experience. Every common task should be understandable without technical training, use familiar pharmacy language, require as few steps as reasonably possible, and clearly explain what the user needs to do next.**

The app should favour:

* large, clear buttons;  
* familiar words;  
* minimal typing;  
* automatic drug and price information;  
* simple yes/no or selection questions where possible;  
* clear confirmation after an action;  
* simple explanations when something goes wrong;  
* no unnecessary technical language.

For example:

**Instead of:**

"Sync failed. Retry transaction."

Use:

**"Your sale is saved on this phone but has not reached HQ yet. We'll try again when the internet returns."**

---

**7\. Updated open decisions**

After these decisions, the remaining questions before development are:

1. Confirm the exact phone/email verification method.  
2. Confirm whether staff can use the same physical phone while each person signs into their own account.  
3. Confirm the final list of stock units.  
4. Confirm whether a medicine can have more than one selling unit.  
5. Confirm the final reasons for physical-stock differences.  
6. Confirm who can approve a stock adjustment.  
7. Confirm the backup HQ approver.  
8. Confirm the final auditor export format.  
9. Confirm what happens if a physical count cannot be completed that day.  
10. Confirm the exact rules for changing a physical-count result after HQ and branch agree on an outcome.

**One additional recommendation:** for the first version, I would make **phone number the easiest/default registration option**, with email as an alternative. For a small branch pharmacy, entering a phone number and receiving a verification code is likely to be more straightforward than asking staff to create and remember another password.

Also, I would keep **"random" selection genuinely random**, rather than allowing the branch to choose its two drugs. That makes the physical check much more useful without making the staff's daily job significantly harder.

---

**Appendix — Implementation Note (27 Sep 2026, locked)**

Detailed plan: `IMPLEMENTATION_PLAN.md` (phased, design system → architecture → FR-01..FR-40 → demo 10 Oct 2026).

Locked demo stack (local-first, no cloud needed):
* App framework — Next.js + TypeScript (`/branch` + `/hq`)
* UI — Tailwind CSS
* Database — PostgreSQL local (Docker Compose)
* Auth — Better Auth local (individual accounts, email OTP for demo)
* DB access — Drizzle ORM
* File storage — Local `/uploads` for demo (original Excel kept)
* Excel — ExcelJS (primary), SheetJS fallback for odd HQ files
* Version control — Git + GitHub (`Jazoe-extra/Rx-cardbook`, `main`)
* Run — app + DB locally (`docker compose up -d db`, `npm run dev`)

Offline (FR-08/FR-18) via PWA + IndexedDB outbox with UUID idempotency. PRD product rules unchanged.

**Refinement Note (27 Sep 2026, OJ):**
* Stack confirmed local-first as above — app + DB run locally for demo, no paid cloud needed.
* Design preview (`design-preview.html`) — background changed to light blue gradient (#EAF4FF → #DCEBFF), white cards with soft shadow, headings in pharmacy blue (#0B4EA2), teal gradient buttons. Reason: more inviting, less dull, still beginner-friendly with 56px targets and plain language.
* Product rules unchanged — 2 daily checks, random 2-drug count, no auto-adjust, neutral language, individual accounts.

 

 

