var t = require("../../types");

module.exports = require("../helpers/build-conditional-assignment-operator-transformer")({
  is: function (node) {
    var is = t.isAssignmentExpression(node) && node.operator === "?=";
    if (is) t.assertMemberExpression(node.left);
    return is;
  },

  build: function (node, file) {
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
