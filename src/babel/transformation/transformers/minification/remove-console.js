import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-pre"
};

export function CallExpression(node, parent) {
  if (this.get("callee").matchesPattern("console", true)) {
    this.dangerouslyRemove();
  }
}
