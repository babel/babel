const [j, j2] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "arrayBuffer", babelHelpers.immutableUint8Array), babelHelpers.processResponse(fetch(import.meta.resolve("./x2")), "arrayBuffer", babelHelpers.immutableUint8Array)]);
someBody;
