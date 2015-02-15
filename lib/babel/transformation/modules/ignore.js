"use strict";

module.exports = IgnoreFormatter;

var t = require("../../types");

function IgnoreFormatter() {

}

IgnoreFormatter.prototype.exportDeclaration = function (node, nodes) {
  var declar = t.toStatement(node.declaration, true);
  if (declar) nodes.push(t.inherits(declar, node));
};

IgnoreFormatter.prototype.importDeclaration =
IgnoreFormatter.prototype.importSpecifier =
IgnoreFormatter.prototype.exportSpecifier = function () {

};
