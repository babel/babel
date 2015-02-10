"use strict";

var _    = require("lodash");
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
        return [node];

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

        var body = [];

        if (!t.isThisExpression(thisBinding)) {
          body.push(t.expressionStatement(t.assignmentExpression(
            "=",
            state.getThisId(),
            thisBinding || t.identifier("undefined")
          )));
        }

        if (!args) {
          args = t.arrayExpression(node.arguments);
        }

        var argumentsId = state.getArgumentsId();
        var params = state.getParams();

        body.push(t.expressionStatement(t.assignmentExpression(
          "=",
          argumentsId,
          args
        )));

        var i, param;

        if (t.isArrayExpression(args)) {
          var elems = args.elements;
          for (i = 0; i < elems.length && i < params.length; i++) {
            param = params[i];
            var elem = elems[i] || (elems[i] = t.identifier("undefined"));
            if (!param._isDefaultPlaceholder) {
              elems[i] = t.assignmentExpression("=", param, elem);
            }
          }
        } else {
          state.setsArguments = true;
          for (i = 0; i < params.length; i++) {
            param = params[i];
            if (!param._isDefaultPlaceholder) {
              body.push(t.expressionStatement(t.assignmentExpression(
                "=",
                param,
                t.memberExpression(argumentsId, t.literal(i), true)
              )));
            }
          }
        }

        body.push(t.continueStatement(state.getFunctionId()));

        return body;
    }
  })(node);
}

// Looks for and replaces tail recursion calls.
var firstPass = {
  enter: function (node, parent, scope, state) {
    if (t.isReturnStatement(node)) {
      this.skip();
      return transformExpression(node.argument, scope, state);
    } else if (t.isTryStatement(parent)) {
      if (node === parent.block) {
        this.skip();
      } else if (parent.finalizer && node !== parent.finalizer) {
        this.skip();
      }
    } else if (t.isFunction(node)) {
      this.skip();
    } else if (t.isVariableDeclaration(node)) {
      this.skip();
      state.vars.push(node);
    }
  }
};

// Hoists up function declarations, replaces `this` and `arguments` and
// marks them as needed.
var secondPass = {
  enter: function (node, parent, scope, state) {
    if (t.isThisExpression(node)) {
      state.needsThis = true;
      return state.getThisId();
    } else if (t.isReferencedIdentifier(node, parent, { name: "arguments" })) {
      state.needsArguments = true;
      return state.getArgumentsId();
    } else if (t.isFunction(node)) {
      this.skip();
      if (t.isFunctionDeclaration(node)) {
        node = t.variableDeclaration("var", [
          t.variableDeclarator(node.id, t.toExpression(node))
        ]);
        node._blockHoist = 2;
        return node;
      }
    }
  }
};

// Optimizes recursion by removing `this` and `arguments`
// if they are not used.
var thirdPass = {
  enter: function (node, parent, scope, state) {
    if (!t.isExpressionStatement(node)) return;
    var expr = node.expression;
    if (!t.isAssignmentExpression(expr)) return;
    if (!state.needsThis && expr.left === state.getThisId()) {
      this.remove();
    } else if (!state.needsArguments && expr.left === state.getArgumentsId() && t.isArrayExpression(expr.right)) {
      return _.map(expr.right.elements, function (elem) {
        return t.expressionStatement(elem);
      });
    }
  }
};

exports.Function = function (node, parent, scope) {
  // only tail recursion can be optimized as for now,
  // so we can skip anonymous functions entirely
  var ownerId = node.id;
  if (!ownerId) return;

  var argumentsId, thisId, leftId, functionId, params, paramDecls;

  var state = {
    hasTailRecursion: false,
    needsThis: false,
    needsArguments: false,
    setsArguments: false,
    ownerId: ownerId,
    vars: [],

    getArgumentsId: function () {
      return argumentsId = argumentsId || scope.generateUidIdentifier("arguments");
    },

    getThisId: function () {
      return thisId = thisId || scope.generateUidIdentifier("this");
    },

    getLeftId: function () {
      return leftId = leftId || scope.generateUidIdentifier("left");
    },

    getFunctionId: function () {
      return functionId = functionId || scope.generateUidIdentifier("function");
    },

    getParams: function () {
      if (!params) {
        params = node.params;
        paramDecls = [];
        for (var i = 0; i < params.length; i++) {
          var param = params[i];
          if (!param._isDefaultPlaceholder) {
            paramDecls.push(t.variableDeclarator(
              param,
              params[i] = scope.generateUidIdentifier("x")
            ));
          }
        }
      }
      return params;
    }
  };

  // traverse the function and look for tail recursion
  scope.traverse(node, firstPass, state);

  if (!state.hasTailRecursion) return;

  scope.traverse(node, secondPass, state);

  if (!state.needsThis || !state.needsArguments) {
    scope.traverse(node, thirdPass, state);
  }

  var body = t.ensureBlock(node).body;

  if (state.vars.length > 0) {
    body.unshift(t.expressionStatement(
      _(state.vars)
      .map(function (decl) {
        return decl.declarations;
      })
      .flatten()
      .reduceRight(function (expr, decl) {
        return t.assignmentExpression("=", decl.id, expr);
      }, t.identifier("undefined"))
    ));
  }

  if (paramDecls.length > 0) {
    body.unshift(t.variableDeclaration("var", paramDecls));
  }

  node.body = util.template("tail-call-body", {
    THIS_ID:       thisId,
    ARGUMENTS_ID:  argumentsId,
    FUNCTION_ID:   state.getFunctionId(),
    BLOCK:         node.body
  });

  var topVars = [];

  if (state.needsThis) {
    topVars.push(t.variableDeclarator(state.getThisId(), t.thisExpression()));
  }

  if (state.needsArguments || state.setsArguments) {
    var decl = t.variableDeclarator(state.getArgumentsId());
    if (state.needsArguments) {
      decl.init = t.identifier("arguments");
    }
    topVars.push(decl);
  }

  if (leftId) {
    topVars.push(t.variableDeclarator(leftId));
  }

  if (topVars.length > 0) {
    node.body.body.unshift(t.variableDeclaration("var", topVars));
  }
};
