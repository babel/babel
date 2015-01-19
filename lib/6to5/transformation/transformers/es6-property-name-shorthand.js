"use strict";

var t = require("../../types");
var _ = require("lodash");

exports.Property = function (node) {
  if (!node.shorthand) return;
  node.shorthand = false;
  node.key = t.removeComments(_.clone(node.key));
};
