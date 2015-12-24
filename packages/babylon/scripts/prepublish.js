require("./_util").updateMain("index.js");
require("child_process").execSync(__dirname + "/../../../node_modules/.bin/browserify -s babylon -e " + __dirname + "/../lib/index.js -o " + __dirname + "/../index.js", { encoding: "utf8" });
