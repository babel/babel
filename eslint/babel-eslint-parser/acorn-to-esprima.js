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

function isCompatTag(tagName) {
  return tagName && /^[a-z]|\-/.test(tagName);
}

var astTransformVisitor = {
  noScope: true,
  enter: function (node, parent) {
    if (t.isSpreadProperty(node)) {
      node.type = "Property";
      node.kind = "init";
      node.computed = false;
      node.key = node.value = node.argument;
      delete node.argument;
    }

    if (t.isRestElement(node)) {
      return node.argument;
    }

    if (t.isImportBatchSpecifier(node)) {
      // ImportBatchSpecifier<name> => ImportNamespaceSpecifier<id>
      node.type = "ImportNamespaceSpecifier";
      node.id = node.name;
      delete node.name;
    }

    if (t.isFunction(node) && node.async) {
      node.generator = true;
      node.async - false;
    }

    if (t.isAwaitExpression(node)) {
      node.type = "YieldExpression";
    }

    // classes
    
    if (t.isReferencedIdentifier(node, parent, { name: "super" })) {
      return t.inherits(t.thisExpression(), node);
    }

    if (t.isClassProperty(node)) {
      // eslint doesn't like these
      this.remove();
    }

    // JSX

    if (t.isJSXIdentifier(node)) {
      if (node.name === "this" && t.isReferenced(node, parent)) {
        return t.inherits(t.thisExpression(), node);
      } else if (!t.isJSXAttribute(parent) && !isCompatTag(node.name)) {
        node.type = "Identifier";
      } else {
        // just ignore this node as it'd be something like <div> or an attribute name
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
