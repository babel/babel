/* @noflow */

import whitespace from "./whitespace";
import * as parens from "./parentheses";
import * as t from "babel-types";

function find(obj, node, parent, printStack) {
  if (!obj) return;
  let result;

  let types = Object.keys(obj);
  for (let i = 0; i < types.length; i++) {
    let type = types[i];

    if (t.is(type, node)) {
      let fn = obj[type];
      result = fn(node, parent, printStack);
      if (result != null) break;
    }
  }

  return result;
}

function isOrHasCallExpression(node) {
  if (t.isCallExpression(node)) {
    return true;
  }

  if (t.isMemberExpression(node)) {
    return isOrHasCallExpression(node.object) ||
      (!node.computed && isOrHasCallExpression(node.property));
  } else {
    return false;
  }
}


export function isUserWhitespacable(node) {
  return t.isUserWhitespacable(node);
}

export function needsWhitespace(node, parent, type) {
  if (!node) return 0;

  if (t.isExpressionStatement(node)) {
    node = node.expression;
  }

  let linesInfo = find(whitespace.nodes, node, parent);

  if (!linesInfo) {
    let items = find(whitespace.list, node, parent);
    if (items) {
      for (let i = 0; i < items.length; i++) {
        linesInfo = needsWhitespace(items[i], node, type);
        if (linesInfo) break;
      }
    }
  }

  return (linesInfo && linesInfo[type]) || 0;
}

export function needsWhitespaceBefore(node, parent) {
  return needsWhitespace(node, parent, "before");
}

export function needsWhitespaceAfter(node, parent) {
  return needsWhitespace(node, parent, "after");
}

export function needsParens(node, parent, printStack) {
  if (!parent) return false;

  if (t.isNewExpression(parent) && parent.callee === node) {
    if (isOrHasCallExpression(node)) return true;
  }

  return find(parens, node, parent, printStack);
}
