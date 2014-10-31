var traverse = require("../traverse");
var t        = require("../types");
var b        = require("../builders");

var go = function (getBody, node, file) {
  var argumentsId;
  var thisId;

  var getArgumentsId = function () {
    return argumentsId = argumentsId || b.identifier(file.generateUid("arguments"));
  };

  var getThisId = function () {
    return thisId = thisId || b.identifier(file.generateUid("this"));
  };

  // traverse the function and find all alias functions so we can alias
  // arguments and this if necessary
  traverse(node, function (node) {
    var _aliasFunction = node._aliasFunction;
    if (!_aliasFunction) {
      if (t.isFunction(node)) {
        // stop traversal of this node as it'll be hit again by this transformer
        return false;
      } else {
        return;
      }
    }

    // traverse all child nodes of this function and find arguments and this
    traverse(node, function (node, parent) {
      if (_aliasFunction === "arrows") {
        if (t.isFunction(node) && node._aliasFunction !== "arrows") {
          return false;
        }
      }

      if (node._ignoreAliasFunctions) return;

      var getId;

      if (node.type === "Identifier" && node.name === "arguments") {
        getId = getArgumentsId;
      } else if (node.type === "ThisExpression") {
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
    body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(id, init)
    ]));
  };

  if (argumentsId) {
    pushDeclaration(argumentsId, b.identifier("arguments"));
  }

  if (thisId) {
    pushDeclaration(thisId, b.identifier("this"));
  }
};

exports.Program = function (node, parent, file) {
  go(function () {
    return node.body;
  }, node, file);
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, file) {
  go(function () {
    t.ensureBlock(node);
    return node.body.body;
  }, node, file);
};
