var messages = require("../../../messages");
var t        = require("../../../types");

// check if the input Literal `source` is an alternate casing of "react"
var check = function (source, file) {
  if (t.isLiteral(source)) {
    var name  = source.value;
    var lower = name.toLowerCase();

    if (lower === "react" && name !== lower) {
      throw file.errorWithNode(source, messages.get("didYouMean", "react"));
    }
  }
};

exports.CallExpression = function (node, parent, scope, file) {
  if (t.isIdentifier(node.callee, { name: "require" }) && node.arguments.length === 1) {
    check(node.arguments[0], file);
  }
};

exports.ImportDeclaration =
exports.ExportDeclaration = function (node, parent, scope, file) {
  check(node.source, file);
};
