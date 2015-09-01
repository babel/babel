export default function ({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(node) {
        this.ensureBlock();
        node.expression = false;
        node.type = "FunctionExpression";
        node.shadow = node.shadow || true;
      }
    }
  };
}
