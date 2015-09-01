export default function ({ Plugin, types: t }) {
  return new Plugin("remove-debugger", {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      DebuggerStatement() {
        this.dangerouslyRemove();
      }
    }
  });
}
