import each from "lodash/collection/each";
import * as t from "../../types";

/**
 * Create a mapping of operators to precendence.
 *
 * @example
 * { "==": 6, "+": 9 }
 */
const PRECEDENCE = {};

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

/**
 * Test if NullableTypeAnnotation needs parentheses.
 */

export function NullableTypeAnnotation(node, parent) {
  return t.isArrayTypeAnnotation(parent);
}

/**
 * Alias NullableTypeAnnotation test as FunctionTypeAnnotation.
 */

export { NullableTypeAnnotation as FunctionTypeAnnotation };

/**
 * Test if UpdateExpression needs parentheses.
 */

export function UpdateExpression(node, parent) {
  if (t.isMemberExpression(parent) && parent.object === node) {
    // (foo++).test()
    return true;
  }
}

/**
 * Test if ObjectExpression needs parentheses.
 */

export function ObjectExpression(node, parent) {
  if (t.isExpressionStatement(parent)) {
    // ({ foo: "bar" });
    return true;
  }

  if (t.isMemberExpression(parent) && parent.object === node) {
    // ({ foo: "bar" }).foo
    return true;
  }

  return false;
}

/**
 * Test if Binary needs parentheses.
 */

export function Binary(node, parent) {
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
}

/**
 * Test if BinaryExpression needs parentheses.
 */

export function BinaryExpression(node, parent) {
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
}

/**
 * Test if SequenceExpression needs parentheses.
 */

export function SequenceExpression(node, parent) {
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

/**
 * Test if YieldExpression needs parentheses.
 */

export function YieldExpression(node, parent) {
  return t.isBinary(parent) ||
         t.isUnaryLike(parent) ||
         t.isCallExpression(parent) ||
         t.isMemberExpression(parent) ||
         t.isNewExpression(parent) ||
         t.isConditionalExpression(parent) ||
         t.isYieldExpression(parent);
}

/**
 * Test if ClassExpression needs parentheses.
 */

export function ClassExpression(node, parent) {
  return t.isExpressionStatement(parent);
}

/**
 * Test if UnaryLike needs parentheses.
 */

export function UnaryLike(node, parent) {
  return t.isMemberExpression(parent) && parent.object === node;
}

/**
 * Test if FunctionExpression needs parentheses.
 */

export function FunctionExpression(node, parent) {
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

/**
 * Test if ConditionalExpression needs parentheses.
 */

export function ConditionalExpression(node, parent) {
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
}

/**
 * Test if AssignmentExpression needs parentheses.
 */

export function AssignmentExpression(node) {
  if (t.isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression(...arguments);
  }
}
