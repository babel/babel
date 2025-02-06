"use strict";

let jestSnapshot = false;
if (typeof it === "function") {
  // Jest loads the Babel config to parse file and update inline snapshots.
  // This is ok, as it's not loading the Babel config to test Babel itself.
  if (!new Error().stack.includes("jest-snapshot")) {
    throw new Error("Monorepo root's babel.config.js loaded by a test.");
  }
  jestSnapshot = true;
}

const pathUtils = require("path");
const fs = require("fs");
const { parseSync } = require("@babel/core");
const packageJson = require("./package.json");
const babel7_8compat = require("./test/babel-7-8-compat/data.json");

function normalize(src) {
  return src.replace(/\//, pathUtils.sep);
}

module.exports = function (api) {
  const env = api.env();

  const outputType = api.cache.invalidate(() => {
    try {
      const type = fs.readFileSync(__dirname + "/.module-type", "utf-8").trim();
      if (type === "module") return type;
    } catch (_) {}
    return "script";
  });

  const sources = ["packages/*/src", "codemods/*/src", "eslint/*/src"];

  const envOpts = {
    shippedProposals: true,
    modules: false,
    exclude: [
      "transform-typeof-symbol",
      // We need to enable useBuiltIns
      "transform-object-rest-spread",
    ],
  };

  const presetTsOpts = {
    onlyRemoveTypeImports: true,
    optimizeConstEnums: true,
  };
  if (api.version.startsWith("7") && !bool(process.env.BABEL_8_BREAKING)) {
    presetTsOpts.allowDeclareFields = true;
  }

  // These are "safe" assumptions, that we can enable globally
  const assumptions = {
    constantSuper: true,
    ignoreFunctionLength: true,
    ignoreToPrimitiveHint: true,
    mutableTemplateObject: true,
    noClassCalls: true,
    noDocumentAll: true,
    noNewArrows: true,
    setClassMethods: true,
    setComputedProperties: true,
    setSpreadProperties: true,
    skipForOfIteratorClosing: true,
    superIsCallableConstructor: true,
  };

  // These are "less safe": we only enable them on our own code
  // and not when compiling dependencies.
  const sourceAssumptions = {
    objectRestNoSymbols: true,
    pureGetters: true,
    setPublicClassFields: true,
  };

  const parserAssumptions = {
    iterableIsArray: true,
  };

  let targets = {};
  let convertESM = outputType === "script";
  let replaceTSImportExtension = true;
  let ignoreLib = true;
  let needsPolyfillsForOldNode = false;

  const nodeVersion = bool(process.env.BABEL_8_BREAKING) ? "16.20" : "6.9";
  // The vast majority of our src files are modules, but we use
  // unambiguous to keep things simple until we get around to renaming
  // the modules to be more easily distinguished from CommonJS
  const unambiguousSources = [
    ...sources,
    "packages/*/test",
    "codemods/*/test",
    "eslint/*/test",
  ];

  const lazyRequireSources = [
    "./packages/babel-cli",
    "./packages/babel-core",
    "./packages/babel-preset-env/src/available-plugins.js",
  ];

  switch (env) {
    // Configs used during bundling builds.
    case "standalone":
      convertESM = false;
      replaceTSImportExtension = false;
      ignoreLib = false;
      // rollup-commonjs will converts node_modules to ESM
      unambiguousSources.push(
        "/**/node_modules",
        "packages/babel-preset-env/data",
        "packages/babel-compat-data",
        "packages/babel-runtime/regenerator"
      );
      targets = { ie: 7 };
      needsPolyfillsForOldNode = true;
      break;
    case "rollup":
      convertESM = false;
      replaceTSImportExtension = false;
      ignoreLib = false;
      // rollup-commonjs will converts node_modules to ESM
      unambiguousSources.push(
        "/**/node_modules",
        "packages/babel-preset-env/data",
        "packages/babel-compat-data"
      );
      targets = { node: nodeVersion };
      needsPolyfillsForOldNode = true;
      break;
    case "test-legacy": // In test-legacy environment, we build babel on latest node but test on minimum supported legacy versions
    // fall through
    case "production":
      // Config during builds before publish.
      targets = { node: nodeVersion };
      needsPolyfillsForOldNode = true;
      break;
    case "test":
      targets = { node: "current" };
      needsPolyfillsForOldNode = true;
      break;
    case "development":
      envOpts.debug = true;
      targets = { node: "current" };
      break;
  }

  if (process.env.STRIP_BABEL_8_FLAG && bool(process.env.BABEL_8_BREAKING)) {
    // Never apply polyfills when compiling for Babel 8
    needsPolyfillsForOldNode = false;
  }

  const config = {
    targets,
    assumptions,
    babelrc: false,
    browserslistConfigFile: false,

    // Our dependencies are all standard CommonJS, along with all sorts of
    // other random files in Babel's codebase, so we use script as the default,
    // and then mark actual modules as modules farther down.
    sourceType: "script",
    comments: false,
    ignore: [
      // These may not be strictly necessary with the newly-limited scope of
      // babelrc searching, but including them for now because we had them
      // in our .babelignore before.
      "packages/*/test/fixtures",
      ignoreLib ? "packages/*/lib" : null,
      "packages/babel-standalone/babel.js",
    ]
      .filter(Boolean)
      .map(normalize),
    parserOpts: {
      createImportExpressions: true,
    },
    presets: [
      // presets are applied from right to left
      ["@babel/env", envOpts],
      ["@babel/preset-typescript", presetTsOpts],
    ],
    plugins: [
      ["@babel/transform-object-rest-spread", { useBuiltIns: true }],

      convertESM ? "@babel/transform-export-namespace-from" : null,
      env !== "standalone"
        ? ["@babel/plugin-transform-json-modules", { uncheckedRequire: true }]
        : null,

      require("./scripts/babel-plugin-bit-decorator/plugin.cjs"),
    ].filter(Boolean),
    overrides: [
      {
        test: [
          "packages/babel-parser",
          "packages/babel-helper-validator-identifier",
        ].map(normalize),
        plugins: [
          "babel-plugin-transform-charcodes",
          pluginBabelParserTokenType,
        ],
        assumptions: parserAssumptions,
      },
      {
        test: [
          "packages/babel-generator",
          "packages/babel-helper-create-class-features-plugin",
          "packages/babel-helper-string-parser",
        ].map(normalize),
        plugins: ["babel-plugin-transform-charcodes"],
      },
      {
        test: ["packages/babel-generator"].map(normalize),
        plugins: [pluginGeneratorOptimization],
      },
      convertESM && {
        test: ["./packages/babel-node/src"].map(normalize),
        // Used to conditionally import kexec
        plugins: ["@babel/plugin-transform-dynamic-import"],
      },
      {
        test: sources.map(normalize),
        assumptions: sourceAssumptions,
        plugins: [
          transformNamedBabelTypesImportToDestructuring,
          replaceTSImportExtension ? pluginReplaceTSImportExtension : null,

          [
            pluginToggleBooleanFlag,
            { name: "USE_ESM", value: outputType === "module" },
            "flag-USE_ESM",
          ],
          [
            pluginToggleBooleanFlag,
            { name: "IS_STANDALONE", value: env === "standalone" },
            "flag-IS_STANDALONE",
          ],
          [
            pluginToggleBooleanFlag,
            {
              name: "process.env.IS_PUBLISH",
              value: bool(process.env.IS_PUBLISH),
            },
            "flag-IS_PUBLISH",
          ],

          [
            pluginToggleBooleanFlag,
            {
              name: "process.env.BABEL_8_BREAKING",
              value: process.env.STRIP_BABEL_8_FLAG
                ? bool(process.env.BABEL_8_BREAKING)
                : null,
            },
            "flag-BABEL_8_BREAKING",
          ],

          pluginPackageJsonMacro,

          [
            pluginRequiredVersionMacro,
            {
              allowAny: !process.env.IS_PUBLISH || env === "standalone",
              overwrite(requiredVersion, filename) {
                if (requiredVersion === 7) requiredVersion = "^7.0.0-0";
                if (process.env.BABEL_8_BREAKING) {
                  return packageJson.version;
                }
                const match = filename.match(/packages[\\/](.+?)[\\/]/);
                if (
                  match &&
                  babel7_8compat["babel7plugins-babel8core"].includes(match[1])
                ) {
                  return `${requiredVersion} || >8.0.0-alpha <8.0.0-beta`;
                }
              },
            },
          ],

          needsPolyfillsForOldNode && pluginPolyfillsOldNode,
        ].filter(Boolean),
      },
      convertESM && {
        test: lazyRequireSources.map(normalize),
        plugins: [
          // Explicitly use the lazy version of CommonJS modules.
          [
            "@babel/transform-modules-commonjs",
            { importInterop: importInteropSrc, lazy: true },
          ],
        ],
      },
      convertESM && {
        test: ["./packages/babel-core/src"].map(normalize),
        plugins: [
          [
            pluginInjectNodeReexportsHints,
            { names: ["types", "tokTypes", "traverse", "template"] },
          ],
        ],
      },
      convertESM && {
        test: sources.map(normalize),
        exclude: lazyRequireSources.map(normalize),
        plugins: [
          [
            "@babel/transform-modules-commonjs",
            { importInterop: importInteropSrc },
          ],
        ],
      },
      convertESM && {
        exclude: [
          "./packages/babel-core/src/config/files/import-meta-resolve.ts",
        ].map(normalize),
        plugins: [pluginImportMetaUrl],
      },
      {
        test: sources.map(source => normalize(source.replace("/src", "/test"))),
        plugins: [
          [
            "@babel/transform-modules-commonjs",
            { importInterop: importInteropTest },
          ],
          "@babel/plugin-transform-dynamic-import",
        ],
      },
      {
        test: unambiguousSources.map(normalize),
        sourceType: "unambiguous",
      },
    ].filter(Boolean),
  };

  if (jestSnapshot) {
    config.plugins = [];
    config.presets = [];
    config.overrides = [];
    config.parserOpts = {
      plugins: ["typescript"],
    };
    config.sourceType = "unambiguous";
  }

  return config;
};

let monorepoPackages;
function getMonorepoPackages() {
  if (!monorepoPackages) {
    monorepoPackages = ["codemods", "eslint", "packages"]
      .map(folder => fs.readdirSync(__dirname + "/" + folder))
      .reduce((a, b) => a.concat(b))
      .map(name => name.replace(/^babel-/, "@babel/"));
  }
  return monorepoPackages;
}

function importInteropSrc(source, filename) {
  if (
    // These internal files are "real CJS" (whose default export is
    // on module.exports) and not compiled ESM.
    source.startsWith("@babel/compat-data/") ||
    source.includes("babel-eslint-shared-fixtures/utils") ||
    (source.includes("../data/") &&
      /babel-preset-env[\\/]src[\\/]/.test(filename)) ||
    // For JSON modules, the default export is the whole module
    source.endsWith(".json")
  ) {
    return "node";
  }
  if (
    (source[0] === "." && !source.endsWith(".cjs")) ||
    getMonorepoPackages().some(name => source.startsWith(name))
  ) {
    // We don't need to worry about interop for internal files, since we know
    // for sure that they are ESM modules compiled to CJS
    return "none";
  }

  // For external modules, we want to match the Node.js behavior
  return "node";
}

function importInteropTest(source) {
  // This file will soon have an esm entrypoint
  if (source === "@babel/helper-plugin-test-runner") {
    return "none";
  }
  if (
    // non-test files
    !source.startsWith(".") ||
    // lib files
    /(?:\.\.\/)+(?:babel-[a-z-]+\/)?lib/.test(source)
  ) {
    return "node";
  }
  return "babel";
}

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  return Boolean(value) && value !== "false" && value !== "0";
}

