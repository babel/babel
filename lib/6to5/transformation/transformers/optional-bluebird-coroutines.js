var traverse = require("../../traverse");
var t        = require("../../types");

exports.manipulateOptions = function (opts) {
  opts.experimental = true;
  opts.blacklist.push("generators");
};

exports.optional = true;

exports._Function = function (node, callId) {
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

  var call = t.callExpression(callId, [node]);

  if (t.isFunctionDeclaration(node)) {
    var declar = t.variableDeclaration("var", [
      t.variableDeclarator(node.id, call)
    ]);
    declar._blockHoist = true;
    return declar;
  } else {
    return call;
  }
};

exports.Function = function (node, parent, file) {
  if (!node.async || node.generator) return;

  var id = t.identifier("Bluebird");
  file.addImport(id, "bluebird");

  return exports._Function(node, t.memberExpression(id, t.identifier("coroutine")));
};
