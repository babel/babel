const s = await WebAssembly.compileStreaming(fetch(import.meta.resolve("./x.wasm")));
