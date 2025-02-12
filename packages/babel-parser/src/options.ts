import type { Plugin } from "./plugin-utils.ts";

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

export type SourceType = "script" | "module" | "unambiguous";

export interface Options {
  /**
   * By default, import and export declarations can only appear at a program's top level.
   * Setting this option to true allows them anywhere where a statement is allowed.
   */
  allowImportExportEverywhere?: boolean;

  /**
   * By default, await use is not allowed outside of an async function.
   * Set this to true to accept such code.
   */
  allowAwaitOutsideFunction?: boolean;

  /**
   * By default, a return statement at the top level raises an error.
   * Set this to true to accept such code.
   */
  allowReturnOutsideFunction?: boolean;

  /**
   * By default, new.target use is not allowed outside of a function or class.
   * Set this to true to accept such code.
   */
  allowNewTargetOutsideFunction?: boolean;

  allowSuperOutsideMethod?: boolean;

  /**
   * By default, exported identifiers must refer to a declared variable.
   * Set this to true to allow export statements to reference undeclared variables.
   */
  allowUndeclaredExports?: boolean;

  /**
   * By default, Babel parser JavaScript code according to Annex B syntax.
   * Set this to `false` to disable such behavior.
   */
  annexB?: boolean;

  /**
   * By default, Babel attaches comments to adjacent AST nodes.
   * When this option is set to false, comments are not attached.
   * It can provide up to 30% performance improvement when the input code has many comments.
   * @babel/eslint-parser will set it for you.
   * It is not recommended to use attachComment: false with Babel transform,
   * as doing so removes all the comments in output code, and renders annotations such as
   * /* istanbul ignore next *\/ nonfunctional.
   */
  attachComment?: boolean;

  /**
   * By default, Babel always throws an error when it finds some invalid code.
   * When this option is set to true, it will store the parsing error and
   * try to continue parsing the invalid input file.
   */
  errorRecovery?: boolean;

  /**
   * Indicate the mode the code should be parsed in.
   * Can be one of "script", "module", or "unambiguous". Defaults to "script".
   * "unambiguous" will make @babel/parser attempt to guess, based on the presence
   * of ES6 import or export statements.
   * Files with ES6 imports and exports are considered "module" and are otherwise "script".
   */
  sourceType?: "script" | "module" | "unambiguous";

  /**
   * Correlate output AST nodes with their source filename.
   * Useful when generating code and source maps from the ASTs of multiple input files.
   */
  sourceFilename?: string;

  /**
   * By default, all source indexes start from 0.
   * You can provide a start index to alternatively start with.
   * Useful for integration with other source tools.
   */
  startIndex?: number;

  /**
   * By default, the first line of code parsed is treated as line 1.
   * You can provide a line number to alternatively start with.
   * Useful for integration with other source tools.
   */
  startLine?: number;

  /**
   * By default, the parsed code is treated as if it starts from line 1, column 0.
   * You can provide a column number to alternatively start with.
   * Useful for integration with other source tools.
   */
  startColumn?: number;

  /**
   * Array containing the plugins that you want to enable.
   */
  plugins?: Plugin[];

  /**
   * Should the parser work in strict mode.
   * Defaults to true if sourceType === 'module'. Otherwise, false.
   */
  strictMode?: boolean;

  /**
   * Adds a ranges property to each node: [node.start, node.end]
   */
  ranges?: boolean;

  /**
   * Adds all parsed tokens to a tokens property on the File node.
   */
  tokens?: boolean;

  /**
   * By default, the parser adds information about parentheses by setting
   * `extra.parenthesized` to `true` as needed.
   * When this option is `true` the parser creates `ParenthesizedExpression`
   * AST nodes instead of using the `extra` property.
   */
  createParenthesizedExpressions?: boolean;

  /**
   * The default is false in Babel 7 and true in Babel 8
   * Set this to true to parse it as an `ImportExpression` node.
   * Otherwise `import(foo)` is parsed as `CallExpression(Import, [Identifier(foo)])`.
   */
  createImportExpressions?: boolean;
}

