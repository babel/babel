
import babel = require("./babel-core.cts");
import convert = require("../convert/index.cts");
import astInfo = require("./ast-info.cts");
import extractParserOptionsPlugin = require("./extract-parser-options-plugin.cjs");

import type { InputOptions, ConfigItem } from "@babel/core";
import type { AST, ParseResult } from "../types.cts";

const { getVisitorKeys, getTokLabels } = astInfo;

const ref = {};
let extractParserOptionsConfigItem: ConfigItem<any>;

const MULTIPLE_OVERRIDES = /More than one plugin attempted to override parsing/;

export = async function asyncMaybeParse(
  code: string,
  options: InputOptions,
): Promise<{
  ast: AST.Program | null;
  parserOptions: ParseResult | null;
}> {
  if (!extractParserOptionsConfigItem) {
    extractParserOptionsConfigItem = await babel.createConfigItemAsync(
      [extractParserOptionsPlugin, ref],
      { dirname: __dirname, type: "plugin" },
    );
  }
  const { plugins } = options;
  options.plugins = plugins.concat(extractParserOptionsConfigItem);

  let ast;

  try {
    return {
      parserOptions: await babel.parseAsync(code, options),
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
    ast = await babel.parseAsync(code, options);
  } catch (err) {
    throw convert.convertError(err);
  }

  return {
    ast: convert.convertFile(ast, code, getTokLabels(), getVisitorKeys()),
    parserOptions: null,
  };
};
