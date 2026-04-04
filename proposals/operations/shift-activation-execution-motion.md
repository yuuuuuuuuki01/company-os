---
id: shift-activation-execution-motion
layer: proposal
status: adopted
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: main-motion
created_at: 2026-04-04
updated_at: 2026-04-04
---

# Shift Activation Execution Motion

## Goal

Execute the first lawful seat and lane activation for `shift` after the execution bundle has been accepted.

## Proposed action

- accept the initial `shift` unit-owner seating motion
- accept the bounded `shift` start packet
- name the first `shift` reviewer and approval path
- record the bounded rollback note
- move `shift` from `seat_state: unseated` to `seated`
- move `lane-shift` from `ready` to `active` within the bounded planning and scheduling scope

## Why

- the preparation bundle, activation review path, execution threshold, and execution bundle are now all in place
- the remaining step is execution of the first bounded second-lane activation

## Discussion-1 note

- execution should stay bounded to the MVP planning and scheduling flow only
- accepted artifact set: `ledgers/shift-activation-execution-board.md`
- send to `discussion-2` with no broader expansion

## Discussion-2 note

- execution should include seat acceptance, packet acceptance, reviewer naming, approval-path acceptance, rollback-note recording, and lane-state activation
- `oem` remains the first lane and continues under watch
- deliberation should decide whether the bounded second-lane activation goes live now

## Deliberation result

- adopted as the first bounded second external activation
- `shift` moves to `seat_state: seated` and `lane_state: active`
- supporting artifact: `ledgers/shift-activation-execution-board.md`
