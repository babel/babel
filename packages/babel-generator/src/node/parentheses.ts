import {
  isMemberExpression,
  isOptionalMemberExpression,
  isYieldExpression,
  isStatement,
} from "@babel/types";
import type * as t from "@babel/types";

import { TokenContext } from "./index.ts";

const PRECEDENCE = new Map([
  ["||", 0],
  ["??", 1],
  ["&&", 2],
  ["|", 3],
  ["^", 4],
  ["&", 5],
  ["==", 6],
  ["===", 6],
  ["!=", 6],
  ["!==", 6],
  ["<", 7],
  [">", 7],
  ["<=", 7],
  [">=", 7],
  ["in", 7],
  ["instanceof", 7],
  [">>", 8],
  ["<<", 8],
  [">>>", 8],
  ["+", 9],
  ["-", 9],
  ["*", 10],
  ["/", 10],
  ["%", 10],
  ["**", 11],
]);

function isTSTypeExpression(nodeId: number) {
  return (
    nodeId === __node("TSAsExpression") ||
    nodeId === __node("TSSatisfiesExpression") ||
    nodeId === __node("TSTypeAssertion")
  );
}

const isClassExtendsClause = (
  node: t.Node,
  parent: any,
  parentId: number,
): parent is t.Class => {
  return (
    (parentId === __node("ClassDeclaration") ||
      parentId === __node("ClassExpression")) &&
    parent.superClass === node
  );
};

const hasPostfixPart = (node: t.Node, parent: any, parentId: number) => {
  switch (parentId) {
    case __node("MemberExpression"):
    case __node("OptionalMemberExpression"):
      return parent.object === node;
    case __node("CallExpression"):
    case __node("OptionalCallExpression"):
    case __node("NewExpression"):
      return parent.callee === node;
    case __node("TaggedTemplateExpression"):
      return parent.tag === node;
    case __node("TSNonNullExpression"):
      return true;
  }

  return false;
};

export function NullableTypeAnnotation(
  node: t.NullableTypeAnnotation,
  parent: any,
  parentId: number,
): boolean {
  return parentId === __node("ArrayTypeAnnotation");
}

export function FunctionTypeAnnotation(
  node: t.FunctionTypeAnnotation,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  return (
    // (() => A) | (() => B)
    parentId === __node("UnionTypeAnnotation") ||
    // (() => A) & (() => B)
    parentId === __node("IntersectionTypeAnnotation") ||
    // (() => A)[]
    parentId === __node("ArrayTypeAnnotation") ||
    (tokenContext & TokenContext.arrowFlowReturnType) > 0
  );
}

export function UpdateExpression(
  node: t.UpdateExpression,
  parent: any,
  parentId: number,
): boolean {
  return (
    hasPostfixPart(node, parent, parentId) ||
    isClassExtendsClause(node, parent, parentId)
  );
}

function needsParenBeforeExpressionBrace(tokenContext: number) {
  return (
    (tokenContext &
      (TokenContext.expressionStatement | TokenContext.arrowBody)) >
    0
  );
}

export function ObjectExpression(
  node: t.ObjectExpression,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  return needsParenBeforeExpressionBrace(tokenContext);
}

export function DoExpression(
  node: t.DoExpression,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  // `async do` can start an expression statement
  return (tokenContext & TokenContext.expressionStatement) > 0 && !node.async;
}

const enum BinaryLikeType {
  Binary = 0,
  Logical = 1,
  TypeScript = 2,
}

function BinaryLike(
  node: t.Binary | t.TSAsExpression | t.TSSatisfiesExpression,
  parent: any,
  parentId: number,
  nodeType: BinaryLikeType,
): boolean {
  if (isClassExtendsClause(node, parent, parentId)) {
    return true;
  }

  if (
    hasPostfixPart(node, parent, parentId) ||
    parentId === __node("UnaryExpression") ||
    parentId === __node("SpreadElement") ||
    parentId === __node("AwaitExpression")
  ) {
    return true;
  }
  let parentPos: number | undefined;
  switch (parentId) {
    case __node("BinaryExpression"):
    case __node("LogicalExpression"):
      parentPos = PRECEDENCE.get(parent.operator);
      break;
    case __node("TSAsExpression"):
    case __node("TSSatisfiesExpression"):
      parentPos = 7; /* in */
  }
  if (parentPos !== undefined) {
    const nodePos =
      nodeType === BinaryLikeType.TypeScript
        ? 7 /* in */
        : PRECEDENCE.get((node as t.Binary).operator)!;
    if (parentPos > nodePos) return true;
    if (
      parentPos === nodePos &&
      parentId === __node("BinaryExpression") &&
      (nodePos === 11 /* ** */ ? parent.left === node : parent.right === node)
    ) {
      return true;
    }
    if (
      nodeType === BinaryLikeType.Logical &&
      parentId === __node("LogicalExpression") &&
      // 1: ??
      ((nodePos === 1 && parentPos !== 1) || (parentPos === 1 && nodePos !== 1))
    ) {
      return true;
    }
  }
  return false;
}

