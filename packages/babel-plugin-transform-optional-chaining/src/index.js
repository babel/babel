import syntaxOptionalChaining from "babel-plugin-syntax-optional-chaining";

export default function ({ types: t }) {
  return {
    inherits: syntaxOptionalChaining,

    visitor: {
      MemberExpression(path) {
        if (!path.node.optional) {
          return;
        }

        const { scope, node } = path;
        const { object } = node;

        node.optional = false;

        const ref = scope.generateUidIdentifierBasedOnNode(object);
        scope.push({ id: ref });
        node.object = ref;

        let parent = path;
        let expression = path;
        while (parent.listKey === undefined) {
          expression = parent;
          parent = parent.parentPath;
        }

        const replace = parent.isExpression() ? parent : expression;
        replace.replaceWith(t.conditionalExpression(
          t.binaryExpression("==", t.assignmentExpression("=", ref, object), t.nullLiteral()),
          scope.buildUndefinedNode(),
          replace.node
        ));
      },

      "NewExpression|CallExpression"(path) {
        if (!path.node.optional) {
          return;
        }

        const { scope, node } = path;
        const { callee } = node;

        node.optional = false;

        const ref = scope.generateUidIdentifierBasedOnNode(callee);
        scope.push({ id: ref });
        node.callee = ref;

        if (t.isMemberExpression(callee) && !t.isNewExpression(node)) {
          const context = scope.generateUidIdentifierBasedOnNode(callee.object);
          scope.push({ id: context });
          callee.object = t.assignmentExpression("=", context, callee.object);

          node.arguments.unshift(context);
          node.callee = t.memberExpression(node.callee, t.identifier("call"));
        }

        path.replaceWith(t.conditionalExpression(
          t.binaryExpression("==", t.assignmentExpression("=", ref, callee), t.nullLiteral()),
          scope.buildUndefinedNode(),
          node
        ));
      },
    },
  };
}
