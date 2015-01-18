"use strict";

var remapAsyncToGenerator = require("../helpers/remap-async-to-generator");
var bluebirdCoroutines    = require("./optional-bluebird-coroutines");

exports.optional = true;

exports.manipulateOptions = bluebirdCoroutines.manipulateOptions;

exports.Function = function (node, parent, scope, context, file) {
  if (!node.async || node.generator) return;

  return remapAsyncToGenerator(node, file.addHelper("async-to-generator"));
};
