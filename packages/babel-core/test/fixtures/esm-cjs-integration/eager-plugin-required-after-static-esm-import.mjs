import * as babel from "../../../lib/index.js";

babel
  .transformAsync("REPLACE_ME;", {
    configFile: false,
    plugins: [(await import("./plugins/eager.cjs")).default],
  })
  .then(out => console.log(out.code), console.error);
