var util = require("../util");
var b    = require("ast-types").builders;

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  var templateName = "arguments-slice-assign";
  if (node.params.length) templateName += "-arg";

  util.ensureBlock(node);
  node.body.body.unshift(util.template(templateName, {
    SLICE_KEY: file.addDeclaration("slice"),
    VARIABLE_NAME: rest,
    SLICE_ARG: b.literal(node.params.length)
  }));
};
