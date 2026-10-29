import * as vscode from "vscode";

export class LuauDebugAdapterDescriptorFactory
    implements vscode.DebugAdapterDescriptorFactory {

    public createDebugAdapterDescriptor(
        session: vscode.DebugSession
    ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
        const adapterPath =
            session.configuration.adapterPath as string | undefined;

        if (!adapterPath) {
            throw new Error(
                "A compatible Luau DAP adapter must be configured."
            );
        }

        const args = Array.isArray(session.configuration.adapterArgs)
            ? session.configuration.adapterArgs as string[]
            : [];

        const workspacePath =
            vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

        return new vscode.DebugAdapterExecutable(
            adapterPath,
            args,
            workspacePath ? { cwd: workspacePath } : undefined
        );
    }
}