var esutils = require("esutils");
var t       = require("../types");

exports.Property = function (node) {
  // ignore key literals that are valid identifiers
  var key = node.key;
  if (t.isLiteral(key) && esutils.keyword.isIdentifierName(key.value)) {
    key.type = "Identifier";
    key.name = key.value;
    delete key.value;

    node.computed = false;
  }
};
