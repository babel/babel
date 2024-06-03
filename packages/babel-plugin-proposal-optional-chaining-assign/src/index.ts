import { declare } from "@babel/helper-plugin-utils";
import syntaxOptionalChainingAssign from "@babel/plugin-syntax-optional-chaining-assign";
import type { NodePath, types as t } from "@babel/core";
import { skipTransparentExprWrappers } from "@babel/helper-skip-transparent-expression-wrappers";
import { transformOptionalChain } from "@babel/plugin-transform-optional-chaining";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.22.5"));

  const assumptions = {
    noDocumentAll: api.assumption("noDocumentAll") ?? false,
    pureGetters: api.assumption("pureGetters") ?? false,
  };

  const { types: t } = api;

  return {
    name: "transform-optional-chaining-assign",
    inherits: syntaxOptionalChainingAssign,

    visitor: {
      AssignmentExpression(path, state) {
        let lhs = path.get("left");
        if (!lhs.isExpression()) return;
        const isParenthesized =
          lhs.node.extra?.parenthesized ||
          t.isParenthesizedExpression(lhs.node);

        lhs = skipTransparentExprWrappers(lhs) as NodePath<
          t.LVal & t.Expression
        >;
        if (!lhs.isOptionalMemberExpression()) return;

        let ifNullish: t.Expression = path.scope.buildUndefinedNode();
        if (isParenthesized) {
          ifNullish = t.callExpression(
            state.addHelper("nullishReceiverError"),
            [],
          );
          if (path.node.operator === "=") {
            ifNullish = t.sequenceExpression([
              t.cloneNode(path.node.right),
              ifNullish,
            ]);
          }
        }

        transformOptionalChain(lhs, assumptions, path, ifNullish);
      },
    },
  };
});
