import semver from "semver";
import type { Options } from "./types";
import { version } from "@babel/core";
import type { Client } from "./client.ts";
import { convertError, convertFile } from "./convert/index.ts";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const babelParser = require(
  require.resolve("@babel/parser", {
    paths: [require.resolve("@babel/core/package.json")],
  }),
);

let isRunningMinSupportedCoreVersion: boolean = null;

export default function parse(code: string, options: Options, client: Client) {
  // Ensure we're using a version of `@babel/core` that includes `parse()` and `tokTypes`.
  const minSupportedCoreVersion = REQUIRED_VERSION(">=7.2.0 || ^8.0.0");

  if (typeof isRunningMinSupportedCoreVersion !== "boolean") {
    isRunningMinSupportedCoreVersion = semver.satisfies(
      version,
      minSupportedCoreVersion,
    );
  }

  if (!isRunningMinSupportedCoreVersion) {
    throw new Error(
      `@babel/eslint-parser@${
        PACKAGE_JSON.version
      } does not support @babel/core@${version}. Please upgrade to @babel/core@${minSupportedCoreVersion}.`,
    );
  }

  const { ast, parserOptions } = client.maybeParse(code, options);

  if (ast) return ast;

  try {
    return convertFile(
      babelParser.parse(code, parserOptions),
      code,
      client.getTokLabels(),
      client.getVisitorKeys(),
    );
  } catch (err) {
    throw convertError(err);
  }
}