// A minimum semver GTE implementation
// Limitation:
// - it only supports comparing major and minor version, assuming Node.js will never ship
//   features in patch release so we will never need to compare a version with "1.2.3"
//
// @example
// semverGte("8.10", "8.9") // true
// semverGte("8.9", "8.9") // true
// semverGte("9.0", "8.9") // true
// semverGte("8.9", "8.10") // false
// TODO: figure out how to inject it to the `@babel/template` usage so we don't need to
// copy and paste it.
// `((v,w)=>(v=v.split("."),w=w.split("."),+v[0]>+w[0]||v[0]==w[0]&&+v[1]>=+w[1]))`;

/** @param {import("@babel/core")} api */
function pluginPolyfillsOldNode({ template, types: t }) {
  const polyfills = [
    {
      name: "require.resolve",
      necessary({ node, parent }) {
        return (
          t.isCallExpression(parent, { callee: node }) &&
          parent.arguments.length > 1
        );
      },
      supported({ parent: { arguments: args } }) {
        return (
          t.isObjectExpression(args[1]) &&
          args[1].properties.length === 1 &&
          t.isIdentifier(args[1].properties[0].key, { name: "paths" }) &&
          t.isArrayExpression(args[1].properties[0].value) &&
          args[1].properties[0].value.elements.length === 1
        );
      },
      // require.resolve's paths option has been introduced in Node.js 8.9
      // https://nodejs.org/api/modules.html#modules_require_resolve_request_options
      replacement: template({ syntacticPlaceholders: true })`
        ((v,w)=>(v=v.split("."),w=w.split("."),+v[0]>+w[0]||v[0]==w[0]&&+v[1]>=+w[1]))(process.versions.node, "8.9")
          ? require.resolve
          : (/* request */ r, { paths: [/* base */ b] }, M = require("module")) => {
              let /* filename */ f = M._findPath(r, M._nodeModulePaths(b).concat(b));
              if (f) return f;
              f = new Error(\`Cannot resolve module '\${r}'\`);
              f.code = "MODULE_NOT_FOUND";
              throw f;
            }
      `,
    },
    {
      // NOTE: This polyfills depends on the "make-dir" library. Any package
      // using fs.mkdirSync must have "make-dir" as a dependency.
      name: "fs.mkdirSync",
      necessary({ node, parent }) {
        return (
          t.isCallExpression(parent, { callee: node }) &&
          parent.arguments.length > 1
        );
      },
      supported({ parent: { arguments: args } }) {
        return (
          t.isObjectExpression(args[1]) &&
          args[1].properties.length === 1 &&
          t.isIdentifier(args[1].properties[0].key, { name: "recursive" }) &&
          t.isBooleanLiteral(args[1].properties[0].value, { value: true })
        );
      },
      // fs.mkdirSync's recursive option has been introduced in Node.js 10.12
      // https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_options
      replacement: template`
        ((v,w)=>(v=v.split("."),w=w.split("."),+v[0]>+w[0]||v[0]==w[0]&&+v[1]>=+w[1]))(process.versions.node, "10.12")
          ? fs.mkdirSync
          : require("make-dir").sync
      `,
    },
    {
      // NOTE: This polyfills depends on the "node-environment-flags"
      // library. Any package using process.allowedNodeEnvironmentFlags
      // must have "node-environment-flags" as a dependency.
      name: "process.allowedNodeEnvironmentFlags",
      necessary({ parent, node }) {
        // To avoid infinite replacement loops
        return !t.isLogicalExpression(parent, { operator: "||", left: node });
      },
      supported: () => true,
      // process.allowedNodeEnvironmentFlags has been introduced in Node.js 10.10
      // https://nodejs.org/api/process.html#process_process_allowednodeenvironmentflags
      replacement: template`
        process.allowedNodeEnvironmentFlags || require("node-environment-flags")
      `,
    },
    {
      name: "Object.hasOwn",
      necessary: () => true,
      supported: path =>
        path.parentPath.isCallExpression({ callee: path.node }),
      // Object.hasOwn has been introduced in Node.js 16.9.0
      // https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V16.md#v8-93
      replacement: template`hasOwnProperty.call`,
    },
    {
      name: "Object.entries",
      necessary({ parent, node }) {
        // To avoid infinite replacement loops
        return !t.isLogicalExpression(parent, { operator: "||", left: node });
      },
      supported: path =>
        path.parentPath.isCallExpression({ callee: path.node }),
      replacement: template`Object.entries || (o => Object.keys(o).map(k => [k, o[k]]))`,
    },
    {
      name: "fs.rmSync",
      necessary({ node, parent }) {
        // To avoid infinite replacement loops
        return !t.isLogicalExpression(parent, { operator: "||", left: node });
      },
      supported({ parent: { arguments: args } }) {
        return (
          t.isObjectExpression(args[1]) &&
          args[1].properties.length === 2 &&
          t.isIdentifier(args[1].properties[0].key, { name: "force" }) &&
          t.isBooleanLiteral(args[1].properties[0].value, { value: true }) &&
          t.isIdentifier(args[1].properties[1].key, { name: "recursive" }) &&
          t.isBooleanLiteral(args[1].properties[1].value, { value: true })
        );
      },
      // fs.rmSync has been introduced in Node.js 14.14
      // https://nodejs.org/api/fs.html#fsrmsyncpath-options
      replacement: template`
        fs.rmSync || function d(/* path */ p) {
            if (fs.existsSync(p)) {
              fs.readdirSync(p).forEach(function (f) {
                const /* currentPath */ c = p + "/" + f;
                if (fs.lstatSync(c).isDirectory()) {
                  d(c);
                } else {
                  fs.unlinkSync(c);
                }
              });
              fs.rmdirSync(p);
            }
          }
      `,
    },
  ];

  return {
    visitor: {
      MemberExpression(path) {
        for (const polyfill of polyfills) {
          if (!path.matchesPattern(polyfill.name)) continue;

          if (!polyfill.necessary(path)) return;
          if (!polyfill.supported(path)) {
            throw path.buildCodeFrameError(
              `This '${polyfill.name}' usage is not supported by the inline polyfill.\n` +
                path.parentPath.toString()
            );
          }

          path.replaceWith(polyfill.replacement());

          break;
        }
      },
    },
  };
}

