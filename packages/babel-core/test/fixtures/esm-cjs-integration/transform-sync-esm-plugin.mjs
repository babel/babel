import * as babel from "../../../lib/index.js";
import { fileURLToPath } from "url";

const out = babel.transformSync("REPLACE_ME;", {
  configFile: false,
  plugins: [fileURLToPath(new URL("./plugins/esm-sync.mjs", import.meta.url))],
});
console.log(out.code);
