---
id: rule-key-custody
layer: internal-rule
status: active
owner: security-risk-compliance
unit: company-os
risk: high
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Key Custody Rule

## Responsible department

`Security, Risk, and Compliance` owns key custody, lending controls, return checks, and compromise response.

## Lending rule

No key may be handed out without a ledger entry.

## Minimum ledger fields

- key id
- holder
- issuer
- purpose
- checkout time
- expected return time
- return time
- status

## Status values

- available
- checked-out
- returned
- revoked
- compromised

## Escalation

Missing return, unknown holder, or suspected compromise must be escalated immediately.
