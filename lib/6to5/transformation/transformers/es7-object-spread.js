"use strict";

// https://github.com/sebmarkbage/ecmascript-rest-spread

var t = require("../../types");

exports.experimental = true;

exports.ObjectExpression = function (node, parent, scope, context, file) {
  var hasSpread = false;
  var i;
  var prop;
  for (i = 0; i < node.properties.length; i++) {
    prop = node.properties[i];
    if (t.isSpreadProperty(prop)) {
      hasSpread = true;
      break;
    }
  }
  if (!hasSpread) return;

  var args = [];
  var props = [];

  var push = function () {
    if (!props.length) return;
    args.push(t.objectExpression(props));
    props = [];
  };

  for (i = 0; i < node.properties.length; i++) {
    prop = node.properties[i];
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
