const [s, s2] = await Promise.all([WebAssembly.compileStreaming(fetch(import.meta.resolve("./x.wasm"))), WebAssembly.compileStreaming(fetch(import.meta.resolve("./x2.wasm")))]);
someBody;
