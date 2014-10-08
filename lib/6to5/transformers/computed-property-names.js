var traverse = require("../traverse");
var util     = require("../util");
var _        = require("lodash");

exports.ObjectExpression = function (node) {
  var hasComputed = false;
  var hasThis     = false;

  var computed = [];

  node.properties = node.properties.filter(function (prop) {
    if (prop.computed) {
      hasComputed = true;
      computed.unshift(prop);
      if (!hasThis) hasThis = traverse.hasType(prop, "ThisExpression");
      return false;
    } else {
      return true;
    }
  });

  if (!hasComputed) return;

  var templateName = "function-return-obj";
  if (hasThis) templateName += "-this";

  var container = util.template(templateName, {
    OBJECT: node
  });

  var containerBody;
  if (templateName === "function-return-obj") {
    containerBody = container.callee.body.body;
  } else {
    containerBody = container.callee.object.body.body;
  }

  _.each(computed, function (prop) {
    containerBody.unshift(util.template("obj-key-set", {
      KEY: prop.key,
      VALUE: prop.value
    }, true));
  });

  return container;
};
