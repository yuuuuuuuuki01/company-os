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

このチャットを起動トリガーとしつつ、定常の実務確認と長時間運転はターミナルから CLI で回せるようにする。

## 基本方針

- CLI は `現況確認`, `軽監視`, `ポートフォリオ巡回`, `戦術整理`, `審査開始候補抽出`, `report 集約`, `script 監査 sample 確認` を担う。
- low / medium の定型確認は、できるだけ CLI を先に使う。
- CLI は短い日本語で `今の状況` と `次の実務` を出す。
- high risk は CLI でも branch 判断や formal ruling を飛ばさない。

## 許可コマンド

- `status`
- `light-watch`
- `portfolio`
- `tactical`
- `review-open`
- `report-rollup`
- `script-audit-sample`

## 境界

- CLI は定型確認と定型抽出を主目的とする。
- 高リスク審査開始、鍵、秘密情報、不可逆操作は CLI 単独で完結しない。
- CLI が落ちた場合でも制度上の台帳と会議線を優先する。