export function UnionTypeAnnotation(
  node: t.UnionTypeAnnotation | t.IntersectionTypeAnnotation,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("ArrayTypeAnnotation"):
    case __node("NullableTypeAnnotation"):
    case __node("IntersectionTypeAnnotation"):
    case __node("UnionTypeAnnotation"):
      return true;
  }
  return false;
}

export { UnionTypeAnnotation as IntersectionTypeAnnotation };

export function OptionalIndexedAccessType(
  node: t.OptionalIndexedAccessType,
  parent: any,
  parentId: number,
): boolean {
  return parentId === __node("IndexedAccessType") && parent.objectType === node;
}

export function TSAsExpression(
  node: t.TSAsExpression | t.TSSatisfiesExpression,
  parent: any,
  parentId: number,
): boolean {
  if (
    (parentId === __node("AssignmentExpression") ||
      parentId === __node("AssignmentPattern")) &&
    parent.left === node
  ) {
    return true;
  }
  if (
    parentId === __node("BinaryExpression") &&
    (parent.operator === "|" || parent.operator === "&") &&
    node === parent.left
  ) {
    return true;
  }
  return BinaryLike(node, parent, parentId, BinaryLikeType.TypeScript);
}

export { TSAsExpression as TSSatisfiesExpression };

export { UnaryLike as TSTypeAssertion };

export function TSConditionalType(
  node: t.TSConditionalType,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("TSArrayType"):
    case __node("TSOptionalType"):
    case __node("TSTypeOperator"):
    // for `infer K extends (L extends M ? M : ...)`
    // fallthrough
    case __node("TSTypeParameter"):
    case __node("TSIntersectionType"):
    case __node("TSUnionType"):
      return true;
    case __node("TSIndexedAccessType"):
      return parent.objectType === node;
    case __node("TSConditionalType"):
      return parent.checkType === node || parent.extendsType === node;
  }
  return false;
}

export function TSUnionType(
  node: t.TSUnionType | t.TSFunctionType,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("TSIntersectionType"):
    case __node("TSTypeOperator"):
    case __node("TSArrayType"):
    case __node("TSOptionalType"):
      return true;
    case __node("TSIndexedAccessType"):
      return parent.objectType === node;
  }
  return false;
}

export function TSIntersectionType(
  node: t.TSUnionType,
  parent: any,
  parentId: number,
): boolean {
  return (
    parentId === __node("TSTypeOperator") ||
    TSTypeOperator(node, parent, parentId)
  );
}

export function TSInferType(
  node: t.TSInferType,
  parent: any,
  parentId: number,
): boolean {
  if (TSTypeOperator(node, parent, parentId)) {
    return true;
  }
  if (
    (parentId === __node("TSIntersectionType") ||
      parentId === __node("TSUnionType")) &&
    node.typeParameter.constraint != null
  ) {
    return true;
  }
  return false;
}

export function TSTypeOperator(
  node: t.TSTypeOperator | t.TSUnionType | t.TSInferType,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("TSArrayType"):
    case __node("TSOptionalType"):
      return true;
    case __node("TSIndexedAccessType"):
      if (parent.objectType === node) {
        return true;
      }
  }
  return false;
}

export function TSInstantiationExpression(
  node: t.TSInstantiationExpression,
  parent: any,
  parentId: number,
) {
  switch (parentId) {
    case __node("CallExpression"):
    case __node("OptionalCallExpression"):
    case __node("NewExpression"):
    case __node("TSInstantiationExpression"):
      return parent.typeArguments != null;
  }

  return false;
}

export function TSFunctionType(
  node: t.TSFunctionType,
  parent: any,
  parentId: number,
): boolean {
  if (TSUnionType(node, parent, parentId)) return true;

  return (
    parentId === __node("TSUnionType") ||
    (parentId === __node("TSConditionalType") &&
      (parent.checkType === node || parent.extendsType === node))
  );
}

export { TSFunctionType as TSConstructorType };

export function BinaryExpression(
  node: t.BinaryExpression,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  if (BinaryLike(node, parent, parentId, BinaryLikeType.Binary)) return true;

  // for ((1 in []);;);
  // for (var x = (1 in []) in 2);
  return (
    (tokenContext & TokenContext.forInOrInitHeadAccumulate) > 0 &&
    node.operator === "in"
  );
}

export function LogicalExpression(
  node: t.LogicalExpression,
  parent: any,
  parentId: number,
): boolean {
  return BinaryLike(node, parent, parentId, BinaryLikeType.Logical);
}