/**
 * If `value` is null, it will leave the conditions in code. It will remove
 * them in attributes by replacing them with <if true> || <if false>
 *
 * @param {import("@babel/core")} pluginAPI
 * @returns {import("@babel/core").PluginObject}
 */
function pluginToggleBooleanFlag({ types: t, template }, { name, value }) {
  if (typeof value !== "boolean" && value !== null) {
    throw new Error(`.value must be a boolean, or null`);
  }

  function parseExpression(source) {
    // eslint-disable-next-line regexp/no-useless-assertions
    return template.expression(source, { placeholderPattern: /(?!.)./ })({});
  }

  /**
   * @param {import("@babel/core").types.Expression} test
   */
  function evaluate(test, value) {
    const res = {
      replace: replacement => ({ replacement, value: null, unrelated: false }),
      value: value => ({ replacement: null, value, unrelated: false }),
      unrelated: () => ({ replacement: test, value: null, unrelated: true }),
    };

    if (t.isIdentifier(test, { name }) || t.matchesPattern(test, name)) {
      return res.value(value);
    }

    if (t.isUnaryExpression(test, { operator: "!" })) {
      const arg = evaluate(test.argument, value);
      return arg.unrelated
        ? res.unrelated()
        : arg.replacement
          ? res.replacement(t.unaryExpression("!", arg.replacement))
          : res.value(!arg.value);
    }

    if (t.isLogicalExpression(test, { operator: "||" })) {
      const left = evaluate(test.left, value);
      const right = evaluate(test.right, value);

      if (left.value === true || right.value === true) return res.value(true);
      if (left.value === false && right.value === false) {
        return res.value(false);
      }
      if (left.value === false) return res.replace(right.replacement);
      if (right.value === false) return res.replace(left.replacement);
      if (left.unrelated && right.unrelated) return res.unrelated();
      return res.replace(
        t.logicalExpression("||", left.replacement, right.replacement)
      );
    }

    if (t.isLogicalExpression(test, { operator: "&&" })) {
      const left = evaluate(test.left, value);
      const right = evaluate(test.right, value);

      if (left.value === true && right.value === true) return res.value(true);
      if (left.value === false || right.value === false) {
        return res.value(false);
      }
      if (left.value === true) return res.replace(right.replacement);
      if (right.value === true) return res.replace(left.replacement);
      if (left.unrelated && right.unrelated) return res.unrelated();
      return res.replace(
        t.logicalExpression("&&", left.replacement, right.replacement)
      );
    }

    return res.unrelated();
  }

  return {
    visitor: {
      "IfStatement|ConditionalExpression"(path) {
        if (value === null) return;

        let test = path.get("test");

        // yarn-plugin-conditions injects bool(process.env.BABEL_8_BREAKING)
        // tests, to properly cast the env variable to a boolean.
        if (
          test.isCallExpression() &&
          test.get("callee").isIdentifier({ name: "bool" }) &&
          test.get("arguments").length === 1
        ) {
          test = test.get("arguments")[0];
        }

        const res = evaluate(test.node, value);

        if (res.unrelated) return;
        if (res.replacement) {
          path.get("test").replaceWith(res.replacement);
        } else {
          path.replaceWith(
            res.value
              ? path.node.consequent
              : path.node.alternate || t.emptyStatement()
          );
        }
      },
      LogicalExpression(path) {
        if (value === null) return;

        const res = evaluate(path.node, value);
        if (res.unrelated) return;
        if (res.replacement) {
          path.replaceWith(res.replacement);
        } else {
          path.replaceWith(t.booleanLiteral(res.value));
        }
      },
      MemberExpression(path) {
        if (value === null) return;

        if (path.matchesPattern(name)) {
          throw path.buildCodeFrameError("This check could not be stripped.");
        }
      },
      ReferencedIdentifier(path) {
        if (value === null) return;

        if (path.node.name === name) {
          throw path.buildCodeFrameError("This check could not be stripped.");
        }
      },
      ImportDeclaration(path) {
        if (!path.node.attributes) return;

        /** @type {null | import("@babel/core").NodePath<import("@babel/core").types.ImportAttribute>} */
        const ifAttribute = path
          .get("attributes")
          .find(attr => attr.node.key.name === "if");
        if (ifAttribute == null) {
          return;
        }

        const condition = parseExpression(ifAttribute.node.value.value);

        let res;
        res_block: if (value !== null) {
          res = evaluate(condition, value);
        } else {
          const ifTrue = evaluate(condition, true);
          if (ifTrue.unrelated || ifTrue.value === true) {
            res = ifTrue;
            break res_block;
          }
          const ifFalse = evaluate(condition, false);
          if (ifFalse.unrelated) throw new Error("Cannot be unrelated");
          if (ifFalse.value === true) {
            res = ifFalse;
            break res_block;
          }

          if (ifTrue.value === false) {
            res = ifFalse;
            break res_block;
          }
          if (ifTrue.value === false) {
            res = ifTrue;
            break res_block;
          }

          if (!ifTrue.replacement && !ifFalse.replacement) {
            throw new Error("Expected two replacements");
          }

          res = {
            replacement: t.binaryExpression(
              "||",
              ifTrue.replacement,
              ifFalse.replacement
            ),
            value: null,
            unrelated: false,
          };
        }

        if (res.unrelated) return;
        if (res.replacement) {
          ifAttribute
            .get("value")
            .replaceWith(
              t.stringLiteral(
                ifAttribute.toString.call({ node: res.replacement })
              )
            );
        } else if (res.value === true) {
          ifAttribute.remove();
          if (path.node.attributes.length === 0) {
            path.node.attributes = null;
          }
        } else if (res.value === false) {
          path.remove();
        }
      },
    },
  };
}

