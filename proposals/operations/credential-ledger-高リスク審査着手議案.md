---
id: motion-credential-ledger-high-risk-screen-opening
layer: proposal
status: motion-open
owner: security-risk-compliance
unit: company-os
risk: high
visibility: role-limited
motion_type: main-motion
created_at: 2026-04-05
updated_at: 2026-04-05
---

# credential-ledger 高リスク審査着手議案

## 目的

`credential-ledger` の high-risk screening を formal opening し、必要なら approval branch へ分岐できる状態にする。

## 提案

- `credential-ledger` を最初の high-risk screening opening 対象にする
- opening 段階では `seat / auth boundary / encryption boundary / secret boundary` の確認に限定する
- 新しい鍵や秘密情報の実利用が必要になった時点で approval branch を開く

## 期待効果

- high-risk 項目を無秩序に止めず、bounded に前進できる
- branch 開放条件が先に見える
- `Poin-T`, `zenken` より先に utility 起点の高リスク項目を整理できる
