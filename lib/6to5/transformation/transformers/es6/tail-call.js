"use strict";

var t    = require("../../../types");

function transformExpression(node, scope, state) {
  if (!node) return;

  return (function subTransform(node) {
    switch (node.type) {
      case "ConditionalExpression":
        // any value of ternary operator can be final one
        subTransform(node.consequent);
        subTransform(node.alternate);
        break;

      case "LogicalExpression":
        // only right expression can be final and so optimized
        subTransform(node.right);
        break;

      case "SequenceExpression":
        // only last element of sequence can be optimized
        var seq = node.expressions;
        subTransform(seq[seq.length - 1]);
        break;

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

        node.callee = state.getHelperRef();
        node.arguments = args;
        break;
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
      transformExpression(node.argument, scope, state);
    } else if (t.isFunction(node)) {
      // inner function's bodies are irrelevant
      this.skip();
    } else if (t.isTryStatement(parent)) {
      if (node === parent.block) {
        // `try`-blocks can't be optimized
        this.skip();
      } else if (parent.finalizer && node !== parent.finalizer) {
        // `catch` clause followed by `finally` can't be optimized
        this.skip();
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
  return;

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
