// https://github.com/sebmarkbage/ecmascript-rest-spread

var t = require("../../types");
var _ = require("lodash");

exports.ObjectExpression = function (node) {
  var hasSpread = false;
  _.each(node.properties, function (prop) {
    if (t.isSpreadProperty(prop)) {
      hasSpread = true;
      return false;
    }
  });
  if (!hasSpread) return;

  var args = [];
  var props = [];

  var push = function () {
    if (!props.length) return;
    args.push(t.objectExpression(props));
    props = [];
  };

  _.each(node.properties, function (prop) {
    if (t.isSpreadProperty(prop)) {
      push();
      args.push(prop.argument);
    } else {
      props.push(prop);
    }
  });

  push();

  if (!t.isObjectExpression(args[0])) {
    args.unshift(t.objectExpression([]));
  }

  return t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("assign")), args);
};
