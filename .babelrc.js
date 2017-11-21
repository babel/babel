"use strict";

const env = process.env.BABEL_ENV || process.env.NODE_ENV;

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

const envOpts = {
  loose: true,
  exclude: ["transform-typeof-symbol"],
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
  presets: [
    ["@babel/env", envOpts],
    "@babel/flow"
  ],
  plugins: [
    ["@babel/proposal-class-properties", { loose: true }],
    "@babel/proposal-export-namespace",
    "@babel/proposal-numeric-separator",
    ["@babel/proposal-object-rest-spread", { useBuiltIns: true}],
  ]
};

if (process.env.BABEL_ENV === "cov") {
  config.auxiliaryCommentBefore = "istanbul ignore next";
  config.plugins.push(istanbulHacks);
}

module.exports = config;
