"use strict";

module.exports = Node;

var whitespace = require("./whitespace");
var parens     = require("./parentheses");
var each       = require("lodash/collection/each");
var some       = require("lodash/collection/some");
var t          = require("../../types");

var find = function (obj, node, parent) {
  if (!obj) return;
  var result;

  var types = Object.keys(obj);
  for (var i = 0; i < types.length; i++) {
    var type = types[i];

    if (t.is(type, node)) {
      var fn = obj[type];
      result = fn(node, parent);
      if (result != null) break;
    }
  }

  return result;
};

function Node(node, parent) {
  this.parent = parent;
  this.node   = node;
}

Node.isUserWhitespacable = function (node) {
  return t.isUserWhitespacable(node);
};

Node.needsWhitespace = function (node, parent, type) {
  if (!node) return 0;

  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  var linesInfo = find(whitespace.nodes, node, parent);

  if (!linesInfo) {
    var items = find(whitespace.list, node, parent);
    if (items) {
      for (var i = 0; i < items.length; i++) {
        linesInfo = Node.needsWhitespace(items[i], node, type);
        if (linesInfo) break;
      }
    }
  }

  return (linesInfo && linesInfo[type]) || 0;
};

Node.needsWhitespaceBefore = function (node, parent) {
  return Node.needsWhitespace(node, parent, "before");
};

Node.needsWhitespaceAfter = function (node, parent) {
  return Node.needsWhitespace(node, parent, "after");
};

Node.needsParens = function (node, parent) {
  if (!parent) return false;

  if (t.isNewExpression(parent) && parent.callee === node) {
    if (t.isCallExpression(node)) return true;

    var hasCall = some(node, function (val) {
      return t.isCallExpression(val);
    });
    if (hasCall) return true;
  }

  return find(parens, node, parent);
};

Node.needsParensNoLineTerminator = function (node, parent) {
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

each(Node, function (fn, key) {
  Node.prototype[key] = function () {
    // Avoid leaking arguments to prevent deoptimization
    var args = new Array(arguments.length + 2);

    args[0] = this.node;
    args[1] = this.parent;

    for (var i = 0; i < args.length; i++) {
      args[i + 2] = arguments[i];
    }

    return Node[key].apply(null, args);
  };
});
