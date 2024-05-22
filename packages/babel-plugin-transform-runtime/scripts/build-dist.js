import path from "path";
import fs from "fs";
import { createRequire } from "module";
import * as helpers from "@babel/helpers";
import { transformFromAstSync, template, types as t } from "@babel/core";
import { fileURLToPath } from "url";

import transformRuntime from "../lib/index.js";
import corejs2Definitions from "./runtime-corejs2-definitions.js";
import corejs3Definitions from "./runtime-corejs3-definitions.js";

import presetEnv from "@babel/preset-env";
import polyfillCorejs2 from "babel-plugin-polyfill-corejs2";
import polyfillCorejs3 from "babel-plugin-polyfill-corejs3";

const require = createRequire(import.meta.url);
const runtimeVersion = require("@babel/runtime/package.json").version;

const importTemplate = template.statement({ sourceType: "module" })(`
  import ID from "SOURCE";
`);
const requireTemplate = template.statement(`
  const ID = require("SOURCE");
`);

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  return Boolean(value) && value !== "false" && value !== "0";
}

function outputFile(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
}

function corejsVersion(pkgName, depName) {
  return require(`../../${pkgName}/package.json`).dependencies[depName];
}

writeHelpers("@babel/runtime");
if (!bool(process.env.BABEL_8_BREAKING)) {
  writeHelpers("@babel/runtime-corejs2", {
    polyfillProvider: [
      polyfillCorejs2,
      {
        method: "usage-pure",
        version: corejsVersion("babel-runtime-corejs2", "core-js"),
      },
    ],
  });
}
writeHelpers("@babel/runtime-corejs3", {
  polyfillProvider: [
    polyfillCorejs3,
    {
      method: "usage-pure",
      version: corejsVersion("babel-runtime-corejs3", "core-js-pure"),
      proposals: true,
    },
  ],
});

if (!bool(process.env.BABEL_8_BREAKING)) {
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
    // Node < 17
    exports[`./${runtimeRoot}/`] = `./${runtimeRoot}/`;
    // Node >= 17
    exports[`./${runtimeRoot}/*.js`] = `./${runtimeRoot}/*.js`;
    for (const corejsPath of paths) {
      // Export `./core-js/some-feature` so `import "@babel/runtime-corejs3/core-js/some-feature"` also works
      const corejsExportPath = `./${runtimeRoot}/${corejsPath}`;
      exports[corejsExportPath] = corejsExportPath + ".js";
    }
    pkgJson.exports = exports;
    outputFile(pkgJsonPath, JSON.stringify(pkgJson, undefined, 2) + "\n");
  }
}

function writeHelperFile(
  runtimeName,
  pkgDirname,
  helperPath,
  helperName,
  { esm, polyfillProvider }
) {
  const fileName = `${helperName}.js`;
  const filePath = esm
    ? path.join("helpers", "esm", fileName)
    : path.join("helpers", fileName);
  const fullPath = path.join(pkgDirname, filePath);

  outputFile(
    fullPath,
    buildHelper(runtimeName, fullPath, helperName, {
      esm,
      polyfillProvider,
    })
  );

  return esm ? `./helpers/esm/${fileName}` : `./helpers/${fileName}`;
}

function writeHelpers(runtimeName, { polyfillProvider } = {}) {
  const pkgDirname = getRuntimeRoot(runtimeName);
  const helperSubExports = {};
  for (const helperName of helpers.list) {
    const helperPath = path.join("helpers", helperName);
    const cjs = writeHelperFile(
      runtimeName,
      pkgDirname,
      helperPath,
      helperName,
      { esm: false, polyfillProvider }
    );
    const esm = writeHelperFile(
      runtimeName,
      pkgDirname,
      helperPath,
      helperName,
      { esm: true, polyfillProvider }
    );

    if (bool(process.env.BABEL_8_BREAKING)) {
      // Note: This does not work in Node.js 13.0 and 13.1, which support
      // the `exports` field only as strings and not as objects.
      // For other Node.js versions:
      // - <13.0.0 does not support `exports` at all, so
      //   @babel/runtime/helpers/foo will automatically resolve to
      //   @babel/runtime/helpers/foo.js
      // - >=13.2.0 < 13.7.0 ignore the `node` and `import` conditions, so
      //   they will always fallback to `default` and correctly load the
      //   CJS helper.
      // - Node.js >=13.7.0 and bundlers will successfully parse `conditions`
      //    * Node.js will always load the CJS file
      //    * Modern tools when using "import" will load the ESM file
      //    * Tools when using require() will load the CJS file
      helperSubExports[`./${path.posix.join("helpers", helperName)}`] = {
        node: cjs,
        import: esm,
        default: cjs,
      };
    } else {
      // Node.js versions >=13.0.0, <13.7.0 support the `exports` field but
      // not conditional exports (`require`/`node`/`default`)
      // We can specify exports with an array of fallbacks:
      // - Node.js >=13.7.0 and bundlers will successfully load the first
      //   array entry:
      //    * Node.js will always load the CJS file
      //    * Modern tools when using "import" will load the ESM file
      //    * Everything else (old tools, or require() in tools) will
      //      load the CJS file
      // - Node.js 13.2-13.7 will ignore the "node" and "import" conditions,
      //   will fallback to "default" and load the CJS file
      // - Node.js <13.2.0 will fail resolving the first array entry, and will
      //   fallback to the second entry (the CJS file)
      // In Babel 8 we can simplify this.
      helperSubExports[`./${path.posix.join("helpers", helperName)}`] = [
        { node: cjs, import: esm, default: cjs },
        cjs,
      ];
      // This is needed for backwards compatibility, but new versions of Babel
      // do not emit imports to the /esm/ directory anymore.
      helperSubExports[`./${path.posix.join("helpers", "esm", helperName)}`] =
        esm;
    }
  }

  writeHelperExports(runtimeName, helperSubExports);
}

