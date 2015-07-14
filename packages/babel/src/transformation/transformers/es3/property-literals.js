import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

/**
 * Turn reserved word properties into literals.
 *
 * **In**
 *
 * ```javascript
 * var foo = {
 *   catch: function () {}
 * };
 * ```
 *
 * **Out**
 *
 * ```javascript
 * var foo = {
 *   "catch": function () {}
 * };
 * ```
 */

export var visitor = {

  /**
   * Look for non-computed keys with names that are not valid identifiers.
   * Turn them into literals.
   */

  Property: {
    exit(node) {
      var key = node.key;
      if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
        // default: "bar" -> "default": "bar"
        node.key = t.literal(key.name);
      }
    }
  }
};
