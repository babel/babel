export default function ({ types: t }) {
  return {
    visitor: {
      BinaryExpression(path) {
        if (path.node.operator !== "||=") {
          return;
        }
        path.replaceWith(
          t.conditionalExpression(
            t.identifier("!" + path.node.left.name),
            t.assignmentExpression("=", path.node.left, path.node.right),
            t.identifier("undefined")));
      }
    }
  };
}
