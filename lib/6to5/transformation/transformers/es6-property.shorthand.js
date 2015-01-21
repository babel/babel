"use strict";

var nameMethod = require("../helpers/name-method");

exports.Property = function (node, parent, scope, context, file) {
  if (node.method) {
    node.method = false;
    nameMethod.property(node, file, scope);
  }

  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(_.clone(node.key));
  }
};
