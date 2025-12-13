import {
  isMemberExpression,
  isObjectPattern,
  isOptionalMemberExpression,
  isYieldExpression,
  isStatement,
} from "@babel/types";
import type * as t from "@babel/types";

import { TokenContext } from "./index.ts";
import { generatorNamesRecord } from "../nodes.ts";

const {
  TSAsExpressionId,
  TSSatisfiesExpressionId,
  TSTypeAssertionId,
  BinaryExpressionId,
  LogicalExpressionId,
  UnaryExpressionId,
  SpreadElementId,
  AwaitExpressionId,
  ConditionalExpressionId,
  SequenceExpressionId,
  ParenthesizedExpressionId,
  MemberExpressionId,
  OptionalMemberExpressionId,
  TemplateLiteralId,
  ClassDeclarationId,
  ForOfStatementId,
  ExportDefaultDeclarationId,
  CallExpressionId,
  TSArrayTypeId,
  TSOptionalTypeId,
  TSIndexedAccessTypeId,
  TSTypeOperatorId,
  TSIntersectionTypeId,
  TSUnionTypeId,
  OptionalCallExpressionId,
  NewExpressionId,
  TSInstantiationExpressionId,
  AssignmentExpressionId,
  ArrayTypeAnnotationId,
  UnionTypeAnnotationId,
  IntersectionTypeAnnotationId,
  TaggedTemplateExpressionId,
  TSNonNullExpressionId,
  ClassExpressionId,
  AssignmentPatternId,
  NullableTypeAnnotationId,
  IndexedAccessTypeId,
  TSConditionalTypeId,
  TSTypeParameterId,
} = generatorNamesRecord;

