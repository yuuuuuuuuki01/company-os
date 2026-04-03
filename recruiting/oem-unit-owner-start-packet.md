---
id: recruiting-oem-unit-owner-start-packet
layer: template
status: draft
owner: personnel-committee
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
goal: "Prepare `oem` for a lawful activation review without activating it yet."
success_criteria:
  - "a lawful `oem` seat route is ready"
  - "the first mission packet is accepted as bounded and readable"
  - "a reviewer and approval path are named"
  - "`oem` remains `ready` until a later activation review"
constraints:
  - "no direct activation in this packet"
  - "no secret publication"
  - "keep scope to the static OEM estimate tool only"
allowed_documents:
  - "units/registry.md"
  - "ledgers/parallel-operations-board.md"
  - "internal-rules/unit-activation-gate-rule.md"
  - "sops/run-unit-activation-review.md"
  - "C:/agent/codex/oem/README.md"
disallowed_context:
  - "unrelated unit logs"
  - "secret credentials"
  - "historical chat logs outside company-os records"
role: "oem unit-owner candidate"
definition_of_done: "Return a short handoff with seat route, packet check, reviewer, approval path, and any blocker."
---

# OEM Unit Owner Start Packet

## Goal

Prepare `oem` for a lawful activation review without activating it yet.

## Success Criteria

- a lawful `oem` seat route is ready
- the first mission packet is accepted as bounded and readable
- a reviewer and approval path are named
- `oem` remains `ready` until a later activation review

## Constraints

- no direct activation in this packet
- no secret publication
- keep scope to the static OEM estimate tool only

## Allowed Documents

- `units/registry.md`
- `ledgers/parallel-operations-board.md`
- `internal-rules/unit-activation-gate-rule.md`
- `sops/run-unit-activation-review.md`
- `C:/agent/codex/oem/README.md`

## Disallowed Context

- unrelated unit logs
- secret credentials
- historical chat logs outside company-os records

## Role

`oem` unit-owner candidate

## Definition of Done

Return a short handoff with seat route, packet check, reviewer, approval path, and any blocker.
