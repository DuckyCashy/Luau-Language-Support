import test from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";

const root = path.resolve(__dirname, "../..");

function read(relativePath: string): string {
    return fs.readFileSync(
        path.join(root, relativePath),
        "utf8"
    );
}

test("registers the Luau language", () => {
    const manifest = JSON.parse(read("package.json"));

    const language = manifest.contributes.languages.find(
        (entry: { id: string }) => entry.id === "luau"
    );

    assert.ok(language);
    assert.ok(language.extensions.includes(".luau"));
});

test("registered theme exists", () => {
    const manifest = JSON.parse(read("package.json"));

    for (const theme of manifest.contributes.themes) {
        assert.ok(fs.existsSync(path.join(root, theme.path)));
    }
});

test("custom icon files exist", () => {
    assert.ok(fs.existsSync(path.join(root, "icons/luau.svg")));
    assert.ok(fs.existsSync(path.join(root, "icons/lua.svg")));

    const icons = JSON.parse(read("icons/luau-icon-theme.json"));
    assert.ok(icons.fileExtensions.luau);
});

test("snippet definitions are valid", () => {
    const snippets = JSON.parse(read("snippets/luau.json"));

    assert.ok(snippets["Local variable"]);
    assert.ok(snippets["Local function"]);
    assert.ok(snippets["Roblox service"]);
});

test("syntax grammar is valid", () => {
    const grammar = JSON.parse(
        read("syntaxes/luau.tmLanguage.json")
    );

    assert.equal(grammar.scopeName, "source.luau");
    assert.ok(grammar.patterns.length > 0);
    assert.ok(grammar.repository.comments);
    assert.ok(grammar.repository.strings);
    assert.ok(grammar.repository.keywords);
});