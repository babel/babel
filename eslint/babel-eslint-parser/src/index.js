import semver from "semver";
import {
  version as babelCoreVersion,
  parseSync as babelParse,
} from "@babel/core";
import packageJson from "../package.json";
import {
  normalizeBabelParseConfig,
  normalizeESLintConfig,
} from "./configuration";
import convert from "./convert";
import analyzeScope from "./analyze-scope";
import visitorKeys from "./visitor-keys";

let isRunningSupportedVersion;

function baseParse(code, options) {
  if (typeof isRunningSupportedVersion !== "boolean") {
    isRunningSupportedVersion = semver.satisfies(
      babelCoreVersion,
      packageJson.peerDependencies["@babel/core"],
    );
  }

  if (!isRunningSupportedVersion) {
    throw new Error(
      `@babel/eslint-parser@${packageJson.version} does not support @babel/core@${babelCoreVersion}. Please upgrade to @babel/core@${packageJson.peerDependencies["@babel/core"]}`,
    );
  }

  let ast;

  try {
    ast = babelParse(code, normalizeBabelParseConfig(options));
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;
    }

    throw err;
  }

  convert(ast, code);

  return ast;
}

export function parse(code, options = {}) {
  return baseParse(code, normalizeESLintConfig(options));
}

export function parseForESLint(code, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions);
  const scopeManager = analyzeScope(ast, normalizedOptions);

  return { ast, scopeManager, visitorKeys };
}
