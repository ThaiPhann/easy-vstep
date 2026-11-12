# Agent Skills (OpenCode)

This project uses skills installed under `.opencode/skills/` (or a compatible path).

## Core Rules

- If a task matches a skill, invoke it with the `skill` tool before acting.
- Skills are located in `.agents/skills/<skill-name>/SKILL.md`.
- Follow the skill workflow strictly; do not partially apply it.
- Never skip required steps such as spec, plan, or test when a skill demands them.

## Intent → Skill Mapping

Map the user's intent to the matching skill automatically:

- Feature / new functionality → `spec-driven-development`, then `incremental-implementation` and `test-driven-development`
- Planning / breakdown → `planning-and-task-breakdown`
- Bug / failure / unexpected behavior → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- Refactoring / simplification → `code-simplification`
- API or interface design → `api-and-interface-design`
- Building or refactoring UI code → `frontend-ui-engineering`
- Designing, reviewing, polishing, or auditing a UI surface → `impeccable`
- Looking up a palette, font pairing, UX rule, or stack pattern → `ui-ux-pro-max`

## Execution Model

For every request:

1. Determine if any skill applies (even a small chance).
2. Load the skill with `skill({ name: "<skill-name>" })`.
3. Follow the skill workflow exactly.
4. Only proceed to implementation once required steps are complete.

## Combining `impeccable` and `ui-ux-pro-max`

Two different jobs; do not swap them.

- **`impeccable` owns process and quality**: product truth (`PRODUCT.md`), visual world (`DESIGN.md`), surface mode, craft floor, detector, critique/audit/polish.
- **`ui-ux-pro-max` owns reference lookup**: palettes, typography, styles, UX rules, stack guidance. It is a searchable library, not a workflow.

Run them in this order for any UI task:

1. **Context — `impeccable`.** Load its command reference for the task. It resolves `PRODUCT.md`, `DESIGN.md`, surface brief, and mode. Run `impeccable context` once per session; if `PRODUCT.md` is missing for new-surface work, run `init` first.
2. **Research — `ui-ux-pro-max`.** Query only the gap context did not answer. One dominant intent, 2–5 terms:
   `python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux|color|typography|style|chart|icons>`
   or `--stack react` for implementation patterns.
3. **Build.** Read `impeccable`'s craft floor, then implement the resolved direction.
4. **Verify.** Run `impeccable`'s detector plus the command's checks (`audit`, `polish`). For app screens, `ui-ux-pro-max`'s `references/pro-rules.md` checklist is the second pass.

Precedence and guardrails:

- `PRODUCT.md` and `DESIGN.md` win. When `ui-ux-pro-max` conflicts with them, reject it or surface it as a proposal; never apply it silently.
- Do **not** run `--design-system --persist` in this project: it writes `design-system/<slug>/MASTER.md`, a second design authority beside `DESIGN.md`. Use targeted `--domain` / `--stack` queries. If a master is ever wanted, get user approval and fold the result into `DESIGN.md`.
- The incumbent interface is the authority for refinement. `ui-ux-pro-max` extends or verifies it; replacing it is `impeccable`'s redesign flow.
- Retry a query once with a narrower phrase. If it still returns nothing, label the guidance as fallback, never as a database match.
- Cite nothing from `ui-ux-pro-max` that you did not actually retrieve; its output is a recommendation, not a rule.