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
    if (t.isSpreadProperty(node)) {
      node.type = "Property";
      node.kind = "init";
      node.computed = false;
      node.key = node.value = node.argument;
      delete node.argument;
    }

    if (t.isClassProperty(node)) {
      // eslint doesn't like these
      this.remove();
    }

    if (t.isImportBatchSpecifier(node)) {
      // ImportBatchSpecifier<name> => ImportNamespaceSpecifier<id>
      node.type = "ImportNamespaceSpecifier";
      node.id = node.name;
      delete node.name;
    }

    // JSX

    if (t.isJSXIdentifier(node)) {
      if (node.name === "this" && t.isReferenced(node, parent)) {
        return t.thisExpression();
      } else {
        node.type = "Identifier";
      }
    }

    if (t.isJSXMemberExpression(node)) {
      node.type = "MemberExpression";
    }

    // functions

    if (t.isFunction(node)) {
      node.defaults = [];
      node.params = node.params.map(function (param) {
        if (t.isAssignmentPattern(param)) {
          node.defaults.push(param.right);
          return param.left;
        } else {
          if (t.isRestElement(param)) param = param.argument;
          node.defaults.push(null);
          return param;
        }
      });
    }

    if (t.isArrowFunctionExpression(node)) {
      node.type = "FunctionExpression";
    }
  }
};
