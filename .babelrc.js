"use strict";

module.exports = function(api) {
  const env = api.env();

  const includeCoverage = process.env.BABEL_COVERAGE === "true";

  const envOpts = {
    loose: true,
    modules: false,
    exclude: ["transform-typeof-symbol"],
  };

  let convertESM = true;

  switch (env) {
    // Configs used during bundling builds.
    case "babylon":
    case "standalone":
      convertESM = false;
      break;
    case "production":
      // Config during builds before publish.
      envOpts.targets = {
        node: 6,
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

  const config = {
    comments: false,
    presets: [["@babel/env", envOpts]],
    plugins: [
      // TODO: Use @babel/preset-flow when
      // https://github.com/babel/babel/issues/7233 is fixed
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/proposal-class-properties", { loose: true }],
      "@babel/proposal-export-namespace-from",
      "@babel/proposal-numeric-separator",
      ["@babel/proposal-object-rest-spread", { useBuiltIns: true }],

      // Explicitly use the lazy version of CommonJS modules.
      convertESM ? ["@babel/transform-modules-commonjs", { lazy: true }] : null,
    ].filter(Boolean),
    overrides: [
      {
        test: "packages/babylon",
        plugins: [
          "babel-plugin-transform-charcodes",
          ["@babel/transform-for-of", { assumeArray: true }],
        ],
      },
      {
        test: "./packages/babel-register",
        plugins: [
          // Override the root options to disable lazy imports for babel-register
          // because otherwise the require hook will try to lazy-import things
          // leading to dependency cycles.
          convertESM ? "@babel/transform-modules-commonjs" : null,
        ].filter(Boolean),
      },
    ],
  };

  // we need to do this as long as we do not test everything from source
  if (includeCoverage) {
    config.auxiliaryCommentBefore = "istanbul ignore next";
    config.plugins.push("babel-plugin-istanbul");
  }

  return config;
};
