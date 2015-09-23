/* @flow */

import detectIndent from "detect-indent";
import Whitespace from "./whitespace";
import NodePrinter from "./node/printer";
import repeating from "repeating";
import SourceMap from "./source-map";
import Position from "./position";
import * as messages from "babel-messages";
import Buffer from "./buffer";
import extend from "lodash/object/extend";
import each from "lodash/collection/each";
import n from "./node";
import * as t from "babel-types";

/**
 * Babel's code generator, turns an ast into code, maintaining sourcemaps,
 * user preferences, and valid output.
 */

class CodeGenerator {
  constructor(ast, opts, code) {
    opts = opts || {};

    this.comments = ast.comments || [];
    this.tokens   = ast.tokens || [];
    this.format   = CodeGenerator.normalizeOptions(code, opts, this.tokens);
    this.opts     = opts;
    this.ast      = ast;

    this.whitespace = new Whitespace(this.tokens);
    this.position   = new Position;
    this.map        = new SourceMap(this.position, opts, code);
    this.buffer     = new Buffer(this.position, this.format);
  }

  format: {
    shouldPrintComment: boolean;
    retainLines: boolean;
    comments: boolean;
    compact: boolean | "auto";
    quotes: "single" | "double";
    concise: boolean;
    indent: {
      adjustMultilineComment: boolean;
      style: string;
      base: number;
    }
  };

  whitespace: Whitespace;
  position: Position;
  map: SourceMap;
  buffer: Buffer;
  comments: Array<Object>;
  tokens: Array<Object>;
  opts: Object;
  ast: Object;

  /**
   * Normalize generator options, setting defaults.
   *
   * - Detects code indentation.
   * - If `opts.compact = "auto"` and the code is over 100KB, `compact` will be set to `true`.
   */

  static normalizeOptions(code, opts, tokens) {
    let style = "  ";
    if (code) {
      let indent = detectIndent(code).indent;
      if (indent && indent !== " ") style = indent;
    }

    let format = {
      shouldPrintComment: opts.shouldPrintComment,
      retainLines: opts.retainLines,
      comments: opts.comments == null || opts.comments,
      compact: opts.compact,
      concise: opts.concise,
      quotes: CodeGenerator.findCommonStringDelimiter(code, tokens),
      indent: {
        adjustMultilineComment: true,
        style: style,
        base: 0
      }
    };

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

    return {
      map:  this.map.get(),
      code: this.buffer.get()
    };
  }

  /**
   * Build NodePrinter.
   */

  buildPrint(parent) {
    return new NodePrinter(this, parent);
  }

  catchUp(node) {
    // catch up to this nodes newline if we're behind
    if (node.loc && this.format.retainLines && this.buffer.buf) {
      while (this.position.line < node.loc.start.line) {
        this._push("\n");
      }
    }
  }

  _printNewline(leading, node, parent, opts) {
    if (!opts.statement && !n.isUserWhitespacable(node, parent)) {
      return;
    }

    let lines = 0;

    if (node.start != null && !node._ignoreUserWhitespace) {
      // user node
      if (leading) {
        lines = this.whitespace.getNewlinesBefore(node);
      } else {
        lines = this.whitespace.getNewlinesAfter(node);
      }
    } else {
      // generated node
      if (!leading) lines++; // always include at least a single line after
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;

      let needs = n.needsWhitespaceAfter;
      if (leading) needs = n.needsWhitespaceBefore;
      if (needs(node, parent)) lines++;

      // generated nodes can't add starting file whitespace
      if (!this.buffer.buf) lines = 0;
    }

    this.newline(lines);
  }

  print(node, parent, opts = {}) {
    if (!node) return;

    if (parent && parent._compact) {
      node._compact = true;
    }

    let oldConcise = this.format.concise;
    if (node._compact) {
      this.format.concise = true;
    }

    if (!this[node.type]) {
      throw new ReferenceError(`unknown node of type ${JSON.stringify(node.type)} with constructor ${JSON.stringify(node && node.constructor.name)}`);
    }

    let needsParens = n.needsParens(node, parent);
    if (needsParens) this.push("(");

    this.printLeadingComments(node, parent);

    this.catchUp(node);

    this._printNewline(true, node, parent, opts);

    if (opts.before) opts.before();
    this.map.mark(node, "start");

    this[node.type](node, this.buildPrint(node), parent);

    if (needsParens) this.push(")");

    this.map.mark(node, "end");
    if (opts.after) opts.after();

    this.format.concise = oldConcise;

    this._printNewline(false, node, parent, opts);

    this.printTrailingComments(node, parent);
  }

