import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

export var MemberExpression = {
  exit(node) {
    var prop = node.property;
    if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
      // foo.default -> foo["default"]
      node.property = t.literal(prop.name);
      node.computed = true;
    }
  }
};
