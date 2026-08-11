# Code Buddy

Code Buddy is a VS Code extension that combines deterministic local governance with structured AI evaluation for GitHub Copilot coding-agent sessions.

It keeps observable facts separate from semantic judgment: hooks record session activity, worktree changes, failures, and Estimated Context Pressure, while four structured tools provide prompt review, task decomposition, context measurement, and task-specific context curation.

## Download

Download the latest release from the [Code Buddy v0.8.1 release page](https://github.com/raviasha/Code_Buddy/releases/tag/v0.8.1):

- `code-buddy-0.8.1.vsix` — VS Code extension installer.
- `code-buddy-0.8.1-SHA256SUMS.txt` — integrity checksum.

## Requirements

- VS Code.
- GitHub Copilot with a supported coding-agent hook surface.
- Python 3 available as `python3` or `python`.

## Install and use

1. Download both v0.8.1 files from the release page.
2. In VS Code, open **Extensions → Install from VSIX**.
3. Select `code-buddy-0.8.1.vsix`.
4. Open the workspace where Code Buddy will be used.
5. Run **Code Buddy: Install Copilot Hooks** once in that workspace.
6. Use GitHub Copilot normally.

The extension is installed once in VS Code. Run **Code Buddy: Install Copilot Hooks** once for every workspace where you want Code Buddy active. The command safely adds a marked Code Buddy section to `.github/copilot-instructions.md`, preserves existing workspace instructions, and removes the older managed `.github/instructions/code-buddy.instructions.md` file during migration.

## How Code Buddy operates

Code Buddy now applies a visible, deterministic preflight lifecycle to every meaningful coding request:

1. `UserPromptSubmit` starts prompt-specific preflight state and records `preflight.started`.
2. Managed Copilot instructions ask the agent to load `code-buddy_reviewPrompt` and `code-buddy_decomposeTask`. Read, search, and other observational tools remain available.
3. Before the first edit, file creation, terminal command, or other implementation action, the hook checks completion markers written by those semantic tools.
4. If either evaluation is missing, Code Buddy denies that implementation action once and directs the agent to invoke the missing tools.
5. Both evaluations preserve an explicit option to continue with the original request. Invalid or unavailable AI output is logged and safely falls back to the original request.
6. Once both evaluations finish, Code Buddy records `preflight.completed` and implementation continues normally. If evaluation remains unavailable, the next implementation attempt offers an explicit controlled fallback instead of permanently blocking work.
7. At turn completion, deterministic analysis updates worktree metrics, context estimates, analytics, and next-prompt feedback.

Code Buddy never silently replaces the developer's prompt. The generated `Code Buddy.md` and `Code Buddy Analytics.md` files are reports, not instruction files; the active agent instruction is the managed section in `.github/copilot-instructions.md`.

## Verify that the tools ran

VS Code's **Chat Debug** view may show Code Buddy's internal model requests as `copilotLanguageModelWrapper`. The exact tool names and governance decisions are recorded locally:

| Evidence | Where to look |
| --- | --- |
| `code-buddy_reviewPrompt` and `code-buddy_decomposeTask` calls | `.code-buddy/copilot-session.jsonl` records named `tool.started` and `tool.completed` |
| Semantic calls came from the coding agent | `.code-buddy/interventions.jsonl` entries with `invocationSource: "language_model_tool"` |
| An early implementation action was stopped | `preflight.gate_denied` |
| Both required evaluations finished | `preflight.completed` |
| Invalid model output retained the original request | `tool.failed` with a safe-fallback continuation |

Use **Code Buddy: Open Session Log** and **Code Buddy: Open Intervention Log** from the Command Palette to inspect these records.

## Workspace outputs

Code Buddy creates or updates these files in the active workspace:

- `Code Buddy.md` — concise recommendation for improving the next prompt.
- `Code Buddy Analytics.md` — detailed session and worktree analytics.
- `.code-buddy/copilot-session.jsonl` — structured local session records.
- `.code-buddy/interventions.jsonl` — semantic evaluations, governance decisions, user choices, context warnings, curation metadata, and safe-fallback events.
- `.github/copilot-instructions.md` — workspace-wide instructions with a safely managed Code Buddy section.

Use **Code Buddy: Open Feedback**, **Code Buddy: Open Analytics**, **Code Buddy: Open Session Log**, or **Code Buddy: Open Intervention Log** to view them.

## What it measures

- Prompt quality across goal, scope, context, constraints, acceptance criteria, and validation.
- Semantic task complexity and dynamic decomposition strategies.
- Files and lines changed between prompt start and turn completion.
- Tool activity, failures, observed textual context volume, and session activity.
- Per-turn Estimated Context Pressure and repeated prior-context estimates.

Context values labeled **Estimated Context Pressure** are deterministic estimates from captured events, not actual active-context utilization or billing data. High pressure can offer three choices: start fresh with curated context, curate the current task, or continue unchanged.

Worktree tracking reports net added, modified, and deleted files that exist on disk between the first prompt snapshot and the completed turn. A file created and deleted within the same turn cannot be reported as a lasting worktree delta.

## Privacy and limitations

Records remain local to the workspace, with sensitive-looking values redacted by default. Worktree changes are observed before and after a turn and may include edits made outside Copilot during that interval.

The public VS Code extension API does not expose unrestricted Copilot conversation access, exact active-context utilization, hidden system prompts, or model-internal reasoning. Code Buddy uses supported hooks, structured language-model tools, capability-aware providers, and explicitly labeled deterministic estimates.

## Pilot feedback

Please share feedback through the repository issues or with the pilot organizer. Useful feedback includes which signals are helpful, which recommendations are distracting, and what additional analytics would improve coding efficiency or quality.
