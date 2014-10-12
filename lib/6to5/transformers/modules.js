var util = require("../util");
var b    = require("ast-types").builders;
var _    = require("lodash");

exports.ImportDeclaration = function (node) {
  var nodes = [];

  if (node.specifiers.length) {
    _.each(node.specifiers, function (specifier) {
      var variableName = getSpecifierName(specifier);
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
    // import "foo";
    nodes.push(util.template("require", {
      MODULE_NAME: node.source.raw
    }, true));
  }

  return nodes;
};

var pushExportSpecifiers = function (node, nodes) {
  _.each(node.specifiers, function (specifier) {
    var variableName = getSpecifierName(specifier);

    if (node.source) {
      if (specifier.type === "ExportBatchSpecifier") {
        // export * from "foo";
        nodes.push(util.template("exports-wildcard", {
          MODULE_NAME: node.source.raw
        }, true));
      } else {
        // export { foo } from "test";
        nodes.push(util.template("exports-require-assign-key", {
          VARIABLE_NAME: variableName.name,
          MODULE_NAME:   node.source.raw,
          KEY:           specifier.id
        }, true));
      }
    } else {
      // export { foo };
      nodes.push(util.template("exports-assign", {
        VALUE: specifier.id,
        KEY:   variableName
      }, true));
    }
  });
};

var getSpecifierName = function (specifier) {
  return specifier.name || specifier.id;
};

var pushExportDeclaration = function (node, parent, nodes) {
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

    var assign = util.template("exports-assign", {
      VALUE: id,
      KEY:   id
    }, true);

    nodes.push(declar);

    if (declar.type === "FunctionDeclaration") {
      assign._modulesHoist = true;
    }

    nodes.push(assign);
  }
};

exports.Program = {
  exit: function (node) {
    var unshift = [];

    node.body = node.body.filter(function (bodyNode) {
      if (bodyNode._modulesHoist) {
        unshift.push(bodyNode);
        return false;
      } else {
        return true;
      }
    });

    node.body = unshift.concat(node.body);
  }
};

exports.ExportDeclaration = function (node, parent) {
  var nodes = [];

  if (node.declaration) {
    pushExportDeclaration(node, parent, nodes);
  } else {
    pushExportSpecifiers(node, nodes);
  }

  return nodes;
};
