# Using Delimiters in Prompt Engineering

Delimiters are explicit markers that separate instructions, context, examples, and constraints inside a prompt. They remove ambiguity about where one section ends and another begins, which leads to more predictable completions, protects against prompt injection, and keeps complex workflows organized.

## Why Delimiters Matter

- **Clarify intent.** Clearly bounded instructions prevent the model from blending your directions with user-provided text.
- **Preserve security.** Treating user content as data—rather than executable instructions—helps neutralize injection attempts.
- **Standardize outputs.** Reusable delimiter patterns make it easier to request structured formats such as JSON, tables, or code blocks.

## Common Delimiter Types and Markers

### Quotes and Triple Quotes
Use `"..."` or `"""..."""` to isolate literal strings or user-provided snippets so the model processes them as data.

```text
Summarize the feature request below in one sentence.
Feature Request:
"""
Our app needs a "Dark Mode" option. Users have asked for a toggle to switch to a
dark theme for better nighttime usability.
"""
```

### Backticks for Code Blocks
Triple backticks (` ``` `) indicate pre-formatted content and support language hints for syntax highlighting.

```text
Write a Python function to sort a list in descending order.
Return the answer in a Python code block, for example:
\`\`\`python
# Function implementation here
\`\`\`
```

### XML/HTML-Like Tags
Custom tags add semantic labels so each section communicates its role.

```text
Summarize the text inside the <request> tags.
<request>
Our app needs a "Dark Mode" option. Users have asked for a toggle to switch to a dark theme.
</request>
```

### Special Tokens or Visual Markers
Headings (`###`), horizontal rules (`---`), or custom tokens (`[START]...[END]`) mark clear transitions between sections or tasks.

```text
### Issue Description
A user reports the application crashes on launch.
### Task 1: Summary
Provide a one-sentence summary of the issue.
### Task 2: Possible Causes
List two potential reasons for the crash.
```

## Core Scenarios for Documentation and Product Development

### 1. Separate User Input from Instructions
Wrap user-generated specs, bug reports, or stories in unique delimiters so the model treats them strictly as reference material.

```text
Summarize the feature request below.
Feature Request:
"""
Our app needs a "Dark Mode" option. Users have asked for a toggle to switch to a dark theme.
"""
```

### 2. Request Structured Output
Show the model the format you expect by including templates between delimiters.

#### JSON
```text
Task: Provide the feature details in JSON format.
Feature Name: Dark Mode
Feature Status: In Development
Output JSON format:
\`\`\`json
{
  "feature": "<Feature Name>",
  "status": "<Status>"
}
\`\`\`
```

#### Markdown Table
```text
List the features in a table:
| Feature        | Description                           |
| -------------- | ------------------------------------- |
```

The vertical bars (`|`) and separator row guide the model to continue the pattern with well-formed rows.

### 3. Split Multi-Step Tasks
Use headings, numbered lists, or horizontal rules to divide multi-part instructions.

```text
Review the following user story and do the following:
1. Highlight key requirements.
2. Suggest one improvement.
-----
User Story:
As a user, I want to save my progress offline so that I can continue using the app without internet access.
```

### 4. Control Editing and Placeholders
Mark editable text, protected variables, or log excerpts with symmetric tags to control what the model changes.

```text
Improve the clarity of the text inside the <draft> tags without changing its technical meaning.
<draft>
The system provides multiple config options, enabling users to customize their experience. However, some settings might conflict if enabled simultaneously.
</draft>
```

```text
Translate the message to Spanish, but do not change the placeholders in curly braces.
"Hello, {username}, welcome to {platform}! Your session ID is {session_id}."
```

```text
Analyze the error log below and draft a short bug report.
[LOG]
Error: NullPointerException at com.example.service(Foo.java:42)
[/LOG]
[USER_REPORT]
Whenever I click the "Save" button, the app crashes without any message.
[/USER_REPORT]
```

## Best Practices

- **Choose unambiguous markers.** Select delimiters that will not appear inside the enclosed text, or escape them when necessary.
- **Stay consistent.** Pair opening and closing markers and avoid mixing delimiter styles for the same purpose.
- **Label sections.** Titles such as `User Input`, `Constraints`, or `Logs` add helpful context for each block.
- **Reuse familiar schemas.** Prefer well-known formats—JSON, XML, Markdown tables—so the model leans on established patterns.
- **Avoid over-nesting.** Use the minimum number of delimiter layers required to keep the prompt readable for both humans and models.

## References

1. [Delimiters in Prompt Engineering — Portkey](https://portkey.ai/blog/delimiters-in-prompt-engineering/)
2. [Delimiters — Benny Prompt](https://www.bennyprompt.com/posts/delimiters-in-prompt-engineering/)
3. [An Entire Post About Delimiters in AI Prompts — Jon Bishop](https://jonbishop.com/an-entire-post-about-delimiters-in-ai-prompts/)
4. [ChatGPT Prompt Engineering — Dagmar Timler](https://www.dagmartimler.com/chatgpt-prompt-engineering/)
