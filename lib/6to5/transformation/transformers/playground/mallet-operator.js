"use strict";

var messages = require("../../../messages");
var build    = require("../../helpers/build-conditional-assignment-operator-transformer");
var t        = require("../../../types");

exports.playground = true;

build(exports, {
  is: function (node, file) {
    var is = t.isAssignmentExpression(node) && node.operator === "||=";
    if (is) {
      var left = node.left;
      if (!t.isMemberExpression(left) && !t.isIdentifier(left)) {
        throw file.errorWithNode(left, messages.get("expectedMemberExpressionOrIdentifier"));
      }
      return true;
    }
  },

  build: function (node) {
    return t.unaryExpression("!", node, true);
  }
});
