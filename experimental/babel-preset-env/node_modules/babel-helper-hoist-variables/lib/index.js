"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (path, emit) {
  var kind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "var";

  path.traverse(visitor, { kind: kind, emit: emit });
};

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visitor = {
  Scope: function Scope(path, state) {
    if (state.kind === "let") path.skip();
  },
  Function: function Function(path) {
    path.skip();
  },
  VariableDeclaration: function VariableDeclaration(path, state) {
    if (state.kind && path.node.kind !== state.kind) return;

    var nodes = [];

    var declarations = path.get("declarations");
    var firstId = void 0;

    for (var _iterator = declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var declar = _ref;

      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(t.expressionStatement(t.assignmentExpression("=", declar.node.id, declar.node.init)));
      }

      for (var name in declar.getBindingIdentifiers()) {
        state.emit(t.identifier(name), name);
      }
    }

    if (path.parentPath.isFor({ left: path.node })) {
      path.replaceWith(firstId);
    } else {
      path.replaceWithMultiple(nodes);
    }
  }
};

module.exports = exports["default"];