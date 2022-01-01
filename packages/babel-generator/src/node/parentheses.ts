import {
  isArrayTypeAnnotation,
  isArrowFunctionExpression,
  isAssignmentExpression,
  isAwaitExpression,
  isBinary,
  isBinaryExpression,
  isCallExpression,
  isClassDeclaration,
  isClassExpression,
  isConditional,
  isConditionalExpression,
  isExportDeclaration,
  isExportDefaultDeclaration,
  isExpressionStatement,
  isFor,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isIfStatement,
  isIndexedAccessType,
  isIntersectionTypeAnnotation,
  isLogicalExpression,
  isMemberExpression,
  isNewExpression,
  isNullableTypeAnnotation,
  isObjectPattern,
  isOptionalCallExpression,
  isOptionalMemberExpression,
  isReturnStatement,
  isSequenceExpression,
  isSwitchStatement,
  isTSArrayType,
  isTSAsExpression,
  isTSIntersectionType,
  isTSNonNullExpression,
  isTSOptionalType,
  isTSRestType,
  isTSTypeAssertion,
  isTSUnionType,
  isTaggedTemplateExpression,
  isThrowStatement,
  isTypeAnnotation,
  isUnaryLike,
  isUnionTypeAnnotation,
  isVariableDeclarator,
  isWhileStatement,
  isYieldExpression,
} from "@babel/types";
import type * as t from "@babel/types";
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
  (isClassDeclaration(parent) || isClassExpression(parent)) &&
  parent.superClass === node;

const hasPostfixPart = (node: any, parent: any) =>
  ((isMemberExpression(parent) || isOptionalMemberExpression(parent)) &&
    parent.object === node) ||
  ((isCallExpression(parent) ||
    isOptionalCallExpression(parent) ||
    isNewExpression(parent)) &&
    parent.callee === node) ||
  (isTaggedTemplateExpression(parent) && parent.tag === node) ||
  isTSNonNullExpression(parent);

export function NullableTypeAnnotation(node: any, parent: any): boolean {
  return isArrayTypeAnnotation(parent);
}

export function FunctionTypeAnnotation(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return (
    // (() => A) | (() => B)
    isUnionTypeAnnotation(parent) ||
    // (() => A) & (() => B)
    isIntersectionTypeAnnotation(parent) ||
    // (() => A)[]
    isArrayTypeAnnotation(parent) ||
    // <T>(A: T): (T => T[]) => B => [A, B]
    (isTypeAnnotation(parent) &&
      // Check grandparent
      isArrowFunctionExpression(printStack[printStack.length - 3]))
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
  return isFirstInContext(printStack, {
    expressionStatement: true,
    arrowBody: true,
  });
}

export function DoExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  // `async do` can start an expression statement
  return (
    !node.async && isFirstInContext(printStack, { expressionStatement: true })
  );
}

export function Binary(node: any, parent: any): boolean {
  if (
    node.operator === "**" &&
    isBinaryExpression(parent, { operator: "**" })
  ) {
    return parent.left === node;
  }

  if (isClassExtendsClause(node, parent)) {
    return true;
  }

  if (
    hasPostfixPart(node, parent) ||
    isUnaryLike(parent) ||
    isAwaitExpression(parent)
  ) {
    return true;
  }

  if (isBinary(parent)) {
    const parentOp = parent.operator;
    const parentPos = PRECEDENCE[parentOp];

    const nodeOp = node.operator;
    const nodePos = PRECEDENCE[nodeOp];

    if (
      // Logical expressions with the same precedence don't need parens.
      (parentPos === nodePos &&
        parent.right === node &&
        !isLogicalExpression(parent)) ||
      parentPos > nodePos
    ) {
      return true;
    }
  }
}

export function UnionTypeAnnotation(node: any, parent: any): boolean {
  return (
    isArrayTypeAnnotation(parent) ||
    isNullableTypeAnnotation(parent) ||
    isIntersectionTypeAnnotation(parent) ||
    isUnionTypeAnnotation(parent)
  );
}

export { UnionTypeAnnotation as IntersectionTypeAnnotation };

export function OptionalIndexedAccessType(node: any, parent: any): boolean {
  return isIndexedAccessType(parent, { objectType: node });
}

export function TSAsExpression() {
  return true;
}

export function TSTypeAssertion() {
  return true;
}

export function TSUnionType(node: any, parent: any): boolean {
  return (
    isTSArrayType(parent) ||
    isTSOptionalType(parent) ||
    isTSIntersectionType(parent) ||
    isTSUnionType(parent) ||
    isTSRestType(parent)
  );
}

export { TSUnionType as TSIntersectionType };

export function TSInferType(node: any, parent: any): boolean {
  return isTSArrayType(parent) || isTSOptionalType(parent);
}

export function BinaryExpression(node: any, parent: any): boolean {
  // let i = (1 in []);
  // for ((1 in []);;);
  return (
    node.operator === "in" && (isVariableDeclarator(parent) || isFor(parent))
  );
}

