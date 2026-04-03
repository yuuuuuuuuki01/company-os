---
id: rule-credential-request
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

# Credential Request Rule

## Need-only principle

Keys, secrets, and privileged credentials should be requested only when a concrete task cannot lawfully proceed without them.

## Minimum request fields

- requester
- key id or credential class
- purpose
- scope
- minimum duration
- expected holder
- return or revocation condition

## Approval path

Requests flow through `Security, Risk, and Compliance` and are recorded before checkout.

## Default

No standing broad credential access.
