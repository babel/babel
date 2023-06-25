"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _foo = _interopRequireDefault(require("foo"));
__exportStar(require("bar"));
var _bar = _lastRequired;
var _lastRequired;
function __exportStar(mod) {
  return _reexports(exports, _lastRequired = mod);
}
function _reexports(exports, mod) {
  var _loop = function (k) {
    if (k === "default" || k === "__esModule") return "continue";
    k in exports && exports[k] === mod[k] || Object.defineProperty(exports, k, {
      get: function () {
        return mod[k];
      },
      enumerable: true
    });
  };
  for (var k in mod) {
    var _ret = _loop(k);
    if (_ret === "continue") continue;
  }
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var anything = {};
