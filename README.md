# Code Buddy

Code Buddy helps developers make better use of AI coding sessions in VS Code and Codex. It reviews meaningful prompts, assesses task scope, labels estimated context pressure clearly, and offers developer-controlled handoffs when a fresh task would help.

This is a distribution repository. Download the VS Code extension, or install the Codex plugin directly from this repository.

## Install

### VS Code extension

Requirements:

- VS Code 1.95 or later
- GitHub Copilot for Copilot session and hook features

1. Download [Code Buddy v0.8.2](https://github.com/raviasha/Code_Buddy/releases/download/v0.8.2/code-buddy-0.8.2.vsix).
2. In VS Code, open **Extensions**, select **…**, then choose **Install from VSIX…**.
3. Select the downloaded file and reload VS Code.
4. Open the Command Palette and run **Code Buddy: Install Copilot Hooks** in each workspace where you want Code Buddy enabled.

See [VS Code installation details](vscode/README.md) for verification and troubleshooting.

### Codex plugin

In a terminal, add this repository as a Codex plugin marketplace, then install Code Buddy:

```bash
codex plugin marketplace add raviasha/Code_Buddy --ref main
codex plugin install code-buddy@code-buddy
```

Restart Codex after installation. In **Plugins**, use the Code Buddy Enable/Disable switch to control it for newly created tasks.

## What Code Buddy does

- **Prompt review** — evaluates meaningful coding prompts while preserving the original prompt as an option.
- **Task-scope assessment** — recommends decomposition only when it would improve execution.
- **Estimated Context Pressure** — reports locally derived estimates honestly, without presenting them as actual provider context usage.
- **Session-fit checks** — identifies when a task may benefit from a fresh chat, while leaving the decision with the developer.
- **Curated handoffs** — prepares minimum-sufficient context bundles when you explicitly choose one.
- **Local reports** — keeps feedback, analytics, and intervention records in your workspace.
- **Project policy** — supports an optional `code-buddy.yaml` for team-visible thresholds and health-check behavior.

## Common commands

After installing the VS Code extension, use the Command Palette to run:

- **Code Buddy: Install Copilot Hooks**
- **Code Buddy: Review Prompt**
- **Code Buddy: Decompose Task**
- **Code Buddy: Measure Context**
- **Code Buddy: Curate Context**
- **Code Buddy: Open Feedback**
- **Code Buddy: Open Analytics**

## Privacy

Code Buddy stores its reports and event records locally in the workspace. Review the extension settings and your workspace's `code-buddy.yaml` before enabling capture in sensitive projects.

## Repository layout

```text
.agents/plugins/marketplace.json  Codex marketplace entry
plugins/code-buddy/               Codex plugin package
vscode/                           VSIX download and VS Code instructions
```

## License

[MIT](LICENSE)