export const enum OptionFlags {
  AllowAwaitOutsideFunction = 1 << 0,
  AllowReturnOutsideFunction = 1 << 1,
  AllowNewTargetOutsideFunction = 1 << 2,
  AllowImportExportEverywhere = 1 << 3,
  AllowSuperOutsideMethod = 1 << 4,
  AllowUndeclaredExports = 1 << 5,
  Ranges = 1 << 6,
  Tokens = 1 << 7,
  CreateImportExpressions = 1 << 8,
  CreateParenthesizedExpressions = 1 << 9,
  ErrorRecovery = 1 << 10,
  AttachComment = 1 << 11,
  AnnexB = 1 << 12,
}

type OptionsWithDefaults = { [P in keyof Options]-?: Options[P] };

function createDefaultOptions(): OptionsWithDefaults {
  return {
    // Source type ("script" or "module") for different semantics
    sourceType: "script",
    // Source filename.
    sourceFilename: undefined,
    // Index (0-based) from which to start counting source. Useful for
    // integration with other tools.
    startIndex: 0,
    // Column (0-based) from which to start counting source. Useful for
    // integration with other tools.
    startColumn: 0,
    // Line (1-based) from which to start counting source. Useful for
    // integration with other tools.
    startLine: 1,
    // When enabled, await at the top level is not considered an
    // error.
    allowAwaitOutsideFunction: false,
    // When enabled, a return at the top level is not considered an
    // error.
    allowReturnOutsideFunction: false,
    // When enabled, new.target outside a function or class is not
    // considered an error.
    allowNewTargetOutsideFunction: false,
    // When enabled, import/export statements are not constrained to
    // appearing at the top of the program.
    allowImportExportEverywhere: false,
    // TODO
    allowSuperOutsideMethod: false,
    // When enabled, export statements can reference undeclared variables.
    allowUndeclaredExports: false,
    // An array of plugins to enable
    plugins: [],
    // TODO
    strictMode: null,
    // Nodes have their start and end characters offsets recorded in
    // `start` and `end` properties (directly on the node, rather than
    // the `loc` object, which holds line/column data. To also add a
    // [semi-standardized][range] `range` property holding a `[start,
    // end]` array with the same numbers, set the `ranges` option to
    // `true`.
    //
    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
    ranges: false,
    // Adds all parsed tokens to a `tokens` property on the `File` node
    tokens: false,
    // Whether to create ImportExpression AST nodes (if false
    // `import(foo)` will be parsed as CallExpression(Import, [Identifier(foo)])
    createImportExpressions: process.env.BABEL_8_BREAKING ? true : false,
    // Whether to create ParenthesizedExpression AST nodes (if false
    // the parser sets extra.parenthesized on the expression nodes instead).
    createParenthesizedExpressions: false,
    // When enabled, errors are attached to the AST instead of being directly thrown.
    // Some errors will still throw, because @babel/parser can't always recover.
    errorRecovery: false,
    // When enabled, comments will be attached to adjacent AST nodes as one of
    // `leadingComments`, `trailingComments` and `innerComments`. The comment attachment
    // is vital to preserve comments after transform. If you don't print AST back,
    // consider set this option to `false` for performance
    attachComment: true,
    // When enabled, the parser will support Annex B syntax.
    // https://tc39.es/ecma262/#sec-additional-ecmascript-features-for-web-browsers
    annexB: true,
  };
}

// Interpret and default an options object

export function getOptions(opts?: Options | null): OptionsWithDefaults {
  // https://github.com/babel/babel/pull/16918
  // `options` is accessed frequently, please make sure it is a fast object.
  // `%ToFastProperties` can make it a fast object, but the performance is the same as the slow object.
  const options: any = createDefaultOptions();

  if (opts == null) {
    return options;
  }
  if (opts.annexB != null && opts.annexB !== false) {
    throw new Error("The `annexB` option can only be set to `false`.");
  }

  for (const key of Object.keys(options) as (keyof Options)[]) {
    if (opts[key] != null) options[key] = opts[key];
  }

  if (options.startLine === 1) {
    if (opts.startIndex == null && options.startColumn > 0) {
      options.startIndex = options.startColumn;
    } else if (opts.startColumn == null && options.startIndex > 0) {
      options.startColumn = options.startIndex;
    }
  } else if (opts.startColumn == null || opts.startIndex == null) {
    if (opts.startIndex != null || process.env.BABEL_8_BREAKING) {
      throw new Error(
        "With a `startLine > 1` you must also specify `startIndex` and `startColumn`.",
      );
    }
  }

  return options;
}
