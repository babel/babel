const babel = require("../../../lib/index.js");

babel
  .transformAsync("REPLACE_ME;", {
    configFile: false,
    plugins: [require("./plugins/lazy.cjs")],
  })
  .then(out => console.log(out.code), console.error);
