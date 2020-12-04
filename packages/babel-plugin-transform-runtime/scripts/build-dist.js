"use strict";

const path = require("path");
const fs = require("fs");
const helpers = require("@babel/helpers");
const babel = require("@babel/core");
const template = require("@babel/template");
const t = require("@babel/types");

const transformRuntime = require("../");

const runtimeVersion = require("@babel/runtime/package.json").version;
const corejs2Definitions = require("../lib/runtime-corejs2-definitions").default();
const corejs3Definitions = require("../lib/runtime-corejs3-definitions").default();

function outputFile(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
}

writeHelpers("@babel/runtime");
writeHelpers("@babel/runtime-corejs2", { corejs: 2 });
writeHelpers("@babel/runtime-corejs3", {
  corejs: { version: 3, proposals: true },
});

writeCoreJS({
  corejs: 2,
  proposals: true,
  definitions: corejs2Definitions,
  paths: [
    "is-iterable",
    "get-iterator",
    // This was previously in definitions, but was removed to work around
    // zloirock/core-js#262. We need to keep it in @babel/runtime-corejs2 to
    // avoid a breaking change there.
    "symbol/async-iterator",
  ],
  corejsRoot: "core-js/library/fn",
});
writeCoreJS({
  corejs: 3,
  proposals: false,
  definitions: corejs3Definitions,
  paths: [],
  corejsRoot: "core-js-pure/stable",
});
writeCoreJS({
  corejs: 3,
  proposals: true,
  definitions: corejs3Definitions,
  paths: ["is-iterable", "get-iterator", "get-iterator-method"],
  corejsRoot: "core-js-pure/features",
});

function writeCoreJS({
  corejs,
  proposals,
  definitions: { BuiltIns, StaticProperties, InstanceProperties },
  paths,
  corejsRoot,
}) {
  const pkgDirname = getRuntimeRoot(`@babel/runtime-corejs${corejs}`);

  Object.keys(BuiltIns).forEach(name => {
    const { stable, path } = BuiltIns[name];
    if (stable || proposals) paths.push(path);
  });

  Object.keys(StaticProperties).forEach(builtin => {
    const props = StaticProperties[builtin];
    Object.keys(props).forEach(name => {
      const { stable, path } = props[name];
      if (stable || proposals) paths.push(path);
    });
  });

  if (InstanceProperties) {
    Object.keys(InstanceProperties).forEach(name => {
      const { stable, path } = InstanceProperties[name];
      if (stable || proposals) paths.push(`instance/${path}`);
    });
  }

  const runtimeRoot = proposals ? "core-js" : "core-js-stable";
  paths.forEach(function (corejsPath) {
    outputFile(
      path.join(pkgDirname, runtimeRoot, `${corejsPath}.js`),
      `module.exports = require("${corejsRoot}/${corejsPath}");`
    );
  });

  writeCorejsExports(pkgDirname, runtimeRoot, paths);
}

function writeCorejsExports(pkgDirname, runtimeRoot, paths) {
  const pkgJsonPath = require.resolve(`${pkgDirname}/package.json`);
  const pkgJson = require(pkgJsonPath);
  const exports = pkgJson.exports;
  // Export `./core-js/` so `import "@babel/runtime-corejs3/core-js/some-feature.js"` works
  exports[`./${runtimeRoot}/`] = `./${runtimeRoot}/`;
  for (const corejsPath of paths) {
    // Export `./core-js/some-feature` so `import "@babel/runtime-corejs3/core-js/some-feature"` also works
    const corejsExportPath = `./${runtimeRoot}/${corejsPath}`;
    exports[corejsExportPath] = corejsExportPath + ".js";
  }
  pkgJson.exports = exports;
  outputFile(pkgJsonPath, JSON.stringify(pkgJson, undefined, 2) + "\n");
}

function writeHelpers(runtimeName, { corejs } = {}) {
  const helperPaths = writeHelperFiles(runtimeName, { corejs, esm: false });
  const helperESMPaths = writeHelperFiles(runtimeName, { corejs, esm: true });
  writeHelperExports(runtimeName, helperPaths.concat(helperESMPaths));
}

function writeHelperExports(runtimeName, helperPaths) {
  const helperSubExports = {};
  for (const helperPath of helperPaths) {
    helperSubExports[helperPath.replace(".js", "")] = helperPath;
  }
  const exports = {
    "./helpers/": "./helpers/",
    ...helperSubExports,
    "./package": "./package.json",
    "./package.json": "./package.json",
    "./regenerator": "./regenerator/index.js",
    "./regenerator/": "./regenerator/",
  };
  const pkgDirname = getRuntimeRoot(runtimeName);
  const pkgJsonPath = require.resolve(`${pkgDirname}/package.json`);
  const pkgJson = require(pkgJsonPath);
  pkgJson.exports = exports;
  outputFile(pkgJsonPath, JSON.stringify(pkgJson, undefined, 2) + "\n");
}
function writeHelperFiles(runtimeName, { esm, corejs }) {
  const pkgDirname = getRuntimeRoot(runtimeName);
  const helperPaths = [];
  for (const helperName of helpers.list) {
    const helperPath =
      "./" + path.join("helpers", esm ? "esm" : "", `${helperName}.js`);
    const helperFilename = path.join(pkgDirname, helperPath);
    outputFile(
      helperFilename,
      buildHelper(runtimeName, pkgDirname, helperFilename, helperName, {
        esm,
        corejs,
      })
    );

    helperPaths.push(helperPath);
  }

  return helperPaths;
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
    helpers.ensure(helperName, babel.File);
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
    filename: helperFilename,
    presets: [
      [
        "@babel/preset-env",
        { modules: false, exclude: ["@babel/plugin-transform-typeof-symbol"] },
      ],
    ],
    plugins: [
      [
        transformRuntime,
        { corejs, useESModules: esm, version: runtimeVersion },
      ],
      buildRuntimeRewritePlugin(runtimeName, helperName, esm),
    ],
    overrides: [
      {
        exclude: /typeof/,
        plugins: ["@babel/plugin-transform-typeof-symbol"],
      },
    ],
  }).code;
}

function buildRuntimeRewritePlugin(runtimeName, helperName, esm) {
  const helperPath = esm ? "helpers/esm" : "helpers";
  /**
   * rewrite helpers imports to runtime imports
   * @example
   * adjustImportPath(ast`"setPrototypeOf"`)
   * // returns ast`"@babel/runtime/helpers/esm/setPrototypeOf"`
   * @param {*} node The string literal contains import path
   */
  function adjustImportPath(node) {
    if (helpers.list.includes(node.value)) {
      node.value = `${runtimeName}/${helperPath}/${node.value}`;
    }
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
        adjustImportPath(path.get("source").node);
      },
      CallExpression(path) {
        if (
          !path.get("callee").isIdentifier({ name: "require" }) ||
          path.get("arguments").length !== 1 ||
          !path.get("arguments")[0].isStringLiteral()
        ) {
          return;
        }

        // replace reference to internal helpers with @babel/runtime import path
        adjustImportPath(path.get("arguments")[0].node);
      },
    },
  };
}
