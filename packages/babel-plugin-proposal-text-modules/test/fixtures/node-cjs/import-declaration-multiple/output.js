"use strict";

const j = String(require("fs").readFileSync(require.resolve("./x"))).replace(/^\xEF\xBB\xBF/, ""),
  j2 = String(require("fs").readFileSync(require.resolve("./x2"))).replace(/^\xEF\xBB\xBF/, "");
someBody;