function pluginPackageJsonMacro({ types: t }) {
  const fnName = "PACKAGE_JSON";

  return {
    visitor: {
      ReferencedIdentifier(path) {
        if (path.isIdentifier({ name: fnName })) {
          throw path.buildCodeFrameError(
            `"${fnName}" is only supported in member expressions.`
          );
        }
      },
      MemberExpression(path) {
        if (!path.get("object").isIdentifier({ name: fnName })) return;

        if (path.node.computed) {
          throw path.buildCodeFrameError(
            `"${fnName}" does not support computed properties.`
          );
        }
        const field = path.node.property.name;

        // TODO: When dropping old Node.js versions, use require.resolve
        // instead of looping through the folders hierarchy

        let pkg;
        for (let dir = pathUtils.dirname(this.filename); ; ) {
          try {
            pkg = fs.readFileSync(pathUtils.join(dir, "package.json"), "utf8");
            break;
          } catch (_) {}

          const prev = dir;
          dir = pathUtils.resolve(dir, "..");

          // We are in the root and didn't find a package.json file
          if (dir === prev) return;
        }

        const value = JSON.parse(pkg)[field];
        path.replaceWith(t.valueToNode(value));
      },
    },
  };
}

function pluginRequiredVersionMacro({ types: t }, { allowAny, overwrite }) {
  const fnName = "REQUIRED_VERSION";

  return {
    visitor: {
      ReferencedIdentifier(path) {
        if (path.isIdentifier({ name: fnName })) {
          throw path.buildCodeFrameError(
            `"${fnName}" is only supported in call expressions.`
          );
        }
      },
      CallExpression(path) {
        if (!path.get("callee").isIdentifier({ name: fnName })) return;

        if (path.node.arguments.length !== 1) {
          throw path.buildCodeFrameError(
            `"${fnName}" expects exactly one argument.`
          );
        }

        const arg = path.get("arguments.0").evaluate().value;
        if (!arg) {
          throw path.buildCodeFrameError(
            `"${fnName}" expects a literal argument.`
          );
        }

        if (allowAny) {
          path.replaceWith(t.stringLiteral("*"));
          return;
        }

        const version = overwrite(arg, this.filename);
        if (version != null) {
          path.replaceWith(t.stringLiteral(version));
          return;
        }

        path.replaceWith(path.node.arguments[0]);
      },
    },
  };
}

