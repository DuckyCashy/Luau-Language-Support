import * as vscode from "vscode";
import { getSettings } from "../configuration";

export class LuauDebugConfigurationProvider
    implements vscode.DebugConfigurationProvider {

    public resolveDebugConfiguration(
        _folder: vscode.WorkspaceFolder | undefined,
        config: vscode.DebugConfiguration
    ): vscode.DebugConfiguration | null {
        const resolved = { ...config };

        resolved.type ??= "luau";
        resolved.request ??= "launch";
        resolved.name ??= "Launch Luau";

        if (resolved.request === "launch" && !resolved.program) {
            const editor = vscode.window.activeTextEditor;

            if (editor?.document.languageId !== "luau") {
                void vscode.window.showErrorMessage(
                    "Open a Luau file or specify program in launch.json."
                );
                return null;
            }

            resolved.program = editor.document.uri.fsPath;
        }

        resolved.adapterPath ||=
            getSettings().debuggerAdapterPath;

        if (!resolved.adapterPath) {
            void vscode.window.showErrorMessage(
                "Configure luau.debugger.adapterPath with a compatible DAP adapter."
            );
            return null;
        }

        return resolved;
    }
}