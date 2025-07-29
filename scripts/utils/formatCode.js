// @ts-check

import * as prettier from "prettier";

/**
 * Formats the given code using Prettier.
 * @param {string} code - The code to format.
 * @param {string} filename - The name of the file being formatted.
 * @returns {Promise<string>} - The formatted code.
 */
export default async function formatCode(code, filename) {
  const prettierConfig = await prettier.resolveConfig(filename);
  if (!prettierConfig) {
    throw new Error(
      `No Prettier configuration found for file: ${filename}. Please ensure a valid Prettier config exists.`
    );
  }
  prettierConfig.filepath = filename;
  // let prettier automatically determine the parser for non-ts files
  prettierConfig.parser = filename.endsWith(".ts") ? "babel-ts" : undefined;

  return prettier.format(code, prettierConfig);
}
