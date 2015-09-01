import * as regex from "../../helpers/regex";
import * as t from "babel-types";

export var visitor = {
  RegexLiteral(node) {
    if (!regex.is(node, "y")) return;
    return t.newExpression(t.identifier("RegExp"), [
      t.stringLiteral(node.pattern),
      t.stringLiteral(node.flags)
    ]);
  }
};
