import * as babel from "../../../lib/index.js";
import { fileURLToPath } from "url";

const out = babel.transformSync("REPLACE_ME;", {
  configFile: false,
  plugins: [fileURLToPath(import.meta.resolve("./plugins/esm-sync.mjs"))],
});
console.log(out.code);
