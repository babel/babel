import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function MemberExpression(node) {
  var prop = node.property;
  if (node.computed && t.isLiteral(prop) && t.isValidIdentifier(prop.value)) {
    // foo["bar"] => foo.bar
    node.property = t.identifier(prop.value);
    node.computed = false;
  }
}
