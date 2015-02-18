"use strict";

var t           = require("../../../types");
var util        = require("../../../util");

var propertyFunctionVisitor = {
  enter: function (node, parent, scope, state, file) {
    if (t.isReferencedIdentifier(node, parent, { name: state.name }) && scope.getBindingIdentifier(node.name) === state.binding) {
      return state.getOuter();
    }
  }
};

//exports.ArrowFunctionExpression =
exports.FunctionExpression = function (node, parent, scope, file) {
  // has an `id` so we don't need to infer one
  if (node.id) return;

  var id;
  if (t.isProperty(parent) && parent.kind === "init" && !parent.computed) {
    // { foo: function () {} };
    id = parent.key;
  } else if (t.isVariableDeclarator(parent)) {
    // var foo = function () {};
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
      FUNCTION:     node,
      ID:           id
    });
  }
};
