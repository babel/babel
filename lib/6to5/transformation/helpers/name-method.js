"use strict";

var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

var traverser = {
  enter: function (node, parent, scope, context, state) {
    // check if this node is an identifier that matches the same as our function id
    if (!t.isIdentifier(node, { name: state.id })) return;

    // check if this node is the one referenced
    if (!t.isReferenced(node, parent)) return;

    // check that we don't have a local variable declared as that removes the need
    // for the wrapper
    var localDeclar = scope.get(state.id, true);
    if (localDeclar !== state.outerDeclar) return;

    state.selfReference = true;
    context.stop();
  }
};

exports.property = function (node, file, scope) {
  var key = t.toComputedKey(node, node.key);
  if (!t.isLiteral(key)) return node; // we can't set a function id with this

  var id = t.toIdentifier(key.value);
  key = t.identifier(id);

  var state = {
    id: id,
    selfReference: false,
    outerDeclar: scope.get(id, true),
  };

  traverse(node, traverser, scope, state);

  if (state.selfReference) {
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
