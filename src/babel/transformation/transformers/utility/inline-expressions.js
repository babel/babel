import t from "../../../types";

export var optional = true;

export function Expression(node) {
  var res = t.evaluate(node);
  if (res.confident) return t.valueToNode(res.value);
}
