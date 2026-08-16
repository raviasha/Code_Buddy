# Code Buddy for VS Code

`code-buddy-0.8.2.vsix` is the current VS Code extension package.

## Requirements

- VS Code 1.95 or later
- GitHub Copilot for Copilot session and hook features

## Install

1. Download [code-buddy-0.8.2.vsix](code-buddy-0.8.2.vsix), or download it from the [v0.8.2 release](https://github.com/raviasha/Code_Buddy/releases/tag/v0.8.2).
2. In VS Code, open **Extensions**.
3. Select **…** and choose **Install from VSIX…**.
4. Select the downloaded VSIX, then reload the VS Code window.
5. Open a workspace and run **Code Buddy: Install Copilot Hooks** from the Command Palette.

## Verify

Open the Command Palette and search for **Code Buddy**. You should see commands to review a prompt, assess task scope, measure context, curate a handoff, and open local feedback or analytics.

## Updating

Install a newer VSIX over the existing extension, reload VS Code, then rerun **Code Buddy: Install Copilot Hooks** in each workspace so managed instructions are refreshed.

## Troubleshooting

- Reload VS Code after installation.
- Confirm the installed VS Code version is at least 1.95.
- Check the **Output** panel if a Code Buddy command does not complete.
- If hooks were previously installed, run **Code Buddy: Remove Copilot Hooks** and then **Code Buddy: Install Copilot Hooks** again.
