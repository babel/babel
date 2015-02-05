"use strict";

var t = require("../../../types");

var functionChildrenVisitor = {
  enter: function (node, parent, scope, state) {
    if (t.isFunction(node) && !node._aliasFunction) {
      return this.skip();
    }

    if (node._ignoreAliasFunctions) return this.skip();

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

var functionVisitor = {
  enter: function (node, parent, scope, state) {
    if (!node._aliasFunction) {
      if (t.isFunction(node)) {
        // stop traversal of this node as it'll be hit again by this transformer
        return this.skip();
      } else {
        return;
      }
    }

    // traverse all child nodes of this function and find `arguments` and `this`
    scope.traverse(node, functionChildrenVisitor, state);

    return this.skip();
  }
};

var go = function (getBody, node, scope) {
  var argumentsId;
  var thisId;

  var state = {
    getArgumentsId: function () {
      return argumentsId = argumentsId || scope.generateUidIdentifier("arguments");
    },
    getThisId: function () {
      return thisId = thisId || scope.generateUidIdentifier("this");
    }
  };

  // traverse the function and find all alias functions so we can alias
  // `arguments` and `this` if necessary
  scope.traverse(node, functionVisitor, state);

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

exports.Program = function (node, parent, scope) {
  go(function () {
    return node.body;
  }, node, scope);
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, scope) {
  go(function () {
    t.ensureBlock(node);
    return node.body.body;
  }, node, scope);
};
