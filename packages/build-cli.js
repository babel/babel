var outputFile = require("output-file-sync");

var pkgLoc = __dirname + "/babel-cli/package.json";
var pkg    = require(pkgLoc);

var mainPkg = require("../package.json");

pkg.version = mainPkg.version;
pkg.dependencies["babel-core"] = "^" + mainPkg.version;

outputFile(pkgLoc, JSON.stringify(pkg, null, 2));
