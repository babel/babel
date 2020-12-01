// @flow
import {
  isStatement,
  isFunction,
  isClass,
  isAssignmentExpression,
} from "../validators/generated";
import { expressionStatement } from "../builders/generated";

export default function toStatement(node: Object, ignore?: boolean) {
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

  return node;
}
