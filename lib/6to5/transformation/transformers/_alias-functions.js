"use strict";

var traverse = require("../../traverse");
var t        = require("../../types");

var functionChildrenTraverser = {
  enter: function (node, parent, scope, context, state) {
    if (t.isFunction(node) && !node._aliasFunction) {
      return context.skip();
    }

    if (node._ignoreAliasFunctions) return context.skip();

    var getId;

    if (t.isIdentifier(node) && node.name === "arguments") {
      getId = state.getArgumentsId;
    } else if (t.isThisExpression(node)) {
      getId = state.getThisId;
    } else {
      return;
    }

    if (t.isReferenced(node, parent)) return getId();
  }
};

var functionTraverser = {
  enter: function (node, parent, scope, context, state) {
    if (!node._aliasFunction) {
      if (t.isFunction(node)) {
        // stop traversal of this node as it'll be hit again by this transformer
        return context.skip();
      } else {
        return;
      }
    }

    // traverse all child nodes of this function and find `arguments` and `this`
    traverse(node, functionChildrenTraverser, null, state);

    return context.skip();
  }
};

var go = function (getBody, node, file, scope) {
  var argumentsId;
  var thisId;

  var state = {
    getArgumentsId: function () {
      return argumentsId = argumentsId || file.generateUidIdentifier("arguments", scope);
    },
    getThisId: function () {
      return thisId = thisId || file.generateUidIdentifier("this", scope);
    }
  };

  // traverse the function and find all alias functions so we can alias
  // `arguments` and `this` if necessary
  traverse(node, functionTraverser, null, state);

  var body;

  var pushDeclaration = function (id, init) {
    body = body || getBody();
    body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(id, init)
    ]));
  };

  if (argumentsId) {
    pushDeclaration(argumentsId, t.identifier("arguments"));
  }

  if (thisId) {
    pushDeclaration(thisId, t.thisExpression());
  }
};

exports.Program = function (node, parent, scope, context, file) {
  go(function () {
    return node.body;
  }, node, file, scope);
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, scope, context, file) {
  go(function () {
    t.ensureBlock(node);
    return node.body.body;
  }, node, file, scope);
};
