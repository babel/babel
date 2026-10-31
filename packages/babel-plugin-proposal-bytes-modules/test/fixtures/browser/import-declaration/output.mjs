const j = await babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "arrayBuffer", babelHelpers.immutableUint8Array);
