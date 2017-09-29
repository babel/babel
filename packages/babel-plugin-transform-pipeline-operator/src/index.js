import syntaxPipelineOperator from "babel-plugin-syntax-pipeline-operator";

export default function({ types: t }) {
  return {
    inherits: syntaxPipelineOperator,

    visitor: {
      BinaryExpression(path) {
        const { operator, left, right } = path.node;
        if (operator !== "|>") return;

        if (
          t.isArrowFunctionExpression(right) &&
          right.params.length === 1 &&
          t.isIdentifier(right.params[0]) &&
          t.isExpression(right.body)
        ) {
          //
          // Optimize away arrow function!
          //
          // Converts:
          //    arg |> x => x + x;
          // To:
          //    (_x = arg, _x + _x);
          //
          const paramName = right.params[0].name;
          const placeholder = path.scope.generateDeclaredUidIdentifier(
            paramName,
          );

          path.get("right").scope.rename(paramName, placeholder.name);
          path.replaceWith(
            t.sequenceExpression([
              t.assignmentExpression("=", placeholder, left),
              right.body,
            ]),
          );
        } else {
          //
          // Simple invocation.
          //
          // Converts:
          //    x |> obj.f;
          // To:
          //    obj.f(x);
          //
          path.replaceWith(t.callExpression(right, [left]));
        }
      },
    },
  };
}
