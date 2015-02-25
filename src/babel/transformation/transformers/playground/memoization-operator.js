"use strict";

var build = require("../../helpers/build-conditional-assignment-operator-transformer");
var t     = require("../../../types");

exports.playground = true;

build(exports, {
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
