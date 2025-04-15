import { declare } from "@babel/helper-plugin-utils";
import wrapFunction from "@babel/helper-wrap-function";
import { types as t, type Visitor } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  const isFunctionSent = (node: t.MetaProperty) =>
    t.isIdentifier(node.meta, { name: "function" }) &&
    t.isIdentifier(node.property, { name: "sent" });

  const hasBeenReplaced = (
    node: t.Node,
    sentId: string,
  ): node is t.AssignmentExpression =>
    t.isAssignmentExpression(node) &&
    t.isIdentifier(node.left, { name: sentId });

  const yieldVisitor: Visitor<{ sentId: string }> = {
    Function(path) {
      path.skip();
    },

    YieldExpression(path) {
      if (!hasBeenReplaced(path.parent, this.sentId)) {
        path.replaceWith(
          t.assignmentExpression("=", t.identifier(this.sentId), path.node),
        );
      }
    },

    MetaProperty(path) {
      if (isFunctionSent(path.node)) {
        path.replaceWith(t.identifier(this.sentId));
      }
    },
  };

  return {
    name: "proposal-function-sent",
    manipulateOptions: (_, parser) => parser.plugins.push("functionSent"),

    visitor: {
      Function(path, state) {
        if (!path.node.generator) return;

        const hasSent = process.env.BABEL_8_BREAKING
          ? t.traverseFast(path.node, node => {
              if (t.isMetaProperty(node) && isFunctionSent(node)) {
                return t.traverseFast.stop;
              }
            })
          : (function () {
              try {
                t.traverseFast(path.node, node => {
                  if (t.isMetaProperty(node) && isFunctionSent(node)) {
                    // eslint-disable-next-line @typescript-eslint/only-throw-error
                    throw null;
                  }
                });
                return false;
              } catch {
                return true;
              }
            })();
        if (!hasSent) return;

        const sentId = path.scope.generateUid("function.sent");
        path.traverse(yieldVisitor, { sentId });
        // @ts-expect-error A generator must not be an arrow function
        path.node.body.body.unshift(
          t.variableDeclaration("let", [
            t.variableDeclarator(t.identifier(sentId), t.yieldExpression()),
          ]),
        );

        wrapFunction(path, state.addHelper("skipFirstGeneratorNext"));
      },
    },
  };
});
