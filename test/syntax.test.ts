import test from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";

const grammarPath = path.resolve(
    __dirname,
    "../../syntaxes/luau.tmLanguage.json"
);

test("grammar includes Luau-specific token rules", () => {
    const grammar = JSON.parse(
        fs.readFileSync(grammarPath, "utf8")
    );

    assert.ok(grammar.repository.keywords);
    assert.ok(grammar.repository.types);
    assert.ok(grammar.repository.attributes);
    assert.ok(grammar.repository.operators);

    const keywords = grammar.repository.keywords.patterns;

    assert.ok(
        keywords.some((pattern: { match?: string }) =>
            pattern.match?.includes("continue")
        )
    );
});

test("grammar includes comment and string rules", () => {
    const grammar = JSON.parse(
        fs.readFileSync(grammarPath, "utf8")
    );

    assert.ok(grammar.repository.comments);
    assert.ok(grammar.repository.strings);
});