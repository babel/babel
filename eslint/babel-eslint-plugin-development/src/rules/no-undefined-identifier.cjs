const getReferenceOrigin = require("../utils/get-reference-origin.cjs");
const isFromBabelTypes = require("../utils/is-from-babel-types.cjs");

function firstArgumentIsUndefinedString(argumentsArray) {
  return (
    argumentsArray.length > 0 &&
    argumentsArray[0].type === "Literal" &&
    argumentsArray[0].value === "undefined"
  );
}

module.exports = {
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
            "Use path.scope.buildUndefinedNode() to create an undefined identifier directly.",
          );
        }
      },
    };
  },
};
