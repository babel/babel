const semver = require("semver");
const { normalizeESLintConfig } = require("./configuration.cjs");
const analyzeScope = require("./analyze-scope.cjs");
const {
  getVersion,
  getVisitorKeys,
  getTokLabels,
  maybeParse,
} = require("./client.cjs");
const convert = require("./convert/index.cjs");

const babelParser = require(require.resolve("@babel/parser", {
  paths: [require.resolve("@babel/core/package.json")],
}));

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

  const { ast, parserOptions } = maybeParse(code, options);

  if (ast) return ast;

  try {
    return convert.ast(
      babelParser.parse(code, parserOptions),
      code,
      getTokLabels(),
      getVisitorKeys(),
    );
  } catch (err) {
    throw convert.error(err);
  }
}

exports.parse = function (code, options = {}) {
  return baseParse(code, normalizeESLintConfig(options));
};

exports.parseForESLint = function (code, options = {}) {
  const normalizedOptions = normalizeESLintConfig(options);
  const ast = baseParse(code, normalizedOptions);
  const scopeManager = analyzeScope(ast, normalizedOptions);

  return { ast, scopeManager, visitorKeys: getVisitorKeys() };
};
