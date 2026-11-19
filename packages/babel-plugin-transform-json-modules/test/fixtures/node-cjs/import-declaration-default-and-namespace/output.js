"use strict";

const value = JSON.parse(require("fs").readFileSync(require.resolve("./x.json")));
const ns = {
  default: value
};
use(value, ns);
