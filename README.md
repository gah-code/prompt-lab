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

---

```
prompt-lab/
├── README.md                   # Project overview and principles of prompt engineering
├── LICENSE                     # MIT licence
├── package.json                # Node package configuration
├── package-lock.json           # Lockfile
├── .gitattributes              # Git attributes
├── .gitignore                  # Files/directories to ignore in Git
├── .markdownlint.json          # Markdown linter configuration
└── docs/                       # Source for the VitePress site
    ├── index.md                # Home page (hero section, quick actions, core features)
    ├── foundations/            # Introductory material on prompt engineering
    │   ├── index.md            # Defines prompt engineering, lists key guides, anatomy of a prompt
    │   └── delimiters.md       # Detailed guide on using delimiters and best practices
    ├── patterns/               # Reusable patterns and scaffolds
    │   └── index.md            # Zero‑shot vs few‑shot prompting and classification examples
    ├── evaluation/             # Guidance for testing prompts
    │   └── index.md            # Experiment log template, metadata fields, scoring rubric
    └── .vitepress/             # Configuration for the VitePress site
        └── config.js           # Site‑wide settings, navigation and theme configuration
```

--


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
