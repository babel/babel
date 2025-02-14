export type {
  parse,
  parseExpression,
} from "../../../dts/packages/babel-parser/src/index.d.ts";

export type {
  ParserOptions,
  ParserPlugin,
  DecoratorsPluginOptions,
  PipelineOperatorPluginOptions,
  RecordAndTuplePluginOptions,
  FlowPluginOptions,
  TypeScriptPluginOptions,
  ParseError,
  ParseResult,
} from "../../../dts/packages/babel-parser/src/index.d.ts";

/** @deprecated Will be removed in Babel 8 */
export type { ParserPluginWithOptions } from "../../../dts/packages/babel-parser/src/typings.d.ts";

export const tokTypes: {
  // todo(flow->ts) real token type
  [name: string]: any;
};
