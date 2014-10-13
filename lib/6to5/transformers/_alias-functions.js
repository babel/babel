var traverse = require("../traverse");
var util     = require("../util");
var b        = require("ast-types").builders;

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
  // arguments and this if neccesary
  traverse(node, function (node) {
    var _aliasFunction = node._aliasFunction;
    if (!_aliasFunction) {
      if (traverse.isFunction(node)) {
        // stop traversal of this node as it'll be hit again by this transformer
        return false;
      } else {
        return;
      }
    }

    // traverse all child nodes of this function and find arguments and this
    traverse(node, function (node, parent) {
      var getId;

      if (node.type === "Identifier" && node.name === "arguments") {
        getId = getArgumentsId;
      } else if (node.type === "ThisExpression") {
        getId = getThisId;
      } else {
        return;
      }

      if (util.isReferenced(node, parent)) return getId();
    }, _aliasFunction === "arrows" && ["FunctionExpression", "FunctionDeclaration"]);

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
    util.ensureBlock(node);
    return node.body.body;
  }, node, file);
};
