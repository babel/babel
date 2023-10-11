const s = await WebAssembly.compileStreaming(fetch(import.meta.resolve?.("./x.wasm") ?? new URL("./x.wasm", import.meta.url)));
