# Code Buddy - VS Code Extension

The official VS Code extension for Code Buddy, an intelligent AI-powered coding assistant.

## Quick Start

1. Download `code-buddy-0.8.2.vsix` from this folder
2. Open VS Code
3. Go to Extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows/Linux)
4. Click the "..." menu and select "Install from VSIX..."
5. Select the downloaded file
6. Reload VS Code (Cmd+Shift+P → "Reload Window")

## Features

- **Prompt Quality Check**: Automatically evaluates and enhances your coding prompts
- **Task Scope Analysis**: Helps decompose large tasks into manageable subtasks
- **Context Pressure Estimation**: Monitors your session's context window usage
- **Session Fit Assessment**: Determines if you should start a fresh task or continue
- **Health Check Dashboard**: Compact status indicator with actionable recommendations

## Configuration

Code Buddy is designed to work out-of-the-box, but you can customize its behavior with an optional `code-buddy.yaml` file in your project root.

## Requirements

- VS Code 1.60 or higher
- Node.js 14+ (for hooks functionality)

## Troubleshooting

- **Extension doesn't load**: Try restarting VS Code completely
- **Hooks not working**: Ensure Node.js is installed and accessible from your terminal
- **Check output**: Open VS Code's Output panel and select "Code Buddy" to see debug information

## Support

For detailed documentation and support, visit the [Token-Lens repository](https://github.com/raviasha/Token-Lens).

---

**Code Buddy** - Making coding smarter with AI assistance
