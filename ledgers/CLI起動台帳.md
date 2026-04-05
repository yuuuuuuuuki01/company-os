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
updated_at: 2026-04-05
---

# CLI起動台帳

| Command | Purpose | Main references | Typical next move |
| --- | --- | --- | --- |
| `company-os status` | 現況を短く確認する | `current-activity-board`, `company-os-improvement-board` | active / pending の次手を確認する |
| `company-os light-watch` | 軽監視を回す | `常時稼働監視台帳`, `非稼働事業審査順序台帳` | handoff と queue を補充する |
| `company-os portfolio` | 事業ポートフォリオを見る | `事業ポートフォリオ台帳`, `非稼働事業着席準備台帳` | 次の review packet を準備する |
| `company-os tactical` | 戦術整理をする | `company-os-improvement-board`, `current-activity-board` | 次の sitting / review opening を決める |
| `company-os review-open` | 審査開始候補を拾う | `非稼働事業審査順序台帳`, `定型業務スクリプト化台帳` | 次の review-open / script 候補を決める |
| `company-os report-rollup` | report 議題を束ねる | `company-os-improvement-board`, `スクリプト監査台帳` | watch 中の項目を report へ寄せる |
| `company-os script-audit-sample` | script 監査 sample を見る | `スクリプト監査台帳`, `全部署トークン節約通達台帳` | 監査対象と例外境界を確認する |
