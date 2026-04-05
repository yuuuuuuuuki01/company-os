---
id: ledger-cli-launch
layer: ledger
status: active
owner: internal-tools-enablement
unit: company-os
risk: low
visibility: public
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-06
---

# CLI Launch Ledger

| Command | Purpose | References | Typical next move |
| --- | --- | --- | --- |
| `company-os status` | snapshot current activity and improvement board | `current-activity-board`, `company-os-improvement-board` | check active/watch items and confirm ASCII output for the next bounded work |
| `company-os light-watch` | refresh handoff, queue, and watch summaries | `常時稼働監視台帳`, `非稼働事業審査順序台帳` | rerun when handoff queue shifts or script audit sample updates |
| `company-os portfolio` | review active/pending/dormant portfolio positioning | `事業ポートフォリオ台帳`, `非稼働事業審査順序台帳` | prepare review packets for backlog items |
| `company-os tactical` | plan the next sitting and review opening | `company-os-improvement-board`, `current-activity-board` | feed review-open or report-rollup updates |
| `company-os review-open` | list queued review-open items and script candidates | `非稼働事業審査順序台帳`, `定型業務スクリプト化台帳` | split off CLI work or ledger updates for the candidates |
| `company-os report-rollup` | summarize watch items and audit targets | `company-os-improvement-board`, `スクリプト監査台帳` | verify watch list alignment with formal reports |
| `company-os script-audit-sample` | collect script-audit sample plus token notice state | `スクリプト監査台帳`, `全部署トークン節約通達台帳` | deliver verified sample for the next independent audit |
