"use strict";

const ns = {
  default: JSON.parse(require("fs").readFileSync(require.resolve("./x.json")))
};
