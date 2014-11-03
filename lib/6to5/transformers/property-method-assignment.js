var util = require("../util");
var _    = require("lodash");

exports.Property = function (node) {
  if (node.method) node.method = false;
};

exports.ObjectExpression = function (node, parent, file) {
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

  var objId = util.getUid(parent, file);

  return util.template("object-define-properties-closure", {
    KEY: objId,
    OBJECT: node,
    CONTENT: util.template("object-define-properties", {
      OBJECT: objId,
      PROPS:  util.buildDefineProperties(mutatorMap)
    })
  });
};
