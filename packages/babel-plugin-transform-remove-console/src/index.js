export default function () {
  return {
    visitor: {
      CallExpression(path) {
        if (path.get("callee").matchesPattern("console", true)) {
          path.remove();
        }
      }
    }
  };
};
