var _ = require("lodash");

exports.BlockStatement =
exports.Program = {
  exit: function (node) {
    var hasChange = false;
    for (var i in node.body) {
      var bodyNode = node.body[i];
      if (bodyNode && bodyNode._blockHoist) hasChange = true;
    }
    if (!hasChange) return;

    var nodePriorities = _.groupBy(node.body, function (bodyNode) {
      return bodyNode._blockHoist || 0;
    });

    node.body = _.flatten(_.values(nodePriorities).reverse());
  }
};
