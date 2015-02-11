"use strict";

var messages = require("../../../messages");

exports.check = function (node) {
  return node.kind === "set";
};

exports.MethodDefinition =
exports.Property = function (node, parent, scope, file) {
  if (node.kind === "set" && node.value.params.length !== 1) {
    throw file.errorWithNode(node.value, messages.get("settersInvalidParamLength"));
  }
};
