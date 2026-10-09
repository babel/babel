import { createConfigItemAsync, parseAsync } from "@babel/core";
import { convertError, convertFile } from "../convert/index.ts";
import { getTokLabels, getVisitorKeys } from "../ast-info.ts";
import extractParserOptionsPlugin from "./extract-parser-options-plugin.ts";

import type { InputOptions, ConfigItem } from "@babel/core";
import type { AST, ParseResult } from "../types";

const ref = {};
let extractParserOptionsConfigItem: ConfigItem<any>;

const MULTIPLE_OVERRIDES = /More than one plugin attempted to override parsing/;

export default async function maybeParse(
  code: string,
  options: InputOptions,
): Promise<{
  ast: AST.Program | null;
  parserOptions: ParseResult | null;
}> {
  if (!extractParserOptionsConfigItem) {
    extractParserOptionsConfigItem = await createConfigItemAsync(
      [extractParserOptionsPlugin, ref],
      { dirname: import.meta.dirname, type: "plugin" },
    );
  }
  const { plugins } = options;
  options.plugins = plugins!.concat(extractParserOptionsConfigItem);

  let ast;

  try {
    return {
      parserOptions: await parseAsync(code, options),
      ast: null,
    };
  } catch (err) {
    if (!MULTIPLE_OVERRIDES.test(err.message)) {
      throw err;
    }
  }

  // There was already a parserOverride, so remove our plugin.
  options.plugins = plugins;

  try {
    ast = await parseAsync(code, options);
  } catch (err) {
    throw convertError(err);
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    ast: convertFile(ast!, code, getTokLabels(), getVisitorKeys()),
    parserOptions: null,
  };
}
