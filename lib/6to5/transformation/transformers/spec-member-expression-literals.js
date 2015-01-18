"use strict";

var t = require("../../types");

exports.MemberExpression = function (node) {
  var prop = node.property;
  if (node.computed && t.isLiteral(prop) && t.isValidIdentifier(prop.value)) {
    // computed literal that is a valid identifier
    node.property = t.identifier(prop.value);
    node.computed = false;
  } else if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
    node.property = t.literal(prop.name);
    node.computed = true;
  }
};
