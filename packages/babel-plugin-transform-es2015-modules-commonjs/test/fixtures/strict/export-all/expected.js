'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mod = require('mod');

var _loop = function (_key2) {
  if (_key2 === "default") return 'continue';
  Object.defineProperty(exports, _key2, {
    enumerable: true,
    get: function () {
      return _mod[_key2];
    }
  });
};

for (var _key2 in _mod) {
  var _ret = _loop(_key2);

  if (_ret === 'continue') continue;
}
