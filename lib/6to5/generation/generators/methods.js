"use strict";

var t = require("../../types");

exports._params = function (node, print) {
  this.push("(");
  print.list(node.params);
  this.push(")");
};

exports._method = function (node, print) {
  var value = node.value;
  var kind  = node.kind;
  var key   = node.key;

  if (!kind || kind === "init") {
    if (value.generator) {
      this.push("*");
    }
  } else {
    this.push(kind + " ");
  }

  if (value.async) this.push("async ");

  if (node.computed) {
    this.push("[");
    print(key);
    this.push("]");
  } else {
    print(key);
  }

  this._params(value, print);
  this.push(" ");
  print(value.body);
};

exports.FunctionDeclaration =
exports.FunctionExpression = function (node, print) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");

  if (node.id) {
    this.push(" ");
    print(node.id);
  } else {
    this.space();
  }

  this._params(node, print);
  this.space();
  print(node.body);
};

exports.ArrowFunctionExpression = function (node, print) {
  if (node.async) this.push("async ");

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    print(node.params[0]);
  } else {
    this._params(node, print);
  }

  this.push(" => ");
  print(node.body);
};
