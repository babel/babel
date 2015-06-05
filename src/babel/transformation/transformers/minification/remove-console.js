import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-pre"
};

export function CallExpression(node, parent) {
  if (this.get("callee").matchesPattern("console", true)) {
    if (t.isExpressionStatement(parent)) {
      this.parentPath.dangerouslyRemove();
    } else {
      this.dangerouslyRemove();
    }
  }
}
