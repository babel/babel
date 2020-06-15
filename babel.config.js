"use strict";

module.exports = function (api) {
  const env = api.env();

  const includeCoverage = process.env.BABEL_COVERAGE === "true";

  const envOptsNoTargets = {
    loose: true,
    modules: false,
    shippedProposals: true,
    exclude: ["transform-typeof-symbol"],
  };
  const envOpts = Object.assign({}, envOptsNoTargets);

  const compileDynamicImport = env === "test" || env === "development";

  let convertESM = true;
  let ignoreLib = true;
  let includeRegeneratorRuntime = false;

  let transformRuntimeOptions;

  const nodeVersion = "10.13";
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
      break;
    case "production":
      // Config during builds before publish.
      envOpts.targets = {
        node: nodeVersion,
      };
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
    ].filter(Boolean),
    presets: [["@babel/env", envOpts]],
    plugins: [
      // TODO: Use @babel/preset-flow when
      // https://github.com/babel/babel/issues/7233 is fixed
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/proposal-class-properties", { loose: true }],
      "@babel/proposal-export-namespace-from",
      [
        "@babel/proposal-object-rest-spread",
        { useBuiltIns: true, loose: true },
      ],
      compileDynamicImport ? dynamicImportUrlToPath : null,
      compileDynamicImport ? "@babel/plugin-proposal-dynamic-import" : null,

      convertESM ? "@babel/transform-modules-commonjs" : null,
    ].filter(Boolean),
    overrides: [
      {
        test: [
          "packages/babel-parser",
          "packages/babel-helper-validator-identifier",
        ],
        plugins: [
          "babel-plugin-transform-charcodes",
          ["@babel/transform-for-of", { assumeArray: true }],
        ],
      },
      {
        test: ["./packages/babel-cli", "./packages/babel-core"],
        plugins: [
          // Explicitly use the lazy version of CommonJS modules.
          convertESM
            ? ["@babel/transform-modules-commonjs", { lazy: true }]
            : null,
        ].filter(Boolean),
      },
      {
        test: "./packages/babel-polyfill",
        presets: [["@babel/env", envOptsNoTargets]],
      },
      {
        test: unambiguousSources,
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

// import() uses file:// URLs for absolute imports, while require() uses
// file paths.
// Since this isn't handled by @babel/plugin-transform-modules-commonjs,
// we must handle it here.
// NOTE: This plugin must run before @babel/plugin-transform-modules-commonjs,
// and assumes that the target is the current node version.
function dynamicImportUrlToPath({ template }) {
  return {
    visitor: {
      CallExpression(path) {
        if (path.get("callee").isImport()) {
          path.get("arguments.0").replaceWith(
            template.expression.ast`
            require("url").fileURLToPath(${path.node.arguments[0]})
          `
          );
        }
      },
    },
  };
}
