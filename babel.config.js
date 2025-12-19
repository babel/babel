// NOTE: This file must be runnable on all Node.js version
/* eslint-disable unicorn/prefer-node-protocol */
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
const pluginToggleBooleanFlag = require("./scripts/babel-plugin-toggle-boolean-flag/plugin.cjs");

function normalize(src) {
  return src.replace(/\//, pathUtils.sep);
}

module.exports = function (api) {
  const env = api.env();

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
  let replaceTSImportExtension = true;
  let ignoreLib = true;

  const nodeVersion = "20.19";
  // The vast majority of our src files are modules, but we use
  // unambiguous to keep things simple until we get around to renaming
  // the modules to be more easily distinguished from CommonJS
  const unambiguousSources = [
    ...sources,
    "packages/*/test",
    "codemods/*/test",
    "eslint/*/test",
  ];

  switch (env) {
    // Configs used during bundling builds.
    case "standalone":
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
      break;
    case "rollup":
      replaceTSImportExtension = false;
      ignoreLib = false;
      // rollup-commonjs will converts node_modules to ESM
      unambiguousSources.push(
        "/**/node_modules",
        "packages/babel-preset-env/data",
        "packages/babel-compat-data"
      );
      targets = { node: nodeVersion };
      break;
    case "test-legacy": // In test-legacy environment, we build babel on latest node but test on minimum supported legacy versions
    // fall through
    case "production":
      // Config during builds before publish.
      targets = { node: nodeVersion };
      break;
    case "test":
      targets = { node: "current" };
      break;
    case "development":
      envOpts.debug = true;
      targets = { node: "current" };
      break;
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
      env === "standalone" && [
        "@babel/transform-object-rest-spread",
        { useBuiltIns: true },
      ],
      require("./scripts/babel-plugin-bit-decorator/plugin.cjs"),
      require("./scripts/babel-plugin-transform-node-protocol-import/plugin.cjs"),
    ].filter(Boolean),
    overrides: [
      {
        test: ["packages/babel-parser"].map(normalize),
        plugins: [
          "babel-plugin-transform-charcodes",
          pluginBabelParserTokenType,
        ],
        assumptions: parserAssumptions,
      },
      {
        test: [
          "packages/babel-code-frame",
          "packages/babel-generator",
          "packages/babel-helper-create-class-features-plugin",
          "packages/babel-helper-string-parser",
          "packages/babel-helper-validator-identifier",
        ].map(normalize),
        plugins: ["babel-plugin-transform-charcodes"],
      },
      {
        test: ["packages/babel-generator"].map(normalize),
        plugins: [pluginGeneratorOptimization],
      },
      {
        test: sources.map(normalize),
        assumptions: sourceAssumptions,
        plugins: [
          transformNamedBabelTypesImportToDestructuring,
          replaceTSImportExtension ? pluginReplaceTSImportExtension : null,

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
              name: "process.env.BABEL_9_BREAKING",
              value: process.env.STRIP_BABEL_VERSION_FLAG
                ? bool(process.env.BABEL_9_BREAKING)
                : null,
            },
            "flag-BABEL_9_BREAKING",
          ],

          pluginPackageJsonMacro,

          [
            pluginRequiredVersionMacro,
            {
              overwrite(requiredVersion, filename) {
                if (!process.env.IS_PUBLISH || env === "standalone") {
                  if (bool(process.env.BABEL_9_BREAKING)) {
                    // Match packages/babel-core/src/index.ts
                    return packageJson.version + "999999999";
                  }
                  return packageJson.version;
                }
                if (requiredVersion === 7) requiredVersion = "^7.0.0-0";
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
        ].filter(Boolean),
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
// eslint-disable-next-line no-unused-vars
function pluginPolyfillsOldNode() {
  const polyfills = [
    // EXAMPLE:
    // {
    //   name: "Object.entries",
    //   necessary({ parent, node }) {
    //     // To avoid infinite replacement loops
    //     return !t.isLogicalExpression(parent, { operator: "||", left: node });
    //   },
    //   supported: path =>
    //     path.parentPath.isCallExpression({ callee: path.node }),
    //   replacement: template`Object.entries || (o => Object.keys(o).map(k => [k, o[k]]))`,
    // },
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

function pluginRequiredVersionMacro({ types: t }, { overwrite }) {
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
