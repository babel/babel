"use strict";

const ns = {
  default: String(require("fs").readFileSync(require.resolve("./x"))).replace(/^\xEF\xBB\xBF/, "")
};
