import {
  isArrayTypeAnnotation,
  isArrowFunctionExpression,
  isBinaryExpression,
  isCallExpression,
  isExportDeclaration,
  isForOfStatement,
  isIndexedAccessType,
  isMemberExpression,
  isObjectPattern,
  isOptionalMemberExpression,
  isYieldExpression,
} from "@babel/types";
import type * as t from "@babel/types";
const PRECEDENCE = new Map([
  ["||", 0],
  ["??", 0],
  ["|>", 0],
  ["&&", 1],
  ["|", 2],
  ["^", 3],
  ["&", 4],
  ["==", 5],
  ["===", 5],
  ["!=", 5],
  ["!==", 5],
  ["<", 6],
  [">", 6],
  ["<=", 6],
  [">=", 6],
  ["in", 6],
  ["instanceof", 6],
  [">>", 7],
  ["<<", 7],
  [">>>", 7],
  ["+", 8],
  ["-", 8],
  ["*", 9],
  ["/", 9],
  ["%", 9],
  ["**", 10],
]);

const enum CheckParam {
  expressionStatement = 1 << 0,
  arrowBody = 1 << 1,
  exportDefault = 1 << 2,
  forHead = 1 << 3,
  forInHead = 1 << 4,
  forOfHead = 1 << 5,
}

function isTSTypeExpression(nodeType: string) {
  return (
    nodeType === "TSAsExpression" ||
    nodeType === "TSSatisfiesExpression" ||
    nodeType === "TSTypeAssertion"
  );
}

const isClassExtendsClause = (
  node: t.Node,
  parent: t.Node,
): parent is t.Class => {
  const parentType = parent.type;
  return (
    (parentType === "ClassDeclaration" || parentType === "ClassExpression") &&
    parent.superClass === node
  );
};

