"use strict";

const path = require("path");
const outputFile = require("output-file-sync");
const helpers = require("@babel/helpers");
const babel = require("@babel/core");
const template = require("@babel/template");
const t = require("@babel/types");

const transformRuntime = require("@babel/plugin-transform-runtime");
const corejs2Definitions = require("@babel/plugin-transform-runtime").definitions;

const runtimeRoot = path.resolve(__dirname, "..");

writeCoreJS2(runtimeRoot);

writeHelpers(runtimeRoot, { esm: false, corejs2: false });
writeHelpers(runtimeRoot, { esm: false, corejs2: true });
writeHelpers(runtimeRoot, { esm: true, corejs2: false });
writeHelpers(runtimeRoot, { esm: true, corejs2: true });

function writeCoreJS2(pkgDirname) {
  const paths = ["is-iterable", "get-iterator"];

  Object.keys(corejs2Definitions.builtins).forEach(key => {
    const path = corejs2Definitions.builtins[key];
    paths.push(path);
  });

  Object.keys(corejs2Definitions.methods).forEach(key => {
    const props = corejs2Definitions.methods[key];
    Object.keys(props).forEach(key2 => {
      paths.push(props[key2]);
    });
  });

  paths.forEach(function(corePath) {
    outputFile(
      path.join(pkgDirname, "core-js", `${corePath}.js`),
      `module.exports = require("core-js/library/fn/${corePath}");`
    );
  });
}

function writeHelpers(pkgDirname, { esm, corejs2 }) {
  for (const helperName of helpers.list) {
    const helperFilename = path.join(
      pkgDirname,
      "helpers",
      corejs2 ? "" : "builtin",
      esm ? "es6" : "",
      `${helperName}.js`
    );

    outputFile(
      helperFilename,
      buildHelper(pkgDirname, helperFilename, helperName, { esm, corejs2 })
    );
  }
}

function buildHelper(pkgDirname, helperFilename, helperName, { esm, corejs2 }) {
  const tree = t.program([], [], esm ? "module" : "script");
  const dependencies = {};
  let bindings = null;

  if (!esm) {
    bindings = [];
    for (const dep of helpers.getDependencies(helperName)) {
      const id = (dependencies[dep] = t.identifier(t.toIdentifier(dep)));
      tree.body.push(template.statement.ast`
        var ${id} = require("${`./${dep}`}");
      `);
      bindings.push(id.name);
    }
  }

  const helper = helpers.get(
    helperName,
    dep => dependencies[dep],
    esm ? null : template.expression.ast`module.exports`,
    bindings
  );
  tree.body.push(...helper.nodes);

  return babel.transformFromAst(tree, null, {
    presets: [[require("@babel/preset-env"), { modules: false }]],
    plugins: [
      [transformRuntime, { useBuiltIns: !corejs2, useESModules: esm }],
      buildRuntimeRewritePlugin(
        path.relative(path.dirname(helperFilename), pkgDirname),
        helperName
      ),
    ],
  }).code;
}

function buildRuntimeRewritePlugin(relativePath, helperName) {
  function adjustImportPath(node, relativePath) {
    node.value =
      helpers.list.indexOf(node.value) !== -1
        ? `./${node.value}`
        : node.value.replace(/^@babel\/runtime/, relativePath);
  }

  return {
    pre(file) {
      const original = file.get("helperGenerator");
      file.set("helperGenerator", name => {
        // make sure that helpers won't insert circular references to themselves
        if (name === helperName) return false;

        return original(name);
      });
    },
    visitor: {
      ImportDeclaration(path) {
        adjustImportPath(path.get("source").node, relativePath);
      },
      CallExpression(path) {
        if (
          !path.get("callee").isIdentifier({ name: "require" }) ||
          path.get("arguments").length !== 1 ||
          !path.get("arguments")[0].isStringLiteral()
        ) {
          return;
        }

        // replace any reference to @babel/runtime and other helpers
        // with a relative path
        adjustImportPath(path.get("arguments")[0].node, relativePath);
      },
    },
  };
}
