"use strict";

module.exports = {
  presets: [
    ["@babel/preset-env", { forceAllTransforms: true }],
    ["@babel/preset-flow", { all: true }],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-syntax-numeric-separator",
    "@babel/plugin-syntax-export-namespace-from",
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: false }],
    ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
  ],
};
