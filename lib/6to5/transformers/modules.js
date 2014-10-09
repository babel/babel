var path = require("path");
var util = require("../util");
var b    = require("ast-types").builders;
var _    = require("lodash");

var toModuleNameIdentifier = function (node) {
  var id = node.source.value;
  id = path.basename(id, path.extname(id));
  id = util.camelCase(id);
  return b.identifier(id);
};

exports.ImportDeclaration = function (node) {
  var nodes = [];

  if (node.specifiers.length) {
    _.each(node.specifiers, function (specifier) {
      var variableName = specifier.name || specifier.id;
      var key          = specifier.id.name;

      var templateName = "require-assign";
      if (specifier.type === "ImportSpecifier") {
        if (key !== "default") templateName += "-key";
      }

      nodes.push(util.template(templateName, {
        VARIABLE_NAME: variableName.name,
        MODULE_NAME:   node.source.raw,
        KEY:           key
      }));
    });
  } else {
    nodes.push(util.template("require-assign", {
      VARIABLE_NAME: toModuleNameIdentifier(node),
      MODULE_NAME:   node.source.raw
    }));
  }

  return nodes;
};

var pushSpecifiers = function (node, nodes) {
  _.each(node.specifiers, function (specifier) {
    var variableName = specifier.name || specifier.id;

    if (node.source) {
      if (specifier.type === "ExportBatchSpecifier") {
        nodes.push(util.template("exports-wildcard", {
          MODULE_NAME: node.source.raw
        }, true));
      } else {
        var templateName;

        if (variableName.name === "default") {
          templateName = "exports-default-require";
        } else {
          templateName = "exports-require-assign";
        }

        if (specifier.id.name !== "default") templateName += "-key";

        nodes.push(util.template(templateName, {
          VARIABLE_NAME: variableName.name,
          MODULE_NAME:   node.source.raw,
          KEY:           specifier.id
        }, true));
      }
    } else {
      if (variableName.name === "default") {
        nodes.push(util.template("exports-default", {
          VALUE: specifier.id
        }, true));
      } else {
        nodes.push(util.template("exports-assign", {
          VALUE: specifier.id,
          KEY:   variableName
        }, true));
      }
    }
  });
};

var pushDeclaration = function (node, nodes) {
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
    pushDeclaration(node, nodes);
  } else {
    pushSpecifiers(node, nodes);
  }

  return nodes;
};
