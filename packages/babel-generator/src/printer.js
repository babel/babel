/* eslint max-len: 0 */

import repeat from "lodash/repeat";
import Buffer from "./buffer";
import * as n from "./node";
import * as t from "babel-types";

export default class Printer extends Buffer {
  constructor(...args) {
    super(...args);
    this.insideAux = false;
    this.printAuxAfterOnNextUserNode = false;
    this._printStack = [];
  }

  print(node, parent, opts = {}) {
    if (!node) return;

    this._lastPrintedIsEmptyStatement = false;

    if (parent && parent._compact) {
      node._compact = true;
    }

    let oldInAux = this.insideAux;
    this.insideAux = !node.loc;

    let oldConcise = this.format.concise;
    if (node._compact) {
      this.format.concise = true;
    }

    let printMethod = this[node.type];
    if (!printMethod) {
      throw new ReferenceError(`unknown node of type ${JSON.stringify(node.type)} with constructor ${JSON.stringify(node && node.constructor.name)}`);
    }

    this._printStack.push(node);

    if (node.loc) this.printAuxAfterComment();
    this.printAuxBeforeComment(oldInAux);

    let needsParens = n.needsParens(node, parent, this._printStack);
    if (needsParens) this.token("(");

    this.printLeadingComments(node, parent);

    this.catchUp(node);

    this._printNewline(true, node, parent, opts);

    if (opts.before) opts.before();

    let loc = (t.isProgram(node) || t.isFile(node)) ? null : node.loc;
    this.withSource("start", loc, () => {
      this[node.type](node, parent);
    });

    // Check again if any of our children may have left an aux comment on the stack
    if (node.loc) this.printAuxAfterComment();

    this.printTrailingComments(node, parent);

    if (needsParens) this.token(")");

    // end
    this._printStack.pop();
    if (opts.after) opts.after();

    this.format.concise = oldConcise;
    this.insideAux = oldInAux;

    this._printNewline(false, node, parent, opts);
  }

  printAuxBeforeComment(wasInAux) {
    let comment = this.format.auxiliaryCommentBefore;
    if (!wasInAux && this.insideAux && !this.printAuxAfterOnNextUserNode) {
      this.printAuxAfterOnNextUserNode = true;
      if (comment) this.printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  }

  printAuxAfterComment() {
    if (this.printAuxAfterOnNextUserNode) {
      this.printAuxAfterOnNextUserNode = false;
      let comment = this.format.auxiliaryCommentAfter;
      if (comment) this.printComment({
        type: "CommentBlock",
        value: comment
      });
    }
  }

  getPossibleRaw(node) {
    if (this.format.minified) return;

    let extra = node.extra;
    if (extra && extra.raw != null && extra.rawValue != null && node.value === extra.rawValue) {
      return extra.raw;
    }
  }

  printJoin(nodes: ?Array, parent: Object, opts = {}) {
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

        if (opts.separator && parent.loc) {
          this.printAuxAfterComment();
        }

        if (opts.separator && i < len - 1) {
          opts.separator.call(this);
        }
      }
    };

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      this.print(node, parent, printOpts);
    }

    if (opts.indent) this.dedent();
  }

  printAndIndentOnComments(node, parent) {
    let indent = !!node.leadingComments;
    if (indent) this.indent();
    this.print(node, parent);
    if (indent) this.dedent();
  }

  printBlock(parent) {
    let node = parent.body;

    if (!t.isEmptyStatement(node)) {
      this.space();
    }

    this.print(node, parent);
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
    this.printComments(this.getComments(false, node, parent));
  }

  printLeadingComments(node, parent) {
    this.printComments(this.getComments(true, node, parent));
  }

  printInnerComments(node, indent = true) {
    if (!node.innerComments) return;
    if (indent) this.indent();
    this.printComments(node.innerComments);
    if (indent) this.dedent();
  }

  printSequence(nodes, parent, opts = {}) {
    opts.statement = true;
    return this.printJoin(nodes, parent, opts);
  }

  printList(items, parent, opts = {}) {
    if (opts.separator == null) {
      opts.separator = commaSeparator;
    }

    return this.printJoin(items, parent, opts);
  }

  _printNewline(leading, node, parent, opts) {
    // Fast path since 'this.newline' does nothing when not tracking lines.
    if (this.format.retainLines || this.format.compact) return;

    if (!opts.statement && !n.isUserWhitespacable(node, parent)) {
      return;
    }

    // Fast path for concise since 'this.newline' just inserts a space when
    // concise formatting is in use.
    if (this.format.concise) {
      this.space();
      return;
    }

    let lines = 0;

    if (node.start != null && !node._ignoreUserWhitespace && this.tokens.length) {
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
      if (!this.buf) lines = 0;
    }

    this.newline(lines);
  }

  getComments(leading, node) {
    // Note, we use a boolean flag here instead of passing in the attribute name as it is faster
    // because this is called extremely frequently.
    return (node && (leading ? node.leadingComments : node.trailingComments)) || [];
  }

  shouldPrintComment(comment) {
    if (this.format.shouldPrintComment) {
      return this.format.shouldPrintComment(comment.value);
    } else {
      if (!this.format.minified &&
          (comment.value.indexOf("@license") >= 0 || comment.value.indexOf("@preserve") >= 0)) {
        return true;
      } else {
        return this.format.comments;
      }
    }
  }

  printComment(comment) {
    if (!this.shouldPrintComment(comment)) return;

    if (comment.ignore) return;
    comment.ignore = true;

    if (comment.start != null) {
      if (this.printedCommentStarts[comment.start]) return;
      this.printedCommentStarts[comment.start] = true;
    }

    // Exclude comments from source mappings since they will only clutter things.
    this.withSource(null, null, () => {
      this.catchUp(comment);

      // whitespace before
      this.newline(this.whitespace.getNewlinesBefore(comment));

      if (!this.endsWith(["[", "{"])) this.space();

      let val    = this.generateComment(comment);

      //
      if (comment.type === "CommentBlock" && this.format.indent.adjustMultilineComment) {
        let offset = comment.loc && comment.loc.start.column;
        if (offset) {
          let newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
          val = val.replace(newlineRegex, "\n");
        }

        let indent = Math.max(this.indentSize(), this.getCurrentColumn());
        val = val.replace(/\n/g, `\n${repeat(" ", indent)}`);
      }

      // force a newline for line comments when retainLines is set in case the next printed node
      // doesn't catch up
      if ((this.format.compact || this.format.concise || this.format.retainLines) &&
          comment.type === "CommentLine") {
        val += "\n";
      }

      //
      this.push(val);

      // whitespace after
      this.newline(this.whitespace.getNewlinesAfter(comment));
    });
  }

  printComments(comments?: Array<Object>) {
    if (!comments || !comments.length) return;

    for (let comment of comments) {
      this.printComment(comment);
    }
  }
}

function commaSeparator() {
  this.token(",");
  this.space();
}

for (let generator of [
  require("./generators/template-literals"),
  require("./generators/expressions"),
  require("./generators/statements"),
  require("./generators/classes"),
  require("./generators/methods"),
  require("./generators/modules"),
  require("./generators/types"),
  require("./generators/flow"),
  require("./generators/base"),
  require("./generators/jsx")
]) {
  Object.assign(Printer.prototype, generator);
}
