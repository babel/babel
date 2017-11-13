import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";

export default function({ types: t }) {
  return {
    inherits: syntaxPatternMatching,

    visitor: {
      MatchExpression(path) {
        const match_expression_id = path.scope.generateUidIdentifier(
          "match_expr",
        );

        const bodyExpr = t.blockStatement(
          [
            t.variableDeclaration("const", [
              t.variableDeclarator(match_expression_id, path.expression),
              t.returnStatement(t.identifier(match_expression_id)),
            ]),
          ],
          [],
        );

        path.replaceWith(
          t.callExpression(
            t.arrowFunctionExpression(
              [], // params
              bodyExpr, // body
              false, // async
            ),
            [],
          ),
        );
      },
    },
  };
}
