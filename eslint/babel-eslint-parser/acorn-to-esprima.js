var tokTypes = require("babel").acorn.tokTypes;
var traverse = require("babel").traverse;
var t        = require("babel").types;

exports.toToken = function (token) {
  var type = token.type;

  if (type === tokTypes.name) {
    token.type = "Identifier";
  } else if (type === tokTypes.semi || type === tokTypes.comma || type === tokTypes.parenL || type === tokTypes.parenR || type === tokTypes.braceL || type === tokTypes.braceR) {
    token.type = "Punctuator";
    token.value = type.type;
  }

  return token;
};

exports.toAST = function (ast) {
  traverse(ast, astTransformVisitor);
};

var astTransformVisitor = {
  noScope: true,
  enter: function (node) {
    if (t.isImportBatchSpecifier(node)) {
      // ImportBatchSpecifier<name> => ImportNamespaceSpecifier<id>
      node.type = "ImportNamespaceSpecifier";
      node.id = node.name;
      delete node.name;
    } else if (t.isFunction(node)) {
      // defaults
      node.defaults = [];
      node.params = node.params.map(function (param) {
        if (t.isAssignmentPattern(param)) {
          node.defaults.push(param.right);
          return param.left;
        } else {
          node.defaults.push(null);
          return param;
        }
      });

      // rest
      if (t.isRestElement(node.params[node.params.length - 1])) {
        node.rest = node.params.pop();
      }
    } else if (t.isClassProperty(node)) {
      // eslint doesn't like these
      this.remove();
    }
  }
};
