"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  function statementList(key, path) {
    var paths = path.get(key);

    for (var _iterator = paths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _path = _ref2;

      var func = _path.node;
      if (!_path.isFunctionDeclaration()) continue;

      var declar = t.variableDeclaration("let", [t.variableDeclarator(func.id, t.toExpression(func))]);

      declar._blockHoist = 2;

      func.id = null;

      _path.replaceWith(declar);
    }
  }

  return {
    visitor: {
      BlockStatement: function BlockStatement(path) {
        var node = path.node,
            parent = path.parent;

        if (t.isFunction(parent, { body: node }) || t.isExportDeclaration(parent)) {
          return;
        }

        statementList("body", path);
      },
      SwitchCase: function SwitchCase(path) {
        statementList("consequent", path);
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];