var util = require("../util");
var b    = require("acorn-ast-types").builders;

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  var templateName = "arguments-slice-assign";
  if (node.params.length) templateName += "-arg";

  util.ensureBlock(node);

  var template = util.template(templateName, {
    SLICE_KEY: file.addDeclaration("slice"),
    VARIABLE_NAME: rest,
    SLICE_ARG: b.literal(node.params.length)
  });

  template.declarations[0].init.arguments[0]._ignoreAliasFunctions = true;

  node.body.body.unshift(template);
};
