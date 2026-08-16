# Code Buddy

Code Buddy is an intelligent AI-powered coding assistant available for both **VS Code** and **Codex**.

## 📦 Downloads

- **VS Code Extension**: Available in the [`/vscode`](./vscode) folder
- **Codex Plugin**: Available in the [`/codex`](./codex) folder

## 🚀 Installation Instructions

### VS Code Extension

#### Prerequisites
- VS Code installed on your machine
- Node.js (for running hooks)

#### Installation Steps

1. **Download the Extension**
   - Navigate to the [`/vscode`](./vscode) folder in this repository
   - Download the latest `.vsix` file (e.g., `code-buddy-0.8.4.vsix`)

2. **Install in VS Code**
   - Open VS Code
   - Go to Extensions (Cmd+Shift+X on Mac, Ctrl+Shift+X on Windows/Linux)
   - Click the "..." menu and select "Install from VSIX..."
   - Select the downloaded `.vsix` file
   - Wait for the installation to complete

3. **Reload VS Code**
   - After installation completes, reload the VS Code window
   - Use Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux) to open the Command Palette
   - Type "Reload Window" and press Enter

4. **Initialize Hooks**
   - Code Buddy uses hooks for enhanced functionality
   - The hooks will be automatically installed when you first use the extension
   - If you need to manually install hooks, run the following in your project directory:
     \`\`\`bash
     npm install code-buddy
     npm run setup-hooks
     \`\`\`

5. **Verify Installation**
   - Open a project folder in VS Code
   - The Code Buddy icon should appear in the Activity Bar
   - You're ready to use Code Buddy!

#### Troubleshooting
- If the extension doesn't appear after reload, try restarting VS Code completely
- Ensure you have the correct version of Node.js installed for hooks to work properly
- Check the VS Code output panel for any error messages

---

### Codex Plugin

#### Prerequisites
- Codex installed and configured
- Python 3.8 or higher
- Required Python packages (see installation step 2)

#### Installation Steps

1. **Download the Plugin**
   - Navigate to the [`/codex`](./codex) folder in this repository
   - Download the Codex plugin files

2. **Install Dependencies**
   \`\`\`bash
   cd /path/to/codex
   pip install -r requirements.txt
   \`\`\`

3. **Copy Plugin Files**
   - Copy the plugin directory to your Codex plugins directory:
     \`\`\`bash
     cp -r code-buddy ~/.codex/plugins/
     \`\`\`

4. **Register the Plugin**
   - Edit your Codex configuration file (usually \`~/.codex/config.json\`)
   - Add the Code Buddy plugin to the plugins list:
     \`\`\`json
     {
       "plugins": [
         "code-buddy"
       ]
     }
     \`\`\`

5. **Initialize Hooks**
   - Run the Code Buddy setup script:
     \`\`\`bash
     ~/.codex/plugins/code-buddy/scripts/setup.sh
     \`\`\`
   - This will install and configure the necessary hooks for your project

6. **Verify Installation**
   - Restart Codex
   - Run the following command to verify:
     \`\`\`bash
     codex plugin list
     \`\`\`
   - You should see "code-buddy" in the list of installed plugins

#### Troubleshooting
- If the plugin doesn't load, check your Codex configuration file for syntax errors
- Ensure all Python dependencies are installed with the correct versions
- Check the Codex logs for any error messages: \`~/.codex/logs/\`
- For hook-related issues, verify that the setup script ran without errors

---

## 📚 Source Code

The full source code for Code Buddy is maintained in the [Token-Lens](https://github.com/raviasha/Token-Lens) repository. This repository contains the built and packaged distributions (\`.vsix\` and plugin files) for easy installation.

## 📖 Documentation

For detailed documentation, usage guides, advanced configuration, and development information, please visit the [Token-Lens repository](https://github.com/raviasha/Token-Lens).

---

## 🤝 Contributing

Contributions are welcome! Please visit the [Token-Lens repository](https://github.com/raviasha/Token-Lens) for contribution guidelines and development setup.

## 📄 License

Code Buddy is licensed under the MIT License. See the [Token-Lens repository](https://github.com/raviasha/Token-Lens) for license details.

---

**Code Buddy** - Making coding smarter with AI assistance

For support, issues, or questions, please refer to the [Token-Lens repository](https://github.com/raviasha/Token-Lens).