// transform `import { x } from "@babel/types"` to `import * as _t from "@babel/types"; const { x } = _t;
function transformNamedBabelTypesImportToDestructuring({
  types: {
    cloneNode,
    importNamespaceSpecifier,
    objectPattern,
    objectProperty,
    variableDeclarator,
    variableDeclaration,
  },
}) {
  return {
    name: "transform-babel-types-named-imports",
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        if (
          node.importKind === "value" &&
          node.source.value === "@babel/types" &&
          node.specifiers[0].type === "ImportSpecifier"
        ) {
          const hoistedDestructuringProperties = [];
          for (const { imported, local } of node.specifiers) {
            hoistedDestructuringProperties.push(
              objectProperty(
                imported,
                local,
                false,
                imported.name === local.name
              )
            );
          }
          const babelTypeNsImport = path.scope.generateUidIdentifier("t");
          node.specifiers = [importNamespaceSpecifier(babelTypeNsImport)];
          path.insertAfter([
            variableDeclaration("const", [
              variableDeclarator(
                objectPattern(hoistedDestructuringProperties),
                cloneNode(babelTypeNsImport)
              ),
            ]),
          ]);
        }
      },
    },
  };
}

/**
 * @param {import("@babel/core")} pluginAPI
 * @returns {import("@babel/core").PluginObject}
 */
