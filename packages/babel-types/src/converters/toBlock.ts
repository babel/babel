import {
  isBlockStatement,
  isFunction,
  isEmptyStatement,
  isStatement,
} from "../validators/generated/index.ts";
import {
  returnStatement,
  expressionStatement,
  blockStatement,
} from "../builders/generated/index.ts";
import type * as t from "../index.ts";

export default function toBlock(
  node: t.Statement | t.Expression,
  parent?: t.Node,
): t.BlockStatement {
  if (isBlockStatement(node)) {
    return node;
  }

  let blockNodes: t.Statement[] = [];

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
