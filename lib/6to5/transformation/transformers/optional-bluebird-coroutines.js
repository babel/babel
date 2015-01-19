"use strict";

var remapAsyncToGenerator = require("../helpers/remap-async-to-generator");
var t                     = require("../../types");

exports.manipulateOptions = function (opts) {
  opts.experimental = true;
  opts.blacklist.push("generators");
};

exports.optional = true;


exports.Function = function (node, parent, scope, context, file) {
  if (!node.async || node.generator) return;

  return remapAsyncToGenerator(
    node,
    t.memberExpression(file.addImport("bluebird"), t.identifier("coroutine"))
  );
};
