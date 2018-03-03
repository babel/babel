"use strict";

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const envOpts = {
  loose: true,
};

switch(env) {
  case "development":
    envOpts.debug = true;
    // fall-through
  case "test":
    envOpts.targets = {
      node: "current"
  };
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

// we need to do this as long as we do not test everything from source
if (process.env.BABEL_ENV === "cov") {
  config.auxiliaryCommentBefore = "istanbul ignore next";
  config.plugins.push("babel-plugin-istanbul");
}

module.exports = config;
