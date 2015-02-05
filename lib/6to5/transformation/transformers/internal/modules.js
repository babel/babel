"use strict";

// in this transformer we have to split up classes and function declarations
// from their exports. why? because sometimes we need to replace classes with
// nodes that aren't allowed in the same contexts. also, if you're exporting
// a generator function as a default then regenerator will destroy the export
// declaration and leave a variable declaration in it's place... yeah, handy.

var t = require("../../../types");

var resolveModuleSource = function (node, parent, scope, file) {
  var resolveModuleSource = file.opts.resolveModuleSource;
  if (node.source && resolveModuleSource) {
    node.source.value = resolveModuleSource(node.source.value);
  }
};

exports.check = function (node) {
  return t.isImportDeclaration(node) || t.isExportDeclaration(node);
};

exports.ImportDeclaration = resolveModuleSource;

exports.ExportDeclaration = function (node, parent, scope) {
  resolveModuleSource.apply(null, arguments);

  var declar = node.declaration;

  if (node.default) {
    if (t.isClassDeclaration(declar)) {
      node.declaration = declar.id;
      return [declar, node];
    } else if (t.isClassExpression(declar)) {
      var temp = scope.generateUidIdentifier("default");
      declar = t.variableDeclaration("var", [
        t.variableDeclarator(temp, declar)
      ]);
      node.declaration = temp;
      return [declar, node];
    } else if (t.isFunctionDeclaration(declar)) {
      node._blockHoist = 2;
      node.declaration = declar.id;
      return [declar, node];
    }
  } else {
    if (t.isFunctionDeclaration(declar)) {
      node.specifiers  = [t.importSpecifier(declar.id, declar.id)];
      node.declaration = null;
      node._blockHoist = 2;
      return [declar, node];
    }
  }
};
