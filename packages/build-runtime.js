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

function readFile(filename, shouldDefaultify) {
  var file = fs.readFileSync(require.resolve(filename), "utf8");

  if (shouldDefaultify) {
    file += "\n" + defaultify("module.exports") + "\n";
  }

  return file;
}

function defaultify(name) {
  return 'module.exports = { "default": ' + name + ', __esModule: true };';
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


function writeFile(filename, content) {
  return writeRootFile(filename, content);
}

function selfContainify(code) {
  return transform(code, {
    optional: ["runtime"]
  }).code;
}

function buildHelper(helperName) {
  var tree = t.program(
    util.template("self-contained-helpers-head", {
      HELPER: util.template("helper-" + helperName)
    })
  );

  return transform.fromAst(tree, null, {
    optional: ["runtime"]
  }).code;
}

each(File.helpers, function (helperName) {
  writeFile("helpers/" + helperName + ".js", buildHelper(helperName));
});

writeFile("regenerator/index.js", readFile("regenerator/runtime-module", true));
writeFile("regenerator/runtime.js", selfContainify(readFile("regenerator/runtime")));

//

var coreDefinitions = require("../lib/babel/transformation/transformers/other/runtime/definitions");

var paths = ["is-iterable", "get-iterator"];

each(coreDefinitions.builtins, function (path) {
  paths.push(path);
});

each(coreDefinitions.methods, function (props) {
  each(props, function (path) {
    paths.push(path);
  });
});

each(paths, function (path) {
  writeFile("core-js/" + path + ".js", defaultify('require("core-js/library/fn/' + path + '")'));
});

//

updatePackage();
