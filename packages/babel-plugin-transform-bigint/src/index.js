import syntaxBigInt from "babel-plugin-syntax-bigint";

export default function({ types: t }) {
  return {
    inherits: syntaxBigInt,

    visitor: {
      Program: {
        exit(path: NodePath, state: Object) {
          state.file.addImport("bigint-polyfill", "default", "BigInt");
        },
      },
      BinaryExpression(path) {
        if (path.node.operator === "+") {
          if (
            path.node.left.type === "BigIntLiteral" &&
            path.node.left.type === "BigIntLiteral"
          ) {
            path.replaceWith(
              t.ExpressionStatement(
                t.CallExpression(
                  t.MemberExpression(
                    t.CallExpression(t.Identifier("_BigInt"), [
                      t.StringLiteral(path.node.left.value),
                    ]),
                    t.Identifier("add"),
                  ),
                  [
                    t.CallExpression(t.Identifier("_BigInt"), [
                      t.StringLiteral(path.node.right.value),
                    ]),
                  ],
                ),
              ),
            );
          }
        }
      },
    },
  };
}
