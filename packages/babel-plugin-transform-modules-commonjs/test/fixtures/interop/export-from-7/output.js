"use strict";

0 && (module.exports = { foo: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("foo", function () {
  return _foo.default;
});
var _foo = babelHelpers.interopRequireDefault(require("foo"));
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
