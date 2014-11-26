var t = require("../../types");
var _ = require("lodash");

exports.PretzelMapExpression = function (node, parent, file, scope) {
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
