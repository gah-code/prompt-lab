# Patterns

## Zero/Few-Shot

- **Zero-shot**: crisp instructions + schema. Good for simple, unambiguous tasks.
- **Few-shot**: add 2–5 canonical examples. Bake edge cases right into the prompt.

```txt
Task: Classify support tickets: ["billing", "technical", "account"].
Examples:
- "Refund request for last month" → billing
- "Password reset link broken" → account
Rules:
- Output one label only.
- If uncertain, output "account".
Input: "<ticket>"
