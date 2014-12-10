var t = require("../../types");
var _ = require("lodash");

exports.ObjectExpression = function (node, parent, file) {
  var keys = [];

  _.each(node.properties, function (prop) {
    if (prop.computed || prop.kind !== "init") return;

    var key = prop.key;
    if (t.isIdentifier(key)) {
      key = key.name;
    } else if (t.isLiteral(key)) {
      key = key.value;
    } else {
      return;
    }

    if (_.contains(keys, key)) {
      throw file.errorWithNode(prop.key, "Duplicate property key");
    } else {
      keys.push(key);
    }
  });
};
