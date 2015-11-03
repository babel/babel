export default function ({ types: t }) {
  return {
    visitor: {
      BinaryExpression(path) {
        let { node } = path;
        if (node.operator === "instanceof") {
          path.replaceWith(t.callExpression(this.addHelper("instanceof"), [node.left, node.right]));
        }
      }
    }
  };
}
