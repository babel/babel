var t = require("../../types");

exports.MemberExpression = function (node, parent) {
  var prop = node.property;
  if (node.computed && t.isLiteral(prop) && t.isValidIdentifier(prop.value)) {
    // computed literal that is a valid identifier
    node.property = t.identifier(prop.value);
    node.computed = false;
  }
};
