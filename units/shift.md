---
id: unit-shift
layer: registry
status: active
owner: portfolio-strategy
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Unit: shift

## Purpose

Handle the workforce-planning and shift-optimization MVP as the second bounded external onboarding candidate under Company OS control.

## State model

- registration_state: registered
- seat_state: unseated
- lane_state: ready
- voting officer: pending

## Immediate operating scope

- bounded activation-review path is authorized while the lane remains `ready`
- a separate execution threshold is adopted, but no seat execution or lane activation is authorized yet
- the first mission packet is limited to the MVP planning and scheduling flow
- any later seat execution or lane activation needs a separate motion

## Boundary

- no direct activation by this record
- no expansion beyond the MVP planning scope without a later motion
