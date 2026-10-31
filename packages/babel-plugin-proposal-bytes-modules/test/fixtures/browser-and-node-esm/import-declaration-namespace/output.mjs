const ns = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x")))).then(babelHelpers.immutableUint8Array) : babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "arrayBuffer", babelHelpers.immutableUint8Array)).then(j => ({
  default: j
}));
