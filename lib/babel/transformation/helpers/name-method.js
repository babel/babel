"use strict";

var util = require("../../util");
var t    = require("../../types");

var visitor = {
  enter: function (node, parent, scope, state) {
    // check if this node is a referenced identifier that matches the same as our
    // function id
    if (!t.isReferencedIdentifier(node, parent, { name: state.name })) return;

    // check that we don't have a local variable declared as that removes the need
    // for the wrapper
    var localDeclar = scope.getBindingIdentifier(state.name);
    if (localDeclar !== state.outerDeclar) return;

    state.selfReference = true;
    this.stop();
  }
};

var wrap = function (method, id, scope) {
  var templateName = "property-method-assignment-wrapper";
  if (method.generator) templateName += "-generator";
  return util.template(templateName, {
    FUNCTION: method,
    FUNCTION_ID: id,
    FUNCTION_KEY: scope.generateUidIdentifier(id.name),
    WRAPPER_KEY: scope.generateUidIdentifier(id.name + "Wrapper")
  });
};

var visit = function (node, name, scope) {
  var state = {
    name: name,
    selfReference: false,
    outerDeclar: scope.getBindingIdentifier(name),
  };

  if (doesntHaveLocal(name, scope)) {
    scope.traverse(node, visitor, state);
  }

  return state;
};

var doesntHaveLocal = function (name, scope) {
  var bindingInfo = scope.getOwnBindingInfo(name);
  return !bindingInfo || bindingInfo.kind !== "param";
};

exports.property = function (node, file, scope) {
  var key = t.toComputedKey(node, node.key);
  if (!t.isLiteral(key)) return node; // we can't set a function id with this

  var name = t.toIdentifier(key.value);
  var id = t.identifier(name);

  var method = node.value;
  var state  = visit(method, name, scope);

  if (state.selfReference) {
    node.value = wrap(method, id, scope);
  } else {
    method.id = id;
  }
};

exports.bare = function (node, parent, scope) {
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

  if (!t.isIdentifier(id)) return;

  var name = t.toIdentifier(id.name);
  id = t.identifier(name);

  //

  var state = visit(node, name, scope);

  if (state.selfReference) {
    return wrap(node, id, scope);
  } else {
    node.id = id;
  }
};
