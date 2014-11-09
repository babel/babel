module.exports = Node;

var t = require("../types");
var _ = require("lodash");

function Node(node, parent) {
  this.parent = parent;
  this.node   = node;
}

//

Node.whitespace = {
  FunctionExpression: 1,
  FunctionStatement: 1,
  ClassExpression: 1,
  ClassStatement: 1,
  ForOfStatement: 1,
  ForInStatement: 1,
  ForStatement: 1,
  SwitchStatement: 1,
  IfStatement: { before: 1 },
  //Property: { before: 1 },
  Literal: { after: 1 }
};

_.each(Node.whitespace, function (amounts, type) {
  if (_.isNumber(amounts)) amounts = { after: amounts, before: amounts };
  Node.whitespace[type] = amounts;
});

//

Node.PRECEDENCE = {};

_.each([
  ["||"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!=="],
  ["<", ">", "<=", ">=", "in", "instanceof"],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"]
], function (tier, i) {
  _.each(tier, function (op) {
    Node.PRECEDENCE[op] = i;
  });
});

//

Node.prototype.isUserWhitespacable = function () {
  //var parent = this.parent;
  var node = this.node;

  if (t.isUserWhitespacable(node)) {
    return true;
  }

  //if (t.isArrayExpression(parent)) {
  //  return true;
  //}

  return false;
};

Node.prototype.needsWhitespace = function (type) {
  var parent = this.parent;
  var node   = this.node;
  if (!node) return 0;

  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  if (type === "before") {
    if (t.isProperty(node) && parent.properties[0] === node) {
      return 1;
    }
  }

  if (type === "after") {
    if (t.isCallExpression(node)) {
      return 1;
    }

    var exprs = [];

    if (t.isVariableDeclaration(node)) {
      exprs = _.map(node.declarations, "init");
    }

    if (t.isArrayExpression(node)) {
      exprs = node.elements;
    }

    if (t.isObjectExpression(node)) {
      exprs = node.properties;
    }

    var lines = 0;

    _.each(exprs, function (expr) {
      lines = Node.needsWhitespace(expr, node, type);
      if (lines) return false;
    });

    if (lines) return lines;
  }

  if (t.isCallExpression(node) && t.isFunction(node.callee)) {
    return 1;
  }

  var opts = Node.whitespace[node.type];
  return (opts && opts[type]) || 0;
};

Node.prototype.needsWhitespaceBefore = function () {
  return this.needsWhitespace("before");
};

Node.prototype.needsWhitespaceAfter = function () {
  return this.needsWhitespace("after");
};

Node.prototype.needsParens = function () {
  var parent = this.parent;
  var node = this.node;

  if (!parent) return false;

  //
  if (t.isUnaryLike(node)) {
    return t.isMemberExpression(parent) && parent.object === node;
  }

  if (t.isBinary(node)) {
    //
    if (t.isCallExpression(parent) && parent.callee === node) {
      return true;
    }

    //
    if (t.isUnaryLike(parent)) {
      return true;
    }

    //
    if (t.isMemberExpression(parent) && parent.object === node) {
      return true;
    }

    if (t.isBinary(parent)) {
      var parentOp  = parent.operator;
      var parentPos = Node.PRECEDENCE[parentOp];

      var nodeOp = node.operator;
      var nodePos = Node.PRECEDENCE[nodeOp];

      if (parentPos > nodePos) {
        return true;
      }

      if (parentPos === nodePos && parent.right === node) {
        return true;
      }
    }
  }

  if (t.isBinaryExpression(node) && node.operator === "in") {
    // var i = (1 in []);
    if (t.isVariableDeclarator(parent)) {
      return true;
    }

    // for ((1 in []);;);
    if (t.isFor(parent)) {
      return true;
    }
  }

  // (class {});
  if (t.isClassExpression(node) && t.isExpressionStatement(parent)) {
    return true;
  }

  if (t.isSequenceExpression(node)) {
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
  }

  //
  if (t.isYieldExpression(node)) {
    return t.isBinary(parent) ||
           t.isUnaryLike(parent) ||
           t.isCallExpression(parent) ||
           t.isMemberExpression(parent) ||
           t.isNewExpression(parent) ||
           t.isConditionalExpression(parent) ||
           t.isYieldExpression(parent);
  }

  if (t.isNewExpression(parent) && parent.callee === node) {
    return t.isCallExpression(node) || _.some(node, function (val) {
      return t.isCallExpression(val);
    });
  }

  // (1).valueOf()
  if (t.isLiteral(node) && _.isNumber(node.value) && t.isMemberExpression(parent) && parent.object === node) {
    return true;
  }

  if (t.isAssignmentExpression(node) || t.isConditionalExpression(node)) {
    //
    if (t.isUnaryLike(parent)) {
      return true;
    }

    //
    if (t.isBinary(parent)) {
      return true;
    }

    //
    if (t.isCallExpression(parent) && parent.callee === node) {
      return true;
    }

    //
    if (t.isConditionalExpression(parent) && parent.test === node) {
      return true;
    }

    //
    if (t.isMemberExpression(parent) && parent.object === node) {
      return true;
    }
  }

  if (t.isFunctionExpression(node)) {
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
  }

  // ({ x, y }) = { x: 5, y: 6 };
  if (t.isObjectPattern(node) && t.isAssignmentExpression(parent) && parent.left == node) {
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
