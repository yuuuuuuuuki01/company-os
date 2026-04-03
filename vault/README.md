---
id: vault-readme
layer: charter
status: active
owner: security-risk-compliance
unit: company-os
risk: high
visibility: role-restricted
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Vault

Raw secrets and keys should be stored locally under `vault/keys/` and must not be committed.

## Rule

- store the raw key locally
- assign a `Key ID`
- record lending and return in `ledgers/key-loan-ledger.md`
- do not place the raw secret in public records
