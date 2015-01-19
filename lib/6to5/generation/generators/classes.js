"use strict";

exports.ClassExpression =
exports.ClassDeclaration = function (node, print) {
  this.push("class");

  if (node.id) {
    this.space();
    print(node.id);
  }

  if (node.superClass) {
    this.push(" extends ");
    print(node.superClass);
  }

  this.space();
  print(node.body);
};

exports.ClassBody = function (node, print) {
  if (node.body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();

    this.indent();
    print.sequence(node.body);
    this.dedent();

    this.rightBrace();
  }
};

exports.MethodDefinition = function (node, print) {
  if (node.static) {
    this.push("static ");
  }

  this._method(node, print);
};
