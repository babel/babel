// @flow
import {
  isFunction,
  isCatchClause,
  isBlockStatement,
  isScopable,
} from "./generated";

/**
 * Check if the input `node` is a scope.
 */
export default function isScope(node: Object, parent: Object): boolean {
  if (isBlockStatement(node) && isFunction(parent, { body: node })) {
    return false;
  }

  if (isBlockStatement(node) && isCatchClause(parent, { body: node })) {
    return false;
  }

  return isScopable(node);
}
