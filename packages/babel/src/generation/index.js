import detectIndent from "detect-indent";
import Whitespace from "./whitespace";
import repeating from "repeating";
import SourceMap from "./source-map";
import Position from "./position";
import * as messages from "../messages";
import Buffer from "./buffer";
import extend from "lodash/object/extend";
import each from "lodash/collection/each";
import n from "./node";
import * as t from "../types";

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

  /**
   * Normalize generator options, setting defaults.
   *
   * - Detects code indentation.
   * - If `opts.compact = "auto"` and the code is over 100KB, `compact` will be set to `true`.
   */

  static normalizeOptions(code, opts, tokens) {
    var style = "  ";
    if (code) {
      var indent = detectIndent(code).indent;
      if (indent && indent !== " ") style = indent;
    }

    var format = {
      shouldPrintComment: opts.shouldPrintComment,
      retainLines: opts.retainLines,
      comments: opts.comments == null || opts.comments,
      compact: opts.compact,
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
    var occurences = {
      single: 0,
      double: 0
    };

    var checked = 0;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (token.type.label !== "string") continue;

      var raw = code.slice(token.start, token.end);
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
   * All node generators.
   */

  static generators = {
    templateLiterals: require("./generators/template-literals"),
    comprehensions:   require("./generators/comprehensions"),
    expressions:      require("./generators/expressions"),
    statements:       require("./generators/statements"),
    classes:          require("./generators/classes"),
    methods:          require("./generators/methods"),
    modules:          require("./generators/modules"),
    types:            require("./generators/types"),
    flow:             require("./generators/flow"),
    base:             require("./generators/base"),
    jsx:              require("./generators/jsx")
  };

  /**
   * Generate code and sourcemap from ast.
   *
   * Appends comments that weren't attached to any node to the end of the generated output.
   */

  generate() {
    var ast = this.ast;

    this.print(ast);

    if (ast.comments) {
      var comments = [];
      for (var comment of (ast.comments: Array)) {
        if (!comment._displayed) comments.push(comment);
      }
      this._printComments(comments);
    }

    return {
      map:  this.map.get(),
      code: this.buffer.get()
    };
  }

  /**
   * [Please add a description.]
   */

  catchUp(node) {
    // catch up to this nodes newline if we're behind
    if (node.loc && this.format.retainLines && this.buffer.buf) {
      while (this.position.line < node.loc.start.line) {
        this._push("\n");
      }
    }
  }

  /**
   * [Please add a description.]
   */

  _printNewline(leading, node, parent, opts) {
    if (!opts.statement && !n.isUserWhitespacable(node, parent)) {
      return;
    }

    var lines = 0;

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

      var needs = n.needsWhitespaceAfter;
      if (leading) needs = n.needsWhitespaceBefore;
      if (needs(node, parent)) lines++;

      // generated nodes can't add starting file whitespace
      if (!this.buffer.buf) lines = 0;
    }

    this.newline(lines);
  }

  /**
   * Print a plain node.
   */

  print(node, parent, opts = {}) {
    if (!node) return;

    if (parent && parent._compact) {
      node._compact = true;
    }

    var oldConcise = this.format.concise;
    if (node._compact) {
      this.format.concise = true;
    }

    if (!this[node.type]) {
      throw new ReferenceError(`unknown node of type ${JSON.stringify(node.type)} with constructor ${JSON.stringify(node && node.constructor.name)}`);
    }

    var needsParens = n.needsParens(node, parent);
    if (needsParens) this.push("(");

    this.printLeadingComments(node, parent);

    this.catchUp(node);

    this._printNewline(true, node, parent, opts);

    if (opts.before) opts.before();
    this.map.mark(node, "start");

    this[node.type](node, parent);

    if (needsParens) this.push(")");

    this.map.mark(node, "end");
    if (opts.after) opts.after();

    this.format.concise = oldConcise;

    this._printNewline(false, node, parent, opts);

    this.printTrailingComments(node, parent);
  }

  /**
   * Print a sequence of nodes as statements.
   */

  printJoin(nodes, parent, opts = {}) {
    if (!nodes || !nodes.length) return;

    var len = nodes.length;

    if (opts.indent) this.indent();

    var printOpts = {
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

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      this.print(node, parent, printOpts);
    }

    if (opts.indent) this.dedent();
  }

  /**
   * Print a sequence of nodes as expressions.
   */

  printSequence(nodes, parent, opts = {}) {
    opts.statement = true;
    return this.printJoin(nodes, parent, opts);
  }

  /**
   * Print a list of nodes, with a customizable separator (defaults to ",").
   */

  printList(items, parent, opts = {}) {
    if (opts.separator == null) {
      opts.separator = ",";
      if (!this.format.compact) opts.separator += " ";
    }

    return this.printJoin(items, parent, opts);
  }

  /**
   * Print node and indent comments.
   */

  printAndIndentOnComments(node, parent) {
    var indent = !!node.leadingComments;
    if (indent) this.indent();
    this.print(node, parent);
    if (indent) this.dedent();
  }

  /**
   * Print a block-like node.
   */

  printBlock(node, parent) {
    if (t.isEmptyStatement(node)) {
      this.semicolon();
    } else {
      this.push(" ");
      this.print(node, parent);
    }
  }

  /**
   * [Please add a description.]
   */

  generateComment(comment) {
    var val = comment.value;
    if (comment.type === "CommentLine") {
      val = `//${val}`;
    } else {
      val = `/*${val}*/`;
    }
    return val;
  }

  /**
   * [Please add a description.]
   */

  printTrailingComments(node, parent) {
    this._printComments(this.getComments("trailingComments", node, parent));
  }

  /**
   * [Please add a description.]
   */

  printInnerComments(node) {
    if (!node.innerComments) return;
    this.indent();
    this._printComments(node.innerComments);
    this.dedent();
  }

  /**
   * [Please add a description.]
   */

  printLeadingComments(node, parent) {
    this._printComments(this.getComments("leadingComments", node, parent));
  }

  /**
   * [Please add a description.]
   */

  getComments(key, node, parent) {
    if (t.isExpressionStatement(parent)) {
      return [];
    }

    var comments = [];
    var nodes    = [node];

    if (t.isExpressionStatement(node)) {
      nodes.push(node.argument);
    }

    for (let node of (nodes: Array)) {
      comments = comments.concat(this._getComments(key, node));
    }

    return comments;
  }

  /**
   * [Please add a description.]
   */

  _getComments(key, node) {
    return (node && node[key]) || [];
  }

  /**
   * [Please add a description.]
   */

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

  /**
   * [Please add a description.]
   */

  _printComments(comments) {
    if (!comments || !comments.length) return;

    for (var comment of (comments: Array)) {
      if (!this.shouldPrintComment(comment)) continue;
      if (comment._displayed) continue;
      comment._displayed = true;

      this.catchUp(comment);

      // whitespace before
      this.newline(this.whitespace.getNewlinesBefore(comment));

      var column = this.position.column;
      var val    = this.generateComment(comment);

      if (column && !this.isLast(["\n", " ", "[", "{"])) {
        this._push(" ");
        column++;
      }

      //
      if (comment.type === "CommentBlock" && this.format.indent.adjustMultilineComment) {
        var offset = comment.loc && comment.loc.start.column;
        if (offset) {
          var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }

        var indent = Math.max(this.indentSize(), column);
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

/**
 * Mixin all buffer functions so that they can be directly called on the
 * CodeGenerator instance
 */

each(Buffer.prototype, function (fn, key) {
  CodeGenerator.prototype[key] = function () {
    return fn.apply(this.buffer, arguments);
  };
});

/**
 * Mixin the generator function for each node type
 */

each(CodeGenerator.generators, function (generator) {
  extend(CodeGenerator.prototype, generator);
});

/**
 * [Please add a description.]
 */

module.exports = function (ast, opts, code) {
  var gen = new CodeGenerator(ast, opts, code);
  return gen.generate();
};

module.exports.CodeGenerator = CodeGenerator;
