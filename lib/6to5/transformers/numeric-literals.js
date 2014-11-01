var _ = require("lodash");

exports.Literal = function (node) {
  // TODO: remove this when the new code generator is released
  if (_.isNumber(node.value)) delete node.raw;
};
