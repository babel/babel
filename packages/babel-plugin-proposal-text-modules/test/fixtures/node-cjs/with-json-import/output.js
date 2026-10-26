"use strict";

const text = String(require("fs").readFileSync(require.resolve("./x"))).replace(/^\uFEFF/, ""),
  json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
