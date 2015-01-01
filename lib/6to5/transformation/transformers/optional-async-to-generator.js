var bluebirdCoroutines = require("./optional-bluebird-coroutines");
var t                  = require("../../types");

exports.optional = true;

exports.manipulateOptions = bluebirdCoroutines.manipulateOptions;

exports.Function = function (node, parent, file) {
  if (!node.async || node.generator) return;

  return bluebirdCoroutines._Function(node, file.addDeclaration("async-to-generator"));
};
