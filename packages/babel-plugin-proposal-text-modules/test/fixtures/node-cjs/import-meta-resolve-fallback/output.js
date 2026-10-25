"use strict";

const j = String(require("fs").readFileSync(require.resolve("./x"))).replace(/^\xEF\xBB\xBF/, "");
