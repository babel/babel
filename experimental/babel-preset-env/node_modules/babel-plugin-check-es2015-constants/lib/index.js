"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var messages = _ref.messages;

  return {
    visitor: {
      Scope: function Scope(_ref2) {
        var scope = _ref2.scope;

        for (var name in scope.bindings) {
          var binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (var _iterator = binding.constantViolations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
            var _ref3;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref3 = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref3 = _i.value;
            }

            var violation = _ref3;

            throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];