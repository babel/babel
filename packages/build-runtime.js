"use strict";

var buildHelpers = require("../lib/6to5/build-helpers");
var transform    = require("../lib/6to5/transformation");
var fs           = require("fs");
var t            = require("../lib/6to5/types");
var _            = require("lodash");

var relative = function (filename) {
  return __dirname + "/6to5-runtime/" + filename;
};

var writeFile = function (filename, content) {
  filename = relative(filename);
  console.log(filename);
  fs.writeFileSync(filename, content);
};

var readFile = function (filename) {
  return fs.readFileSync(require.resolve(filename), "utf8");
};

var updatePackage = function () {
  var pkgLoc = relative("package.json");
  var pkg    = require(pkgLoc);

  var mainPkg = require("../package.json");
  pkg.version = mainPkg.version;

  writeFile("package.json", JSON.stringify(pkg, null, 2));
};

var buildHelpers = function () {
  var body = [];
  var tree = t.program(body);

  buildHelpers(body, t.identifier("exports"));

  return transform.fromAst(tree, null, {
    optional: ["selfContained"]
  }).code;
};

writeFile("helpers.js", buildHelpers());
writeFile("core-js.js", readFile("core-js/library"));
writeFile("regenerator/index.js", readFile("regenerator-6to5/runtime-module"));
writeFile("regenerator/runtime.js", readFile("regenerator-6to5/runtime"));
updatePackage();
