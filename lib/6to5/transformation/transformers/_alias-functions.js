var traverse = require("../../traverse");
var t        = require("../../types");

var go = function (getBody, node, file, scope) {
  var argumentsId;
  var thisId;

  var getArgumentsId = function () {
    return argumentsId = argumentsId || file.generateUidIdentifier("arguments", scope);
  };

  var getThisId = function () {
    return thisId = thisId || file.generateUidIdentifier("this", scope);
  };

  // traverse the function and find all alias functions so we can alias
  // `arguments` and `this` if necessary
  traverse(node, function (node) {
    if (!node._aliasFunction) {
      if (t.isFunction(node)) {
        // stop traversal of this node as it'll be hit again by this transformer
        return false;
      } else {
        return;
      }
    }

    // traverse all child nodes of this function and find `arguments` and `this`
    traverse(node, function (node, parent) {
      if (t.isFunction(node) && !node._aliasFunction) {
        return false;
      }

      if (node._ignoreAliasFunctions) return;

      var getId;

      if (t.isIdentifier(node) && node.name === "arguments") {
        getId = getArgumentsId;
      } else if (t.isThisExpression(node)) {
        getId = getThisId;
      } else {
        return;
      }

      if (t.isReferenced(node, parent)) return getId();
    });

    return false;
  });

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
    pushDeclaration(thisId, t.identifier("this"));
  }
};

exports.Program = function (node, parent, file, scope) {
  go(function () {
    return node.body;
  }, node, file, scope);
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, file, scope) {
  go(function () {
    t.ensureBlock(node);
    return node.body.body;
  }, node, file, scope);
};
