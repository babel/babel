"use strict";

var util = require("../../../util");
var t    = require("../../../types");

function returnBlock(expr) {
  return t.blockStatement([t.returnStatement(expr)]);
}

function transformExpression(node, scope, state) {
  if (!node) return;

  return (function subTransform(node) {
    switch (node.type) {
      case "ConditionalExpression":
        var callConsequent = subTransform(node.consequent);
        var callAlternate = subTransform(node.alternate);
        if (!callConsequent && !callAlternate) {
          return;
        }

        // if ternary operator had tail recursion in value, convert to optimized if-statement
        node.type = "IfStatement";
        node.consequent = callConsequent ? t.toBlock(callConsequent) : returnBlock(node.consequent);
        if (callAlternate) {
          node.alternate = t.isIfStatement(callAlternate) ? callAlternate : t.toBlock(callAlternate);
        } else {
          node.alternate = returnBlock(node.alternate);
        }
        return node;

      case "LogicalExpression":
        // only call in right-value of can be optimized
        var callRight = subTransform(node.right);
        if (!callRight) {
          return;
        }

        // cache left value as it might have side-effects
        var leftId = state.getLeftId();
        var testExpr = t.assignmentExpression(
          "=",
          leftId,
          node.left
        );
        if (node.operator === "&&") {
          testExpr = t.unaryExpression("!", testExpr);
        }
        return [t.ifStatement(testExpr, returnBlock(leftId))].concat(callRight);

      case "SequenceExpression":
        var seq = node.expressions;

        // only last element can be optimized
        var lastCall = subTransform(seq[seq.length - 1]);
        if (!lastCall) {
          return;
        }

        // remove converted expression from sequence
        // and convert to regular expression if needed
        if (--seq.length === 1) {
          node = seq[0];
        }

        return [t.expressionStatement(node)].concat(lastCall);

      case "CallExpression":
        var callee = node.callee, prop, thisBinding, args;

        if (t.isMemberExpression(callee, { computed: false }) &&
            t.isIdentifier(prop = callee.property)) {
          switch (prop.name) {
            case "call":
              args = t.arrayExpression(node.arguments.slice(1));
              break;

            case "apply":
              args = node.arguments[1] || t.identifier("undefined");
              break;

            default:
              return;
          }

          thisBinding = node.arguments[0];
          callee = callee.object;
        }

        // only tail recursion can be optimized as for now
        if (!t.isIdentifier(callee) || !scope.bindingEquals(callee.name, state.ownerId)) {
          return;
        }

        state.hasTailRecursion = true;

        return [
          t.expressionStatement(t.assignmentExpression(
            "=",
            state.getArgumentsId(),
            args || t.arrayExpression(node.arguments)
          )),

          t.expressionStatement(t.assignmentExpression(
            "=",
            state.getThisId(),
            thisBinding || t.identifier("undefined")
          )),

          t.returnStatement(t.assignmentExpression(
            "=",
            state.getShouldContinueId(),
            t.literal(true)
          ))
        ];
    }
  })(node);
}

var functionChildrenVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isReturnStatement(node)) {
      // prevent entrance by current visitor
      this.skip();
      // transform return argument into statement if
      // it contains tail recursion
      return transformExpression(node.argument, scope, state);
    } else if (t.isFunction(node)) {
      return this.skip();
    } else if (t.isTryStatement(parent)) {
      if (node === parent.block) {
        return this.skip();
      } else if (node === parent.finalizer) {
        return;
      } else {
        if (parent.finalizer) {
          this.skip();
        }
        return;
      }
    }
  }
};

var functionVisitor = {
  enter: function (node, parent, scope, state) {
    // traverse all child nodes of this function and find `arguments` and `this`
    scope.traverse(node, functionChildrenVisitor, state);

    return this.skip();
  }
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, scope) {
  // only tail recursion can be optimized as for now,
  // so we can skip anonymous functions entirely
  var ownerId = node.id;
  if (!ownerId) return;

  var argumentsId, thisId, shouldContinueId, leftId;

  var state = {
    hasTailRecursion: false,
    ownerId: ownerId,

    getArgumentsId: function () {
      return argumentsId = argumentsId || scope.generateUidIdentifier("arguments");
    },

    getThisId: function () {
      return thisId = thisId || scope.generateUidIdentifier("this");
    },

    getShouldContinueId: function () {
      return shouldContinueId = shouldContinueId || scope.generateUidIdentifier("shouldContinue");
    },

    getLeftId: function () {
      return leftId = leftId || scope.generateUidIdentifier("left");
    }
  };

  // traverse the function and look for tail recursion
  scope.traverse(node, functionVisitor, state);

  if (!state.hasTailRecursion) return;

  var block = t.ensureBlock(node);

  if (leftId) {
    block.body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(leftId)
    ]));
  }

  var resultId = scope.generateUidIdentifier("result");
  state.getShouldContinueId();

  node.body = util.template("tail-call-body", {
    SHOULD_CONTINUE_ID: shouldContinueId,
    ARGUMENTS_ID:       argumentsId,
    RESULT_ID:          resultId,
    FUNCTION:           t.functionExpression(null, node.params, block),
    THIS_ID:            thisId,
  });
};
