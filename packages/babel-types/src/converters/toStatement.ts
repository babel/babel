import {
  isStatement,
  isFunction,
  isClass,
  isAssignmentExpression,
} from "../validators/generated/index.ts";
import { expressionStatement } from "../builders/generated/index.ts";
import type * as t from "../index.ts";

export default toStatement as {
  (node: t.AssignmentExpression, ignore?: boolean): t.ExpressionStatement;

  <T extends t.Statement>(node: T, ignore: false): T;
  <T extends t.Statement>(node: T, ignore?: boolean): T | false;

  (node: t.Class, ignore: false): t.ClassDeclaration;
  (node: t.Class, ignore?: boolean): t.ClassDeclaration | false;

  (node: t.Function, ignore: false): t.FunctionDeclaration;
  (node: t.Function, ignore?: boolean): t.FunctionDeclaration | false;

  (node: t.Node, ignore: false): t.Statement;
  (node: t.Node, ignore?: boolean): t.Statement | false;
};

function toStatement(node: t.Node, ignore?: boolean): t.Statement | false {
  if (isStatement(node)) {
    return node;
  }

  let mustHaveId = false;
  let newType;

  if (isClass(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration" as const;
  } else if (isFunction(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration" as const;
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

  // @ts-expect-error manipulating node.type
  node.type = newType;

  // @ts-expect-error todo(flow->ts) refactor to avoid type unsafe mutations like reassigning node type above
  return node;
}
