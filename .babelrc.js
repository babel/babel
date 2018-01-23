"use strict";

// Blame Logan for this.
// This works around https://github.com/istanbuljs/istanbuljs/issues/92 until
// we have a version of Istanbul that actually works with 7.x.
function istanbulHacks() {
  return {
    inherits: require("babel-plugin-istanbul").default,
    visitor: {
      Program: {
        exit: function(path) {
          if (!this.__dv__) return

          const node = path.node.body[0];
          if (
            node.type !== "VariableDeclaration" ||
            node.declarations[0].id.type !== "Identifier" ||
            !node.declarations[0].id.name.match(/cov_/) ||
            node._blockHoist !== 3
          ) {
            throw new Error("Something has gone wrong in Logan's hacks.");
          }

          // Gross hacks to put the code coverage block above all compiled
          // import statement output.
          node._blockHoist = 5;
        },
      },
    },
  };
}

const babylonTransformCharcodes = require.resolve("babel-plugin-transform-charcodes", {
  paths: ["./packages/babylon"],
});

let envOpts = {
  loose: true,
};

const config = {
  comments: false,
  presets: [
    ["@babel/env", envOpts],
  ],
  plugins: [
    // TODO: Use @babel/preset-flow when 
    // https://github.com/babel/babel/issues/7233 is fixed
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/proposal-class-properties", { loose: true }],
    "@babel/proposal-export-namespace-from",
    "@babel/proposal-numeric-separator",
    ["@babel/proposal-object-rest-spread", { useBuiltIns: true }],
  ],
  overrides: [{
    test: "packages/babylon",
    plugins: [
      babylonTransformCharcodes,
      ["@babel/transform-for-of", { assumeArray: true }],
    ],
  }],
};

if (process.env.BABEL_ENV === "cov") {
  config.auxiliaryCommentBefore = "istanbul ignore next";
  config.plugins.push(istanbulHacks);
}

if (process.env.BABEL_ENV === "development") {
  envOpts.targets = {
    node: "current"
  };
  envOpts.debug = true;
}

module.exports = config;
