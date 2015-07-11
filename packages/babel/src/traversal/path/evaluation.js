/* eslint eqeqeq: 0 */

const VALID_CALLEES = ["String", "Number", "Math"];

/**
 * Walk the input `node` and statically evaluate if it's truthy.
 *
 * Returning `true` when we're sure that the expression will evaluate to a
 * truthy value, `false` if we're sure that it will evaluate to a falsy
 * value and `undefined` if we aren't sure. Because of this please do not
 * rely on coercion when using this method and check with === if it's false.
 *
 * For example do:
 *
 *   if (t.evaluateTruthy(node) === false) falsyLogic();
 *
 * **AND NOT**
 *
 *   if (!t.evaluateTruthy(node)) falsyLogic();
 *
 */

export function evaluateTruthy(): boolean {
  var res = this.evaluate();
  if (res.confident) return !!res.value;
}

/**
 * Walk the input `node` and statically evaluate it.
 *
 * Returns an object in the form `{ confident, value }`. `confident` indicates
 * whether or not we had to drop out of evaluating the expression because of
 * hitting an unknown node that we couldn't confidently find the value of.
 *
 * Example:
 *
 *   t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
 *   t.evaluate(parse("!true")) // { confident: true, value: false }
 *   t.evaluate(parse("foo + foo")) // { confident: false, value: undefined }
 *
 */

export function evaluate(): { confident: boolean; value: any } {
  var confident = true;

  var value = evaluate(this);
  if (!confident) value = undefined;
  return {
    confident: confident,
    value:     value
  };

  function evaluate(path) {
    if (!confident) return;

    var node = path.node;

    if (path.isSequenceExpression()) {
      var exprs = path.get("expressions");
      return evaluate(exprs[exprs.length - 1]);
    }

    if (path.isLiteral()) {
      if (node.regex) {
        // we have a regex and we can't represent it natively
      } else {
        return node.value;
      }
    }

    if (path.isConditionalExpression()) {
      if (evaluate(path.get("test"))) {
        return evaluate(path.get("consequent"));
      } else {
        return evaluate(path.get("alternate"));
      }
    }

    if (path.isTypeCastExpression()) {
      return evaluate(path.get("expression"));
    }

    if (path.isIdentifier() && !path.scope.hasBinding(node.name, true)) {
      if (node.name === "undefined") {
        return undefined;
      } else if (node.name === "Infinity") {
        return Infinity;
      } else if (node.name === "NaN") {
        return NaN;
      }
    }

    // "foo".length
    if (path.isMemberExpression() && !path.parentPath.isCallExpression({ callee: node })) {
      let property = path.get("property");
      let object = path.get("object");

      if (object.isLiteral() && property.isIdentifier()) {
        let value = object.node.value;
        let type = typeof value;
        if (type === "number" || type === "string") {
          return value[property.node.name];
        }
      }
    }

    if (path.isReferencedIdentifier()) {
      var binding = path.scope.getBinding(node.name);
      if (binding && binding.hasValue) {
        return binding.value;
      } else {
        var resolved = path.resolve();
        if (resolved === path) {
          return confident = false;
        } else {
          return evaluate(resolved);
        }
      }
    }

    if (path.isUnaryExpression({ prefix: true })) {
      var arg = evaluate(path.get("argument"));
      switch (node.operator) {
        case "void": return undefined;
        case "!": return !arg;
        case "+": return +arg;
        case "-": return -arg;
        case "~": return ~arg;
      }
    }

    if (path.isArrayExpression() || path.isObjectExpression()) {
      // we could evaluate these but it's probably impractical and not very useful
    }

    if (path.isLogicalExpression()) {
      let left = evaluate(path.get("left"));
      let right = evaluate(path.get("right"));

      switch (node.operator) {
        case "||": return left || right;
        case "&&": return left && right;
      }
    }

    if (path.isBinaryExpression()) {
      let left = evaluate(path.get("left"));
      let right = evaluate(path.get("right"));

      switch (node.operator) {
        case "-": return left - right;
        case "+": return left + right;
        case "/": return left / right;
        case "*": return left * right;
        case "%": return left % right;
        case "**": return left ** right;
        case "<": return left < right;
        case ">": return left > right;
        case "<=": return left <= right;
        case ">=": return left >= right;
        case "==": return left == right;
        case "!=": return left != right;
        case "===": return left === right;
        case "!==": return left !== right;
      }
    }

    if (path.isCallExpression()) {
      var callee = path.get("callee");
      var context;
      var func;

      // Number(1);
      if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name, true) && VALID_CALLEES.indexOf(callee.node.name) >= 0) {
        func = global[node.callee.name];
      }

      if (callee.isMemberExpression()) {
        let object = callee.get("object");
        var property = callee.get("property");

        // Math.min(1, 2)
        if (object.isIdentifier() && property.isIdentifier() && VALID_CALLEES.indexOf(object.node.name) >= 0) {
          context = global[object.node.name];
          func = context[property.node.name];
        }

        // "abc".charCodeAt(4)
        if (object.isLiteral() && property.isIdentifier()) {
          let type = typeof object.node.value;
          if (type === "string" || type === "number") {
            context = object.node.value;
            func = context[property.node.name];
          }
        }
      }

      if (func) {
        var args = path.get("arguments").map(evaluate);
        if (!confident) return;

        return func.apply(context, args);
      }
    }

    confident = false;
  }
}
