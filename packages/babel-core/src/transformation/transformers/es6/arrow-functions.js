/**
 * Turn arrow functions into normal functions.
 *
 * @example
 *
 * **In**
 *
 * ```javascript
 * arr.map(x => x * x);
 * ```
 *
 * **Out**
 *
 * ```javascript
 * arr.map(function (x) {
 *   return x * x;
 * });
 */

export var visitor = {
  /**
   * Look for arrow functions and mark them as "shadow functions".
   * @see /transformation/transformers/internal/shadow-functions.js
   */

  ArrowFunctionExpression(node) {
    this.ensureBlock();
    node.expression = false;
    node.type = "FunctionExpression";
    node.shadow = node.shadow || true;
  }
};
