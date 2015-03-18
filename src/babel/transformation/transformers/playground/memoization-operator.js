import build from "../../helpers/build-conditional-assignment-operator-transformer";
import * as t from "../../../types";

export var playground = true;

build(exports, {
  is(node) {
    var is = t.isAssignmentExpression(node, { operator: "?=" });
    if (is) t.assertMemberExpression(node.left);
    return is;
  },

  build(node, file) {
    console.error("The memoization operator is deprecated and will be removed in 5.0.0");
    return t.unaryExpression(
      "!",
      t.callExpression(
        t.memberExpression(file.addHelper("has-own"), t.identifier("call")),
        [node.object, node.property]
      ),
      true
    );
  }
});
