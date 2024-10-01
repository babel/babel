"use strict";

module.exports = {
  presets: [
    ["@babel/preset-env", { forceAllTransforms: true }],
    ["@babel/preset-flow", { all: true }],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-export-default-from",
    "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { version: "2023-05" }],
    "@babel/plugin-transform-private-methods",
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-explicit-resource-management",
  ],
};
