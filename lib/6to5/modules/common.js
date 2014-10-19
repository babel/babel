module.exports = CommonJSModuleFormatter;

var util = require("../util");
var b    = require("recast").types.builders;

var getSpecifierName = function (specifier) {
  return specifier.name || specifier.id;
};

function CommonJSModuleFormatter(file) {
  this.file = file;
}

CommonJSModuleFormatter.prototype.import = function (node, nodes) {
  // import "foo";
  nodes.push(util.template("require", {
    MODULE_NAME: node.source.raw
  }, true));
};

CommonJSModuleFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = getSpecifierName(specifier);

  // import foo from "foo";
  if (specifier.default) {
    specifier.id = b.identifier("default");
  }

  var templateName = "require-assign";

  // import * as bar from "foo";
  if (specifier.type !== "ImportBatchSpecifier") templateName += "-key";

  nodes.push(util.template(templateName, {
    VARIABLE_NAME: variableName.name,
    MODULE_NAME:   node.source.raw,
    KEY:           specifier.id
  }));
};

CommonJSModuleFormatter.prototype.export = function (node, nodes) {
  var declar = node.declaration;

  if (node.default) {
    util.ensureExpressionType(declar);

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
      assign._blockHoist = true;
    }

    nodes.push(assign);
  }
};

CommonJSModuleFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
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
};
