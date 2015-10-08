export default function ({ types: t }) {
  function isString(node) {
    if (t.isBinaryExpression(node)) {
      return node.operator == "+" && (isString(node.left) || isString(node.right));
    } else if (t.isLiteral(node)) {
      return typeof node.value === "string";
    } else {
      return false;
    }
  }

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
      },

      BinaryExpression: {
        exit(node, parent, scope, file) {
          let { left, right, operator } = node;

          // "str1" + "str2" + a -> "str1str2" + a
          if (t.isLiteral(left) &&
              t.isBinaryExpression(right) &&
              right.operator === "+" &&
              t.isLiteral(right.left) &&
              isString(right)) {
            return t.binaryExpression("+",
              t.literal("" + left.value + right.left.value),
              right.right);
          }

          // a + "str1" + "str2" -> a + "str1str2"
          if (t.isLiteral(right) &&
              t.isBinaryExpression(left) &&
              left.operator === "+" &&
              t.isLiteral(left.right) &&
              isString(left)) {
            return t.binaryExpression("+",
              left.left,
              t.literal("" + left.right.value + right.value));
          }

          // a + "str1" + ("str2" + b) -> a + "str1str2" + b
          if (t.isBinaryExpression(left) &&
              left.operator === "+" &&
              isString(left) &&
              t.isBinaryExpression(right) &&
              right.operator === "+" &&
              isString(right)
              ) {
            return t.binaryExpression("+",
              t.binaryExpression("+",
                left.left,
                t.literal(" " + left.right.value + right.left.value)),
              right.right);
          }
        }
      }
    }
  };
}
