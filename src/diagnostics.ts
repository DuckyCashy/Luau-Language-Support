import * as vscode from "vscode";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import * as path from "node:path";
import { getSettings } from "./configuration";

const execFileAsync = promisify(execFile);

export class LuauDiagnostics implements vscode.Disposable {
    private readonly collection =
        vscode.languages.createDiagnosticCollection("luau");

    private readonly output: vscode.OutputChannel;

    public constructor(output: vscode.OutputChannel) {
        this.output = output;
    }

    public async refresh(
        document: vscode.TextDocument
    ): Promise<void> {
        if (
            document.languageId !== "luau" ||
            document.uri.scheme !== "file"
        ) {
            return;
        }

        const settings = getSettings();

        if (!settings.analyzerEnabled || !settings.analyzerPath) {
            this.collection.delete(document.uri);
            return;
        }

        try {
            const result = await execFileAsync(
                settings.analyzerPath,
                [...settings.analyzerArguments, document.uri.fsPath],
                {
                    cwd: path.dirname(document.uri.fsPath),
                    timeout: 15000,
                    maxBuffer: 2 * 1024 * 1024,
                    windowsHide: true
                }
            );

            this.collection.set(
                document.uri,
                this.parseOutput(
                    [result.stdout, result.stderr]
                        .filter(Boolean)
                        .join("\n"),
                    document
                )
            );
        } catch (error: unknown) {
            const failure = error as {
                stdout?: string;
                stderr?: string;
                message?: string;
            };

            const output = [
                failure.stdout,
                failure.stderr
            ].filter(Boolean).join("\n");

            if (output.trim()) {
                this.collection.set(
                    document.uri,
                    this.parseOutput(output, document)
                );
            } else {
                this.collection.delete(document.uri);
                this.output.appendLine(
                    `Analyzer failed: ${failure.message ?? "Unknown error"}`
                );
            }
        }
    }

    private parseOutput(
        output: string,
        document: vscode.TextDocument
    ): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const currentFile = path.basename(document.uri.fsPath);

        for (const line of output.split(/\r?\n/)) {
            const match =
                /^(?:(.*?\.luau?):)?(\d+):(\d+):\s*(?:(?:SyntaxError|TypeError|Error|Warning):\s*)?(.*)$/i.exec(
                    line.trim()
                );

            if (!match) {
                continue;
            }

            const reportedFile = match[1];
            const lineNumber = Number(match[2]) - 1;
            const columnNumber = Number(match[3]) - 1;
            const message = match[4].trim();

            if (
                reportedFile &&
                path.basename(reportedFile) !== currentFile
            ) {
                continue;
            }

            if (
                !Number.isInteger(lineNumber) ||
                !Number.isInteger(columnNumber) ||
                lineNumber < 0 ||
                lineNumber >= document.lineCount ||
                !message
            ) {
                continue;
            }

            const text = document.lineAt(lineNumber).text;
            const start = Math.min(
                Math.max(columnNumber, 0),
                text.length
            );

            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(
                    lineNumber,
                    start,
                    lineNumber,
                    Math.min(start + 1, text.length)
                ),
                message,
                /\bwarning\b/i.test(line)
                    ? vscode.DiagnosticSeverity.Warning
                    : vscode.DiagnosticSeverity.Error
            );

            diagnostic.source = "Luau Analyzer";
            diagnostics.push(diagnostic);
        }

        return diagnostics;
    }

    public dispose(): void {
        this.collection.dispose();
    }
}