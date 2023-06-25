"use strict";

0 && (module.exports = { default: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("default", function () {
  return _foo().default;
});
function _foo() {
  const data = babelHelpers.interopRequireDefault(require("foo"));
  _foo = function () {
    return data;
  };
  return data;
}
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
