import {
  isStatement,
  isFunction,
  isClass,
  isAssignmentExpression,
} from "../validators/generated";
import { expressionStatement } from "../builders/generated";
import type * as types from "../types";

export default function toStatement(
  node: types.AssignmentExpression,
  ignore?: boolean,
): types.ExpressionStatement;

export default function toStatement(
  node: types.Statement | types.AssignmentExpression,
  ignore?: boolean,
): types.Statement;

export default function toStatement(
  node: types.Class,
  ignore: true,
): types.ClassDeclaration | undefined;

export default function toStatement(
  node: types.Class,
  ignore?: boolean,
): types.ClassDeclaration;

export default function toStatement(
  node: types.Function,
  ignore: true,
): types.FunctionDeclaration | undefined;

export default function toStatement(
  node: types.Function,
  ignore?: boolean,
): types.FunctionDeclaration;

export default function toStatement(
  node:
    | types.Statement
    | types.Class
    | types.Function
    | types.AssignmentExpression,
  ignore: true,
): types.Statement | undefined;

export default function toStatement(
  node:
    | types.Statement
    | types.Class
    | types.Function
    | types.AssignmentExpression,
  ignore?: boolean,
): types.Statement | false;

export default function toStatement(
  node:
    | types.Statement
    | types.Class
    | types.Function
    | types.AssignmentExpression,
  ignore?: boolean,
): types.Statement | false {
  if (isStatement(node)) {
    return node;
  }

  let mustHaveId = false;
  let newType;

  if (isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if (isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if (isAssignmentExpression(node)) {
    return expressionStatement(node);
  }

  // @ts-expect-error todo(flow->ts): node.id might be missing
  if (mustHaveId && !node.id) {
    newType = false;
  }

  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error(`cannot turn ${node.type} to a statement`);
    }
  }

  node.type = newType;

  // @ts-expect-error todo(flow->ts) refactor to avoid type unsafe mutations like reassigning node type above
  return node;
}
