"use strict";

0 && (module.exports = { default: _, name: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
_export("default", function () {
  return _dep.default;
});
_export("name", function () {
  return _dep.name;
});
var _dep = babelHelpers.interopRequireWildcard(require("dep"), true);
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
