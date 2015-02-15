"use strict";

var t = require("../../../types");

exports.optional = true;

exports.UnaryExpression = function (node, parent, scope, file) {
  this.skip();

  if (node.operator === "typeof") {
    var call = t.callExpression(file.addHelper("typeof"), [node.argument]);
    if (t.isIdentifier(node.argument)) {
      var undefLiteral = t.literal("undefined");
      return t.conditionalExpression(
        t.binaryExpression("===", t.unaryExpression("typeof", node.argument), undefLiteral),
        undefLiteral,
        call
      );
    } else {
      return call;
    }
  }
};
