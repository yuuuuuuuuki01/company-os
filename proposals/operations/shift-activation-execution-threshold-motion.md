---
id: shift-activation-execution-threshold-motion
layer: proposal
status: motion-open
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: main-motion
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Shift Activation Execution Threshold Motion

## Goal

Define the minimum threshold that must be met before any later bounded execution motion may move `shift` beyond `ready`.

## Proposed action

- require the `oem` first-lane watch to remain free of critical exception
- require the bounded `shift` seat route, packet, reviewer route, and approval path to remain current
- require PMO and Security, Risk, and Compliance to confirm that a second active lane can be watched without overloading the control path

## Why

- an activation-review path alone should not trigger execution
- second-lane sequencing should stay bounded and auditable

## Discussion-1 note

- this motion should define readiness thresholds only and should not activate `shift`
- accepted artifact set: `ledgers/oem-first-lane-watch-board.md` and `ledgers/shift-activation-review-checklist.md`
- discussion should stay limited to the minimum lawful execution threshold
