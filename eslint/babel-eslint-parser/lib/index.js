"use strict";

const semver = require("semver");
const babelCore = require("@babel/core");
const packageJson = require("../package.json");

const CURRENT_BABEL_VERSION = babelCore.version;
const SUPPORTED_BABEL_VERSION_RANGE =
  packageJson.peerDependencies["@babel/core"];
const IS_RUNNING_SUPPORTED_VERSION = semver.satisfies(
  CURRENT_BABEL_VERSION,
  SUPPORTED_BABEL_VERSION_RANGE
);

exports.parse = function(code, options) {
  return exports.parseForESLint(code, options).ast;
};

exports.parseForESLint = function(code, options = {}) {
  if (!IS_RUNNING_SUPPORTED_VERSION) {
    throw new Error(
      `babel-eslint@${
        packageJson.version
      } does not support @babel/core@${CURRENT_BABEL_VERSION}. Please downgrade to babel-eslint@^10 or upgrade to @babel/core@${SUPPORTED_BABEL_VERSION_RANGE}`
    );
  }

  options.babelOptions = options.babelOptions || {};
  options.ecmaVersion = options.ecmaVersion || 2018;
  options.sourceType = options.sourceType || "module";
  options.allowImportExportEverywhere =
    options.allowImportExportEverywhere || false;

  return require("./parse-with-scope")(code, options);
};
