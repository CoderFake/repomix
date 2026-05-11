# Matching Rubric

Rules for scoring detected tech stack against CV or job description requirements.

---

## Verdict Scale

| Verdict | Meaning |
|---|---|
| ✅ Match | Technology found in repo with High or Medium confidence |
| ⚠️ Partial | Technology found but only Low confidence, or adjacent tech detected |
| ❌ Missing | Technology required but not detected in repo |
| ➕ Bonus | Technology found in repo but not required — adds value |

---

## Confidence Levels (from tech-taxonomy.md)

| Level | Source |
|---|---|
| **High** | Found in dependency file (package.json, requirements.txt, go.mod, pom.xml, Cargo.toml) |
| **Medium** | Found in import statements or config files |
| **Low** | Mentioned only in README or comments |

---

## Scoring Rules

### Per-category scoring

For each requirement category (Languages, Frameworks, Databases, Infrastructure):

1. Extract all required items from the CV/JD
2. Check each against detected tech stack
3. Assign verdict based on confidence level:
   - High/Medium confidence → ✅
   - Low confidence → ⚠️
   - Not detected → ❌

### Overall match score

Count verdicts across all categories:

```
score = (✅ × 2 + ⚠️ × 1) / (total_required × 2) × 100
```

| Score | Label |
|---|---|
| ≥ 80% | Strong Match |
| 50–79% | Partial Match |
| < 50% | Weak Match |

---

## Category Weights

| Category | Weight |
|---|---|
| Languages | 1× |
| Frameworks | 2× (core skill signal) |
| Databases | 1.5× |
| Infrastructure | 1× |
| Architecture Patterns | 1× |

Apply weights when computing the overall score for weighted mode.

---

## Matching Hints

- Language version matters: Python 3.10+ vs 3.x are different signals
- Framework variants count: Next.js covers React; NestJS does NOT cover Express
- If JD says "SQL" and repo has PostgreSQL → ✅
- If JD says "NoSQL" and repo has MongoDB → ✅
- If JD says "cloud" and repo has Docker only → ⚠️
- Test framework presence is a ➕ bonus unless explicitly required
