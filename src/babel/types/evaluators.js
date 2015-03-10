import * as t from "./index";

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

export function evaluateTruthy(node: Object, scope: Scope): boolean {
  var res = evaluate(node, scope);
  if (res.confident) return !!res.value;
}

/**
 * Walk the input `node` and statically evaluate it.
 *
 * Returns an pbject in the form `{ confident, value }`. `confident` indicates
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

export function evaluate(node: Object, scope: Scope): { confident: boolean; value: any } {
  var confident = true;

  var value = evaluate(node);
  if (!confident) value = undefined;
  return {
    confident: confident,
    value:     value
  };

  function evaluate(node) {
    if (!confident) return;

    if (t.isSequenceExpression(node)) {
      return evaluate(node.expressions[node.expressions.length - 1]);
    }

    if (t.isLiteral(node)) {
      if (node.regex && node.value === null) {
        // we have a regex and we can't represent it natively
      } else {
        return node.value;
      }
    }

    if (t.isConditionalExpression(node)) {
      if (evaluate(node.test)) {
        return evaluate(node.consequent);
      } else {
        return evaluate(node.alternate);
      }
    }

    if (t.isIdentifier(node)) {
      if (node.name === "undefined") {
        return undefined;
      } else {
        return evaluate(scope.getImmutableBindingValue(node.name));
      }
    }

    if (t.isUnaryExpression(node, { prefix: true })) {
      var arg = evaluate(node.argument);
      switch (node.operator) {
        case "void": return undefined;
        case "!": return !arg;
        case "+": return +arg;
        case "-": return -arg;
      }
    }

    if (t.isArrayExpression(node) || t.isObjectExpression(node)) {
      // we could evaluate these but it's probably impractical and not very useful
    }

    if (t.isLogicalExpression(node)) {
      let left = evaluate(node.left);
      let right = evaluate(node.right);

      switch (node.operator) {
        case "||": return left || right;
        case "&&": return left && right;
      }
    }

    if (t.isBinaryExpression(node)) {
      let left = evaluate(node.left);
      let right = evaluate(node.right);

      switch (node.operator) {
        case "-": return left - right;
        case "+": return left + right;
        case "/": return left / right;
        case "*": return left * right;
        case "%": return left % right;
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

    confident = false;
  }
}
