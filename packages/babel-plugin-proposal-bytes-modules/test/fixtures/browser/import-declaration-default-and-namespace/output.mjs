const [value, other] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x.bin")), "arrayBuffer", babelHelpers.immutableUint8Array), babelHelpers.processResponse(fetch(import.meta.resolve("./y.bin")), "arrayBuffer", babelHelpers.immutableUint8Array)]);
const ns = {
  default: value
};
use(value, ns, other);
