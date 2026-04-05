---
id: packet-credential-ledger-screening
layer: recruiting
status: active
owner: portfolio-strategy
unit: credential-ledger
risk: high
visibility: role-limited
motion_type: none
created_at: 2026-04-05
updated_at: 2026-04-05
---

# credential-ledger スクリーニングパケット

## current signal

- credential と OTP を扱う high-risk utility
- Next.js, Prisma, PostgreSQL, Auth.js を含む

## required seat

- business owner
- risk owner

## required checks

- key / encryption / auth boundary
- DB と secret の管理境界
- high-risk screening route

## next move

- screening note を作成
- risk owner seat を確保
