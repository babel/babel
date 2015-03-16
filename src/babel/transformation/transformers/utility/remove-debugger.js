import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function ExpressionStatement(node) {
  if (this.get("expression").isIdentifier({ name: "debugger" })) {
    this.remove();
  }
}
