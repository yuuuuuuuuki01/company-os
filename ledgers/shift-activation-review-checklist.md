---
id: ledger-shift-activation-review-checklist
layer: ledger
status: active
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Shift Activation Review Checklist

| Check | Source | Current state | Requirement |
| --- | --- | --- | --- |
| seat route accepted | `ledgers/shift-seat-route-board.md` | accepted-in-bundle | lawful seating path must stay bounded |
| start packet accepted | `recruiting/shift-unit-owner-start-packet.md` | accepted-in-bundle | packet must remain bounded |
| reviewer route accepted | `ledgers/shift-review-approval-route.md` | accepted-in-bundle | reviewer must be named before activation |
| approval path accepted | `ledgers/shift-review-approval-route.md` | accepted-in-bundle | low/medium path must be explicit |
| lane still `ready` | `ledgers/parallel-operations-board.md` | true | no direct activation before a later execution motion |

## Use

- this checklist is used in discussion and deliberation for the first `shift` activation review path
- failing any item keeps `shift` in `ready`