function pluginImportMetaUrl({ types: t, template }) {
  const isImportMeta = node =>
    t.isMetaProperty(node) &&
    t.isIdentifier(node.meta, { name: "import" }) &&
    t.isIdentifier(node.property, { name: "meta" });

  const isImportMetaUrl = node =>
    t.isMemberExpression(node, { computed: false }) &&
    t.isIdentifier(node.property, { name: "url" }) &&
    isImportMeta(node.object);

  return {
    visitor: {
      Program(programPath) {
        // We must be sure to run this before the istanbul plugins, because its
        // instrumentation breaks our detection.
        programPath.traverse({
          CallExpression(path) {
            const { node } = path;

            // fileURLToPath(import.meta.url)
            if (
              (function () {
                if (
                  !t.isIdentifier(node.callee, {
                    name: "fileURLToPath",
                  }) ||
                  node.arguments.length !== 1
                ) {
                  return;
                }

                const arg = node.arguments[0];

                if (
                  !t.isMemberExpression(arg, {
                    computed: false,
                  }) ||
                  !t.isIdentifier(arg.property, {
                    name: "url",
                  }) ||
                  !isImportMeta(arg.object)
                ) {
                  return;
                }
                path.replaceWith(t.identifier("__filename"));
                return true;
              })()
            ) {
              return;
            }

            // const { __dirname: cwd } = commonJS(import.meta.url)
            if (
              !t.isIdentifier(node.callee, { name: "commonJS" }) ||
              node.arguments.length !== 1
            ) {
              return;
            }

            const binding = path.scope.getBinding("commonJS");
            if (!binding) return;

            if (binding.path.isImportSpecifier()) {
              path.parentPath.parentPath.assertVariableDeclaration();
              path.parentPath.parentPath.remove();
            }
          },

          // const require = createRequire(import.meta.url)
          VariableDeclarator(path) {
            const { node } = path;

            if (
              !t.isIdentifier(node.id, { name: "require" }) ||
              !t.isCallExpression(node.init) ||
              !t.isIdentifier(node.init.callee, { name: "createRequire" }) ||
              node.init.arguments.length !== 1 ||
              !isImportMetaUrl(node.init.arguments[0])
            ) {
              return;
            }

            // Let's just remove this declaration to unshadow the "global" cjs require.
            path.remove();
            path.scope.crawl();

            const createRequireBinding = path.scope.getBinding("createRequire");
            if (!createRequireBinding.referenced) {
              createRequireBinding.path.remove();
            }
          },

          // import.meta.url
          MemberExpression(path) {
            if (!isImportMetaUrl(path.node)) return;

            path.replaceWith(
              template.expression
                .ast`\`file://\${__filename.replace(/\\\\/g, "/")}\``
            );
          },

          MetaProperty(path) {
            if (isImportMeta(path.node)) {
              throw path.buildCodeFrameError("Unsupported import.meta");
            }
          },
        });
      },
    },
  };
}

