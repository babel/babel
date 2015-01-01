var bluebirdCoroutines = require("./optional-bluebird-coroutines");
var t                  = require("../../types");

exports.optional = true;

exports.manipulateOptions = bluebirdCoroutines.manipulateOptions;

exports.Function = function (node, parent, file) {
  if (!node.async || node.generator) return;

  bluebirdCoroutines._Function(node);

  return t.callExpression(file.addDeclaration("async-to-generator"), [node]);
};
