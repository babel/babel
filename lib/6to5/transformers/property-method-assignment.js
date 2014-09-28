var util = require("../util");
var _    = require("lodash");

exports.Property = function (node) {
  if (node.method) node.method = false;
};

exports.ObjectExpression = function (node) {
  //if (node.ignorePropertyMethods) return;
  //node.ignorePropertyMethods = true;

  var mutatorMap = {};

  node.properties = node.properties.filter(function (prop) {
    if (prop.kind === "get" || prop.kind === "set") {
      util.pushMutatorMap(mutatorMap, prop.key.name, prop.kind, prop.value);
      return false;
    } else {
      return true;
    }
  });

  if (_.isEmpty(mutatorMap)) return;

  return util.template("object-define-properties-closure", {
    OBJECT: node,
    CONTENT: util.buildDefineProperties(mutatorMap, {
      type: "Identifier",
      name: "obj"
    }).expression
  });
};
