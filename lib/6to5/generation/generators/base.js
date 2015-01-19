"use strict";

exports.File = function (node, print) {
  print(node.program);
};

exports.Program = function (node, print) {
  print.sequence(node.body);
};

exports.BlockStatement = function (node, print) {
  if (node.body.length === 0) {
    this.push("{}");
  } else {
    this.push("{");
    this.newline();
    print.sequence(node.body, { indent: true });
    this.removeLast("\n");
    this.rightBrace();
  }
};
