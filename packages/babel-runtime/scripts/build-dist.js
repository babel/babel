var outputFile = require("output-file-sync");
var each       = require("lodash/each");
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

// Should be removed in the next major release:
var legacy = {
  "string/pad-left": "string/pad-start",
  "string/pad-right": "string/pad-end"
};

each(legacy, function (value, key) {
  writeFile("core-js/" + key + ".js", defaultify('require("core-js/library/fn/' + value + '")'));
});

var helpers    = require("../../babel-helpers");
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

function writeFile(filename, content) {
  return writeRootFile(filename, content);
}

var transformOpts = {
  presets: [
    require("../../babel-preset-es2015")
  ],

  plugins: [
    require("../../babel-plugin-transform-runtime"),
    [require("../../babel-plugin-transform-es2015-modules-commonjs"), {loose: true, strict: false}]
  ]
};

function buildRuntimeRewritePlugin(relativePath, helperName) {
  return {
    pre: function (file){
      var original = file.get("helperGenerator");
      file.set("helperGenerator", function(name){
        // make sure that helpers won't insert circular references to themselves
        if (name === helperName) return;

        return original(name);
      });
    },
    visitor: {
      CallExpression: function(path){
        if (!path.get("callee").isIdentifier({name: "require"}) ||
          path.get("arguments").length !== 1 ||
          !path.get("arguments")[0].isStringLiteral()) return;

        // replace any reference to babel-runtime with a relative path
        path.get("arguments")[0].node.value = path.get("arguments")[0].node.value
          .replace(/^babel-runtime/, relativePath);
      }
    }
  };
}

function selfContainify(path, code) {
  return babel.transform(code, {
    presets: transformOpts.presets,
    plugins: transformOpts.plugins.concat([buildRuntimeRewritePlugin(path, null)])
  }).code;
}

function buildHelper(helperName) {
  var tree = t.program([
    t.exportDefaultDeclaration(helpers.get(helperName))
  ]);

  return babel.transformFromAst(tree, null, {
    presets: transformOpts.presets,
    plugins: transformOpts.plugins.concat([buildRuntimeRewritePlugin("..", helperName)])
  }).code;
}

each(helpers.list, function (helperName) {
  writeFile("helpers/" + helperName + ".js", buildHelper(helperName));

  // compat
  var helperAlias = _.kebabCase(helperName);
  var content = "module.exports = require(\"./" + helperName + ".js\");";
  writeFile("helpers/_" + helperAlias + ".js", content);
  if (helperAlias !== helperName) writeFile("helpers/" + helperAlias + ".js", content);
});
