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
  if (!loc) return; // no locaiton info

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

  var print = function (node) {
    return self.print(node, parent);
  };

  print.sequence = function (nodes) {
    return self.printJoin(print, nodes);
  };

  return print;
};

CodeGenerator.prototype.print = function (node, parent) {
  if (!node) return "";

  if (this[node.type]) {
    this.printLeadingComments(node);
    this.mark(node, "start");

    var needsParans = t.needsParans(node, parent);
    if (needsParans) this.push("(");
    this[node.type](node, this.buildPrint(node), parent);
    if (needsParans) this.push(")");

    this.mark(node, "end");
    this.printTrailingComments(node);
  } else {
    throw new ReferenceError("unknown node " + node.type + " " + JSON.stringify(node));
  }
};

CodeGenerator.prototype.generateComment = function (comment) {
  var val = comment.value;
  if (comment.type === "Line") {
    if (_.last(val) !== "\n") {
      val += "\n";
    }
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
    if (opts.iterator) {
      opts.iterator(node, i);
    } else {
      print(node);
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
