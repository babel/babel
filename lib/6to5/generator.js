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
  this._indent  = 0;
  this.opts     = opts;
  this.ast      = ast;
  this.buf      = "";

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

  var lines = this.buf.split("\n");

  var line = lines.length;
  var col  = _.last(lines).length;

  map.addMapping({
    source: this.opts.sourceFileName,
    generated: {
      line: line,
      column: col
    },
    original: loc[locType]
  });
};

CodeGenerator.prototype.newline = function () {
  this.buf += "\n";
};

CodeGenerator.prototype.push = function (str) {
  if (this._indent) {
    // we have an indent level and we aren't pushing a newline
    var indent = this.getIndent();

    // replace all newlines with newlines with the indentation
    str = str.replace(/\n/g, "\n" + indent);

    // we've got a newline before us so prepend on the indentation
    if (_.last(this.buf) === "\n") str = indent + str;
  }

  this.buf += str;
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

CodeGenerator.prototype.__indent = function (str) {
  return str.split("\n").map(function (line) {
    return "  " + line;
  }).join("\n");
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

CodeGenerator.prototype.printJoin = function (print, nodes, sep, indent) {
  sep = sep || "\n";

  var self = this;
  var len  = nodes.length;

  if (indent) self.indent();

  _.each(nodes, function (node, i) {
    print(node);

    if (i < len - 1) {
      self.push(sep);
    }
  });

  if (indent) self.dedent();
};

CodeGenerator.prototype.removeEmptyExpressions = function (nodes) {
  return nodes.filter(function (node) {
    if (node.type === "EmptyStatement") {
      return false;
    } else {
      return true;
    }
  });
};

CodeGenerator.generators = {
  arrayComprehensions: require("./generators/array-comprehensions"),
  base:                require("./generators/base"),
  classes:             require("./generators/classes"),
  expressions:         require("./generators/expressions"),
  methods:             require("./generators/methods"),
  modules:             require("./generators/modules"),
  statements:          require("./generators/statements"),
  types:               require("./generators/types"),
  jsx:                 require("./generators/jsx")
};

_.each(CodeGenerator.generators, function (generator) {
  _.extend(CodeGenerator.prototype, generator);
});
