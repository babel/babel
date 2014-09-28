var util = require("../util");
var _    = require("lodash");

exports.FunctionExpression = function (node) {
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
