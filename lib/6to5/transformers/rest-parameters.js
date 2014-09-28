var util = require("../util");

exports.FunctionExpression = function (node) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  var templateName = "arguments-slice-assign";
  if (node.params.length) templateName += "-arg";

  node.body.body.unshift(util.template(templateName, {
    VARIABLE_NAME: rest,
    SLICE_ARG: {
      type: "Literal",
      value: node.params.length
    }
  }));
};
