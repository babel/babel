import pull from "lodash/array/pull";

export default function ({ types: t }) {
  function isProtoKey(node) {
    return t.isLiteral(t.toComputedKey(node, node.key), { value: "__proto__" });
  }

  function isProtoAssignmentExpression(node) {
    var left = node.left;
    return t.isMemberExpression(left) && t.isLiteral(t.toComputedKey(left, left.property), { value: "__proto__" });
  }

  function buildDefaultsCallExpression(expr, ref, file) {
    return t.expressionStatement(t.callExpression(file.addHelper("defaults"), [ref, expr.right]));
  }

  return {
    visitor: {
      AssignmentExpression(path, file) {
        if (!isProtoAssignmentExpression(path.node)) return;

        var nodes = [];
        var left  = path.node.left.object;
        var temp  = path.scope.maybeGenerateMemoised(left);

        if (temp) nodes.push(t.expressionStatement(t.assignmentExpression("=", temp, left)));
        nodes.push(buildDefaultsCallExpression(path.node, temp || left, file));
        if (temp) nodes.push(temp);

        return nodes;
      },

      ExpressionStatement({ node }, file) {
        var expr = node.expression;
        if (!t.isAssignmentExpression(expr, { operator: "=" })) return;

        if (isProtoAssignmentExpression(expr)) {
          return buildDefaultsCallExpression(expr, expr.left.object, file);
        }
      },

      ObjectExpression({ node }, file) {
        var proto;

        for (var prop of (node.properties: Array)) {
          if (isProtoKey(prop)) {
            proto = prop.value;
            pull(node.properties, prop);
          }
        }

        if (proto) {
          var args = [t.objectExpression([]), proto];
          if (node.properties.length) args.push(node);
          return t.callExpression(file.addHelper("extends"), args);
        }
      }
    }
  };
}
