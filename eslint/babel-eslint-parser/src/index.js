import semver from "semver";
import { version as CURRENT_BABEL_VERSION } from "@babel/core";
import parseWithScope from "./parse-with-scope";
import packageJson from "../package.json";

const SUPPORTED_BABEL_VERSION_RANGE =
  packageJson.peerDependencies["@babel/core"];
const IS_RUNNING_SUPPORTED_VERSION = semver.satisfies(
  CURRENT_BABEL_VERSION,
  SUPPORTED_BABEL_VERSION_RANGE,
);

export function parse(code, options) {
  return exports.parseForESLint(code, options).ast;
}

export function parseForESLint(code, options = {}) {
  if (!IS_RUNNING_SUPPORTED_VERSION) {
    throw new Error(
      `babel-eslint@${packageJson.version} does not support @babel/core@${CURRENT_BABEL_VERSION}. Please downgrade to babel-eslint@^10 or upgrade to @babel/core@${SUPPORTED_BABEL_VERSION_RANGE}`,
    );
  }

  options.babelOptions = options.babelOptions || {};
  options.ecmaVersion = options.ecmaVersion || 2018;
  options.sourceType = options.sourceType || "module";
  options.allowImportExportEverywhere =
    options.allowImportExportEverywhere || false;

  return parseWithScope(code, options);
}
