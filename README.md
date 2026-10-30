<p align="center">
    <img src="https://github.com/DuckyCashy/Luau-Language-Support/raw/HEAD/icons/luau.png" alt="Luau Language Support" width="125">
</p>

<h1 align="center">Luau Language Support</h1>

<p align="center">
  Language support for Luau and Lua development in Visual Studio Code. This Extension is also known as "Luau DevKit"
</p>

<p align="center">
  <img src="https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visualstudiocode" alt="VS Code Extension">
  <img src="https://img.shields.io/badge/Language-Luau-blue" alt="Luau">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

## Features

- Syntax highlighting for Luau.
- Language configuration for editing.
- Code snippets for common patterns.
- Roblox global completions.
- Bundled language server.
- Optional external analyzer integration.
- Debug Adapter Protocol integration.
- Custom Luau file icons.

## Screenshots

<p align="center">
    <img src="https://github.com/DuckyCashy/images/blob/main/Code/VS%20Code/Screenshots/Luau%20DevKit/Screenshot%202026-10-30%20135356.png" alt="luau">
    <img src="https://github.com/DuckyCashy/images/blob/main/Code/VS%20Code/Screenshots/Luau%20DevKit/Screenshot%202026-10-30%20135659.png" alt="lua">
</p>
 
## Installation

1. Download or clone this repository.
2. Open the project in Visual Studio Code.
3. Run `npm install`.
4. Run `npm test`.
5. Press `F5` to launch the Extension Development Host.

## Configuration

| Setting | Description | Default |
|---|---|---|
| `luau.languageServer.enabled` | Enable the bundled language server. | `true` |
| `luau.analyzer.enabled` | Enable an external Luau analyzer. | `false` |
| `luau.analyzer.path` | Path to the analyzer executable. | `""` |
| `luau.analyzer.arguments` | Arguments passed to the analyzer. | `[]` |
| `luau.completion.robloxGlobals` | Enable Roblox global completions. | `true` |
| `luau.debugger.adapterPath` | Path to a compatible debug adapter. | `""` |

## Development

Requirements:
- Node.js and npm
- Visual Studio Code
- TypeScript

Run the following commands from the project directory:

```bash
npm install
npm test
npm run compile
```
---

### Licensing
This project is licensed unter MIT License.
