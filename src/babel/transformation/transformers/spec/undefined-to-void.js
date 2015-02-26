import t from "../../../types";

export var optional = true;

export function Identifier(node, parent) {
  if (node.name === "undefined" && t.isReferenced(node, parent)) {
    return t.unaryExpression("void", t.literal(0), true);
  }
}
