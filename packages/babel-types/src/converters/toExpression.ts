import {
  isExpression,
  isFunction,
  isClass,
  isExpressionStatement,
} from "../validators/generated/index.ts";
import type * as t from "../index.ts";

export default toExpression as {
  (node: t.Function): t.FunctionExpression;
  (node: t.Class): t.ClassExpression;
  (
    node: t.ExpressionStatement | t.Expression | t.Class | t.Function,
  ): t.Expression;
};

function toExpression(
  node: t.ExpressionStatement | t.Expression | t.Class | t.Function,
): t.Expression {
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
    // @ts-expect-error todo(flow->ts): avoid type unsafe mutations
    node.type = "ClassExpression";
  } else if (isFunction(node)) {
    // @ts-expect-error todo(flow->ts): avoid type unsafe mutations
    node.type = "FunctionExpression";
  }

  // if it's still not an expression
  if (!isExpression(node)) {
    throw new Error(`cannot turn ${node.type} to an expression`);
  }

  return node;
}