export function SequenceExpression(node: any, parent: any): boolean {
  if (
    // Although parentheses wouldn"t hurt around sequence
    // expressions in the head of for loops, traditional style
    // dictates that e.g. i++, j++ should not be wrapped with
    // parentheses.
    isForStatement(parent) ||
    isThrowStatement(parent) ||
    isReturnStatement(parent) ||
    (isIfStatement(parent) && parent.test === node) ||
    (isWhileStatement(parent) && parent.test === node) ||
    (isForInStatement(parent) && parent.right === node) ||
    (isSwitchStatement(parent) && parent.discriminant === node) ||
    (isExpressionStatement(parent) && parent.expression === node)
  ) {
    return false;
  }

  // Otherwise err on the side of overparenthesization, adding
  // explicit exceptions above if this proves overzealous.
  return true;
}

export function YieldExpression(node: any, parent: any): boolean {
  return (
    isBinary(parent) ||
    isUnaryLike(parent) ||
    hasPostfixPart(node, parent) ||
    (isAwaitExpression(parent) && isYieldExpression(node)) ||
    (isConditionalExpression(parent) && node === parent.test) ||
    isClassExtendsClause(node, parent)
  );
}

export { YieldExpression as AwaitExpression };

export function ClassExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return isFirstInContext(printStack, {
    expressionStatement: true,
    exportDefault: true,
  });
}

export function UnaryLike(node: any, parent: any): boolean {
  return (
    hasPostfixPart(node, parent) ||
    isBinaryExpression(parent, { operator: "**", left: node }) ||
    isClassExtendsClause(node, parent)
  );
}

export function FunctionExpression(
  node: any,
  parent: any,
  printStack: Array<any>,
): boolean {
  return isFirstInContext(printStack, {
    expressionStatement: true,
    exportDefault: true,
  });
}

export function ArrowFunctionExpression(node: any, parent: any): boolean {
  return isExportDeclaration(parent) || ConditionalExpression(node, parent);
}

export function ConditionalExpression(node: any, parent?): boolean {
  if (
    isUnaryLike(parent) ||
    isBinary(parent) ||
    isConditionalExpression(parent, { test: node }) ||
    isAwaitExpression(parent) ||
    isTSTypeAssertion(parent) ||
    isTSAsExpression(parent)
  ) {
    return true;
  }

  return UnaryLike(node, parent);
}

export function OptionalMemberExpression(node: any, parent: any): boolean {
  return (
    isCallExpression(parent, { callee: node }) ||
    isMemberExpression(parent, { object: node })
  );
}

export { OptionalMemberExpression as OptionalCallExpression };

export function AssignmentExpression(node: any, parent: any): boolean {
  if (isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression(node, parent);
  }
}

export function LogicalExpression(node: any, parent: any): boolean {
  switch (node.operator) {
    case "||":
      if (!isLogicalExpression(parent)) return false;
      return parent.operator === "??" || parent.operator === "&&";
    case "&&":
      return isLogicalExpression(parent, { operator: "??" });
    case "??":
      return isLogicalExpression(parent) && parent.operator !== "??";
  }
}

export function Identifier(
  node: t.Identifier,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  // Non-strict code allows the identifier `let`, but it cannot occur as-is in
  // certain contexts to avoid ambiguity with contextual keyword `let`.
  if (node.name === "let") {
    // Some contexts only forbid `let [`, so check if the next token would
    // be the left bracket of a computed member expression.
    const isFollowedByBracket =
      isMemberExpression(parent, {
        object: node,
        computed: true,
      }) ||
      isOptionalMemberExpression(parent, {
        object: node,
        computed: true,
        optional: false,
      });
    return isFirstInContext(printStack, {
      expressionStatement: isFollowedByBracket,
      forHead: isFollowedByBracket,
      forInHead: isFollowedByBracket,
      forOfHead: true,
    });
  }

  // ECMAScript specifically forbids a for-of loop from starting with the
  // token sequence `for (async of`, because it would be ambiguous with
  // `for (async of => {};;)`, so we need to add extra parentheses.
  //
  // If the parent is a for-await-of loop (i.e. parent.await === true), the
  // parentheses aren't strictly needed, but we add them anyway because
  // some tools (including earlier Babel versions) can't parse
  // `for await (async of [])` without them.
  return (
    node.name === "async" && isForOfStatement(parent) && node === parent.left
  );
}

// Walk up the print stack to determine if our node can come first
// in a particular context.
function isFirstInContext(
  printStack: Array<t.Node>,
  {
    expressionStatement = false,
    arrowBody = false,
    exportDefault = false,
    forHead = false,
    forInHead = false,
    forOfHead = false,
  },
): boolean {
  let i = printStack.length - 1;
  let node = printStack[i];
  i--;
  let parent = printStack[i];
  while (i >= 0) {
    if (
      (expressionStatement &&
        isExpressionStatement(parent, { expression: node })) ||
      (exportDefault &&
        isExportDefaultDeclaration(parent, { declaration: node })) ||
      (arrowBody && isArrowFunctionExpression(parent, { body: node })) ||
      (forHead && isForStatement(parent, { init: node })) ||
      (forInHead && isForInStatement(parent, { left: node })) ||
      (forOfHead && isForOfStatement(parent, { left: node }))
    ) {
      return true;
    }

    if (
      (hasPostfixPart(node, parent) && !isNewExpression(parent)) ||
      (isSequenceExpression(parent) && parent.expressions[0] === node) ||
      isConditional(parent, { test: node }) ||
      isBinary(parent, { left: node }) ||
      isAssignmentExpression(parent, { left: node })
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
