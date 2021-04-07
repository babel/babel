import * as t from "@babel/types";

const PRECEDENCE = {
  "||": 0,
  "??": 0,
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
  "**": 10,
};

const isClassExtendsClause = (node: any, parent: any): boolean =>
  (t.isClassDeclaration(parent) || t.isClassExpression(parent)) &&
  parent.superClass === node;

const hasPostfixPart = (node: any, parent: any) =>
  ((t.isMemberExpression(parent) || t.isOptionalMemberExpression(parent)) &&
    parent.object === node) ||
  ((t.isCallExpression(parent) ||
    t.isOptionalCallExpression(parent) ||
    t.isNewExpression(parent)) &&
    parent.callee === node) ||
  (t.isTaggedTemplateExpression(parent) && parent.tag === node) ||
  t.isTSNonNullExpression(parent);

export function NullableTypeAnnotation(node: any, parent: any): boolean {
  return t.isArrayTypeAnnotation(parent);
}

export function FunctionTypeAnnotation(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return (
    // (() => A) | (() => B)
    t.isUnionTypeAnnotation(parent) ||
    // (() => A) & (() => B)
    t.isIntersectionTypeAnnotation(parent) ||
    // (() => A)[]
    t.isArrayTypeAnnotation(parent) ||
    // <T>(A: T): (T => T[]) => B => [A, B]
    (t.isTypeAnnotation(parent) &&
      // Check grandparent
      t.isArrowFunctionExpression(printStack[printStack.length - 3]))
  );
}

export function UpdateExpression(node: any, parent: any): boolean {
  return hasPostfixPart(node, parent) || isClassExtendsClause(node, parent);
}

export function ObjectExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return isFirstInStatement(printStack, { considerArrow: true });
}

export function DoExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  // `async do` can start an expression statement
  return !node.async && isFirstInStatement(printStack);
}

export function Binary(node: any, parent: any): boolean {
  if (
    node.operator === "**" &&
    t.isBinaryExpression(parent, { operator: "**" })
  ) {
    return parent.left === node;
  }

  if (isClassExtendsClause(node, parent)) {
    return true;
  }

  if (
    hasPostfixPart(node, parent) ||
    t.isUnaryLike(parent) ||
    t.isAwaitExpression(parent)
  ) {
    return true;
  }

  if (t.isBinary(parent)) {
    const parentOp = parent.operator;
    const parentPos = PRECEDENCE[parentOp];

    const nodeOp = node.operator;
    const nodePos = PRECEDENCE[nodeOp];

    if (
      // Logical expressions with the same precedence don't need parens.
      (parentPos === nodePos &&
        parent.right === node &&
        !t.isLogicalExpression(parent)) ||
      parentPos > nodePos
    ) {
      return true;
    }
  }
}

export function UnionTypeAnnotation(node: any, parent: any): boolean {
  return (
    t.isArrayTypeAnnotation(parent) ||
    t.isNullableTypeAnnotation(parent) ||
    t.isIntersectionTypeAnnotation(parent) ||
    t.isUnionTypeAnnotation(parent)
  );
}

export { UnionTypeAnnotation as IntersectionTypeAnnotation };

export function TSAsExpression() {
  return true;
}

export function TSTypeAssertion() {
  return true;
}

export function TSUnionType(node: any, parent: any): boolean {
  return (
    t.isTSArrayType(parent) ||
    t.isTSOptionalType(parent) ||
    t.isTSIntersectionType(parent) ||
    t.isTSUnionType(parent) ||
    t.isTSRestType(parent)
  );
}

export { TSUnionType as TSIntersectionType };

export function TSInferType(node: any, parent: any): boolean {
  return t.isTSArrayType(parent) || t.isTSOptionalType(parent);
}

export function BinaryExpression(node: any, parent: any): boolean {
  // let i = (1 in []);
  // for ((1 in []);;);
  return (
    node.operator === "in" &&
    (t.isVariableDeclarator(parent) || t.isFor(parent))
  );
}

