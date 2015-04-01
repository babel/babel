import * as t from "../../../types";
import * as util from "../../../util";

export var metadata = {
  optional: true
};

export function BinaryExpression(node) {
  if (node.operator === "in") {
    return util.template("ludicrous-in", {
      LEFT: node.left,
      RIGHT: node.right
    });
  }
}

export function Property(node) {
  var key = node.key;
  if (t.isLiteral(key) && typeof key.value === "number") {
    key.value = "" + key.value;
  }
}

export function Literal(node) {
  if (node.regex) {
    node.regex.pattern = "foobar";
    node.regex.flags = "";
  }
}