const hasPostfixPart = (node: t.Node, parent: t.Node) => {
  const parentType = parent.type;
  return (
    ((parentType === "MemberExpression" ||
      parentType === "OptionalMemberExpression") &&
      parent.object === node) ||
    ((parentType === "CallExpression" ||
      parentType === "OptionalCallExpression" ||
      parentType === "NewExpression") &&
      parent.callee === node) ||
    (parentType === "TaggedTemplateExpression" && parent.tag === node) ||
    parentType === "TSNonNullExpression"
  );
};

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

  const parentType = parent.type;
  return (
    // (() => A) | (() => B)
    parentType === "UnionTypeAnnotation" ||
    // (() => A) & (() => B)
    parentType === "IntersectionTypeAnnotation" ||
    // (() => A)[]
    parentType === "ArrayTypeAnnotation" ||
    // <T>(A: T): (T => T[]) => B => [A, B]
    (parentType === "TypeAnnotation" &&
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

export function Binary(
  node: t.BinaryExpression,
  parent: t.Node,
): boolean | undefined {
  const parentType = parent.type;
  if (
    node.operator === "**" &&
    parentType === "BinaryExpression" &&
    parent.operator === "**"
  ) {
    return parent.left === node;
  }

  if (isClassExtendsClause(node, parent)) {
    return true;
  }

  if (
    hasPostfixPart(node, parent) ||
    parentType === "UnaryExpression" ||
    parentType === "SpreadElement" ||
    parentType === "AwaitExpression"
  ) {
    return true;
  }

  if (parentType === "BinaryExpression" || parentType === "LogicalExpression") {
    const parentPos = PRECEDENCE.get(parent.operator);
    const nodePos = PRECEDENCE.get(node.operator);

    if (
      // Logical expressions with the same precedence don't need parens.
      (parentPos === nodePos &&
        parent.right === node &&
        parentType !== "LogicalExpression") ||
      parentPos > nodePos
    ) {
      return true;
    }
  }

  return undefined;
}

export function UnionTypeAnnotation(
  node: t.UnionTypeAnnotation,
  parent: t.Node,
): boolean {
  const parentType = parent.type;
  return (
    parentType === "ArrayTypeAnnotation" ||
    parentType === "NullableTypeAnnotation" ||
    parentType === "IntersectionTypeAnnotation" ||
    parentType === "UnionTypeAnnotation"
  );
}

export { UnionTypeAnnotation as IntersectionTypeAnnotation };

export function OptionalIndexedAccessType(
  node: t.OptionalIndexedAccessType,
  parent: t.Node,
): boolean {
  return isIndexedAccessType(parent) && parent.objectType === node;
}

export function TSAsExpression() {
  return true;
}

export {
  TSAsExpression as TSSatisfiesExpression,
  TSAsExpression as TSTypeAssertion,
};

export function TSUnionType(node: t.TSUnionType, parent: t.Node): boolean {
  const parentType = parent.type;
  return (
    parentType === "TSArrayType" ||
    parentType === "TSOptionalType" ||
    parentType === "TSIntersectionType" ||
    parentType === "TSUnionType" ||
    parentType === "TSRestType"
  );
}

export { TSUnionType as TSIntersectionType };

export function TSInferType(node: t.TSInferType, parent: t.Node): boolean {
  const parentType = parent.type;
  return parentType === "TSArrayType" || parentType === "TSOptionalType";
}

export function TSInstantiationExpression(
  node: t.TSInstantiationExpression,
  parent: t.Node,
) {
  const parentType = parent.type;
  return (
    (parentType === "CallExpression" ||
      parentType === "OptionalCallExpression" ||
      parentType === "NewExpression" ||
      parentType === "TSInstantiationExpression") &&
    !!parent.typeParameters
  );
}

export function BinaryExpression(
  node: t.BinaryExpression,
  parent: t.Node,
): boolean {
  // let i = (1 in []);
  // for ((1 in []);;);
  if (node.operator === "in") {
    const parentType = parent.type;
    return (
      parentType === "VariableDeclarator" ||
      parentType === "ForStatement" ||
      parentType === "ForInStatement" ||
      parentType === "ForOfStatement"
    );
  }
  return false;
}

export function SequenceExpression(
  node: t.SequenceExpression,
  parent: t.Node,
): boolean {
  const parentType = parent.type;
  if (
    // Although parentheses wouldn't hurt around sequence
    // expressions in the head of for loops, traditional style
    // dictates that e.g. i++, j++ should not be wrapped with
    // parentheses.
    parentType === "ForStatement" ||
    parentType === "ThrowStatement" ||
    parentType === "ReturnStatement" ||
    (parentType === "IfStatement" && parent.test === node) ||
    (parentType === "WhileStatement" && parent.test === node) ||
    (parentType === "ForInStatement" && parent.right === node) ||
    (parentType === "SwitchStatement" && parent.discriminant === node) ||
    (parentType === "ExpressionStatement" && parent.expression === node)
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
  const parentType = parent.type;
  return (
    parentType === "BinaryExpression" ||
    parentType === "LogicalExpression" ||
    parentType === "UnaryExpression" ||
    parentType === "SpreadElement" ||
    hasPostfixPart(node, parent) ||
    (parentType === "AwaitExpression" && isYieldExpression(node)) ||
    (parentType === "ConditionalExpression" && node === parent.test) ||
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
    (isBinaryExpression(parent) &&
      parent.operator === "**" &&
      parent.left === node) ||
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
  const parentType = parent.type;
  if (
    parentType === "UnaryExpression" ||
    parentType === "SpreadElement" ||
    parentType === "BinaryExpression" ||
    parentType === "LogicalExpression" ||
    (parentType === "ConditionalExpression" && parent.test === node) ||
    parentType === "AwaitExpression" ||
    isTSTypeExpression(parentType)
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
    (isCallExpression(parent) && parent.callee === node) ||
    (isMemberExpression(parent) && parent.object === node)
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
  const parentType = parent.type;
  if (isTSTypeExpression(parentType)) return true;
  if (parentType !== "LogicalExpression") return false;
  switch (node.operator) {
    case "||":
      return parent.operator === "??" || parent.operator === "&&";
    case "&&":
      return parent.operator === "??";
    case "??":
      return parent.operator !== "??";
  }
}

export function Identifier(
  node: t.Identifier,
  parent: t.Node,
  printStack: Array<t.Node>,
): boolean {
  const parentType = parent.type;
  // 13.15.2 AssignmentExpression RS: Evaluation
  // (fn) = function () {};
  if (
    node.extra?.parenthesized &&
    parentType === "AssignmentExpression" &&
    parent.left === node
  ) {
    const rightType = parent.right.type;
    if (
      (rightType === "FunctionExpression" || rightType === "ClassExpression") &&
      parent.right.id == null
    ) {
      return true;
    }
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
    const parentType = parent.type;
    if (
      (expressionStatement &&
        parentType === "ExpressionStatement" &&
        parent.expression === node) ||
      (exportDefault &&
        parentType === "ExportDefaultDeclaration" &&
        node === parent.declaration) ||
      (arrowBody &&
        parentType === "ArrowFunctionExpression" &&
        parent.body === node) ||
      (forHead && parentType === "ForStatement" && parent.init === node) ||
      (forInHead && parentType === "ForInStatement" && parent.left === node) ||
      (forOfHead && parentType === "ForOfStatement" && parent.left === node)
    ) {
      return true;
    }

    if (
      i > 0 &&
      ((hasPostfixPart(node, parent) && parentType !== "NewExpression") ||
        (parentType === "SequenceExpression" &&
          parent.expressions[0] === node) ||
        (parentType === "UpdateExpression" && !parent.prefix) ||
        (parentType === "ConditionalExpression" && parent.test === node) ||
        ((parentType === "BinaryExpression" ||
          parentType === "LogicalExpression") &&
          parent.left === node) ||
        (parentType === "AssignmentExpression" && parent.left === node))
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
