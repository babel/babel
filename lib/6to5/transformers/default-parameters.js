var util = require("../util");
var _    = require("lodash");

exports.Function = function (node) {
  if (!node.defaults.length) return;
  util.ensureBlock(node);

  _.each(node.defaults, function (def, i) {
    if (!def) return;

    var param = node.params[i];

    node.body.body.unshift(util.template("if-undefined-set-to", {
      VARIABLE: param,
      DEFAULT: def
    }, true));
  });

  node.defaults = [];
};
