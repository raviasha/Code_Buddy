# Code Buddy

Code Buddy is a VS Code extension that provides local, deterministic feedback for GitHub Copilot coding-agent sessions.

## Download

Download the latest pilot release from the [Code Buddy releases page](https://github.com/raviasha/Code_Buddy/releases/tag/v0.6.3):

- `code-buddy-0.6.3.vsix` — VS Code extension installer.
- `code-buddy-SHA256SUMS.txt` — integrity checksum.

## Requirements

- VS Code.
- GitHub Copilot with a supported coding-agent hook surface.
- Python 3 available as `python3` or `python`.

## Install and use

1. In VS Code, open **Extensions → Install from VSIX**.
2. Select `code-buddy-0.6.3.vsix`.
3. Open the workspace where Code Buddy will be used.
4. Run **Code Buddy: Install Copilot Hooks** once in that workspace.
5. Use GitHub Copilot normally and complete a prompt/turn.

The extension is installed once in VS Code. When switching to another workspace, do not reinstall it; run **Code Buddy: Install Copilot Hooks** once in the new workspace.

## Workspace outputs

Code Buddy creates or updates these files in the active workspace:

- `Code Buddy.md` — concise recommendation for improving the next prompt.
- `Code Buddy Analytics.md` — detailed session and worktree analytics.
- `.code-buddy/copilot-session.jsonl` — structured local session records.

Use **Code Buddy: Open Feedback**, **Code Buddy: Open Analytics**, or **Code Buddy: Open Session Log** to view them.

## What it measures

- Prompt quality across goal, scope, context, constraints, acceptance criteria, and validation.
- Deterministic task decomposition and task-size indicators.
- Files and lines changed between prompt start and turn completion.
- Tool activity, failures, observed textual context volume, and session activity.

## Privacy and limitations

Records remain local to the workspace, with sensitive-looking values redacted by default. Worktree changes are observed before and after a turn and may include edits made outside Copilot during that interval. Exact model token usage, hidden system prompts, and model-internal reasoning are not exposed by the supported hooks.

## Pilot feedback

Please share feedback through the repository issues or with the pilot organizer. Useful feedback includes which signals are helpful, which recommendations are distracting, and what additional analytics would improve coding efficiency or quality.
