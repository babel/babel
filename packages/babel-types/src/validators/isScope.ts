import {
  isFunction,
  isCatchClause,
  isBlockStatement,
  isScopable,
  isPattern,
} from "./generated";
import type * as types from "../types";

/**
 * Check if the input `node` is a scope.
 */
export default function isScope(node: types.Node, parent: types.Node): boolean {
  // If a BlockStatement is an immediate descendent of a Function/CatchClause, it must be in the body.
  // Hence we skipped the parentKey === "params" check
  if (isBlockStatement(node) && (isFunction(parent) || isCatchClause(parent))) {
    return false;
  }

  // If a Pattern is an immediate descendent of a Function/CatchClause, it must be in the params.
  // Hence we skipped the parentKey === "params" check
  if (isPattern(node) && (isFunction(parent) || isCatchClause(parent))) {
    return true;
  }

  return isScopable(node);
}
