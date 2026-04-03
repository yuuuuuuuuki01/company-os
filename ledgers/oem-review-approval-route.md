---
id: ledger-oem-review-approval-route
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

# OEM Review And Approval Route

| Item | Proposed route | Owner | Status | Next handoff |
| --- | --- | --- | --- | --- |
| reviewer | Directorate nominates the initial `oem` reviewer for static-tool coherence and release readability checks | directorate | proposed | assembly-secretariat |
| low-risk changes | PMO ordinary approval after reviewer signoff | project-management-office | proposed | assembly-secretariat |
| medium-risk changes | PMO + Security, Risk, and Compliance approval after reviewer signoff | security-risk-compliance | proposed | release-review-committee |
| high-risk changes | out of scope for this bounded preparation wave | founder-office | recorded | later motion if needed |

## Boundary

- this route is for preparation and initial static-tool changes only
- any production-like secrets, destructive operations, or irreversible publication changes need a later explicit route
