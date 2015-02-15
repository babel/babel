"use strict";

// https://github.com/sebmarkbage/ecmascript-rest-spread

var t = require("../../../types");

exports.experimental = true;

exports.manipulateOptions = function (opts) {
  if (opts.whitelist.length) opts.whitelist.push("es6.destructuring");
};

var hasSpread = function (node) {
  for (var i = 0; i < node.properties.length; i++) {
    if (t.isSpreadProperty(node.properties[i])) {
      return true;
    }
  }
  return false;
};

exports.ObjectExpression = function (node, parent, scope, file) {
  if (!hasSpread(node)) return;

  var args = [];
  var props = [];

  var push = function () {
    if (!props.length) return;
    args.push(t.objectExpression(props));
    props = [];
  };

  for (var i = 0; i < node.properties.length; i++) {
    var prop = node.properties[i];
    if (t.isSpreadProperty(prop)) {
      push();
      args.push(prop.argument);
    } else {
      props.push(prop);
    }
  }

  push();

  if (!t.isObjectExpression(args[0])) {
    args.unshift(t.objectExpression([]));
  }

  return t.callExpression(file.addHelper("extends"), args);
};
