import { declare } from "@babel/helper-plugin-utils";
import wrapFunction from "@babel/helper-wrap-function";
import { traverse, types as t, type NodePath } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const isFunctionSent = (node: t.MetaProperty) =>
    t.isIdentifier(node.meta, { name: "function" }) &&
    t.isIdentifier(node.property, { name: "sent" });

  const hasBeenReplaced = (
    node: t.Node,
    sentId: string,
  ): node is t.AssignmentExpression =>
    t.isAssignmentExpression(node) &&
    t.isIdentifier(node.left, { name: sentId });

  // Like `path.getFunctionParent()`, but computed keys and decorators of a
  // method are evaluated by the function enclosing the method.
  const getEvaluatingFunction = (path: NodePath) =>
    path.find(
      p =>
        !!p.parentPath?.isFunction() &&
        p.key !== "key" &&
        p.listKey !== "decorators",
    )?.parentPath as NodePath<t.Function> | undefined;

  const yieldVisitor = traverse.visitors.environmentVisitor<{
    sentId: string;
  }>({
    ArrowFunctionExpression(path) {
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
  });

  return {
    name: "proposal-function-sent",
    manipulateOptions: (_, parser) => parser.plugins.push("functionSent"),

    visitor: {
      MetaProperty(path, state) {
        if (!isFunctionSent(path.node)) return;

        const fnPath = getEvaluatingFunction(path);

        if (!fnPath?.node.generator) {
          throw new Error("Parent generator function not found");
        }

        const sentId = path.scope.generateUid("function.sent");

        fnPath.traverse(yieldVisitor, { sentId });
        // @ts-expect-error A generator must not be an arrow function
        fnPath.node.body.body.unshift(
          t.variableDeclaration("let", [
            t.variableDeclarator(t.identifier(sentId), t.yieldExpression()),
          ]),
        );

        wrapFunction(fnPath, state.addHelper("skipFirstGeneratorNext"));
      },
    },
  };
});
