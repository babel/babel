import syntaxPipelineOperator from "babel-plugin-syntax-pipeline-operator";

export default function({ types: t }) {
  return {
    inherits: syntaxPipelineOperator,

    visitor: {
      BinaryExpression(path) {
        const { scope, parentPath } = path;
        const { node } = path;
        const { operator, left, right } = node;
        if (operator !== "|>") return;

        // Why do I have to fix this here?!
        if (parentPath.isArrowFunctionExpression({ body: node })) {
          path.replaceWith(t.blockStatement([t.returnStatement(node)]));
          return;
        }

        const optimizeArrow =
          t.isArrowFunctionExpression(right) &&
          right.params.length === 1 &&
          t.isIdentifier(right.params[0]) &&
          t.isExpression(right.body);

        const param = optimizeArrow ? right.params[0] : left;
        const placeholder = scope.generateUidIdentifierBasedOnNode(param);
        scope.push({ id: placeholder });

        if (optimizeArrow) {
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
