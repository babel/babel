var esutils = require("esutils");
var t       = require("../../types");

exports.MemberExpression = function (node) {
  var prop = node.property;
  if (t.isIdentifier(prop) && esutils.keyword.isKeywordES6(prop.name, true)) {
    node.property = t.literal(prop.name);
    node.computed = true;
  }
};
