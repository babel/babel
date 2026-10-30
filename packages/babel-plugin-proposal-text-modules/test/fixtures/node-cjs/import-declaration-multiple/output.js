"use strict";

const j = String(require("fs").readFileSync(require.resolve("./x"))).replace(/^\uFEFF/, ""),
  j2 = String(require("fs").readFileSync(require.resolve("./x2"))).replace(/^\uFEFF/, "");
someBody;
