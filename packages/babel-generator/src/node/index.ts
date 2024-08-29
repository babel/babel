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
  expressionStatement = 1 << 0,
  arrowBody = 1 << 1,
  exportDefault = 1 << 2,
  forHead = 1 << 3,
  forInHead = 1 << 4,
  forOfHead = 1 << 5,
  arrowFlowReturnType = 1 << 6,
}

type NodeHandler<R> = (
  node: t.Node,
  // todo:
  // node: K extends keyof typeof t
  //   ? Extract<typeof t[K], { type: "string" }>
  //   : t.Node,
  parent: t.Node,
  tokenContext?: number,
  inForStatementInit?: boolean,
) => R;

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
        ? function (node, parent, stack, inForInit) {
            return (
              fn(node, parent, stack, inForInit) ??
              func(node, parent, stack, inForInit)
            );
          }
        : func,
    );
  }

  for (const type of Object.keys(obj)) {
    const aliases = FLIPPED_ALIAS_KEYS[type];
    if (aliases) {
      for (const alias of aliases) {
        add(alias, obj[type]);
      }
    } else {
      add(type, obj[type]);
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
  parent: t.Node,
  tokenContext?: number,
  inForInit?: boolean,
) {
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

  return expandedParens.get(node.type)?.(node, parent, tokenContext, inForInit);
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
