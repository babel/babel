"use strict";

const semver = process.env.BABEL_8_BREAKING
  ? require("semver")
  : require("@nicolo-ribaudo/semver-v6");
const convert = require("./convert/index.cjs");

const babelParser = require(require.resolve("@babel/parser", {
  paths: [require.resolve("@babel/core/package.json")],
}));

let isRunningMinSupportedCoreVersion = null;

module.exports = function parse(code, options, client) {
  // Ensure we're using a version of `@babel/core` that includes `parse()` and `tokTypes`.
  let minSupportedCoreVersion = ">=7.2.0";
  // TODO(Babel 8): Update all the version checks
  if (process.env.BABEL_8_BREAKING) {
    minSupportedCoreVersion += " || >=8.0.0-0";
  }

  if (typeof isRunningMinSupportedCoreVersion !== "boolean") {
    isRunningMinSupportedCoreVersion = semver.satisfies(
      client.getVersion(),
      minSupportedCoreVersion,
    );
  }

  if (!isRunningMinSupportedCoreVersion) {
    throw new Error(
      `@babel/eslint-parser@${
        PACKAGE_JSON.version
      } does not support @babel/core@${client.getVersion()}. Please upgrade to @babel/core@${minSupportedCoreVersion}.`,
    );
  }

  const { ast, parserOptions } = client.maybeParse(code, options);

  if (ast) return ast;

  try {
    return convert.ast(
      babelParser.parse(code, parserOptions),
      code,
      client.getTokLabels(),
      client.getVisitorKeys(),
    );
  } catch (err) {
    throw convert.error(err);
  }
};
