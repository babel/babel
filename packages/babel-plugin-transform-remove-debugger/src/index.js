export default function () {
  return {
    visitor: {
      DebuggerStatement(path) {
        let parent = path.getStatementParent();
        if (parent === path.parentPath) parent.remove();
        path.remove();
      }
    }
  };
}
