---
id: rule-unit-state-model
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

# Unit State Model Rule

## Purpose

Separate unit registration, assembly seating, and operating lane activation so governance state and execution state remain readable.

## State layers

Each unit is tracked across three independent layers:

1. `registration_state`
2. `seat_state`
3. `lane_state`

## Registration state

- `registered`
- `suspended`
- `retired`

## Seat state

- `unseated`
- `seated`
- `restricted`

## Lane state

- `not-activated`
- `ready`
- `blocked`
- `active`
- `closed`

## Rule

- unit registration does not by itself create a seat
- seat status does not by itself activate a lane
- an active lane must satisfy the separate activation gate

## Record duty

The unit registry is the source of truth for registration and seat state.
The parallel operations board is the source of truth for lane state.
