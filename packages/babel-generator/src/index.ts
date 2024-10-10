import SourceMap from "./source-map.ts";
import Printer from "./printer.ts";
import type * as t from "@babel/types";
import type { Opts as jsescOptions } from "jsesc";
import type { Format } from "./printer.ts";
import type {
  EncodedSourceMap,
  DecodedSourceMap,
  Mapping,
} from "@jridgewell/gen-mapping";

/**
 * Normalize generator options, setting defaults.
 *
 * - Detects code indentation.
 * - If `opts.compact = "auto"` and the code is over 500KB, `compact` will be set to `true`.
 */

function normalizeOptions(
  code: string | { [filename: string]: string },
  opts: GeneratorOptions,
  ast: t.Node,
): Format {
  if (opts.experimental_preserveFormat) {
    if (typeof code !== "string") {
      throw new Error(
        "`experimental_preserveFormat` requires the original `code` to be passed to @babel/generator as a string",
      );
    }
    if (!opts.retainLines) {
      throw new Error(
        "`experimental_preserveFormat` requires `retainLines` to be set to `true`",
      );
    }
    if (opts.compact && opts.compact !== "auto") {
      throw new Error(
        "`experimental_preserveFormat` is not compatible with the `compact` option",
      );
    }
    if (opts.minified) {
      throw new Error(
        "`experimental_preserveFormat` is not compatible with the `minified` option",
      );
    }
    if (opts.jsescOption) {
      throw new Error(
        "`experimental_preserveFormat` is not compatible with the `jsescOption` option",
      );
    }
    if (!Array.isArray((ast as any).tokens)) {
      throw new Error(
        "`experimental_preserveFormat` requires the AST to have attatched the token of the input code. Make sure to enable the `tokens: true` parser option.",
      );
    }
  }

  const format: Format = {
    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
    shouldPrintComment: opts.shouldPrintComment,
    preserveFormat: opts.experimental_preserveFormat,
    retainLines: opts.retainLines,
    retainFunctionParens: opts.retainFunctionParens,
    comments: opts.comments == null || opts.comments,
    compact: opts.compact,
    minified: opts.minified,
    concise: opts.concise,
    indent: {
      adjustMultilineComment: true,
      style: "  ",
    },
    jsescOption: {
      quotes: "double",
      wrap: true,
      minimal: process.env.BABEL_8_BREAKING ? true : false,
      ...opts.jsescOption,
    },
    topicToken: opts.topicToken,
    importAttributesKeyword: opts.importAttributesKeyword,
  };

  if (!process.env.BABEL_8_BREAKING) {
    format.decoratorsBeforeExport = opts.decoratorsBeforeExport;
    format.jsescOption.json = opts.jsonCompatibleStrings;
    format.recordAndTupleSyntaxType = opts.recordAndTupleSyntaxType ?? "hash";
  }

  if (format.minified) {
    format.compact = true;

    format.shouldPrintComment =
      format.shouldPrintComment || (() => format.comments);
  } else {
    format.shouldPrintComment =
      format.shouldPrintComment ||
      (value =>
        format.comments ||
        value.includes("@license") ||
        value.includes("@preserve"));
  }

  if (format.compact === "auto") {
    format.compact = typeof code === "string" && code.length > 500_000; // 500KB

    if (format.compact) {
      console.error(
        "[BABEL] Note: The code generator has deoptimised the styling of " +
          `${opts.filename} as it exceeds the max of ${"500KB"}.`,
      );
    }
  }

  if (format.compact || format.preserveFormat) {
    format.indent.adjustMultilineComment = false;
  }

  const { auxiliaryCommentBefore, auxiliaryCommentAfter, shouldPrintComment } =
    format;

  if (auxiliaryCommentBefore && !shouldPrintComment(auxiliaryCommentBefore)) {
    format.auxiliaryCommentBefore = undefined;
  }
  if (auxiliaryCommentAfter && !shouldPrintComment(auxiliaryCommentAfter)) {
    format.auxiliaryCommentAfter = undefined;
  }

  return format;
}

export interface GeneratorOptions {
  /**
   * Optional string to add as a block comment at the start of the output file.
   */
  auxiliaryCommentBefore?: string;

  /**
   * Optional string to add as a block comment at the end of the output file.
   */
  auxiliaryCommentAfter?: string;

  /**
   * Function that takes a comment (as a string) and returns true if the comment should be included in the output.
   * By default, comments are included if `opts.comments` is `true` or if `opts.minified` is `false` and the comment
   * contains `@preserve` or `@license`.
   */
  shouldPrintComment?(comment: string): boolean;

