let promise = Promise.resolve().then(() => WebAssembly.compileStreaming(fetch(import.meta.resolve("./x.wasm"))));
