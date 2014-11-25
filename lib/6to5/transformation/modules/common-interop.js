module.exports = CommonJSInteropFormatter;

var CommonJSFormatter = require("./common");
var util              = require("../../util");
var t                 = require("../../types");
var _                 = require("lodash");

function CommonJSInteropFormatter(file) {
  CommonJSFormatter.apply(this, arguments);

  var has = false;
  _.each(file.ast.program.body, function (node) {
    if (t.isExportDeclaration(node) && !node.default) has = true;
  });
  this.has = has;
}

util.inherits(CommonJSInteropFormatter, CommonJSFormatter);

CommonJSInteropFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
   if (specifier.default) {
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(variableName,
        t.callExpression(this.file.addDeclaration("interop-require"), [util.template("require", {
          MODULE_NAME: node.source.raw
        })])
      )
    ]));
  } else {
    CommonJSFormatter.prototype.importSpecifier.apply(this, arguments);
  }
};

CommonJSInteropFormatter.prototype.export = function (node, nodes) {
  if (node.default && !this.has) {
    var declar = node.declaration;

    // module.exports = VALUE;
    var assign = util.template("exports-default-module", {
      VALUE: this._pushStatement(declar, nodes)
    }, true);

    // hoist to the top if this default is a function
    nodes.push(this._hoistExport(declar, assign));
    return;
  }

  CommonJSFormatter.prototype.export.apply(this, arguments);
};

CommonJSInteropFormatter.prototype.exportSpecifier = function () {
  CommonJSFormatter.prototype.exportSpecifier.apply(this, arguments);
};
