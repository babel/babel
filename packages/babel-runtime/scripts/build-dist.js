var outputFile = require("output-file-sync");
var each       = require("lodash/collection/each");
var fs         = require("fs");
var _          = require("lodash");

var coreDefinitions = require("babel-plugin-transform-runtime").definitions;

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


var template   = require("babel-template");
var helpers    = require("babel-helpers");
var babel      = require("../../babel-core");
var util       = require("../../babel-core/lib/util");
var t          = require("../../babel-types");

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
  //console.log(filename);
  outputFile(filename, content);
}

var buildHelperHead = template("exports.default = HELPER; exports.__esModule = true;");

function writeFile(filename, content) {
  return writeRootFile(filename, content);
}

var transformOpts = {
  presets: [
    require("../../babel-preset-es2015")
  ],

  plugins: [
    require("../../babel-plugin-transform-runtime"),
    require("../../babel-plugin-transform-es2015-modules-commonjs")
  ]
};

function selfContainify(code) {
  return babel.transform(code, transformOpts).code;
}

function buildHelper(helperName) {
  var tree = t.program(
    buildHelperHead({
      HELPER: helpers.get(helperName)
    })
  );

  return babel.transformFromAst(tree, null, transformOpts).code;
}

each(helpers.list, function (helperName) {
  writeFile("helpers/" + helperName + ".js", buildHelper(helperName));

  // compat
  var helperAlias = _.kebabCase(helperName);
  writeFile("helpers/_" + helperAlias + ".js", buildHelper(helperName));
  writeFile("helpers/" + helperAlias + ".js", buildHelper(helperName));
});

writeFile("regenerator/index.js", readFile("regenerator/runtime-module", true));
writeFile("regenerator/runtime.js", selfContainify(readFile("regenerator/runtime")));
