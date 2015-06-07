import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-prepass",
  experimental: true
};

export function AssignmentExpression() {
  var left = this.get("left");
  if (!left.isIdentifier()) return;

  var binding = this.scope.getBinding(left.node.name);
  if (!binding || binding.hasDeoptValue) return;

  var evaluated = this.get("right").evaluate();
  if (evaluated.confident) {
    binding.setValue(evaluated.value);
  } else {
    binding.deoptValue();
  }
}

export function IfStatement() {
  var evaluated = this.get("test").evaluate();
  if (!evaluated.confident) {
    // todo: deopt binding values for constant violations inside
    return this.skip();
  }

  if (evaluated.value) {
    this.skipKey("alternate");
  } else {
    this.skipKey("consequent");
  }
}

export var Scopable = {
  enter() {
    var funcScope = this.scope.getFunctionParent();

    for (var name in this.scope.bindings) {
      var binding = this.scope.bindings[name];
      var deopt = false;

      for (var path of (binding.constantViolations: Array)) {
        var funcViolationScope = path.scope.getFunctionParent();
        if (funcViolationScope !== funcScope) {
          deopt = true;
          break;
        }
      }

      if (deopt) binding.deoptValue();
    }
  },

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
