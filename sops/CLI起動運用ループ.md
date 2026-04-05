---
id: sop-cli-launch-operations
layer: sop
status: active
owner: internal-tools-enablement
unit: company-os
risk: low
visibility: public
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-05
---

# CLI起動運用ループ

## 手順

1. ターミナルから `bin/company-os.cmd` または `bin/company-os.ps1` を起動する。
2. `status`, `light-watch`, `portfolio`, `tactical`, `review-open`, `report-rollup`, `script-audit-sample` のいずれかを実行する。
3. 出力された `今の状況` と `次の実務` を見て、bounded work を1つ進める。
4. high-risk 要素が出たら branch 判断ノートへ戻す。

## 推奨コマンド

- `company-os status`
- `company-os light-watch`
- `company-os portfolio`
- `company-os tactical`
- `company-os review-open`
- `company-os report-rollup`
- `company-os script-audit-sample`

## 出力

- 日本語短報で返す。
- `今の状況` と `次の実務` を必ず含める。
- 参照すべき台帳ファイルを末尾に出す。
