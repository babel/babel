var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

exports.Property = function (node, parent, file, scope) {
  if (!node.method) return;

  node.method = false;

  var key = t.toComputedKey(node, node.key);
  if (!t.isLiteral(key)) return; // we can't set a function id with this

  var id = t.toIdentifier(key.value);
  key = t.identifier(id);

  var selfReference = false;
  var outerDeclar = scope.get(id, true);

  traverse(node, {
    enter: function (node, parent, scope) {
      // check if this node is an identifier that matches the same as our function id
      if (!t.isIdentifier(node, { name: id })) return;

      // check if this node is the one referenced
      if (!t.isReferenced(node, parent)) return;

      // check that we don't have a local variable declared as that removes the need
      // for the wrapper
      var localDeclar = scope.get(id, true);
      if (localDeclar !== outerDeclar) return;

      selfReference = true;
      this.stop();
    }
  }, scope);

  if (selfReference) {
    node.value = util.template("property-method-assignment-wrapper", {
      FUNCTION: node.value,
      FUNCTION_ID: key,
      FUNCTION_KEY: file.generateUidIdentifier(id, scope),
      WRAPPER_KEY: file.generateUidIdentifier(id + "Wrapper", scope)
    });
  } else {
    node.value.id = key;
  }
};

exports.ObjectExpression = function (node, parent, file, scope) {
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
    var objId = scope.generateUidBasedOnNode(parent, file);

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
