"use strict";

var t = require("../../types");

exports.Property = function (node) {
  var key = node.key;
  if (t.isLiteral(key) && t.isValidIdentifier(key.value)) {
    // property key is a literal but a valid identifier
    node.key = t.identifier(key.value);
    node.computed = false;
  } else if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
    // property key is a keyword
    node.key = t.literal(key.name);
  }
};
