import * as whitespace from "./whitespace.ts";
import * as parens from "./parentheses.ts";
import {
  FLIPPED_ALIAS_KEYS,
  isCallExpression,
  isExpressionStatement,
  isMemberExpression,
  isNewExpression,
} from "@babel/types";
import type * as t from "@babel/types";

import type { WhitespaceFlag } from "./whitespace.ts";

type NodeHandler<R> = (
  node: t.Node,
  // todo:
  // node: K extends keyof typeof t
  //   ? Extract<typeof t[K], { type: "string" }>
  //   : t.Node,
  parent: t.Node,
  stack?: t.Node[],
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
        ? function (node, parent, stack) {
            return fn(node, parent, stack) ?? func(node, parent, stack);
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
  printStack?: t.Node[],
) {
  if (!parent) return false;

  if (isNewExpression(parent) && parent.callee === node) {
    if (isOrHasCallExpression(node)) return true;
  }

  return expandedParens.get(node.type)?.(node, parent, printStack);
}
