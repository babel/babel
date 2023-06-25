"use strict";

0 && (module.exports = { default: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("default", function () {
  return _white().default;
});
function _white() {
  const data = babelHelpers.interopRequireDefault(require("white"));
  _white = function () {
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
