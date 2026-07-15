"use strict";

const text = String(require("fs").readFileSync(require.resolve("./x"))),
  json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
