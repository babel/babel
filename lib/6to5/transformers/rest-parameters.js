var util = require("../util");
var t    = require("../types");

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  var templateName = "arguments-slice-assign";
  if (node.params.length) templateName += "-arg";

  t.ensureBlock(node);

  var template = util.template(templateName, {
    SLICE_KEY: file.addDeclaration("slice"),
    VARIABLE_NAME: rest,
    SLICE_ARG: t.literal(node.params.length)
  });

  template.declarations[0].init.arguments[0]._ignoreAliasFunctions = true;

  node.body.body.unshift(template);
};
