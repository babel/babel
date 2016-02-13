require("./_util").updateMain("index.js");
require("child_process").execSync(
  __dirname + "/../../../node_modules/.bin/browserify " +
  "--standalone babylon " +
  "--entry " + __dirname + "/../lib/index.js " +
  "--plugin bundle-collapser/plugin " +
  "--plugin derequire/plugin " +
  "--outfile " + __dirname + "/../index.js", { encoding: "utf8" });
