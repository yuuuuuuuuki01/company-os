---
id: memory-dashboard-css-knowledge
layer: memory
status: active
owner: product-service-design
unit: company-os
risk: low
visibility: public
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-05
---

# ダッシュボードCSS知見

## 現状パターン

- ダークテーマを CSS 変数でトークン化している
- `bg`, `border`, `text`, `accent` を分けた意味トークン設計になっている
- sticky header と card UI を中心に、会議、部署、PJ を同じ見た目の系で整理している
- `Inter` と `JetBrains Mono` を使い、本文と状態値を分けている
- `report`, `discussion`, `deliberation` を色で素早く見分ける設計が入っている
- 768px 以下で 1 カラムへ落とす素直なレスポンシブ設計になっている

## 再利用価値

- まずトークンを置き、その上にカード、バッジ、タイムラインを積む順序は再利用しやすい
- 状態表示を `badge` と `dot` の2層で持つと視認性が高い
- `mono` を status や時刻だけに使うと情報密度を上げやすい

## 注意点

- 現行テーマは GitHub 風ダーク寄りで、安全だが個性は弱い
- アイコンや文字化けが起こると UI 全体の品質が急落する
- dark-only 依存が強く、ブランド方向を出すなら追加の視覚原則が必要

## 今後の扱い

- UI レーンの成果物レビュー時にこのメモを参照する
- 新しい CSS 方向が出たら、差分をこの知見へ追記する
