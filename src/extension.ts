import * as vscode from "vscode";
import { getSettings } from "./configuration";
import { LuauDiagnostics } from "./diagnostics";
import { LuauLanguageServer } from "./language-server";
import { LuauDebugConfigurationProvider } from "./debugger/debug-configuration";
import { LuauDebugAdapterDescriptorFactory } from "./debugger/debug-adapter";
import { LuauDebugSessionTracker } from "./debugger/debug-session";

const KEYWORDS = [
    "and", "break", "continue", "do", "else", "elseif",
    "end", "false", "for", "function", "if", "in", "local",
    "nil", "not", "or", "repeat", "return", "then", "true",
    "until", "while", "type", "export", "declare", "typeof"
];

const ROBLOX_GLOBALS: Array<[string, string]> = [
    ["game", "Roblox DataModel"],
    ["workspace", "Roblox Workspace"],
    ["script", "Current script instance"],
    ["shared", "Shared environment table"],
    ["Instance", "Roblox instance API"],
    ["Vector2", "Two-dimensional vector"],
    ["Vector3", "Three-dimensional vector"],
    ["CFrame", "3D position and orientation"],
    ["UDim", "GUI dimension"],
    ["UDim2", "Two-dimensional GUI dimension"],
    ["Color3", "RGB color"],
    ["BrickColor", "Brick color"],
    ["Enum", "Roblox enumerations"],
    ["task", "Task scheduling library"],
    ["typeof", "Luau type inspection"],
    ["warn", "Write a warning to output"],
    ["print", "Write values to output"],
    ["require", "Load a module"]
];

export async function activate(
    context: vscode.ExtensionContext
): Promise<void> {
    const output = vscode.window.createOutputChannel(
        "Luau Language Support"
    );

    const diagnostics = new LuauDiagnostics(output);
    const languageServer = new LuauLanguageServer();

    const completionProvider =
        vscode.languages.registerCompletionItemProvider(
            { language: "luau" },
            {
                provideCompletionItems(): vscode.CompletionItem[] {
                    const items = KEYWORDS.map((keyword) => {
                        const item = new vscode.CompletionItem(
                            keyword,
                            vscode.CompletionItemKind.Keyword
                        );

                        item.detail = "Luau keyword";
                        return item;
                    });

                    if (getSettings().robloxGlobals) {
                        for (const [name, description] of ROBLOX_GLOBALS) {
                            const item = new vscode.CompletionItem(
                                name,
                                vscode.CompletionItemKind.Variable
                            );

                            item.detail = description;
                            items.push(item);
                        }
                    }

                    return items;
                }
            },
            ".",
            ":"
        );

    const analyzerCommand = vscode.commands.registerCommand(
        "luau.restartAnalyzer",
        async () => {
            const editor = vscode.window.activeTextEditor;

            if (editor?.document.languageId !== "luau") {
                void vscode.window.showInformationMessage(
                    "Open a Luau file first."
                );
                return;
            }

            await diagnostics.refresh(editor.document);
            void vscode.window.showInformationMessage(
                "Luau analyzer refresh completed."
            );
        }
    );

    context.subscriptions.push(
        output,
        diagnostics,
        completionProvider,
        analyzerCommand,
vscode.debug.registerDebugConfigurationProvider(
    "luau",
    new LuauDebugConfigurationProvider()
),
        vscode.debug.registerDebugAdapterDescriptorFactory(
            "luau",
            new LuauDebugAdapterDescriptorFactory()
        ),
        vscode.debug.registerDebugAdapterTrackerFactory(
            "luau",
            new LuauDebugSessionTracker()
        ),
        vscode.workspace.onDidSaveTextDocument((document) => {
            void diagnostics.refresh(document);
        }),
        vscode.workspace.onDidCloseTextDocument((document) => {
            if (document.languageId === "luau") {
                void vscode.commands.executeCommand(
                    "setContext",
                    "luau.documentClosed",
                    true
                );
            }
        })
    );

    try {
        await languageServer.start(context);
        context.subscriptions.push(languageServer);
    } catch (error) {
        output.appendLine(
            `Language server startup failed: ${String(error)}`
        );

        void vscode.window.showWarningMessage(
            "The Luau language server failed to start. Syntax highlighting and basic completions remain available."
        );
    }
}

export function deactivate(): void {
    // Extension resources are disposed through context subscriptions.
}