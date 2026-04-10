---
id: sop-mcp-orchestration-loop
layer: sop
status: active
owner: internal-tools-enablement
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-10
updated_at: 2026-04-10
---

# MCPオーケストレーションループ

## 手順

1. 対象の部署または PJ を決める。
2. 必要な MCP / SaaS 接続を台帳から確認する。
3. 反復業務または定型業務を検知したら `script 候補` に登録する。
4. 仕様化を行う。
5. local LLM または CLI 補助で script 草案を作る。
6. 監査 sample を付けて限定実行する。
7. 結果を `正常`, `境界注意`, `停止`, `要監査` に分類する。
8. 次手を自動で起こせるなら起こし、無理なら次の議題または review opening を起票する。

## 出力

- 接続対象
- script 候補
- 実装仕様
- 監査 sample
- 実行結果
- 次手

## 停止条件

- high risk の新規開始
- 鍵や秘密情報の実投入
- SaaS 側の不可逆変更
- 既存監査境界を超える自動化
