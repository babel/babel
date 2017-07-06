import syntaxFunctionSent from "babel-plugin-syntax-function-sent";
import wrapFunction from "babel-helper-wrap-function";

export default function({ types: t }) {
  return {
    inherits: syntaxFunctionSent,

    visitor: {
      MetaProperty(path) {
        if (!t.isIdentifier(path.node.meta, { name: "function" })) return;
        if (!t.isIdentifier(path.node.property, { name: "sent" })) return;

        const fnPath = path.getFunctionParent();

        if (!fnPath.node.generator) {
          throw new Error("Parent generator function not found");
        }

        const sentId =
          fnPath.getData("sentId") ||
          fnPath.setData(
            "sentId",
            path.scope.generateUidIdentifier("function.sent"),
          );

        path.replaceWith(sentId);
      },

      Function: {
        exit(path, state) {
          if (!path.node.generator) return;

          const sentId = path.getData("sentId");
          if (!sentId) return;

          path.node.body.body.unshift(
            t.variableDeclaration("const", [
              t.variableDeclarator(sentId, t.yieldExpression()),
            ]),
          );

          wrapFunction(path, state.addHelper("skipFirstGeneratorNext"));
        },
      },
    },
  };
}
