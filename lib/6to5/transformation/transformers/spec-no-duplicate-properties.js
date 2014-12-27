var t = require("../../types");

exports.ObjectExpression = function (node, parent, file) {
  var keys = [];

  for (var i in node.properties) {
    var prop = node.properties[i];
    if (prop.computed || prop.kind !== "init") continue;

    var key = prop.key;
    if (t.isIdentifier(key)) {
      key = key.name;
    } else if (t.isLiteral(key)) {
      key = key.value;
    } else {
      continue;
    }

    if (keys.indexOf(key) >= 0) {
      throw file.errorWithNode(prop.key, "Duplicate property key");
    } else {
      keys.push(key);
    }
  }
};
