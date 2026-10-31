const ns = await babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "arrayBuffer", babelHelpers.immutableUint8Array).then(j => ({
  default: j
}));
