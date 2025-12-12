export type {
  parse,
  parseExpression,
} from "../../../dts/packages/babel-parser/src/index.d.ts";

export type {
  ParserOptions,
  ParserPlugin,
  PipelineOperatorPluginOptions,
  FlowPluginOptions,
  TypeScriptPluginOptions,
  ParseError,
  ParseResult,
} from "../../../dts/packages/babel-parser/src/index.d.ts";

export const tokTypes: {
  // todo(flow->ts) real token type
  [name: string]: any;
};
