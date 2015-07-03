import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
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