export function SequenceExpression(
  node: t.SequenceExpression,
  parent: any,
  parentId: number,
): boolean {
  if (
    parentId === __node("SequenceExpression") ||
    parentId === __node("ParenthesizedExpression") ||
    (parentId === __node("MemberExpression") && parent.property === node) ||
    (parentId === __node("OptionalMemberExpression") &&
      parent.property === node) ||
    parentId === __node("TemplateLiteral")
  ) {
    return false;
  }
  if (parentId === __node("ClassDeclaration")) {
    return true;
  }
  if (parentId === __node("ForOfStatement")) {
    return parent.right === node;
  }
  if (parentId === __node("ExportDefaultDeclaration")) {
    return true;
  }

  return !isStatement(parent);
}

export function YieldExpression(
  node: t.YieldExpression,
  parent: any,
  parentId: number,
): boolean {
  return (
    parentId === __node("BinaryExpression") ||
    parentId === __node("LogicalExpression") ||
    parentId === __node("UnaryExpression") ||
    parentId === __node("SpreadElement") ||
    hasPostfixPart(node, parent, parentId) ||
    (parentId === __node("AwaitExpression") && isYieldExpression(node)) ||
    (parentId === __node("ConditionalExpression") && node === parent.test) ||
    isClassExtendsClause(node, parent, parentId) ||
    isTSTypeExpression(parentId)
  );
}

export { YieldExpression as AwaitExpression };

export function ClassExpression(
  node: t.ClassExpression,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  return (
    (tokenContext &
      (TokenContext.expressionStatement | TokenContext.exportDefault)) >
    0
  );
}

function UnaryLike(
  node:
    | t.UnaryLike
    | t.TSTypeAssertion
    | t.ArrowFunctionExpression
    | t.ConditionalExpression
    | t.AssignmentExpression,
  parent: any,
  parentId: number,
): boolean {
  return (
    hasPostfixPart(node, parent, parentId) ||
    (parentId === __node("BinaryExpression") &&
      parent.operator === "**" &&
      parent.left === node) ||
    isClassExtendsClause(node, parent, parentId)
  );
}

export { UnaryLike as UnaryExpression, UnaryLike as SpreadElement };

export function FunctionExpression(
  node: t.FunctionExpression,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  return (
    (tokenContext &
      (TokenContext.expressionStatement | TokenContext.exportDefault)) >
    0
  );
}

export function ConditionalExpression(
  node:
    | t.ConditionalExpression
    | t.ArrowFunctionExpression
    | t.AssignmentExpression,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("UnaryExpression"):
    case __node("SpreadElement"):
    case __node("BinaryExpression"):
    case __node("LogicalExpression"):
    case __node("AwaitExpression"):
      return true;
    case __node("ConditionalExpression"):
      if (parent.test === node) {
        return true;
      }
  }

  if (isTSTypeExpression(parentId)) {
    return true;
  }

  return UnaryLike(node, parent, parentId);
}

export { ConditionalExpression as ArrowFunctionExpression };

export function OptionalMemberExpression(
  node: t.OptionalMemberExpression,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case __node("CallExpression"):
      return parent.callee === node;
    case __node("MemberExpression"):
      return parent.object === node;
  }
  return false;
}

export { OptionalMemberExpression as OptionalCallExpression };

export function AssignmentExpression(
  node: t.AssignmentExpression,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  if (
    needsParenBeforeExpressionBrace(tokenContext) &&
    node.left.type === "ObjectPattern"
  ) {
    return true;
  }
  return ConditionalExpression(node, parent, parentId);
}

export function Identifier(
  node: t.Identifier,
  parent: any,
  parentId: number,
  tokenContext: number,
  getRawIdentifier: (node: t.Identifier) => string,
): boolean {
  if (getRawIdentifier && getRawIdentifier(node) !== node.name) {
    return false;
  }

  // 13.15.2 AssignmentExpression RS: Evaluation
  // (fn) = function () {};
  if (
    parentId === __node("AssignmentExpression") &&
    node.extra?.parenthesized &&
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

  // fast path
  if (
    tokenContext & TokenContext.forOfHead ||
    ((parentId === __node("MemberExpression") ||
      parentId === __node("OptionalMemberExpression")) &&
      tokenContext &
        (TokenContext.expressionStatement |
          TokenContext.forInitHead |
          TokenContext.forInHead))
  ) {
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
      if (
        isFollowedByBracket &&
        tokenContext &
          (TokenContext.expressionStatement |
            TokenContext.forInitHead |
            TokenContext.forInHead)
      ) {
        return true;
      }
      return (tokenContext & TokenContext.forOfHead) > 0;
    }
  }

  // ECMAScript specifically forbids a for-of loop from starting with the
  // token sequence `for (async of`, because it would be ambiguous with
  // `for (async of => {};;)`, so we need to add extra parentheses.
  return (
    parentId === __node("ForOfStatement") &&
    parent.left === node &&
    node.name === "async" &&
    !parent.await
  );
}
