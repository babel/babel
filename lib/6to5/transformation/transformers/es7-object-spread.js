// https://github.com/sebmarkbage/ecmascript-rest-spread

var t = require("../../types");

exports.ObjectExpression = function (node) {
  var hasSpread = false;
  for (var i in node.properties) {
    var prop = node.properties[i];
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

  for (var i in node.properties) {
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

  return t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("assign")), args);
};
