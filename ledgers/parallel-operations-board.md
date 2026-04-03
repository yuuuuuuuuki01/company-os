---
id: ledger-parallel-operations-board
layer: registry
status: active
owner: project-management-office
unit: company-os
risk: medium
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Parallel Operations Board

| Lane ID | Unit | Route | Status | Current Work | Next Handoff | Paper Load | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| lane-company-os | company-os | governance-loop | active | ordinary sitting loop, rollout watch, and first external lane monitoring | founder-office -> assembly-secretariat | 6 | primary live lane |
| lane-oem | oem | first-external-lane | active | bounded static OEM tool operation under accepted packet | oem-unit-owner -> reviewer | 4 | first external lane active and under watch |
| lane-shift | shift | second-external-preparation | ready | bounded activation-review path is authorized; waiting for a later execution motion | project-management-office -> people-talent | 3 | ready but not active while `oem` remains the first lane |
| lane-jouzou | jouzou | onboarding-ready | ready | waiting for first mission packet | people-talent -> PMO | 2 | ready to onboard |

Operating note: lane state is independent from unit registration and seat state. A lane may run in parallel only when owner, handoff target, and approval path are all declared.
