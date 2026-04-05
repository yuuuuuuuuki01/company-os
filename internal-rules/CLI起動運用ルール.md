---
id: rule-cli-launch-operations
layer: internal-rule
status: active
owner: internal-tools-enablement
unit: company-os
risk: low
visibility: public
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-05
---

# CLI起動運用ルール

## 目的

このチャットを起点にしつつ、後続の連続処理はターミナルから明示的に起動できるようにし、ターン制の停止点を減らす。

## 基本原則

- チャットは `起動`, `例外判断`, `方針変更` を担う
- ターミナルは `現状確認`, `巡回`, `補充`, `整流` を担う
- CLI は単発起動を基本とし、常駐プロセスの競合を避ける
- low / medium の巡回は CLI で起動してよい
- high risk は CLI でも branch 条件を越えない範囲に限る

## 標準入口

- `status`: 現況要約
- `light-watch`: 軽監視
- `portfolio`: 事業ポートフォリオ巡回
- `tactical`: 改善ボードと次手の整理

## 出力要件

- 日本語で短く出す
- 必ず `今の位置` と `次の作業` を含む
- 実作業を止める確認文を既定で出さない
