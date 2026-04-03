---
id: decision-template-normalization-motion
layer: proposal
status: adopted
owner: data-knowledge
unit: company-os
risk: low
visibility: public
motion_type: main-motion
created_at: 2026-04-03
updated_at: 2026-04-03
---

# Decision Template Normalization Motion

## Goal

Normalize short-form ruling templates so decisions stay readable and compact.

## Proposed action

- standardize one short Japanese decision pattern
- apply it first to operating decisions
- keep legal meaning while reducing noise

## Why

- consistency in rulings improves meeting speed
- compressed readable decisions support traceability

## Discussion-1 note

- keep the legal field set unchanged while shortening the visible body
- first target is ordinary sitting and operating rulings only
- accepted artifact set: `decisions/templates/operating-ruling-short-ja.md`
- send to `discussion-2` with migration boundary and fallback rule

## Discussion-2 note

- the short Japanese pattern should apply only to ordinary operating rulings at first
- constitutional, founder-veto, personnel discipline, and high-risk release rulings should stay on the full template
- accepted artifact set: `internal-rules/operating-ruling-short-ja-rule.md`
- deliberation should decide adoption scope and fallback trigger

## Deliberation result

- adopted for ordinary sitting rulings, committee operating rulings, and low-risk officer rulings only
- full ruling template remains mandatory for excluded scope and any compression risk
- supporting artifact: `internal-rules/operating-ruling-short-ja-rule.md`
