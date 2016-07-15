import detectIndent from "detect-indent";
import SourceMap from "./source-map";
import * as messages from "babel-messages";
import Printer from "./printer";

/**
 * Babel's code generator, turns an ast into code, maintaining sourcemaps,
 * user preferences, and valid output.
 */

class Generator extends Printer {
  constructor(ast, opts, code) {
    opts = opts || {};

    const tokens = ast.tokens || [];
    let format = Generator.normalizeOptions(code, opts, tokens);
    let map = opts.sourceMaps ? new SourceMap(opts, code) : null;
    super(format, map, tokens);

    this.ast = ast;
  }

  format: {
    shouldPrintComment: (comment: string) => boolean;
    retainLines: boolean;
    comments: boolean;
    auxiliaryCommentBefore: string;
    auxiliaryCommentAfter: string;
    compact: boolean | "auto";
    minified: boolean;
    quotes: "single" | "double";
    concise: boolean;
    indent: {
      adjustMultilineComment: boolean;
      style: string;
      base: number;
    }
  };

  ast: Object;

  /**
   * Normalize generator options, setting defaults.
   *
   * - Detects code indentation.
   * - If `opts.compact = "auto"` and the code is over 100KB, `compact` will be set to `true`.
   */

  static normalizeOptions(code, opts, tokens) {
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
      quotes: opts.quotes || Generator.findCommonStringDelimiter(code, tokens),
      indent: {
        adjustMultilineComment: true,
        style: style,
        base: 0
      }
    };

    if (format.minified) {
      format.compact = true;
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
  static findCommonStringDelimiter(code, tokens) {
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
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  generate() {
    this.print(this.ast);
    this.printAuxAfterComment();

    return this._buf.get();
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
