"use strict";

var util = require("../../util");
var t    = require("../../types");

var visitor = {
  enter: function (node, parent, scope, state) {
    // check if this node is an identifier that matches the same as our function id
    if (!t.isIdentifier(node, { name: state.id })) return;

    // check if this node is the one referenced
    if (!t.isReferenced(node, parent)) return;

    // check that we don't have a local variable declared as that removes the need
    // for the wrapper
    var localDeclar = scope.getBindingIdentifier(state.id);
    if (localDeclar !== state.outerDeclar) return;

    state.selfReference = true;
    this.stop();
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
    outerDeclar: scope.getBindingIdentifier(id),
  };

  scope.traverse(node, visitor, state);

  var method = node.value;

  if (state.selfReference) {
    var templateName = "property-method-assignment-wrapper";
    if (method.generator) templateName += "-generator";
    node.value = util.template(templateName, {
      FUNCTION: method,
      FUNCTION_ID: key,
      FUNCTION_KEY: scope.generateUidIdentifier(id),
      WRAPPER_KEY: scope.generateUidIdentifier(id + "Wrapper")
    });
  } else {
    method.id = key;
  }
};
