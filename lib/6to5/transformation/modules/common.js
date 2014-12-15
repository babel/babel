module.exports = CommonJSFormatter;

var DefaultFormatter = require("./_default");
var traverse         = require("../../traverse");
var util             = require("../../util");
var t                = require("../../types");

function CommonJSFormatter(file) {
  DefaultFormatter.apply(this, arguments);

  var hasNonDefaultExports = false;
  traverse(file.ast, function (node) {
    if (t.isExportDeclaration(node) && !node.default) hasNonDefaultExports = true;
  });
  this.hasNonDefaultExports = hasNonDefaultExports;
}

util.inherits(CommonJSFormatter, DefaultFormatter);

CommonJSFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (t.isSpecifierDefault(specifier)) {
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(variableName,
        t.callExpression(this.file.addDeclaration("interop-require"), [util.template("require", {
          MODULE_NAME: node.source.raw
        })])
      )
    ]));
  } else {
    // import foo from "foo";
    if (specifier.default) {
      specifier.id = t.identifier("default");
    }

    var templateName = "require-assign";

    // import * as bar from "foo";
    if (specifier.type !== "ImportBatchSpecifier") templateName += "-key";

    nodes.push(util.template(templateName, {
      VARIABLE_NAME: variableName,
      MODULE_NAME:   node.source.raw,
      KEY:           specifier.id
    }));
  }
};

CommonJSFormatter.prototype.importDeclaration = function (node, nodes) {
  // import "foo";
  nodes.push(util.template("require", {
    //inherits: node,

    MODULE_NAME: node.source.raw
  }, true));
};

CommonJSFormatter.prototype.exportDeclaration = function (node, nodes) {
  if (node.default) {
    var declar = node.declaration;

    // module.exports = VALUE;
    var templateName = "exports-default-module";

    // exports = module.exports = VALUE;
    if (this.hasNonDefaultExports) templateName = "exports-default-module-override";

    var assign = util.template(templateName, {
      VALUE: this._pushStatement(declar, nodes)
    }, true);

    // hoist to the top if this default is a function
    nodes.push(this._hoistExport(declar, assign));
  } else {
    DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
  }
};

CommonJSFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  this._exportSpecifier(function () {
    return t.callExpression(t.identifier("require"), [node.source]);
  }, specifier, node, nodes);
};
