import syntaxThrowExpressions from "babel-plugin-syntax-throw-expressions";

export default function({ types: t }) {
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
