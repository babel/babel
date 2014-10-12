var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

exports.ObjectExpression = function (node, parent, file) {
  var hasComputed = false;
  var hasThis     = false;

  var computed = [];

  node.properties = node.properties.filter(function (prop) {
    if (prop.computed) {
      hasComputed = true;
      computed.unshift(prop);
      hasThis = hasThis || traverse.hasType(prop, "ThisExpression");
      return false;
    } else {
      return true;
    }
  });

  if (!hasComputed) return;

  var templateName = "function-return-obj";
  if (hasThis) templateName += "-this";

  var objId = b.identifier(file.generateUid("ref"));

  var container = util.template(templateName, {
    KEY: objId,
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
      OBJECT_KEY: objId,
      KEY: prop.key,
      VALUE: prop.value
    }, true));
  });

  return container;
};
