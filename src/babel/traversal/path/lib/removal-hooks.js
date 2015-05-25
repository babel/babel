// this file contains all the cases where we have to perform additional logic when performing
// specific operations in order to retain correct javascript semantics

// guidelines for rules:
//
//  - removing a node must **never** result in invalid javascript
//  - always clean up the ancestry
//  - worry about execution sideeffects of removing entire nodes and replace with siblings/children
//

import * as t from "../../../types";

// todo:
//
//  - catch clause param
//  - property key
//  - tagged template literal tag
//

// pre hooks should be used for either rejecting removal or delegating removal to a replacement
export var pre = [
  function (self) {
    if (self.isClassDeclaration() || self.isFunctionDeclaration()) {
      // removing a class/function declaration so we need to remove it's binding
      self.scope.parent.removeBinding(self.id.name);
    }
  },

  function (self) {
    if (self.isVariableDeclaration()) {
      // we're removing a variable declaration so remove each declarator separately to call
      // the specific hooks
      var declarators = self.get("declarations");
      for (var declarator of (declarators: Array)) {
        declarator.remove();
      }
      return true;
    } else if (self.isVariableDeclarator()) {
      // we're removing a variable declarator so remove all it's bindings
      var ids = this.getBindingIdentifiers();
      for (var name in ids) {
        self.scope.removeBinding(name);
      }
    }
  },

  function (self) {
    if (self.key === "body" && (self.isBlockStatement() || self.isClassBody())) {
      // function () NODE
      // class NODE
      // attempting to remove a block statement that's someones body so let's just clear all the inner
      // statements instead
      self.node.body = [];
      return true;
    }
  },

  function (self, parent) {
    if (self.key === "id" && parent.isClassDeclaration() && !self.scope.isPure(self.node.superClass)) {
      // class NODE extends superClass() {}
      // removing the id of a class declaration with an impure super class so we just replace it with the
      // super class
      self.replaceWithMultiple([
        t.expressionStatement(self.node.superClass),
        t.identifier("undefined")
      ]);
      return true;
    }
  },

  function (self, parent) {
    if (self.key === "callee" && parent.isCallExpression()) {
      // NODE();
      // attempting to remove the callee of a call expression, in order to retain semantics we'll turn all
      // the arguments into a sequence expression and return `undefined`

      var expressions = parent.node.arguments;

      // filter expressions that don't effect the execution of the code
      expressions = expressions.filter((node) => !self.scope.isPure(node));

      // push undefined as otherwise we'll evaluate to the last argument
      expressions.push(t.identifier("undefined"));

      if (expressions.length === 1) {
        parent.replaceWith(expressions[0]);
      } else {
        parent.replaceWith(t.sequenceExpression(expressions));
      }

      return true;
    }
  },

  function (self, parent) {
    if (self.key === "test" && parent.isConditionalExpression()) {
      // NODE ? consequent : alternate
      // removing the test of a conditional so just use the alternate since consequent will never be hit
      parent.replaceWith(parent.node.alternate);
      return true;
    }
  },

  function (self, parent) {
    if (self.key === "test" && parent.IfStatement() && parent.node.alternate) {
      // if (NODE) consequent else alternate
      // removing the test of an if statement and there's an alternate so just replace the entire if with it
      // todo: check if this is a BlockStatement and whether it has any block scoped variables
      parent.replaceWith(parent.node.alternate);
      return true;
    }
  },

  function (self, parent) {
    var replace = false;

    // () => NODE;
    // removing the body of an arrow function
    replace = replace || (self.key === "body" && parent.isArrowFunctionExpression());

    // throw NODE;
    // removing a throw statement argument
    replace = replace || (self.key === "argument" && parent.isThrowStatement());

    if (replace) {
      self.replaceWith(t.identifier("undefined"));
      return true;
    }
  }
];

// post hooks should be used for cleaning up parents
export var post = [
  function (self, parent) {
    var removeParent = false;

    // while (NODE);
    // removing the test of a while/switch, we can either just remove it entirely *or* turn the `test` into `true`
    // unlikely that the latter will ever be what's wanted so we just remove the loop to avoid infinite recursion
    removeParent = removeParent || (self.key === "test" && (parent.isWhile() || parent.isSwitchCase()));

    // function NODE() {}
    // class NODE {}
    // attempting to remove the id of a declaration, no choice really but to purge it
    // if it's a class that has a super class that's not prue then it's handled in a pre hook
    removeParent = removeParent || (self.key === "id" && (parent.isClassDeclaration() || parent.isFunctionDeclaration()));

    // var NODE = init;
    // kill variable declarator if we're removing it's initializer binding
    // todo: possibly explode the variable declarations to retain it's initializer
    removeParent = removeParent || (self.key === "init" && parent.isVariableDeclarator());

    // export NODE;
    // just remove a declaration for an export as this is no longer valid
    removeParent = removeParent || (self.key === "declaration" && parent.isExportDeclaration());

    // label: NODE
    // stray labeled statement with no body
    removeParent = removeParent || (self.key === "body" && parent.isLabeledStatement());

    // var NODE;
    // remove an entire declaration if there are no declarators left
    removeParent = removeParent || (self.containerKey === "declarations" && parent.isVariableDeclaration() && parent.node.declarations.length === 0);

    // NODE;
    // remove the entire expression statement if there's no expression
    removeParent = removeParent || (self.key === "expression" && parent.isExpressionStatement());

    // if (NODE);
    // remove the entire if since the consequent is never going to be hit, if there's an alternate then it's already been
    // handled with the `pre` hook
    removeParent = removeParent || (self.key === "test" && parent.isIfStatement());

    if (removeParent) {
      parent.remove();
      return true;
    }
  },

  function (self, parent) {
    if (parent.isSequenceExpression() && parent.node.expressions.length === 1) {
      // (node, NODE);
      // we've just removed the second element of a sequence expression so let's turn that sequence
      // expression into a regular expression
      parent.replaceWith(parent.node.expressions[0]);
      return true;
    }
  },

  function (self, parent) {
    if (parent.isBinary()) {
      // left + NODE;
      // NODE + right;
      // we're in a binary expression, better remove it and replace it with the last expression
      if (self.key === "left") {
        parent.replaceWith(parent.node.right);
      } else { // key === "right"
        parent.replaceWith(parent.node.left);
      }
      return true;
    }
  }
];
