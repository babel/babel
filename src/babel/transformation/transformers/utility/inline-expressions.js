import t from "../../../types";

export var optional = true;

export function Expression(node, parent, scope) {
  var res = t.evaluate(node, scope);
  if (res.confident) return t.valueToNode(res.value);
}

export function Identifier() {
  // override Expression
}
