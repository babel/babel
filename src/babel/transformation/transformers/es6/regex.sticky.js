import * as regex from "../../helpers/regex";
import * as t from "../../../types";

export function check(node) {
  return regex.is(node, "y");
}

export function Literal(node) {
  if (!regex.is(node, "y")) return;
  return t.newExpression(t.identifier("RegExp"), [
    t.literal(node.regex.pattern),
    t.literal(node.regex.flags)
  ]);
}
