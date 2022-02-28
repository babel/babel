// @flow

export const ParseErrorCodes = Object.freeze({
  SyntaxError: "BABEL_PARSER_SYNTAX_ERROR",
  SourceTypeModuleError: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
});

export type ParseErrorCode = $Values<typeof ParseErrorCodes>;

export type SyntaxPlugin =
  | "flow"
  | "typescript"
  | "jsx"
  | "pipelineOperator"
  | "placeholders";

export type ParseErrorCredentials = {
  code: ParseErrorCode,
  reasonCode: string,
  syntaxPlugin?: SyntaxPlugin,
};
