import semver from "semver";
import {
  version as CURRENT_BABEL_VERSION,
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

const SUPPORTED_BABEL_VERSION_RANGE =
  packageJson.peerDependencies["@babel/core"];
const IS_RUNNING_SUPPORTED_VERSION = semver.satisfies(
  CURRENT_BABEL_VERSION,
  SUPPORTED_BABEL_VERSION_RANGE,
);

function baseParse(code, options) {
  if (!IS_RUNNING_SUPPORTED_VERSION) {
    throw new Error(
      `babel-eslint@${packageJson.version} does not support @babel/core@${CURRENT_BABEL_VERSION}. Please downgrade to babel-eslint@^10 or upgrade to @babel/core@${SUPPORTED_BABEL_VERSION_RANGE}`,
    );
  }

  const parseOptions = normalizeBabelParseConfig(options);
  let ast;

  try {
    ast = babelParse(code, parseOptions);
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
