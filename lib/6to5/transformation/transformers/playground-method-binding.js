var t = require("../../types");
var _ = require("lodash");

exports.BindMemberExpression = function (node, parent, file, scope) {
  var object = node.object;
  var prop   = node.property;

  var temp;
  if (t.isDynamic(object)) {
    var tempName = file.generateUid("temp", scope);
    temp =  object = t.identifier(tempName);
    scope.push({
      key: tempName,
      id: temp
    });
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
    var argsIdName = file.generateUid("args", scope);
    var argsId = t.identifier(argsIdName);
    scope.push({
      key: argsIdName,
      id: argsId
    });

    return t.sequenceExpression([
      t.assignmentExpression("=", argsId, t.arrayExpression(node.arguments)),
      buildCall(node.arguments.map(function (node, i) {
        return t.memberExpression(argsId, t.literal(i), true);
      }))
    ]);
  } else {
    return buildCall(node.arguments);
  }
};
