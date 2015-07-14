var outputFile = require("output-file-sync");
var transform  = require("../../packages/babel/lib/transformation");
var each       = require("lodash/collection/each");
var File       = require("../../packages/babel/lib/transformation/file");
var util       = require("../../packages/babel/lib/util");
var fs         = require("fs");
var t          = require("../../packages/babel/lib/types");
var _          = require("lodash");

function relative(filename) {
  return __dirname + "/../" + filename;
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


var coreDefinitions = require("babel-plugin-runtime/lib/definitions");

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

