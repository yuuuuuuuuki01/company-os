---
id: unit-state-separation-motion
layer: proposal
status: superseded
owner: organizational-development-learning
unit: company-os
risk: medium
visibility: public
motion_type: main-motion
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Unit State Separation Motion

## Goal

Separate `registered unit` from `active operating lane` so seat status, mission-packet readiness, and execution status stop collapsing into one field.

## Why now

- current registry marks many units as active before lawful activation
- parallel-operation rules already require clearer gating
- assembly readability is weaker than it should be

## Proposed route

1. ODL and PMO draft the state model
2. Constitutional Review Committee checks rule fit
3. Data and Knowledge updates registries after approval

## Definition of done

- registry states and lane states are distinct
- active units are visibly narrower than registered units
- seat readiness and execution readiness are no longer conflated

## Report note

- the state split is now visible in `units/registry.md` and `parallel-operations-board.md`
- further changes should use the normal amendment path instead of keeping this bootstrap motion open
