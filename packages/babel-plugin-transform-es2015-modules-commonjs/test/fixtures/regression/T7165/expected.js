'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bar = require('bar');

var _loop = function (_key2) {
  if (_key2 === "default") return 'continue';
  Object.defineProperty(exports, _key2, {
    enumerable: true,
    get: function () {
      return _bar[_key2];
    }
  });
};

for (var _key2 in _bar) {
  var _ret = _loop(_key2);

  if (_ret === 'continue') continue;
}

var _foo = require('foo');

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anything = {};
