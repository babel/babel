var t = require("../../types");
var _ = require("lodash");

exports.BindMemberExpression = function (node, parent, file, scope) {
  var object = node.object;
  var prop   = node.property;

  var temp;
  if (t.isDynamic(object)) {
    temp = object = scope.generateTemp(file);
  }

  var call = t.callExpression(
    t.memberExpression(t.memberExpression(object, prop), t.identifier("bind")),
    [object].concat(node.arguments)
  );

  if (temp) {
    return t.sequenceExpression([
      t.assignmentExpression("=", temp, node.object),
      call
    ]);
  } else {
    return call;
  }
};

exports.BindFunctionExpression = function (node, parent, file, scope) {
  var buildCall = function (args) {
    var param = file.generateUidIdentifier("val", scope);
    return t.functionExpression(null, [param], t.blockStatement([
      t.returnStatement(t.callExpression(t.memberExpression(param, node.callee), args))
    ]));
  };

  if (_.find(node.arguments, t.isDynamic)) {
    var temp = scope.generateTemp(file, "args");

    return t.sequenceExpression([
      t.assignmentExpression("=", temp, t.arrayExpression(node.arguments)),
      buildCall(node.arguments.map(function (node, i) {
        return t.memberExpression(temp, t.literal(i), true);
      }))
    ]);
  } else {
    return buildCall(node.arguments);
  }
};
