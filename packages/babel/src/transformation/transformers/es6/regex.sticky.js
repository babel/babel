import * as regex from "../../helpers/regex";
import * as t from "../../../types";

export var visitor = {
  Literal(node) {
    if (!regex.is(node, "y")) return;
    return t.newExpression(t.identifier("RegExp"), [
      t.literal(node.regex.pattern),
      t.literal(node.regex.flags)
    ]);
  }
};
