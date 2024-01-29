"use strict";

import semver = require("semver");
import convert = require("./convert/index.cts");
import type { Options } from "./types.cts";
import type { Client } from "./client.cts";

const babelParser = require(
  require.resolve("@babel/parser", {
    paths: [require.resolve("@babel/core/package.json")],
  }),
);

let isRunningMinSupportedCoreVersion: boolean = null;

export = function parse(code: string, options: Options, client: Client) {
  // Ensure we're using a version of `@babel/core` that includes `parse()` and `tokTypes`.
  const minSupportedCoreVersion =
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : ">=7.2.0";

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
    return convert.convertFile(
      babelParser.parse(code, parserOptions),
      code,
      client.getTokLabels(),
      client.getVisitorKeys(),
    );
  } catch (err) {
    throw convert.convertError(err);
  }
};
