module.exports = CommonJSFormatter;

var util = require("../util");
var t    = require("../types");
var b    = require("../builders");

function CommonJSFormatter(file) {
  this.file = file;
}

CommonJSFormatter.prototype.import = function (node, nodes) {
  // import "foo";
  nodes.push(util.template("require", {
    MODULE_NAME: node.source.raw
  }, true));
};

CommonJSFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (specifier.default) {
    specifier.id = b.identifier("default");
  }

  var templateName = "require-assign";

  // import * as bar from "foo";
  if (specifier.type !== "ImportBatchSpecifier") templateName += "-key";

  nodes.push(util.template(templateName, {
    VARIABLE_NAME: variableName,
    MODULE_NAME:   node.source.raw,
    KEY:           specifier.id
  }));
};

CommonJSFormatter.prototype.export = function (node, nodes) {
  var declar = node.declaration;

  if (node.default) {
    var ref = declar;

    if (t.isClass(ref) || t.isFunction(ref)) {
      if (ref.id) {
        nodes.push(ref);
        ref = ref.id;
      }
    }

    nodes.push(util.template("exports-default", {
      VALUE: ref
    }, true));
  } else {
    var id = declar.id;
    if (t.isVariableDeclaration(declar)) {
      id = declar.declarations[0].id;
    }

    var assign = util.template("exports-assign", {
      VALUE: id,
      KEY:   id
    }, true);

    nodes.push(declar);

    if (t.isFunctionDeclaration(declar)) {
      assign._blockHoist = true;
    }

    nodes.push(assign);
  }
};

CommonJSFormatter.prototype._exportSpecifier = function (getRef, specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  if (node.source) {
    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      nodes.push(util.template("exports-wildcard", {
        OBJECT: getRef()
      }, true));
    } else {
      // export { foo } from "test";
      nodes.push(util.template("exports-assign-key", {
        VARIABLE_NAME: variableName.name,
        OBJECT:        getRef(),
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

CommonJSFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  return this._exportSpecifier(function () {
    return b.callExpression(b.identifier("require"), [node.source]);
  }, specifier, node, nodes);
};
