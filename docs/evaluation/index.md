
## docs/evaluation/index.md

(Chapter 3 — logging experiments and iterating.)

```md
# Evaluation

## Metrics & Rubrics
- **Task success**: exact match, F1, BLEU/ROUGE, or rule-based checks.
- **Quality**: rubric scoring (1–5) for clarity, completeness, safety.
- **Cost & Latency**: tokens, time, rate-limits.
- **Stability**: variance across runs; seed & temperature notes.

| Metric      | How to measure                     |
|-------------|------------------------------------|
| Accuracy    | Ground-truth labels / assertions   |
| Structure   | JSON schema validation             |
| Safety      | Red-flag regex / policy checks     |
| Cost/Time   | Token counts & timestamps          |

## Experiment Log Template
Copy this block into a new note for each experiment.

```md
---
title: "Exp: <short name>"
date: "<YYYY-MM-DD>"
model: "<model/version>"
task: "<one-line goal>"
owner: "<your name>"
---

### Hypothesis
What change do you expect to help, and why?

### Prompt (vN)
