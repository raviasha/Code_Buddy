# Code Buddy for VS Code

This folder contains the Code Buddy v0.9.0 VS Code installation artifact and
its integrity checksum.

## What's new in v0.9.0

- The prompt-facing context status now includes current tokens, model-window
  tokens, and the actual percentage whenever native capacity is available.
- Every submitted prompt gets a model-presented personalized-feedback status.
  Before enough comparable local evidence exists, the status says **Not enough
  data yet**.
- Schema-1.1 telemetry measures qualifying human-requested corrective retries
  while excluding clarifications, extensions, scope changes, new tasks, and
  agent-internal retries.
- Configurable cold-start and reliability thresholds prevent premature advice.
- Interpretable count analysis uses Poisson regression and falls back to a
  negative-binomial model when the observed counts are overdispersed.
- New commands reveal raw task telemetry, replay a task, and open human-retry
  evidence with task completion and test/build quality guardrails.

The evidence is presented as an observed association, never unsupported
causation.

## Requirements

- VS Code 1.95 or newer.
- GitHub Copilot on a coding-agent surface that supplies the configured hook
  events and supports VS Code language-model tools.
- Python 3 as `python3` or `python` for Markdown reports and worktree analysis.
  Structured JSONL hook logging continues if Python is unavailable.

Hook and transcript availability can vary by Copilot surface and rollout.

## Install

1. Download these two files:

   - [`code-buddy-0.9.0.vsix`](./code-buddy-0.9.0.vsix)
   - [`code-buddy-0.9.0-SHA256SUMS.txt`](./code-buddy-0.9.0-SHA256SUMS.txt)

2. From their download directory, verify the extension:

   ```bash
   shasum -a 256 -c code-buddy-0.9.0-SHA256SUMS.txt
   ```

3. In VS Code, open **Extensions**, choose **… → Install from VSIX…**, select
   `code-buddy-0.9.0.vsix`, and reload the window.

   From a clone of this repository, the equivalent CLI command is:

   ```bash
   code --install-extension ./vscode/code-buddy-0.9.0.vsix --force
   ```

4. Open the target workspace and run **Code Buddy: Install Copilot Hooks** from
   the Command Palette. Hook setup is explicit and must be run once per
   workspace.
5. Submit a meaningful prompt in a supported Copilot agent chat.

## Upgrade

1. Install the new VSIX with **Install from VSIX…** or rerun the CLI installation
   command with `--force`.
2. Reload the VS Code window.
3. Run **Code Buddy: Install Copilot Hooks** again in every active workspace so
   its hook path, settings, and managed instructions use the new extension.

## Useful commands

- **Code Buddy: Open Feedback** — opens the concise per-turn feedback report.
- **Code Buddy: Open Analytics** — opens detailed local session analytics.
- **Code Buddy: Open Raw Task Telemetry** — reveals local schema-1.1 JSONL.
- **Code Buddy: Replay Task Telemetry** — reconstructs one task lifecycle.
- **Code Buddy: Open Human Retry Evidence** — opens cohort reliability and
  association evidence.
- **Code Buddy: Remove Copilot Hooks** — removes managed hook configuration and
  instructions while preserving existing logs and reports.

## Evidence thresholds

The default loose cold-start gate requires at least 8 comparable completed
tasks, 5 usable tasks for a factor, reliability of 0.60, and a minimum effect
size of 0.15 before Code Buddy can show an evidence-backed recommendation.
Configure these under `tokenLens.humanRetry.*` or in the shared
`code-buddy.yaml` project policy.

## Local data and privacy

Code Buddy stores task telemetry under `.code-buddy/telemetry/` in the
workspace. Standard telemetry contains derived behavioral and engineering
metadata, not raw prompts, responses, source code, terminal output, or tool
arguments. Raw prompt capture requires diagnostic telemetry plus a separate
explicit opt-in and remains secret-redacted. Telemetry errors never block the
coding agent.

For complete settings, architecture, schemas, and verification instructions,
see the [development documentation](https://github.com/raviasha/Token-Lens#readme).

## Troubleshooting

- Confirm Code Buddy 0.9.0 is installed and reload VS Code.
- Run **Code Buddy: Install Copilot Hooks** in the active workspace.
- Use **Code Buddy: Open Hook Configuration** to verify the generated hook.
- Open the VS Code Output panel and select **Code Buddy** for runtime messages.
- If Markdown reports do not refresh, confirm Python 3 is available; JSONL hook
  logging should continue independently.
