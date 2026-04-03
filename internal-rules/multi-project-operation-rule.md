---
id: internal-rule-multi-project-operation
layer: internal-rule
status: active
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Multi-Project Operation Rule

## Rule

Company OS may operate multiple units in parallel when each active lane has:

1. a declared unit
2. a declared current owner or pending owner status
3. a declared next handoff target
4. a declared approval path for risky work
5. a visible trace in the `parallel-operations-board`

## Constraints

- A unit may not enter `active` lane status unless its mission packet exists or a bootstrap note explicitly permits pre-onboarding work.
- A lane with missing owner, handoff, or approval path must be marked `blocked` or `ready`, never `active`.
- `high risk` work must still stop at human approval regardless of lane count.
- PMO manages route conflicts; Data and Knowledge manages public visibility integrity.

## Default

The default parallel pattern is:

- `1 active governance lane`
- `0-3 onboarding-ready unit lanes`
- `high-risk release lanes only by exception`
