"use strict";

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

        var test = state.wrapSideEffect(node.left);
        if (node.operator === "&&") {
          test.expr = t.unaryExpression("!", test.expr);
        }
        return [t.ifStatement(test.expr, returnBlock(test.ref))].concat(callRight);

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
        var callee = node.callee, thisBinding;
        var args = [callee];

        // bind `this` to object in member expressions
        if (t.isMemberExpression(callee)) {
          var object = state.wrapSideEffect(callee.object);
          callee.object = object.expr;
          thisBinding = object.ref;
        }

        if (node.arguments.length > 0 || thisBinding) {
          args.push(t.arrayExpression(node.arguments));
        }

        if (thisBinding) {
          args.push(thisBinding);
        }

        return [t.returnStatement(t.callExpression(
          state.getHelperRef(),
          args
        ))];
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
exports.FunctionExpression = function (node, parent, scope, file) {
  var tempId, helperRef;

  var state = {
    ownerId: node.id,

    getHelperRef: function () {
      return helperRef = helperRef || file.addHelper("tail-call");
    },

    wrapSideEffect: function (node) {
      if (t.isIdentifier(node) || t.isLiteral(node)) {
        return {expr: node, ref: node};
      }
      tempId = tempId || scope.generateUidIdentifier("temp");
      return {
        expr: t.assignmentExpression("=", tempId, node),
        ref: tempId
      };
    }
  };

  // traverse the function and look for tail recursion
  scope.traverse(node, functionVisitor, state);

  if (tempId) {
    t.ensureBlock(node).body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(tempId)
    ]));
  }
};
