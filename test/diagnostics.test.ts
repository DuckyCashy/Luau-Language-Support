import test from "node:test";
import assert from "node:assert/strict";
import { analyzeStructure } from "../server/src/analyzer";

test("does not invent errors for valid-looking Luau", () => {
    const source = [
        "local Players = game:GetService(\"Players\")",
        "local function greet(player: Player)",
        "    print(player.Name)",
        "end",
        "return greet"
    ].join("\n");

    assert.deepEqual(analyzeStructure(source), []);
});

test("does not flag block-like words in comments or strings", () => {
    const source = [
        "-- if this then do end",
        "local message = \"function if end\"",
        "print(message)"
    ].join("\n");

    assert.deepEqual(analyzeStructure(source), []);
});