import semver from "semver";
import { normalizeESLintConfig } from "./configuration";
import analyzeScope from "./analyze-scope";
import { getVersion, getVisitorKeys, parse as babelParse } from "./client.cjs";

let isRunningMinSupportedCoreVersion = null;

function baseParse(code, options) {
  // Ensure we're using a version of `@babel/core` that includes `parse()` and `tokTypes`.
  const minSupportedCoreVersion = ">=7.2.0";

  if (typeof isRunningMinSupportedCoreVersion !== "boolean") {
    isRunningMinSupportedCoreVersion = semver.satisfies(
      getVersion(),
      minSupportedCoreVersion,
    );
  }

  if (!isRunningMinSupportedCoreVersion) {
    throw new Error(
      `@babel/eslint-parser@${
        PACKAGE_JSON.version
      } does not support @babel/core@${getVersion()}. Please upgrade to @babel/core@${minSupportedCoreVersion}.`,
    );
  }

  return babelParse(code, options);
}

export function parse(code, options = {}) {
  return baseParse(code, normalizeESLintConfig(options));
}

export function parseForESLint(code, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions);
  const scopeManager = analyzeScope(ast, normalizedOptions);

  return { ast, scopeManager, visitorKeys: getVisitorKeys() };
}
