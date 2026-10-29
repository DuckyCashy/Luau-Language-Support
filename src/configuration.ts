import * as vscode from "vscode";

export interface LuauSettings {
    languageServerEnabled: boolean;
    analyzerEnabled: boolean;
    analyzerPath: string;
    analyzerArguments: string[];
    robloxGlobals: boolean;
    debuggerAdapterPath: string;
}

export function getSettings(): LuauSettings {
    const config = vscode.workspace.getConfiguration("luau");

    return {
        languageServerEnabled: config.get<boolean>(
            "languageServer.enabled",
            true
        ),
        analyzerEnabled: config.get<boolean>(
            "analyzer.enabled",
            false
        ),
        analyzerPath: config.get<string>(
            "analyzer.path",
            ""
        ).trim(),
        analyzerArguments: config.get<string[]>(
            "analyzer.arguments",
            []
        ),
        robloxGlobals: config.get<boolean>(
            "completion.robloxGlobals",
            true
        ),
        debuggerAdapterPath: config.get<string>(
            "debugger.adapterPath",
            ""
        ).trim()
    };
}