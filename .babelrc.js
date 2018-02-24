"use strict";

let envOpts = {
  loose: true,
};

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
  ],
  overrides: [
    {
      test: "packages/babylon",
      plugins: [
        "babel-plugin-transform-charcodes",
        ["@babel/transform-for-of", { assumeArray: true }],
      ],
    },
  ],
};

if (process.env.BABEL_ENV === "cov") {
  config.auxiliaryCommentBefore = "istanbul ignore next";
  config.plugins.push("babel-plugin-istanbul");
}

if (process.env.BABEL_ENV === "development") {
  envOpts.targets = {
    node: "current",
  };
  envOpts.debug = true;
}

module.exports = config;
