module.exports = function (code, ast, opts) {
  var gen = new CodeGenerator(code, ast, opts);
  return gen.generate();
};

module.exports.CodeGenerator = CodeGenerator;

var sourceMap = require("source-map");
var util      = require("./util");
var t         = require("./types");
var _         = require("lodash");

function CodeGenerator(code, ast, opts) {
  opts = opts || {};

  this.tabWidth = 2;
  this.comments = ast.comments || [];
  this.tokens   = _.sortBy(_.compact([].concat(ast.tokens, this.comments)), "start");
  this.code     = code;
  this.opts     = opts;
  this.ast      = ast;
  this.buf      = "";

  this.usedLineWhitespace = [];
  this._indent            = 0;
  this.column             = 0;
  this.line               = 1;

  if (opts.sourceMap) {
    this.map = new sourceMap.SourceMapGenerator({
      file: opts.sourceMapName
    });

    this.map.setSourceContent(opts.sourceFileName, code);
  } else {
    this.map = null;
  }
}

CodeGenerator.prototype.mark = function (node, type) {
  var loc = node.loc;
  if (!loc) return; // no location info

  var map = this.map;
  if (!map) return; // no source map

  map.addMapping({
    source: this.opts.sourceFileName,
    generated: {
      line: this.line,
      column: this.column
    },
    original: loc[type]
  });
};

CodeGenerator.prototype.newline = function (i, removeLast) {
  if (!this.buf) return;
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

  if (cha === "\n") {
    this.line--;
  } else {
    this.column--;
  }
};

CodeGenerator.prototype.semicolon = function () {
  this.push(";");
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
  var self = this;

  _.each(str, function (cha) {
    if (cha === "\n") {
      self.line++;
      self.column = 0;
    } else {
      self.column++;
    }
  });

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
  return util.repeat(this.indentSize());
};

CodeGenerator.prototype.indentSize = function () {
  return this._indent * this.tabWidth;
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

  var map = this.map;
  if (map) map = map.toJSON();

  return {
    map:  map,
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

  return print;
};

CodeGenerator.prototype.needsNewlineBefore = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;

  _.each(tokens, function (token, i) {
    // this is the token this node starts with
    if (node.start === token.start) {
      startToken = tokens[i - 1];
      endToken = token;
      return false;
    }
  });

  return this.hasWhitespaceBetween(startToken, endToken);
};

CodeGenerator.prototype.needsNewlineAfter = function (node) {
  var startToken;
  var endToken;
  var tokens = this.tokens;

  _.each(tokens, function (token, i) {
    // this is the token this node ends with
    if (node.end === token.end) {
      startToken = token;
      endToken = tokens[i + 1];
      return false;
    }
  });

  return this.hasWhitespaceBetween(startToken, endToken);
};

CodeGenerator.prototype.hasWhitespaceBetween = function (startToken, endToken) {
  if (!endToken) return false;

  var start = startToken ? startToken.loc.end.line : 1;
  var end   = endToken.loc.start.line;
  var sep   = this.code.slice(start, end);

  var lines = 0;

  for (var line = start; line < end; line++) {
    if (!_.contains(this.usedLineWhitespace, line)) {
      this.usedLineWhitespace.push(line);
      lines++;
    }
  }

  return lines;
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
      lines = fn.call(self, node);
    } else {
      // generated node
      if (!leading) lines++; // definently include a single line

      var needs = t.needsWhitespaceAfter;
      if (leading) needs = t.needsWhitespaceBefore;
      if (needs(node, opts.statement)) lines++;
    }

    self.newline(lines, ignoreDuplicates);
  };

  if (this[node.type]) {
    this.printLeadingComments(node, parent);

    newline(true, this.needsNewlineBefore);

    if (opts.before) opts.before();
    this.mark(node, "start");

    var needsParans = t.needsParans(node, parent);
    if (needsParans) this.push("(");

    this[node.type](node, this.buildPrint(node), parent);
    if (needsParans) this.push(")");

    this.mark(node, "end");
    if (opts.after) opts.after();

    newline(false, this.needsNewlineAfter);

    this.printTrailingComments(node, parent);
  } else {
    throw new ReferenceError("unknown node " + node.type + " " + JSON.stringify(node));
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
  if (!comments || !comments.length) return;

  var self = this;

  _.each(comments, function (comment, i) {
    // whitespace before
    self.newline(self.needsNewlineBefore(comment));

    var val = self.generateComment(comment);

    if (self.column && !self.isLast(["\n", " ", "[", "{"])) {
      self._push(" ");
    }

    //

    var offset = comment.loc.start.column;
    if (offset) {
      var newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
      val = val.replace(newlineRegex, "\n");
    }

    var indent = Math.max(self.indentSize(), self.column);
    val = val.replace(/\n/g, "\n" + util.repeat(indent));

    if (self.column == 0) {
      val = self.getIndent() + val;
    }

    //

    self._push(val);

    // whitespace after
    self.newline(self.needsNewlineAfter(comment));
  });
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
