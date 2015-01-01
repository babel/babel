var util = require("../../util");
var t    = require("../../types");

exports.Property = function (node) {
  if (node.method) node.method = false;
};

exports.ObjectExpression = function (node, parent, file) {
  var mutatorMap = {};
  var hasAny = false;

  node.properties = node.properties.filter(function (prop) {
    if (prop.kind === "get" || prop.kind === "set") {
      hasAny = true;
      util.pushMutatorMap(mutatorMap, prop.key, prop.kind, prop.value);
      return false;
    } else {
      return true;
    }
  });

  if (!hasAny) return;

  if (node.properties.length) {
    var objId = t.getUid(parent, file);

    return util.template("object-define-properties-closure", {
      KEY: objId,
      OBJECT: node,
      CONTENT: util.template("object-define-properties", {
        OBJECT: objId,
        PROPS:  util.buildDefineProperties(mutatorMap)
      })
    });
  } else {
    return util.template("object-define-properties", {
      OBJECT: node,
      PROPS:  util.buildDefineProperties(mutatorMap)
    });
  }
};
