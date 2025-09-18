# Evaluation

Use this page to **log experiments**, compare prompt variants, and record decisions. Keep entries small, clear, and replicable.

## How to run an experiment

1. Copy the template below into a new note (or a subpage).
2. Fill in the metadata and the **baseline prompt**.
3. Add 2–3 **controlled variants** (change only one thing per variant).
4. Score with the rubric, decide the winner, and write next steps.

---

## Experiment Log Template

> Copy from here ↓ into a new note under `Experiments/` or keep logs inline on this page.

### Experiment: `<short name>`

**ID:** `EXP-YYYYMMDD-###`  
**Date:** `YYYY-MM-DD`  
**Owner:** `@you`  
**Goal:** One sentence on the behavioral change you want.

### Task & Context

- **Task:** (what the model should do)
- **Inputs:** (data, constraints, style)
- **Success Criteria:** (observable and testable)

### Environment

- **Model:** (e.g., GPT-x, Claude-x)  
- **Temperature / Top-p:**  
- **Max tokens:**  
- **Tools / Retrieval:** (if any)  
- **Seed / Determinism:** (if supported)

### Baseline Prompt

```text

<your current best prompt>
```

### Variants (change one thing at a time)

#### V1 — `<what changed>`

```
<prompt text>
```

#### V2 — `<what changed>`

```
<prompt text>
```

#### (Optional) V3 — `<what changed>`

```
<prompt text>
```

### Test Set

- **Inputs (3–10):** Show representative examples.
- **Ground Truth / Expected Behavior:** Briefly describe.

### Results (per input)

| Input | Baseline | V1 | V2 | Notes |
| ----: | -------- | -- | -- | ----- |
|     1 |          |    |    |       |
|     2 |          |    |    |       |
|     3 |          |    |    |       |
|     … |          |    |    |       |

### Scoring Rubric (1–5)

- **Task Fit:** Did it do the thing asked?
- **Faithfulness:** Stayed true to provided context?
- **Specificity:** Concrete, non-vague answers?
- **Format/Style:** Matches requested structure?
- **Stability:** Similar outputs across runs/inputs?

> **Scale:** 1 = Poor · 2 = Weak · 3 = Acceptable · 4 = Good · 5 = Excellent

#### Aggregate Scores

| Metric       | Baseline | V1 | V2 |
| ------------ | -------- | -- | -- |
| Task Fit     |          |    |    |
| Faithfulness |          |    |    |
| Specificity  |          |    |    |
| Format/Style |          |    |    |
| Stability    |          |    |    |
| **Average**  |          |    |    |

### Cost & Latency (optional)

- **Avg tokens / request:**
- **Avg latency:**
- **Notes:** (timeouts, rate limits, etc.)

### Decision

- **Winner:** Baseline / V1 / V2
- **Why:** Key evidence in one paragraph.

### Next Actions

- [ ] Promote winner to **current best** prompt
- [ ] Add to **Patterns** with a short write-up
- [ ] Schedule follow-up test with harder inputs

```

