// @flow
import {
  isFunction,
  isCatchClause,
  isBlockStatement,
  isScopable,
  isPattern,
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

  // If a Pattern is an immediate descendent of a Function, it must be in the params.
  // Hence we skipped the parentKey === "params" check
  if (isPattern(node) && isFunction(parent)) {
    return true;
  }

  return isScopable(node);
}
