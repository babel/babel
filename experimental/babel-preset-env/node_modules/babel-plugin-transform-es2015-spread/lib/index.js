"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  function getSpreadLiteral(spread, scope, state) {
    if (state.opts.loose && !t.isIdentifier(spread.argument, { name: "arguments" })) {
      return spread.argument;
    } else {
      return scope.toArray(spread.argument, true);
    }
  }

  function hasSpread(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      if (t.isSpreadElement(nodes[i])) {
        return true;
      }
    }
    return false;
  }

  function build(props, scope, state) {
    var nodes = [];

    var _props = [];

    function push() {
      if (!_props.length) return;
      nodes.push(t.arrayExpression(_props));
      _props = [];
    }

    for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var prop = _ref2;

      if (t.isSpreadElement(prop)) {
        push();
        nodes.push(getSpreadLiteral(prop, scope, state));
      } else {
        _props.push(prop);
      }
    }

    push();

    return nodes;
  }

  return {
    visitor: {
      ArrayExpression: function ArrayExpression(path, state) {
        var node = path.node,
            scope = path.scope;

        var elements = node.elements;
        if (!hasSpread(elements)) return;

        var nodes = build(elements, scope, state);
        var first = nodes.shift();

        if (!t.isArrayExpression(first)) {
          nodes.unshift(first);
          first = t.arrayExpression([]);
        }

        path.replaceWith(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
      },
      CallExpression: function CallExpression(path, state) {
        var node = path.node,
            scope = path.scope;


        var args = node.arguments;
        if (!hasSpread(args)) return;

        var calleePath = path.get("callee");
        if (calleePath.isSuper()) return;

        var contextLiteral = t.identifier("undefined");

        node.arguments = [];

        var nodes = void 0;
        if (args.length === 1 && args[0].argument.name === "arguments") {
          nodes = [args[0].argument];
        } else {
          nodes = build(args, scope, state);
        }

        var first = nodes.shift();
        if (nodes.length) {
          node.arguments.push(t.callExpression(t.memberExpression(first, t.identifier("concat")), nodes));
        } else {
          node.arguments.push(first);
        }

        var callee = node.callee;

        if (calleePath.isMemberExpression()) {
          var temp = scope.maybeGenerateMemoised(callee.object);
          if (temp) {
            callee.object = t.assignmentExpression("=", temp, callee.object);
            contextLiteral = temp;
          } else {
            contextLiteral = callee.object;
          }
          t.appendToMemberExpression(callee, t.identifier("apply"));
        } else {
          node.callee = t.memberExpression(node.callee, t.identifier("apply"));
        }

        if (t.isSuper(contextLiteral)) {
          contextLiteral = t.thisExpression();
        }

        node.arguments.unshift(contextLiteral);
      },
      NewExpression: function NewExpression(path, state) {
        var node = path.node,
            scope = path.scope;

        var args = node.arguments;
        if (!hasSpread(args)) return;

        var nodes = build(args, scope, state);

        var context = t.arrayExpression([t.nullLiteral()]);

        args = t.callExpression(t.memberExpression(context, t.identifier("concat")), nodes);

        path.replaceWith(t.newExpression(t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Function"), t.identifier("prototype")), t.identifier("bind")), t.identifier("apply")), [node.callee, args]), []));
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];