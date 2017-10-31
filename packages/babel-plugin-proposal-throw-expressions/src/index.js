import syntaxThrowExpressions from "@babel/plugin-syntax-throw-expressions";
import { types as t } from "@babel/core";

export default function() {
  return {
    inherits: syntaxThrowExpressions,

    visitor: {
      UnaryExpression(path) {
        const { operator, argument } = path.node;
        if (operator !== "throw") return;

        const arg = t.identifier("e");
        const arrow = t.functionExpression(
          null,
          [arg],
          t.blockStatement([t.throwStatement(arg)]),
        );

        path.replaceWith(t.callExpression(arrow, [argument]));
      },
    },
  };
}
