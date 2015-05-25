import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-setup"
};

export var Expression = {
  exit() {
    var res = this.evaluate();
    if (res.confident) return t.valueToNode(res.value);
  }
};

export function Identifier() {
  // override Expression
}
