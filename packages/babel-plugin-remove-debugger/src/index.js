export default function () {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      DebuggerStatement() {
        this.dangerouslyRemove();
      }
    }
  };
}
