var tokTypes = require("babel").acorn.tokTypes;
var traverse = require("babel").traverse;
var t        = require("babel").types;

exports.toToken = function (token) {
  var type = token.type;

  if (type === tokTypes.name) {
    token.type = "Identifier";
  } else if (type === tokTypes.semi || type === tokTypes.comma || type === tokTypes.parenL || type === tokTypes.parenR || type === tokTypes.braceL || type === tokTypes.braceR || type === tokTypes.slash || type === tokTypes.dot || type.isAssign) {
    token.type = "Punctuator";
    if (!token.value) {
      token.value = type.type;
    }
  } else if (type === tokTypes.jsxTagStart) {
    token.type = "Punctuator";
    token.value = "<";
  } else if (type === tokTypes.jsxTagEnd) {
    token.type = "Punctuator";
    token.value = ">";
  } else if (type === tokTypes.jsxName) {
    token.type = "JSXIdentifier";
  } else if (type.keyword) {
    token.type = "Keyword";
  } else if (type === tokTypes.num) {
    token.type = "Numeric";
    token.value = String(token.value);
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
      node.computed = true;
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

    // functions

    if (t.isFunction(node) && node.async) {
      node.generator = true;
      node.async - false;
    }
  }
};
