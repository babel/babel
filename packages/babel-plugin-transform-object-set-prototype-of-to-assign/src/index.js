export default function () {
  return {
    name: "babel-plugin-transform-object-set-prototype-of-to-assign",

    visitor: {
      CallExpression(path, file) {
        if (path.get("callee").matchesPattern("Object.setPrototypeOf")) {
          path.node.callee = file.addHelper("defaults");
        }
      },
    }
  };
}
