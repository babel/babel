// @flow

declare module "@babel/core" {
  import type { BabelNode, BabelNodeFile } from "@babel/types";
  import type { Options as ParserOptions } from "@babel/parser";
  import type {
    Options as GeneratorOptions,
    SourceMap,
  } from "@babel/generator";

  declare export type MatchPattern =
    | string
    | RegExp
    | ((
        filename: string | void,
        context: {| callee: { name: string, ... } |} | void,
        envName: string
      ) => boolean);

  declare export type EntryTarget = string | any | Function;
  declare export type EntryOptions = false | { ... };

  declare export type Entry =
    | EntryTarget
    | [EntryTarget, EntryOptions]
    | [EntryTarget, EntryOptions, string]
    | ConfigItem;

  declare type Options = {|
    cwd?: string,
    caller?: { name: string, ... },
    filename?: string,
    filenameRelative?: string,
    code?: boolean,
    ast?: boolean,
    root?: string,
    rootMode?: "root" | "upward" | "upward-optional",
    envName?: string,
    configFile?: string | boolean,
    babelrc?: boolean,
    babelrcRoots?: boolean | MatchPattern | Array<MatchPattern>,
    plugins?: Array<Entry>,
    presets?: Array<Entry>,
    extends?: string,
    env?: { [envKey: string]: Options, ... },
    overrides?: Array<Options>,
    test?: MatchPattern | Array<MatchPattern>,
    include?: MatchPattern | Array<MatchPattern>,
    exclude?: MatchPattern | Array<MatchPattern>,
    ignore?: Array<MatchPattern>,
    only?: Array<MatchPattern>,
    inputSourceMap?: boolean | SourceMap,
    sourceMaps?: boolean | "inline" | "both",
    sourceFileName?: string,
    sourceRoot?: string,
    sourceType?: "script" | "module" | "unambiguous",
    highlightCode?: boolean,
    wrapPluginVisitorMethod?: (
      key: string,
      nodeType: string,
      fn: Function
    ) => Function,
    parserOpts?: ParserOptions,
    generatorOpts?: GeneratorOptions,
    retainLines?: boolean,
    compact?: boolean | "auto",
    minified?: boolean,
    auxiliaryCommentBefore?: string,
    auxiliaryCommentAfter?: string,
    comments?: boolean,
    shouldPrintComment?: (value: string) => boolean,
    moduleIds?: boolean,
    moduleId?: string,
    getModuleId?: (name: string) => string,
    moduleRoot?: string,
  |};
  declare type Result = {| code: string, map: ?SourceMap, ast: BabelNodeFile |};

  declare export function transform(
    code: string,
    options?: Options,
    callback: (
      Error,
      typeof undefined
    ) => void | ((typeof undefined, Result) => void)
  ): void;

  declare export function transformSync(
    code: string,
    options?: Options
  ): Result;

  declare export function transformAsync(
    code: string,
    options?: Options
  ): Promise<Result>;

  declare export function transformFile(
    code: string,
    options?: Options,
    callback: (
      Error,
      typeof undefined
    ) => void | ((typeof undefined, Result) => void)
  ): void;

  declare export function transformFileSync(
    code: string,
    options?: Options
  ): Result;

  declare export function transformFileAsync(
    code: string,
    options?: Options
  ): Promise<Result>;

  declare export function transformFromAst(
    ast: BabelNode,
    code?: string,
    options?: Options,
    callback: (
      Error,
      typeof undefined
    ) => void | ((typeof undefined, Result) => void)
  ): void;

  declare export function transformFromAstSync(
    ast: BabelNode,
    code?: string,
    options?: Options
  ): Result;

  declare export function transformFromAstAsync(
    ast: BabelNode,
    code?: string,
    options?: Options
  ): Promise<Result>;

  declare export function parse(
    code: string,
    options?: Options,
    callback: (
      Error,
      typeof undefined
    ) => void | ((typeof undefined, BabelNodeFile) => void)
  ): void;

  declare export function parseSync(
    code: string,
    options?: Options
  ): BabelNodeFile;

  declare export function parseAsync(
    code: string,
    options?: Options
  ): Promise<BabelNodeFile>;

  declare type ConfigItem = {|
    value: { ... } | Function,
    options: { ... } | void,
    dirname: string,
    name: string | void,
    file: {| request: string, resolved: string |} | void,
  |};

  declare export function loadOptions(options?: Options): Options;
  declare export function loadPartialConfig(options?: Object): any;
  declare export function createConfigItem(
    value:
      | string
      | { ... }
      | Function
      | [string | { ... } | Function, { ... } | void],
    {| dirname?: string, type?: "preset" | "plugin" |}
  ): ConfigItem;
}
