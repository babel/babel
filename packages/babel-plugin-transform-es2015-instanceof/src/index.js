export default function ({ types: t }) {
  return {
    name: "babel-plugin-transform-es2015-instanceof",

    visitor: {
      BinaryExpression(path) {
        const { node } = path;
        if (node.operator === "instanceof") {
          path.replaceWith(t.callExpression(this.addHelper("instanceof"), [node.left, node.right]));
        }
      },
    }
  };
}
