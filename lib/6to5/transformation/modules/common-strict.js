module.exports = CommonJSStrictFormatter;

var DefaultFormatter = require("./_default");
var util             = require("../../util");
var t                = require("../../types");

function CommonJSStrictFormatter() {
  DefaultFormatter.apply(this, arguments);
}

util.inherits(CommonJSStrictFormatter, DefaultFormatter);

CommonJSStrictFormatter.prototype.import = function (node, nodes) {
  // import "foo";
  nodes.push(util.template("require", {
    //inherits: node,

    MODULE_NAME: node.source.raw
  }, true));
};

CommonJSStrictFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

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
};

CommonJSStrictFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  this._exportSpecifier(function () {
    return t.callExpression(t.identifier("require"), [node.source]);
  }, specifier, node, nodes);
};
