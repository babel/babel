export default function () {
  return {
    visitor: {
      CallExpression(path) {
        if (path.get("callee").matchesPattern("console", true)) {
          let parent = path.getStatementParent();
          if (parent !== path.parentPath) parent.remove();
          path.remove();
        }
      }
    }
  };
}
