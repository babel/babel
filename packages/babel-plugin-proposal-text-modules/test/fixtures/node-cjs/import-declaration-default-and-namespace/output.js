"use strict";

const value = String(require("fs").readFileSync(require.resolve("./x.txt"))).replace(/^\uFEFF/, "");
const ns = {
  default: value
};
use(value, ns);
