import * as t from "babel-types";

export var metadata = {
  group: "builtin-trailing"
};

/**
 * Turn member expression reserved word properties into literals.
 *
 * @example
 *
 * **In**
 *
 * ```javascript
 * foo.catch;
 * ```
 *
 * **Out**
 *
 * ```javascript
 * foo["catch"];
 * ```
 */

export var visitor = {

  /**
   * Look for non-computed properties with names that are not valid identifiers.
   * Turn them into computed properties with literal names.
   */

  MemberExpression: {
    exit(node) {
      var prop = node.property;
      if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
        // foo.default -> foo["default"]
        node.property = t.literal(prop.name);
        node.computed = true;
      }
    }
  }
};
