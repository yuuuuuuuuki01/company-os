---
id: ledger-automation-heartbeat-layers
layer: ledger
status: active
owner: assembly-secretariat
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-06
updated_at: 2026-04-06
---

# Automation Heartbeat Layers Ledger

| Layer | Cadence | Owner | Watch actions | Next action |
| --- | --- | --- | --- | --- |
| pulse check | hourly | independent-audit-firm | verify CLI snapshots (`status`, `review-open`, `script-audit-sample`) are sane | rerun CLI when watch queue or automation watch list shifts |
| review sweep | daily | project-management-office | summarize pending review queue and automation watch items | feed backlog note and update ledger rows |
| escalation guard | immediate | security-risk-compliance | monitor approval wait statuses tied to automation bundles | rerun CLI and update approval templates when queue shrinks or remediation events surface |

## Recent automation verification

- `2026-04-06`: Verified `company-os status`, `review-open`, and `script-audit-sample`; these ASCII-friendly snapshots now feed every automation heartbeat layer and should be rerun whenever the watch queue or automation watch list changes so this ledger remains self-driving.
