"use strict";

const path = require("path");

function normalize(src) {
  return src.replace(/\//, path.sep);
}

module.exports = function (api) {
  const env = api.env();

  const includeCoverage = process.env.BABEL_COVERAGE === "true";

  const envOptsNoTargets = {
    loose: true,
    shippedProposals: true,
    modules: false,
  };
  const envOpts = Object.assign({}, envOptsNoTargets);

  let convertESM = true;
  let ignoreLib = true;
  let includeRegeneratorRuntime = false;
  let polyfillRequireResolve = false;

  let transformRuntimeOptions;

  const nodeVersion = "6.9";
  // The vast majority of our src files are modules, but we use
  // unambiguous to keep things simple until we get around to renaming
  // the modules to be more easily distinguished from CommonJS
  const unambiguousSources = [
    "packages/*/src",
    "packages/*/test",
    "codemods/*/src",
    "codemods/*/test",
    "eslint/*/src",
    "eslint/*/test",
  ];

  switch (env) {
    // Configs used during bundling builds.
    case "standalone":
      includeRegeneratorRuntime = true;
      unambiguousSources.push("packages/babel-runtime/regenerator");
    // fall through
    case "rollup":
      convertESM = false;
      ignoreLib = false;
      // rollup-commonjs will converts node_modules to ESM
      unambiguousSources.push(
        "**/node_modules",
        "packages/babel-preset-env/data",
        "packages/babel-compat-data"
      );
      if (env === "rollup") envOpts.targets = { node: nodeVersion };
      polyfillRequireResolve = true;
      break;
    case "test-legacy": // In test-legacy environment, we build babel on latest node but test on minimum supported legacy versions
    case "production":
      // Config during builds before publish.
      envOpts.targets = {
        node: nodeVersion,
      };
      polyfillRequireResolve = true;
      break;
    case "development":
      envOpts.debug = true;
      envOpts.targets = {
        node: "current",
      };
      break;
    case "test":
      envOpts.targets = {
        node: "current",
      };
      break;
  }

  if (includeRegeneratorRuntime) {
    const babelRuntimePkgPath = require.resolve("@babel/runtime/package.json");

    transformRuntimeOptions = {
      helpers: false, // Helpers are handled by rollup when needed
      regenerator: true,
      version: require(babelRuntimePkgPath).version,
    };
  }

  const config = {
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
    presets: [
      [
        "@babel/preset-typescript",
        { onlyRemoveTypeImports: true, allowDeclareFields: true },
      ],
      ["@babel/env", envOpts],
      ["@babel/preset-flow", { allowDeclareFields: true }],
    ],
    plugins: [
      [
        "@babel/proposal-object-rest-spread",
        { useBuiltIns: true, loose: true },
      ],

      convertESM ? "@babel/proposal-export-namespace-from" : null,
      convertESM ? "@babel/transform-modules-commonjs" : null,
      polyfillRequireResolve && pluginPolyfillRequireResolve,
    ].filter(Boolean),
    overrides: [
      {
        test: [
          "packages/babel-parser",
          "packages/babel-helper-validator-identifier",
        ].map(normalize),
        plugins: [
          "babel-plugin-transform-charcodes",
          ["@babel/transform-for-of", { assumeArray: true }],
        ],
      },
      {
        test: ["./packages/babel-cli", "./packages/babel-core"].map(normalize),
        plugins: [
          // Explicitly use the lazy version of CommonJS modules.
          convertESM
            ? ["@babel/transform-modules-commonjs", { lazy: true }]
            : null,
        ].filter(Boolean),
      },
      {
        test: normalize("./packages/babel-polyfill"),
        presets: [["@babel/env", envOptsNoTargets]],
      },
      {
        test: unambiguousSources.map(normalize),
        sourceType: "unambiguous",
      },
      includeRegeneratorRuntime && {
        exclude: /regenerator-runtime/,
        plugins: [["@babel/transform-runtime", transformRuntimeOptions]],
      },
    ].filter(Boolean),
  };

  // we need to do this as long as we do not test everything from source
  if (includeCoverage) {
    config.auxiliaryCommentBefore = "istanbul ignore next";
    config.plugins.push("babel-plugin-istanbul");
  }

  return config;
};

// TODO(Babel 8) This polyfill is only needed for Node.js 6 and 8
function pluginPolyfillRequireResolve({ template, types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        if (!path.matchesPattern("require.resolve")) return;
        if (!t.isCallExpression(path.parent, { callee: path.node })) return;

        const args = path.parent.arguments;
        if (args.length < 2) return;
        if (
          !t.isObjectExpression(args[1]) ||
          args[1].properties.length !== 1 ||
          !t.isIdentifier(args[1].properties[0].key, { name: "paths" }) ||
          !t.isArrayExpression(args[1].properties[0].value) ||
          args[1].properties[0].value.elements.length !== 1
        ) {
          throw path.parentPath.buildCodeFrameError(
            "This 'require.resolve' usage is not supported by the inline polyfill."
          );
        }

        // require.resolve's paths option has been introduced in Node.js 8.9
        // https://nodejs.org/api/modules.html#modules_require_resolve_request_options
        path.replaceWith(template.ast`
          parseFloat(process.versions.node) >= 8.9
            ? require.resolve
            : (/* request */ r, { paths: [/* base */ b] }, M = require("module")) => {
                let /* filename */ f = M._findPath(r, M._nodeModulePaths(b).concat(b));
                if (f) return f;
                f = new Error(\`Cannot resolve module '\${r}'\`);
                f.code = "MODULE_NOT_FOUND";
                throw f;
              }
        `);
      },
    },
  };
}
