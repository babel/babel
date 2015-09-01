export default function () {
  return {
    visitor: {
      CallExpression(node, parent, scope, file) {
        if (this.get("callee").matchesPattern("Object.setPrototypeOf")) {
          node.callee = file.addHelper("defaults");
        }
      }
    }
  };
}
