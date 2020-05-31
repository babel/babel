var _self = babelHelpers.classPrivateFieldLooseKey("self");

var _getA = babelHelpers.classPrivateFieldLooseKey("getA");

var A = function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
};

Object.defineProperty(A, _self, {
  writable: true,
  value: A
});
Object.defineProperty(A, _getA, {
  writable: true,
  value: () => A
});
