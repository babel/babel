module.exports = Node;

var whitespace = require("./whitespace");
var parens     = require("./parentheses");
var t          = require("../../types");
var _          = require("lodash");

var find = function (obj, node, parent) {
  var result;

  _.each(obj, function (fn, type) {
    if (t["is" + type](node)) {
      result = fn(node, parent);
      if (result != null) return false;
    }
  });

  return result;
};

function Node(node, parent) {
  this.parent = parent;
  this.node   = node;
}

Node.prototype.isUserWhitespacable = function () {
  return t.isUserWhitespacable(this.node);
};

Node.prototype.needsWhitespace = function (type) {
  var parent = this.parent;
  var node   = this.node;
  if (!node) return 0;

  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  var lines = find(whitespace[type].nodes, node, parent);
  if (lines) return lines;

  _.each(find(whitespace[type].list, node, parent), function (expr) {
    lines = Node.needsWhitespace(expr, node, type);
    if (lines) return false;
  });
  return lines || 0;
};

Node.prototype.needsWhitespaceBefore = function () {
  return this.needsWhitespace("before");
};

Node.prototype.needsWhitespaceAfter = function () {
  return this.needsWhitespace("after");
};

Node.prototype.needsParens = function () {
  var parent = this.parent;
  var node   = this.node;

  if (!parent) return false;

  if (t.isNewExpression(parent) && parent.callee === node) {
    if (t.isCallExpression(node)) return true;

    var hasCall = _.some(node, function (val) {
      return t.isCallExpression(val);
    });
    if (hasCall) return true;
  }

  return find(parens, node, parent);
};

Node.prototype.needsParensNoLineTerminator = function () {
  var parent = this.parent;
  var node   = this.node;

  if (!parent) return false;

  // no comments
  if (!node.leadingComments || !node.leadingComments.length) {
    return false;
  }

  if (t.isYieldExpression(parent) || t.isAwaitExpression(parent)) {
    return true;
  }

  if (t.isContinueStatement(parent) || t.isBreakStatement(parent) ||
      t.isReturnStatement(parent) || t.isThrowStatement(parent)) {
    return true;
  }

  return false;
};

_.each(Node.prototype, function (fn, key) {
  Node[key] = function (node, parent) {
    var n = new Node(node, parent);

    var args = _.toArray(arguments).slice(2);
    return n[key].apply(n, args);
  };
});
