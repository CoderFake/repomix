---
name: skill
description: Evaluate candidates against job descriptions using a 3-tier classification system (A/B/C) with explainable match scores. Optionally analyzes GitHub projects for intern/fresher roles via Repomix MCP.
---

## Required Inputs

Collect all of the following before starting. If any field is missing, ask the user for it:

- **[Position]** — Job title (e.g. Marketing Manager, Backend Engineer)
- **[Core skills & key tasks]** — 5–7 core skills and primary responsibilities
- **[Culture]** — Organization culture (e.g. fast-paced, ownership-driven, remote-first)
- **[Constraints]** — Hard requirements: language, working hours, max salary, etc.
- **[Candidates]** — CV text or profiles of one or more candidates (paste or upload)

## Role Detection

After receiving the position, check if it is an **intern or fresher** role.

If yes, ask:
> "Would you like me to analyze the candidate's notable GitHub projects to compare technical capabilities?"

- If the user says **yes** → enable GitHub project analysis via Repomix MCP (see Appendix)
- If the user says **no** or the role is not intern/fresher → skip Repomix entirely

## Classification System

Classify each candidate into one of three groups:

| Group | Criteria |
|---|---|
| **A — Shortlist** | Meets >90% of core skills, has evidence of real achievements, strong culture fit |
| **B — Potential** | Meets foundational skills, missing 1–2 advanced skills, demonstrates high learning agility |
| **C — Reject** | Does not meet mandatory requirements or lacks hands-on experience in key tasks |

## Scoring Rules

Assign each candidate an **Explainable Match Score (1–10)**. The score must be justified with explicit reasoning — never assign a score without explanation.

Score components:
- Core skill coverage (40%)
- Evidence of real impact / measurable achievements (30%)
- Culture and working style fit (20%)
- Learning agility signals (10%)

**Bias elimination**: Ignore gender, age, university name (unless degree is a hard requirement), and geographic region. Focus 100% on execution capability and team compatibility.

## Output Format

Present results as a comparison table:

| Rank | Candidate | Score (1–10) | Group | Key Strengths | Potential Risks | Suggested Deep Interview Questions |
|---|---|---|---|---|---|---|

Below the table, add a brief **Why this score** paragraph for each candidate explaining the reasoning.

## Appendix — GitHub Project Analysis (intern/fresher only)

Only run this section if the user explicitly requested it.

### Step 1 — Pack the repository
Call `pack_remote_repository` with:
- `includePatterns`: `**/*.md,**/package.json,**/requirements*.txt,**/pyproject.toml,**/Cargo.toml,**/go.mod,**/pom.xml,**/Dockerfile,**/*.yml`
- `compress`: true

Save the returned `outputId`.

### Step 2 — Extract tech signals
Call `grep_repomix_output` using patterns from `references/grep-patterns.md`.
Set `contextLines: 2`.

### Step 3 — Summarize project tech stack
Categorize findings: Languages, Frameworks, Databases, Infrastructure.
Use taxonomy from `references/tech-taxonomy.md`.

### Step 4 — Add to candidate profile
Append a **GitHub Projects** row to the candidate's comparison entry with detected stack and complexity signals.

### Token limits
- Max 200 lines per `read_repomix_output` call
- Max 800 lines total across all calls