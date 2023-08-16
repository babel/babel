const [s, s2] = await Promise.all([WebAssembly.compileStreaming(fetch(import.meta.resolve?.("./x.wasm") ?? new URL("./x.wasm", import.meta.url))), WebAssembly.compileStreaming(fetch(import.meta.resolve?.("./x2.wasm") ?? new URL("./x2.wasm", import.meta.url)))]);
someBody;
