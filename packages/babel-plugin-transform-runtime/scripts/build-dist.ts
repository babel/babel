import path from "node:path";
import fs from "node:fs";
import * as helpers from "@babel/helpers";
import { transformFromAstSync, template, types as t } from "@babel/core";
import { fileURLToPath } from "node:url";

// @ts-expect-error Can not find typings for the built JS file
import transformRuntime from "../lib/index.js";

import runtimePackageJson from "@babel/runtime/package.json" with { type: "json" };

import presetEnv from "@babel/preset-env";
import polyfillCorejs3 from "babel-plugin-polyfill-corejs3";

import type { PluginObject, PluginAPI, InputOptions } from "@babel/core";

type PluginItem = NonNullable<InputOptions["plugins"]>[0];

const importTemplate = template.statement({ sourceType: "module" })(`
  import ID from "SOURCE";
`);
const requireTemplate = template.statement(`
  const ID = require("SOURCE");
`);

function outputFile(filePath: string, data: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
}

function corejsVersion(pkgName: string, depName: string) {
  return JSON.parse(
    fs.readFileSync(
      new URL(`../../${pkgName}/package.json`, import.meta.url),
      "utf-8"
    )
  ).dependencies[depName];
}

writeHelpers("@babel/runtime");
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

function writeHelperFile(
  runtimeName: string,
  pkgDirname: string,
  helperName: string,
  { esm, polyfillProvider }: { esm: boolean; polyfillProvider?: PluginItem }
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
    })!
  );

  return esm ? `./helpers/esm/${fileName}` : `./helpers/${fileName}`;
}

type SubExportItem = { node: string; import: string; default: string };
type HelperSubExports = Record<
  string,
  SubExportItem | string | [SubExportItem, string]
>;

function writeHelpers(
  runtimeName: string,
  { polyfillProvider }: { polyfillProvider?: PluginItem } = {}
) {
  const pkgDirname = getRuntimeRoot(runtimeName);
  try {
    fs.rmSync(path.join(pkgDirname, "helpers"), {
      recursive: true,
      force: true,
    });
    fs.mkdirSync(path.join(pkgDirname, "helpers/esm"), { recursive: true });
    fs.writeFileSync(
      path.join(pkgDirname, "helpers/esm/package.json"),
      JSON.stringify(
        {
          type: "module",
        },
        undefined,
        2
      )
    );
  } catch {}
  const helperSubExports: HelperSubExports = {};
  for (const helperName of helpers.list) {
    const cjs = writeHelperFile(runtimeName, pkgDirname, helperName, {
      esm: false,
      polyfillProvider,
    });
    const esm = writeHelperFile(runtimeName, pkgDirname, helperName, {
      esm: true,
      polyfillProvider,
    });

    if (helpers.isInternal(helperName)) continue;

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
  }

  writeHelperExports(runtimeName, helperSubExports);
}

function writeHelperExports(
  runtimeName: string,
  helperSubExports: HelperSubExports
) {
  const pkgDirname = getRuntimeRoot(runtimeName);
  const pkgJsonPath = path.join(pkgDirname, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  pkgJson.exports = {
    ...helperSubExports,
    "./package.json": "./package.json",
  };
  outputFile(pkgJsonPath, JSON.stringify(pkgJson, undefined, 2) + "\n");
}

function getRuntimeRoot(runtimeName: string) {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    runtimeName.replace(/^@babel\//, "babel-")
  );
}

function adjustEsmHelperAst(ast: t.Program, exportName: string) {
  ast.body.push(
    template.statement({ sourceType: "module" }).ast`
      export { ${t.identifier(exportName)} as default };
    `
  );
}
function adjustCjsHelperAst(
  ast: t.Program,
  exportName: string,
  mapExportBindingAssignments: (cb: (node: t.Node) => t.Expression) => void
) {
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
  runtimeName: string,
  helperFilename: string,
  helperName: string,
  { esm, polyfillProvider }: { esm: boolean; polyfillProvider?: PluginItem }
) {
  const tree = t.program([], [], esm ? "module" : "script");
  const dependencies: Record<string, t.Identifier> = {};
  const bindings = [];

  const depTemplate = esm ? importTemplate : requireTemplate;
  for (const dep of helpers.getDependencies(helperName)) {
    const id = (dependencies[dep] = t.identifier(t.toIdentifier(dep)));
    tree.body.push(depTemplate({ ID: id, SOURCE: dep }));
    bindings.push(id.name);
  }

  const helper = helpers.get(
    helperName,
    (dep: string) => dependencies[dep],
    undefined,
    bindings,
    esm ? adjustEsmHelperAst : adjustCjsHelperAst
  );
  tree.body.push(...helper.nodes);

  return transformFromAstSync(tree, "", {
    targets: ["ie 5.5", "ios 3.2"], // old enough to guarantee support everywhere
    filename: helperFilename,
    presets: [[presetEnv, { modules: false }]],
    plugins: [
      polyfillProvider,
      [transformRuntime, { version: runtimePackageJson.version }],
      [runtimeRewritePlugin, { runtimeName, helperName }],
      esm ? null : addDefaultCJSExport,
    ].filter(Boolean) as PluginItem[],
  })!.code;
}

function runtimeRewritePlugin(
  _api: PluginAPI,
  { runtimeName, helperName }: { runtimeName: string; helperName: string }
): PluginObject {
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
  function adjustImportPath(node: t.StringLiteral) {
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
      file.set("helperGenerator", (name: string) => {
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
          path.get("arguments").length !== 1
        ) {
          return;
        }

        const firstArg = path.get("arguments")[0];
        if (firstArg.isStringLiteral()) {
          // replace reference to internal helpers with @babel/runtime import path
          adjustImportPath(firstArg.node);
        }
      },
    },
  };
}

function addDefaultCJSExport({ template }: PluginAPI): PluginObject {
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
