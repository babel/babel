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
      BinaryExpression(path, state) {
        path.replaceWith(
          t.ExpressionStatement(
            t.CallExpression(
              state.addImport("babel-check-binary-expressions", "default"),
              [path.node.left, path.node.right],
            ),
          ),
        );
      },
    },
  };
}
