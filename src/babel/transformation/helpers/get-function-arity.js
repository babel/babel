var t = require("../../types");

module.exports = function (node) {
  var lastNonDefault = 0;
  for (var i = 0; i < node.params.length; i++) {
    if (!t.isAssignmentPattern(node.params[i])) lastNonDefault = i + 1;
  }
  return lastNonDefault;
};