  /**
   * Preserve the input code format while printing the transformed code.
   * This is experimental, and may have breaking changes in future
   * patch releases. It will be removed in a future minor release,
   * when it will graduate to stable.
   */
  experimental_preserveFormat?: boolean;

  /**
   * Attempt to use the same line numbers in the output code as in the source code (helps preserve stack traces).
   * Defaults to `false`.
   */
  retainLines?: boolean;

  /**
   * Retain parens around function expressions (could be used to change engine parsing behavior)
   * Defaults to `false`.
   */
  retainFunctionParens?: boolean;

  /**
   * Should comments be included in output? Defaults to `true`.
   */
  comments?: boolean;

  /**
   * Set to true to avoid adding whitespace for formatting. Defaults to the value of `opts.minified`.
   */
  compact?: boolean | "auto";

  /**
   * Should the output be minified. Defaults to `false`.
   */
  minified?: boolean;

  /**
   * Set to true to reduce whitespace (but not as much as opts.compact). Defaults to `false`.
   */
  concise?: boolean;

  /**
   * Used in warning messages
   */
  filename?: string;

  /**
   * Enable generating source maps. Defaults to `false`.
   */
  sourceMaps?: boolean;

  inputSourceMap?: any;

  /**
   * A root for all relative URLs in the source map.
   */
  sourceRoot?: string;

  /**
   * The filename for the source code (i.e. the code in the `code` argument).
   * This will only be used if `code` is a string.
   */
  sourceFileName?: string;

  /**
   * Set to true to run jsesc with "json": true to print "\u00A9" vs. "©";
   * @deprecated use `jsescOptions: { json: true }` instead
   */
  jsonCompatibleStrings?: boolean;

  /**
   * Set to true to enable support for experimental decorators syntax before
   * module exports. If not specified, decorators will be printed in the same
   * position as they were in the input source code.
   * @deprecated Removed in Babel 8
   */
  decoratorsBeforeExport?: boolean;

  /**
   * Options for outputting jsesc representation.
   */
  jsescOption?: jsescOptions;

  /**
   * For use with the recordAndTuple token.
   * @deprecated It will be removed in Babel 8.
   */
  recordAndTupleSyntaxType?: "bar" | "hash";

  /**
   * For use with the Hack-style pipe operator.
   * Changes what token is used for pipe bodies’ topic references.
   */
  topicToken?: "%" | "#" | "@@" | "^^" | "^";

  /**
   * The import attributes syntax style:
   * - "with"        : `import { a } from "b" with { type: "json" };`
   * - "assert"      : `import { a } from "b" assert { type: "json" };`
   * - "with-legacy" : `import { a } from "b" with type: "json";`
   */
  importAttributesKeyword?: "with" | "assert" | "with-legacy";
}

export interface GeneratorResult {
  code: string;
  map: EncodedSourceMap | null;
  decodedMap: DecodedSourceMap | undefined;
  rawMappings: Mapping[] | undefined;
}

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  /**
   * We originally exported the Generator class above, but to make it extra clear that it is a private API,
   * we have moved that to an internal class instance and simplified the interface to the two public methods
   * that we wish to support.
   */

  // eslint-disable-next-line no-restricted-globals
  exports.CodeGenerator = class CodeGenerator {
    private _ast: t.Node;
    private _format: Format | undefined;
    private _map: SourceMap | null;
    constructor(ast: t.Node, opts: GeneratorOptions = {}, code?: string) {
      this._ast = ast;
      this._format = normalizeOptions(code, opts, ast);
      this._map = opts.sourceMaps ? new SourceMap(opts, code) : null;
    }
    generate(): GeneratorResult {
      const printer = new Printer(this._format, this._map);

      return printer.generate(this._ast);
    }
  };
}

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param opts - used for specifying options for code generation.
 * @param code - the original source code, used for source maps.
 * @returns - an object containing the output code and source map.
 */
export default function generate(
  ast: t.Node,
  opts: GeneratorOptions = {},
  code?: string | { [filename: string]: string },
): GeneratorResult {
  const format = normalizeOptions(code, opts, ast);
  const map = opts.sourceMaps ? new SourceMap(opts, code) : null;

  const printer = new Printer(
    format,
    map,
    (ast as any).tokens,
    typeof code === "string" ? code : null,
  );

  return printer.generate(ast);
}
