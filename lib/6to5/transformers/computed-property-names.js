var util = require("../util");
var _    = require("lodash");

exports.ObjectExpression = function (node) {
  var hasComputed = false;
  var computed = [];

  node.properties = node.properties.filter(function (prop) {
    if (prop.computed) {
      hasComputed = true;
      computed.unshift(prop);
      return false;
    } else {
      return true;
    }
  });

  if (!hasComputed) return;

  var container = util.template("function-return-obj", {
    OBJECT: node
  });

  _.each(computed, function (prop) {
    container.callee.body.body.unshift(util.template("obj-key-set", {
      KEY: prop.key,
      VALUE: prop.value
    }, true));
  });

  return container;
};
