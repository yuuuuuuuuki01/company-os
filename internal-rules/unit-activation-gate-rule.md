---
id: rule-unit-activation-gate
layer: internal-rule
status: active
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Unit Activation Gate Rule

## Purpose

Define the minimum gate that a unit must pass before entering an active operating lane.

## Gate requirements

An `active` lane requires:

- `registration_state: registered`
- `seat_state: seated` or a documented bootstrap exception
- a mission packet
- a named owner
- a named reviewer
- a named approval path for risky work

## Failure rule

If any required gate element is missing, the lane must be `ready` or `blocked`, never `active`.

## Record duty

PMO records the gate result in the parallel operations board.
