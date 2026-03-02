/*
 * This test throws an error, because the plugin accesses
 * @babel/core's CJS .types export before that the ESM
 * version is loaded.
 */

const babel = require("../../../lib/index.js");

babel
  .transformAsync("REPLACE_ME;", {
    configFile: false,
    plugins: [require("./plugins/eager.cjs")],
  })
  .then(out => console.log(out.code), console.error);
