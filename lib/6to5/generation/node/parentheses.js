"use strict";

var t    = require("../../types");
var each = require("lodash/collection/each");

var PRECEDENCE = {};

each([
  ["||"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!=="],
  ["<", ">", "<=", ">=", "in", "instanceof"],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"],
  ["**"]
], function (tier, i) {
  each(tier, function (op) {
    PRECEDENCE[op] = i;
  });
});

exports.UpdateExpression = function (node, parent) {
  if (t.isMemberExpression(parent) && parent.object === node) {
    // (foo++).test()
    return true;
  }
};

exports.ObjectExpression = function (node, parent) {
  if (t.isExpressionStatement(parent)) {
    // ({ foo: "bar" });
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    // ({ foo: "bar" }).foo
    return true;
  }

  return false;
};

exports.Binary = function (node, parent) {
  if ((t.isCallExpression(parent) || t.isNewExpression(parent)) && parent.callee === node) {
    return true;
  }

  if (t.isUnaryLike(parent)) {
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  if (t.isBinary(parent)) {
    var parentOp  = parent.operator;
    var parentPos = PRECEDENCE[parentOp];

    var nodeOp = node.operator;
    var nodePos = PRECEDENCE[nodeOp];

    if (parentPos > nodePos) {
      return true;
    }

    if (parentPos === nodePos && parent.right === node) {
      return true;
    }
  }
};

exports.BinaryExpression = function (node, parent) {
  if (node.operator === "in") {
    // var i = (1 in []);
    if (t.isVariableDeclarator(parent)) {
      return true;
    }

    // for ((1 in []);;);
    if (t.isFor(parent)) {
      return true;
    }
  }
};

exports.SequenceExpression = function (node, parent) {
  if (t.isForStatement(parent)) {
    // Although parentheses wouldn't hurt around sequence
    // expressions in the head of for loops, traditional style
    // dictates that e.g. i++, j++ should not be wrapped with
    // parentheses.
    return false;
  }

  if (t.isExpressionStatement(parent) && parent.expression === node) {
    return false;
  }

  // Otherwise err on the side of overparenthesization, adding
  // explicit exceptions above if this proves overzealous.
  return true;
};

exports.YieldExpression = function (node, parent) {
  return t.isBinary(parent) ||
         t.isUnaryLike(parent) ||
         t.isCallExpression(parent) ||
         t.isMemberExpression(parent) ||
         t.isNewExpression(parent) ||
         t.isConditionalExpression(parent) ||
         t.isYieldExpression(parent);
};

exports.ClassExpression = function (node, parent) {
  return t.isExpressionStatement(parent);
};

exports.UnaryLike = function (node, parent) {
  return t.isMemberExpression(parent) && parent.object === node;
};

exports.FunctionExpression = function (node, parent) {
  // function () {};
  if (t.isExpressionStatement(parent)) {
    return true;
  }

  // (function test() {}).name;
  if (t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  // (function () {})();
  if (t.isCallExpression(parent) && parent.callee === node) {
    return true;
  }
};

exports.AssignmentExpression =
exports.ConditionalExpression = function (node, parent) {
  if (t.isUnaryLike(parent)) {
    return true;
  }

  if (t.isBinary(parent)) {
    return true;
  }

  if (t.isCallExpression(parent) || t.isNewExpression(parent)) {
    if (parent.callee === node) {
      return true;
    }
  }

  if (t.isConditionalExpression(parent) && parent.test === node) {
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  return false;
};
