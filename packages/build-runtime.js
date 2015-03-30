"use strict";

var outputFile = require("output-file-sync");
var transform  = require("../lib/babel/transformation");
var each       = require("lodash/collection/each");
var File       = require("../lib/babel/transformation/file");
var util       = require("../lib/babel/util");
var fs         = require("fs");
var t          = require("../lib/babel/types");
var _          = require("lodash");

function relative(filename) {
  return __dirname + "/babel-runtime/" + filename;
}

function readFile(filename, defaultify) {
  var file = fs.readFileSync(require.resolve(filename), "utf8");

  if (defaultify) {
    file += '\nmodule.exports = { "default": module.exports, __esModule: true };\n';
  }

  return file;
}

function updatePackage() {
  var pkgLoc = relative("package.json");
  var pkg    = require(pkgLoc);

  var mainPkg = require("../package.json");
  pkg.version = mainPkg.version;

  writeRootFile("package.json", JSON.stringify(pkg, null, 2));
}

function writeRootFile(filename, content) {
  filename = relative(filename);
  console.log(filename);
  outputFile(filename, content);
}

function doVersion(version) {
  var transformer = "runtime" + version.toUpperCase();

  function writeFile(filename, content) {
    return writeRootFile(version + "/" + filename, content);
  }

  function selfContainify(code) {
    return transform(code, {
      optional: [transformer]
    }).code;
  }

  function buildHelper(helperName) {
    var tree = t.program(
      util.template("self-contained-helpers-head", {
        HELPER: util.template("helper-" + helperName)
      })
    );

    return transform.fromAst(tree, null, {
      optional: [transformer]
    }).code;
  }

  each(File.helpers, function (helperName) {
    writeFile("helpers/" + helperName + ".js", buildHelper(helperName));
  });

  writeFile("regenerator/index.js", readFile("regenerator-babel/runtime-module", true));
  writeFile("regenerator/runtime.js", selfContainify(readFile("regenerator-babel/runtime")));
}

doVersion("es3");
doVersion("es5");
updatePackage();
