import semver from "semver";
import type { Options } from "./types";
import { version } from "@babel/core";
import { WorkerClient, type Client } from "./client.ts";
import { convertError, convertFile } from "./convert/index.ts";
import { createRequire } from "node:module";
import { getTokLabels, getVisitorKeys } from "./ast-info.ts";
import { getParserPlugins } from "./worker/configuration.ts";

const require = createRequire(import.meta.url);

const babelParser = require(
  require.resolve("@babel/parser", {
    paths: [require.resolve("@babel/core/package.json")],
  }),
);

let isRunningMinSupportedCoreVersion: boolean | null = null;

let client: Client;

export default function parse(code: string, options: Options) {
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

  if (
    options.babelOptions.babelrc === false &&
    options.babelOptions.configFile === false
  ) {
    const parserOpts = {
      sourceType: options.sourceType,
      sourceFilename: options.filePath,
      ...(options.sourceType !== "commonjs"
        ? {
            allowReturnOutsideFunction:
              options.ecmaFeatures?.globalReturn ?? false,
          }
        : {}),
      ...options.babelOptions.parserOpts,
      plugins: getParserPlugins(options.babelOptions),
      // skip comment attaching for parsing performance
      attachComment: false,
      ranges: true,
      tokens: true,
    };
    try {
      return convertFile(
        babelParser.parse(code, parserOpts),
        code,
        getTokLabels(),
        getVisitorKeys(),
      );
    } catch (err) {
      throw convertError(err);
    }
  }

  client ??= new WorkerClient();
  const { ast, parserOptions } = client.maybeParse(code, options);
  if (ast) return ast;

  try {
    return convertFile(
      babelParser.parse(code, parserOptions),
      code,
      getTokLabels(),
      getVisitorKeys(),
    );
  } catch (err) {
    throw convertError(err);
  }
}