function writeHelperExports(runtimeName, helperSubExports) {
  const exports = {
    ...helperSubExports,
    "./package": "./package.json",
    "./package.json": "./package.json",
  };
  if (!bool(process.env.BABEL_8_BREAKING)) {
    Object.assign(exports, {
      "./regenerator": "./regenerator/index.js",
      "./regenerator/*.js": "./regenerator/*.js",
      // These patterns are deprecated, but since patterns
      // containing * are not supported in every Node.js
      // version we keep them for better compatibility.
      // For node < 17
      "./regenerator/": "./regenerator/",
    });
  }
  const pkgDirname = getRuntimeRoot(runtimeName);
  const pkgJsonPath = require.resolve(`${pkgDirname}/package.json`);
  const pkgJson = require(pkgJsonPath);
  pkgJson.exports = exports;
  outputFile(pkgJsonPath, JSON.stringify(pkgJson, undefined, 2) + "\n");
}

function getRuntimeRoot(runtimeName) {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    runtimeName.replace(/^@babel\//, "babel-")
  );
}

function adjustEsmHelperAst(ast, exportName) {
  ast.body.push(
    template.statement({ sourceType: "module" }).ast`
      export { ${t.identifier(exportName)} as default };
    `
  );
}
function adjustCjsHelperAst(ast, exportName, mapExportBindingAssignments) {
  mapExportBindingAssignments(
    node => template.expression.ast`module.exports = ${node}`
  );
  ast.body.push(
    template.statement.ast`
      module.exports = ${t.identifier(exportName)};
    `
  );
}

function buildHelper(
  runtimeName,
  helperFilename,
  helperName,
  { esm, polyfillProvider }
) {
  const tree = t.program([], [], esm ? "module" : "script");
  const dependencies = {};
  const bindings = [];

  const depTemplate = esm ? importTemplate : requireTemplate;
  for (const dep of helpers.getDependencies(helperName)) {
    const id = (dependencies[dep] = t.identifier(t.toIdentifier(dep)));
    tree.body.push(depTemplate({ ID: id, SOURCE: dep }));
    bindings.push(id.name);
  }

  const helper = helpers.get(
    helperName,
    dep => dependencies[dep],
    null,
    bindings,
    esm ? adjustEsmHelperAst : adjustCjsHelperAst
  );
  tree.body.push(...helper.nodes);

  return transformFromAstSync(tree, null, {
    filename: helperFilename,
    presets: [[presetEnv, { modules: false }]],
    plugins: [
      polyfillProvider,
      [transformRuntime, { version: runtimeVersion }],
      buildRuntimeRewritePlugin(runtimeName, helperName),
      esm ? null : addDefaultCJSExport,
    ].filter(Boolean),
  }).code;
}

function buildRuntimeRewritePlugin(runtimeName, helperName) {
  /**
   * Rewrite helper imports to load the adequate module format version
   * @example
   * adjustImportPath(ast`"setPrototypeOf"`)
   * // returns ast`"./setPrototypeOf"`
   * @example
   * adjustImportPath(ast`"@babel/runtime/helpers/typeof"`)
   * // returns ast`"./typeof"`
   * @param {*} node The string literal that contains the import path
   */
  function adjustImportPath(node) {
    const helpersPath = path.posix.join(runtimeName, "helpers");
    const helper = node.value.startsWith(helpersPath)
      ? path.basename(node.value)
      : node.value;

    if (helpers.list.includes(helper)) {
      node.value = `./${helper}.js`;
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

function addDefaultCJSExport({ template }) {
  const transformed = new WeakSet();

  return {
    visitor: {
      AssignmentExpression: {
        exit(path) {
          if (path.get("left").matchesPattern("module.exports")) {
            if (transformed.has(path.node)) return;
            transformed.add(path.node);

            // Ensure that the completion value is still `module.exports`.
            // This would be guaranteed by `insertAfter`, but by using `replaceWith`
            // we can do it by putting `module.exports` last so that we don't need
            // to inject temporary variables.
            path.replaceWith(template.expression.ast`
              ${path.node},
              module.exports.__esModule = true,
              module.exports.default = module.exports
            `);
          }
        },
      },
    },
  };
}
