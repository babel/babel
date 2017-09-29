import syntaxPipelineOperator from "babel-plugin-syntax-pipeline-operator";

export default function({ types: t }) {
  return {
    inherits: syntaxPipelineOperator,

    visitor: {
      BinaryExpression(path) {
        const { scope } = path;
        const { operator, left, right } = path.node;
        if (operator !== "|>") return;

        let optimizeArrow =
          t.isArrowFunctionExpression(right) && t.isExpression(right.body);
        let param;

        if (optimizeArrow) {
          const { params } = right;
          if (params.length === 1) {
            param = params[0];
          } else if (params.length > 1) {
            optimizeArrow = false;
          }
        }

        if (optimizeArrow && !param) {
          // Arrow function with 0 arguments
          path.replaceWith(t.sequenceExpression([left, right.body]));
          return;
        }

        const placeholder = scope.generateUidIdentifierBasedOnNode(
          param || left,
        );
        scope.push({ id: placeholder });
        if (param) {
          path.get("right").scope.rename(param.name, placeholder.name);
        }

        const call = optimizeArrow
          ? right.body
          : t.callExpression(right, [placeholder]);
        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression("=", placeholder, left),
            call,
          ]),
        );
      },
    },
  };
}
