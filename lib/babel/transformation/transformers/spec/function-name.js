"use strict";

var util = require("../../../util");
var t    = require("../../../types");

var propertyFunctionVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isReferencedIdentifier(node, parent, { name: state.name }) && scope.getBindingIdentifier(node.name) === state.binding) {
      return state.getOuter();
    }
  }
};

exports.FunctionExpression = function (node, parent, scope, file) {
  if (node.id) return;
  var id;
  if (t.isProperty(parent)) {
    id = parent.key;
  } else if (t.isVariableDeclarator(parent)) {
    id = parent.id;
  } else {
    return;
  }
  var binding = scope.getBindingIdentifier(id.name);
  var outerId, selfGlobalId;
  scope.traverse(node, propertyFunctionVisitor, {
    name: id.name,
    binding: binding,

    getOuter: function () {
      if (!binding) {
        return t.memberExpression(
          selfGlobalId || (selfGlobalId = file.addHelper("self-global")),
          id
        );
      }
      return t.callExpression(
        outerId || (outerId = scope.generateUidIdentifier("getOuter")),
        []
      );
    }
  });
  node.id = id;
  if (outerId) {
    return util.template("named-func", {
      GET_OUTER_ID: outerId,
      ID:           id,
      FUNCTION:     node
    });
  }
};

exports.optional = true;
