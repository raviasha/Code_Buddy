# Code Buddy for Codex

Code Buddy is a Codex plugin that provides transparent, developer-controlled
prompt-quality, task-scope, estimated-context-pressure, and session-fit checks
for meaningful coding tasks.

This is the public plugin distribution repository. It intentionally contains
only the Codex runtime package; the VS Code extension, tests, and Token Lens
development project are not included.

## Install

In a terminal, add this repository as a Codex marketplace and install the
plugin:

```sh
codex plugin marketplace add raviasha/Code_Buddy --ref main
codex plugin add code-buddy@code-buddy
```

Restart Codex, open **Plugins**, and enable **Code Buddy**. Codex remembers
that choice for new tasks. The first time Code Buddy runs, review and trust the
hook permission requested by Codex.

## What it does

For every meaningful coding request while enabled, Code Buddy reports:

`Code Buddy: prompt quality <status> · task scope <status> · estimated context pressure <status> · session fit <status>`

The plugin never silently changes the prompt, starts a fresh task, or curates
context. It offers choices when an action would help. If local context evidence
is insufficient, the status is **checked — limited evidence**, not an actual
context-use claim.

## Project policy

Optionally add `code-buddy.yaml` to a project root:

```yaml
version: 1
healthCheck:
  showOnEveryMeaningfulCodingTask: true
thresholds:
  promptQuality:
    enhanceBelow: 75
  taskScope:
    decomposeAtOrAbove: 65
  estimatedContextPressure:
    capacityTokens: 40000
    warningAt: 0.70
    criticalAt: 0.85
  sessionFit:
    recommendFreshTaskAtOrAbove: 75
    fallbackLexicalOverlapBelow: 0.20
```

Raise `enhanceBelow` for more prompt-improvement suggestions. Lower the other
thresholds for stricter decomposition, pressure, or fresh-task advice.

## Update

```sh
codex plugin marketplace upgrade code-buddy
codex plugin add code-buddy@code-buddy
```

## Privacy

Code Buddy writes redacted local logs and reports inside the active workspace.
It has no separate telemetry service.
