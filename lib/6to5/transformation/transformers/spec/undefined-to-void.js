"use strict";

var t = require("../../../types");

exports.optional = true;

exports.Identifier = function (node, parent) {
  if (node.name === "undefined" && t.isReferenced(node, parent)) {
    return t.unaryExpression("void", t.literal(0), true);
  }
};
