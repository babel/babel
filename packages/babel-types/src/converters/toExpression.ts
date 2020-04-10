import {
  isExpression,
  isFunction,
  isClass,
  isExpressionStatement,
} from "../validators/generated";
import type * as types from "../types";

export default function toExpression(
  node: types.Function,
): types.FunctionExpression;
export default function toExpression(node: types.Class): types.ClassExpression;
export default function toExpression(
  node:
    | types.ExpressionStatement
    | types.Expression
    | types.Class
    | types.Function,
): types.Expression;

export default function toExpression(
  node:
    | types.ExpressionStatement
    | types.Expression
    | types.Class
    | types.Function,
): types.Expression {
  if (isExpressionStatement(node)) {
    node = node.expression;
  }

  // return unmodified node
  // important for things like ArrowFunctions where
  // type change from ArrowFunction to FunctionExpression
  // produces bugs like -> `()=>a` to `function () a`
  // without generating a BlockStatement for it
  // ref: https://github.com/babel/babili/issues/130
  if (isExpression(node)) {
    return node;
  }

  // convert all classes and functions
  // ClassDeclaration -> ClassExpression
  // FunctionDeclaration, ObjectMethod, ClassMethod -> FunctionExpression
  if (isClass(node)) {
    // @ts-ignore
    node.type = "ClassExpression";
  } else if (isFunction(node)) {
    // @ts-ignore
    node.type = "FunctionExpression";
  }

  // if it's still not an expression
  if (!isExpression(node)) {
    throw new Error(`cannot turn ${node.type} to an expression`);
  }

  return node;
}
