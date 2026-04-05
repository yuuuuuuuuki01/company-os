---
id: rule-cli-autonomous-execution
layer: internal-rule
status: active
owner: internal-tools-enablement
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-05
---

# CLI自律実行ルール

## 目的

Codex CLI が通常業務をできるだけ自律実行し、不要な承認照会で停止しないようにする。

## 基本原則

- low / medium の通常運用は CLI が継続実行してよい。
- 会議、台帳更新、議案更新、裁定更新、CLI 補助実装、README 更新、commit、push は通常範囲とする。
- 現状参照は `current-activity-board`, `company-os-improvement-board`, 関連台帳を優先する。
- 1回の実行では `確認 -> 更新 -> commit -> push -> 次手の起票` まで束ねてよい。

## Founder へ戻す条件

- high risk 判定の新規開始
- 鍵、秘密情報、認証情報の実投入
- 不可逆操作
- 憲法 / 法律 / 定款の改定
- 5本目以降の新規PJ活性化
- 既存の除外境界を越える script 化

## 指示テンプレート運用

- CLI には `参照ファイル`, `更新対象`, `停止条件`, `完了条件` を必ず渡す。
- `進めて` のような広い指示は避け、bounded work に切る。
- 監視、会議、実装、監査を分けたテンプレートを優先使用する。
