import * as whitespace from "./whitespace";
import * as parens from "./parentheses";
import {
  FLIPPED_ALIAS_KEYS,
  isCallExpression,
  isExpressionStatement,
  isMemberExpression,
  isNewExpression,
} from "@babel/types";
import type * as t from "@babel/types";

import type { WhitespaceFlag } from "./whitespace";

export type NodeHandlers<R> = {
  [K in string]?: (
    node: K extends t.Node["type"] ? Extract<t.Node, { type: K }> : t.Node,
    // todo:
    // node: K extends keyof typeof t
    //   ? Extract<typeof t[K], { type: "string" }>
    //   : t.Node,
    parent: t.Node,
    stack: t.Node[],
  ) => R;
};

function expandAliases<R>(obj: NodeHandlers<R>) {
  const newObj: NodeHandlers<R> = {};

  function add(
    type: string,
    func: (node: t.Node, parent: t.Node, stack: t.Node[]) => R,
  ) {
    const fn = newObj[type];
    newObj[type] = fn
      ? function (node, parent, stack) {
          const result = fn(node, parent, stack);

          return result == null ? func(node, parent, stack) : result;
        }
      : func;
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

  return newObj;
}

// Rather than using `t.is` on each object property, we pre-expand any type aliases
// into concrete types so that the 'find' call below can be as fast as possible.
const expandedParens = expandAliases(parens);
const expandedWhitespaceNodes = expandAliases(whitespace.nodes);

function find<R>(
  obj: NodeHandlers<R>,
  node: t.Node,
  parent: t.Node,
  printStack?: t.Node[],
): R | null {
  const fn = obj[node.type];
  return fn ? fn(node, parent, printStack) : null;
}

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

  const flag = find(expandedWhitespaceNodes, node, parent);

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

  return find(expandedParens, node, parent, printStack);
}
