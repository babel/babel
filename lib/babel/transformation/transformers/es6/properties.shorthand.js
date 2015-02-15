"use strict";

var nameMethod = require("../../helpers/name-method");
var t          = require("../../../types");
var clone      = require("lodash/lang/clone");

exports.check = function (node) {
  return t.isProperty(node) && (node.method || node.shorthand);
};

exports.Property = function (node, parent, scope, file) {
  if (node.method) {
    node.method = false;
    nameMethod.property(node, file, scope);
  }

  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(clone(node.key));
  }
};
