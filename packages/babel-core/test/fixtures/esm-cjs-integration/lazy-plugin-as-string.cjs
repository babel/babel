const babel = require("../../../lib/index.js");

babel
  .transformAsync("REPLACE_ME;", {
    configFile: false,
    plugins: [__dirname + "/plugins/lazy.cjs"],
  })
  .then(out => console.log(out.code), console.error);
