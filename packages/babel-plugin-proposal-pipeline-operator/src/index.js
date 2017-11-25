import syntaxPipelineOperator from "@babel/plugin-syntax-pipeline-operator";
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    inherits: syntaxPipelineOperator,

    visitor: {
      BinaryExpression(path) {
        const { scope } = path;
        const { node } = path;
        const { operator, left } = node;
        let { right } = node;
        if (operator !== "|>") return;

        let optimizeArrow =
          t.isArrowFunctionExpression(right) && t.isExpression(right.body);
        let param;

        if (optimizeArrow) {
          const { params } = right;
          if (params.length === 1 && t.isIdentifier(params[0])) {
            param = params[0];
          } else if (params.length > 0) {
            optimizeArrow = false;
          }
        } else if (t.isIdentifier(right, { name: "eval" })) {
          right = t.sequenceExpression([t.numericLiteral(0), right]);
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
