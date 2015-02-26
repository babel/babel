import * as messages from "../../../messages";
import t from "../../../types";

export function Program(program) {
  var first = program.body[0];
  if (t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" })) {
    program.body.shift();
  }
}

exports.FunctionDeclaration =
exports.FunctionExpression = function () {
  this.skip();
};

export function ThisExpression() {
  return t.identifier("undefined");
}

export function CallExpression(node, parent, scope, file) {
  if (t.isIdentifier(node.callee, { name: "eval" })) {
    throw file.errorWithNode(node, messages.get("evalInStrictMode"));
  }
}
