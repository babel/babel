import("../../../lib/index.js")
  .then(babel => babel.transformSync("REPLACE_ME;", { configFile: false }))
  .then(out => console.log(out.code), console.error);
