---
id: law-appeal
layer: law
status: ratified
owner: constitutional-guardian
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Appeal Law

## Right to appeal

Any formal participant may file an objection or rehearing request against a decision, ruling, or active execution when the participant alleges:

- a procedural defect
- a conflict with higher-order rules
- material new facts

## Effect of appeal

- A matter under objection enters `objection-open`.
- If execution has already started, the matter enters `paused-for-appeal` unless the appealed record explicitly states that the issue is non-blocking.

## Rehearing gate

Rehearing is allowed only for new facts or procedural defects. Mere disagreement is insufficient.
