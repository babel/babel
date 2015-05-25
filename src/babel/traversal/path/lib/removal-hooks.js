// This file contains all the cases where we have to perform additional logic when performing
// specific operations in order to retain correct JavaScript semantics.

import * as t from "../../../types";

// pre hooks should be used for either rejecting removal or delegating removal to a replacement
export var pre = [
  function (self, parent) {
    if (self.key === "body" && self.isBlockStatement() && parent.isFunction()) {
      // lol nah, you'll break stuff
      return true;
    }
  },

  function (self, parent) {
    // attempting to remove body of an arrow function so we just replace it with undefined
    if (self.key === "body" && parent.isArrowFunctionExpression()) {
      self.replaceWith(t.identifier("undefined"));
      return true;
    }
  }
];

// post hooks should be used for cleaning up parents
export var post = [
  function (self, parent) {
    var removeParent = false;

    // just remove a declaration for an export as this is no longer valid
    removeParent = removeParent || (self.key === "declaration" && parent.isExportDeclaration());

    // stray labels with no body
    removeParent = removeParent || (self.key === "body" && parent.isLabeledStatement());

    // remove an entire declaration if there are no declarators left
    removeParent = removeParent || (parent.isVariableDeclaration() && parent.node.declarations.length === 0);

    // remove the entire expression statement if there's no expression
    removeParent = removeParent || (self.key === "expression" && parent.isExpressionStatement());

    if (removeParent) {
      parent.remove();
      return true;
    }
  },

  function (self, parent) {
    // we've just removed the second element of a sequence expression so let's turn that sequence
    // expression into a regular expression
    if (parent.isSequenceExpression() && parent.node.expressions.length === 1) {
      parent.replaceWith(parent.node.expressions[0]);
      return true;
    }
  },

  function (self, parent) {
    // we're in a binary expression, better remove it and replace it with the last expression
    if (parent.isBinary()) {
      if (self.key === "left") {
        parent.replaceWith(parent.node.right);
      } else { // key === "right"
        parent.replaceWith(parent.node.left);
      }
      return true;
    }
  }
];
