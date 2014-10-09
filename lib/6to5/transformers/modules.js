var path = require("path");
var util = require("../util");
var b    = require("ast-types").builders;
var _    = require("lodash");

exports.ImportDeclaration = function (node) {
  var nodes = [];

  if (node.specifiers.length) {
    _.each(node.specifiers, function (specifier) {
      var variableName = specifier.name || specifier.id;
      var key          = specifier.id.name;

      // import foo from "foo";
      if (specifier.type === "ImportDefaultSpecifier") {
        key = b.identifier("default");
      }

      var templateName = "require-assign";

      // import * as bar from "foo";
      if (specifier.type !== "ImportNamespaceSpecifier") templateName += "-key";

      nodes.push(util.template(templateName, {
        VARIABLE_NAME: variableName.name,
        MODULE_NAME:   node.source.raw,
        KEY:           key
      }));
    });
  } else {
    nodes.push(util.template("require", {
      MODULE_NAME: node.source.raw
    }, true));
  }

  return nodes;
};

var pushExportSpecifiers = function (node, nodes) {
  _.each(node.specifiers, function (specifier) {
    var variableName = specifier.name || specifier.id;

    if (node.source) {
      if (specifier.type === "ExportBatchSpecifier") {
        nodes.push(util.template("exports-wildcard", {
          MODULE_NAME: node.source.raw
        }, true));
      } else {
        nodes.push(util.template("exports-require-assign-key", {
          VARIABLE_NAME: variableName.name,
          MODULE_NAME:   node.source.raw,
          KEY:           specifier.id
        }, true));
      }
    } else {
      nodes.push(util.template("exports-assign", {
        VALUE: specifier.id,
        KEY:   variableName
      }, true));
    }
  });
};

var pushExportDeclaration = function (node, nodes) {
  var declar = node.declaration;

  if (node.default) {
    if (declar.type === "FunctionDeclaration") {
      declar.type = "FunctionExpression";
    } else if (declar.type === "ClassDeclaration") {
      declar.type = "ClassExpression";
    }

    nodes.push(util.template("exports-default", {
      VALUE: declar
    }, true));
  } else {
    var id = declar.id;
    if (declar.type === "VariableDeclaration") {
      id = declar.declarations[0].id;
    }

    nodes.push(declar);
    nodes.push(util.template("exports-assign", {
      VALUE: id,
      KEY:   id
    }, true));
  }
};

exports.ExportDeclaration = function (node) {
  var nodes = [];

  if (node.declaration) {
    pushExportDeclaration(node, nodes);
  } else {
    pushExportSpecifiers(node, nodes);
  }

  return nodes;
};
