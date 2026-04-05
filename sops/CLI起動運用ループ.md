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

1. ターミナルから `bin/company-os.cmd` か `bin/company-os.ps1` を起動する
2. `status`, `light-watch`, `portfolio`, `tactical` のいずれかを指定する
3. 出力された `今の位置` と `次の作業` を見て、必要な bounded work を続ける
4. high-risk 兆候が出たら branch 条件ノートへ切り替える

## 既定コマンド

- `company-os status`
- `company-os light-watch`
- `company-os portfolio`
- `company-os tactical`

## 出力

- 現況短報
- 次手の候補
- 参照すべき台帳ファイル
