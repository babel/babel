module.exports = function (ast, opts) {
  var gen = new CodeGenerator;
  return gen.generate(ast, opts);
};

module.exports.CodeGenerator = CodeGenerator;

var assert = require("assert");
var _      = require("lodash");

function CodeGenerator() {
  this.indent = this.indent.bind(this);
  this.print  = this.print.bind(this);
}

CodeGenerator.prototype.generate = function (ast, opts) {
  opts = opts || {};
  return {
    map:  null,
    ast:  ast,
    code: this.print(ast)
  };
};

CodeGenerator.prototype.buildPrint = function (parent) {
  var self = this;

  var print = function (node) {
    return self.print(node, parent);
  };

  print.sequence = function (nodes) {
    return self.printSequence(nodes, print);
  };

  return print;
};

CodeGenerator.prototype.print = function (node, parent) {
  if (!node) return "";

  if (this[node.type]) {
    return this[node.type](node, this.buildPrint(node), parent);
  } else {
    throw new ReferenceError("unknown node " + node.type + " " + JSON.stringify(node));
  }
};

CodeGenerator.prototype.printSequence = function (nodes, print) {
  return nodes.map(print).join("\n");
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

CodeGenerator.prototype.indent = function (str) {
  return str.split("\n").map(function (line) {
    return "  " + line;
  }).join("\n");
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
