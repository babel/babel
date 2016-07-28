/* eslint max-len: 0 */

import pull from "lodash/pull";

export default function ({ types: t }) {
  function isProtoKey(node) {
    return t.isLiteral(t.toComputedKey(node, node.key), { value: "__proto__" });
  }

  function isProtoAssignmentExpression(node) {
    let left = node.left;
    return t.isMemberExpression(left) && t.isLiteral(t.toComputedKey(left, left.property), { value: "__proto__" });
  }

  function buildDefaultsCallExpression(expr, ref, file) {
    return t.expressionStatement(t.callExpression(file.addHelper("defaults"), [ref, expr.right]));
  }

  return {
    visitor: {
      AssignmentExpression(path, file) {
        if (!isProtoAssignmentExpression(path.node)) return;

        let nodes = [];
        let left  = path.node.left.object;
        let temp  = path.scope.maybeGenerateMemoised(left);

        if (temp) nodes.push(t.expressionStatement(t.assignmentExpression("=", temp, left)));
        nodes.push(buildDefaultsCallExpression(path.node, temp || left, file));
        if (temp) nodes.push(temp);

        path.replaceWithMultiple(nodes);
      },

      ExpressionStatement(path, file) {
        let expr = path.node.expression;
        if (!t.isAssignmentExpression(expr, { operator: "=" })) return;

        if (isProtoAssignmentExpression(expr)) {
          path.replaceWith(buildDefaultsCallExpression(expr, expr.left.object, file));
        }
      },

      ObjectExpression(path, file) {
        let proto;
        let { node } = path;

        for (let prop of (node.properties: Array)) {
          if (isProtoKey(prop)) {
            proto = prop.value;
            pull(node.properties, prop);
          }
        }

        if (proto) {
          let args = [t.objectExpression([]), proto];
          if (node.properties.length) args.push(node);
          path.replaceWith(t.callExpression(file.addHelper("extends"), args));
        }
      }
    }
  };
}
