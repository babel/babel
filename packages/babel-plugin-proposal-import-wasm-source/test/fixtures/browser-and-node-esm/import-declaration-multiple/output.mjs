const [s, s2] = await Promise.all([typeof process === "object" && process.versions.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x.wasm")))).then(WebAssembly.compile) : WebAssembly.compileStreaming(fetch(import.meta.resolve("./x.wasm"))), typeof process === "object" && process.versions.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x2.wasm")))).then(WebAssembly.compile) : WebAssembly.compileStreaming(fetch(import.meta.resolve("./x2.wasm")))]);
someBody;
