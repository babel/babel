var _two = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("two");
var _private = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("private");
var _four = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("four");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  this.one = babelHelpers.classPrivateFieldLooseBase(this, _private)[_private];
  Object.defineProperty(this, _two, {
    writable: true,
    value: babelHelpers.classPrivateFieldLooseBase(this, _private)[_private]
  });
  Object.defineProperty(this, _private, {
    writable: true,
    value: 0
  });
  this.three = babelHelpers.classPrivateFieldLooseBase(this, _private)[_private];
  Object.defineProperty(this, _four, {
    writable: true,
    value: babelHelpers.classPrivateFieldLooseBase(this, _private)[_private]
  });
});
