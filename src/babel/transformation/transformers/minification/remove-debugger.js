export var metadata = {
  optional: true,
  group: "builtin-pre"
};

export function DebuggerStatement(node) {
  this.dangerouslyRemove();
}
