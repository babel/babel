var tokTypes = require("babel-core").acorn.tokTypes;
var traverse = require("babel-core").traverse;
var t        = require("babel-core").types;

exports.toToken = function (token) {
  var type = token.type;

  if (type === tokTypes.name) {
    token.type = "Identifier";
  } else if (type === tokTypes.semi || type === tokTypes.comma ||
             type === tokTypes.parenL || type === tokTypes.parenR ||
             type === tokTypes.braceL || type === tokTypes.braceR ||
             type === tokTypes.slash || type === tokTypes.dot ||
             type === tokTypes.bracketL || type === tokTypes.bracketR ||
             type === tokTypes.ellipsis || type === tokTypes.arrow ||
             type === tokTypes.star ||
             type.isAssign) {
    token.type = "Punctuator";
    if (!token.value) token.value = type.type;
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
  } else if (type === tokTypes.string) {
    token.type = "String";
    token.value = JSON.stringify(token.value);
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
  exit: function (node, parent) {
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

    // playground

    if (t.isAssignmentExpression(node)) {
      if (node.operator === "||=" || node.operator === "?=") {
        node.operator = "+=";
      }
    }

    // modules

    if (t.isImportDeclaration(node)) {
      delete node.isType;
    }

    if (t.isExportDeclaration(node)) {
      if (node.default) {
        delete node.specifiers;
        delete node.source;
        node.type = "ExportDefaultDeclaration";
        if (node.declaration.type === "FunctionExpression") {
          node.declaration.type = "FunctionDeclaration";
        } else if (node.declaration.type === "ClassExpression") {
          node.declaration.type = "ClassDeclaration";
        }
      } else if (t.isExportBatchSpecifier(node.specifiers[0])) {
        node.type = "ExportAllDeclaration";
        delete node.specifiers;
        delete node.declaration;
      } else {
        node.type = "ExportNamedDeclaration";
      }
      delete node.default;
    }
    
    if (t.isExportSpecifier(node)) {
      node.local = node.id;
      node.exported = node.name || node.id;
      delete node.id;
      delete node.name;
    }

    if (t.isImportSpecifier(node)) {
      node.local = node.id || node.name;
      if (node.default) {
        node.type = "ImportDefaultSpecifier";
      } else {
        node.imported = node.name || node.id;
      }
      delete node.id;
      delete node.name;
      delete node.default;
    }

    if (t.isImportBatchSpecifier(node)) {
      // ImportBatchSpecifier<name> => ImportNamespaceSpecifier<id>
      node.type = "ImportNamespaceSpecifier";
      node.local = node.name;
      delete node.name;
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

      node.rest = null;
      if (node.async) node.generator = true;
      delete node.async;
    }

    if (t.isAwaitExpression(node)) {
      node.type = "YieldExpression";
      node.delegate = node.all;
      delete node.all;
    }
  }
};
