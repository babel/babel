var util = require("../util");
var _    = require("lodash");

exports.ImportDeclaration = function (node) {
  var nodes = [];

  _.each(node.specifiers, function (specifier) {
    var variableName = specifier.name || specifier.id;

    var key = specifier.id.name;

    var templateName = "require-assign";
    if (node.kind !== "default") templateName += "-key";

    nodes.push(util.template(templateName, {
      VARIABLE_NAME: variableName.name,
      MODULE_NAME:   node.source,
      KEY:           key
    }));
  });

  return nodes;
};

exports.ModuleDeclaration = function (node) {
  return util.template("require-assign", {
    VARIABLE_NAME: node.id,
    MODULE_NAME:   node.source
  });
};

exports.ExportDeclaration = function (node) {
  var nodes = [];

  _.each(node.specifiers, function (specifier) {
    var variableName = specifier.name || specifier.id;

    if (specifier.type === "ExportBatchSpecifier") {
      nodes.push(util.template("exports-wildcard", {
        MODULE_NAME: node.source
      }, true));
    } else {
      nodes.push(util.template("exports-require-assign-key", {
        VARIABLE_NAME: variableName.name,
        MODULE_NAME:   node.source,
        KEY:           specifier.id.name
      }, true));
    }
  });

  var declar = node.declaration;

  if (declar) {
    if (node.default) {
      nodes.push(util.template("exports-default", {
        VALUE: declar
      }, true));
    } else {
      if (declar.type === "VariableDeclaration") {
        nodes.push(declar);

        _.each(declar.declarations, function (declar) {
          nodes.push(util.template("exports-alias-var", {
            STRING_KEY: {
              type: "Literal",
              value: declar.id.name
            },
            KEY: declar.id
          }, true));
        });
      } else if (declar.type === "FunctionDeclaration") {
        declar.type = "FunctionExpression";

        nodes.push(util.template("exports-assign", {
          KEY: declar.id,
          VALUE: declar
        }, true));
      } else {
        throw new Error("unsupported export declaration type " + declar.type);
      }
    }
  }

  return nodes;
};
