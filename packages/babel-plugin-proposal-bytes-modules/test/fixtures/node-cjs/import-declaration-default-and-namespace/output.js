"use strict";

const value = babelHelpers.immutableUint8Array(require("fs").readFileSync(require.resolve("./x.bin")));
const ns = {
  default: value
};
use(value, ns);