/** @returns {import("@babel/core").PluginObject} */
function pluginReplaceTSImportExtension() {
  return {
    visitor: {
      "ImportDeclaration|ExportDeclaration"({ node }) {
        const { source } = node;
        if (source) {
          source.value = source.value.replace(/(\.[mc]?)ts$/, "$1js");
        }
      },
      TSImportEqualsDeclaration({ node }) {
        const { moduleReference } = node;
        if (moduleReference.type !== "TSExternalModuleReference") return;
        const { expression } = moduleReference;
        expression.value = expression.value.replace(/(\.[mc]?)ts$/, "$1js");
      },
    },
  };
}

const tokenTypesMapping = new Map();
const tokenTypeSourcePath = "./packages/babel-parser/src/tokenizer/types.ts";

function getTokenTypesMapping() {
  if (tokenTypesMapping.size === 0) {
    const tokenTypesAst = parseSync(
      fs.readFileSync(tokenTypeSourcePath, {
        encoding: "utf-8",
      }),
      {
        configFile: false,
        parserOpts: { attachComments: false, plugins: ["typescript"] },
      }
    );

    let typesDeclaration;
    for (const n of tokenTypesAst.program.body) {
      if (n.type === "ExportNamedDeclaration" && n.exportKind === "value") {
        const declarations = n.declaration.declarations;
        if (declarations !== undefined) typesDeclaration = declarations[0];
        if (
          typesDeclaration !== undefined &&
          typesDeclaration.id.name === "types"
        ) {
          break;
        }
      }
    }
    if (typesDeclaration === undefined) {
      throw new Error(
        "The plugin can not find TokenType definition in " + tokenTypeSourcePath
      );
    }

    const tokenTypesDefinition = typesDeclaration.init.expression.properties;
    for (let i = 0; i < tokenTypesDefinition.length; i++) {
      tokenTypesMapping.set(tokenTypesDefinition[i].key.name, i);
    }
  }
  return tokenTypesMapping;
}

