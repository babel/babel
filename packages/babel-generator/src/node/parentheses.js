import * as t from "babel-types";

const PRECEDENCE = {
  "||": 0,
  "&&": 1,
  "|": 2,
  "^": 3,
  "&": 4,
  "==": 5,
  "===": 5,
  "!=": 5,
  "!==": 5,
  "<": 6,
  ">": 6,
  "<=": 6,
  ">=": 6,
  in: 6,
  instanceof: 6,
  ">>": 7,
  "<<": 7,
  ">>>": 7,
  "+": 8,
  "-": 8,
  "*": 9,
  "/": 9,
  "%": 9,
  "**": 10
};

export function NullableTypeAnnotation(node: Object, parent: Object): boolean {
  return t.isArrayTypeAnnotation(parent);
}

export { NullableTypeAnnotation as FunctionTypeAnnotation };

export function UpdateExpression(node: Object, parent: Object): boolean {
  if (t.isMemberExpression(parent) && parent.object === node) {
    // (foo++).test()
    return true;
  }

  return false;
}

export function ObjectExpression(node: Object, parent: Object, printStack: Array<Object>): boolean {
  return isFirstInStatement(printStack, { considerArrow: true });
}

const isMultiLine = (n) => {
  const { loc:{ start, end } } = n;
  return start.line < end.line;
};


export function JSXElement(node: Object, parent: Object): boolean {

  return (
    t.isReturnStatement(parent) ||
    t.isArrowFunctionExpression(parent)
  ) && isMultiLine(node);
}

export function Binary(node: Object, parent: Object): boolean {
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
    const parentOp  = parent.operator;
    const parentPos = PRECEDENCE[parentOp];

    const nodeOp = node.operator;
    const nodePos = PRECEDENCE[nodeOp];

    if (parentPos > nodePos) {
      return true;
    }

    // Logical expressions with the same precedence don't need parens.
    if (parentPos === nodePos && parent.right === node && !t.isLogicalExpression(parent)) {
      return true;
    }
  }

  return false;
}

export function BinaryExpression(node: Object, parent: Object): boolean {
  if (node.operator === "in") {
    // let i = (1 in []);
    if (t.isVariableDeclarator(parent)) {
      return true;
    }

    // for ((1 in []);;);
    if (t.isFor(parent)) {
      return true;
    }
  }

  return false;
}

export function SequenceExpression(node: Object, parent: Object): boolean {
  if (t.isForStatement(parent)) {
    // Although parentheses wouldn"t hurt around sequence
    // expressions in the head of for loops, traditional style
    // dictates that e.g. i++, j++ should not be wrapped with
    // parentheses.
    return false;
  }

  if (t.isExpressionStatement(parent) && parent.expression === node) {
    return false;
  }

  if (t.isReturnStatement(parent)) {
    return false;
  }

  if (t.isThrowStatement(parent)) {
    return false;
  }

  if (t.isSwitchStatement(parent) && parent.discriminant === node) {
    return false;
  }

  if (t.isWhileStatement(parent) && parent.test === node) {
    return false;
  }

  if (t.isIfStatement(parent) && parent.test === node) {
    return false;
  }

  if (t.isForInStatement(parent) && parent.right === node) {
    return false;
  }

  // Otherwise err on the side of overparenthesization, adding
  // explicit exceptions above if this proves overzealous.
  return true;
}

export function YieldExpression(node: Object, parent: Object): boolean {
  return t.isBinary(parent) ||
         t.isUnaryLike(parent) ||
         t.isCallExpression(parent) ||
         t.isMemberExpression(parent) ||
         t.isNewExpression(parent) ||
         (t.isConditionalExpression(parent) && node === parent.test);

}

export { YieldExpression as AwaitExpression };

export function ClassExpression(node: Object, parent: Object, printStack: Array<Object>): boolean {
  return isFirstInStatement(printStack, { considerDefaultExports: true });
}

export function UnaryLike(node: Object, parent: Object): boolean {
  if (t.isMemberExpression(parent, { object: node })) {
    return true;
  }

  if (t.isCallExpression(parent, { callee: node }) || t.isNewExpression(parent, { callee: node })) {
    return true;
  }

  return false;
}

export function FunctionExpression(node: Object, parent: Object, printStack: Array<Object>): boolean {
  return isFirstInStatement(printStack, { considerDefaultExports: true });
}

export function ArrowFunctionExpression(node: Object, parent: Object): boolean {
  if (
    // export default (function () {});
    t.isExportDeclaration(parent) ||
    t.isBinaryExpression(parent) ||
    t.isLogicalExpression(parent) ||
    t.isUnaryExpression(parent) ||
    t.isTaggedTemplateExpression(parent)
  ) {
    return true;
  }

  return UnaryLike(node, parent);
}

export function ConditionalExpression(node: Object, parent: Object): boolean {
  if (t.isUnaryLike(parent)) {
    return true;
  }

  if (t.isBinary(parent)) {
    return true;
  }

  if (t.isConditionalExpression(parent, { test: node })) {
    return true;
  }

  if (t.isAwaitExpression(parent)) {
    return true;
  }

  return UnaryLike(node, parent);
}

export function AssignmentExpression(node: Object): boolean {
  if (t.isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression(...arguments);
  }
}

// Walk up the print stack to deterimine if our node can come first
// in statement.
function isFirstInStatement(printStack: Array<Object>, {
    considerArrow = false,
    considerDefaultExports = false
  } = {}): boolean {
  let i = printStack.length - 1;
  let node = printStack[i];
  i--;
  let parent = printStack[i];
  while (i > 0) {
    if (t.isExpressionStatement(parent, { expression: node })) {
      return true;
    }

    if (t.isTaggedTemplateExpression(parent)) {
      return true;
    }

    if (considerDefaultExports && t.isExportDefaultDeclaration(parent, { declaration: node })) {
      return true;
    }

    if (considerArrow && t.isArrowFunctionExpression(parent, { body: node })) {
      return true;
    }

    if ((t.isCallExpression(parent, { callee: node })) ||
        (t.isSequenceExpression(parent) && parent.expressions[0] === node) ||
        (t.isMemberExpression(parent, { object: node })) ||
        (t.isConditional(parent, { test: node })) ||
        (t.isBinary(parent, { left: node })) ||
        (t.isAssignmentExpression(parent, { left: node }))) {
      node = parent;
      i--;
      parent = printStack[i];
    } else {
      return false;
    }
  }

  return false;
}
