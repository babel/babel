import * as whitespace from "./whitespace.ts";
import * as parens from "./parentheses.ts";
import {
  FLIPPED_ALIAS_KEYS,
  VISITOR_KEYS,
  isCallExpression,
  isDecorator,
  isExpressionStatement,
  isMemberExpression,
  isNewExpression,
  isParenthesizedExpression,
} from "@babel/types";
import type * as t from "@babel/types";

import type { WhitespaceFlag } from "./whitespace.ts";

export const enum TokenContext {
  normal = 0,
  expressionStatement = 1 << 0,
  arrowBody = 1 << 1,
  exportDefault = 1 << 2,
  arrowFlowReturnType = 1 << 3,
  forInitHead = 1 << 4,
  forInHead = 1 << 5,
  forOfHead = 1 << 6,
  // This flag lives across the token boundary, and will
  // be reset after forIn or forInit head is printed
  forInOrInitHeadAccumulate = 1 << 7,
  forInOrInitHeadAccumulatePassThroughMask = 0x80,
}

type NodeHandler<R> = (
  node: t.Node,
  // todo:
  // node: K extends keyof typeof t
  //   ? Extract<typeof t[K], { type: "string" }>
  //   : t.Node,
  parent: t.Node,
  tokenContext?: number,
  getRawIdentifier?: (node: t.Identifier) => string,
) => R | undefined;

export type NodeHandlers<R> = {
  [K in string]?: NodeHandler<R>;
};

function expandAliases<R>(obj: NodeHandlers<R>) {
  const map = new Map<string, NodeHandler<R>>();

  function add(type: string, func: NodeHandler<R>) {
    const fn = map.get(type);
    map.set(
      type,
      fn
        ? function (node, parent, stack, getRawIdentifier) {
            return (
              fn(node, parent, stack, getRawIdentifier) ??
              func(node, parent, stack, getRawIdentifier)
            );
          }
        : func,
    );
  }

  for (const type of Object.keys(obj)) {
    const aliases = FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      for (const alias of aliases) {
        add(alias, obj[type]!);
      }
    } else {
      add(type, obj[type]!);
    }
  }

  return map;
}

// Rather than using `t.is` on each object property, we pre-expand any type aliases
// into concrete types so that the 'find' call below can be as fast as possible.
const expandedParens = expandAliases(parens);
const expandedWhitespaceNodes = expandAliases(whitespace.nodes);

function isOrHasCallExpression(node: t.Node): boolean {
  if (isCallExpression(node)) {
    return true;
  }

  return isMemberExpression(node) && isOrHasCallExpression(node.object);
}

export function needsWhitespace(
  node: t.Node,
  parent: t.Node,
  type: WhitespaceFlag,
): boolean {
  if (!node) return false;

  if (isExpressionStatement(node)) {
    node = node.expression;
  }

  const flag = expandedWhitespaceNodes.get(node.type)?.(node, parent);

  if (typeof flag === "number") {
    return (flag & type) !== 0;
  }

  return false;
}

export function needsWhitespaceBefore(node: t.Node, parent: t.Node) {
  return needsWhitespace(node, parent, 1);
}

export function needsWhitespaceAfter(node: t.Node, parent: t.Node) {
  return needsWhitespace(node, parent, 2);
}

export function needsParens(
  node: t.Node,
  parent: t.Node | null,
  tokenContext?: number,
  getRawIdentifier?: (node: t.Identifier) => string,
): boolean {
  if (!parent) return false;

  if (isNewExpression(parent) && parent.callee === node) {
    if (isOrHasCallExpression(node)) return true;
  }

  if (isDecorator(parent)) {
    return (
      !isDecoratorMemberExpression(node) &&
      !(isCallExpression(node) && isDecoratorMemberExpression(node.callee)) &&
      !isParenthesizedExpression(node)
    );
  }

  return (
    expandedParens.get(node.type)?.(
      node,
      parent,
      tokenContext,
      getRawIdentifier,
    ) || false
  );
}

function isDecoratorMemberExpression(node: t.Node): boolean {
  switch (node.type) {
    case "Identifier":
      return true;
    case "MemberExpression":
      return (
        !node.computed &&
        node.property.type === "Identifier" &&
        isDecoratorMemberExpression(node.object)
      );
    default:
      return false;
  }
}

export function isLastChild(parent: t.Node, child: t.Node) {
  const visitorKeys = VISITOR_KEYS[parent.type];
  for (let i = visitorKeys.length - 1; i >= 0; i--) {
    const val = (parent as any)[visitorKeys[i]] as t.Node | t.Node[] | null;
    if (val === child) {
      return true;
    } else if (Array.isArray(val)) {
      let j = val.length - 1;
      while (j >= 0 && val[j] === null) j--;
      return j >= 0 && val[j] === child;
    } else if (val) {
      return false;
    }
  }
  return false;
}
