let promise = Promise.resolve(`${getSpecifier()}`).then(s => WebAssembly.compileStreaming(fetch(import.meta.resolve(s))));
