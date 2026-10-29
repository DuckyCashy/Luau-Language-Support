import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    InitializeParams,
    InitializeResult,
    CompletionItem,
    CompletionItemKind,
    TextDocumentSyncKind
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { ROBLOX_GLOBAL_DEFINITIONS } from "./roblox-definitions";
import { analyzeStructure } from "./analyzer";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(
    (_params: InitializeParams): InitializeResult => ({
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: false,
                triggerCharacters: [".", ":"]
            }
        },
        serverInfo: {
            name: "Luau Language Server",
            version: "0.1.0"
        }
    })
);

connection.onCompletion((): CompletionItem[] => {
    const globals: CompletionItem[] =
        ROBLOX_GLOBAL_DEFINITIONS.map((definition) => ({
            label: definition.name,
            kind: CompletionItemKind.Variable,
            detail: definition.detail,
            documentation: definition.documentation
        }));

    const keywords: CompletionItem[] = [
        "and", "break", "continue", "do", "else", "elseif",
        "end", "false", "for", "function", "if", "in", "local",
        "nil", "not", "or", "repeat", "return", "then", "true",
        "until", "while", "type", "export", "declare", "typeof"
    ].map((keyword) => ({
        label: keyword,
        kind: CompletionItemKind.Keyword
    }));

    return [...keywords, ...globals];
});

documents.onDidChangeContent(({ document }) => {
    connection.sendDiagnostics({
        uri: document.uri,
        diagnostics: analyzeStructure(document.getText())
    });
});

documents.onDidClose(({ document }) => {
    connection.sendDiagnostics({
        uri: document.uri,
        diagnostics: []
    });
});

documents.listen(connection);
connection.listen();