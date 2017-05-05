"use strict";

const outputFile = require("output-file-sync");
const coreDefinitions = require("babel-plugin-transform-runtime").definitions;
const helpers = require("babel-helpers");
const babel = require("../../babel-core");
const t = require("../../babel-types");

const paths = ["is-iterable", "get-iterator"];

Object.keys(coreDefinitions.builtins).forEach((key) => {
  const path = coreDefinitions.builtins[key];
  paths.push(path);
});

Object.keys(coreDefinitions.methods).forEach((key) => {
  const props = coreDefinitions.methods[key];
  Object.keys(props).forEach((key2) => {
    const path = props[key2];
    paths.push(path);
  });
});

paths.forEach(function(path) {
  writeFile(
    "core-js/" + path + ".js",
    defaultify(`require("core-js/library/fn/${path}")`)
  );
});

function relative(filename) {
  return `${__dirname}/../${filename}`;
}

function defaultify(name) {
  return `module.exports = { "default": ${name}, __esModule: true };`;
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
    presets: [[require("../../babel-preset-es2015"), { modules: false }]],

    plugins: [
      [
        require("../../babel-plugin-transform-runtime"),
        { useBuiltIns, useESModules: modules === false },
      ],
    ],
  };
  if (modules === "commonjs") {
    opts.plugins.push([
      require("../../babel-plugin-transform-es2015-modules-commonjs"),
      { loose: true, strict: false },
    ]);
  } else if (modules !== false) {
    throw new Error("Unsupported module type");
  }
  return opts;
}

function buildRuntimeRewritePlugin(relativePath, helperName) {
  return {
    pre(file) {
      const original = file.get("helperGenerator");
      file.set("helperGenerator", (name) => {
        // make sure that helpers won't insert circular references to themselves
        if (name === helperName) return false;

        return original(name);
      });
    },
    visitor: {
      ImportDeclaration(path) {
        path.get("source").node.value = path
          .get("source")
          .node.value.replace(/^babel-runtime/, relativePath);
      },
      CallExpression(path) {
        if (
          !path.get("callee").isIdentifier({ name: "require" }) ||
          path.get("arguments").length !== 1 ||
          !path.get("arguments")[0].isStringLiteral()
        ) {
          return;
        }

        // replace any reference to babel-runtime with a relative path
        path.get("arguments")[0].node.value = path
          .get("arguments")[0]
          .node.value.replace(/^babel-runtime/, relativePath);
      },
    },
  };
}

function buildHelper(helperName, modules, useBuiltIns) {
  const tree = t.program(helpers.get(helperName).nodes);

  const transformOpts = makeTransformOpts(modules, useBuiltIns);

  const relative = useBuiltIns ? "../.." : "..";

  return babel.transformFromAst(tree, null, {
    presets: transformOpts.presets,
    plugins: transformOpts.plugins.concat([
      buildRuntimeRewritePlugin(
        modules === false ? `../${relative}` : relative,
        helperName
      ),
    ]),
  }).code;
}

for (const modules of ["commonjs", false]) {
  for (const builtin of [false, true]) {
    const dirname = `helpers/${builtin ? "builtin/" : ""}${!modules ? "es6/" : ""}`;

    for (const helperName of helpers.list) {
      writeFile(
        `${dirname}${helperName}.js`,
        buildHelper(helperName, modules, builtin)
      );
    }
  }
}
