var bluebirdCoroutines = require("./optional-bluebird-coroutines");

exports.optional = true;

exports.manipulateOptions = bluebirdCoroutines.manipulateOptions;

exports.Function = function (node, parent, file) {
  if (!node.async || node.generator) return;

  return bluebirdCoroutines._Function(node, file.addHelper("async-to-generator"));
};
