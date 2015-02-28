import * as messages from "../../../messages";
import t from "../../../types";

export function Program(program) {
  var first = program.body[0];
  if (t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" })) {
    program.body.shift();
  }
}

export function FunctionExpression() {
  this.skip();
}

export { FunctionExpression as FunctionDeclaration };

export function ThisExpression() {
  return t.identifier("undefined");
}

export function CallExpression(node, parent, scope, file) {
  if (t.isIdentifier(node.callee, { name: "eval" })) {
    throw file.errorWithNode(node, messages.get("evalInStrictMode"));
  }
}
