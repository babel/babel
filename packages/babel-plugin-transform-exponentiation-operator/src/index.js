import { default as syntaxExponentiationOperator } from "babel-plugin-syntax-exponentiation-operator";
import build from "babel-helper-builder-binary-assignment-operator-visitor";

export default function ({ types: t }) {
  return {
    inherits: syntaxExponentiationOperator,

    visitor: build({
      operator: "**",

      build(left, right) {
        return t.callExpression(t.memberExpression(t.identifier("Math"), t.identifier("pow")), [left, right]);
      }
    })
  };
}
