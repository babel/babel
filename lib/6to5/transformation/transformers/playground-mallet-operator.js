var t = require("../../types");

module.exports = require("../helpers/build-conditional-assignment-operator-transformer")({
  is: function (node) {
    var is = t.isAssignmentExpression(node) && node.operator === "||=";
    if (is) {
      var left = node.left;
      if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
        throw new Error("Expected type MemeberExpression or Identifier");
      }
      return true;
    }
  },

  build: function (node) {
    return t.unaryExpression("!", node, true);
  }
});
