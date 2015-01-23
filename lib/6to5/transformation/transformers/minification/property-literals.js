"use strict";

var t = require("../../../types");

exports.Property = function (node) {
  var key = node.key;
  if (t.isLiteral(key) && t.isValidIdentifier(key.value)) {
    // "foo": "bar" -> foo: "bar"
    node.key = t.identifier(key.value);
    node.computed = false;
  } else if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
    // default: "bar" -> "default": "bar"
    node.key = t.literal(key.name);
  }
};
