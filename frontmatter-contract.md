---
id: company-os-frontmatter-contract
layer: charter
status: active
owner: founder-office
unit: company-os
risk: low
visibility: public
motion_type: none
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Frontmatter Contract

Every formal Company OS document uses YAML frontmatter with the following required keys:

- `id`
- `layer`
- `status`
- `owner`
- `unit`
- `risk`
- `visibility`
- `motion_type`
- `created_at`
- `updated_at`

## Shared value guidance

- `layer`: `constitution`, `law`, `article`, `internal-rule`, `sop`, `role-charter`, `committee-charter`, `template`, `registry`, `memory`, or `charter`
- `status`: `draft`, `active`, `ratified`, `template`, `bootstrap`, `archived`, or `superseded`
- `owner`: office or body accountable for maintenance
- `unit`: `company-os` or a registered unit slug
- `risk`: `low`, `medium`, or `high`
- `visibility`: `public`, `role-restricted`, or `confidential`
- `motion_type`: use `none` for non-motion records

## File contract notes

- Formal rulings must also include: `ruling`, `reason`, `minority_view`, `rehearing_condition`, `executor`, `founder_veto_used`
- Hiring ballots must include: `role`, `allowed_context`, `disallowed_context`, `evaluation_points`, `handoff_format`
- Start packets must include: `goal`, `success_criteria`, `constraints`, `allowed_documents`, `disallowed_context`, `role`, `definition_of_done`
