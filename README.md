# Prompt Lab

> Notes & experiments in prompt engineering — from basics → patterns → evaluation.

Prompt Lab is a lightweight VitePress site for documenting **prompt engineering** with clarity and speed. It emphasizes **minimal setup**, **systemic thinking** (inputs, constraints, roles, evaluation), and **tight feedback loops**: hypothesize → test → measure → refine → repeat.

This repo focuses on:

- **Foundations** – concise primers to establish shared language and mental models.
- **Patterns** – reusable scaffolds for tasks, constraints, roles, critique loops, and more.
- **Evaluation** – experiment logs, checklists, and lightweight rubrics so changes are measurable.

## Site Structure

- **Home** – orientation, quick actions, and project principles.
- **Foundations** – `/foundations/` (start here to align terminology and goals).
- **Evaluation** – experiment log template at `/evaluation/#experiment-log-template`.
- **Patterns** – modular blueprints (kept brief and testable).

## Principles

- **Minimal Setup:** Only what you need to think clearly and iterate quickly.
- **Prompt as a System:** Treat prompts as configurable systems, not magic words.
- **Tight Feedback Loops:** Small experiments, fast iterations, honest measurements.

## Getting Started

```bash
# install deps
pnpm install

# dev server
pnpm docs:dev

# build static site
pnpm docs:build
