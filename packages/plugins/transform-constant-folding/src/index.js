export default function ({ types: t }) {
  return {
    visitor: {
      AssignmentExpression() {
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
      },

      IfStatement(path) {
        var evaluated = path.get("test").evaluate();
        if (!evaluated.confident) {
          // todo: deopt binding values for constant violations inside
          return path.skip();
        }

        if (evaluated.value) {
          path.skipKey("alternate");
        } else {
          path.skipKey("consequent");
        }
      },

      Scopable: {
        enter(path) {
          var funcScope = path.scope.getFunctionParent();

          for (var name in path.scope.bindings) {
            var binding = path.scope.bindings[name];
            var deopt = false;

            for (let path of (binding.constantViolations: Array)) {
              var funcViolationScope = path.scope.getFunctionParent();
              if (funcViolationScope !== funcScope) {
                deopt = true;
                break;
              }
            }

            if (deopt) binding.deoptValue();
          }
        },

        exit(path) {
          for (var name in path.scope.bindings) {
            var binding = path.scope.bindings[name];
            binding.clearValue();
          }
        }
      },

      Expression: {
        exit(path) {
          var res = path.evaluate();
          if (res.confident) return t.valueToNode(res.value);
        }
      }
    }
  };
}
