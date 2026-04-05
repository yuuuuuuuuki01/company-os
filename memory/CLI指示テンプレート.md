---
id: memory-cli-prompt-templates
layer: memory
status: active
owner: internal-tools-enablement
unit: company-os
risk: low
visibility: public
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-05
---

# CLI指示テンプレート

## 監視用

```text
C:\agent\codex\company-os-sync を対象にしてください。
最初に current-activity-board と company-os-improvement-board と script-audit 周りを確認してください。
必要なら bin/company-os.cmd status / light-watch / report-rollup を使ってください。
low / medium の report と台帳更新だけを進めてください。
high risk、鍵、秘密情報、不可逆操作だけは止めてください。
終わったら commit と push まで進めてください。
```

## 会議用

```text
C:\agent\codex\company-os-sync を対象にしてください。
最初に current-activity-board と company-os-improvement-board と関連 proposal / decision / ledger を確認してください。
必要なら bin/company-os.cmd tactical / review-open / report-rollup を使ってください。
次の ordinary sitting を bounded に1段だけ進めて、議題、裁定、台帳を更新してください。
質問・意見・建設的改善案を募る前提で文面を整えてください。
high risk、鍵、秘密情報、不可逆操作だけは止めてください。
終わったら commit と push まで進めてください。
```

## 実装用

```text
C:\agent\codex\company-os-sync を対象にしてください。
最初に current-activity-board と company-os-improvement-board と対象の implementation bundle ledger を確認してください。
必要なら bin/company-os.cmd status / review-open / script-audit-sample を使ってください。
初回実装束の low / medium 作業だけを1束進めてください。
更新対象は ledgers, proposals, decisions, bin, README に限定してください。
high risk、鍵、秘密情報、不可逆操作、除外境界越えだけは止めてください。
終わったら commit と push まで進めてください。
```

## 監査用

```text
C:\agent\codex\company-os-sync を対象にしてください。
最初に script-audit ledger と token-efficient notice ledger と implementation bundle ledger を確認してください。
必要なら bin/company-os.cmd script-audit-sample / report-rollup を使ってください。
script の適正実行、漏れ、境界逸脱、形骸化の観点だけを確認し、必要な監査ノートと台帳更新を行ってください。
high risk の新規開始や鍵投入は行わないでください。
終わったら commit と push まで進めてください。
```

## 最小指示

```text
C:\agent\codex\company-os-sync で company-os を前進させてください。
最初に status と review-open を見て、次の bounded work を1つ進めてください。
high risk、鍵、秘密情報、不可逆操作だけ止めて、他は commit と push まで進めてください。
```
