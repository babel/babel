export var metadata = {
  optional: true,
  group: "builtin-pre"
};

export var visitor = {
  DebuggerStatement() {
    this.dangerouslyRemove();
  }
};
