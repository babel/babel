import {
  isBlockStatement,
  isFunction,
  isEmptyStatement,
  isStatement,
} from "../validators/generated";
import {
  returnStatement,
  expressionStatement,
  blockStatement,
} from "../builders/generated";
import type * as types from "../types";

export default function toBlock(
  node: types.Statement | types.Expression,
  parent?: types.Node | null,
): types.BlockStatement {
  if (isBlockStatement(node)) {
    return node;
  }

  let blockNodes = [];

  if (isEmptyStatement(node)) {
    blockNodes = [];
  } else {
    if (!isStatement(node)) {
      if (isFunction(parent)) {
        node = returnStatement(node);
      } else {
        node = expressionStatement(node);
      }
    }

    blockNodes = [node];
  }

  return blockStatement(blockNodes);
}
