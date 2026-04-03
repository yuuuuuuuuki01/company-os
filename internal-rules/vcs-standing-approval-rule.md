---
id: rule-vcs-standing-approval
layer: internal-rule
status: active
owner: founder-office
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# VCS Standing Approval Rule

## Scope

For the `company-os` repository, ordinary `git add`, `git commit`, and `git push origin main` maintenance actions are treated as standing-approved operating acts unless a higher-risk exception applies.

## Limits

This standing approval does not automatically cover:

- destructive history rewrites
- secret publication
- irreversible removal of critical records
- pushes outside the intended company-os repository

## Record owner

`Data and Knowledge` maintains the standing approval record.
