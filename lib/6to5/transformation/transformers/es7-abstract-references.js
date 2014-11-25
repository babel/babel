// https://github.com/zenparsing/es-abstract-refs

var util = require("../../util");
var t    = require("../../types");

var container = function (parent, call, ret) {
  if (t.isExpressionStatement(parent)) {
    // we don't need to worry about return values
    return call;
  } else {
    var exprs = [];
    if (t.isSequenceExpression(call)) {
      exprs = call.expressions;
    } else {
      exprs.push(call);
    }
    exprs.push(ret);
    return t.sequenceExpression(exprs);
  }
};

exports.AssignmentExpression = function (node, parent, file, scope) {
  var left = node.left;
  if (!t.isVirtualPropertyExpression(left)) return;

  var value = node.right;
  var temp;

  // we need to return `node.right`
  if (!t.isExpressionStatement(parent)) {
    // `node.right` isn't a simple identifier so we need to reference it
    if (t.isDynamic(value)) {
      var tempName = file.generateUid("temp");
      temp = value = t.identifier(tempName);
      scope.push({
        key: tempName,
        id: temp
      });
    }
  }

  var call = util.template("abstract-expression-set", {
    PROPERTY: left.property,
    OBJECT:   left.object,
    VALUE:    value
  });

  if (temp) {
    call = t.sequenceExpression([
      t.assignmentExpression("=", temp, node.right),
      call
    ]);
  }

  return container(parent, call, value);
};

exports.UnaryExpression = function (node, parent) {
  var arg = node.argument;
  if (!t.isVirtualPropertyExpression(arg)) return;
  if (node.operator !== "delete") return;

  var call = util.template("abstract-expression-delete", {
    PROPERTY: arg.property,
    OBJECT:   arg.object
  });

  return container(parent, call, t.literal(true));
};

exports.CallExpression = function (node, parent, file, scope) {
  var callee = node.callee;
  if (!t.isVirtualPropertyExpression(callee)) return;

  var temp;
  if (t.isDynamic(callee.object)) {
    // we need to save `callee.object` so we can call it again
    var tempName = file.generateUid("temp");
    temp = t.identifier(tempName);
    scope.push({
      key: tempName,
      id: temp
    });
  }

  var call = util.template("abstract-expression-call", {
    PROPERTY: callee.property,
    OBJECT:   temp || callee.object
  });

  call.arguments = call.arguments.concat(node.arguments);

  if (temp) {
    return t.sequenceExpression([
      t.assignmentExpression("=", temp, callee.object),
      call
    ]);
  } else {
    return call;
  }
};

exports.VirtualPropertyExpression = function (node) {
  return util.template("abstract-expression-get", {
    PROPERTY: node.property,
    OBJECT:   node.object
  });
};
