import * as messages from "../../../messages";
import build from "../../helpers/build-conditional-assignment-operator-transformer";
import * as t from "../../../types";

export var playground = true;

build(exports, {
  is(node, file) {
    if (t.isAssignmentExpression(node, { operator: "||=" })) {
      var left = node.left;
      if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
        throw file.errorWithNode(left, messages.get("expectedMemberExpressionOrIdentifier"));
      }
      return true;
    }
  },

  build(node) {
    console.error("The mallet operator is deprecated and will be removed in 5.0.0");
    return t.unaryExpression("!", node, true);
  }
});
