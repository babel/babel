export var metadata = {
  optional: true,
  group: "builtin-pre"
};

export var visitor = {
  CallExpression() {
    if (this.get("callee").matchesPattern("console", true)) {
      this.dangerouslyRemove();
    }
  }
};