function pluginBabelParserTokenType({
  types: { isIdentifier, numericLiteral },
}) {
  const tokenTypesMapping = getTokenTypesMapping();
  return {
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        if (
          isIdentifier(node.object, { name: "tt" }) &&
          isIdentifier(node.property) &&
          !node.computed
        ) {
          const tokenName = node.property.name;
          const tokenType = tokenTypesMapping.get(node.property.name);
          if (tokenType === undefined) {
            throw path.buildCodeFrameError(
              `${tokenName} is not defined in ${tokenTypeSourcePath}`
            );
          }
          path.replaceWith(numericLiteral(tokenType));
        }
      },
    },
  };
}

// Inject `0 && exports.foo = 0` hints for the specified exports,
// to help the Node.js CJS-ESM interop. This is only
// needed when compiling ESM re-exports to CJS in `lazy` mode.
function pluginInjectNodeReexportsHints({ types: t, template }, { names }) {
  return {
    visitor: {
      Program: {
        exit(path) {
          const seen = [];
          for (const stmt of path.get("body")) {
            if (!stmt.isExpressionStatement()) continue;
            const expr = stmt.get("expression");
            if (
              !expr.isCallExpression() ||
              !expr.get("callee").matchesPattern("Object.defineProperty") ||
              expr.node.arguments.length !== 3 ||
              !expr.get("arguments.0").isIdentifier({ name: "exports" }) ||
              !expr.get("arguments.1").isStringLiteral() ||
              !names.includes(expr.node.arguments[1].value)
            ) {
              continue;
            }

            expr
              .get("arguments.0")
              .replaceWith(template.expression.ast`(0, exports)`);
            seen.push(expr.node.arguments[1].value);
          }

          const assign = seen.reduce(
            (rhs, name) => template.expression.ast`exports.${name} = ${rhs}`,
            t.numericLiteral(0)
          );
          path.pushContainer("body", template.statement.ast`0 && (${assign})`);
        },
      },
    },
  };
}

/**
 * @param {import("@babel/core")} pluginAPI
 * @returns {import("@babel/core").PluginObject}
 */
function pluginGeneratorOptimization({ types: t }) {
  return {
    visitor: {
      CallExpression: {
        exit(path) {
          const node = path.node;
          if (
            t.isMemberExpression(node.callee) &&
            t.isThisExpression(node.callee.object)
          ) {
            const args = node.arguments;

            if (
              node.callee.property.name === "token" &&
              args.length === 1 &&
              t.isStringLiteral(args[0])
            ) {
              const str = args[0].value;
              if (str.length === 1) {
                node.callee.property.name = "tokenChar";
                args[0] = t.numericLiteral(str.charCodeAt(0));
              }
            }
          }
        },
      },
    },
  };
}