  printJoin(print, nodes: ?Array, opts = {}) {
    if (!nodes || !nodes.length) return;

    let len = nodes.length;
    let node, i;

    if (opts.indent) this.indent();

    let printOpts = {
      statement: opts.statement,
      addNewlines: opts.addNewlines,
      after: () => {
        if (opts.iterator) {
          opts.iterator(node, i);
        }

        if (opts.separator && i < len - 1) {
          this.push(opts.separator);
        }
      }
    };

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      print.plain(node, printOpts);
    }

    if (opts.indent) this.dedent();
  }

  printAndIndentOnComments(print, node) {
    let indent = !!node.leadingComments;
    if (indent) this.indent();
    print.plain(node);
    if (indent) this.dedent();
  }

  printBlock(print, node) {
    if (t.isEmptyStatement(node)) {
      this.semicolon();
    } else {
      this.push(" ");
      print.plain(node);
    }
  }

  generateComment(comment) {
    let val = comment.value;
    if (comment.type === "CommentLine") {
      val = `//${val}`;
    } else {
      val = `/*${val}*/`;
    }
    return val;
  }

  printTrailingComments(node, parent) {
    this._printComments(this.getComments("trailingComments", node, parent));
  }

  printLeadingComments(node, parent) {
    this._printComments(this.getComments("leadingComments", node, parent));
  }

  getComments(key, node, parent) {
    if (t.isExpressionStatement(parent)) {
      return [];
    }

    let comments = [];
    let nodes: Array<Object> = [node];

    if (t.isExpressionStatement(node)) {
      nodes.push(node.argument);
    }

    for (let node of nodes) {
      comments = comments.concat(this._getComments(key, node));
    }

    return comments;
  }

  _getComments(key, node) {
    return (node && node[key]) || [];
  }

  shouldPrintComment(comment) {
    if (this.format.shouldPrintComment) {
      return this.format.shouldPrintComment(comment.value);
    } else {
      if (comment.value.indexOf("@license") >= 0 || comment.value.indexOf("@preserve") >= 0) {
        return true;
      } else {
        return this.format.comments;
      }
    }
  }

  _printComments(comments) {
    if (!comments || !comments.length) return;

    for (let comment of (comments: Array)) {
      if (!this.shouldPrintComment(comment)) continue;
      if (comment._displayed) continue;
      comment._displayed = true;

      this.catchUp(comment);

      // whitespace before
      this.newline(this.whitespace.getNewlinesBefore(comment));

      let column = this.position.column;
      let val    = this.generateComment(comment);

      if (column && !this.isLast(["\n", " ", "[", "{"])) {
        this._push(" ");
        column++;
      }

      //
      if (comment.type === "CommentBlock" && this.format.indent.adjustMultilineComment) {
        let offset = comment.loc && comment.loc.start.column;
        if (offset) {
          let newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }

        let indent = Math.max(this.indentSize(), column);
        val = val.replace(/\n/g, `\n${repeating(" ", indent)}`);
      }

      if (column === 0) {
        val = this.getIndent() + val;
      }

      // force a newline for line comments when retainLines is set in case the next printed node
      // doesn't catch up
      if ((this.format.compact || this.format.retainLines) && comment.type === "CommentLine") {
        val += "\n";
      }

      //
      this._push(val);

      // whitespace after
      this.newline(this.whitespace.getNewlinesAfter(comment));
    }
  }
}

each(Buffer.prototype, function (fn, key) {
  CodeGenerator.prototype[key] = function () {
    return fn.apply(this.buffer, arguments);
  };
});

each([
  require("./generators/template-literals"),
  require("./generators/comprehensions"),
  require("./generators/expressions"),
  require("./generators/statements"),
  require("./generators/classes"),
  require("./generators/methods"),
  require("./generators/modules"),
  require("./generators/types"),
  require("./generators/flow"),
  require("./generators/base"),
  require("./generators/jsx")
], function (generator) {
  extend(CodeGenerator.prototype, generator);
});

export default function (ast: Object, opts: Object, code: string): Object {
  let gen = new CodeGenerator(ast, opts, code);
  return gen.generate();
}
