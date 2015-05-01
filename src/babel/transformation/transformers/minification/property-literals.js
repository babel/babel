import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function Property(node) {
  var key = node.key;
  if (t.isLiteral(key) && t.isValidIdentifier(key.value)) {
    // "foo": "bar" -> foo: "bar"
    node.key = t.identifier(key.value);
    node.computed = false;
  }
}
