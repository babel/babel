import * as messages from "../../../messages";

/**
 * Turn constants into variables.
 * Ensure there are no constant violations in any scope.
 *
 * @example
 *
 * **In**
 *
 * ```javascript
 * const MULTIPLIER = 5;
 * ```
 *
 * **Out**
 *
 * ```javascript
 * var MULTIPLIER = 5;
 * ```
 */

export var visitor = {

  /**
   * Look for any constants (or modules) in scope.
   * If they have any `constantViolations` throw an error.
   */

  Scope(node, parent, scope) {
    for (var name in scope.bindings) {
      var binding = scope.bindings[name];

      // not a constant
      if (binding.kind !== "const" && binding.kind !== "module") continue;

      for (var violation of (binding.constantViolations: Array)) {
        throw violation.errorWithNode(messages.get("readOnly", name));
      }
    }
  },

  /**
   * Look for constants.
   * Turn them into `let` variables.
   */

  VariableDeclaration(node) {
    if (node.kind === "const") node.kind = "let";
  }
};
