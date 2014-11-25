var t = require("../../types");

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
