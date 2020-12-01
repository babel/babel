import {
  isStatement,
  isFunction,
  isClass,
  isAssignmentExpression,
} from "../validators/generated";
import { expressionStatement } from "../builders/generated";
import type * as t from "../types";

export default function toStatement(
  node: t.AssignmentExpression,
  ignore?: boolean,
): t.ExpressionStatement;

export default function toStatement(
  node: t.Statement | t.AssignmentExpression,
  ignore?: boolean,
): t.Statement;

export default function toStatement(
  node: t.Class,
  ignore: true,
): t.ClassDeclaration | undefined;

export default function toStatement(
  node: t.Class,
  ignore?: boolean,
): t.ClassDeclaration;

export default function toStatement(
  node: t.Function,
  ignore: true,
): t.FunctionDeclaration | undefined;

export default function toStatement(
  node: t.Function,
  ignore?: boolean,
): t.FunctionDeclaration;

export default function toStatement(
  node: t.Statement | t.Class | t.Function | t.AssignmentExpression,
  ignore: true,
): t.Statement | undefined;

export default function toStatement(
  node: t.Statement | t.Class | t.Function | t.AssignmentExpression,
  ignore?: boolean,
): t.Statement | false;

export default function toStatement(
  node: t.Statement | t.Class | t.Function | t.AssignmentExpression,
  ignore?: boolean,
): t.Statement | false {
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
