import detectIndent from "detect-indent";
import SourceMap from "./source-map";
import * as messages from "babel-messages";
import Printer from "./printer";
import type {Format} from "./printer";

/**
 * Babel's code generator, turns an ast into code, maintaining sourcemaps,
 * user preferences, and valid output.
 */

class Generator extends Printer {
  constructor(ast, opts, code) {
    opts = opts || {};

    const tokens = ast.tokens || [];
    let format = normalizeOptions(code, opts, tokens);
    let map = opts.sourceMaps ? new SourceMap(opts, code) : null;
    super(format, map, tokens);

    this.ast = ast;
  }

  ast: Object;

  /**
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  generate() {
    return super.generate(this.ast);
  }
}

/**
 * Normalize generator options, setting defaults.
 *
 * - Detects code indentation.
 * - If `opts.compact = "auto"` and the code is over 100KB, `compact` will be set to `true`.
 */

function normalizeOptions(code, opts, tokens): Format {
  let style = "  ";
  if (code && typeof code === "string") {
    let indent = detectIndent(code).indent;
    if (indent && indent !== " ") style = indent;
  }

  let format = {
    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
    shouldPrintComment: opts.shouldPrintComment,
    retainLines: opts.retainLines,
    comments: opts.comments == null || opts.comments,
    compact: opts.compact,
    minified: opts.minified,
    concise: opts.concise,
    quotes: opts.quotes || findCommonStringDelimiter(code, tokens),
    indent: {
      adjustMultilineComment: true,
      style: style,
      base: 0
    }
  };

  if (format.minified) {
    format.compact = true;

    format.shouldPrintComment = format.shouldPrintComment || (() => format.comments);
  } else {
    format.shouldPrintComment = format.shouldPrintComment || ((value) => format.comments ||
      (value.indexOf("@license") >= 0 || value.indexOf("@preserve") >= 0));
  }

  if (format.compact === "auto") {
    format.compact = code.length > 100000; // 100KB

    if (format.compact) {
      console.error("[BABEL] " + messages.get("codeGeneratorDeopt", opts.filename, "100KB"));
    }
  }

  if (format.compact) {
    format.indent.adjustMultilineComment = false;
  }

  return format;
}

/**
 * Determine if input code uses more single or double quotes.
 */
function findCommonStringDelimiter(code, tokens) {
  const DEFAULT_STRING_DELIMITER = "double";
  if (!code) {
    return DEFAULT_STRING_DELIMITER;
  }

  let occurences = {
    single: 0,
    double: 0
  };

  let checked = 0;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token.type.label !== "string") continue;

    let raw = code.slice(token.start, token.end);
    if (raw[0] === "'") {
      occurences.single++;
    } else {
      occurences.double++;
    }

    checked++;
    if (checked >= 3) break;
  }
  if (occurences.single > occurences.double) {
    return "single";
  } else {
    return "double";
  }
}

/**
 * We originally exported the Generator class above, but to make it extra clear that it is a private API,
 * we have moved that to an internal class instance and simplified the interface to the two public methods
 * that we wish to support.
 */

export class CodeGenerator {
  constructor(ast, opts, code) {
    this._generator = new Generator(ast, opts, code);
  }
  generate() {
    return this._generator.generate();
  }
}

export default function (ast: Object, opts: Object, code: string): Object {
  let gen = new Generator(ast, opts, code);
  return gen.generate();
}
