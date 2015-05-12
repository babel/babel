var traverse = require("babel-core").traverse;
var tt       = require("babel-core").acorn.tokTypes;
var t        = require("babel-core").types;

exports.toToken = function (token) {
  var type = token.type;

  if (type === tt.name) {
    token.type = "Identifier";
  } else if (type === tt.semi || type === tt.comma ||
             type === tt.parenL || type === tt.parenR ||
             type === tt.braceL || type === tt.braceR ||
             type === tt.slash || type === tt.dot ||
             type === tt.bracketL || type === tt.bracketR ||
             type === tt.ellipsis || type === tt.arrow ||
             type === tt.star || type === tt.incDec ||
             type === tt.colon || type === tt.question ||
             type === tt.template || type === tt.backQuote ||
             type === tt.dollarBraceL || type === tt.at ||
             type === tt.logicalOR || type === tt.logicalAND ||
             type === tt.bitwiseOR || type === tt.bitwiseXOR ||
             type === tt.bitwiseAND || type === tt.equality ||
             type === tt.relational || type === tt.bitShift ||
             type === tt.plusMin || type === tt.modulo ||
             type === tt.exponent || type === tt.prefix ||
             type.isAssign) {
    token.type = "Punctuator";
    if (!token.value) token.value = type.label;
  } else if (type === tt.jsxTagStart) {
    token.type = "Punctuator";
    token.value = "<";
  } else if (type === tt.jsxTagEnd) {
    token.type = "Punctuator";
    token.value = ">";
  } else if (type === tt.jsxName) {
    token.type = "JSXIdentifier";
  } else if (type.keyword === "null") {
    token.type = "Null";
  } else if (type.keyword === "false" || token.keyword === "true") {
    token.type = "Boolean";
  } else if (type.keyword) {
    token.type = "Keyword";
  } else if (type === tt.num) {
    token.type = "Numeric";
    token.value = String(token.value);
  } else if (type === tt.string) {
    token.type = "String";
    token.value = JSON.stringify(token.value);
  } else if (type === tt.regexp) {
    token.type = "RegularExpression";
  }

  return token;
};

exports.toAST = function (ast) {
  ast.sourceType = "module";
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

    if (t.isFlow(node)) {
      return this.remove();
    }

    if (t.isRestElement(node)) {
      return node.argument;
    }

    // modules

    if (t.isImportDeclaration(node)) {
      delete node.isType;
    }

    if (t.isExportDeclaration(node)) {
      if (t.isClassExpression(node.declaration)) {
        node.declaration.type = "ClassDeclaration";
      } else if (t.isFunctionExpression(node.declaration)) {
        node.declaration.type = "FunctionDeclaration";
      }
    }

    // classes

    if (t.isReferencedIdentifier(node, parent, { name: "super" })) {
      return t.inherits(t.thisExpression(), node);
    }

    if (t.isClassProperty(node)) {
      delete node.key;
    }

    // functions

    if (t.isFunction(node)) {
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
