"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _foo = _interopRequireDefault(require("foo"));
var _bar = __exportStar(require("bar"));
function __exportStar(mod) {
  Object.keys(mod).forEach(function (k) {
    if (["default", "__esModule"].indexOf(k) < 0 && !(k in exports && exports[k] === mod[k])) {
      Object.defineProperty(exports, k, {
        get() {
          return mod[k];
        },
        enumerable: true
      });
    }
  });
  return mod;
}
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var anything = {};
