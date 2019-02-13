"use strict";

const path = require("path");
const outputFile = require("output-file-sync");
const helpers = require("@babel/helpers");
const babel = require("@babel/core");
const template = require("@babel/template");
const t = require("@babel/types");

const transformRuntime = require("../");
const transformMemberExpressionLiterals = require("@babel/plugin-transform-member-expression-literals");
const transformPropertyLiterals = require("@babel/plugin-transform-property-literals");

const corejs2Definitions = require("../lib/runtime-corejs2-definitions").default();
const corejs3Definitions = require("../lib/runtime-corejs3-definitions").default();

writeHelpers("@babel/runtime");

writeCoreJS2("@babel/runtime-corejs2");
writeHelpers("@babel/runtime-corejs2", { corejs: 2 });

writeCoreJS3("@babel/runtime-corejs3", { proposals: false });
writeCoreJS3("@babel/runtime-corejs3", { proposals: true });
writeHelpers("@babel/runtime-corejs3", { corejs: 3, proposals: true });

function writeCoreJS2(runtimeName) {
  const pkgDirname = getRuntimeRoot(runtimeName);

  const paths = [
    "is-iterable",
    "get-iterator",

    // This was previously in definitions, but was removed to work around
    // zloirock/core-js#262. We need to keep it in @babel/runtime-corejs2 to
    // avoid a breaking change there.
    "symbol/async-iterator",
  ];

  Object.keys(corejs2Definitions.BuiltIns).forEach(key => {
    const path = corejs2Definitions.BuiltIns[key].path;
    paths.push(path);
  });

  Object.keys(corejs2Definitions.StaticProperties).forEach(key => {
    const props = corejs2Definitions.StaticProperties[key];
    Object.keys(props).forEach(key2 => {
      paths.push(props[key2].path);
    });
  });

  paths.forEach(function(corejsPath) {
    outputFile(
      path.join(pkgDirname, "core-js", `${corejsPath}.js`),
      `module.exports = require("core-js/library/fn/${corejsPath}");`
    );
  });
}

function writeCoreJS3(runtimeName, { proposals }) {
  const pkgDirname = getRuntimeRoot(runtimeName);

  const paths = proposals
    ? ["is-iterable", "get-iterator", "get-iterator-method"]
    : [];

  Object.keys(corejs3Definitions.BuiltIns).forEach(key => {
    const builtin = corejs3Definitions.BuiltIns[key];
    if (builtin.stable || proposals) paths.push(builtin.path);
  });

  Object.keys(corejs3Definitions.StaticProperties).forEach(key => {
    const props = corejs3Definitions.StaticProperties[key];
    Object.keys(props).forEach(key2 => {
      const builtin = props[key2];
      if (builtin.stable || proposals) paths.push(builtin.path);
    });
  });

  Object.keys(corejs3Definitions.InstanceProperties).forEach(key => {
    const builtin = corejs3Definitions.InstanceProperties[key];
    if (builtin.stable || proposals) paths.push(`instance/${builtin.path}`);
  });

  const runtimeRoot = proposals ? "core-js" : "core-js-stable";
  const corejsRoot = proposals ? "features" : "stable";
  paths.forEach(function(corejsPath) {
    outputFile(
      path.join(pkgDirname, runtimeRoot, `${corejsPath}.js`),
      `module.exports = require("core-js-pure/${corejsRoot}/${corejsPath}");`
    );
  });
}

function writeHelpers(runtimeName, { corejs } = {}) {
  writeHelperFiles(runtimeName, { corejs, esm: false });
  writeHelperFiles(runtimeName, { corejs, esm: true });
}

function writeHelperFiles(runtimeName, { esm, corejs }) {
  const pkgDirname = getRuntimeRoot(runtimeName);

  for (const helperName of helpers.list) {
    const helperFilename = path.join(
      pkgDirname,
      "helpers",
      esm ? "esm" : "",
      `${helperName}.js`
    );

    outputFile(
      helperFilename,
      buildHelper(runtimeName, pkgDirname, helperFilename, helperName, {
        esm,
        corejs,
      })
    );
  }
}

function getRuntimeRoot(runtimeName) {
  return path.resolve(
    __dirname,
    "..",
    "..",
    runtimeName.replace(/^@babel\//, "babel-")
  );
}

function buildHelper(
  runtimeName,
  pkgDirname,
  helperFilename,
  helperName,
  { esm, corejs }
) {
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
      [transformRuntime, { corejs, useESModules: esm }],
      [transformMemberExpressionLiterals],
      [transformPropertyLiterals],
      buildRuntimeRewritePlugin(
        runtimeName,
        path.relative(path.dirname(helperFilename), pkgDirname),
        helperName
      ),
    ],
  }).code;
}

function buildRuntimeRewritePlugin(runtimeName, relativePath, helperName) {
  function adjustImportPath(node, relativePath) {
    node.value =
      helpers.list.indexOf(node.value) !== -1
        ? `./${node.value}`
        : node.value.replace(runtimeName + "/", relativePath + "/");
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
