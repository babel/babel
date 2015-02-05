"use strict";

exports.MethodDefinition =
exports.Property = function (node, parent, scope, file) {
  if (node.kind === "set" && node.value.params.length !== 1) {
    throw file.errorWithNode(node.value, "Setters must have only one parameter");
  }
};
