"use strict";

var t    = require("../../types");
var each = require("lodash/collection/each");

exports.JSXAttribute = function (node, print) {
  print(node.name);
  if (node.value) {
    this.push("=");
    print(node.value);
  }
};

exports.JSXIdentifier = function (node) {
  this.push(node.name);
};

exports.JSXNamespacedName = function (node, print) {
  print(node.namespace);
  this.push(":");
  print(node.name);
};

exports.JSXMemberExpression = function (node, print) {
  print(node.object);
  this.push(".");
  print(node.property);
};

exports.JSXSpreadAttribute = function (node, print) {
  this.push("{...");
  print(node.argument);
  this.push("}");
};

exports.JSXExpressionContainer = function (node, print) {
  this.push("{");
  print(node.expression);
  this.push("}");
};

exports.JSXElement = function (node, print) {
  var self = this;

  var open = node.openingElement;
  print(open);
  if (open.selfClosing) return;

  this.indent();
  each(node.children, function (child) {
    if (t.isLiteral(child)) {
      self.push(child.value);
    } else {
      print(child);
    }
  });
  this.dedent();

  print(node.closingElement);
};

exports.JSXOpeningElement = function (node, print) {
  this.push("<");
  print(node.name);
  if (node.attributes.length > 0) {
    this.push(" ");
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
};

exports.JSXClosingElement = function (node, print) {
  this.push("</");
  print(node.name);
  this.push(">");
};

exports.JSXEmptyExpression = function () {};
