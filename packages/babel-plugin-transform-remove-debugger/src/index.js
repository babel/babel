export default function () {
  return {
    visitor: {
      DebuggerStatement(path) {
        path.remove();
      }
    }
  };
};
