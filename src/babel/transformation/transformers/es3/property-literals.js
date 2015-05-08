import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

export var Property = {
  exit(node) {
    var key = node.key;
    if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
      // default: "bar" -> "default": "bar"
      node.key = t.literal(key.name);
    }
  }
};
