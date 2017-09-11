import syntaxFunctionSent from "babel-plugin-syntax-function-sent";
import wrapFunction from "babel-helper-wrap-function";

export default function({ types: t }) {
  const isFunctionSent = node =>
    t.isIdentifier(node.meta, { name: "function" }) &&
    t.isIdentifier(node.property, { name: "sent" });

  const yieldVisitor = {
    Function(path) {
      path.skip();
    },

    YieldExpression(path) {
      const replaced = t.isAssignmentExpression(path.parent, {
        left: this.sentId,
      });
      if (!replaced) {
        path.replaceWith(t.assignmentExpression("=", this.sentId, path.node));
      }
    },

    MetaProperty(path) {
      if (isFunctionSent(path.node)) {
        path.replaceWith(this.sentId);
      }
    },
  };

  return {
    inherits: syntaxFunctionSent,

    visitor: {
      MetaProperty(path, state) {
        if (!isFunctionSent(path.node)) return;

        const fnPath = path.getFunctionParent();

        if (!fnPath.node.generator) {
          throw new Error("Parent generator function not found");
        }

        const sentId = path.scope.generateUidIdentifier("function.sent");

        fnPath.traverse(yieldVisitor, { sentId });
        fnPath.node.body.body.unshift(
          t.variableDeclaration("let", [
            t.variableDeclarator(sentId, t.yieldExpression()),
          ]),
        );

        wrapFunction(fnPath, state.addHelper("skipFirstGeneratorNext"));
      },
    },
  };
}
