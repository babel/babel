"use strict";

var build = require("../helpers/build-conditional-assignment-operator-transformer");
var t      = require("../../types");

build(exports, {
  is: function (node, file) {
    var is = t.isAssignmentExpression(node) && node.operator === "||=";
    if (is) {
      var left = node.left;
      if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
        throw file.errorWithNode(left, "Expected type MemeberExpression or Identifier");
      }
      return true;
    }
  },

  build: function (node) {
    return t.unaryExpression("!", node, true);
  }
});
