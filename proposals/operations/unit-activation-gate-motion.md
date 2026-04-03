---
id: unit-activation-gate-motion
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

# Unit Activation Gate Motion

## Goal

Create a stricter gate that separates unit registration from activation into live operating lanes.

## Proposed action

- require mission packet presence for `active` lane entry
- require named owner, reviewer, and approval path
- downgrade incomplete lanes to `ready` or `blocked`

## Why

- active status is currently too broad
- lane readiness needs the same clarity as seat readiness
- PMO needs a lawful gate to prevent sloppy activation

## Discussion-1 note

- keep the gate tied to the separate unit-state model
- add explicit check for lawful seat readiness or approved bootstrap exception
- send to `discussion-2` with proposed gate fields
