"use strict";

module.exports = function (ast, opts, code) {
  var gen = new CodeGenerator(ast, opts, code);
  return gen.generate();
};

module.exports.CodeGenerator = CodeGenerator;

var detectIndent = require("detect-indent");
var Whitespace   = require("./whitespace");
var repeating    = require("repeating");
var SourceMap    = require("./source-map");
var Position     = require("./position");
var messages     = require("../messages");
var Buffer       = require("./buffer");
var extend       = require("lodash/object/extend");
var each         = require("lodash/collection/each");
var n            = require("./node");
var t            = require("../types");

function CodeGenerator(ast, opts, code) {
  opts = opts || {};

  this.comments = ast.comments || [];
  this.tokens   = ast.tokens || [];
  this.format   = CodeGenerator.normalizeOptions(code, opts);
  this.opts     = opts;
  this.ast      = ast;

  this.whitespace = new Whitespace(this.tokens, this.comments, this.format);
  this.position   = new Position;
  this.map        = new SourceMap(this.position, opts, code);
  this.buffer     = new Buffer(this.position, this.format);
}

each(Buffer.prototype, function (fn, key) {
  CodeGenerator.prototype[key] = function () {
    return fn.apply(this.buffer, arguments);
  };
});

CodeGenerator.normalizeOptions = function (code, opts) {
  var style = "  ";
  if (code) {
    var indent = detectIndent(code).indent;
    if (indent && indent !== " ") style = indent;
  }

  var format = {
    comments: opts.comments == null || opts.comments,
    compact: opts.compact,
    indent: {
      adjustMultilineComment: true,
      style: style,
      base: 0
    }
  };

  if (format.compact === "auto") {
    format.compact = code.length > 100000; // 100KB

    if (format.compact) {
      console.error(messages.get("codeGeneratorDeopt", opts.filename, "100KB"));
    }
  }

  return format;
};

CodeGenerator.generators = {
  templateLiterals: require("./generators/template-literals"),
  comprehensions:   require("./generators/comprehensions"),
  expressions:      require("./generators/expressions"),
  statements:       require("./generators/statements"),
  playground:       require("./generators/playground"),
  classes:          require("./generators/classes"),
  methods:          require("./generators/methods"),
  modules:          require("./generators/modules"),
  types:            require("./generators/types"),
  flow:             require("./generators/flow"),
  base:             require("./generators/base"),
  jsx:              require("./generators/jsx")
};

each(CodeGenerator.generators, function (generator) {
  extend(CodeGenerator.prototype, generator);
});

CodeGenerator.prototype.generate = function () {
  var ast = this.ast;

  this.print(ast);

  var comments = [];
  each(ast.comments, function (comment) {
    if (!comment._displayed) comments.push(comment);
  });
  this._printComments(comments);

  return {
    map:  this.map.get(),
    code: this.buffer.get()
  };
};

CodeGenerator.prototype.buildPrint = function (parent) {
  var self = this;

  var print = function (node, opts) {
    return self.print(node, parent, opts);
  };

  print.sequence = function (nodes, opts) {
    opts = opts || {};
    opts.statement = true;
    return self.printJoin(print, nodes, opts);
  };

  print.join = function (nodes, opts) {
    return self.printJoin(print, nodes, opts);
  };

  print.list = function (items, opts) {
    opts = opts || {};
    opts.separator = opts.separator || ", ";
    print.join(items, opts);
  };

  print.block = function (node) {
    return self.printBlock(print, node);
  };

  print.indentOnComments = function (node) {
    return self.printAndIndentOnComments(print, node);
  };

  return print;
};

