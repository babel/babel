var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;
var _        = require("lodash");

exports.VariableDeclaration = function (node, parent, file) {
  if (node.kind !== "let") return;
  node.kind = "var";

  var ids = {};

  _.each(node.declarations, function (declar) {
    _.each(util.getIds(declar.id), function (id) {
      ids[id] = b.identifier(file.generateUid(id));
    });
  });

  var replaceId = function (node, parent) {
    // not an identifier so we have no use for this node
    if (node.type !== "Identifier") return;

    // not a let reference
    var id = ids[node.name];
    if (!id) return;

    // we're a property key
    if (parent.type === "Property" && parent.key === node) return;

    var isMemberExpression = parent.type === "MemberExpression";

    // we're in a member expression and we're the computed property so we're referenced
    var isComputedProperty = isMemberExpression && parent.property === node && parent.computed;

    // we're in a member expression and we're the object so we're referenced
    var isObject = isMemberExpression && parent.object === node;

    // we are referenced
    if (!isMemberExpression || isComputedProperty || isObject) return id;
  };

  var replace = function (node, parent) {
    if (_.contains(traverse.FUNCTION_TYPES, node.type)) {
      var letReferences = [];

      traverse(node, function (node, parent) {
        var id = replaceId(node, parent);
        if (id) letReferences.push(id);
        return id;
      });

      if (letReferences.length) {
        return b.callExpression(
          b.functionExpression(null, letReferences,
            b.blockStatement([
              b.returnStatement(node)
            ]
          )
        ), letReferences)
      } else {
        return false;
      }
    }

    return replaceId(node, parent);
  };

  traverse(parent, replace);
};
