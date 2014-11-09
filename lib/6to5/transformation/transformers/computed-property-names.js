var util = require("../../util");
var t    = require("../../types");
var _    = require("lodash");

exports.ObjectExpression = function (node, parent, file) {
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

  var objId = util.getUid(parent, file);

  var container = util.template("function-return-obj", {
    KEY: objId,
    OBJECT: node
  });

  var containerCallee = container.callee.expression;
  var containerBody = containerCallee.body.body;

  containerCallee._aliasFunction = "arrows";

  _.each(computed, function (prop) {
    containerBody.unshift(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.memberExpression(objId, prop.key, true),
          prop.value
        )
      )
    );
  });

  return container;
};
