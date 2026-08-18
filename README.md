# Code Buddy

Code Buddy adds developer-controlled prompt governance, context guidance, and
privacy-first local task analytics to supported coding-agent workflows. This
repository distributes both the Codex plugin and the packaged VS Code
extension.

## What's new in v0.9.0

- Shows a model-presented `Personalized recommendation —` status after every
  submitted prompt. During cold start, it explicitly reports **Not enough data
  yet** instead of making a personalized claim.
- Measures human-requested corrective retries separately from clarifications,
  extensions, scope changes, new tasks, and agent-internal attempts.
- Uses configurable comparable-task and reliability gates before presenting
  advice. The loose defaults require 8 comparable completed tasks, 5 usable
  observations per factor, and reliability of at least 0.60.
- Adds interpretable Poisson analysis with negative-binomial fallback for
  overdispersion, plus test/build quality guardrails.
- Adds VS Code commands for raw telemetry, task replay, and human-retry evidence,
  and a read-only Codex human-retry analysis tool.

These results describe local associations, not causation. Code Buddy does not
make personalized claims until the configured evidence gates pass.

## VS Code extension

### Requirements

- VS Code 1.95 or newer.
- GitHub Copilot on a coding-agent surface that supplies the configured hook
  events and supports VS Code language-model tools.
- Python 3 as `python3` or `python` for Markdown reports and worktree analysis.
  Structured JSONL hook logging continues if Python is unavailable.

### Install

1. Download [`vscode/code-buddy-0.9.0.vsix`](./vscode/code-buddy-0.9.0.vsix)
   and its [SHA-256 checksum](./vscode/code-buddy-0.9.0-SHA256SUMS.txt), or use
   the [v0.9.0 release](https://github.com/raviasha/Code_Buddy/releases/tag/v0.9.0).
2. Verify the download from the directory containing both files:

   ```bash
   shasum -a 256 -c code-buddy-0.9.0-SHA256SUMS.txt
   ```

3. In VS Code, choose **Extensions → … → Install from VSIX…**, select the
   downloaded file, and reload the window. You can instead install from a clone:

   ```bash
   code --install-extension ./vscode/code-buddy-0.9.0.vsix --force
   ```

4. Open the target workspace and run **Code Buddy: Install Copilot Hooks** from
   the Command Palette. Run this once in every workspace where Code Buddy should
   operate.
5. Submit a meaningful prompt in a supported Copilot agent chat.

To upgrade, install the newer VSIX, reload VS Code, and run **Code Buddy:
Install Copilot Hooks** again in each active workspace.

See the [VS Code installation and update guide](./vscode/README.md) for commands,
configuration, privacy behavior, and troubleshooting.

## Codex plugin

### Install

```bash
codex plugin marketplace add raviasha/Code_Buddy --ref main
codex plugin add code-buddy@code-buddy
```

Fully restart Codex, create a new task, and trust the Code Buddy hook when
prompted. Use **Plugins → Code Buddy → Enable/Disable** to control whether the
plugin runs in future tasks.

### Upgrade

```bash
codex plugin marketplace upgrade code-buddy
codex plugin add code-buddy@code-buddy
```

Fully restart Codex and create a new task after upgrading. See the [Codex plugin
guide](./plugins/code-buddy/README.md) for policy configuration, local telemetry,
and task replay commands.

## Privacy and control

- Standard telemetry is local, metadata-derived, append-only, and fail-open.
- Prompts, responses, source code, terminal output, and tool arguments are not
  stored in standard telemetry.
- Raw prompt capture requires both diagnostic telemetry and a separate opt-in;
  captured content is still secret-redacted.
- Code Buddy never silently rewrites a prompt, creates a new task, or switches
  chats for the developer.

## Repository layout

```text
.agents/plugins/marketplace.json  Codex marketplace entry
plugins/code-buddy/               Codex plugin package
vscode/                           VSIX, checksum, and VS Code instructions
```

The development source, comprehensive architecture, schemas, examples, and test
suite live in [Token Lens](https://github.com/raviasha/Token-Lens).

## License

Code Buddy is released under the [MIT License](./LICENSE).
