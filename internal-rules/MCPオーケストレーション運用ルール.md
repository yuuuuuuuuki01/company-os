---
id: rule-mcp-orchestration-operations
layer: internal-rule
status: active
owner: internal-tools-enablement
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-10
updated_at: 2026-04-10
---

# MCPオーケストレーション運用ルール

## 目的

MCP サーバーと各種 SaaS を部署および PJ 単位で接続し、必要な業務をオーケストレーションで回せるようにする。

## 基本構造

- `接続層`: MCP サーバー経由で GitHub、Slack、Gmail、Calendar、Figma などへ接続する。
- `運用層`: 部署と PJ が必要な接続だけを使って bounded work を進める。
- `実行層`: CLI、script、local LLM、必要に応じて外部 LLM が仕様に基づいて実装と補助処理を行う。
- `監査層`: Independent Audit Firm が適正実行、漏れ、境界逸脱、形骸化を監査する。

## script 化の標準流れ

1. 定型業務または反復業務を検知する。
2. `仕様化` を行う。
3. local LLM などで script 草案を作る。
4. 監査観点を付けたうえで限定実行する。
5. 実行結果を監視する。
6. 次の bounded work を自動または半自動で起こす。

## 仕様化で必須の項目

- 目的
- 入力
- 出力
- 例外
- 禁止事項
- 停止条件
- 監査観点
- 対象部署
- 対象 PJ
- 接続する MCP / SaaS

## 実行ループ

- コードや script が上がったら監視対象に入れる。
- 実行後は `単発で終わらせず`、結果を見て次手を起こす。
- 結果が `正常`, `境界注意`, `停止`, `要監査` のどれかに分類されるまではループ継続とする。

## Founder へ戻す条件

- high risk な新規接続
- 鍵、秘密情報、認証情報の実投入
- SaaS 側の不可逆変更
- 既存の監査境界を越える自動化
- 法律 / 定款 / 憲法改定が必要な場合

## 原則

- 既存部署に無理に文脈を溜め込まず、必要なら部門や部署を増設する。
- `一つの接続を全員で見る` のではなく、部署と PJ ごとに必要な接続だけを使う。
- script は常に疑い、監査を同時に走らせる。
