"use strict";

var t = require("../../types");
var _ = require("lodash");

exports.XJSAttribute = function (node, print) {
  print(node.name);
  if (node.value) {
    this.push("=");
    print(node.value);
  }
};

exports.XJSIdentifier = function (node) {
  this.push(node.name);
};

exports.XJSNamespacedName = function (node, print) {
  print(node.namespace);
  this.push(":");
  print(node.name);
};

exports.XJSMemberExpression = function (node, print) {
  print(node.object);
  this.push(".");
  print(node.property);
};

exports.XJSSpreadAttribute = function (node, print) {
  this.push("{...");
  print(node.argument);
  this.push("}");
};

exports.XJSExpressionContainer = function (node, print) {
  this.push("{");
  print(node.expression);
  this.push("}");
};

exports.XJSElement = function (node, print) {
  var self = this;

  var open = node.openingElement;
  print(open);
  if (open.selfClosing) return;

  this.indent();
  _.each(node.children, function (child) {
    if (t.isLiteral(child)) {
      self.push(child.value);
    } else {
      print(child);
    }
  });
  this.dedent();

  print(node.closingElement);
};

exports.XJSOpeningElement = function (node, print) {
  this.push("<");
  print(node.name);
  if (node.attributes.length > 0) {
    this.space();
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
};

exports.XJSClosingElement = function (node, print) {
  this.push("</");
  print(node.name);
  this.push(">");
};

exports.XJSEmptyExpression = function () {

};
