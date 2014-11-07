var esutils = require("esutils");
var util    = require("../util");
var t       = require("../types");
var _       = require("lodash");

exports.ObjectExpression = function (node, parent, file) {
  var hasComputed = false;

  var computed = [];

  var props = node.properties.filter(function (prop) {
    if (prop.computed) {
      // ignore literals that are valid identifiers
      var key = prop.key;
      if (t.isLiteral(key) && esutils.keyword.isIdentifierName(key.value)) {
        key.type = "Identifier";
        key.name = key.value;
        delete key.value;

        prop.computed = false;
        return true;
      }

      hasComputed = true;
      computed.unshift(prop);
      return false;
    } else {
      return true;
    }
  });

  if (!hasComputed) return;

  node.properties = props;

  var objId = util.getUid(parent, file);

  var container = util.template("function-return-obj", {
    KEY: objId,
    OBJECT: node
  });

  var containerCallee = container.callee;
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
