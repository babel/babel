// @flow strict-local

declare module "@babel/template" {
  import type {
    BabelNodeProgram,
    BabelNodeExpression,
    BabelNodeStatement,
    BabelNode,
  } from "@babel/types";
  import type { Options as ParserOptions } from "@babel/parser";

  declare type Options = {|
    ...ParserOptions,
    syntacticPlaceholders?: boolean,
    preserveComments?: boolean,
  |};

  declare type Template<T> = (replacements?: { [string]: mixed, ... }) => T;

  declare module.exports: {|
    (code: string, opts?: Options): Template<BabelNode>,
    smart(code: string, opts?: Options): Template<BabelNode>,
    statement(code: string, opts?: Options): Template<BabelNodeStatement>,
    statements(code: string, opts?: Options): Template<Array<BabelNodeStatement>>,
    expression(code: string, opts?: Options): Template<BabelNodeExpression>,
    program(code: string, opts?: Options): Template<BabelNodeProgram>,
    ast(code: string): string,
    ast(callSite: Array<string>, ...substitutions: Array<string>): string,
  |};
}
