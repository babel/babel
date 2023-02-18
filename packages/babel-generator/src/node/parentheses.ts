import {
  isArrayTypeAnnotation,
  isArrowFunctionExpression,
  isAssignmentExpression,
  isAwaitExpression,
  isBinary,
  isBinaryExpression,
  isUpdateExpression,
  isCallExpression,
  isClass,
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
  isFunctionExpression,
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
  isTSInstantiationExpression,
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
  isTSSatisfiesExpression,
} from "@babel/types";
import type * as t from "@babel/types";
const PRECEDENCE = {
  "||": 0,
  "??": 0,
  "|>": 0,
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

const enum CheckParam {
  expressionStatement = 1 << 0,
  arrowBody = 1 << 1,
  exportDefault = 1 << 2,
  forHead = 1 << 3,
  forInHead = 1 << 4,
  forOfHead = 1 << 5,
}

function isTSTypeExpression(node: t.Node) {
  return (
    isTSAsExpression(node) ||
    isTSSatisfiesExpression(node) ||
    isTSTypeAssertion(node)
  );
}

const isClassExtendsClause = (
  node: t.Node,
  parent: t.Node,
): parent is t.Class => isClass(parent, { superClass: node });

const hasPostfixPart = (node: t.Node, parent: t.Node) =>
  ((isMemberExpression(parent) || isOptionalMemberExpression(parent)) &&
    parent.object === node) ||
  ((isCallExpression(parent) ||
    isOptionalCallExpression(parent) ||
    isNewExpression(parent)) &&
    parent.callee === node) ||
  (isTaggedTemplateExpression(parent) && parent.tag === node) ||
  isTSNonNullExpression(parent);

export function NullableTypeAnnotation(
  node: t.NullableTypeAnnotation,
  parent: t.Node,
): boolean {
  return isArrayTypeAnnotation(parent);
}

export function FunctionTypeAnnotation(
  node: t.FunctionTypeAnnotation,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  if (printStack.length < 3) return;

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

export function UpdateExpression(
  node: t.UpdateExpression,
  parent: t.Node,
): boolean {
  return hasPostfixPart(node, parent) || isClassExtendsClause(node, parent);
}

export function ObjectExpression(
  node: t.ObjectExpression,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  return isFirstInContext(
    printStack,
    CheckParam.expressionStatement | CheckParam.arrowBody,
  );
}

export function DoExpression(
  node: t.DoExpression,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  // `async do` can start an expression statement
  return (
    !node.async && isFirstInContext(printStack, CheckParam.expressionStatement)
  );
}

export function Binary(node: t.BinaryExpression, parent: t.Node): boolean {
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

export function UnionTypeAnnotation(
  node: t.UnionTypeAnnotation,
  parent: t.Node,
): boolean {
  return (
    isArrayTypeAnnotation(parent) ||
    isNullableTypeAnnotation(parent) ||
    isIntersectionTypeAnnotation(parent) ||
    isUnionTypeAnnotation(parent)
  );
}

export { UnionTypeAnnotation as IntersectionTypeAnnotation };

export function OptionalIndexedAccessType(
  node: t.OptionalIndexedAccessType,
  parent: t.Node,
): boolean {
  return isIndexedAccessType(parent, { objectType: node });
}

export function TSAsExpression() {
  return true;
}

export {
  TSAsExpression as TSSatisfiesExpression,
  TSAsExpression as TSTypeAssertion,
};

export function TSUnionType(node: t.TSUnionType, parent: t.Node): boolean {
  return (
    isTSArrayType(parent) ||
    isTSOptionalType(parent) ||
    isTSIntersectionType(parent) ||
    isTSUnionType(parent) ||
    isTSRestType(parent)
  );
}

export { TSUnionType as TSIntersectionType };

export function TSInferType(node: t.TSInferType, parent: t.Node): boolean {
  return isTSArrayType(parent) || isTSOptionalType(parent);
}

export function TSInstantiationExpression(
  node: t.TSInstantiationExpression,
  parent: t.Node,
) {
  return (
    (isCallExpression(parent) ||
      isOptionalCallExpression(parent) ||
      isNewExpression(parent) ||
      isTSInstantiationExpression(parent)) &&
    !!parent.typeParameters
  );
}

export function BinaryExpression(
  node: t.BinaryExpression,
  parent: t.Node,
): boolean {
  // let i = (1 in []);
  // for ((1 in []);;);
  return (
    node.operator === "in" && (isVariableDeclarator(parent) || isFor(parent))
  );
}

export function SequenceExpression(
  node: t.SequenceExpression,
  parent: t.Node,
): boolean {
  if (
    // Although parentheses wouldn't hurt around sequence
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

export function YieldExpression(
  node: t.YieldExpression,
  parent: t.Node,
): boolean {
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
  node: t.ClassExpression,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  return isFirstInContext(
    printStack,
    CheckParam.expressionStatement | CheckParam.exportDefault,
  );
}

export function UnaryLike(
  node:
    | t.UnaryLike
    | t.ArrowFunctionExpression
    | t.ConditionalExpression
    | t.AssignmentExpression,
  parent: t.Node,
): boolean {
  return (
    hasPostfixPart(node, parent) ||
    isBinaryExpression(parent, { operator: "**", left: node }) ||
    isClassExtendsClause(node, parent)
  );
}

export function FunctionExpression(
  node: t.FunctionExpression,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  return isFirstInContext(
    printStack,
    CheckParam.expressionStatement | CheckParam.exportDefault,
  );
}

export function ArrowFunctionExpression(
  node: t.ArrowFunctionExpression,
  parent: t.Node,
): boolean {
  return isExportDeclaration(parent) || ConditionalExpression(node, parent);
}

export function ConditionalExpression(
  node:
    | t.ConditionalExpression
    | t.ArrowFunctionExpression
    | t.AssignmentExpression,
  parent?: t.Node,
): boolean {
  if (
    isUnaryLike(parent) ||
    isBinary(parent) ||
    isConditionalExpression(parent, { test: node }) ||
    isAwaitExpression(parent) ||
    isTSTypeExpression(parent)
  ) {
    return true;
  }

  return UnaryLike(node, parent);
}

export function OptionalMemberExpression(
  node: t.OptionalMemberExpression,
  parent: t.Node,
): boolean {
  return (
    isCallExpression(parent, { callee: node }) ||
    isMemberExpression(parent, { object: node })
  );
}

export { OptionalMemberExpression as OptionalCallExpression };

export function AssignmentExpression(
  node: t.AssignmentExpression,
  parent: t.Node,
): boolean {
  if (isObjectPattern(node.left)) {
    return true;
  } else {
    return ConditionalExpression(node, parent);
  }
}

export function LogicalExpression(
  node: t.LogicalExpression,
  parent: t.Node,
): boolean {
  if (isTSTypeExpression(parent)) return true;
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
  // 13.15.2 AssignmentExpression RS: Evaluation
  // (fn) = function () {};
  if (
    node.extra?.parenthesized &&
    isAssignmentExpression(parent, { left: node }) &&
    (isFunctionExpression(parent.right) || isClassExpression(parent.right)) &&
    parent.right.id == null
  ) {
    return true;
  }
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
    return isFirstInContext(
      printStack,
      isFollowedByBracket
        ? CheckParam.expressionStatement |
            CheckParam.forHead |
            CheckParam.forInHead |
            CheckParam.forOfHead
        : CheckParam.forOfHead,
    );
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
  checkParam: CheckParam,
): boolean {
  const expressionStatement = checkParam & CheckParam.expressionStatement;
  const arrowBody = checkParam & CheckParam.arrowBody;
  const exportDefault = checkParam & CheckParam.exportDefault;
  const forHead = checkParam & CheckParam.forHead;
  const forInHead = checkParam & CheckParam.forInHead;
  const forOfHead = checkParam & CheckParam.forOfHead;

  let i = printStack.length - 1;
  if (i <= 0) return;
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
      i > 0 &&
      ((hasPostfixPart(node, parent) && !isNewExpression(parent)) ||
        (isSequenceExpression(parent) && parent.expressions[0] === node) ||
        (isUpdateExpression(parent) && !parent.prefix) ||
        isConditional(parent, { test: node }) ||
        isBinary(parent, { left: node }) ||
        isAssignmentExpression(parent, { left: node }))
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
