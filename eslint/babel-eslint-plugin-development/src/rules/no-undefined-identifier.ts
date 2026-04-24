import type { Rule } from "eslint";
import type { Expression, SpreadElement } from "estree";
import getReferenceOrigin from "../utils/get-reference-origin.ts";
import isFromBabelTypes from "../utils/is-from-babel-types.ts";

function firstArgumentIsUndefinedString(
  argumentsArray: (Expression | SpreadElement)[],
): boolean {
  return (
    argumentsArray.length > 0 &&
    argumentsArray[0].type === "Literal" &&
    argumentsArray[0].value === "undefined"
  );
}

export default {
  meta: {
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node;
        const scope = context.sourceCode.getScope(node);

        const origin = getReferenceOrigin(callee, scope);
        if (
          !(origin && (origin.kind === "import" || origin.kind === "property"))
        )
          return;

        const { name } = origin;
        if (
          (name === "identifier" || name === "Identifier") &&
          firstArgumentIsUndefinedString(node.arguments) &&
          isFromBabelTypes(origin, scope)
        ) {
          context.report({
            node,
            message:
              "Use t.buildUndefinedNode() to create an undefined identifier directly.",
          });
        }
      },
    };
  },
} satisfies Rule.RuleModule;
