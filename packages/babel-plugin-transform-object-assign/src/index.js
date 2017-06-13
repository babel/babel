export default function () {
  return {
    name: "babel-plugin-transform-object-assign",

    visitor: {
      CallExpression: function (path, file) {
        if (path.get("callee").matchesPattern("Object.assign")) {
          path.node.callee = file.addHelper("extends");
        }
      },
    }
  };
}
