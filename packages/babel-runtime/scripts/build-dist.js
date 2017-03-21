var outputFile = require("output-file-sync");
var kebabCase  = require("lodash/kebabCase");
var fs         = require("fs");

var coreDefinitions = require("babel-plugin-transform-runtime").definitions;

var paths = ["is-iterable", "get-iterator"];

Object.keys(coreDefinitions.builtins).forEach(function (key) {
  const path = coreDefinitions.builtins[key];
  paths.push(path);
});

Object.keys(coreDefinitions.methods).forEach(function (key) {
  const props = coreDefinitions.methods[key];
  Object.keys(props).forEach(function (key2) {
    const path = props[key2];
    paths.push(path);
  });
});

paths.forEach(function (path) {
  writeFile("core-js/" + path + ".js", defaultify('require("core-js/library/fn/' + path + '")'));
});

var helpers    = require("babel-helpers");
var babel      = require("../../babel-core");
var util       = require("../../babel-core/lib/util");
var t          = require("../../babel-types");

function relative(filename) {
  return __dirname + "/../" + filename;
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

function makeTransformOpts(modules, useBuiltIns) {
  const opts = {
    presets: [
      [require("../../babel-preset-es2015"), { modules: false }]
    ],

    plugins: [
      [require("../../babel-plugin-transform-runtime"), { useBuiltIns: useBuiltIns, useESModules: modules === false }]
    ]
  }
  if (modules === 'commonjs') {
    opts.plugins.push([require("../../babel-plugin-transform-es2015-modules-commonjs"), { loose: true, strict: false }])
  } else if (modules !== false) {
    throw new Error('Unsupported module type')
  }
  return opts
}

function buildRuntimeRewritePlugin(relativePath, helperName) {
  return {
    pre: function (file) {
      var original = file.get("helperGenerator");
      file.set("helperGenerator", function(name) {
        // make sure that helpers won't insert circular references to themselves
        if (name === helperName) return false;

        return original(name);
      });
    },
    visitor: {
      ImportDeclaration: function(path){
        path.get("source").node.value = path.get("source").node.value
          .replace(/^babel-runtime/, relativePath);
      },
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

function buildHelper(helperName, modules, useBuiltIns) {
  const helper = helpers.get(helperName)
  // avoid an unneccessary TDZ in the easy case
  if (helper.type === "FunctionExpression") {
    helper.type = "FunctionDeclaration"
  }
  var tree = t.program([
    t.exportDefaultDeclaration(helper)
  ]);

  const transformOpts = makeTransformOpts(modules, useBuiltIns)

  const relative = useBuiltIns ? "../.." : ".."

  return babel.transformFromAst(tree, null, {
    presets: transformOpts.presets,
    plugins: transformOpts.plugins.concat([buildRuntimeRewritePlugin(modules === false ? `../${relative}` : relative, helperName)])
  }).code;
}

for (const modules of ["commonjs", false]) {
  for (const builtin of [false, true]) {
    const dirname = `helpers/${builtin ? 'builtin/' : ''}${!modules ? 'es6/' : ''}`

    for (const helperName of helpers.list) {
      writeFile(`${dirname}${helperName}.js`, buildHelper(helperName, modules, builtin));
    }
  }
}
