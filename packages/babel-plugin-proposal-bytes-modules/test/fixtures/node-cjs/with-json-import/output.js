"use strict";

const bytes = babelHelpers.immutableUint8Array(require("fs").readFileSync(require.resolve("./x"))),
  json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
