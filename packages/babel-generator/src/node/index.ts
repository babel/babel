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
import type { WhitespaceObject } from "./whitespace";

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
const expandedWhitespaceList = expandAliases(whitespace.list);

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
  type: "before" | "after",
): boolean {
  if (!node) return false;

  if (isExpressionStatement(node)) {
    node = node.expression;
  }

  let linesInfo: WhitespaceObject | null | boolean = find(
    expandedWhitespaceNodes,
    node,
    parent,
  );

  if (!linesInfo) {
    const items = find(expandedWhitespaceList, node, parent);
    if (items) {
      for (let i = 0; i < items.length; i++) {
        linesInfo = needsWhitespace(items[i], node, type);
        if (linesInfo) break;
      }
    }
  }

  if (typeof linesInfo === "object" && linesInfo !== null) {
    return linesInfo[type] || false;
  }

  return false;
}

export function needsWhitespaceBefore(node: t.Node, parent: t.Node) {
  return needsWhitespace(node, parent, "before");
}

export function needsWhitespaceAfter(node: t.Node, parent: t.Node) {
  return needsWhitespace(node, parent, "after");
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
