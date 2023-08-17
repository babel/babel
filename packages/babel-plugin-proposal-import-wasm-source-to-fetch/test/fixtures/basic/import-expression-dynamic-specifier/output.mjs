let promise = WebAssembly.compileStreaming(fetch(import.meta.resolve?.(getSpecifier()) ?? new URL(getSpecifier(), import.meta.url)));
