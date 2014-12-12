module.exports = CommonJSFormatter;

var CommonJSStrictFormatter = require("./common-strict");
var util                    = require("../../util");
var t                       = require("../../types");
var _                       = require("lodash");

function CommonJSFormatter(file) {
  CommonJSStrictFormatter.apply(this, arguments);

  var hasNonDefaultExports = false;
  _.each(file.ast.program.body, function (node) {
    if (t.isExportDeclaration(node) && !node.default) hasNonDefaultExports = true;
  });
  this.hasNonDefaultExports = hasNonDefaultExports;
}

util.inherits(CommonJSFormatter, CommonJSStrictFormatter);

CommonJSFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (t.isIdentifier(specifier.id) && specifier.id.name === "default") {
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(variableName,
        t.callExpression(this.file.addDeclaration("interop-require"), [util.template("require", {
          MODULE_NAME: node.source.raw
        })])
      )
    ]));
  } else {
    CommonJSStrictFormatter.prototype.importSpecifier.apply(this, arguments);
  }
};

CommonJSFormatter.prototype.export = function (node, nodes) {
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
    CommonJSStrictFormatter.prototype.export.apply(this, arguments);
  }
};

CommonJSFormatter.prototype.exportSpecifier = function () {
  CommonJSStrictFormatter.prototype.exportSpecifier.apply(this, arguments);
};
