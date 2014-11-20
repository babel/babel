module.exports = CommonJSInteropFormatter;

var CommonJSFormatter = require("./common");
var util              = require("../../util");
var t                 = require("../../types");

function CommonJSInteropFormatter(file) {
  this.file = file;
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
