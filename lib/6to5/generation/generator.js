module.exports = function (code, ast, opts) {
  var gen = new CodeGenerator(code, ast, opts);
  return gen.generate();
};

module.exports.CodeGenerator = CodeGenerator;

var Whitespace = require("./whitespace");
var SourceMap  = require("./source-map");
var Position   = require("./position");
var util       = require("../util");
var n          = require("./node");
var t          = require("../types");
var _          = require("lodash");

function CodeGenerator(code, ast, opts) {
  opts = opts || {};

  this.style = {
    semicolons: true,
    comments: true,
    compact: false,
    indent: {
      char: " ",
      width: 2
    }
  };

  this.comments = ast.comments || [];
  this.tokens   = ast.tokens || [];
  this.code     = code;
  this.opts     = opts;
  this.ast      = ast;
  this.buf      = "";

  this._indent = 0;

  this.whitespace = new Whitespace(this.tokens, this.comments);
  this.position   = new Position;
  this.map        = new SourceMap(this.position, opts, code);
}

CodeGenerator.generators = {
  arrayComprehensions: require("./generators/array-comprehensions"),
  templateLiterals:    require("./generators/template-literals"),
  expressions:         require("./generators/expressions"),
  statements:          require("./generators/statements"),
  classes:             require("./generators/classes"),
  methods:             require("./generators/methods"),
  modules:             require("./generators/modules"),
  types:               require("./generators/types"),
  base:                require("./generators/base"),
  jsx:                 require("./generators/jsx")
};

_.each(CodeGenerator.generators, function (generator) {
  _.extend(CodeGenerator.prototype, generator);
});

CodeGenerator.prototype.newline = function (i, removeLast) {
  if (!this.buf) return;
  if (this.style.compact) return;
  if (this.endsWith("{\n")) return;

  if (_.isBoolean(i)) {
    removeLast = i;
    i = null;
  }

  if (_.isNumber(i)) {
    var self = this;
    _.times(i, function () {
      self.newline(null, removeLast);
    });
    return;
  }

  if (removeLast && this.isLast("\n")) this.removeLast("\n");

  this.removeLast(" ");
  this.buf = this.buf.replace(/\n(\s+)$/, "\n");
  this._push("\n");
};

CodeGenerator.prototype.removeLast = function (cha) {
  if (!this.isLast(cha)) return;

  this.buf = this.buf.slice(0, -1);
  this.position.unshift(cha);
};

CodeGenerator.prototype.semicolon = function () {
  if (this.style.semicolons) this.push(";");
};

CodeGenerator.prototype.ensureSemicolon = function () {
  if (!this.isLast(";")) this.semicolon();
};

CodeGenerator.prototype.rightBrace = function () {
  this.newline(true);
  this.push("}");
};

CodeGenerator.prototype.keyword = function (name) {
  this.push(name);
  this.push(" ");
};

CodeGenerator.prototype.space = function () {
  if (this.buf && !this.isLast([" ", "\n"])) {
    this.push(" ");
  }
};

CodeGenerator.prototype.push = function (str, noIndent) {
  if (this._indent && !noIndent && str !== "\n") {
    // we have an indent level and we aren't pushing a newline
    var indent = this.getIndent();

    // replace all newlines with newlines with the indentation
    str = str.replace(/\n/g, "\n" + indent);

    // we've got a newline before us so prepend on the indentation
    if (this.isLast("\n")) str = indent + str;
  }

  this._push(str);
};

CodeGenerator.prototype._push = function (str) {
  this.position.push(str);
  this.buf += str;
};

CodeGenerator.prototype.endsWith = function (str) {
  return this.buf.slice(-str.length) === str;
};

CodeGenerator.prototype.isLast = function (cha, trimRight) {
  var buf = this.buf;
  if (trimRight) buf = buf.trimRight();

  var chars = [].concat(cha);
  return _.contains(chars, _.last(buf));
};

CodeGenerator.prototype.getIndent = function () {
  if (this.style.compact) {
    return "";
  } else {
    return util.repeat(this.indentSize(), this.style.indent.char);
  }
};

CodeGenerator.prototype.indentSize = function () {
  return this._indent * this.style.indent.width;
};

CodeGenerator.prototype.indent = function () {
  this._indent++;
};

CodeGenerator.prototype.dedent = function () {
  this._indent--;
};

CodeGenerator.prototype.generate = function () {
  var ast = this.ast;

  this.print(ast);

  this.buf = this.buf.trimRight();

  return {
    map:  this.map.get(),
    ast:  ast,
    code: this.buf
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

  var self = this;
  opts = opts || {};

  var newline = function (leading, fn) {
    var ignoreDuplicates = false;

    if (!opts.statement) {
      if (t.isUserWhitespacable(node)) {
        ignoreDuplicates = true;
      } else {
        return;
      }
    }

    var lines = 0;

    if (node.start != null) {
      // user node
      if (leading) {
        lines = self.whitespace.needsNewlineBefore(node);
      } else {
        lines = self.whitespace.needsNewlineAfter(node);
      }
    } else {
      // generated node
      if (!leading) lines++; // definently include a single line

      var needs = n.needsWhitespaceAfter;
      if (leading) needs = n.needsWhitespaceBefore;
      lines += needs(node, parent);
    }

    self.newline(lines, ignoreDuplicates);
  };

  if (this[node.type]) {
    this.printLeadingComments(node, parent);

    newline(true);

    if (opts.before) opts.before();
    this.map.mark(node, "start");

    var needsParans = n.needsParans(node, parent);
    if (needsParans) this.push("(");

    this[node.type](node, this.buildPrint(node), parent);

    if (needsParans) this.push(")");

    this.map.mark(node, "end");
    if (opts.after) opts.after();

    newline(false);

    this.printTrailingComments(node, parent);
  } else {
    throw new ReferenceError("unknown node " + node.type + " " + JSON.stringify(node));
  }
};

CodeGenerator.prototype.printJoin = function (print, nodes, opts) {
  opts = opts || {};

  var self = this;
  var len  = nodes.length;

  if (opts.indent) self.indent();

  _.each(nodes, function (node, i) {
    print(node, {
      statement: opts.statement,
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

  _.each(nodes, function (node) {
    comments = comments.concat(self._getComments(key, node));
  });

  return comments;
};

CodeGenerator.prototype._getComments = function (key, node) {
  return (node && node[key]) || [];
};

CodeGenerator.prototype._printComments = function (comments) {
  if (this.style.compact) return;
  if (!this.style.comments) return;
  if (!comments || !comments.length) return;

  var self = this;

  _.each(comments, function (comment, i) {
    // whitespace before
    self.newline(self.whitespace.needsNewlineBefore(comment));

    var column = self.position.column;
    var val    = self.generateComment(comment);

    if (column && !self.isLast(["\n", " ", "[", "{"])) {
      self._push(" ");
    }

    //

    var offset = comment.loc.start.column;
    if (offset) {
      var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
      val = val.replace(newlineRegex, "\n");
    }

    var indent = Math.max(self.indentSize(), column);
    val = val.replace(/\n/g, "\n" + util.repeat(indent));

    if (column === 0) {
      val = self.getIndent() + val;
    }

    //

    self._push(val);

    // whitespace after
    self.newline(self.whitespace.needsNewlineAfter(comment));
  });
};
