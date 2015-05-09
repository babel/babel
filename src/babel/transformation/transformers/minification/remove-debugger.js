import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-setup"
};

export function ExpressionStatement(node) {
  if (this.get("expression").isIdentifier({ name: "debugger" })) {
    this.remove();
  }
}
