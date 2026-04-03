---
id: oem-activation-execution-motion
layer: proposal
status: adopted
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: main-motion
created_at: 2026-04-03
updated_at: 2026-04-03
---

# OEM Activation Execution Motion

## Goal

Execute the first lawful seat and lane activation for `oem` after the activation review path has been accepted.

## Proposed action

- accept the initial `oem` unit-owner seating motion
- accept the bounded `oem` start packet
- name the first `oem` reviewer and approval path
- move `oem` from `seat_state: unseated` to `seated`
- move `lane-oem` from `ready` to `active` within the bounded static-tool scope

## Why

- the preparation bundle and activation review path are now both in place
- the remaining step is execution of the first bounded activation

## Discussion-1 note

- execution should stay bounded to the static OEM estimate tool only
- accepted artifact set: `ledgers/oem-activation-execution-board.md`
- send to `discussion-2` with no broader expansion

## Discussion-2 note

- execution should include seat acceptance, packet acceptance, reviewer naming, approval-path acceptance, and lane-state activation
- `shift` remains the fallback and does not enter execution here
- deliberation should decide whether the bounded activation goes live now

## Deliberation result

- adopted as the first bounded external activation
- `oem` moves to `seat_state: seated` and `lane_state: active`
- supporting artifact: `ledgers/oem-activation-execution-board.md`
