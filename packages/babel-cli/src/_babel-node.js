import { util } from "babel-core";
import commander from "commander";
import semver from "semver";

let program = new commander.Command("babel-node");

program.option("-e, --eval [script]", "Evaluate script");
program.option("-p, --print [code]", "Evaluate script and print result");
program.option("-o, --only [globs]", "");
program.option("-i, --ignore [globs]", "");
program.option("-x, --extensions [extensions]", "List of extensions to hook into [.es6,.js,.es,.jsx]");
program.option("-w, --plugins [string]", "", util.list);
program.option("-b, --presets [string]", "", util.list);
program.option("-d, --no-transpile [version]", "Disable Babel transpilation if the Node version in the given range is being used");

let pkg = require("../package.json");
program.version(pkg.version);
program.usage("[options] [ -e script | script.js ] [arguments]");
program.parse(process.argv);

if (!semver.satisfies(process.versions.node, program.noTranspile)) {
  // Run the code with transpilation enabled
  require("./transpiler").run(program);
}