export function SequenceExpression(node: any, parent: any): boolean {
  if (
    // Although parentheses wouldn"t hurt around sequence
    // expressions in the head of for loops, traditional style
    // dictates that e.g. i++, j++ should not be wrapped with
    // parentheses.
    t.isForStatement(parent) ||
    t.isThrowStatement(parent) ||
    t.isReturnStatement(parent) ||
    (t.isIfStatement(parent) && parent.test === node) ||
    (t.isWhileStatement(parent) && parent.test === node) ||
    (t.isForInStatement(parent) && parent.right === node) ||
    (t.isSwitchStatement(parent) && parent.discriminant === node) ||
    (t.isExpressionStatement(parent) && parent.expression === node)
  ) {
    return false;
  }

  // Otherwise err on the side of overparenthesization, adding
  // explicit exceptions above if this proves overzealous.
  return true;
}

export function YieldExpression(node: any, parent: any): boolean {
  return (
    t.isBinary(parent) ||
    t.isUnaryLike(parent) ||
    hasPostfixPart(node, parent) ||
    (t.isAwaitExpression(parent) && t.isYieldExpression(node)) ||
    (t.isConditionalExpression(parent) && node === parent.test) ||
    isClassExtendsClause(node, parent)
  );
}

export { YieldExpression as AwaitExpression };

export function ClassExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return isFirstInStatement(printStack, { considerDefaultExports: true });
}

export function UnaryLike(node: any, parent: any): boolean {
  return (
    hasPostfixPart(node, parent) ||
    t.isBinaryExpression(parent, { operator: "**", left: node }) ||
    isClassExtendsClause(node, parent)
  );
}

export function FunctionExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return isFirstInStatement(printStack, { considerDefaultExports: true });
}

export function ArrowFunctionExpression(node: any, parent: any): boolean {
  return t.isExportDeclaration(parent) || ConditionalExpression(node, parent);
}

export function ConditionalExpression(node: any, parent?): boolean {
  if (
    t.isUnaryLike(parent) ||
    t.isBinary(parent) ||
    t.isConditionalExpression(parent, { test: node }) ||
    t.isAwaitExpression(parent) ||
    t.isTSTypeAssertion(parent) ||
    t.isTSAsExpression(parent)
  ) {
    return true;
  }

  return UnaryLike(node, parent);
}

export function OptionalMemberExpression(node: any, parent: any): boolean {
  return (
    t.isCallExpression(parent, { callee: node }) ||
    t.isMemberExpression(parent, { object: node })
  );
}

export { OptionalMemberExpression as OptionalCallExpression };

export function AssignmentExpression(node: any, parent: any): boolean {
  if (t.isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression(node, parent);
  }
}

export function LogicalExpression(node: any, parent: any): boolean {
  switch (node.operator) {
    case "||":
      if (!t.isLogicalExpression(parent)) return false;
      return parent.operator === "??" || parent.operator === "&&";
    case "&&":
      return t.isLogicalExpression(parent, { operator: "??" });
    case "??":
      return t.isLogicalExpression(parent) && parent.operator !== "??";
  }
}

// Walk up the print stack to determine if our node can come first
// in statement.
function isFirstInStatement(
  printStack: Array<any>,
  { considerArrow = false, considerDefaultExports = false } = {},
): boolean {
  let i = printStack.length - 1;
  let node = printStack[i];
  i--;
  let parent = printStack[i];
  while (i >= 0) {
    if (
      t.isExpressionStatement(parent, { expression: node }) ||
      (considerDefaultExports &&
        t.isExportDefaultDeclaration(parent, { declaration: node })) ||
      (considerArrow && t.isArrowFunctionExpression(parent, { body: node }))
    ) {
      return true;
    }

    if (
      (hasPostfixPart(node, parent) && !t.isNewExpression(parent)) ||
      (t.isSequenceExpression(parent) && parent.expressions[0] === node) ||
      t.isConditional(parent, { test: node }) ||
      t.isBinary(parent, { left: node }) ||
      t.isAssignmentExpression(parent, { left: node })
    ) {
      node = parent;
      i--;
      parent = printStack[i];
    } else {
      return false;
    }
  }

  return false;
}
