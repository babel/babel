var traverse = require("../../traverse");
var t        = require("../../types");

exports.manipulateOptions = function (opts) {
  opts.experimental = true;
  opts.blacklist.push("generators");
};

exports.optional = true;

exports.Function = function (node, parent, file) {
  if (!node.async || node.generator) return;

  node.async = false;
  node.generator = true;

  traverse(node, {
    enter: function (node) {
      if (t.isFunction(node)) this.stop();

      if (t.isAwaitExpression(node)) {
        node.type = "YieldExpression";
      }
    }
  });

  var id = t.identifier("Bluebird");
  file.addImport(id, "bluebird");
  return t.callExpression(t.memberExpression(id, t.identifier("coroutine")), [node]);
};
