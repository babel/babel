"use strict";

exports.__esModule = true;
exports.visitor = undefined;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getTDZStatus(refPath, bindingPath) {
  var executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

  if (executionStatus === "before") {
    return "inside";
  } else if (executionStatus === "after") {
    return "outside";
  } else {
    return "maybe";
  }
}

function buildTDZAssert(node, file) {
  return t.callExpression(file.addHelper("temporalRef"), [node, t.stringLiteral(node.name), file.addHelper("temporalUndefined")]);
}

function isReference(node, scope, state) {
  var declared = state.letReferences[node.name];
  if (!declared) return false;

  return scope.getBindingIdentifier(node.name) === declared;
}

var visitor = exports.visitor = {
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    if (!this.file.opts.tdz) return;

    var node = path.node,
        parent = path.parent,
        scope = path.scope;


    if (path.parentPath.isFor({ left: node })) return;
    if (!isReference(node, scope, state)) return;

    var bindingPath = scope.getBinding(node.name).path;

    var status = getTDZStatus(path, bindingPath);
    if (status === "inside") return;

    if (status === "maybe") {
      var assert = buildTDZAssert(node, state.file);

      bindingPath.parent._tdzThis = true;

      path.skip();

      if (path.parentPath.isUpdateExpression()) {
        if (parent._ignoreBlockScopingTDZ) return;
        path.parentPath.replaceWith(t.sequenceExpression([assert, parent]));
      } else {
        path.replaceWith(assert);
      }
    } else if (status === "outside") {
      path.replaceWith(t.throwStatement(t.inherits(t.newExpression(t.identifier("ReferenceError"), [t.stringLiteral(node.name + " is not defined - temporal dead zone")]), node)));
    }
  },


  AssignmentExpression: {
    exit: function exit(path, state) {
      if (!this.file.opts.tdz) return;

      var node = path.node;

      if (node._ignoreBlockScopingTDZ) return;

      var nodes = [];
      var ids = path.getBindingIdentifiers();

      for (var name in ids) {
        var id = ids[name];

        if (isReference(id, path.scope, state)) {
          nodes.push(buildTDZAssert(id, state.file));
        }
      }

      if (nodes.length) {
        node._ignoreBlockScopingTDZ = true;
        nodes.push(node);
        path.replaceWithMultiple(nodes.map(t.expressionStatement));
      }
    }
  }
};