CodeGenerator.prototype.print = function (node, parent, opts) {
  if (!node) return "";

  if (parent && parent._compact) {
    node._compact = true;
  }

  var oldConcise = this.format.concise;
  if (node._compact) {
    this.format.concise = true;
  }

  var self = this;

  opts = opts || {};

  var newline = function (leading) {
    if (!opts.statement && !n.isUserWhitespacable(node, parent)) {
      return;
    }

    var lines = 0;

    if (node.start != null && !node._ignoreUserWhitespace) {
      // user node
      if (leading) {
        lines = self.whitespace.getNewlinesBefore(node);
      } else {
        lines = self.whitespace.getNewlinesAfter(node);
      }
    } else {
      // generated node
      if (!leading) lines++; // always include at least a single line after
      if (opts.addNewlines) lines += opts.addNewlines(leading, node) || 0;

      var needs = n.needsWhitespaceAfter;
      if (leading) needs = n.needsWhitespaceBefore;
      if (needs(node, parent)) lines++;

      // generated nodes can't add starting file whitespace
      if (!self.buffer.buf) lines = 0;
    }

    self.newline(lines);
  };

  if (this[node.type]) {
    var needsNoLineTermParens = n.needsParensNoLineTerminator(node, parent);
    var needsParens           = needsNoLineTermParens || n.needsParens(node, parent);

    if (needsParens) this.push("(");
    if (needsNoLineTermParens) this.indent();

    this.printLeadingComments(node, parent);

    newline(true);

    if (opts.before) opts.before();
    this.map.mark(node, "start");

    this[node.type](node, this.buildPrint(node), parent);

    if (needsNoLineTermParens) {
      this.newline();
      this.dedent();
    }
    if (needsParens) this.push(")");

    this.map.mark(node, "end");
    if (opts.after) opts.after();

    newline(false);

    this.printTrailingComments(node, parent);
  } else {
    throw new ReferenceError("unknown node of type " + JSON.stringify(node.type) + " with constructor " + JSON.stringify(node && node.constructor.name));
  }

  this.format.concise = oldConcise;
};

CodeGenerator.prototype.printJoin = function (print, nodes, opts) {
  if (!nodes || !nodes.length) return;

  opts = opts || {};

  var self = this;
  var len  = nodes.length;

  if (opts.indent) self.indent();

  each(nodes, function (node, i) {
    print(node, {
      statement: opts.statement,
      addNewlines: opts.addNewlines,
      after: function () {
        if (opts.iterator) {
          opts.iterator(node, i);
        }

        if (opts.separator && i < len - 1) {
          self.push(opts.separator);
        }
      }
    });
  });

  if (opts.indent) self.dedent();
};

CodeGenerator.prototype.printAndIndentOnComments = function (print, node) {
  var indent = !!node.leadingComments;
  if (indent) this.indent();
  print(node);
  if (indent) this.dedent();
};

CodeGenerator.prototype.printBlock = function (print, node) {
  if (t.isEmptyStatement(node)) {
    this.semicolon();
  } else {
    this.push(" ");
    print(node);
  }
};

CodeGenerator.prototype.generateComment = function (comment) {
  var val = comment.value;
  if (comment.type === "Line") {
    val = "//" + val;
  } else {
    val = "/*" + val + "*/";
  }
  return val;
};

CodeGenerator.prototype.printTrailingComments = function (node, parent) {
  this._printComments(this.getComments("trailingComments", node, parent));
};

CodeGenerator.prototype.printLeadingComments = function (node, parent) {
  this._printComments(this.getComments("leadingComments", node, parent));
};

CodeGenerator.prototype.getComments = function (key, node, parent) {
  if (t.isExpressionStatement(parent)) {
    return [];
  }

  var comments = [];
  var nodes    = [node];
  var self     = this;

  if (t.isExpressionStatement(node)) {
    nodes.push(node.argument);
  }

  each(nodes, function (node) {
    comments = comments.concat(self._getComments(key, node));
  });

  return comments;
};

CodeGenerator.prototype._getComments = function (key, node) {
  return (node && node[key]) || [];
};

CodeGenerator.prototype._printComments = function (comments) {
  if (this.format.compact) return;

  if (!this.format.comments) return;
  if (!comments || !comments.length) return;

  var self = this;

  each(comments, function (comment) {
    var skip = false;

    // find the original comment in the ast and set it as displayed
    each(self.ast.comments, function (origComment) {
      if (origComment.start === comment.start) {
        // comment has already been output
        if (origComment._displayed) skip = true;

        origComment._displayed = true;
        return false;
      }
    });

    if (skip) return;

    // whitespace before
    self.newline(self.whitespace.getNewlinesBefore(comment));

    var column = self.position.column;
    var val    = self.generateComment(comment);

    if (column && !self.isLast(["\n", " ", "[", "{"])) {
      self._push(" ");
      column++;
    }

    //

    if (comment.type === "Block" && self.format.indent.adjustMultilineComment) {
      var offset = comment.loc.start.column;
      if (offset) {
        var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
        val = val.replace(newlineRegex, "\n");
      }

      var indent = Math.max(self.indentSize(), column);
      val = val.replace(/\n/g, "\n" + repeating(" ", indent));
    }

    if (column === 0) {
      val = self.getIndent() + val;
    }

    //

    self._push(val);

    // whitespace after
    self.newline(self.whitespace.getNewlinesAfter(comment));
  });
};
