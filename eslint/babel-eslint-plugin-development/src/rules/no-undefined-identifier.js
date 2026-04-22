import getReferenceOrigin from "../utils/get-reference-origin.js";
import isFromBabelTypes from "../utils/is-from-babel-types.js";

function firstArgumentIsUndefinedString(argumentsArray) {
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
        const scope = context.sourceCode
          ? context.sourceCode.getScope(node)
          : context.getScope();

        const origin = getReferenceOrigin(callee, scope);
        if (!origin) return;

        const { name } = origin;
        if (
          (name === "identifier" || name === "Identifier") &&
          firstArgumentIsUndefinedString(node.arguments) &&
          isFromBabelTypes(origin, scope)
        ) {
          context.report(
            node,
            "Use t.buildUndefinedNode() to create an undefined identifier directly.",
          );
        }
      },
    };
  },
};
