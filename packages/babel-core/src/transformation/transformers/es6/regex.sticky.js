import * as regex from "../../helpers/regex";
import * as t from "babel-types";

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  RegexLiteral(node) {
    if (!regex.is(node, "y")) return;
    return t.newExpression(t.identifier("RegExp"), [
      t.stringLiteral(node.pattern),
      t.stringLiteral(node.flags)
    ]);
  }
};
