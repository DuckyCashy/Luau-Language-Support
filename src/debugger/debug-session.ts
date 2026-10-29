import * as vscode from "vscode";

export class LuauDebugSessionTracker
    implements vscode.DebugAdapterTrackerFactory {

    public createDebugAdapterTracker(
        session: vscode.DebugSession
    ): vscode.ProviderResult<vscode.DebugAdapterTracker> {
        return {
            onError(error: Error): void {
                console.error(
                    `[Luau Debugger] ${session.name}: ${error.message}`
                );
            },

            onExit(
                code: number | undefined,
                signal: string | undefined
            ): void {
                if (code !== undefined && code !== 0) {
                    console.error(
                        `[Luau Debugger] Exit code: ${code}; signal: ${signal ?? "none"}`
                    );
                }
            }
        };
    }
}