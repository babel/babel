exports.BlockStatement =
exports.Program = {
  exit: function (node) {
    var unshift = [];

    node.body = node.body.filter(function (bodyNode) {
      if (bodyNode._blockHoist) {
        unshift.push(bodyNode);
        return false;
      } else {
        return true;
      }
    });

    node.body = unshift.concat(node.body);
  }
};
