module.exports = function (code, ast, opts) {
  var gen = new CodeGenerator(code, ast, opts);
  return gen.generate();
};

module.exports.CodeGenerator = CodeGenerator;

var sourceMap = require("source-map");
var assert    = require("assert");
var util      = require("./util");
var t         = require("./types");
var _         = require("lodash");

function CodeGenerator(code, ast, opts) {
  opts = opts || {}

  this.tabWidth = 2;
  this.code     = code;
  this.opts     = opts;
  this.ast      = ast;
  this.buf      = "";

  this.line    = 1;
  this.column  = 0;
  this._indent = 0;

  if (opts.sourceMap) {
    this.map = new sourceMap.SourceMapGenerator({
      file: opts.sourceMapName
    });

    this.map.setSourceContent(opts.sourceFileName, code);
  } else {
    this.map = null;
  }
}

CodeGenerator.prototype.mark = function (node, locType) {
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
    original: loc[locType]
  });
};

CodeGenerator.prototype.newline = function () {
  this.buf = this.buf.replace(/\n(\s+)$/, "\n");
  this.buf += "\n";
  this.line++;
};

CodeGenerator.prototype.semicolon = function () {
  this.buf += ";";
  this.column++;
};

CodeGenerator.prototype.keyword = function (name) {
  this.push(name);
  this.push(" ");
};

CodeGenerator.prototype.push = function (str) {
  if (this._indent) {
    // we have an indent level and we aren't pushing a newline
    var indent = this.getIndent();

    // replace all newlines with newlines with the indentation
    str = str.replace(/\n/g, "\n" + indent);

    // we've got a newline before us so prepend on the indentation
    if (this.isLast("\n")) str = indent + str;
  }

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

CodeGenerator.prototype.isLast = function (cha) {
  return _.last(this.buf) === cha;
};

CodeGenerator.prototype.getIndent = function () {
  return util.repeat(this._indent * this.tabWidth);
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
    return self.printSequence(print, nodes, opts);
  };

  return print;
};

CodeGenerator.prototype.printSequence = function (print, nodes, opts) {
  var comments = this.ast.comments;
  var tokens   = this.ast.tokens;

  var self = this;
  opts = opts || {};

  // calculate the whitespace between two tokens
  var hasWhitespaceBetween = function (startToken, endToken) {
    if (!startToken) return false;

    var whitespace = false;

    var start = startToken.end;
    var end   = endToken.start;

    var sep = self.code.slice(start, end);

    var lines = 0;
    lines--; // take off the current line

    // remove comments
    _.each(comments, function (comment) {
      // this comment is after the last token or befor ethe first
      if (comment.end > end || comment.start < start) return;

      var length = comment.end - comment.start;

      // compute the relative positions of the comment within the sliced node
      // string
      var startRelative = comment.start - start;
      var endRelative = comment.end - start;

      // remove the line this comment ends with
      if (comment.type === "Line") lines--;

      // remove comment
      sep = sep.slice(0, startRelative) + util.repeat(length) + sep.slice(endRelative);
    });

    // check if there was a newline between the two nodes
    lines += _.size(sep.match(/\n/g));
    return lines > 0;
  };

  var needsNewlineBefore = function (node) {
    var startToken;
    var endToken;

    _.each(tokens, function (token, i) {
      // this is the token this node starts with
      if (node.start === token.start) {
        startToken = tokens[i - 1];
        endToken = token;
        return false;
      }
    });

    return hasWhitespaceBetween(startToken, endToken);
  };

  var needsNewlineAfter = function (node) {
    var startToken;
    var endToken;

    _.each(tokens, function (token, i) {
      // this is the token this node ends with
      if (node.end === token.end) {
        startToken = token;
        endToken = tokens[i + 1];
        return false;
      }
    });

    return hasWhitespaceBetween(startToken, endToken);
  };

  opts.print = function (node, i) {
    print(node, node && node.start != null && {
      before: function () {
        if (needsNewlineBefore(node)) self.newline();
      },

      after: function () {
        if (needsNewlineAfter(node)) self.newline();
      }
    });
  };

  return this.printJoin(print, nodes, "\n", opts);
};

CodeGenerator.prototype.print = function (node, parent, opts) {
  if (!node) return "";

  opts = opts || {};

  if (this[node.type]) {
    this.printLeadingComments(node);
    this.mark(node, "start");

    if (opts.before) opts.before();
    var needsParans = t.needsParans(node, parent);
    if (needsParans) this.push("(");
    this[node.type](node, this.buildPrint(node), parent);
    if (needsParans) this.push(")");
    if (opts.after) opts.after();

    this.mark(node, "end");
    this.printTrailingComments(node);
  } else {
    throw new ReferenceError("unknown node " + node.type + " " + JSON.stringify(node));
  }
};

CodeGenerator.prototype.generateComment = function (comment) {
  var val = comment.value;
  if (comment.type === "Line") {
    if (_.last(val) !== "\n") val += "\n";
    return "//" + val;
  } else {
    return "/*" + val + "*/\n";
  }
};

CodeGenerator.prototype.printTrailingComments = function (node) {
  var self = this;
  _.each(node.trailingComments, function (comment) {
    self.push(self.generateComment(comment));
  });
};

CodeGenerator.prototype.printLeadingComments = function (node) {
  var self = this;
  _.each(node.leadingComments, function (comment) {
    self.push(self.generateComment(comment));
  });
};

CodeGenerator.prototype.printJoin = function (print, nodes, sep, opts) {
  opts = opts || {};
  sep  = sep || "\n";

  var self = this;
  var len  = nodes.length;

  if (opts.indent) self.indent();

  _.each(nodes, function (node, i) {
    if (opts.print) {
      opts.print(node, i);
    } else {
      print(node);
    }

    if (opts.iterator) {
      opts.iterator(node, i);
    }

    if (i < len - 1) {
      self.push(sep);
    }
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
