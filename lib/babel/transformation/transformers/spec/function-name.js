"use strict";

var t           = require("../../../types");
var util        = require("../../../util");

var propertyFunctionVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isReferencedIdentifier(node, parent, { name: state.name }) && scope.getBindingIdentifier(node.name) === state.binding) {
      return state.getOuter();
    }
  }
};

//exports.ArrowFunctionExpression =
exports.FunctionExpression = function (node, parent, scope) {
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

  // check to see if we have a local binding of the id we're setting inside of
  // the function, this is important as there are caveats associated

  var bindingInfo = scope.getOwnBindingInfo(name);

  if (bindingInfo) {
    if (bindingInfo.type === "param") {
      // safari will blow up in strict mode with code like:
      //
      //   var t = function t(t) {};
      //
      // with the error:
      //
      //   Cannot declare a parameter named 't' as it shadows the name of a
      //   strict mode function.
      //
      // this isn't to the spec and they've invented this behaviour which is
      // **extremely** annoying so we avoid setting the name if it has a param
      // with the same id
    } else {
      // otherwise it's defined somewhere in scope like:
      //
      //   var t = function () {
      //     var t = 2;
      //   };
      //
      // so we can safely just set the id and move along as it shadows the
      // bound function id
      node.id = id;
    }

    return;
  }

  //

  var binding = scope.getBindingIdentifier(name);
  var outerId;

  scope.traverse(node, propertyFunctionVisitor, {
    name: name,
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
