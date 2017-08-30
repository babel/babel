import syntaxBigInt from "babel-plugin-syntax-bigint";

export default function({ types: t }) {
  return {
    inherits: syntaxBigInt,

    visitor: {
      BigIntLiteral(path) {
        path.replaceWith(
          t.NewExpression(t.Identifier("BigInt"), [
            t.StringLiteral(path.node.value),
          ]),
        );
      },
      UnaryExpression(path, state) {
        // TODO: figure out how to handle unary plus
        if (["typeof", "-", "~"].indexOf(path.node.operator) !== -1) {
          path.replaceWith(
            t.ExpressionStatement(
              t.CallExpression(
                state.addImport(
                  "babel-check-binary-expressions",
                  "checkUnaryExpressions",
                  "checkUnaryExpressions",
                ),
                [t.StringLiteral(path.node.operator), path.node.argument],
              ),
            ),
          );
        }
      },
      BinaryExpression(path, state) {
        path.replaceWith(
          t.ExpressionStatement(
            t.CallExpression(
              state.addImport("babel-check-binary-expressions", "default"),
              [
                path.node.left,
                path.node.right,
                t.StringLiteral(path.node.operator),
              ],
            ),
          ),
        );
      },
    },
  };
}
