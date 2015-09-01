export default function () {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      CallExpression: function (node, parent, scope, file) {
        if (this.get("callee").matchesPattern("Object.assign")) {
          node.callee = file.addHelper("extends");
        }
      }
    }
  };
}
