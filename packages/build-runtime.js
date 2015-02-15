"use strict";

var buildHelpers = require("../lib/babel/build-helpers");
var transform    = require("../lib/babel/transformation");
var util         = require("../lib/babel/util");
var fs           = require("fs");
var t            = require("../lib/babel/types");
var _            = require("lodash");

var relative = function (filename) {
  return __dirname + "/babel-runtime/" + filename;
};

var writeFile = function (filename, content) {
  filename = relative(filename);
  console.log(filename);
  fs.writeFileSync(filename, content);
};

var readFile = function (filename, defaultify) {
  var file = fs.readFileSync(require.resolve(filename), "utf8");

  if (defaultify) {
    file += '\nmodule.exports = { "default": module.exports, __esModule: true };\n';
  }

  return file;
};

var updatePackage = function () {
  var pkgLoc = relative("package.json");
  var pkg    = require(pkgLoc);

  var mainPkg = require("../package.json");
  pkg.version = mainPkg.version;

  writeFile("package.json", JSON.stringify(pkg, null, 2));
};

var selfContainify = function (code) {
  return transform(code, {
    optional: ["selfContained"]
  }).code;
};

var buildHelpers2 = function () {
  var body = util.template("self-contained-helpers-head");
  var tree = t.program(body);

  buildHelpers(body, t.identifier("helpers"));

  return transform.fromAst(tree, null, {
    optional: ["selfContained"]
  }).code;
};

writeFile("helpers.js", buildHelpers2());
writeFile("core-js.js", readFile("core-js/library", true));
writeFile("regenerator/index.js", readFile("regenerator-babel/runtime-module", true));
writeFile("regenerator/runtime.js", selfContainify(readFile("regenerator-babel/runtime")));
updatePackage();
