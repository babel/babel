import * as babel from "../../../lib/index.js";

const out = babel.transformSync("REPLACE_ME;", { configFile: false });
console.log(out.code);
