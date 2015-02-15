"use strict";

var each = require("lodash/collection/each");

exports.TaggedTemplateExpression = function (node, print) {
  print(node.tag);
  print(node.quasi);
};

exports.TemplateElement = function (node) {
  this._push(node.value.raw);
};

exports.TemplateLiteral = function (node, print) {
  this.push("`");

  var quasis = node.quasis;
  var self   = this;
  var len    = quasis.length;

  each(quasis, function (quasi, i) {
    print(quasi);

    if (i + 1 < len) {
      self.push("${ ");
      print(node.expressions[i]);
      self.push(" }");
    }
  });

  this._push("`");
};
