# Foundations

Prompt engineering is design under constraints. We shape *inputs* to shape *behavior*, then we test.

## Anatomy of a Prompt

- **Goal**: What must be true at the end? (e.g., “extract entities into JSON”)
- **Role**: Frame expertise & scope (e.g., “You are a meticulous data analyst…”).
- **Input**: Concrete data, examples, or documents.
- **Constraints**: Format, tone, word limits, schema.
- **Evaluation Hook**: How we’ll check success (rubric, tests, judge models).

```txt
System: You are a careful fact-checking assistant.
User: Extract PERSON, ORG, DATE from the text. Output valid JSON array.
Text: "<paste>"
Constraints: - No hallucinations; omit unsure fields. - Use ISO dates.
