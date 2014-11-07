module.exports = IgnoreFormatter;

var t = require("../../types");

function IgnoreFormatter() {

}

IgnoreFormatter.prototype.import = function () {

};

IgnoreFormatter.prototype.importSpecifier = function () {

};

IgnoreFormatter.prototype.export = function (node, nodes) {
  var declar = t.toStatement(node.declaration, true);
  if (declar) nodes.push(declar);
};

IgnoreFormatter.prototype.exportSpecifier = function () {

};
