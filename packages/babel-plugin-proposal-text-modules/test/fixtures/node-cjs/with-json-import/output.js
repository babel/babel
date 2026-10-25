"use strict";

const text = String(require("fs").readFileSync(require.resolve("./x"))).replace(/^\xEF\xBB\xBF/, ""),
  json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
