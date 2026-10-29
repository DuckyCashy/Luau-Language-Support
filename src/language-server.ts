import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions
} from "vscode-languageclient/node";
import * as path from "node:path";
import { getSettings } from "./configuration";

export class LuauLanguageServer implements vscode.Disposable {
    private client: LanguageClient | undefined;

    public async start(
        context: vscode.ExtensionContext
    ): Promise<void> {
        if (!getSettings().languageServerEnabled) {
            return;
        }

        const serverModule = context.asAbsolutePath(
            path.join("out", "server.js")
        );

        const serverOptions: ServerOptions = {
            run: {
                module: serverModule,
                transport: 1
            },
            debug: {
                module: serverModule,
                transport: 1,
                options: {
                    execArgv: ["--nolazy", "--inspect=6009"]
                }
            }
        };

        const clientOptions: LanguageClientOptions = {
            documentSelector: [
                {
                    scheme: "file",
                    language: "luau"
                }
            ],
            synchronize: {
                fileEvents: vscode.workspace.createFileSystemWatcher(
                    "**/*.luau"
                )
            }
        };

        this.client = new LanguageClient(
            "luauLanguageServer",
            "Luau Language Server",
            serverOptions,
            clientOptions
        );

        await this.client.start();
    }

    public async dispose(): Promise<void> {
        if (this.client) {
            await this.client.stop();
            this.client = undefined;
        }
    }
}