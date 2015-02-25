var messages = require("../../../messages");
var build    = require("../../helpers/build-conditional-assignment-operator-transformer");
var t        = require("../../../types");

exports.playground = true;

build(exports, {
  is(node, file) {
    var is = t.isAssignmentExpression(node) && node.operator === "||=";
    if (is) {
      var left = node.left;
      if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
        throw file.errorWithNode(left, messages.get("expectedMemberExpressionOrIdentifier"));
      }
      return true;
    }
  },

  build(node) {
    return t.unaryExpression("!", node, true);
  }
});
