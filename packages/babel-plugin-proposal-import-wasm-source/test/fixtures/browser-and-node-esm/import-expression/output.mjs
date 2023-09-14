let promise = Promise.resolve().then(() => typeof process === "object" && process.versions.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x.wasm")))).then(WebAssembly.compile) : WebAssembly.compileStreaming(fetch(import.meta.resolve("./x.wasm"))));
