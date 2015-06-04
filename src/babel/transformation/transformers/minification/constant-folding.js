import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-prepass"
};

export function AssignmentExpression() {
  var left = this.get("left");
  if (!left.isIdentifier()) return;

  var binding = this.scope.getBinding(left.node.name);
  if (!binding) return;

  var right = this.get("right");
  var evaluated = right.evaluate();
  //if (evaluated.confident) binding.setValue(evaluated.value);
}

export var Scopable = {
  exit() {
    for (var name in this.scope.bindings) {
      var binding = this.scope.bindings[name];
      binding.clearValue();
    }
  }
};

export var Expression = {
  exit() {
    var res = this.evaluate();
    if (res.confident) return t.valueToNode(res.value);
  }
};
