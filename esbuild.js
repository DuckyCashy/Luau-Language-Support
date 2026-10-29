const esbuild = require("esbuild");

const watch = process.argv.includes("--watch");

const common = {
    bundle: true,
    platform: "node",
    target: "node20",
    sourcemap: true,
    external: ["vscode"],
    logLevel: "info"
};

async function build() {
    const extensionConfig = {
        ...common,
        entryPoints: ["src/extension.ts"],
        outfile: "out/extension.js",
        format: "cjs"
    };

    const serverConfig = {
        ...common,
        entryPoints: ["server/src/server.ts"],
        outfile: "out/server.js",
        format: "cjs"
    };

    if (!watch) {
        await Promise.all([
            esbuild.build(extensionConfig),
            esbuild.build(serverConfig)
        ]);
        return;
    }

    const extensionContext = await esbuild.context(extensionConfig);
    const serverContext = await esbuild.context(serverConfig);

    await Promise.all([
        extensionContext.watch(),
        serverContext.watch()
    ]);

    console.log("Watching extension and language server.");
}

build().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});