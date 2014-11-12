var util = require("../../util");
var t    = require("../../types");
var _    = require("lodash");

exports.Function = function (node) {
  if (!node.defaults || !node.defaults.length) return;
  t.ensureBlock(node);

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
