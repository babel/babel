"use strict";

exports.__esModule = true;

exports.default = function (_ref) {
  var t = _ref.types;

  function getTempId(scope) {
    var id = scope.path.getData("functionBind");
    if (id) return id;

    id = scope.generateDeclaredUidIdentifier("context");
    return scope.path.setData("functionBind", id);
  }

  function getStaticContext(bind, scope) {
    var object = bind.object || bind.callee.object;
    return scope.isStatic(object) && object;
  }

  function inferBindContext(bind, scope) {
    var staticContext = getStaticContext(bind, scope);
    if (staticContext) return staticContext;

    var tempId = getTempId(scope);
    if (bind.object) {
      bind.callee = t.sequenceExpression([t.assignmentExpression("=", tempId, bind.object), bind.callee]);
    } else {
      bind.callee.object = t.assignmentExpression("=", tempId, bind.callee.object);
    }
    return tempId;
  }

  return {
    inherits: require("babel-plugin-syntax-function-bind"),

    visitor: {
      CallExpression: function CallExpression(_ref2) {
        var node = _ref2.node,
            scope = _ref2.scope;

        var bind = node.callee;
        if (!t.isBindExpression(bind)) return;

        var context = inferBindContext(bind, scope);
        node.callee = t.memberExpression(bind.callee, t.identifier("call"));
        node.arguments.unshift(context);
      },
      BindExpression: function BindExpression(path) {
        var node = path.node,
            scope = path.scope;

        var context = inferBindContext(node, scope);
        path.replaceWith(t.callExpression(t.memberExpression(node.callee, t.identifier("bind")), [context]));
      }
    }
  };
};

module.exports = exports["default"];