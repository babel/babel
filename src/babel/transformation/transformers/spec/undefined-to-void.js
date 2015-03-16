import * as t from "../../../types";

export var metadata = {
  optional: true,
  react: true
};

export function Identifier(node, parent) {
  if (node.name === "undefined" && this.isReferenced()) {
    return t.unaryExpression("void", t.literal(0), true);
  }
}