const PRECEDENCE = new Map([
  ["||", 0],
  ["??", 0],
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

function isTSTypeExpression(nodeId: number) {
  return (
    nodeId === TSAsExpressionId ||
    nodeId === TSSatisfiesExpressionId ||
    nodeId === TSTypeAssertionId
  );
}

const isClassExtendsClause = (
  node: t.Node,
  parent: any,
  parentId: number,
): parent is t.Class => {
  return (
    (parentId === ClassDeclarationId || parentId === ClassExpressionId) &&
    parent.superClass === node
  );
};

const hasPostfixPart = (node: t.Node, parent: any, parentId: number) => {
  return (
    ((parentId === MemberExpressionId ||
      parentId === OptionalMemberExpressionId) &&
      parent.object === node) ||
    ((parentId === CallExpressionId ||
      parentId === OptionalCallExpressionId ||
      parentId === NewExpressionId) &&
      parent.callee === node) ||
    (parentId === TaggedTemplateExpressionId && parent.tag === node) ||
    parentId === TSNonNullExpressionId
  );
};

export function NullableTypeAnnotation(
  node: t.NullableTypeAnnotation,
  parent: any,
  parentId: number,
): boolean {
  return parentId === ArrayTypeAnnotationId;
}

export function FunctionTypeAnnotation(
  node: t.FunctionTypeAnnotation,
  parent: any,
  parentId: number,
  tokenContext: number,
): boolean {
  return (
    // (() => A) | (() => B)
    parentId === UnionTypeAnnotationId ||
    // (() => A) & (() => B)
    parentId === IntersectionTypeAnnotationId ||
    // (() => A)[]
    parentId === ArrayTypeAnnotationId ||
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
  return !node.async && (tokenContext & TokenContext.expressionStatement) > 0;
}

function Binary(
  node: t.Binary | t.TSAsExpression | t.TSSatisfiesExpression,
  parent: any,
  parentId: number,
  isTS: boolean,
): boolean {
  if (isClassExtendsClause(node, parent, parentId)) {
    return true;
  }

  if (
    hasPostfixPart(node, parent, parentId) ||
    parentId === UnaryExpressionId ||
    parentId === SpreadElementId ||
    parentId === AwaitExpressionId
  ) {
    return true;
  }
  let parentPos: number | undefined;
  switch (parentId) {
    case BinaryExpressionId:
    case LogicalExpressionId:
      parentPos = PRECEDENCE.get(parent.operator);
      break;
    case TSAsExpressionId:
    case TSSatisfiesExpressionId:
      parentPos = PRECEDENCE.get("in");
  }
  if (parentPos !== undefined) {
    const nodePos = PRECEDENCE.get(isTS ? "in" : (node as t.Binary).operator)!;
    if (
      // Logical expressions with the same precedence don't need parens.
      (parentPos === nodePos &&
        parentId === BinaryExpressionId &&
        parent.right === node) ||
      parentPos > nodePos
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
    case ArrayTypeAnnotationId:
    case NullableTypeAnnotationId:
    case IntersectionTypeAnnotationId:
    case UnionTypeAnnotationId:
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
  return parentId === IndexedAccessTypeId && parent.objectType === node;
}

export function TSAsExpression(
  node: t.TSAsExpression | t.TSSatisfiesExpression,
  parent: any,
  parentId: number,
): boolean {
  if (
    (parentId === AssignmentExpressionId || parentId === AssignmentPatternId) &&
    parent.left === node
  ) {
    return true;
  }
  if (
    parentId === BinaryExpressionId &&
    (parent.operator === "|" || parent.operator === "&") &&
    node === parent.left
  ) {
    return true;
  }
  return Binary(node, parent, parentId, true);
}

export { TSAsExpression as TSSatisfiesExpression };

export { UnaryLike as TSTypeAssertion };

export function TSConditionalType(
  node: t.TSConditionalType,
  parent: any,
  parentId: number,
): boolean {
  switch (parentId) {
    case TSArrayTypeId:
    case TSOptionalTypeId:
    case TSTypeOperatorId:
    // for `infer K extends (L extends M ? M : ...)`
    // fallthrough
    case TSTypeParameterId:
      return true;
    case TSIndexedAccessTypeId:
      return parent.objectType === node;
    case TSIntersectionTypeId:
    case TSUnionTypeId:
      return parent.types[0] === node;
    case TSConditionalTypeId:
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
    case TSIntersectionTypeId:
    case TSTypeOperatorId:
    case TSArrayTypeId:
    case TSOptionalTypeId:
      return true;
    case TSIndexedAccessTypeId:
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
    parentId === TSTypeOperatorId || TSTypeOperator(node, parent, parentId)
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
    (parentId === TSIntersectionTypeId || parentId === TSUnionTypeId) &&
    node.typeParameter.constraint &&
    parent.types[0] === node
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
    case TSArrayTypeId:
    case TSOptionalTypeId:
      return true;
    case TSIndexedAccessTypeId:
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
    case CallExpressionId:
    case OptionalCallExpressionId:
    case NewExpressionId:
    case TSInstantiationExpressionId:
      return (
        (process.env.BABEL_8_BREAKING
          ? // @ts-ignore(Babel 7 vs Babel 8) Babel 8 AST
            parent.typeArguments
          : // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST
            parent.typeParameters) != null
      );
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
    parentId === TSUnionTypeId ||
    (parentId === TSConditionalTypeId &&
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
  if (
    parentId === BinaryExpressionId &&
    node.operator === "**" &&
    parent.operator === "**"
  ) {
    return parent.left === node;
  }

  if (Binary(node, parent, parentId, false)) return true;

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
  if (Binary(node, parent, parentId, false)) return true;

  if (isTSTypeExpression(parentId)) return true;
  if (parentId !== LogicalExpressionId) return false;
  switch (node.operator) {
    case "||":
      return parent.operator === "??" || parent.operator === "&&";
    case "&&":
      return parent.operator === "??";
    case "??":
      return parent.operator !== "??";
  }
}

export function SequenceExpression(
  node: t.SequenceExpression,
  parent: any,
  parentId: number,
): boolean {
  if (
    parentId === SequenceExpressionId ||
    parentId === ParenthesizedExpressionId ||
    (parentId === MemberExpressionId && parent.property === node) ||
    (parentId === OptionalMemberExpressionId && parent.property === node) ||
    parentId === TemplateLiteralId
  ) {
    return false;
  }
  if (parentId === ClassDeclarationId) {
    return true;
  }
  if (parentId === ForOfStatementId) {
    return parent.right === node;
  }
  if (parentId === ExportDefaultDeclarationId) {
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
    parentId === BinaryExpressionId ||
    parentId === LogicalExpressionId ||
    parentId === UnaryExpressionId ||
    parentId === SpreadElementId ||
    hasPostfixPart(node, parent, parentId) ||
    (parentId === AwaitExpressionId && isYieldExpression(node)) ||
    (parentId === ConditionalExpressionId && node === parent.test) ||
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

export function UnaryLike(
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
    (parentId === BinaryExpressionId &&
      parent.operator === "**" &&
      parent.left === node) ||
    isClassExtendsClause(node, parent, parentId)
  );
}

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
    case UnaryExpressionId:
    case SpreadElementId:
    case BinaryExpressionId:
    case LogicalExpressionId:
    case AwaitExpressionId:
      return true;
    case ConditionalExpressionId:
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
    case CallExpressionId:
      return parent.callee === node;
    case MemberExpressionId:
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
    isObjectPattern(node.left)
  ) {
    return true;
  } else {
    return ConditionalExpression(node, parent, parentId);
  }
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
    parentId === AssignmentExpressionId &&
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
    ((parentId === MemberExpressionId ||
      parentId === OptionalMemberExpressionId) &&
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
    parentId === ForOfStatementId &&
    !parent.await &&
    node.name === "async" &&
    parent.left === node
  );
}
