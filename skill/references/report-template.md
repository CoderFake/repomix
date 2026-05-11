# Report Template

Use this template to render the final analysis report.

---

## Template

```
## Repository Analysis: {repo}

**Overall: {score_label} ({score}%)**

---

### Tech Stack Detected

| Category | Technologies |
|---|---|
| Languages | {languages} |
| Frameworks | {frameworks} |
| Databases | {databases} |
| Infrastructure | {infrastructure} |
| Architecture | {architecture} |

---

### Match Results

| Requirement | Found | Confidence | Verdict |
|---|---|---|---|
| {req_1} | {found_1} | {confidence_1} | {verdict_1} |
| ... | ... | ... | ... |

---

### Bonus Technologies

Technologies in the repo not explicitly required:
- {bonus_1}
- {bonus_2}

---

### Summary

**{score_label}** — {1-2 sentence summary of fit}

**Gaps:** {list ❌ items and what they mean for the role}

**Strengths:** {list ✅ items that are strong signals}
```

---

## Filling Rules

- `{repo}` — full GitHub URL or `user/repo`
- `{score_label}` — one of: `Strong Match`, `Partial Match`, `Weak Match`
- `{score}` — integer 0–100 computed per matching-rubric.md
- Technologies in each category: comma-separated, sorted by confidence (High → Low)
- If a category has no detected tech, write `—`
- Verdict column: use emoji only — ✅ / ⚠️ / ❌ / ➕
- Keep Summary section under 4 sentences total
- If CV/JD was not provided, omit Match Results and Summary sections, render only Tech Stack Detected
