"use strict";

module.exports = {
  presets: [
    ["@babel/preset-env", { forceAllTransforms: true }],
    ["@babel/preset-flow", { all: true }],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-export-default-from",
    ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
    "@babel/plugin-proposal-async-do-expressions",
    "@babel/plugin-proposal-do-expressions",
  ],
};
